import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DemoCta() {
  return (
    <section id="demo" className="bg-brand-900 py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 to-brand-950 px-8 py-14 text-center shadow-card-hover sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grid-brand bg-[size:28px_28px] opacity-10"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              See your numbers, then see the platform
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Run the ROI calculator to get a personalized estimate, then book a
              demo with a BIM specialist to validate it against your real
              projects.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/calculator">
                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                  Calculate Your ROI
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="mailto:sales@bexel-demo.com?subject=BIM%20Demo%20Request">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto"
                >
                  Request a Demo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
