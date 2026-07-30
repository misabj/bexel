import { describe, it, expect } from "vitest";
import { assessmentSchema } from "@/lib/validation/schemas";
import { calculateRoi } from "@/lib/calculations";
import { scoreLead } from "@/lib/lead-scoring";
import { DEFAULT_ROI_SETTINGS } from "@/config/assumptions";

/**
 * Integration test of the public assessment pipeline that runs on the server
 * before anything is persisted: validate → calculate ROI → score the lead.
 * This mirrors `submitAssessment` without requiring a database connection.
 */
describe("assessment pipeline (validate → calculate → score)", () => {
  const rawSubmission = {
    firstName: "Amela",
    lastName: "Kovač",
    email: "amela.kovac@skylinebuild.com",
    company: "Skyline Build Group",
    jobTitle: "BIM Manager",
    phone: "+387 33 555 120",
    country: "Bosnia and Herzegovina",
    companySize: "SIZE_500_PLUS",
    projectName: "Sarajevo Tower Complex",
    projectType: "COMMERCIAL",
    projectValue: "78000000",
    currency: "EUR",
    durationMonths: "30",
    teamSize: "60",
    activeProjects: "8",
    bimMaturity: "PLANNING_4D",
    reportingHours: "90",
    informationSearchHours: "70",
    weeklyDelayCost: "45000",
    expectedDelayWeeks: "8",
    annualChangeRequests: "140",
    averageChangeRequestCost: "5200",
    duplicatedWorkPercentage: "18",
    selectedChallenges: [
      "DISCONNECTED_DATA",
      "MANUAL_REPORTING",
      "SCHEDULE_DELAYS",
      "LATE_RISK_DETECTION",
    ],
    website: "",
  };

  it("produces a consistent ROI result and a hot lead score for a strong prospect", () => {
    const input = assessmentSchema.parse(rawSubmission);

    const roi = calculateRoi(input, DEFAULT_ROI_SETTINGS);
    expect(roi.totalSavings).toBeGreaterThan(0);
    expect(roi.netBenefit).toBe(roi.totalSavings - roi.estimatedInvestment);
    expect(roi.paybackMonths).toBeGreaterThan(0);
    expect(roi.paybackMonths).toBeLessThan(999);

    const score = scoreLead(input);
    expect(score.score).toBeGreaterThanOrEqual(70);
    expect(score.temperature).toBe("HOT");
  });

  it("rejects malformed submissions before any calculation runs", () => {
    const bad = assessmentSchema.safeParse({ ...rawSubmission, email: "nope" });
    expect(bad.success).toBe(false);
  });
});
