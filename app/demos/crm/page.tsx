import type { Metadata } from "next";
import { BrowserShell } from "@/components/demos/browser-shell";
import { CrmApp } from "./crm-app";

export const metadata: Metadata = {
  title: "Nexus — CRM & Dashboard | Demo",
  description: "CRM bancário com pipeline Kanban, analytics interativo e gestão de carteira de clientes.",
};

export default function CrmPage() {
  return (
    <BrowserShell url="nexus.crm.bancosul.com.br" title="Nexus CRM">
      <CrmApp />
    </BrowserShell>
  );
}
