"use client";

import {
  TrendLineChart,
  CategoryBarChart,
  DistributionDonut,
} from "@/components/charts";
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
      <h3 className="mb-4 text-sm font-semibold text-brand-900">{title}</h3>
      {children}
    </div>
  );
}

export function DashboardCharts({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ChartCard title="Leads by month">
        <TrendLineChart data={stats.leadsByMonth} />
      </ChartCard>

      <ChartCard title="Lead score distribution">
        <CategoryBarChart data={stats.scoreDistribution} xKey="bucket" colorful />
      </ChartCard>

      <ChartCard title="Leads by temperature">
        <DistributionDonut
          data={stats.leadsByTemperature.map((d) => ({
            label: d.temperature,
            value: d.count,
          }))}
        />
      </ChartCard>

      <ChartCard title="Leads by country">
        <CategoryBarChart data={stats.leadsByCountry} xKey="country" colorful />
      </ChartCard>

      <ChartCard title="Leads by project type">
        <CategoryBarChart data={stats.leadsByProjectType} xKey="type" colorful />
      </ChartCard>

      <ChartCard title="Leads by BIM maturity">
        <CategoryBarChart data={stats.leadsByBimMaturity} xKey="maturity" colorful />
      </ChartCard>
    </div>
  );
}
