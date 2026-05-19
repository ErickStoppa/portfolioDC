import type { Metadata } from "next";
import { PortfolioClient } from "./portfolio-client";

export const metadata: Metadata = {
  title: "Demos — Portfólio",
  description:
    "Explore demos interativas de sites e aplicações desenvolvidas. Cada projeto é funcional — navegue, filtre e experimente de verdade.",
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
