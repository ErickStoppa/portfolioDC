import type { Metadata } from "next";
import { ServicesHero } from "./services-hero";
import { ServicesGrid } from "./services-grid";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Premium software development services: custom web apps, SaaS platforms, dashboards, ecommerce, frontend architecture, UI/UX systems, and digital product consulting.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <CtaBanner />
    </>
  );
}
