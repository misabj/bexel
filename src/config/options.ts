import type {
  Audience,
  BimMaturity,
  Challenge,
  CompanySize,
  Currency,
  LeadStatus,
  LeadTemperature,
  ProjectType,
} from "@/types";

export interface Option<T extends string> {
  value: T;
  label: string;
}

export const COMPANY_SIZE_OPTIONS: Option<CompanySize>[] = [
  { value: "SIZE_1_10", label: "1–10" },
  { value: "SIZE_11_50", label: "11–50" },
  { value: "SIZE_51_200", label: "51–200" },
  { value: "SIZE_201_500", label: "201–500" },
  { value: "SIZE_500_PLUS", label: "500+" },
];

export const PROJECT_TYPE_OPTIONS: Option<ProjectType>[] = [
  { value: "RESIDENTIAL", label: "Residential" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "INFRASTRUCTURE", label: "Infrastructure" },
  { value: "INDUSTRIAL", label: "Industrial" },
  { value: "HEALTHCARE", label: "Healthcare" },
  { value: "EDUCATION", label: "Education" },
  { value: "OTHER", label: "Other" },
];

export const BIM_MATURITY_OPTIONS: Option<BimMaturity>[] = [
  { value: "NONE", label: "No formal BIM process" },
  { value: "BASIC_3D", label: "Basic 3D BIM" },
  { value: "COORDINATED", label: "Coordinated BIM" },
  { value: "PLANNING_4D", label: "4D planning" },
  { value: "COST_5D", label: "5D cost management" },
  { value: "INTEGRATED", label: "Integrated BIM environment" },
];

/** Ordinal ranking used by lead scoring — higher means more mature. */
export const BIM_MATURITY_RANK: Record<BimMaturity, number> = {
  NONE: 0,
  BASIC_3D: 1,
  COORDINATED: 2,
  PLANNING_4D: 3,
  COST_5D: 4,
  INTEGRATED: 5,
};

export const CURRENCY_OPTIONS: Option<Currency>[] = [
  { value: "EUR", label: "EUR" },
  { value: "USD", label: "USD" },
  { value: "GBP", label: "GBP" },
  { value: "AED", label: "AED" },
  { value: "SAR", label: "SAR" },
];

export const CHALLENGE_OPTIONS: Option<Challenge>[] = [
  { value: "DISCONNECTED_DATA", label: "Disconnected project data" },
  { value: "MANUAL_REPORTING", label: "Manual reporting" },
  { value: "POOR_COST_VISIBILITY", label: "Poor cost visibility" },
  { value: "SCHEDULE_DELAYS", label: "Schedule delays" },
  { value: "DIFFICULT_COLLABORATION", label: "Difficult stakeholder collaboration" },
  { value: "LATE_RISK_DETECTION", label: "Late risk detection" },
  { value: "TOO_MANY_EXCEL", label: "Too many Excel files" },
  { value: "LIMITED_FIELD_COMMS", label: "Limited field-to-office communication" },
];

export const COMPANY_SIZE_LABELS = toLabelMap(COMPANY_SIZE_OPTIONS);
export const PROJECT_TYPE_LABELS = toLabelMap(PROJECT_TYPE_OPTIONS);
export const BIM_MATURITY_LABELS = toLabelMap(BIM_MATURITY_OPTIONS);
export const CHALLENGE_LABELS = toLabelMap(CHALLENGE_OPTIONS);

export const LEAD_STATUS_OPTIONS: Option<LeadStatus>[] = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "DEMO_SCHEDULED", label: "Demo Scheduled" },
  { value: "TRIAL_STARTED", label: "Trial Started" },
  { value: "QUALIFIED", label: "Qualified" },
  { value: "WON", label: "Won" },
  { value: "LOST", label: "Lost" },
];

export const LEAD_STATUS_LABELS = toLabelMap(LEAD_STATUS_OPTIONS);

export const TEMPERATURE_LABELS: Record<LeadTemperature, string> = {
  COLD: "Cold",
  WARM: "Warm",
  HOT: "Hot",
};

// ── Audience-specific helper copy for the calculator ──────────

export const AUDIENCES: { value: Audience; label: string; helper: string }[] = [
  {
    value: "INVESTORS",
    label: "Investors",
    helper:
      "Quantify how tighter cost control and fewer delays protect your return on capital.",
  },
  {
    value: "CONTRACTORS",
    label: "Contractors",
    helper:
      "See how connected 4D/5D planning reduces rework and keeps sites on schedule.",
  },
  {
    value: "BIM_MANAGERS",
    label: "BIM Managers",
    helper:
      "Estimate the productivity gained from a single, coordinated BIM environment.",
  },
  {
    value: "PROJECT_MANAGERS",
    label: "Project Managers",
    helper:
      "Understand the time reclaimed from manual reporting and information hunting.",
  },
  {
    value: "COST_MANAGERS",
    label: "Cost Managers",
    helper:
      "Model the impact of early risk detection and change-request reduction on the budget.",
  },
];

function toLabelMap<T extends string>(options: Option<T>[]): Record<T, string> {
  return options.reduce(
    (acc, o) => {
      acc[o.value] = o.label;
      return acc;
    },
    {} as Record<T, string>,
  );
}
