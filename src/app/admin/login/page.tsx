import { Suspense } from "react";
import type { Metadata } from "next";
import { Logo } from "@/components/marketing/Logo";
import { LoginForm } from "@/components/admin/LoginForm";
import { getServerDictionary } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const t = await getServerDictionary();
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <div className="card p-8">
          <h1 className="text-xl font-bold text-brand-900">{t.admin.login.title}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {t.admin.login.subtitle}
          </p>
          <div className="mt-6">
            <Suspense fallback={<div className="h-64" />}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
