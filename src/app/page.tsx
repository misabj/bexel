import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Hero } from "@/components/marketing/Hero";
import { Benefits } from "@/components/marketing/Benefits";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Audience } from "@/components/marketing/Audience";
import { DemoCta } from "@/components/marketing/DemoCta";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <Audience />
        <DemoCta />
      </main>
      <Footer />
    </>
  );
}
