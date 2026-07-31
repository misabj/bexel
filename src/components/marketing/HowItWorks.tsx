"use client";

import { motion } from "framer-motion";
import { useT } from "@/i18n/provider";

export function HowItWorks() {
  const t = useT();
  const steps = [
    { n: 1, ...t.how.steps.s1 },
    { n: 2, ...t.how.steps.s2 },
    { n: 3, ...t.how.steps.s3 },
  ];

  return (
    <section
      id="how"
      className="border-b border-slate-200 bg-white py-24 dark:border-white/5 dark:bg-ink-900"
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
            {t.how.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{t.how.subtitle}</p>
        </motion.div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <motion.div
              key={item.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-gradient text-lg font-extrabold text-white shadow-glow">
                  {item.n}
                </span>
                {index < steps.length - 1 ? (
                  <span className="hidden h-0.5 flex-1 bg-gradient-to-r from-slate-200 to-transparent dark:from-white/15 md:block" />
                ) : null}
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-brand-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
