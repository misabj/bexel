"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/form";
import { useToast } from "@/components/ui/Toast";
import { useT } from "@/i18n/provider";
import { settingsSchema, type SettingsSchema } from "@/lib/validation/schemas";
import type { RoiSettings } from "@/types";

export function SettingsForm({ initial }: { initial: RoiSettings }) {
  const { toast } = useToast();
  const t = useT();
  const s = t.admin.settings;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsSchema>({
    resolver: zodResolver(settingsSchema) as Resolver<SettingsSchema>,
    defaultValues: initial,
  });

  const onSubmit = handleSubmit(async (values) => {
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = (await res.json()) as { ok: boolean; error?: string };
    if (!res.ok || !data.ok) {
      toast(data.error ?? s.saveError, "error");
      return;
    }
    toast(s.saved, "success");
  });

  const err = (k: keyof SettingsSchema) => errors[k]?.message as string | undefined;

  return (
    <form onSubmit={onSubmit} className="card space-y-6">
      <Field label={s.hourlyEmployeeCost} htmlFor="hourlyEmployeeCost" error={err("hourlyEmployeeCost")}>
        <Input id="hourlyEmployeeCost" type="number" step="1" {...register("hourlyEmployeeCost")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={s.reportingReductionRate} htmlFor="reportingReductionRate" error={err("reportingReductionRate")}>
          <Input id="reportingReductionRate" type="number" step="0.01" {...register("reportingReductionRate")} />
        </Field>
        <Field label={s.searchReductionRate} htmlFor="searchReductionRate" error={err("searchReductionRate")}>
          <Input id="searchReductionRate" type="number" step="0.01" {...register("searchReductionRate")} />
        </Field>
        <Field label={s.delayReductionRate} htmlFor="delayReductionRate" error={err("delayReductionRate")}>
          <Input id="delayReductionRate" type="number" step="0.01" {...register("delayReductionRate")} />
        </Field>
        <Field label={s.changeReductionRate} htmlFor="changeReductionRate" error={err("changeReductionRate")}>
          <Input id="changeReductionRate" type="number" step="0.01" {...register("changeReductionRate")} />
        </Field>
        <Field label={s.duplicatedWorkReductionRate} htmlFor="duplicatedWorkReductionRate" error={err("duplicatedWorkReductionRate")}>
          <Input id="duplicatedWorkReductionRate" type="number" step="0.01" {...register("duplicatedWorkReductionRate")} />
        </Field>
        <Field label={s.defaultSoftwareCost} htmlFor="defaultSoftwareCost" error={err("defaultSoftwareCost")}>
          <Input id="defaultSoftwareCost" type="number" step="100" {...register("defaultSoftwareCost")} />
        </Field>
      </div>

      <div className="flex justify-end border-t border-slate-100 pt-4">
        <Button type="submit" variant="accent" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {s.save}
        </Button>
      </div>
    </form>
  );
}
