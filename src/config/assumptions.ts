import type { RoiSettings } from "@/types";

/**
 * Default calculation assumptions.
 *
 * These are the seed values for the `CalculatorSettings` row and can be
 * overridden at runtime from the admin panel. Keeping them here means the
 * app has sensible defaults even before the database is seeded.
 */
export const DEFAULT_ROI_SETTINGS: RoiSettings = {
  // Fully-loaded hourly cost of a project employee (EUR).
  hourlyEmployeeCost: 45,
  // Share of manual reporting time removed by automated reporting.
  reportingReductionRate: 0.35,
  // Share of information-search time removed by a single source of truth.
  searchReductionRate: 0.3,
  // Share of avoidable delay costs removed by 4D planning & control.
  delayReductionRate: 0.15,
  // Share of change-request cost removed by clash detection & coordination.
  changeReductionRate: 0.1,
  // Share of duplicated/unnecessary work removed by connected data.
  duplicatedWorkReductionRate: 0.2,
  // Fallback annual software cost when the per-user estimate is unavailable.
  defaultSoftwareCost: 12000,
};

/**
 * Software investment estimation bounds and drivers.
 * The estimate scales with team size but is always clamped to this range,
 * matching the brief (6,000–30,000 EUR / year).
 */
export const INVESTMENT_CONFIG = {
  minAnnualCost: 6000,
  maxAnnualCost: 30000,
  costPerUserPerYear: 1200,
  // Multipliers applied on top of the per-user estimate by company size,
  // reflecting broader rollout / enterprise support needs.
  companySizeMultiplier: {
    SIZE_1_10: 0.9,
    SIZE_11_50: 1.0,
    SIZE_51_200: 1.1,
    SIZE_201_500: 1.25,
    SIZE_500_PLUS: 1.4,
  } as const,
} as const;

/** Assumed productive working hours per employee per year. */
export const WORKING_HOURS_PER_YEAR = 1600;

/** Version stamp stored with every calculated result. */
export const CALCULATION_VERSION = "1.0.0";

/**
 * Free / disposable email domains. A submission using one of these is NOT
 * treated as a business email for lead-scoring purposes.
 */
export const NON_BUSINESS_EMAIL_DOMAINS = new Set<string>([
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "mail.com",
  "yandex.com",
  "msn.com",
  "me.com",
]);
