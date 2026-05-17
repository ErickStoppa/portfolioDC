"use client";

import { useState } from "react";
import { kpiData } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import type { PlView } from "../types/orion.types";
import PlStatement from "./PlStatement";
import CashFlowWaterfall from "./CashFlowWaterfall";
import AgingPanel from "./AgingPanel";

export default function FinanceiroTab() {
  const [plView, setPlView] = useState<PlView>("dre");

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Header + toggle */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: "#cbd5e1" }}>
            Gestão Financeira
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
            DRE, Fluxo de Caixa e Aging — Mai/2025
          </p>
        </div>

        {/* KPI strip */}
        <div className="flex items-center gap-6">
          {[
            { label: "A Receber", value: kpiData.accountsReceivable, color: "#22c55e" },
            { label: "A Pagar",   value: kpiData.accountsPayable,    color: "#f43f5e" },
            { label: "DSO",       value: `${kpiData.dso} dias`,       color: "#38bdf8", raw: true },
            { label: "DPO",       value: `${kpiData.dpo} dias`,       color: "#a78bfa", raw: true },
          ].map(({ label, value, color, raw }) => (
            <div key={label} className="text-right">
              <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "#475569" }}>
                {label}
              </p>
              <p className="text-sm font-bold font-mono" style={{ color }}>
                {raw ? value : formatCurrency(value as number)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PL View toggle */}
      <div className="flex items-center gap-1">
        {([
          { id: "dre",   label: "DRE" },
          { id: "fluxo", label: "Fluxo de Caixa" },
        ] as { id: PlView; label: string }[]).map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setPlView(id)}
            className="px-4 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{
              backgroundColor: plView === id ? "#6366f1" : "rgba(255,255,255,0.04)",
              color: plView === id ? "#fff" : "#475569",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Main chart */}
      {plView === "dre" ? <PlStatement /> : <CashFlowWaterfall />}

      {/* Aging */}
      <AgingPanel />
    </div>
  );
}
