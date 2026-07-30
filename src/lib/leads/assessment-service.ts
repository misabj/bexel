import "server-only";
import { prisma } from "@/lib/db";
import { getRoiSettings } from "@/lib/db/settings";
import { calculateRoi, topSavingOpportunities } from "@/lib/calculations";
import { scoreLead } from "@/lib/lead-scoring";
import { sendEmail } from "@/lib/email/service";
import { clientAssessmentEmail, salesLeadEmail } from "@/lib/email/templates";
import { formatFromEur } from "@/lib/currency";
import {
  BIM_MATURITY_LABELS,
  CHALLENGE_LABELS,
  PROJECT_TYPE_LABELS,
} from "@/config/options";
import { SITE } from "@/config/site";
import type { AssessmentSchema } from "@/lib/validation/schemas";
import type { Challenge, RoiResult } from "@/types";

/**
 * Assessment orchestration service.
 *
 * This is the trusted server-side pipeline. It re-runs the ROI calculation
 * and lead scoring from raw inputs — the client's computed numbers are never
 * persisted — then stores the lead and fires notification emails.
 */

export interface SubmitResult {
  leadId: string;
  result: RoiResult;
  leadScore: number;
  leadTemperature: "COLD" | "WARM" | "HOT";
}

export async function submitAssessment(
  input: AssessmentSchema,
): Promise<SubmitResult> {
  const settings = await getRoiSettings();

  // Trusted, server-side recomputation.
  const result = calculateRoi(input, settings);
  const score = scoreLead({
    email: input.email,
    phone: input.phone,
    companySize: input.companySize,
    currency: input.currency,
    projectValue: input.projectValue,
    durationMonths: input.durationMonths,
    activeProjects: input.activeProjects,
    bimMaturity: input.bimMaturity,
    selectedChallenges: input.selectedChallenges as Challenge[],
  });

  const lead = await prisma.lead.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      company: input.company,
      jobTitle: input.jobTitle,
      phone: input.phone || null,
      country: input.country,
      companySize: input.companySize,
      leadScore: score.score,
      leadTemperature: score.temperature,
      status: "NEW",
      source: "roi_calculator",
      assessment: {
        create: {
          projectName: input.projectName || null,
          projectType: input.projectType,
          projectValue: input.projectValue,
          currency: input.currency,
          durationMonths: input.durationMonths,
          teamSize: input.teamSize,
          activeProjects: input.activeProjects,
          bimMaturity: input.bimMaturity,
          reportingHours: input.reportingHours,
          informationSearchHours: input.informationSearchHours,
          weeklyDelayCost: input.weeklyDelayCost,
          expectedDelayWeeks: input.expectedDelayWeeks,
          annualChangeRequests: input.annualChangeRequests,
          averageChangeRequestCost: input.averageChangeRequestCost,
          duplicatedWorkPercentage: input.duplicatedWorkPercentage,
          selectedChallenges: input.selectedChallenges,
        },
      },
      roiResult: {
        create: {
          timeSavings: result.timeSavings,
          reportingSavings: result.reportingSavings,
          delaySavings: result.delaySavings,
          reworkSavings: result.reworkSavings,
          totalSavings: result.totalSavings,
          estimatedInvestment: result.estimatedInvestment,
          netBenefit: result.netBenefit,
          roiPercentage: result.roiPercentage,
          paybackMonths: result.paybackMonths,
          calculationVersion: result.calculationVersion,
        },
      },
      activities: {
        create: {
          type: "LEAD_CREATED",
          title: "Lead created from ROI calculator",
          description: `Score ${score.score} (${score.temperature}). Estimated total savings ${formatFromEur(
            result.totalSavings,
            input.currency,
          )}.`,
        },
      },
    },
  });

  // Fire-and-log notifications. Failures must not break the submission.
  await sendNotifications(input, result, score.score, score.temperature, lead.id);

  return {
    leadId: lead.id,
    result,
    leadScore: score.score,
    leadTemperature: score.temperature,
  };
}

async function sendNotifications(
  input: AssessmentSchema,
  result: RoiResult,
  leadScore: number,
  temperature: "COLD" | "WARM" | "HOT",
  leadId: string,
): Promise<void> {
  const top = topSavingOpportunities(result);

  // 1) Confirmation email to the prospect.
  const client = clientAssessmentEmail({
    firstName: input.firstName,
    company: input.company,
    currency: input.currency,
    result,
    topOpportunities: top,
    ctaUrl: `${SITE.url}/#demo`,
  });
  await sendEmail({
    to: input.email,
    subject: client.subject,
    html: client.html,
    kind: "client_assessment",
  });

  // 2) Internal notification — only for HOT leads.
  if (temperature === "HOT") {
    const salesInbox = process.env.SALES_EMAIL ?? "sales@bexel-demo.com";
    const challengeLabels = (input.selectedChallenges as Challenge[])
      .map((c) => CHALLENGE_LABELS[c])
      .slice(0, 4);
    const sales = salesLeadEmail({
      company: input.company,
      contactName: `${input.firstName} ${input.lastName}`,
      contactEmail: input.email,
      leadScore,
      projectValueLabel: formatCurrencyDisplay(
        input.projectValue,
        input.currency,
      ),
      projectType: PROJECT_TYPE_LABELS[input.projectType],
      bimMaturity: BIM_MATURITY_LABELS[input.bimMaturity],
      topChallenges: challengeLabels,
      currency: input.currency,
      result,
      adminUrl: `${SITE.url}/admin/leads/${leadId}`,
    });
    await sendEmail({
      to: salesInbox,
      subject: sales.subject,
      html: sales.html,
      kind: "sales_notification",
    });
  }
}

// Local helper: format the raw (already in-currency) project value.
function formatCurrencyDisplay(
  value: number,
  currency: AssessmentSchema["currency"],
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
