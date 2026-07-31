import { z } from "zod";

/**
 * Validation schemas (Zod).
 *
 * Every API boundary parses input through these schemas. Text is trimmed and
 * length-capped to mitigate abuse; numbers are coerced (forms submit strings)
 * and bounded to logical ranges.
 */

/** Trim, collapse internal whitespace and cap length of free text. */
export function sanitizeText(value: string, maxLength = 300): string {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

const text = (max: number) =>
  z
    .string()
    .transform((v) => sanitizeText(v, max))
    .pipe(z.string().min(1, "Required"));

const optionalText = (max: number) =>
  z
    .string()
    .transform((v) => sanitizeText(v, max))
    .optional()
    .or(z.literal(""));

export const COMPANY_SIZE_VALUES = [
  "SIZE_1_10",
  "SIZE_11_50",
  "SIZE_51_200",
  "SIZE_201_500",
  "SIZE_500_PLUS",
] as const;

export const PROJECT_TYPE_VALUES = [
  "RESIDENTIAL",
  "COMMERCIAL",
  "INFRASTRUCTURE",
  "INDUSTRIAL",
  "HEALTHCARE",
  "EDUCATION",
  "OTHER",
] as const;

export const BIM_MATURITY_VALUES = [
  "NONE",
  "BASIC_3D",
  "COORDINATED",
  "PLANNING_4D",
  "COST_5D",
  "INTEGRATED",
] as const;

export const CURRENCY_VALUES = ["EUR", "USD", "GBP", "AED", "SAR"] as const;

export const CHALLENGE_VALUES = [
  "DISCONNECTED_DATA",
  "MANUAL_REPORTING",
  "POOR_COST_VISIBILITY",
  "SCHEDULE_DELAYS",
  "DIFFICULT_COLLABORATION",
  "LATE_RISK_DETECTION",
  "TOO_MANY_EXCEL",
  "LIMITED_FIELD_COMMS",
] as const;

export const LEAD_STATUS_VALUES = [
  "NEW",
  "CONTACTED",
  "DEMO_SCHEDULED",
  "TRIAL_STARTED",
  "QUALIFIED",
  "WON",
  "LOST",
] as const;

// ── Step 1: Contact information ───────────────────────────────
export const contactSchema = z.object({
  firstName: text(80),
  lastName: text(80),
  email: z
    .string()
    .transform((v) => v.trim().toLowerCase())
    .pipe(z.string().email("Enter a valid work email").max(160)),
  company: text(160),
  jobTitle: text(120),
  phone: optionalText(40),
  country: text(80),
  companySize: z.enum(COMPANY_SIZE_VALUES),
});

// ── Step 2: Project information ───────────────────────────────
export const projectSchema = z.object({
  projectName: optionalText(160),
  projectType: z.enum(PROJECT_TYPE_VALUES),
  projectValue: z.coerce
    .number({ invalid_type_error: "Enter a number" })
    .min(0, "Cannot be negative")
    .max(100_000_000_000),
  currency: z.enum(CURRENCY_VALUES),
  durationMonths: z.coerce.number().int().min(1, "At least 1 month").max(600),
  teamSize: z.coerce.number().int().min(1, "At least 1 person").max(100_000),
  activeProjects: z.coerce.number().int().min(0).max(100_000),
  bimMaturity: z.enum(BIM_MATURITY_VALUES),
});

// ── Step 3: Current challenges ────────────────────────────────
export const challengesSchema = z.object({
  reportingHours: z.coerce.number().min(0).max(100_000),
  informationSearchHours: z.coerce.number().min(0).max(100_000),
  weeklyDelayCost: z.coerce.number().min(0).max(1_000_000_000),
  expectedDelayWeeks: z.coerce.number().min(0).max(520),
  annualChangeRequests: z.coerce.number().int().min(0).max(1_000_000),
  averageChangeRequestCost: z.coerce.number().min(0).max(1_000_000_000),
  duplicatedWorkPercentage: z.coerce.number().min(0).max(100),
  selectedChallenges: z.array(z.enum(CHALLENGE_VALUES)).max(20).default([]),
});

// ── Full assessment (public submission) ───────────────────────
export const assessmentSchema = contactSchema
  .merge(projectSchema)
  .merge(challengesSchema)
  .extend({
    // Honeypot: must stay empty. Bots that fill every field are rejected.
    website: z.string().max(0).optional().or(z.literal("")),
  });

export type AssessmentSchema = z.infer<typeof assessmentSchema>;
export type ContactSchema = z.infer<typeof contactSchema>;
export type ProjectSchema = z.infer<typeof projectSchema>;
export type ChallengesSchema = z.infer<typeof challengesSchema>;

// ── Admin schemas ─────────────────────────────────────────────
export const loginSchema = z.object({
  password: z.string().min(1).max(200),
});

export const updateStatusSchema = z.object({
  status: z.enum(LEAD_STATUS_VALUES),
});

export const addNoteSchema = z.object({
  note: text(2000),
});

export const settingsSchema = z.object({
  hourlyEmployeeCost: z.coerce.number().min(1).max(1000),
  reportingReductionRate: z.coerce.number().min(0).max(1),
  searchReductionRate: z.coerce.number().min(0).max(1),
  delayReductionRate: z.coerce.number().min(0).max(1),
  changeReductionRate: z.coerce.number().min(0).max(1),
  duplicatedWorkReductionRate: z.coerce.number().min(0).max(1),
  defaultSoftwareCost: z.coerce.number().min(0).max(10_000_000),
});

export type SettingsSchema = z.infer<typeof settingsSchema>;
