import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Contact", "Project", "Challenges", "Results"];

export function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-4">
      {STEPS.map((label, index) => {
        const isDone = index < current;
        const isActive = index === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition",
                  isDone && "bg-emerald-500 text-white",
                  isActive && "bg-brand-800 text-white ring-4 ring-brand-100",
                  !isDone && !isActive && "bg-slate-100 text-slate-400",
                )}
              >
                {isDone ? <Check className="h-4 w-4" /> : index + 1}
              </span>
              <span
                className={cn(
                  "hidden text-sm font-semibold sm:block",
                  isActive ? "text-brand-900" : "text-slate-400",
                )}
              >
                {label}
              </span>
            </div>
            {index < STEPS.length - 1 ? (
              <span
                className={cn(
                  "h-0.5 flex-1 rounded",
                  isDone ? "bg-emerald-400" : "bg-slate-200",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
