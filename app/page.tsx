import { Hero } from "@/components/sections/hero";
import { ServicesPreview } from "@/components/sections/services-preview";
import { DemosPreview } from "@/components/sections/demos-preview";
import { Process } from "@/components/sections/process";
import { TechStack } from "@/components/sections/tech-stack";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <TechStack />
      <DemosPreview />
      <Process />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
