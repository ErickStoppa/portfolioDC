"use client";
import { BrowserShell } from "@/components/demos/browser-shell";
import { OrionApp } from "./orion-app";

export default function Page() {
  return (
    <BrowserShell title="ORION ERP" url="orion.nexum.com.br/overview" backHref="/demos">
      <OrionApp />
    </BrowserShell>
  );
}
