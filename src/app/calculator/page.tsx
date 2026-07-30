import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { CalculatorWizard } from "@/components/calculator/CalculatorWizard";
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
      <main className="bg-slate-50">
        <div className="border-b border-slate-200 bg-white">
          <div className="container-page py-12 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
              BIM ROI Calculator
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Answer a few questions about your organization and a representative
              project to receive an instant, personalized ROI estimate.
            </p>
          </div>
        </div>
        <div className="container-page py-12">
          <CalculatorWizard audience={audience} />
        </div>
      </main>
      <Footer />
    </>
  );
}
