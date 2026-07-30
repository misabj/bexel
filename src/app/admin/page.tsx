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

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-brand-950">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Pipeline overview across all captured BIM ROI leads.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard tone="brand" label="Total leads" value={String(stats.totalLeads)} icon={<Users className="h-5 w-5" />} />
        <KpiCard label="Hot leads" value={String(stats.hotLeads)} tone="accent" icon={<Flame className="h-5 w-5" />} />
        <KpiCard label="Warm leads" value={String(stats.warmLeads)} icon={<ThermometerSun className="h-5 w-5" />} />
        <KpiCard label="Avg lead score" value={`${stats.avgLeadScore}/100`} icon={<Gauge className="h-5 w-5" />} />
        <KpiCard label="Avg project value" value={formatCurrency(stats.avgProjectValueEur, "EUR")} sub="EUR equivalent" icon={<Wallet className="h-5 w-5" />} />
        <KpiCard label="Total opportunity" value={formatCurrency(stats.totalOpportunityEur, "EUR")} sub="Est. annual savings" icon={<Target className="h-5 w-5" />} />
        <KpiCard label="Conversion rate" value={formatPercent(stats.conversionRate)} sub="Won / total" icon={<TrendingUp className="h-5 w-5" />} />
        <KpiCard label="Leads this month" value={String(stats.leadsThisMonth)} icon={<CalendarPlus className="h-5 w-5" />} />
      </div>

      {stats.totalLeads === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-sm text-slate-500">
            No leads yet. Once prospects complete the ROI calculator they will
            appear here. Run <code className="rounded bg-slate-100 px-1.5 py-0.5">npm run prisma:seed</code> to load demo data.
          </p>
        </div>
      ) : (
        <DashboardCharts stats={stats} />
      )}
    </div>
  );
}
