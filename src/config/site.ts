/** Central place for public-facing product copy and metadata. */
export const SITE = {
  name: "BEXEL Growth Platform",
  shortName: "BEXEL Growth",
  tagline: "BIM ROI Calculator & Lead Automation",
  description:
    "Estimate how much time, money and project risk your organization could reduce through integrated BIM planning, cost control and collaboration.",
  url: process.env.APP_URL ?? "http://localhost:3000",
  hero: {
    title: "Calculate the potential ROI of better BIM project control",
    subtitle:
      "Estimate how much time, money and project risk your organization could reduce through integrated BIM planning, cost control and collaboration.",
  },
  disclaimer:
    "This calculator provides an indicative estimate only. Actual results depend on project scope, implementation quality, user adoption and existing processes.",
} as const;

export const BENEFITS = [
  {
    icon: "clock",
    title: "Reduce project delays",
    description:
      "Simulate schedules with 4D planning and catch bottlenecks before they hit the critical path.",
  },
  {
    icon: "eye",
    title: "Improve cost visibility",
    description:
      "Connect 5D cost data to the model so every change is priced the moment it happens.",
  },
  {
    icon: "file-bar-chart",
    title: "Automate project reporting",
    description:
      "Replace manual spreadsheets with live, model-derived KPIs and one-click reports.",
  },
  {
    icon: "shield-alert",
    title: "Detect risks earlier",
    description:
      "Surface clashes, data gaps and schedule risk automatically, long before they escalate.",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Enter project information",
    description:
      "Tell us about your organization, a representative project and your current challenges.",
  },
  {
    step: 2,
    title: "Receive a personalized ROI estimate",
    description:
      "Get an instant, transparent breakdown of potential savings, net benefit and payback period.",
  },
  {
    step: 3,
    title: "Discuss the results with a BIM specialist",
    description:
      "Book a demo to validate the numbers against your real processes and project portfolio.",
  },
] as const;
