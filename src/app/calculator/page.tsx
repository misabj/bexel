import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { CalculatorWizard } from "@/components/calculator/CalculatorWizard";
import { CalculatorHeader } from "@/components/calculator/CalculatorHeader";
import type { Audience } from "@/types";

export const metadata: Metadata = {
  title: "BIM ROI Calculator",
  description:
    "Estimate your organization's potential savings from integrated BIM planning, cost control and collaboration in four quick steps.",
};

const VALID_AUDIENCES: Audience[] = [
  "INVESTORS",
  "CONTRACTORS",
  "BIM_MANAGERS",
  "PROJECT_MANAGERS",
  "COST_MANAGERS",
];

export default async function CalculatorPage({
  searchParams,
}: {
  searchParams: Promise<{ audience?: string }>;
}) {
  const params = await searchParams;
  const audience = VALID_AUDIENCES.find((a) => a === params.audience);

  return (
    <>
      <Navbar />
      <main className="bg-slate-50 dark:bg-ink-900">
        <div className="border-b border-slate-200 bg-white dark:border-white/5 dark:bg-ink-850">
          <CalculatorHeader />
        </div>
        <div className="container-page py-12">
          <CalculatorWizard audience={audience} />
        </div>
      </main>
      <Footer />
    </>
  );
}
