import type { Metadata } from "next";
import { BrowserShell } from "@/components/demos/browser-shell";
import { RestaurantApp } from "./restaurant-app";

export const metadata: Metadata = {
  title: "Saveur Restaurant Demo",
  description: "Interactive restaurant ordering demo with menu, cart, and order tracking.",
};

export default function RestaurantDemoPage() {
  return (
    <BrowserShell
      title="Saveur — Restaurant & Delivery"
      url="saveur.app/menu"
    >
      <RestaurantApp />
    </BrowserShell>
  );
}
