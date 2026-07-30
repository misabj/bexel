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
  return (
    <div>
      <SectionTitle
        title="Contact information"
        subtitle="Tell us who you are so we can share your personalized results."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" htmlFor="firstName" required error={msg(errors, "firstName")}>
          <Input id="firstName" invalid={!!msg(errors, "firstName")} {...register("firstName")} />
        </Field>
        <Field label="Last name" htmlFor="lastName" required error={msg(errors, "lastName")}>
          <Input id="lastName" invalid={!!msg(errors, "lastName")} {...register("lastName")} />
        </Field>
        <Field label="Work email" htmlFor="email" required error={msg(errors, "email")}>
          <Input id="email" type="email" invalid={!!msg(errors, "email")} {...register("email")} />
        </Field>
        <Field label="Company" htmlFor="company" required error={msg(errors, "company")}>
          <Input id="company" invalid={!!msg(errors, "company")} {...register("company")} />
        </Field>
        <Field label="Job title" htmlFor="jobTitle" required error={msg(errors, "jobTitle")}>
          <Input id="jobTitle" invalid={!!msg(errors, "jobTitle")} {...register("jobTitle")} />
        </Field>
        <Field label="Phone" htmlFor="phone" hint="Optional" error={msg(errors, "phone")}>
          <Input id="phone" type="tel" {...register("phone")} />
        </Field>
        <Field label="Country" htmlFor="country" required error={msg(errors, "country")}>
          <Input id="country" invalid={!!msg(errors, "country")} {...register("country")} />
        </Field>
        <Field label="Company size" htmlFor="companySize" required error={msg(errors, "companySize")}>
          <Select id="companySize" invalid={!!msg(errors, "companySize")} {...register("companySize")}>
            {COMPANY_SIZE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label} employees
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
  return (
    <div>
      <SectionTitle
        title="Project information"
        subtitle="Describe a representative project. This drives the ROI estimate."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Project name" htmlFor="projectName" hint="Optional" error={msg(errors, "projectName")}>
          <Input id="projectName" {...register("projectName")} />
        </Field>
        <Field label="Project type" htmlFor="projectType" required error={msg(errors, "projectType")}>
          <Select id="projectType" invalid={!!msg(errors, "projectType")} {...register("projectType")}>
            {PROJECT_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Estimated project value" htmlFor="projectValue" required error={msg(errors, "projectValue")}>
          <Input id="projectValue" type="number" min={0} step={1000} invalid={!!msg(errors, "projectValue")} {...register("projectValue")} />
        </Field>
        <Field label="Currency" htmlFor="currency" required error={msg(errors, "currency")} hint={FX_DISCLAIMER}>
          <Select id="currency" invalid={!!msg(errors, "currency")} {...register("currency")}>
            {CURRENCY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Expected duration (months)" htmlFor="durationMonths" required error={msg(errors, "durationMonths")}>
          <Input id="durationMonths" type="number" min={1} invalid={!!msg(errors, "durationMonths")} {...register("durationMonths")} />
        </Field>
        <Field label="Project team members" htmlFor="teamSize" required error={msg(errors, "teamSize")}>
          <Input id="teamSize" type="number" min={1} invalid={!!msg(errors, "teamSize")} {...register("teamSize")} />
        </Field>
        <Field label="Number of active projects" htmlFor="activeProjects" required error={msg(errors, "activeProjects")}>
          <Input id="activeProjects" type="number" min={0} invalid={!!msg(errors, "activeProjects")} {...register("activeProjects")} />
        </Field>
        <Field label="Current BIM maturity" htmlFor="bimMaturity" required error={msg(errors, "bimMaturity")}>
          <Select id="bimMaturity" invalid={!!msg(errors, "bimMaturity")} {...register("bimMaturity")}>
            {BIM_MATURITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
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
      <SectionTitle
        title="Current challenges"
        subtitle="Quantify today's pain so we can estimate the improvement."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Monthly hours on manual reporting" htmlFor="reportingHours" required error={msg(errors, "reportingHours")}>
          <Input id="reportingHours" type="number" min={0} invalid={!!msg(errors, "reportingHours")} {...register("reportingHours")} />
        </Field>
        <Field label="Monthly hours searching for information" htmlFor="informationSearchHours" required error={msg(errors, "informationSearchHours")}>
          <Input id="informationSearchHours" type="number" min={0} invalid={!!msg(errors, "informationSearchHours")} {...register("informationSearchHours")} />
        </Field>
        <Field label="Cost of one week of delay" htmlFor="weeklyDelayCost" required error={msg(errors, "weeklyDelayCost")}>
          <Input id="weeklyDelayCost" type="number" min={0} step={1000} invalid={!!msg(errors, "weeklyDelayCost")} {...register("weeklyDelayCost")} />
        </Field>
        <Field label="Expected number of delay weeks" htmlFor="expectedDelayWeeks" required error={msg(errors, "expectedDelayWeeks")}>
          <Input id="expectedDelayWeeks" type="number" min={0} invalid={!!msg(errors, "expectedDelayWeeks")} {...register("expectedDelayWeeks")} />
        </Field>
        <Field label="Annual number of change requests" htmlFor="annualChangeRequests" required error={msg(errors, "annualChangeRequests")}>
          <Input id="annualChangeRequests" type="number" min={0} invalid={!!msg(errors, "annualChangeRequests")} {...register("annualChangeRequests")} />
        </Field>
        <Field label="Average cost per change request" htmlFor="averageChangeRequestCost" required error={msg(errors, "averageChangeRequestCost")}>
          <Input id="averageChangeRequestCost" type="number" min={0} step={100} invalid={!!msg(errors, "averageChangeRequestCost")} {...register("averageChangeRequestCost")} />
        </Field>
      </div>

      <div className="mt-5">
        <label htmlFor="duplicatedWorkPercentage" className="label">
          Duplicated / unnecessary work
          <span className="ml-2 font-bold text-brand-800">{dupPct}%</span>
        </label>
        <input
          id="duplicatedWorkPercentage"
          type="range"
          min={0}
          max={100}
          step={1}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-accent-500"
          {...register("duplicatedWorkPercentage")}
        />
      </div>

      <fieldset className="mt-8">
        <legend className="label">Which problems do you experience today?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {CHALLENGE_OPTIONS.map((o) => {
            const active = selected.includes(o.value);
            return (
              <label
                key={o.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition",
                  active
                    ? "border-brand-500 bg-brand-50 text-brand-900"
                    : "border-slate-200 bg-white text-slate-600 hover:border-brand-300",
                )}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 accent-brand-600"
                  checked={active}
                  onChange={() => toggle(o.value)}
                />
                {o.label}
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
      <h2 className="text-xl font-bold text-brand-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}
