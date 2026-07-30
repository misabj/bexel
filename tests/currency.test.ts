import { describe, it, expect } from "vitest";
import { toEur, fromEur, formatCurrency, formatFromEur } from "@/lib/currency";

describe("currency normalization", () => {
  it("converts foreign currency to EUR using the static rate", () => {
    // USD rate is 1.08 units per EUR.
    expect(toEur(108, "USD")).toBeCloseTo(100, 5);
    expect(toEur(100, "EUR")).toBe(100);
  });

  it("converts EUR back to a target currency", () => {
    expect(fromEur(100, "USD")).toBeCloseTo(108, 5);
    expect(fromEur(100, "EUR")).toBe(100);
  });

  it("round-trips an amount through EUR", () => {
    const original = 5000;
    expect(fromEur(toEur(original, "GBP"), "GBP")).toBeCloseTo(original, 5);
  });

  it("treats negative amounts as zero", () => {
    expect(toEur(-500, "USD")).toBe(0);
    expect(fromEur(-500, "USD")).toBe(0);
  });
});

describe("currency formatting", () => {
  it("formats an EUR value with a thousands separator and no decimals", () => {
    expect(formatCurrency(1000, "EUR")).toBe("€1,000");
  });

  it("formats an EUR-stored amount into the display currency", () => {
    // 1000 EUR shown in USD ≈ 1,080.
    expect(formatFromEur(1000, "USD")).toBe("$1,080");
  });
});
