"use client";

import type { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { Field, Input, Select } from "@/components/ui/form";
import {
  BIM_MATURITY_OPTIONS,
  CHALLENGE_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  CURRENCY_OPTIONS,
  PROJECT_TYPE_OPTIONS,
} from "@/config/options";
import { FX_DISCLAIMER } from "@/config/currencies";
import { useT } from "@/i18n/provider";
import type { AssessmentSchema } from "@/lib/validation/schemas";
import type { Challenge } from "@/types";
import { cn } from "@/lib/utils";

type Register = UseFormRegister<AssessmentSchema>;
type Errors = FieldErrors<AssessmentSchema>;

function msg(errors: Errors, key: keyof AssessmentSchema): string | undefined {
  const e = errors[key];
  return e?.message as string | undefined;
}

// ── Step 1: Contact information ───────────────────────────────
export function StepContact({
  register,
  errors,
}: {
  register: Register;
  errors: Errors;
}) {
  const t = useT();
  const c = t.calc.contact;
  return (
    <div>
      <SectionTitle title={c.title} subtitle={c.subtitle} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={c.firstName} htmlFor="firstName" required error={msg(errors, "firstName")}>
          <Input id="firstName" invalid={!!msg(errors, "firstName")} {...register("firstName")} />
        </Field>
        <Field label={c.lastName} htmlFor="lastName" required error={msg(errors, "lastName")}>
          <Input id="lastName" invalid={!!msg(errors, "lastName")} {...register("lastName")} />
        </Field>
        <Field label={c.email} htmlFor="email" required error={msg(errors, "email")}>
          <Input id="email" type="email" invalid={!!msg(errors, "email")} {...register("email")} />
        </Field>
        <Field label={c.company} htmlFor="company" required error={msg(errors, "company")}>
          <Input id="company" invalid={!!msg(errors, "company")} {...register("company")} />
        </Field>
        <Field label={c.jobTitle} htmlFor="jobTitle" required error={msg(errors, "jobTitle")}>
          <Input id="jobTitle" invalid={!!msg(errors, "jobTitle")} {...register("jobTitle")} />
        </Field>
        <Field label={c.phone} htmlFor="phone" hint={t.calc.optional} error={msg(errors, "phone")}>
          <Input id="phone" type="tel" {...register("phone")} />
        </Field>
        <Field label={c.country} htmlFor="country" required error={msg(errors, "country")}>
          <Input id="country" invalid={!!msg(errors, "country")} {...register("country")} />
        </Field>
        <Field label={c.companySize} htmlFor="companySize" required error={msg(errors, "companySize")}>
          <Select id="companySize" invalid={!!msg(errors, "companySize")} {...register("companySize")}>
            {COMPANY_SIZE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {t.enums.companySize[o.value]} {c.employees}
              </option>
            ))}
          </Select>
        </Field>
      </div>
    </div>
  );
}

// ── Step 2: Project information ───────────────────────────────
export function StepProject({
  register,
  errors,
}: {
  register: Register;
  errors: Errors;
}) {
  const t = useT();
  const p = t.calc.project;
  return (
    <div>
      <SectionTitle title={p.title} subtitle={p.subtitle} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={p.projectName} htmlFor="projectName" hint={t.calc.optional} error={msg(errors, "projectName")}>
          <Input id="projectName" {...register("projectName")} />
        </Field>
        <Field label={p.projectType} htmlFor="projectType" required error={msg(errors, "projectType")}>
          <Select id="projectType" invalid={!!msg(errors, "projectType")} {...register("projectType")}>
            {PROJECT_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {t.enums.projectType[o.value]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={p.projectValue} htmlFor="projectValue" required error={msg(errors, "projectValue")}>
          <Input id="projectValue" type="number" min={0} step={1000} invalid={!!msg(errors, "projectValue")} {...register("projectValue")} />
        </Field>
        <Field label={p.currency} htmlFor="currency" required error={msg(errors, "currency")} hint={FX_DISCLAIMER}>
          <Select id="currency" invalid={!!msg(errors, "currency")} {...register("currency")}>
            {CURRENCY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={p.duration} htmlFor="durationMonths" required error={msg(errors, "durationMonths")}>
          <Input id="durationMonths" type="number" min={1} invalid={!!msg(errors, "durationMonths")} {...register("durationMonths")} />
        </Field>
        <Field label={p.teamSize} htmlFor="teamSize" required error={msg(errors, "teamSize")}>
          <Input id="teamSize" type="number" min={1} invalid={!!msg(errors, "teamSize")} {...register("teamSize")} />
        </Field>
        <Field label={p.activeProjects} htmlFor="activeProjects" required error={msg(errors, "activeProjects")}>
          <Input id="activeProjects" type="number" min={0} invalid={!!msg(errors, "activeProjects")} {...register("activeProjects")} />
        </Field>
        <Field label={p.bimMaturity} htmlFor="bimMaturity" required error={msg(errors, "bimMaturity")}>
          <Select id="bimMaturity" invalid={!!msg(errors, "bimMaturity")} {...register("bimMaturity")}>
            {BIM_MATURITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {t.enums.bimMaturity[o.value]}
              </option>
            ))}
          </Select>
        </Field>
      </div>
    </div>
  );
}

// ── Step 3: Current challenges ────────────────────────────────
export function StepChallenges({
  register,
  errors,
  watch,
  setValue,
}: {
  register: Register;
  errors: Errors;
  watch: UseFormWatch<AssessmentSchema>;
  setValue: UseFormSetValue<AssessmentSchema>;
}) {
  const t = useT();
  const ch = t.calc.challenges;
  const selected = (watch("selectedChallenges") ?? []) as Challenge[];
  const dupPct = Number(watch("duplicatedWorkPercentage") ?? 0);

  const toggle = (value: Challenge) => {
    const next = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setValue("selectedChallenges", next, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div>
      <SectionTitle title={ch.title} subtitle={ch.subtitle} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={ch.reportingHours} htmlFor="reportingHours" required error={msg(errors, "reportingHours")}>
          <Input id="reportingHours" type="number" min={0} invalid={!!msg(errors, "reportingHours")} {...register("reportingHours")} />
        </Field>
        <Field label={ch.searchHours} htmlFor="informationSearchHours" required error={msg(errors, "informationSearchHours")}>
          <Input id="informationSearchHours" type="number" min={0} invalid={!!msg(errors, "informationSearchHours")} {...register("informationSearchHours")} />
        </Field>
        <Field label={ch.weeklyDelay} htmlFor="weeklyDelayCost" required error={msg(errors, "weeklyDelayCost")}>
          <Input id="weeklyDelayCost" type="number" min={0} step={1000} invalid={!!msg(errors, "weeklyDelayCost")} {...register("weeklyDelayCost")} />
        </Field>
        <Field label={ch.delayWeeks} htmlFor="expectedDelayWeeks" required error={msg(errors, "expectedDelayWeeks")}>
          <Input id="expectedDelayWeeks" type="number" min={0} invalid={!!msg(errors, "expectedDelayWeeks")} {...register("expectedDelayWeeks")} />
        </Field>
        <Field label={ch.changeReqs} htmlFor="annualChangeRequests" required error={msg(errors, "annualChangeRequests")}>
          <Input id="annualChangeRequests" type="number" min={0} invalid={!!msg(errors, "annualChangeRequests")} {...register("annualChangeRequests")} />
        </Field>
        <Field label={ch.changeCost} htmlFor="averageChangeRequestCost" required error={msg(errors, "averageChangeRequestCost")}>
          <Input id="averageChangeRequestCost" type="number" min={0} step={100} invalid={!!msg(errors, "averageChangeRequestCost")} {...register("averageChangeRequestCost")} />
        </Field>
      </div>

      <div className="mt-5">
        <label htmlFor="duplicatedWorkPercentage" className="label">
          {ch.duplicated}
          <span className="ml-2 font-bold text-accent-600 dark:text-accent-400">{dupPct}%</span>
        </label>
        <input
          id="duplicatedWorkPercentage"
          type="range"
          min={0}
          max={100}
          step={1}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-accent-500 dark:bg-white/10"
          {...register("duplicatedWorkPercentage")}
        />
      </div>

      <fieldset className="mt-8">
        <legend className="label">{ch.problems}</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {CHALLENGE_OPTIONS.map((o) => {
            const active = selected.includes(o.value);
            return (
              <label
                key={o.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition",
                  active
                    ? "border-accent-400 bg-accent-50 text-brand-900 dark:border-accent-500/60 dark:bg-accent-500/10 dark:text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/25",
                )}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 accent-accent-500"
                  checked={active}
                  onChange={() => toggle(o.value)}
                />
                {t.enums.challenge[o.value]}
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-xl font-bold text-brand-900 dark:text-white">{title}</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
    </div>
  );
}
