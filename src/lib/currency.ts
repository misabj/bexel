import { CURRENCY_SYMBOLS, EXCHANGE_RATES } from "@/config/currencies";
import type { Currency } from "@/types";
import { nonNegative, round } from "@/lib/utils";

/**
 * Currency normalization utilities.
 *
 * All ROI calculations are performed in EUR so that leads using different
 * currencies remain directly comparable in the admin dashboard. Input
 * amounts are converted to EUR up front; display values may be converted
 * back to the user's currency for presentation.
 */

/** Convert an amount in `currency` into EUR using the static demo rate. */
export function toEur(amount: number, currency: Currency): number {
  const rate = EXCHANGE_RATES[currency] ?? 1;
  // rate = units of `currency` per 1 EUR, so EUR = amount / rate.
  return nonNegative(amount) / rate;
}

/** Convert an EUR amount into `currency` using the static demo rate. */
export function fromEur(amountEur: number, currency: Currency): number {
  const rate = EXCHANGE_RATES[currency] ?? 1;
  return nonNegative(amountEur) * rate;
}

/** Format an amount (already in `currency`) as a localized currency string. */
export function formatCurrency(
  amount: number,
  currency: Currency = "EUR",
  opts: { decimals?: number } = {},
): string {
  const decimals = opts.decimals ?? 0;
  const symbol = CURRENCY_SYMBOLS[currency] ?? "";
  const value = round(amount, decimals).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${symbol}${value}`;
}

/** Format an EUR amount converted into the target display currency. */
export function formatFromEur(
  amountEur: number,
  currency: Currency,
  opts: { decimals?: number } = {},
): string {
  return formatCurrency(fromEur(amountEur, currency), currency, opts);
}
