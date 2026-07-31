import type { Metadata } from "next";
import { getRoiSettings } from "@/lib/db/settings";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getServerDictionary } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Calculator settings",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getRoiSettings();
  const t = await getServerDictionary();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-brand-950">
          {t.admin.settings.title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {t.admin.settings.subtitle}
        </p>
      </div>
      <SettingsForm initial={settings} />
    </div>
  );
}
