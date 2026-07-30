import type { Metadata } from "next";
import { getRoiSettings } from "@/lib/db/settings";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const metadata: Metadata = {
  title: "Calculator settings",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getRoiSettings();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-brand-950">
          Calculator settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Adjust the assumptions that drive every ROI calculation. Changes apply
          to new submissions.
        </p>
      </div>
      <SettingsForm initial={settings} />
    </div>
  );
}
