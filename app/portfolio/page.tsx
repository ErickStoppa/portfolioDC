import type { Metadata } from "next";
import { PortfolioClient } from "./portfolio-client";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our interactive portfolio of premium web applications, SaaS platforms, and digital products. Fully functional demos you can try live.",
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
