"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useT } from "@/i18n/provider";

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-slate-200 bg-slate-100 text-slate-600 dark:border-white/10 dark:bg-ink-900 dark:text-slate-300">
      <div className="container-page grid gap-8 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {t.footer.tagline}
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-brand-900 dark:text-white">{t.footer.product}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/calculator" className="transition hover:text-accent-600 dark:hover:text-accent-400">
                {t.footer.roiCalculator}
              </Link>
            </li>
            <li>
              <Link href="/#benefits" className="transition hover:text-accent-600 dark:hover:text-accent-400">
                {t.footer.benefits}
              </Link>
            </li>
            <li>
              <Link href="/#how" className="transition hover:text-accent-600 dark:hover:text-accent-400">
                {t.footer.how}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-brand-900 dark:text-white">{t.footer.company}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/#demo" className="transition hover:text-accent-600 dark:hover:text-accent-400">
                {t.footer.requestDemo}
              </Link>
            </li>
            <li>
              <Link href="/admin" className="transition hover:text-accent-600 dark:hover:text-accent-400">
                {t.footer.salesAdmin}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 dark:border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
          <p>{t.footer.rights}</p>
          <p>{t.footer.note}</p>
        </div>
      </div>
    </footer>
  );
}
