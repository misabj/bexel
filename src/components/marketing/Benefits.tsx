"use client";

import { Clock, Eye, FileBarChart, ShieldAlert, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useT } from "@/i18n/provider";

const ITEMS: { key: "delays" | "cost" | "reporting" | "risk"; icon: LucideIcon }[] = [
  { key: "delays", icon: Clock },
  { key: "cost", icon: Eye },
  { key: "reporting", icon: FileBarChart },
  { key: "risk", icon: ShieldAlert },
];

export function Benefits() {
  const t = useT();
  return (
    <section
      id="benefits"
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
            {t.benefits.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            {t.benefits.subtitle}
          </p>
        </motion.div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ key, icon: Icon }, i) => {
            const item = t.benefits.items[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group card relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover dark:hover:border-white/20"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-gradient opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
                />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-800 text-white shadow-glow transition-transform duration-300 group-hover:scale-110 dark:bg-gradient-to-br dark:from-brand-600 dark:to-brand-800">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="relative mt-5 font-display text-lg font-bold text-brand-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
