import type { Metadata } from "next";
import { BrowserShell } from "@/components/demos/browser-shell";
import OrionApp from "./orion-app";

export const metadata: Metadata = {
  title: "ORION — ERP & Financial Intelligence | Demo",
  description:
    "ERP premium para manufatura com DRE, tesouraria, analytics de produto, gestão de ordens e RH — Nexum Indústria S.A.",
};

export default function OrionPage() {
  return (
    <BrowserShell url="orion.erp.nexum.com.br" title="ORION ERP">
      <OrionApp />
    </BrowserShell>
  );
}
