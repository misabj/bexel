"use client";

import Link from "next/link";
import {
  PiggyBank,
  TrendingUp,
  Timer,
  Wallet,
  FileText,
  CalendarClock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { KpiCard } from "@/components/ui/Kpi";
import { SavingsBarChart, DistributionDonut } from "@/components/charts";
import { formatFromEur } from "@/lib/currency";
import { formatPercent } from "@/lib/utils";
import { SITE } from "@/config/site";
import type { Currency, RoiResult } from "@/types";

export function ResultsView({
  result,
  currency,
  company,
  leadScore,
  temperature,
  leadId,
}: {
  result: RoiResult;
  currency: Currency;
  company: string;
  leadScore: number;
  temperature: "COLD" | "WARM" | "HOT";
  leadId: string | null;
}) {
  const money = (eur: number) => formatFromEur(eur, currency);

  const barData = [
    { label: "Time savings", amount: Math.round(result.timeSavings) },
    { label: "Reporting", amount: Math.round(result.reportingSavings) },
    { label: "Avoided delays", amount: Math.round(result.delaySavings) },
    { label: "Rework", amount: Math.round(result.reworkSavings) },
  ];
  const donutData = barData.map((d) => ({ label: d.label, value: d.amount }));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
          Assessment complete
        </span>
        <h2 className="mt-4 text-2xl font-extrabold text-brand-900 sm:text-3xl">
          Your estimated BIM ROI
        </h2>
        <p className="mt-2 text-slate-500">
          Indicative results for <span className="font-semibold">{company}</span>.
        </p>
      </div>

      {/* Headline KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          tone="brand"
          label="Total potential savings"
          value={money(result.totalSavings)}
          sub="Per year"
          icon={<PiggyBank className="h-5 w-5" />}
        />
        <KpiCard
          tone="accent"
          label="ROI"
          value={formatPercent(result.roiPercentage)}
          sub="Return on investment"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <KpiCard
          label="Payback period"
          value={`${result.paybackMonths} mo`}
          sub="Time to break even"
          icon={<CalendarClock className="h-5 w-5" />}
        />
        <KpiCard
          tone={result.netBenefit >= 0 ? "emerald" : "red"}
          label="Net benefit"
          value={money(result.netBenefit)}
          sub="After software investment"
          icon={<Wallet className="h-5 w-5" />}
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Time savings" value={money(result.timeSavings)} sub={`${result.timeSavingsHours} h / year`} icon={<Timer className="h-5 w-5" />} />
        <KpiCard label="Reporting savings" value={money(result.reportingSavings)} icon={<FileText className="h-5 w-5" />} />
        <KpiCard label="Avoided delay costs" value={money(result.delaySavings)} icon={<CalendarClock className="h-5 w-5" />} />
        <KpiCard label="Rework reduction" value={money(result.reworkSavings)} icon={<Wallet className="h-5 w-5" />} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="mb-4 text-sm font-semibold text-brand-900">
            Savings by category
          </h3>
          <SavingsBarChart data={barData} />
        </div>
        <div className="card">
          <h3 className="mb-4 text-sm font-semibold text-brand-900">
            Distribution of savings
          </h3>
          <DistributionDonut data={donutData} />
        </div>
      </div>

      {/* Breakdown table */}
      <div className="card overflow-hidden p-0">
        <div className="border-b border-slate-100 p-5">
          <h3 className="text-sm font-semibold text-brand-900">
            How the numbers are calculated
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Saving</th>
                <th className="px-5 py-3 font-semibold">Basis</th>
                <th className="px-5 py-3 text-right font-semibold">Amount / year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {result.lines.map((line) => (
                <tr key={line.key}>
                  <td className="px-5 py-3 font-medium text-brand-900">{line.label}</td>
                  <td className="px-5 py-3 text-slate-500">{line.formula}</td>
                  <td className="px-5 py-3 text-right font-semibold text-brand-900">
                    {money(line.amountEur)}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50">
                <td className="px-5 py-3 font-bold text-brand-900" colSpan={2}>
                  Total potential savings
                </td>
                <td className="px-5 py-3 text-right font-extrabold text-brand-900">
                  {money(result.totalSavings)}
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 text-slate-500" colSpan={2}>
                  Estimated annual software investment
                </td>
                <td className="px-5 py-3 text-right font-semibold text-slate-700">
                  −{money(result.estimatedInvestment)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Personalized conclusion */}
      <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
        <p className="text-base leading-relaxed text-brand-900">
          Based on the information provided, your organization could potentially
          save approximately{" "}
          <span className="font-bold">{money(result.totalSavings)}</span> annually
          by reducing manual reporting, project delays and rework — an estimated
          ROI of <span className="font-bold">{formatPercent(result.roiPercentage)}</span>{" "}
          with a payback period of about{" "}
          <span className="font-bold">{result.paybackMonths} months</span>. Your
          lead qualification score is{" "}
          <span className="font-bold">
            {leadScore}/100 ({temperature.toLowerCase()})
          </span>
          .
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href="mailto:sales@bexel-demo.com?subject=Personalized%20BIM%20Demo">
          <Button variant="accent" size="lg">
            Request a Personalized Demo
            <ArrowRight className="h-4 w-4" />
          </Button>
        </a>
        {leadId ? (
          <Link href={`/report/${leadId}`}>
            <Button variant="outline" size="lg">
              <FileText className="h-4 w-4" />
              View printable report
            </Button>
          </Link>
        ) : null}
      </div>

      {/* Disclaimer */}
      <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-slate-400">
        {SITE.disclaimer} {" "}
        {"Exchange rates used are static demonstration values."}
      </p>
    </div>
  );
}
