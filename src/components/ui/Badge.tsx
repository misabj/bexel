"use client";

import { cn } from "@/lib/utils";
import type { LeadStatus, LeadTemperature } from "@/types";
import { useT } from "@/i18n/provider";

const temperatureStyles: Record<LeadTemperature, string> = {
  COLD: "bg-sky-100 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-500/30",
  WARM: "bg-amber-100 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/30",
  HOT: "bg-orange-100 text-orange-700 ring-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:ring-orange-500/30",
};

const statusStyles: Record<LeadStatus, string> = {
  NEW: "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-500/10 dark:text-slate-300 dark:ring-slate-500/30",
  CONTACTED: "bg-blue-100 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/30",
  DEMO_SCHEDULED: "bg-indigo-100 text-indigo-700 ring-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:ring-indigo-500/30",
  TRIAL_STARTED: "bg-violet-100 text-violet-700 ring-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:ring-violet-500/30",
  QUALIFIED: "bg-teal-100 text-teal-700 ring-teal-200 dark:bg-teal-500/10 dark:text-teal-400 dark:ring-teal-500/30",
  WON: "bg-emerald-100 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30",
  LOST: "bg-red-100 text-red-700 ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/30",
};

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TemperatureBadge({ value }: { value: LeadTemperature }) {
  const t = useT();
  return <Badge className={temperatureStyles[value]}>{t.admin.temperatures[value] ?? value}</Badge>;
}

export function StatusBadge({ value }: { value: LeadStatus }) {
  const t = useT();
  return <Badge className={statusStyles[value]}>{t.admin.statuses[value] ?? value}</Badge>;
}
