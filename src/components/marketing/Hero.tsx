"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useT } from "@/i18n/provider";
import { BimDashboardVisual } from "./BimDashboardVisual";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const t = useT();

  const stats = [
    { k: t.hero.stats.time, v: t.hero.stats.timeV },
    { k: t.hero.stats.cost, v: t.hero.stats.costV },
    { k: t.hero.stats.risk, v: t.hero.stats.riskV },
  ];

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white dark:border-white/5 dark:bg-ink-900">
      {/* Blueprint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-brand bg-[size:32px_32px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] dark:opacity-[0.07]"
      />
      {/* Aurora glow blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-hero-radial blur-3xl dark:opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-40 hidden h-72 w-72 rounded-full bg-accent-500/20 blur-3xl animate-float lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 hidden h-72 w-72 rounded-full bg-spark-500/20 blur-3xl animate-float animation-delay-400 lg:block"
      />

      <div className="container-page relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent-500" />
            {t.hero.badge}
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-950 dark:text-white sm:text-5xl xl:text-6xl"
          >
            {t.hero.titleA}{" "}
            <span className="text-gradient">{t.hero.titleB}</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/calculator">
              <Button variant="accent" size="lg" className="w-full shadow-glow sm:w-auto">
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/#demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <CalendarCheck className="h-4 w-4" />
                {t.hero.ctaSecondary}
              </Button>
            </Link>
          </motion.div>

          <motion.dl
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-12 grid max-w-md grid-cols-3 gap-6"
          >
            {stats.map((s) => (
              <div key={s.k}>
                <dt className="font-display text-sm font-bold text-brand-900 dark:text-white">
                  {s.k}
                </dt>
                <dd className="mt-1 text-xs text-slate-500 dark:text-slate-400">{s.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:pl-6"
        >
          <BimDashboardVisual />
        </motion.div>
      </div>
    </section>
  );
}
