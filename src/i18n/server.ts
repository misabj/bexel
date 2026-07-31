import "server-only";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALES, type Locale } from "./config";
import { DICTIONARIES, type Dictionary } from "./dictionaries";

/** Read the visitor's selected locale from the cookie (server components). */
export async function getServerLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value as Locale | undefined;
  return value && LOCALES.includes(value) ? value : DEFAULT_LOCALE;
}

/** Resolve the dictionary for the current request's locale (server components). */
export async function getServerDictionary(): Promise<Dictionary> {
  const locale = await getServerLocale();
  return DICTIONARIES[locale];
}
