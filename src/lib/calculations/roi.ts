import {
  CALCULATION_VERSION,
  INVESTMENT_CONFIG,
  WORKING_HOURS_PER_YEAR,
} from "@/config/assumptions";
import { toEur } from "@/lib/currency";
import { clamp, nonNegative, round } from "@/lib/utils";
import type {
  AssessmentInput,
  CalculationLine,
  RoiResult,
  RoiSettings,
} from "@/types";

/**
 * ROI calculation service.
 *
 * The single source of truth for every ROI formula. Components and API
 * routes call `calculateRoi` — no business math lives in React components.
 *
 * Business model
 * --------------
 * BEXEL Manager reduces effort and cost across four levers:
 *   1. Reporting time      — automated, model-derived reports.
 *   2. Information search   — a single connected source of truth.
 *   3. Schedule delays      — 4D planning avoids a share of delay cost.
 *   4. Rework               — clash detection + connected data cut change
 *                             requests and duplicated work.
 *
 * All monetary inputs are normalised to EUR first (see `toEur`) so results
 * are comparable across currencies. Every formula clamps its inputs to be
 * non-negative to protect against illogical or hostile values.
 */

// The subset of `AssessmentInput` the calculator actually consumes.
type CalcInput = Pick<
  AssessmentInput,
  | "currency"
  | "projectValue"
  | "durationMonths"
  | "teamSize"
  | "activeProjects"
  | "companySize"
  | "reportingHours"
  | "informationSearchHours"
  | "weeklyDelayCost"
  | "expectedDelayWeeks"
  | "annualChangeRequests"
  | "averageChangeRequestCost"
  | "duplicatedWorkPercentage"
>;

/**
 * Annual value of reporting time removed.
 * = monthlyReportingHours × 12 × reductionRate × hourlyCost
 */
function reportingSavings(
  monthlyReportingHours: number,
  hourlyCost: number,
  reductionRate: number,
): number {
  const annualHours = nonNegative(monthlyReportingHours) * 12;
  return annualHours * reductionRate * hourlyCost;
}

/**
 * Annual value of information-search time removed, plus the raw hours saved.
 * = monthlySearchHours × 12 × reductionRate × hourlyCost
 */
function informationTimeSavings(
  monthlySearchHours: number,
  hourlyCost: number,
  reductionRate: number,
): { value: number; hours: number } {
  const annualHours = nonNegative(monthlySearchHours) * 12;
  const hoursSaved = annualHours * reductionRate;
  return { value: hoursSaved * hourlyCost, hours: hoursSaved };
}

/**
 * Annual avoided delay cost.
 * = weeklyDelayCost × expectedDelayWeeks × reductionRate
 */
function delaySavings(
  weeklyDelayCost: number,
  expectedDelayWeeks: number,
  reductionRate: number,
): number {
  return (
    nonNegative(weeklyDelayCost) * nonNegative(expectedDelayWeeks) * reductionRate
  );
}

/**
 * Annual rework savings = change-request savings + duplicated-work savings.
 *   changeRequestSavings = annualChangeRequests × avgCost × changeReduction
 *   duplicatedWorkSavings = annualLaborCost × dupPct × dupReduction
 * where annualLaborCost = teamSize × workingHoursPerYear × hourlyCost.
 */
function reworkSavings(
  input: CalcInput,
  hourlyCost: number,
  changeReductionRate: number,
  duplicatedWorkReductionRate: number,
): number {
  const changeRequestSavings =
    nonNegative(input.annualChangeRequests) *
    nonNegative(input.averageChangeRequestCost) *
    changeReductionRate;

  const annualLaborCost =
    nonNegative(input.teamSize) * WORKING_HOURS_PER_YEAR * hourlyCost;
  const duplicatedShare = clamp(input.duplicatedWorkPercentage, 0, 100) / 100;
  const duplicatedWorkSavings =
    annualLaborCost * duplicatedShare * duplicatedWorkReductionRate;

  return changeRequestSavings + duplicatedWorkSavings;
}

/**
 * Estimated annual software investment.
 * Scales with team size (proxy for licensed users) and company size, then
 * is clamped to the configured 6,000–30,000 EUR/year range.
 */
export function estimateInvestment(
  input: Pick<CalcInput, "teamSize" | "companySize">,
  settings: RoiSettings,
): number {
  const perUser = INVESTMENT_CONFIG.costPerUserPerYear;
  const multiplier =
    INVESTMENT_CONFIG.companySizeMultiplier[input.companySize] ?? 1;
  const raw = nonNegative(input.teamSize) * perUser * multiplier;
  const base = raw > 0 ? raw : settings.defaultSoftwareCost;
  return round(
    clamp(base, INVESTMENT_CONFIG.minAnnualCost, INVESTMENT_CONFIG.maxAnnualCost),
    0,
  );
}

/**
 * Main entry point. Produces the full, explained ROI result in EUR.
 * Frontend-supplied result values are never trusted — API routes re-run
 * this function server-side before persisting.
 */
export function calculateRoi(
  rawInput: CalcInput,
  settings: RoiSettings,
): RoiResult {
  const { currency } = rawInput;

  // Normalise all monetary inputs to EUR up front.
  const input: CalcInput = {
    ...rawInput,
    projectValue: toEur(rawInput.projectValue, currency),
    weeklyDelayCost: toEur(rawInput.weeklyDelayCost, currency),
    averageChangeRequestCost: toEur(rawInput.averageChangeRequestCost, currency),
  };

  const hourlyCost = nonNegative(settings.hourlyEmployeeCost, 1);

  const reporting = reportingSavings(
    input.reportingHours,
    hourlyCost,
    settings.reportingReductionRate,
  );

  const time = informationTimeSavings(
    input.informationSearchHours,
    hourlyCost,
    settings.searchReductionRate,
  );

  const delay = delaySavings(
    input.weeklyDelayCost,
    input.expectedDelayWeeks,
    settings.delayReductionRate,
  );

  const rework = reworkSavings(
    input,
    hourlyCost,
    settings.changeReductionRate,
    settings.duplicatedWorkReductionRate,
  );

  const timeSavings = round(nonNegative(time.value), 0);
  const reportingSavingsValue = round(nonNegative(reporting), 0);
  const delaySavingsValue = round(nonNegative(delay), 0);
  const reworkSavingsValue = round(nonNegative(rework), 0);

  const totalSavings =
    timeSavings + reportingSavingsValue + delaySavingsValue + reworkSavingsValue;

  const estimatedInvestment = estimateInvestment(input, settings);
  const netBenefit = round(totalSavings - estimatedInvestment, 0);

  // ROI% relative to the investment. Guard against divide-by-zero.
  const roiPercentage =
    estimatedInvestment > 0 ? round((netBenefit / estimatedInvestment) * 100, 1) : 0;

  // Payback in months. If there are no savings, payback is not achievable —
  // cap at 999 months as a defensive sentinel rather than Infinity.
  const paybackMonths =
    totalSavings > 0
      ? round(clamp((estimatedInvestment / totalSavings) * 12, 0, 999), 1)
      : 999;

  const lines: CalculationLine[] = [
    {
      key: "time",
      label: "Annual time savings (information search)",
      formula: `${round(time.hours)} h/yr saved × €${hourlyCost}/h`,
      amountEur: timeSavings,
    },
    {
      key: "reporting",
      label: "Reporting cost savings",
      formula: `Manual reporting hours × 12 × ${pct(settings.reportingReductionRate)} × €${hourlyCost}/h`,
      amountEur: reportingSavingsValue,
    },
    {
      key: "delay",
      label: "Avoided delay costs",
      formula: `Weekly delay cost × delay weeks × ${pct(settings.delayReductionRate)}`,
      amountEur: delaySavingsValue,
    },
    {
      key: "rework",
      label: "Rework reduction (change requests + duplicated work)",
      formula: `Change requests × cost × ${pct(settings.changeReductionRate)} + duplicated work × ${pct(settings.duplicatedWorkReductionRate)}`,
      amountEur: reworkSavingsValue,
    },
  ];

  return {
    timeSavings,
    timeSavingsHours: round(time.hours),
    reportingSavings: reportingSavingsValue,
    delaySavings: delaySavingsValue,
    reworkSavings: reworkSavingsValue,
    totalSavings,
    estimatedInvestment,
    netBenefit,
    roiPercentage,
    paybackMonths,
    calculationVersion: CALCULATION_VERSION,
    lines,
  };
}

/** The four savings levers as a labelled list, sorted high → low. */
export function topSavingOpportunities(
  result: RoiResult,
): { label: string; amountEur: number }[] {
  return [
    { label: "Time savings", amountEur: result.timeSavings },
    { label: "Reporting savings", amountEur: result.reportingSavings },
    { label: "Avoided delay costs", amountEur: result.delaySavings },
    { label: "Rework reduction", amountEur: result.reworkSavings },
  ].sort((a, b) => b.amountEur - a.amountEur);
}

function pct(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}
