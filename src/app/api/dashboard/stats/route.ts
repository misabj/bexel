import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth/api-guard";
import { getDashboardStats } from "@/lib/leads/queries";

export const runtime = "nodejs";

export async function GET() {
  const guard = await requireAdminApi();
  if ("response" in guard) return guard.response;

  const stats = await getDashboardStats();
  return NextResponse.json({ ok: true, stats });
}
