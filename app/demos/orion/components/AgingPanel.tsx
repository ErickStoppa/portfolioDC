"use client";

import { useState } from "react";
import { agingReceivable, agingPayable } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import type { AgingType } from "../types/orion.types";

export default function AgingPanel() {
  const [agingType, setAgingType] = useState<AgingType>("receber");

  const buckets = agingType === "receber" ? agingReceivable : agingPayable;
  const total = buckets.reduce((s, b) => s + b.amount, 0);
  const totalCount = buckets.reduce((s, b) => s + b.count, 0);

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ backgroundColor: "#0a1220", borderColor: "#1a2540" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: "#1a2540" }}
      >
        <div>
          <h3 className="text-sm font-semibold" style={{ color: "#cbd5e1" }}>
            Aging — Contas a {agingType === "receber" ? "Receber" : "Pagar"}
          </h3>
          <p className="text-[10px] mt-0.5" style={{ color: "#475569" }}>
            {totalCount} títulos · {formatCurrency(total)}
          </p>
        </div>
        <div
          className="flex items-center rounded-lg overflow-hidden border"
          style={{ borderColor: "#1a2540" }}
        >
          {(["receber", "pagar"] as AgingType[]).map((t) => (
            <button
              key={t}
              onClick={() => setAgingType(t)}
              className="px-3 py-1.5 text-[10px] font-medium transition-colors"
              style={{
                backgroundColor: agingType === t ? "#6366f1" : "transparent",
                color: agingType === t ? "#fff" : "#475569",
              }}
            >
              {t === "receber" ? "Receber" : "Pagar"}
            </button>
          ))}
        </div>
      </div>

      {/* Bars */}
      <div className="p-5 space-y-4">
        {buckets.map((b) => {
          const pct = (b.amount / total) * 100;
          return (
            <div key={b.bucket}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: b.color }}
                  />
                  <span style={{ color: "#94a3b8" }}>{b.bucket}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[11px]" style={{ color: "#475569" }}>
                    {b.count} tít.
                  </span>
                  <span className="font-mono font-medium text-[11px]" style={{ color: "#cbd5e1" }}>
                    {formatCurrency(b.amount)}
                  </span>
                  <span
                    className="font-mono text-[10px] w-8 text-right"
                    style={{ color: b.color }}
                  >
                    {pct.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: "#1a2540" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: b.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Total footer */}
      <div
        className="flex items-center justify-between px-5 py-3 border-t text-xs"
        style={{ borderColor: "#1a2540" }}
      >
        <span style={{ color: "#475569" }}>Total</span>
        <span className="font-mono font-semibold" style={{ color: "#cbd5e1" }}>
          {formatCurrency(total)}
        </span>
      </div>
    </div>
  );
}
