import type { Metadata } from "next";
import { BrowserShell } from "@/components/demos/browser-shell";
import { RestaurantApp } from "./restaurant-app";

export const metadata: Metadata = {
  title: "CAIS — Restaurante | Demo",
  description: "Cardápio digital e delivery premium de restaurante contemporâneo.",
};

export default function RestaurantPage() {
  return (
    <BrowserShell url="cais.com.br" title="CAIS Restaurante">
      <RestaurantApp />
    </BrowserShell>
  );
}
