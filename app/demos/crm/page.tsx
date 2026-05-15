import type { Metadata } from "next";
import { BrowserShell } from "@/components/demos/browser-shell";
import { CrmApp } from "./crm-app";

export const metadata: Metadata = {
  title: "Nexus CRM Demo",
  description: "Interactive enterprise CRM demo with Kanban pipeline, analytics, and lead management.",
};

export default function CrmDemoPage() {
  return (
    <BrowserShell
      title="Nexus — CRM & Sales Dashboard"
      url="nexus.app/pipeline"
    >
      <CrmApp />
    </BrowserShell>
  );
}
