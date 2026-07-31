"use client";

import { Check } from "lucide-react";
import { useT } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function Stepper({ current }: { current: number }) {
  const t = useT();
  const steps = [
    t.calc.steps.contact,
    t.calc.steps.project,
    t.calc.steps.challenges,
    t.calc.steps.results,
  ];
  return (
    <ol className="flex items-center gap-2 sm:gap-4">
      {steps.map((label, index) => {
        const isDone = index < current;
        const isActive = index === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition",
                  isDone && "bg-emerald-500 text-white",
                  isActive && "bg-accent-gradient text-white shadow-glow ring-4 ring-accent-500/20",
                  !isDone && !isActive && "bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500",
                )}
              >
                {isDone ? <Check className="h-4 w-4" /> : index + 1}
              </span>
              <span
                className={cn(
                  "hidden text-sm font-semibold sm:block",
                  isActive
                    ? "text-brand-900 dark:text-white"
                    : "text-slate-400 dark:text-slate-500",
                )}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <span
                className={cn(
                  "h-0.5 flex-1 rounded",
                  isDone ? "bg-emerald-400" : "bg-slate-200 dark:bg-white/10",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
