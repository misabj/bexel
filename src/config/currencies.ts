import type { Currency } from "@/types";

/**
 * DEMONSTRATION exchange rates only.
 *
 * Each value is "how many units of the currency equal 1 EUR".
 * e.g. 1 EUR = 1.08 USD.  These are static placeholders for the MVP and
 * MUST be replaced by a live FX source before any real-world use.
 */
export const EXCHANGE_RATES: Record<Currency, number> = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.85,
  AED: 3.97,
  SAR: 4.05,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  AED: "AED ",
  SAR: "SAR ",
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  EUR: "EUR — Euro",
  USD: "USD — US Dollar",
  GBP: "GBP — British Pound",
  AED: "AED — UAE Dirham",
  SAR: "SAR — Saudi Riyal",
};

export const FX_DISCLAIMER =
  "Exchange rates are static demonstration values and are not live market rates.";
