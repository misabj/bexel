"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  HardHat,
  Boxes,
  ClipboardList,
  Calculator,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { AUDIENCES } from "@/config/options";
import type { Audience as AudienceType } from "@/types";
import { cn } from "@/lib/utils";

const ICONS: Record<AudienceType, LucideIcon> = {
  INVESTORS: Briefcase,
  CONTRACTORS: HardHat,
  BIM_MANAGERS: Boxes,
  PROJECT_MANAGERS: ClipboardList,
  COST_MANAGERS: Calculator,
};

export function Audience() {
  const [active, setActive] = useState<AudienceType>("BIM_MANAGERS");
  const current = AUDIENCES.find((a) => a.value === active) ?? AUDIENCES[0]!;

  return (
    <section id="audience" className="border-b border-slate-200 bg-slate-50 py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
            Built for every project role
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Select your role to see how the ROI calculator speaks to your
            priorities.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {AUDIENCES.map((audience) => {
            const Icon = ICONS[audience.value];
            const isActive = audience.value === active;
            return (
              <button
                key={audience.value}
                type="button"
                onClick={() => setActive(audience.value)}
                aria-pressed={isActive}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition",
                  isActive
                    ? "border-brand-800 bg-brand-800 text-white shadow-card"
                    : "border-slate-300 bg-white text-brand-800 hover:border-brand-400",
                )}
              >
                <Icon className="h-4 w-4" />
                {audience.label}
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-card">
          <p className="text-lg font-medium text-brand-900">{current.helper}</p>
          <Link
            href={`/calculator?audience=${current.value}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700"
          >
            Start the calculator as {current.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
