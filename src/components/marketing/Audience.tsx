"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
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
import { useT } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const ICONS: Record<AudienceType, LucideIcon> = {
  INVESTORS: Briefcase,
  CONTRACTORS: HardHat,
  BIM_MANAGERS: Boxes,
  PROJECT_MANAGERS: ClipboardList,
  COST_MANAGERS: Calculator,
};

export function Audience() {
  const t = useT();
  const [active, setActive] = useState<AudienceType>("BIM_MANAGERS");

  return (
    <section
      id="audience"
      className="border-b border-slate-200 bg-slate-50 py-24 dark:border-white/5 dark:bg-ink-850"
    >
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-950 dark:text-white sm:text-4xl">
            {t.audience.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            {t.audience.subtitle}
          </p>
        </motion.div>

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
                    ? "border-transparent bg-brand-800 text-white shadow-glow dark:bg-accent-gradient"
                    : "border-slate-300 bg-white text-brand-800 hover:border-brand-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/25",
                )}
              >
                <Icon className="h-4 w-4" />
                {t.audience.roles[audience.value]}
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-8 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl p-8 text-center shadow-card"
            >
              <p className="text-lg font-medium text-brand-900 dark:text-slate-100">
                {t.audience.helpers[active]}
              </p>
              <Link
                href={`/calculator?audience=${active}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-600 transition hover:gap-3 hover:text-accent-500 dark:text-accent-400"
              >
                {t.audience.startAs} {t.audience.roles[active]}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
