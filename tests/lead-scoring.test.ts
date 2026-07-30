import { describe, it, expect } from "vitest";
import { scoreLead, isBusinessEmail, temperatureFor } from "@/lib/lead-scoring";
import type { Challenge } from "@/types";

const allChallenges: Challenge[] = [
  "DISCONNECTED_DATA",
  "MANUAL_REPORTING",
  "POOR_COST_VISIBILITY",
  "SCHEDULE_DELAYS",
  "DIFFICULT_COLLABORATION",
];

const strongLead = {
  email: "director@majorcontractor.com",
  phone: "+44 20 7946 0100",
  companySize: "SIZE_500_PLUS" as const,
  currency: "EUR" as const,
  projectValue: 120_000_000,
  durationMonths: 36,
  activeProjects: 12,
  bimMaturity: "COST_5D" as const,
  selectedChallenges: allChallenges,
};

const weakLead = {
  email: "someone@gmail.com",
  phone: undefined,
  companySize: "SIZE_1_10" as const,
  currency: "EUR" as const,
  projectValue: 500_000,
  durationMonths: 6,
  activeProjects: 1,
  bimMaturity: "NONE" as const,
  selectedChallenges: [] as Challenge[],
};

describe("temperatureFor", () => {
  it("maps boundary scores correctly", () => {
    expect(temperatureFor(70)).toBe("HOT");
    expect(temperatureFor(69)).toBe("WARM");
    expect(temperatureFor(40)).toBe("WARM");
    expect(temperatureFor(39)).toBe("COLD");
    expect(temperatureFor(0)).toBe("COLD");
    expect(temperatureFor(100)).toBe("HOT");
  });
});

describe("isBusinessEmail", () => {
  it("accepts business domains and rejects free-mail providers", () => {
    expect(isBusinessEmail("jane@acme-construction.com")).toBe(true);
    expect(isBusinessEmail("jane@gmail.com")).toBe(false);
    expect(isBusinessEmail("jane@yahoo.com")).toBe(false);
    expect(isBusinessEmail("not-an-email")).toBe(false);
  });
});

describe("scoreLead", () => {
  it("scores a strong lead HOT within 0–100", () => {
    const s = scoreLead(strongLead);
    expect(s.score).toBeGreaterThanOrEqual(0);
    expect(s.score).toBeLessThanOrEqual(100);
    expect(s.score).toBeGreaterThanOrEqual(70);
    expect(s.temperature).toBe("HOT");
    expect(s.breakdown.length).toBeGreaterThan(0);
  });

  it("scores a weak lead COLD", () => {
    const s = scoreLead(weakLead);
    expect(s.temperature).toBe("COLD");
    expect(s.score).toBeLessThan(40);
  });

  it("rewards a business email over a free-mail one", () => {
    const withBusiness = scoreLead({ ...weakLead, email: "ceo@bigbuild.com" });
    const withFree = scoreLead({ ...weakLead, email: "ceo@gmail.com" });
    expect(withBusiness.score).toBeGreaterThan(withFree.score);
  });

  it("keeps temperature consistent with the numeric score", () => {
    const s = scoreLead(strongLead);
    expect(s.temperature).toBe(temperatureFor(s.score));
  });
});
