"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Stepper } from "./Stepper";
import { StepContact, StepProject, StepChallenges } from "./steps";
import { ResultsView } from "./ResultsView";
import { assessmentSchema, type AssessmentSchema } from "@/lib/validation/schemas";
import { AUDIENCES } from "@/config/options";
import type { Audience, Currency, RoiResult } from "@/types";

const STEP_FIELDS: (keyof AssessmentSchema)[][] = [
  ["firstName", "lastName", "email", "company", "jobTitle", "phone", "country", "companySize"],
  ["projectName", "projectType", "projectValue", "currency", "durationMonths", "teamSize", "activeProjects", "bimMaturity"],
  [
    "reportingHours",
    "informationSearchHours",
    "weeklyDelayCost",
    "expectedDelayWeeks",
    "annualChangeRequests",
    "averageChangeRequestCost",
    "duplicatedWorkPercentage",
    "selectedChallenges",
  ],
];

interface SubmitResponse {
  ok: boolean;
  leadId?: string;
  result?: RoiResult;
  leadScore?: number;
  leadTemperature?: "COLD" | "WARM" | "HOT";
  error?: string;
}

export function CalculatorWizard({ audience }: { audience?: Audience }) {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    result: RoiResult;
    currency: Currency;
    company: string;
    leadScore: number;
    temperature: "COLD" | "WARM" | "HOT";
    leadId: string | null;
  } | null>(null);

  const helper = AUDIENCES.find((a) => a.value === audience)?.helper;

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AssessmentSchema>({
    resolver: zodResolver(assessmentSchema) as Resolver<AssessmentSchema>,
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      jobTitle: "",
      phone: "",
      country: "",
      companySize: "SIZE_51_200",
      projectName: "",
      projectType: "COMMERCIAL",
      projectValue: 10_000_000,
      currency: "EUR",
      durationMonths: 18,
      teamSize: 25,
      activeProjects: 5,
      bimMaturity: "COORDINATED",
      reportingHours: 40,
      informationSearchHours: 30,
      weeklyDelayCost: 20_000,
      expectedDelayWeeks: 4,
      annualChangeRequests: 50,
      averageChangeRequestCost: 3000,
      duplicatedWorkPercentage: 12,
      selectedChallenges: [],
      website: "",
    },
  });

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (!valid) {
      toast("Please complete the highlighted fields.", "error");
      return;
    }
    setStep((s) => Math.min(s + 1, 2));
    scrollTop();
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    scrollTop();
  };

  const onSubmit = handleSubmit(async (values) => {
    // Guard: only the final "Challenges" step may submit. Prevents an
    // accidental submit when the Continue button is swapped for the submit
    // button on the same click (React reuses the DOM node otherwise).
    if (step !== 2) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as SubmitResponse;

      if (!res.ok || !data.ok || !data.result) {
        toast(data.error ?? "Something went wrong. Please try again.", "error");
        return;
      }

      setResult({
        result: data.result,
        currency: values.currency,
        company: values.company,
        leadScore: data.leadScore ?? 0,
        temperature: data.leadTemperature ?? "COLD",
        leadId: data.leadId ?? null,
      });
      setStep(3);
      scrollTop();
      toast("Your ROI estimate is ready.", "success");
    } catch {
      toast("Network error. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <Stepper current={step} />
      </div>

      {helper && step < 3 ? (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50 p-4">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
          <p className="text-sm text-brand-800">{helper}</p>
        </div>
      ) : null}

      <div className="card p-6 sm:p-8">
        {step === 3 && result ? (
          <ResultsView
            result={result.result}
            currency={result.currency}
            company={result.company}
            leadScore={result.leadScore}
            temperature={result.temperature}
            leadId={result.leadId}
          />
        ) : (
          <form onSubmit={onSubmit} noValidate>
            {/* Honeypot — hidden from users, catches bots. */}
            <div className="absolute left-[-9999px]" aria-hidden>
              <label htmlFor="website">Website</label>
              <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>

            {step === 0 ? <StepContact register={register} errors={errors} /> : null}
            {step === 1 ? <StepProject register={register} errors={errors} /> : null}
            {step === 2 ? (
              <StepChallenges register={register} errors={errors} watch={watch} setValue={setValue} />
            ) : null}

            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
              <Button type="button" variant="ghost" onClick={goBack} disabled={step === 0}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              {step < 2 ? (
                <Button key="continue" type="button" variant="primary" onClick={goNext}>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button key="submit" type="submit" variant="accent" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Calculating…
                    </>
                  ) : (
                    <>
                      Calculate my ROI
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function scrollTop() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
