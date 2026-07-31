"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
import { useT } from "@/i18n/provider";
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
  const t = useT();
  const r = t.calc.results;
  const money = (eur: number) => formatFromEur(eur, currency);

  const barData = [
    { label: r.timeSavings, amount: Math.round(result.timeSavings) },
    { label: r.reporting, amount: Math.round(result.reportingSavings) },
    { label: r.delay, amount: Math.round(result.delaySavings) },
    { label: r.rework, amount: Math.round(result.reworkSavings) },
  ];
  const donutData = barData.map((d) => ({ label: d.label, value: d.amount }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30">
          {r.badge}
        </span>
        <h2 className="mt-4 font-display text-2xl font-extrabold text-brand-900 dark:text-white sm:text-3xl">
          {r.title}
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          {r.forCompany} <span className="font-semibold">{company}</span>.
        </p>
      </div>

      {/* Headline KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          tone="brand"
          label={r.totalSavings}
          value={money(result.totalSavings)}
          sub={r.perYear}
          icon={<PiggyBank className="h-5 w-5" />}
        />
        <KpiCard
          tone="accent"
          label={r.roi}
          value={formatPercent(result.roiPercentage)}
          sub={r.roiSub}
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <KpiCard
          label={r.payback}
          value={`${result.paybackMonths} ${r.months}`}
          sub={r.paybackSub}
          icon={<CalendarClock className="h-5 w-5" />}
        />
        <KpiCard
          tone={result.netBenefit >= 0 ? "emerald" : "red"}
          label={r.netBenefit}
          value={money(result.netBenefit)}
          sub={r.netSub}
          icon={<Wallet className="h-5 w-5" />}
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label={r.timeSavings} value={money(result.timeSavings)} sub={`${result.timeSavingsHours} ${r.hoursYear}`} icon={<Timer className="h-5 w-5" />} />
        <KpiCard label={r.reporting} value={money(result.reportingSavings)} icon={<FileText className="h-5 w-5" />} />
        <KpiCard label={r.delay} value={money(result.delaySavings)} icon={<CalendarClock className="h-5 w-5" />} />
        <KpiCard label={r.rework} value={money(result.reworkSavings)} icon={<Wallet className="h-5 w-5" />} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="mb-4 text-sm font-semibold text-brand-900 dark:text-white">
            {r.byCategory}
          </h3>
          <SavingsBarChart data={barData} />
        </div>
        <div className="card">
          <h3 className="mb-4 text-sm font-semibold text-brand-900 dark:text-white">
            {r.distribution}
          </h3>
          <DistributionDonut data={donutData} />
        </div>
      </div>

      {/* Breakdown table */}
      <div className="card overflow-hidden p-0">
        <div className="border-b border-slate-100 p-5 dark:border-white/10">
          <h3 className="text-sm font-semibold text-brand-900 dark:text-white">
            {r.howCalculated}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500 dark:bg-white/5 dark:text-slate-400">
              <tr>
                <th className="px-5 py-3 font-semibold">{r.saving}</th>
                <th className="px-5 py-3 font-semibold">{r.basis}</th>
                <th className="px-5 py-3 text-right font-semibold">{r.amountYear}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {result.lines.map((line) => (
                <tr key={line.key}>
                  <td className="px-5 py-3 font-medium text-brand-900 dark:text-slate-100">{line.label}</td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{line.formula}</td>
                  <td className="px-5 py-3 text-right font-semibold text-brand-900 dark:text-slate-100">
                    {money(line.amountEur)}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50 dark:bg-white/5">
                <td className="px-5 py-3 font-bold text-brand-900 dark:text-white" colSpan={2}>
                  {r.totalSavings}
                </td>
                <td className="px-5 py-3 text-right font-extrabold text-brand-900 dark:text-white">
                  {money(result.totalSavings)}
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 text-slate-500 dark:text-slate-400" colSpan={2}>
                  {r.investment}
                </td>
                <td className="px-5 py-3 text-right font-semibold text-slate-700 dark:text-slate-300">
                  −{money(result.estimatedInvestment)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Personalized conclusion */}
      <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6 dark:border-white/10 dark:bg-white/5">
        <p className="text-base leading-relaxed text-brand-900 dark:text-slate-100">
          {r.summary}
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {r.totalSavings}
            </p>
            <p className="mt-1 font-display text-2xl font-extrabold text-gradient">
              {money(result.totalSavings)}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {r.roi}
            </p>
            <p className="mt-1 font-display text-2xl font-extrabold text-brand-900 dark:text-white">
              {formatPercent(result.roiPercentage)}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {r.payback}
            </p>
            <p className="mt-1 font-display text-2xl font-extrabold text-brand-900 dark:text-white">
              {result.paybackMonths} {r.months}
            </p>
          </div>
        </div>
        <p className="mt-5 text-sm text-slate-600 dark:text-slate-400">
          {r.leadScore}:{" "}
          <span className="font-bold text-brand-900 dark:text-white">
            {leadScore}/100 ({temperature.toLowerCase()})
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href="mailto:sales@bexel-demo.com?subject=Personalized%20BIM%20Demo">
          <Button variant="accent" size="lg" className="shadow-[0_0_0_1px_rgba(249,115,22,0.12),0_8px_18px_-12px_rgba(249,115,22,0.28)]">
            {r.requestDemo}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </a>
        {leadId ? (
          <Link href={`/report/${leadId}`}>
            <Button variant="outline" size="lg">
              <FileText className="h-4 w-4" />
              {r.viewReport}
            </Button>
          </Link>
        ) : null}
      </div>

      {/* Disclaimer */}
      <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-slate-400 dark:text-slate-500">
        {r.disclaimer}
      </p>
    </motion.div>
  );
}
