"use client";

import { TrendingUp, Layers, MousePointerClick } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/i18n/provider";

export function WhatIsRoi() {
  const t = useT();

  const cards = [
    {
      icon: TrendingUp,
      title: t.intro.roi.title,
      term: t.intro.roi.term as string | undefined,
      text: t.intro.roi.text,
    },
    {
      icon: Layers,
      title: t.intro.app.title,
      term: undefined as string | undefined,
      text: t.intro.app.text,
    },
    {
      icon: MousePointerClick,
      title: t.intro.usage.title,
      term: undefined as string | undefined,
      text: t.intro.usage.text,
    },
  ];

  return (
    <section
      id="about"
      className="border-b border-slate-200 bg-slate-50/70 dark:border-white/5 dark:bg-ink-950"
    >
      <div className="container-page py-20 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-brand-950 dark:text-white sm:text-4xl">
            {t.intro.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {t.intro.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={i * 0.1}>
                <div className="card h-full p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-gradient text-white shadow-glow">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-brand-900 dark:text-white">
                    {card.title}
                  </h3>
                  {card.term ? (
                    <p className="mt-2 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-white/10 dark:text-slate-200">
                      {card.term}
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {card.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
