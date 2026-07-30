// ─────────────────────────────────────────────────────────────
// BEXEL Growth Platform — shared domain types
// These string-literal unions intentionally mirror the Prisma
// enum member names so the same values flow through forms,
// Zod validation, calculations and the database without mapping.
// ─────────────────────────────────────────────────────────────

export type CompanySize =
  | "SIZE_1_10"
  | "SIZE_11_50"
  | "SIZE_51_200"
  | "SIZE_201_500"
  | "SIZE_500_PLUS";

export type ProjectType =
  | "RESIDENTIAL"
  | "COMMERCIAL"
  | "INFRASTRUCTURE"
  | "INDUSTRIAL"
  | "HEALTHCARE"
  | "EDUCATION"
  | "OTHER";

export type BimMaturity =
  | "NONE"
  | "BASIC_3D"
  | "COORDINATED"
  | "PLANNING_4D"
  | "COST_5D"
  | "INTEGRATED";

export type Currency = "EUR" | "USD" | "GBP" | "AED" | "SAR";

export type LeadTemperature = "COLD" | "WARM" | "HOT";

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "DEMO_SCHEDULED"
  | "TRIAL_STARTED"
  | "QUALIFIED"
  | "WON"
  | "LOST";

export type Challenge =
  | "DISCONNECTED_DATA"
  | "MANUAL_REPORTING"
  | "POOR_COST_VISIBILITY"
  | "SCHEDULE_DELAYS"
  | "DIFFICULT_COLLABORATION"
  | "LATE_RISK_DETECTION"
  | "TOO_MANY_EXCEL"
  | "LIMITED_FIELD_COMMS";

export type Audience =
  | "INVESTORS"
  | "CONTRACTORS"
  | "BIM_MANAGERS"
  | "PROJECT_MANAGERS"
  | "COST_MANAGERS";

// ── Calculator input (already parsed to primitives) ───────────

export interface ContactInput {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone?: string;
  country: string;
  companySize: CompanySize;
}

export interface ProjectInput {
  projectName?: string;
  projectType: ProjectType;
  projectValue: number;
  currency: Currency;
  durationMonths: number;
  teamSize: number;
  activeProjects: number;
  bimMaturity: BimMaturity;
}

export interface ChallengeInput {
  reportingHours: number;
  informationSearchHours: number;
  weeklyDelayCost: number;
  expectedDelayWeeks: number;
  annualChangeRequests: number;
  averageChangeRequestCost: number;
  duplicatedWorkPercentage: number;
  selectedChallenges: Challenge[];
}

export interface AssessmentInput
  extends ContactInput,
    ProjectInput,
    ChallengeInput {
  /** Honeypot field — must be empty for a legitimate submission. */
  website?: string;
}

// ── Calculation output ────────────────────────────────────────

export interface RoiSettings {
  hourlyEmployeeCost: number;
  reportingReductionRate: number;
  searchReductionRate: number;
  delayReductionRate: number;
  changeReductionRate: number;
  duplicatedWorkReductionRate: number;
  defaultSoftwareCost: number;
}

/** A single explained line in the calculation breakdown table. */
export interface CalculationLine {
  key: string;
  label: string;
  formula: string;
  amountEur: number;
}

export interface RoiResult {
  /** All monetary values below are expressed in EUR. */
  timeSavings: number;
  timeSavingsHours: number;
  reportingSavings: number;
  delaySavings: number;
  reworkSavings: number;
  totalSavings: number;
  estimatedInvestment: number;
  netBenefit: number;
  roiPercentage: number;
  paybackMonths: number;
  calculationVersion: string;
  lines: CalculationLine[];
}

export interface ScoreBreakdownItem {
  label: string;
  points: number;
}

export interface LeadScore {
  score: number;
  temperature: LeadTemperature;
  breakdown: ScoreBreakdownItem[];
}
