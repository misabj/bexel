import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth/api-guard";
import { getLeadById } from "@/lib/leads/queries";
import { deleteLead } from "@/lib/leads/mutations";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const guard = await requireAdminApi();
  if ("response" in guard) return guard.response;

  const { id } = await params;
  const lead = await getLeadById(id);
  if (!lead) {
    return NextResponse.json({ ok: false, error: "Lead not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, lead });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const guard = await requireAdminApi();
  if ("response" in guard) return guard.response;

  const { id } = await params;
  try {
    await deleteLead(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Lead not found." }, { status: 404 });
  }
}
