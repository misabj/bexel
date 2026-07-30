import Link from "next/link";
import { Logo } from "./Logo";
import { SITE } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-brand-950 text-slate-300">
      <div className="container-page grid gap-8 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            {SITE.tagline}. Estimate the value of integrated BIM planning, cost
            control and collaboration for your organization.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Product</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/calculator" className="hover:text-accent-400">
                ROI Calculator
              </Link>
            </li>
            <li>
              <Link href="/#benefits" className="hover:text-accent-400">
                Benefits
              </Link>
            </li>
            <li>
              <Link href="/#how" className="hover:text-accent-400">
                How it works
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/#demo" className="hover:text-accent-400">
                Request a Demo
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-accent-400">
                Sales Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} BEXEL Growth Platform — MVP concept.</p>
          <p>An independent lead-automation concept for a BIM software company.</p>
        </div>
      </div>
    </footer>
  );
}
