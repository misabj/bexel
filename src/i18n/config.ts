export const LOCALES = ["en", "sr", "sl", "de", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<Locale, { label: string; flag: string; native: string }> = {
  en: { label: "English", native: "English", flag: "🇬🇧" },
  sr: { label: "Serbian", native: "Srpski", flag: "🇷🇸" },
  sl: { label: "Slovenian", native: "Slovenščina", flag: "🇸🇮" },
  de: { label: "German", native: "Deutsch", flag: "🇩🇪" },
  fr: { label: "French", native: "Français", flag: "🇫🇷" },
};

export const LOCALE_COOKIE = "bexel_locale";
