import type { Metadata } from "next";
import { AboutHero } from "./about-hero";
import { AboutPhilosophy } from "./about-philosophy";
import { AboutTeam } from "./about-team";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "About",
  description:
    "Development Consulting is a premium software engineering studio. We build world-class digital products for companies that demand the best.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutPhilosophy />
      <AboutTeam />
      <CtaBanner />
    </>
  );
}
