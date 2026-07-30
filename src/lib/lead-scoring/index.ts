import { NON_BUSINESS_EMAIL_DOMAINS } from "@/config/assumptions";
import { BIM_MATURITY_RANK } from "@/config/options";
import { toEur } from "@/lib/currency";
import { clamp, round } from "@/lib/utils";
import type { AssessmentInput, LeadScore, LeadTemperature } from "@/types";

/**
 * Lead scoring service.
 *
 * Produces a 0–100 score from an assessment and maps it to a sales
 * temperature. Kept pure and dependency-free (except config) so it is fully
 * unit-testable and can be reused on client and server.
 */

const THRESHOLDS = {
  hot: 70,
  warm: 40,
} as const;

const HIGH_VALUE_PROJECT_EUR = 50_000_000;
const LONG_DURATION_MONTHS = 18;
const MIN_CHALLENGES_FOR_BONUS = 4;

// The input fields scoring actually needs.
type ScoreInput = Pick<
  AssessmentInput,
  | "email"
  | "phone"
  | "companySize"
  | "currency"
  | "projectValue"
  | "durationMonths"
  | "activeProjects"
  | "bimMaturity"
  | "selectedChallenges"
>;

/** Return true when the email uses a business (non free-mail) domain. */
export function isBusinessEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1];
  if (!domain) return false;
  return !NON_BUSINESS_EMAIL_DOMAINS.has(domain);
}

/** Map a numeric score to a lead temperature. */
export function temperatureFor(score: number): LeadTemperature {
  if (score >= THRESHOLDS.hot) return "HOT";
  if (score >= THRESHOLDS.warm) return "WARM";
  return "COLD";
}

/** Points awarded for the number of concurrently active projects (max 15). */
function activeProjectsPoints(activeProjects: number): number {
  return clamp(round(activeProjects * 1.5), 0, 15);
}

/** Compute the lead score, temperature and a transparent breakdown. */
export function scoreLead(input: ScoreInput): LeadScore {
  const breakdown: { label: string; points: number }[] = [];

  const projectValueEur = toEur(input.projectValue, input.currency);
  if (projectValueEur >= HIGH_VALUE_PROJECT_EUR) {
    breakdown.push({ label: "Project value over €50M", points: 25 });
  }

  if (input.companySize === "SIZE_201_500" || input.companySize === "SIZE_500_PLUS") {
    breakdown.push({ label: "Company size over 200 employees", points: 15 });
  }

  const activePts = activeProjectsPoints(input.activeProjects);
  if (activePts > 0) {
    breakdown.push({ label: "Multiple active projects", points: activePts });
  }

  if (input.durationMonths > LONG_DURATION_MONTHS) {
    breakdown.push({ label: "Project duration over 18 months", points: 10 });
  }

  if (BIM_MATURITY_RANK[input.bimMaturity] >= BIM_MATURITY_RANK.COORDINATED) {
    breakdown.push({ label: "At least Coordinated BIM maturity", points: 10 });
  }

  if (input.selectedChallenges.length >= MIN_CHALLENGES_FOR_BONUS) {
    breakdown.push({ label: "Four or more challenges selected", points: 10 });
  }

  if (isBusinessEmail(input.email)) {
    breakdown.push({ label: "Business email domain", points: 10 });
  }

  if (input.phone && input.phone.trim().length > 0) {
    breakdown.push({ label: "Phone number provided", points: 5 });
  }

  const rawScore = breakdown.reduce((sum, item) => sum + item.points, 0);
  const score = clamp(rawScore, 0, 100);

  return {
    score,
    temperature: temperatureFor(score),
    breakdown,
  };
}
