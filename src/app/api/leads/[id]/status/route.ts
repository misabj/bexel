import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth/api-guard";
import { updateStatusSchema } from "@/lib/validation/schemas";
import { updateLeadStatus } from "@/lib/leads/mutations";

export const runtime = "nodejs";

export async function PATCH(
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

  const parsed = updateStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid status." }, { status: 400 });
  }

  try {
    await updateLeadStatus(id, parsed.data.status);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Lead not found." }, { status: 404 });
  }
}
