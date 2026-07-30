import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/#benefits", label: "Benefits" },
  { href: "/#how", label: "How it works" },
  { href: "/#audience", label: "Who it's for" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-700 transition hover:text-accent-600"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/#demo" className="hidden sm:block">
            <Button variant="ghost" size="sm">
              Request a Demo
            </Button>
          </Link>
          <Link href="/calculator">
            <Button variant="accent" size="sm">
              Calculate Your ROI
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
