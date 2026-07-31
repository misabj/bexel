import "server-only";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email/service";
import type { ActivityType } from "@prisma/client";
import type { LeadStatus } from "@/types";
import { LEAD_STATUS_LABELS } from "@/config/options";

/**
 * Lead mutation service — status changes, notes and sales actions.
 * Every state-changing action writes a LeadActivity row, giving a basic
 * audit trail of who/what changed and when.
 */

async function logActivity(
  leadId: string,
  type: ActivityType,
  title: string,
  description?: string,
  metadata?: Record<string, unknown>,
) {
  return prisma.leadActivity.create({
    data: {
      leadId,
      type,
      title,
      description: description ?? null,
      metadata: metadata ? (metadata as object) : undefined,
    },
  });
}

/** Change a lead's status and record the transition for audit. */
export async function updateLeadStatus(
  leadId: string,
  status: LeadStatus,
): Promise<void> {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) throw new Error("Lead not found");
  if (lead.status === status) return;

  await prisma.$transaction([
    prisma.lead.update({ where: { id: leadId }, data: { status } }),
    prisma.leadActivity.create({
      data: {
        leadId,
        type: "STATUS_CHANGED",
        title: `Status changed to ${LEAD_STATUS_LABELS[status]}`,
        description: `${LEAD_STATUS_LABELS[lead.status as LeadStatus]} → ${LEAD_STATUS_LABELS[status]}`,
        metadata: { from: lead.status, to: status },
      },
    }),
  ]);
}

export async function addLeadNote(leadId: string, note: string): Promise<void> {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) throw new Error("Lead not found");
  await logActivity(leadId, "NOTE_ADDED", "Internal note", note);
}

/** Permanently delete a lead and its related activity records. */
export async function deleteLead(leadId: string): Promise<void> {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) throw new Error("Lead not found");
  await prisma.lead.delete({ where: { id: leadId } });
}

/** Mark a lead as contacted (status + activity). */
export async function markAsContacted(leadId: string): Promise<void> {
  await updateLeadStatus(leadId, "CONTACTED");
}

/** Schedule a demo (status + activity). */
export async function scheduleDemo(leadId: string): Promise<void> {
  await updateLeadStatus(leadId, "DEMO_SCHEDULED");
  await logActivity(leadId, "DEMO_SCHEDULED", "Demo scheduled");
}

/** Send a follow-up email to the lead and record it. */
export async function sendFollowUp(leadId: string): Promise<void> {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) throw new Error("Lead not found");

  await sendEmail({
    to: lead.email,
    subject: "Following up on your BIM ROI assessment",
    html: `<p>Hi ${lead.firstName}, we'd love to walk you through your personalized BIM ROI results. Would a short call this week work?</p>`,
    kind: "follow_up",
  });

  await logActivity(
    leadId,
    "FOLLOW_UP",
    "Follow-up email sent",
    `Follow-up email sent to ${lead.email}`,
  );
}
