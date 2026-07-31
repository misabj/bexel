import type { Metadata } from "next";
import { Suspense } from "react";
import { listLeads, type LeadFilters } from "@/lib/leads/queries";
import { LeadsFilterBar } from "@/components/admin/LeadsFilterBar";
import { LeadsTable, Pagination } from "@/components/admin/LeadsTable";
import { getServerDictionary } from "@/i18n/server";
import type { LeadStatus, LeadTemperature } from "@/types";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type RawParams = Record<string, string | string[] | undefined>;

function str(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value || undefined;
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<RawParams>;
}) {
  const sp = await searchParams;

  const filters: LeadFilters = {
    search: str(sp.search),
    temperature: str(sp.temperature) as LeadTemperature | undefined,
    status: str(sp.status) as LeadStatus | undefined,
    country: str(sp.country),
    dateFrom: str(sp.dateFrom),
    dateTo: str(sp.dateTo),
    sort: str(sp.sort) as LeadFilters["sort"],
    dir: str(sp.dir) as LeadFilters["dir"],
    page: sp.page ? Number(str(sp.page)) : 1,
    pageSize: 10,
  };

  const { items, total, page, pageSize } = await listLeads(filters);
  const dict = await getServerDictionary();
  const l = dict.admin.leads;

  // Flattened params for building sort/pagination links.
  const params: Record<string, string | undefined> = {
    search: filters.search,
    temperature: filters.temperature,
    status: filters.status,
    country: filters.country,
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
    sort: filters.sort,
    dir: filters.dir,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-brand-950">{l.title}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {total} {total === 1 ? l.subtitleOne : l.subtitleMany}
        </p>
      </div>

      <Suspense fallback={<div className="card h-40" />}>
        <LeadsFilterBar />
      </Suspense>

      <LeadsTable items={items} params={params} l={l} />
      <Pagination total={total} page={page} pageSize={pageSize} params={params} l={l} />
    </div>
  );
}
