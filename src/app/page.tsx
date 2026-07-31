import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Hero } from "@/components/marketing/Hero";
import { WhatIsRoi } from "@/components/marketing/WhatIsRoi";
import { Benefits } from "@/components/marketing/Benefits";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Audience } from "@/components/marketing/Audience";
import { DemoCta } from "@/components/marketing/DemoCta";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-white dark:bg-ink-900">
        <Hero />
        <WhatIsRoi />
        <Benefits />
        <HowItWorks />
        <Audience />
        <DemoCta />
      </main>
      <Footer />
    </>
  );
}
