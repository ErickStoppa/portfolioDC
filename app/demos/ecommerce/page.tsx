import type { Metadata } from "next";
import { BrowserShell } from "@/components/demos/browser-shell";
import { EcommerceApp } from "./ecommerce-app";

export const metadata: Metadata = {
  title: "Luxe Ecommerce Demo",
  description: "Interactive premium ecommerce demo with cart, filters, and checkout flow.",
};

export default function EcommerceDemoPage() {
  return (
    <BrowserShell
      title="Luxe — Premium Ecommerce"
      url="luxe.store/collections/all"
    >
      <EcommerceApp />
    </BrowserShell>
  );
}
