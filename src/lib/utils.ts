import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names, resolving conflicts. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Clamp a number into the inclusive [min, max] range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Guard a numeric input: coerce NaN/Infinity/negative values to a floor. */
export function nonNegative(value: number, floor = 0): number {
  if (!Number.isFinite(value)) return floor;
  return value < 0 ? floor : value;
}

/** Round to a fixed number of decimals without floating-point drift. */
export function round(value: number, decimals = 0): number {
  if (!Number.isFinite(value)) return 0;
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/** Format a whole-number percentage with a single decimal. */
export function formatPercent(value: number, decimals = 1): string {
  return `${round(value, decimals).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}%`;
}

/** Format an ISO date as a short, locale-stable string. */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
