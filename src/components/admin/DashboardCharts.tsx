"use client";

import {
  TrendLineChart,
  CategoryBarChart,
  DistributionDonut,
} from "@/components/charts";
import { useT } from "@/i18n/provider";
import type { DashboardStats } from "@/lib/leads/queries";

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card">
      <h3 className="mb-4 text-sm font-semibold text-brand-900 dark:text-white">{title}</h3>
      {children}
    </div>
  );
}

export function DashboardCharts({ stats }: { stats: DashboardStats }) {
  const t = useT();
  const c = t.admin.dashboard.charts;
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ChartCard title={c.byMonth}>
        <TrendLineChart data={stats.leadsByMonth} />
      </ChartCard>

      <ChartCard title={c.scoreDistribution}>
        <CategoryBarChart data={stats.scoreDistribution} xKey="bucket" colorful />
      </ChartCard>

      <ChartCard title={c.byTemperature}>
        <DistributionDonut
          data={stats.leadsByTemperature.map((d) => ({
            label: t.admin.temperatures[d.temperature] ?? d.temperature,
            value: d.count,
          }))}
        />
      </ChartCard>

      <ChartCard title={c.byCountry}>
        <CategoryBarChart data={stats.leadsByCountry} xKey="country" colorful />
      </ChartCard>

      <ChartCard title={c.byProjectType}>
        <CategoryBarChart
          data={stats.leadsByProjectType.map((d) => ({
            ...d,
            type: t.enums.projectType[d.type] ?? d.type,
          }))}
          xKey="type"
          colorful
        />
      </ChartCard>

      <ChartCard title={c.byBimMaturity}>
        <CategoryBarChart
          data={stats.leadsByBimMaturity.map((d) => ({
            ...d,
            maturity: t.enums.bimMaturity[d.maturity] ?? d.maturity,
          }))}
          xKey="maturity"
          colorful
        />
      </ChartCard>
    </div>
  );
}
