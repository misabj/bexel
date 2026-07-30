import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/auth/api-guard";
import { markAsContacted, scheduleDemo, sendFollowUp } from "@/lib/leads/mutations";

export const runtime = "nodejs";

const actionSchema = z.object({
  action: z.enum(["contacted", "demo", "follow_up"]),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const guard = await requireAdminApi();
  if ("response" in guard) return guard.response;

  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = actionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Unknown action." }, { status: 400 });
  }

  try {
    switch (parsed.data.action) {
      case "contacted":
        await markAsContacted(id);
        break;
      case "demo":
        await scheduleDemo(id);
        break;
      case "follow_up":
        await sendFollowUp(id);
        break;
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Action failed." }, { status: 404 });
  }
}
