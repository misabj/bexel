"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useT } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#benefits", label: t.nav.benefits },
    { href: "/#how", label: t.nav.how },
    { href: "/#audience", label: t.nav.audience },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-slate-200 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-ink-900/80"
          : "border-transparent bg-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-700 transition hover:text-accent-600 dark:text-slate-300 dark:hover:text-accent-400"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">{t.nav.login}</span>
            </Button>
          </Link>
          <Link href="/#demo" className="hidden lg:block">
            <Button variant="ghost" size="sm">
              {t.nav.demo}
            </Button>
          </Link>
          <Link href="/calculator">
            <Button variant="accent" size="sm">
              {t.nav.calculate}
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
