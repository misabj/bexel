import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getLeadById } from "@/lib/leads/queries";
import { scoreLead } from "@/lib/lead-scoring";
import { LeadActions } from "@/components/admin/LeadActions";
import { StatusBadge, TemperatureBadge } from "@/components/ui/Badge";
import { formatFromEur, formatCurrency } from "@/lib/currency";
import { formatDate, formatPercent } from "@/lib/utils";
import { getServerDictionary } from "@/i18n/server";
import type {
  BimMaturity,
  Challenge,
  CompanySize,
  Currency,
  LeadStatus,
} from "@/types";

export const metadata: Metadata = {
  title: "Lead detail",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getLeadById(id);
  if (!lead) notFound();

  const dict = await getServerDictionary();
  const d = dict.admin.detail;
  const e = dict.enums;

  const a = lead.assessment;
  const r = lead.roiResult;
  const currency = (a?.currency as Currency) ?? "EUR";
  const money = (eur: number) => formatFromEur(eur, currency);

  const challenges = (a?.selectedChallenges as Challenge[] | undefined) ?? [];

  // Recompute the score breakdown for transparency in the UI.
  const scoreDetail = a
    ? scoreLead({
        email: lead.email,
        phone: lead.phone ?? undefined,
        companySize: lead.companySize as CompanySize,
        currency,
        projectValue: a.projectValue,
        durationMonths: a.durationMonths,
        activeProjects: a.activeProjects,
        bimMaturity: a.bimMaturity as BimMaturity,
        selectedChallenges: challenges,
      })
    : null;

  return (
    <div className="space-y-6">
      <Link
        href="/admin/leads"
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-700 dark:text-slate-400 dark:hover:text-accent-400"
      >
        <ArrowLeft className="h-4 w-4" />
        {d.back}
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-brand-950 dark:text-white">
            {lead.firstName} {lead.lastName}
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            {lead.jobTitle} · {lead.company}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-brand-800 px-3 py-1.5 text-sm font-bold text-white">
            {d.score} {lead.leadScore}/100
          </span>
          <TemperatureBadge value={lead.leadTemperature as never} />
          <StatusBadge value={lead.status as LeadStatus} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Contact & company */}
          <section className="card">
            <h2 className="mb-4 text-sm font-semibold text-brand-900 dark:text-white">{d.contactCompany}</h2>
            <dl className="grid gap-4 sm:grid-cols-2">
              <Info label={d.email} value={lead.email} />
              <Info label={d.phone} value={lead.phone ?? "—"} />
              <Info label={d.company} value={lead.company} />
              <Info label={d.jobTitle} value={lead.jobTitle} />
              <Info label={d.country} value={lead.country} />
              <Info
                label={d.companySize}
                value={`${e.companySize[lead.companySize] ?? lead.companySize} ${d.employees}`}
              />
              <Info label={d.source} value={lead.source} />
              <Info label={d.created} value={formatDate(lead.createdAt)} />
            </dl>
          </section>

          {/* Project overview */}
          {a ? (
            <section className="card">
              <h2 className="mb-4 text-sm font-semibold text-brand-900 dark:text-white">{d.projectOverview}</h2>
              <dl className="grid gap-4 sm:grid-cols-2">
                <Info label={d.projectName} value={a.projectName ?? "—"} />
                <Info label={d.projectType} value={e.projectType[a.projectType] ?? a.projectType} />
                <Info label={d.projectValue} value={formatCurrency(a.projectValue, currency)} />
                <Info label={d.currency} value={a.currency} />
                <Info label={d.duration} value={`${a.durationMonths} ${d.months}`} />
                <Info label={d.teamSize} value={String(a.teamSize)} />
                <Info label={d.activeProjects} value={String(a.activeProjects)} />
                <Info label={d.bimMaturity} value={e.bimMaturity[a.bimMaturity] ?? a.bimMaturity} />
              </dl>
            </section>
          ) : null}

          {/* Calculator inputs */}
          {a ? (
            <section className="card">
              <h2 className="mb-4 text-sm font-semibold text-brand-900 dark:text-white">{d.reportedChallenges}</h2>
              <dl className="grid gap-4 sm:grid-cols-2">
                <Info label={d.monthlyReportingHours} value={String(a.reportingHours)} />
                <Info label={d.monthlyInfoSearchHours} value={String(a.informationSearchHours)} />
                <Info label={d.weeklyDelayCost} value={formatCurrency(a.weeklyDelayCost, currency)} />
                <Info label={d.expectedDelayWeeks} value={String(a.expectedDelayWeeks)} />
                <Info label={d.annualChangeRequests} value={String(a.annualChangeRequests)} />
                <Info label={d.avgChangeRequestCost} value={formatCurrency(a.averageChangeRequestCost, currency)} />
                <Info label={d.duplicatedWork} value={`${a.duplicatedWorkPercentage}%`} />
              </dl>
              {challenges.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {challenges.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300"
                    >
                      {e.challenge[c] ?? c}
                    </span>
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          {/* ROI results */}
          {r ? (
            <section className="card">
              <h2 className="mb-4 text-sm font-semibold text-brand-900 dark:text-white">{d.roiResults}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Metric label={d.totalSavings} value={money(r.totalSavings)} />
                <Metric label={d.roi} value={formatPercent(r.roiPercentage)} />
                <Metric label={d.payback} value={`${r.paybackMonths} ${d.mo}`} />
                <Metric label={d.netBenefit} value={money(r.netBenefit)} />
                <Metric label={d.timeSavings} value={money(r.timeSavings)} />
                <Metric label={d.reportingSavings} value={money(r.reportingSavings)} />
                <Metric label={d.delaySavings} value={money(r.delaySavings)} />
                <Metric label={d.reworkSavings} value={money(r.reworkSavings)} />
              </div>
              <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
                {d.estimatedInvestment} {money(r.estimatedInvestment)} · {d.calculation} v{r.calculationVersion}
              </p>
            </section>
          ) : null}

          {/* Score breakdown */}
          {scoreDetail ? (
            <section className="card">
              <h2 className="mb-4 text-sm font-semibold text-brand-900 dark:text-white">
                {d.scoreBreakdown} ({scoreDetail.score}/100)
              </h2>
              <ul className="divide-y divide-slate-100 dark:divide-white/10">
                {scoreDetail.breakdown.length === 0 ? (
                  <li className="py-2 text-sm text-slate-500 dark:text-slate-400">{d.noSignals}</li>
                ) : (
                  scoreDetail.breakdown.map((b) => (
                    <li key={b.label} className="flex items-center justify-between py-2 text-sm">
                      <span className="text-slate-600 dark:text-slate-400">{b.label}</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">+{b.points}</span>
                    </li>
                  ))
                )}
              </ul>
            </section>
          ) : null}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <section className="card">
            <h2 className="mb-4 text-sm font-semibold text-brand-900 dark:text-white">{d.actions}</h2>
            <LeadActions leadId={lead.id} currentStatus={lead.status as LeadStatus} />
          </section>

          <section className="card">
            <h2 className="mb-4 text-sm font-semibold text-brand-900 dark:text-white">{d.activityTimeline}</h2>
            <ol className="space-y-4">
              {lead.activities.map((activity) => (
                <li key={activity.id} className="flex gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                    <Clock className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-brand-900 dark:text-white">{activity.title}</p>
                    {activity.description ? (
                      <p className="text-xs text-slate-500 dark:text-slate-400">{activity.description}</p>
                    ) : null}
                    <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                      {formatDate(activity.createdAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-brand-900 dark:text-white">{value}</dd>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-white/10 dark:bg-ink-700/40">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-bold text-brand-900 dark:text-white">{value}</p>
    </div>
  );
}
