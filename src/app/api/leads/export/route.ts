import { requireAdminApi } from "@/lib/auth/api-guard";
import { exportLeadsCsv, type LeadFilters } from "@/lib/leads/queries";
import { NextResponse } from "next/server";
import type { LeadStatus, LeadTemperature } from "@/types";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const guard = await requireAdminApi();
  if ("response" in guard) return guard.response;

  const { searchParams } = new URL(request.url);
  const filters: LeadFilters = {
    search: searchParams.get("search") ?? undefined,
    temperature: (searchParams.get("temperature") as LeadTemperature) || undefined,
    status: (searchParams.get("status") as LeadStatus) || undefined,
    country: searchParams.get("country") ?? undefined,
    dateFrom: searchParams.get("dateFrom") ?? undefined,
    dateTo: searchParams.get("dateTo") ?? undefined,
    sort: (searchParams.get("sort") as LeadFilters["sort"]) || undefined,
    dir: (searchParams.get("dir") as LeadFilters["dir"]) || undefined,
  };

  const csv = await exportLeadsCsv(filters);
  const filename = `bexel-leads-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
