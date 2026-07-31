"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BRAND = "#1f4585";
const BRAND_LIGHT = "#4a7bc2";
const ACCENT = "#f97316";
const PALETTE = ["#1f4585", "#2b5aa3", "#4a7bc2", "#f97316", "#fb923c", "#7ba3d9", "#152b52"];

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  fontSize: 12,
  boxShadow: "0 8px 24px rgba(15,33,64,.08)",
};

function compact(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/** Horizontal-ish bar chart of the four savings levers (values in EUR). */
export function SavingsBarChart({
  data,
}: {
  data: { label: string; amount: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 12, left: 8, bottom: 28 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "#64748b" }}
          interval={0}
          angle={-35}
          textAnchor="end"
          height={64}
          tickMargin={8}
          padding={{ left: 18, right: 18 }}
          tickFormatter={(v: string) => (v.length > 14 ? `${v.slice(0, 13)}…` : v)}
        />
        <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={compact} />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(v: number) => [`€${v.toLocaleString("en-US")}`, "Savings"]}
        />
        <Bar dataKey="amount" radius={[6, 6, 0, 0]} fill={BRAND}>
          {data.map((_, i) => (
            <Cell key={i} fill={i % 2 === 0 ? BRAND : BRAND_LIGHT} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Donut chart of savings distribution. */
export function DistributionDonut({
  data,
}: {
  data: { label: string; value: number }[];
}) {
  const filtered = data.filter((d) => d.value > 0);
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={filtered}
          dataKey="value"
          nameKey="label"
          innerRadius={60}
          outerRadius={95}
          paddingAngle={2}
        >
          {filtered.map((_, i) => (
            <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(v: number, n: string) => [`€${v.toLocaleString("en-US")}`, n]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

/** Line chart of a monthly time series. */
export function TrendLineChart({
  data,
}: {
  data: { month: string; count: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#64748b" }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line
          type="monotone"
          dataKey="count"
          stroke={ACCENT}
          strokeWidth={3}
          dot={{ r: 3, fill: ACCENT }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

/** Generic categorical bar chart. */
export function CategoryBarChart<T extends Record<string, unknown>>({
  data,
  xKey,
  valueKey = "count",
  colorful = false,
}: {
  data: T[];
  xKey: keyof T & string;
  valueKey?: string;
  colorful?: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 12, left: 8, bottom: 28 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 11, fill: "#64748b" }}
          interval={0}
          angle={-35}
          textAnchor="end"
          height={64}
          tickMargin={8}
          padding={{ left: 18, right: 18 }}
          tickFormatter={(v: string) => (v.length > 12 ? `${v.slice(0, 11)}…` : v)}
        />
        <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#64748b" }} width={32} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey={valueKey} radius={[6, 6, 0, 0]} fill={BRAND}>
          {data.map((_, i) => (
            <Cell key={i} fill={colorful ? PALETTE[i % PALETTE.length] : BRAND} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
