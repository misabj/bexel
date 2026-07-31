import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Real SVG flags. Emoji flags (🇬🇧, 🇷🇸…) do not render on Windows/Chrome —
 * they fall back to the two-letter country code — so we draw them as SVG.
 */
function FlagSvg({ locale }: { locale: Locale }) {
  switch (locale) {
    case "en":
      // United Kingdom — Union Jack
      return (
        <svg viewBox="0 0 60 30" className="h-full w-full" aria-hidden="true">
          <clipPath id="uk-t">
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
          </clipPath>
          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path
            d="M0,0 L60,30 M60,0 L0,30"
            clipPath="url(#uk-t)"
            stroke="#C8102E"
            strokeWidth="4"
          />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      );
    case "sr":
      // Serbia — red / blue / white
      return (
        <svg viewBox="0 0 20 14" className="h-full w-full" aria-hidden="true">
          <rect width="20" height="14" fill="#fff" />
          <rect width="20" height="4.667" fill="#C6363C" />
          <rect y="4.667" width="20" height="4.667" fill="#0C4076" />
        </svg>
      );
    case "sl":
      // Slovenia — white / blue / red
      return (
        <svg viewBox="0 0 20 14" className="h-full w-full" aria-hidden="true">
          <rect width="20" height="14" fill="#ED1C24" />
          <rect width="20" height="4.667" fill="#fff" />
          <rect y="4.667" width="20" height="4.667" fill="#005DA4" />
        </svg>
      );
    case "de":
      // Germany — black / red / gold
      return (
        <svg viewBox="0 0 20 14" className="h-full w-full" aria-hidden="true">
          <rect width="20" height="14" fill="#FFCE00" />
          <rect width="20" height="4.667" fill="#000" />
          <rect y="4.667" width="20" height="4.667" fill="#DD0000" />
        </svg>
      );
    case "fr":
      // France — blue / white / red
      return (
        <svg viewBox="0 0 20 14" className="h-full w-full" aria-hidden="true">
          <rect width="20" height="14" fill="#fff" />
          <rect width="6.667" height="14" fill="#0055A4" />
          <rect x="13.333" width="6.667" height="14" fill="#EF4135" />
        </svg>
      );
    default:
      return null;
  }
}

export function FlagIcon({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block h-3.5 w-5 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10 dark:ring-white/15",
        className,
      )}
    >
      <FlagSvg locale={locale} />
    </span>
  );
}
