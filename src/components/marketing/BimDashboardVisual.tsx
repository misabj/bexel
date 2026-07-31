import { TrendingUp, Layers3, CircleDollarSign, CalendarClock } from "lucide-react";

/**
 * Original, code-drawn BIM dashboard mockup used in the hero.
 * No third-party or copyrighted imagery — an isometric building wireframe
 * plus synthetic KPI cards and a schedule/progress panel.
 */
export function BimDashboardVisual() {
  return (
    <div className="relative">
      {/* Main dashboard panel */}
      <div className="card overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-slate-100 bg-brand-950 px-5 py-3">
          <div className="flex items-center gap-2 text-white">
            <Layers3 className="h-4 w-4 text-accent-400" />
            <span className="text-sm font-semibold">Project Control Center</span>
          </div>
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-400" />
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-5">
          {/* Isometric building wireframe */}
          <div className="sm:col-span-3">
            <div className="relative flex h-56 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-slate-100 dark:from-ink-700 dark:to-ink-800">
              <svg viewBox="0 0 220 200" className="h-52 w-52" role="img" aria-label="BIM building model">
                <defs>
                  <linearGradient id="face-a" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#347f72" />
                    <stop offset="1" stopColor="#23534d" />
                  </linearGradient>
                  <linearGradient id="face-b" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#28665d" />
                    <stop offset="1" stopColor="#173f45" />
                  </linearGradient>
                </defs>
                {/* Stacked isometric floors */}
                {[0, 1, 2, 3].map((i) => {
                  const y = 120 - i * 26;
                  return (
                    <g key={i}>
                      <polygon
                        points={`110,${y} 180,${y + 24} 110,${y + 48} 40,${y + 24}`}
                        fill="#edf7f4"
                        stroke="#7abdae"
                        strokeWidth="1.5"
                      />
                      <polygon
                        points={`40,${y + 24} 110,${y + 48} 110,${y + 66} 40,${y + 42}`}
                        fill="url(#face-a)"
                      />
                      <polygon
                        points={`110,${y + 48} 180,${y + 24} 180,${y + 42} 110,${y + 66}`}
                        fill="url(#face-b)"
                      />
                    </g>
                  );
                })}
                {/* Highlighted clash marker */}
                <circle cx="150" cy="70" r="7" fill="#87a73b" opacity="0.9" />
                <circle cx="150" cy="70" r="12" fill="none" stroke="#87a73b" strokeWidth="1.5" opacity="0.5" />
              </svg>
              <span className="absolute bottom-3 left-3 rounded-md bg-white/80 px-2 py-1 text-[11px] font-medium text-brand-700 dark:bg-ink-900/80 dark:text-slate-200">
                4D / 5D model
              </span>
            </div>
          </div>

          {/* KPI mini cards */}
          <div className="grid gap-3 sm:col-span-2">
            <MiniKpi icon={<TrendingUp className="h-4 w-4" />} label="On-time delivery" value="+18%" tone="emerald" />
            <MiniKpi icon={<CircleDollarSign className="h-4 w-4" />} label="Cost variance" value="-6.4%" tone="brand" />
            <MiniKpi icon={<CalendarClock className="h-4 w-4" />} label="Schedule risk" value="Low" tone="accent" />
          </div>
        </div>

        {/* Progress / schedule bars */}
        <div className="space-y-3 border-t border-slate-100 px-5 py-4 dark:border-white/5">
          {[
            { label: "Structure", pct: 82 },
            { label: "MEP coordination", pct: 64 },
            { label: "Cost estimate", pct: 91 },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-3">
              <span className="w-32 shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">
                {row.label}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-accent-gradient"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
              <span className="w-9 text-right text-xs font-semibold text-brand-800 dark:text-slate-200">
                {row.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating savings badge */}
      <div className="absolute -bottom-5 -left-4 hidden rounded-xl bg-white p-4 shadow-card-hover ring-1 ring-slate-100 dark:bg-ink-800 dark:ring-white/10 sm:block animate-float">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Est. annual savings</p>
        <p className="font-display text-2xl font-extrabold text-brand-900 dark:text-white">€84,000</p>
      </div>
    </div>
  );
}

function MiniKpi({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "emerald" | "brand" | "accent";
}) {
  const tones = {
    emerald: "text-emerald-600 bg-emerald-50",
    brand: "text-brand-600 bg-brand-50",
    accent: "text-accent-600 bg-accent-50",
  } as const;
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 dark:border-white/10 dark:bg-ink-700">
      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${tones[tone]}`}>
        {icon}
      </span>
      <p className="mt-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-lg font-bold text-brand-900 dark:text-white">{value}</p>
    </div>
  );
}
