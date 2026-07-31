"use client";

import { motion } from "framer-motion";
import { useT } from "@/i18n/provider";

export function CalculatorHeader() {
  const t = useT();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container-page py-12 text-center"
    >
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-brand-950 dark:text-white sm:text-4xl">
        {t.calc.title}
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
        {t.calc.subtitle}
      </p>
    </motion.div>
  );
}
