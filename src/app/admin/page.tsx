import type { Metadata } from "next";
import {
  Users,
  Flame,
  ThermometerSun,
  Gauge,
  Wallet,
  Target,
  TrendingUp,
  CalendarPlus,
} from "lucide-react";
import { getDashboardStats } from "@/lib/leads/queries";
import { KpiCard } from "@/components/ui/Kpi";
import { DashboardCharts } from "@/components/admin/DashboardCharts";
import { formatCurrency } from "@/lib/currency";
import { formatPercent } from "@/lib/utils";
import { getServerDictionary } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const dict = await getServerDictionary();
  const d = dict.admin.dashboard;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-brand-950 dark:text-white">
          {d.title}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {d.subtitle}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard tone="brand" label={d.totalLeads} value={String(stats.totalLeads)} icon={<Users className="h-5 w-5" />} />
        <KpiCard label={d.hotLeads} value={String(stats.hotLeads)} tone="accent" icon={<Flame className="h-5 w-5" />} />
        <KpiCard label={d.warmLeads} value={String(stats.warmLeads)} icon={<ThermometerSun className="h-5 w-5" />} />
        <KpiCard label={d.avgLeadScore} value={`${stats.avgLeadScore}/100`} icon={<Gauge className="h-5 w-5" />} />
        <KpiCard label={d.avgProjectValue} value={formatCurrency(stats.avgProjectValueEur, "EUR")} sub={d.avgProjectValueSub} icon={<Wallet className="h-5 w-5" />} />
        <KpiCard label={d.totalOpportunity} value={formatCurrency(stats.totalOpportunityEur, "EUR")} sub={d.totalOpportunitySub} icon={<Target className="h-5 w-5" />} />
        <KpiCard label={d.conversionRate} value={formatPercent(stats.conversionRate)} sub={d.conversionRateSub} icon={<TrendingUp className="h-5 w-5" />} />
        <KpiCard label={d.leadsThisMonth} value={String(stats.leadsThisMonth)} icon={<CalendarPlus className="h-5 w-5" />} />
      </div>

      {stats.totalLeads === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {d.empty}
          </p>
        </div>
      ) : (
        <DashboardCharts stats={stats} />
      )}
    </div>
  );
}
