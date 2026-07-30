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
import {
  BIM_MATURITY_LABELS,
  CHALLENGE_LABELS,
  COMPANY_SIZE_LABELS,
  PROJECT_TYPE_LABELS,
} from "@/config/options";
import type {
  BimMaturity,
  Challenge,
  CompanySize,
  Currency,
  LeadStatus,
  ProjectType,
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
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to leads
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-brand-950">
            {lead.firstName} {lead.lastName}
          </h1>
          <p className="mt-1 text-slate-500">
            {lead.jobTitle} · {lead.company}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-brand-800 px-3 py-1.5 text-sm font-bold text-white">
            Score {lead.leadScore}/100
          </span>
          <TemperatureBadge value={lead.leadTemperature as never} />
          <StatusBadge value={lead.status as LeadStatus} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Contact & company */}
          <section className="card">
            <h2 className="mb-4 text-sm font-semibold text-brand-900">Contact & company</h2>
            <dl className="grid gap-4 sm:grid-cols-2">
              <Info label="Email" value={lead.email} />
              <Info label="Phone" value={lead.phone ?? "—"} />
              <Info label="Company" value={lead.company} />
              <Info label="Job title" value={lead.jobTitle} />
              <Info label="Country" value={lead.country} />
              <Info
                label="Company size"
                value={`${COMPANY_SIZE_LABELS[lead.companySize as CompanySize]} employees`}
              />
              <Info label="Source" value={lead.source} />
              <Info label="Created" value={formatDate(lead.createdAt)} />
            </dl>
          </section>

          {/* Project overview */}
          {a ? (
            <section className="card">
              <h2 className="mb-4 text-sm font-semibold text-brand-900">Project overview</h2>
              <dl className="grid gap-4 sm:grid-cols-2">
                <Info label="Project name" value={a.projectName ?? "—"} />
                <Info label="Project type" value={PROJECT_TYPE_LABELS[a.projectType as ProjectType]} />
                <Info label="Project value" value={formatCurrency(a.projectValue, currency)} />
                <Info label="Currency" value={a.currency} />
                <Info label="Duration" value={`${a.durationMonths} months`} />
                <Info label="Team size" value={String(a.teamSize)} />
                <Info label="Active projects" value={String(a.activeProjects)} />
                <Info label="BIM maturity" value={BIM_MATURITY_LABELS[a.bimMaturity as BimMaturity]} />
              </dl>
            </section>
          ) : null}

          {/* Calculator inputs */}
          {a ? (
            <section className="card">
              <h2 className="mb-4 text-sm font-semibold text-brand-900">Reported challenges</h2>
              <dl className="grid gap-4 sm:grid-cols-2">
                <Info label="Monthly reporting hours" value={String(a.reportingHours)} />
                <Info label="Monthly info-search hours" value={String(a.informationSearchHours)} />
                <Info label="Weekly delay cost" value={formatCurrency(a.weeklyDelayCost, currency)} />
                <Info label="Expected delay weeks" value={String(a.expectedDelayWeeks)} />
                <Info label="Annual change requests" value={String(a.annualChangeRequests)} />
                <Info label="Avg change request cost" value={formatCurrency(a.averageChangeRequestCost, currency)} />
                <Info label="Duplicated work" value={`${a.duplicatedWorkPercentage}%`} />
              </dl>
              {challenges.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {challenges.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {CHALLENGE_LABELS[c]}
                    </span>
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          {/* ROI results */}
          {r ? (
            <section className="card">
              <h2 className="mb-4 text-sm font-semibold text-brand-900">ROI results</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Metric label="Total savings" value={money(r.totalSavings)} />
                <Metric label="ROI" value={formatPercent(r.roiPercentage)} />
                <Metric label="Payback" value={`${r.paybackMonths} mo`} />
                <Metric label="Net benefit" value={money(r.netBenefit)} />
                <Metric label="Time savings" value={money(r.timeSavings)} />
                <Metric label="Reporting savings" value={money(r.reportingSavings)} />
                <Metric label="Delay savings" value={money(r.delaySavings)} />
                <Metric label="Rework savings" value={money(r.reworkSavings)} />
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Estimated annual investment {money(r.estimatedInvestment)} · calculation v{r.calculationVersion}
              </p>
            </section>
          ) : null}

          {/* Score breakdown */}
          {scoreDetail ? (
            <section className="card">
              <h2 className="mb-4 text-sm font-semibold text-brand-900">
                Lead score breakdown ({scoreDetail.score}/100)
              </h2>
              <ul className="divide-y divide-slate-100">
                {scoreDetail.breakdown.length === 0 ? (
                  <li className="py-2 text-sm text-slate-500">No qualifying signals.</li>
                ) : (
                  scoreDetail.breakdown.map((b) => (
                    <li key={b.label} className="flex items-center justify-between py-2 text-sm">
                      <span className="text-slate-600">{b.label}</span>
                      <span className="font-semibold text-emerald-600">+{b.points}</span>
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
            <h2 className="mb-4 text-sm font-semibold text-brand-900">Actions</h2>
            <LeadActions leadId={lead.id} currentStatus={lead.status as LeadStatus} />
          </section>

          <section className="card">
            <h2 className="mb-4 text-sm font-semibold text-brand-900">Activity timeline</h2>
            <ol className="space-y-4">
              {lead.activities.map((activity) => (
                <li key={activity.id} className="flex gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Clock className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-brand-900">{activity.title}</p>
                    {activity.description ? (
                      <p className="text-xs text-slate-500">{activity.description}</p>
                    ) : null}
                    <p className="mt-0.5 text-xs text-slate-400">
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
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-brand-900">{value}</dd>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-brand-900">{value}</p>
    </div>
  );
}
