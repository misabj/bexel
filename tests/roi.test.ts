import { describe, it, expect } from "vitest";
import {
  calculateRoi,
  estimateInvestment,
  topSavingOpportunities,
} from "@/lib/calculations";
import { DEFAULT_ROI_SETTINGS } from "@/config/assumptions";
import type { Currency } from "@/types";

interface CalcInput {
  currency: Currency;
  projectValue: number;
  durationMonths: number;
  teamSize: number;
  activeProjects: number;
  companySize:
    | "SIZE_1_10"
    | "SIZE_11_50"
    | "SIZE_51_200"
    | "SIZE_201_500"
    | "SIZE_500_PLUS";
  reportingHours: number;
  informationSearchHours: number;
  weeklyDelayCost: number;
  expectedDelayWeeks: number;
  annualChangeRequests: number;
  averageChangeRequestCost: number;
  duplicatedWorkPercentage: number;
}

const baseInput: CalcInput = {
  currency: "EUR",
  projectValue: 50_000_000,
  durationMonths: 24,
  teamSize: 40,
  activeProjects: 5,
  companySize: "SIZE_201_500",
  reportingHours: 80,
  informationSearchHours: 60,
  weeklyDelayCost: 30_000,
  expectedDelayWeeks: 6,
  annualChangeRequests: 120,
  averageChangeRequestCost: 5000,
  duplicatedWorkPercentage: 15,
};

describe("calculateRoi", () => {
  it("produces positive savings for a realistic project", () => {
    const r = calculateRoi(baseInput, DEFAULT_ROI_SETTINGS);
    expect(r.totalSavings).toBeGreaterThan(0);
    expect(r.timeSavings).toBeGreaterThan(0);
    expect(r.reportingSavings).toBeGreaterThan(0);
    expect(r.delaySavings).toBeGreaterThan(0);
    expect(r.reworkSavings).toBeGreaterThan(0);
  });

  it("keeps totalSavings equal to the sum of the four levers", () => {
    const r = calculateRoi(baseInput, DEFAULT_ROI_SETTINGS);
    expect(r.totalSavings).toBe(
      r.timeSavings + r.reportingSavings + r.delaySavings + r.reworkSavings,
    );
  });

  it("computes reporting savings using the configured formula", () => {
    // hours × 12 × rate × hourlyCost, then rounded to 0 decimals.
    const expected = Math.round(
      80 * 12 * DEFAULT_ROI_SETTINGS.reportingReductionRate *
        DEFAULT_ROI_SETTINGS.hourlyEmployeeCost,
    );
    const r = calculateRoi(baseInput, DEFAULT_ROI_SETTINGS);
    expect(r.reportingSavings).toBe(expected);
  });

  it("never returns negative savings even for negative inputs", () => {
    const hostile: CalcInput = {
      ...baseInput,
      reportingHours: -100,
      informationSearchHours: -100,
      weeklyDelayCost: -100,
      expectedDelayWeeks: -100,
      annualChangeRequests: -100,
      averageChangeRequestCost: -100,
      duplicatedWorkPercentage: -100,
    };
    const r = calculateRoi(hostile, DEFAULT_ROI_SETTINGS);
    expect(r.totalSavings).toBe(0);
    expect(r.timeSavings).toBe(0);
    expect(r.reportingSavings).toBe(0);
    expect(r.delaySavings).toBe(0);
    expect(r.reworkSavings).toBe(0);
  });

  it("returns the 999-month sentinel payback when there are no savings", () => {
    const noSavings: CalcInput = {
      ...baseInput,
      reportingHours: 0,
      informationSearchHours: 0,
      weeklyDelayCost: 0,
      expectedDelayWeeks: 0,
      annualChangeRequests: 0,
      averageChangeRequestCost: 0,
      duplicatedWorkPercentage: 0,
    };
    const r = calculateRoi(noSavings, DEFAULT_ROI_SETTINGS);
    expect(r.totalSavings).toBe(0);
    expect(r.paybackMonths).toBe(999);
    expect(r.netBenefit).toBeLessThan(0);
  });

  it("normalizes non-EUR currency inputs before calculating", () => {
    const eur = calculateRoi(baseInput, DEFAULT_ROI_SETTINGS);
    // Same nominal amounts in USD should yield smaller EUR savings (USD > EUR rate).
    const usd = calculateRoi({ ...baseInput, currency: "USD" }, DEFAULT_ROI_SETTINGS);
    expect(usd.delaySavings).toBeLessThan(eur.delaySavings);
  });
});

describe("estimateInvestment", () => {
  it("clamps the investment within the configured range", () => {
    const small = estimateInvestment(
      { teamSize: 1, companySize: "SIZE_1_10" },
      DEFAULT_ROI_SETTINGS,
    );
    const large = estimateInvestment(
      { teamSize: 100000, companySize: "SIZE_500_PLUS" },
      DEFAULT_ROI_SETTINGS,
    );
    expect(small).toBeGreaterThanOrEqual(6000);
    expect(large).toBeLessThanOrEqual(30000);
  });
});

describe("topSavingOpportunities", () => {
  it("sorts levers from highest to lowest", () => {
    const r = calculateRoi(baseInput, DEFAULT_ROI_SETTINGS);
    const sorted = topSavingOpportunities(r);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1]!.amountEur).toBeGreaterThanOrEqual(sorted[i]!.amountEur);
    }
  });
});
