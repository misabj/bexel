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
    default: "bg-white border-slate-200",
    brand: "bg-brand-800 border-brand-800 text-white",
    accent: "bg-accent-50 border-accent-200",
    emerald: "bg-emerald-50 border-emerald-200",
    red: "bg-red-50 border-red-200",
  } as const;
  const isDark = tone === "brand";
  return (
    <div className={cn("rounded-2xl border p-5 shadow-card", tones[tone])}>
      <div className="flex items-center justify-between">
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-wide",
            isDark ? "text-brand-100" : "text-slate-500",
          )}
        >
          {label}
        </p>
        {icon ? (
          <span className={isDark ? "text-accent-400" : "text-brand-400"}>{icon}</span>
        ) : null}
      </div>
      <p
        className={cn(
          "mt-2 text-2xl font-extrabold tracking-tight",
          isDark ? "text-white" : "text-brand-900",
        )}
      >
        {value}
      </p>
      {sub ? (
        <p className={cn("mt-1 text-xs", isDark ? "text-brand-200" : "text-slate-500")}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}
