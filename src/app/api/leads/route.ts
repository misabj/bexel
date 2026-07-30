import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth/api-guard";
import { listLeads, type LeadFilters } from "@/lib/leads/queries";
import type { LeadStatus, LeadTemperature } from "@/types";

export const runtime = "nodejs";

function parseFilters(searchParams: URLSearchParams): LeadFilters {
  return {
    search: searchParams.get("search") ?? undefined,
    temperature: (searchParams.get("temperature") as LeadTemperature) || undefined,
    status: (searchParams.get("status") as LeadStatus) || undefined,
    country: searchParams.get("country") ?? undefined,
    dateFrom: searchParams.get("dateFrom") ?? undefined,
    dateTo: searchParams.get("dateTo") ?? undefined,
    sort: (searchParams.get("sort") as LeadFilters["sort"]) || undefined,
    dir: (searchParams.get("dir") as LeadFilters["dir"]) || undefined,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : undefined,
    pageSize: searchParams.get("pageSize") ? Number(searchParams.get("pageSize")) : undefined,
  };
}

export async function GET(request: Request) {
  const guard = await requireAdminApi();
  if ("response" in guard) return guard.response;

  const { searchParams } = new URL(request.url);
  const data = await listLeads(parseFilters(searchParams));
  return NextResponse.json({ ok: true, ...data });
}
