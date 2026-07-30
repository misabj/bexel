import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/config/site";
import { BimDashboardVisual } from "./BimDashboardVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      {/* Subtle blueprint grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-brand bg-[size:32px_32px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />
      <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            BIM ROI Calculator
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-brand-950 sm:text-5xl">
            {SITE.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            {SITE.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/calculator">
              <Button variant="accent" size="lg" className="w-full sm:w-auto">
                Calculate Your ROI
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/#demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <CalendarCheck className="h-4 w-4" />
                Request a Demo
              </Button>
            </Link>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {[
              { k: "Time", v: "Less manual reporting" },
              { k: "Cost", v: "Better budget control" },
              { k: "Risk", v: "Earlier detection" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="text-sm font-bold text-brand-900">{s.k}</dt>
                <dd className="mt-1 text-xs text-slate-500">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="lg:pl-6">
          <BimDashboardVisual />
        </div>
      </div>
    </section>
  );
}
