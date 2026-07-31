import Link from "next/link";
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronRight } from "lucide-react";
import { StatusBadge, TemperatureBadge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/currency";
import { formatDate, cn } from "@/lib/utils";
import type { LeadListItem } from "@/lib/leads/queries";
import type { Currency } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries";

type LeadsLabels = Dictionary["admin"]["leads"];

type Params = Record<string, string | undefined>;

function buildHref(params: Params, patch: Params): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries({ ...params, ...patch })) {
    if (v) sp.set(k, v);
  }
  return `/admin/leads?${sp.toString()}`;
}

function SortHeader({
  label,
  field,
  params,
  className,
}: {
  label: string;
  field: string;
  params: Params;
  className?: string;
}) {
  const active = params.sort === field;
  const dir = active && params.dir === "asc" ? "asc" : "desc";
  const nextDir = active && dir === "desc" ? "asc" : "desc";
  const Icon = !active ? ArrowUpDown : dir === "asc" ? ArrowUp : ArrowDown;
  return (
    <th className={cn("px-4 py-3 text-left font-semibold", className)}>
      <Link
        href={buildHref(params, { sort: field, dir: nextDir, page: undefined })}
        className={cn(
          "inline-flex items-center gap-1 hover:text-brand-700",
          active ? "text-brand-800" : "text-slate-500",
        )}
      >
        {label}
        <Icon className="h-3.5 w-3.5" />
      </Link>
    </th>
  );
}

export function LeadsTable({
  items,
  params,
  l,
}: {
  items: LeadListItem[];
  params: Params;
  l: LeadsLabels;
}) {
  if (items.length === 0) {
    return (
      <div className="card p-12 text-center">
        <p className="text-sm text-slate-500">{l.noMatch}</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide">
            <tr>
              <SortHeader label={l.colName} field="name" params={params} />
              <SortHeader label={l.colCompany} field="company" params={params} />
              <th className="px-4 py-3 text-left font-semibold text-slate-500">{l.colCountry}</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-500">{l.colJobTitle}</th>
              <SortHeader label={l.colProjectValue} field="projectValue" params={params} className="text-right" />
              <SortHeader label={l.colScore} field="leadScore" params={params} />
              <th className="px-4 py-3 text-left font-semibold text-slate-500">{l.colTemp}</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-500">{l.colStatus}</th>
              <SortHeader label={l.colCreated} field="createdAt" params={params} />
              <th className="px-4 py-3 text-right font-semibold text-slate-500">{l.colActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((lead) => (
              <tr key={lead.id} className="transition hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-brand-900">{lead.name}</td>
                <td className="px-4 py-3 text-slate-600">{lead.company}</td>
                <td className="px-4 py-3 text-slate-600">{lead.country}</td>
                <td className="px-4 py-3 text-slate-600">{lead.jobTitle}</td>
                <td className="px-4 py-3 text-right font-medium text-brand-900">
                  {lead.projectValue != null
                    ? formatCurrency(lead.projectValue, (lead.currency as Currency) ?? "EUR")
                    : "—"}
                </td>
                <td className="px-4 py-3 font-bold text-brand-900">{lead.leadScore}</td>
                <td className="px-4 py-3">
                  <TemperatureBadge value={lead.temperature} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge value={lead.status} />
                </td>
                <td className="px-4 py-3 text-slate-500">{formatDate(lead.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/leads/${lead.id}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-700"
                  >
                    {l.view}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Pagination({
  total,
  page,
  pageSize,
  params,
  l,
}: {
  total: number;
  page: number;
  pageSize: number;
  params: Params;
  l: LeadsLabels;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-slate-500">
        {l.showing} <span className="font-medium text-brand-800">{from}</span>–
        <span className="font-medium text-brand-800">{to}</span> {l.of}{" "}
        <span className="font-medium text-brand-800">{total}</span>
      </p>
      <div className="flex items-center gap-2">
        <PageLink params={params} page={page - 1} disabled={page <= 1} label={l.previous} />
        <span className="text-sm text-slate-500">
          {l.page} {page} / {totalPages}
        </span>
        <PageLink params={params} page={page + 1} disabled={page >= totalPages} label={l.next} />
      </div>
    </div>
  );
}

function PageLink({
  params,
  page,
  disabled,
  label,
}: {
  params: Params;
  page: number;
  disabled: boolean;
  label: string;
}) {
  if (disabled) {
    return (
      <span className="cursor-not-allowed rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-300">
        {label}
      </span>
    );
  }
  return (
    <Link
      href={buildHref(params, { page: String(page) })}
      className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-brand-800 hover:bg-slate-50"
    >
      {label}
    </Link>
  );
}
