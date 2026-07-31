"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Settings, ExternalLink } from "lucide-react";
import { Logo } from "@/components/marketing/Logo";
import { LogoutButton } from "./LogoutButton";
import { useT } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const t = useT();
  const NAV = [
    { href: "/admin", label: t.admin.nav.dashboard, icon: LayoutDashboard, exact: true },
    { href: "/admin/leads", label: t.admin.nav.leads, icon: Users, exact: false },
    { href: "/admin/settings", label: t.admin.nav.settings, icon: Settings, exact: true },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-ink-900 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-ink-800 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:block lg:px-6 lg:py-5">
          <div>
            <Logo />
            <p className="mt-1 hidden text-xs font-medium text-slate-400 dark:text-slate-500 lg:block">
              {t.admin.nav.salesAdmin}
            </p>
          </div>
          <div className="lg:hidden">
            <LogoutButton full={false} />
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:space-y-1 lg:overflow-visible lg:px-4 lg:pb-4">
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition lg:gap-3 lg:py-2.5",
                  active
                    ? "bg-brand-800 text-white"
                    : "text-brand-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-ink-700/50",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-brand-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-ink-700/50 lg:hidden"
          >
            <ExternalLink className="h-4 w-4" />
            {t.admin.nav.publicSite}
          </Link>
        </nav>

        <div className="hidden space-y-2 border-t border-slate-100 dark:border-white/10 p-4 lg:block">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-brand-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-ink-700/50"
          >
            <ExternalLink className="h-4 w-4" />
            {t.admin.nav.viewPublicSite}
          </Link>
          <LogoutButton />
          <p className="truncate px-3 pt-2 text-xs text-slate-400 dark:text-slate-500">{t.admin.nav.administrator}</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
