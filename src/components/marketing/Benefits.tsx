import { Clock, Eye, FileBarChart, ShieldAlert, type LucideIcon } from "lucide-react";
import { BENEFITS } from "@/config/site";

const ICONS: Record<string, LucideIcon> = {
  clock: Clock,
  eye: Eye,
  "file-bar-chart": FileBarChart,
  "shield-alert": ShieldAlert,
};

export function Benefits() {
  return (
    <section id="benefits" className="border-b border-slate-200 bg-slate-50 py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
            Turn connected BIM into measurable outcomes
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Four areas where integrated BIM planning, cost control and
            collaboration create tangible value on every project.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => {
            const Icon = ICONS[benefit.icon] ?? Clock;
            return (
              <div
                key={benefit.title}
                className="card p-6 transition hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-800 text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-brand-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
