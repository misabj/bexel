import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Boxes } from "lucide-react";
import { getLeadById } from "@/lib/leads/queries";
import { PrintButton } from "@/components/report/PrintButton";
import { formatFromEur, formatCurrency } from "@/lib/currency";
import { formatDate, formatPercent } from "@/lib/utils";
import { SITE } from "@/config/site";
import {
  BIM_MATURITY_LABELS,
  CHALLENGE_LABELS,
  PROJECT_TYPE_LABELS,
} from "@/config/options";
import type { BimMaturity, Challenge, Currency, ProjectType } from "@/types";

export const metadata: Metadata = {
  title: "ROI report",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getLeadById(id);
  if (!lead || !lead.assessment || !lead.roiResult) notFound();

  const a = lead.assessment;
  const r = lead.roiResult;
  const currency = a.currency as Currency;
  const money = (eur: number) => formatFromEur(eur, currency);
  const challenges = (a.selectedChallenges as Challenge[] | undefined) ?? [];

  const rows: { label: string; value: string }[] = [
    { label: "Annual time savings", value: money(r.timeSavings) },
    { label: "Reporting cost savings", value: money(r.reportingSavings) },
    { label: "Avoided delay costs", value: money(r.delaySavings) },
    { label: "Rework reduction", value: money(r.reworkSavings) },
    { label: "Total potential savings", value: money(r.totalSavings) },
    { label: "Estimated annual investment", value: `−${money(r.estimatedInvestment)}` },
    { label: "Net benefit", value: money(r.netBenefit) },
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="print-container mx-auto max-w-3xl px-4">
        {/* Toolbar (hidden in print) */}
        <div className="no-print mb-6 flex items-center justify-between">
          <a href="/" className="text-sm font-medium text-slate-500 hover:text-brand-700">
            ← Back to site
          </a>
          <PrintButton />
        </div>

        <div className="card space-y-8 p-8 sm:p-12">
          {/* Cover / header */}
          <header className="flex items-center justify-between border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500 text-white">
                <Boxes className="h-6 w-6" />
              </span>
              <div>
                <p className="text-lg font-extrabold text-brand-900">
                  BEXEL <span className="text-accent-500">Growth</span>
                </p>
                <p className="text-xs text-slate-500">BIM ROI Assessment Report</p>
              </div>
            </div>
            <div className="text-right text-xs text-slate-500">
              <p>{formatDate(lead.createdAt)}</p>
              <p>Ref: {lead.id.slice(0, 8).toUpperCase()}</p>
            </div>
          </header>

          {/* Company data */}
          <section>
            <h1 className="text-2xl font-extrabold text-brand-950">
              ROI assessment for {lead.company}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Prepared for {lead.firstName} {lead.lastName}, {lead.jobTitle} · {lead.country}
            </p>
          </section>

          {/* Project overview */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Project overview
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Fact label="Project type" value={PROJECT_TYPE_LABELS[a.projectType as ProjectType]} />
              <Fact label="Project value" value={formatCurrency(a.projectValue, currency)} />
              <Fact label="Duration" value={`${a.durationMonths} months`} />
              <Fact label="Team size" value={String(a.teamSize)} />
              <Fact label="Active projects" value={String(a.activeProjects)} />
              <Fact label="BIM maturity" value={BIM_MATURITY_LABELS[a.bimMaturity as BimMaturity]} />
            </div>
          </section>

          {/* KPI hero */}
          <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Kpi label="Total savings" value={money(r.totalSavings)} highlight />
            <Kpi label="ROI" value={formatPercent(r.roiPercentage)} />
            <Kpi label="Payback" value={`${r.paybackMonths} mo`} />
            <Kpi label="Net benefit" value={money(r.netBenefit)} />
          </section>

          {/* Savings table */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Savings breakdown
            </h2>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => (
                  <tr key={row.label}>
                    <td className="py-2.5 text-slate-600">{row.label}</td>
                    <td className="py-2.5 text-right font-semibold text-brand-900">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Challenges */}
          {challenges.length > 0 ? (
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
                Reported challenges
              </h2>
              <div className="flex flex-wrap gap-2">
                {challenges.map((c) => (
                  <span key={c} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    {CHALLENGE_LABELS[c]}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          {/* Next steps */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Recommended next steps
            </h2>
            <ol className="list-decimal space-y-1.5 pl-5 text-sm text-slate-600">
              <li>Review these indicative results with your project stakeholders.</li>
              <li>Book a demo with a BIM specialist to validate the assumptions.</li>
              <li>Run a scoped pilot on one active project to confirm the ROI.</li>
            </ol>
          </section>

          {/* Disclaimer */}
          <footer className="border-t border-slate-100 pt-6 text-xs leading-relaxed text-slate-400">
            {SITE.disclaimer} Exchange rates used are static demonstration values.
          </footer>
        </div>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-brand-900">{value}</p>
    </div>
  );
}

function Kpi({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight ? "border-brand-800 bg-brand-800 text-white" : "border-slate-200 bg-slate-50"
      }`}
    >
      <p className={`text-xs font-medium ${highlight ? "text-brand-100" : "text-slate-500"}`}>
        {label}
      </p>
      <p className={`mt-1 text-xl font-extrabold ${highlight ? "text-white" : "text-brand-900"}`}>
        {value}
      </p>
    </div>
  );
}
