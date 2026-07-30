import { describe, it, expect } from "vitest";
import {
  assessmentSchema,
  settingsSchema,
  sanitizeText,
} from "@/lib/validation/schemas";

const validAssessment = {
  firstName: "Jane",
  lastName: "Doe",
  email: "Jane.Doe@ACME-Build.com",
  company: "ACME Build",
  jobTitle: "BIM Manager",
  phone: "+1 555 0100",
  country: "United States",
  companySize: "SIZE_201_500",
  projectName: "HQ Tower",
  projectType: "COMMERCIAL",
  projectValue: "50000000",
  currency: "USD",
  durationMonths: "24",
  teamSize: "40",
  activeProjects: "5",
  bimMaturity: "COORDINATED",
  reportingHours: "80",
  informationSearchHours: "60",
  weeklyDelayCost: "30000",
  expectedDelayWeeks: "6",
  annualChangeRequests: "120",
  averageChangeRequestCost: "5000",
  duplicatedWorkPercentage: "15",
  selectedChallenges: ["MANUAL_REPORTING", "SCHEDULE_DELAYS"],
  website: "",
};

describe("assessmentSchema", () => {
  it("parses and coerces a valid submission", () => {
    const parsed = assessmentSchema.parse(validAssessment);
    expect(parsed.projectValue).toBe(50_000_000);
    expect(parsed.teamSize).toBe(40);
    // Email is normalized to lowercase.
    expect(parsed.email).toBe("jane.doe@acme-build.com");
  });

  it("rejects an invalid email", () => {
    const result = assessmentSchema.safeParse({
      ...validAssessment,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative project values", () => {
    const result = assessmentSchema.safeParse({
      ...validAssessment,
      projectValue: "-100",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a filled honeypot field", () => {
    const result = assessmentSchema.safeParse({
      ...validAssessment,
      website: "http://spam.example",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown enum value", () => {
    const result = assessmentSchema.safeParse({
      ...validAssessment,
      companySize: "SIZE_999",
    });
    expect(result.success).toBe(false);
  });
});

describe("settingsSchema", () => {
  it("rejects reduction rates outside 0–1", () => {
    const result = settingsSchema.safeParse({
      hourlyEmployeeCost: 45,
      reportingReductionRate: 1.5,
      searchReductionRate: 0.3,
      delayReductionRate: 0.15,
      changeReductionRate: 0.1,
      duplicatedWorkReductionRate: 0.2,
      defaultSoftwareCost: 12000,
    });
    expect(result.success).toBe(false);
  });
});

describe("sanitizeText", () => {
  it("collapses whitespace and caps length", () => {
    expect(sanitizeText("  hello   world  ")).toBe("hello world");
    expect(sanitizeText("abcdef", 3)).toBe("abc");
  });
});
