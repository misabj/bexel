import { formatFromEur } from "@/lib/currency";
import { formatPercent } from "@/lib/utils";
import { SITE } from "@/config/site";
import type { Currency, RoiResult } from "@/types";

/**
 * HTML email templates. Inline styles are used because email clients strip
 * <style> blocks and do not support external CSS.
 */

interface ClientEmailArgs {
  firstName: string;
  company: string;
  currency: Currency;
  result: RoiResult;
  topOpportunities: { label: string; amountEur: number }[];
  ctaUrl: string;
}

const BRAND = "#0f2140";
const ACCENT = "#f97316";

function shell(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title}</title></head>
<body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:24px 0;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(15,33,64,.08);">
<tr><td style="background:${BRAND};padding:24px 32px;">
<span style="color:#ffffff;font-size:18px;font-weight:700;">BEXEL</span>
<span style="color:${ACCENT};font-size:18px;font-weight:700;"> Growth</span>
</td></tr>
${body}
<tr><td style="padding:20px 32px;background:#f8fafc;color:#64748b;font-size:12px;line-height:18px;">
${SITE.disclaimer}
</td></tr>
</table></td></tr></table></body></html>`;
}

function kpi(label: string, value: string): string {
  return `<td style="padding:12px;background:#f8fafc;border-radius:8px;">
<div style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:.04em;">${label}</div>
<div style="font-size:22px;font-weight:700;color:${BRAND};margin-top:4px;">${value}</div></td>`;
}

/** Email sent to the prospect after completing the calculator. */
export function clientAssessmentEmail(args: ClientEmailArgs): {
  subject: string;
  html: string;
} {
  const { firstName, company, currency, result, topOpportunities, ctaUrl } = args;
  const money = (eur: number) => formatFromEur(eur, currency);

  const opportunities = topOpportunities
    .slice(0, 3)
    .map(
      (o) =>
        `<li style="margin-bottom:6px;"><strong>${o.label}:</strong> ${money(
          o.amountEur,
        )} / year</li>`,
    )
    .join("");

  const body = `
<tr><td style="padding:32px;">
<h1 style="font-size:22px;color:${BRAND};margin:0 0 8px;">Your BIM ROI Assessment</h1>
<p style="font-size:15px;line-height:22px;color:#334155;margin:0 0 20px;">
Hi ${firstName}, thank you for using the BEXEL Growth ROI calculator. Based on the
information you provided for <strong>${company}</strong>, here is your indicative estimate.
</p>
<table role="presentation" width="100%" cellspacing="8" cellpadding="0" style="margin-bottom:8px;">
<tr>${kpi("Total potential savings", money(result.totalSavings))}${kpi(
    "ROI",
    formatPercent(result.roiPercentage),
  )}</tr>
<tr>${kpi("Payback period", `${result.paybackMonths} mo`)}${kpi(
    "Net benefit",
    money(result.netBenefit),
  )}</tr>
</table>
<h3 style="font-size:15px;color:${BRAND};margin:20px 0 8px;">Your three biggest opportunities</h3>
<ul style="font-size:14px;line-height:20px;color:#334155;padding-left:18px;margin:0 0 24px;">${opportunities}</ul>
<a href="${ctaUrl}" style="display:inline-block;background:${ACCENT};color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:12px 24px;border-radius:8px;">Request a Personalized Demo</a>
</td></tr>`;

  return { subject: "Your BIM ROI Assessment", html: shell("Your BIM ROI Assessment", body) };
}

interface SalesEmailArgs {
  company: string;
  contactName: string;
  contactEmail: string;
  leadScore: number;
  projectValueLabel: string;
  projectType: string;
  bimMaturity: string;
  topChallenges: string[];
  currency: Currency;
  result: RoiResult;
  adminUrl: string;
}

/** Internal notification sent to the sales team for HOT leads. */
export function salesLeadEmail(args: SalesEmailArgs): {
  subject: string;
  html: string;
} {
  const money = (eur: number) => formatFromEur(eur, args.currency);
  const challenges = args.topChallenges.length
    ? args.topChallenges.map((c) => `<li>${c}</li>`).join("")
    : "<li>None specified</li>";

  const body = `
<tr><td style="padding:32px;">
<div style="display:inline-block;background:${ACCENT};color:#fff;font-size:12px;font-weight:700;padding:4px 10px;border-radius:999px;margin-bottom:12px;">HOT LEAD · SCORE ${args.leadScore}</div>
<h1 style="font-size:20px;color:${BRAND};margin:0 0 16px;">New Hot BIM Lead – ${args.company}</h1>
<table role="presentation" width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;color:#334155;">
<tr><td style="color:#64748b;width:160px;">Contact</td><td>${args.contactName} · ${args.contactEmail}</td></tr>
<tr><td style="color:#64748b;">Project value</td><td>${args.projectValueLabel}</td></tr>
<tr><td style="color:#64748b;">Project type</td><td>${args.projectType}</td></tr>
<tr><td style="color:#64748b;">BIM maturity</td><td>${args.bimMaturity}</td></tr>
<tr><td style="color:#64748b;">Estimated savings</td><td>${money(args.result.totalSavings)} / yr (ROI ${formatPercent(args.result.roiPercentage)})</td></tr>
</table>
<h3 style="font-size:14px;color:${BRAND};margin:20px 0 6px;">Biggest challenges</h3>
<ul style="font-size:14px;line-height:20px;color:#334155;padding-left:18px;margin:0 0 24px;">${challenges}</ul>
<a href="${args.adminUrl}" style="display:inline-block;background:${BRAND};color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:10px 20px;border-radius:8px;">Open in Admin</a>
</td></tr>`;

  return {
    subject: `New Hot BIM Lead – ${args.company}`,
    html: shell(`New Hot BIM Lead – ${args.company}`, body),
  };
}
