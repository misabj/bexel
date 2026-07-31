"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useT } from "@/i18n/provider";

export function DemoCta() {
  const t = useT();
  return (
    <section id="demo" className="bg-white py-24 dark:bg-ink-900">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-spark-50/60 px-8 py-16 text-center shadow-card-hover dark:border-white/10 dark:from-ink-800 dark:to-ink-950 sm:px-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grid-brand bg-[size:28px_28px] opacity-[0.06] dark:opacity-10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent-500/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-spark-500/25 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-950 dark:text-white sm:text-4xl">
              {t.demo.title}
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t.demo.subtitle}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/calculator">
                <Button variant="accent" size="lg" className="w-full shadow-glow sm:w-auto">
                  {t.demo.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="mailto:sales@bexel-demo.com?subject=BIM%20Demo%20Request">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {t.demo.ctaSecondary}
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
