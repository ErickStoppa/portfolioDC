import { Hero } from "@/components/sections/hero";
import { StatusBar } from "@/components/sections/status-bar";
import { ServicesPreview } from "@/components/sections/services-preview";
import { Comparison } from "@/components/sections/comparison";
import { TechStack } from "@/components/sections/tech-stack";
import { DemosPreview } from "@/components/sections/demos-preview";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatusBar />
      <ServicesPreview />
      <Comparison />
      <TechStack />
      <DemosPreview />
      <Process />
      <Testimonials />
      <Faq />
      <CtaBanner />
    </>
  );
}
