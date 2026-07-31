import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  sub,
  tone = "default",
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "default" | "brand" | "accent" | "emerald" | "red";
  icon?: React.ReactNode;
}) {
  const tones = {
    default: "bg-white border-slate-200 dark:bg-ink-800/70 dark:border-white/10",
    brand: "bg-brand-800 border-brand-800 text-white dark:bg-gradient-to-br dark:from-brand-600 dark:to-brand-800 dark:border-white/10 shadow-glow",
    accent: "bg-accent-50 border-accent-200 dark:bg-accent-500/10 dark:border-accent-500/30",
    emerald: "bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30",
    red: "bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/30",
  } as const;
  const isDark = tone === "brand";
  return (
    <div className={cn("rounded-2xl border p-5 shadow-card transition-transform duration-300 hover:-translate-y-0.5", tones[tone])}>
      <div className="flex items-center justify-between">
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-wide",
            isDark ? "text-brand-100" : "text-slate-500 dark:text-slate-400",
          )}
        >
          {label}
        </p>
        {icon ? (
          <span className={isDark ? "text-accent-300" : "text-brand-400 dark:text-accent-400"}>{icon}</span>
        ) : null}
      </div>
      <p
        className={cn(
          "mt-2 font-display text-2xl font-extrabold tracking-tight",
          isDark ? "text-white" : "text-brand-900 dark:text-white",
        )}
      >
        {value}
      </p>
      {sub ? (
        <p className={cn("mt-1 text-xs", isDark ? "text-brand-200" : "text-slate-500 dark:text-slate-400")}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}
