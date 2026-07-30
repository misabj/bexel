"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/form";
import { useToast } from "@/components/ui/Toast";
import { settingsSchema, type SettingsSchema } from "@/lib/validation/schemas";
import type { RoiSettings } from "@/types";

export function SettingsForm({ initial }: { initial: RoiSettings }) {
  const { toast } = useToast();
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
      toast(data.error ?? "Could not save settings.", "error");
      return;
    }
    toast("Calculator settings saved.", "success");
  });

  const err = (k: keyof SettingsSchema) => errors[k]?.message as string | undefined;

  return (
    <form onSubmit={onSubmit} className="card space-y-6">
      <Field label="Hourly employee cost (EUR)" htmlFor="hourlyEmployeeCost" error={err("hourlyEmployeeCost")}>
        <Input id="hourlyEmployeeCost" type="number" step="1" {...register("hourlyEmployeeCost")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Reporting reduction rate (0–1)" htmlFor="reportingReductionRate" error={err("reportingReductionRate")}>
          <Input id="reportingReductionRate" type="number" step="0.01" {...register("reportingReductionRate")} />
        </Field>
        <Field label="Info-search reduction rate (0–1)" htmlFor="searchReductionRate" error={err("searchReductionRate")}>
          <Input id="searchReductionRate" type="number" step="0.01" {...register("searchReductionRate")} />
        </Field>
        <Field label="Delay reduction rate (0–1)" htmlFor="delayReductionRate" error={err("delayReductionRate")}>
          <Input id="delayReductionRate" type="number" step="0.01" {...register("delayReductionRate")} />
        </Field>
        <Field label="Change-request reduction rate (0–1)" htmlFor="changeReductionRate" error={err("changeReductionRate")}>
          <Input id="changeReductionRate" type="number" step="0.01" {...register("changeReductionRate")} />
        </Field>
        <Field label="Duplicated-work reduction rate (0–1)" htmlFor="duplicatedWorkReductionRate" error={err("duplicatedWorkReductionRate")}>
          <Input id="duplicatedWorkReductionRate" type="number" step="0.01" {...register("duplicatedWorkReductionRate")} />
        </Field>
        <Field label="Default software cost (EUR/yr)" htmlFor="defaultSoftwareCost" error={err("defaultSoftwareCost")}>
          <Input id="defaultSoftwareCost" type="number" step="100" {...register("defaultSoftwareCost")} />
        </Field>
      </div>

      <div className="flex justify-end border-t border-slate-100 pt-4">
        <Button type="submit" variant="accent" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save settings
        </Button>
      </div>
    </form>
  );
}
