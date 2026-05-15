import type { Metadata } from "next";
import { BrowserShell } from "@/components/demos/browser-shell";
import { ErpApp } from "./erp-app";

export const metadata: Metadata = {
  title: "Apex ERP Demo",
  description: "Interactive financial ERP demo with KPIs, analytics charts, transactions, and goal tracking.",
};

export default function ErpDemoPage() {
  return (
    <BrowserShell
      title="Apex — ERP & Financial Analytics"
      url="apex.app/dashboard"
    >
      <ErpApp />
    </BrowserShell>
  );
}
