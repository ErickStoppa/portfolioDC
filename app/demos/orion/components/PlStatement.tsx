"use client";

import { plStatement } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import { PL_TYPE_CONFIG } from "../types/orion.types";

export default function PlStatement() {
  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ backgroundColor: "#0a1220", borderColor: "#1a2540" }}
    >
      <div className="px-5 py-4 border-b" style={{ borderColor: "#1a2540" }}>
        <h3 className="text-sm font-semibold" style={{ color: "#cbd5e1" }}>
          DRE — Mai/2025
        </h3>
        <p className="text-[10px] mt-0.5" style={{ color: "#475569" }}>
          Demonstrativo de Resultado do Exercício
        </p>
      </div>

      <div className="divide-y divide-[#1a2540]">
        {/* Header row */}
        <div
          className="grid px-5 py-2.5 text-[10px] uppercase tracking-wider"
          style={{
            gridTemplateColumns: "1fr 130px 130px 80px",
            color: "#475569",
            borderBottom: "1px solid #1a2540",
          }}
        >
          <span>Descrição</span>
          <span className="text-right">Mai/25</span>
          <span className="text-right">Abr/25</span>
          <span className="text-right">Δ%</span>
        </div>

        {plStatement.map((line, i) => {
          const cfg = PL_TYPE_CONFIG[line.type];
          const delta = line.prev !== 0
            ? ((line.value - line.prev) / Math.abs(line.prev)) * 100
            : 0;
          const deltaPos = line.type === "deducao" || line.type === "custo" || line.type === "despesa"
            ? delta <= 0
            : delta >= 0;

          return (
            <div key={i}>
              {line.separator && (
                <div className="h-px mx-5" style={{ backgroundColor: "#1a2540" }} />
              )}
              <div
                className="grid items-center px-5 py-2.5 text-xs"
                style={{
                  gridTemplateColumns: "1fr 130px 130px 80px",
                  paddingLeft: cfg.indent ? `${1.25 + cfg.indent * 0.75}rem` : "1.25rem",
                  backgroundColor:
                    line.type === "resultado" ? "rgba(99,102,241,0.06)" : "transparent",
                }}
              >
                <span
                  style={{
                    color: cfg.color,
                    fontWeight: cfg.bold ? 600 : 400,
                    fontSize: cfg.bold ? "12px" : "11px",
                  }}
                >
                  {line.label}
                </span>
                <span
                  className="text-right font-mono"
                  style={{
                    color: cfg.color,
                    fontWeight: cfg.bold ? 600 : 400,
                    fontSize: "11px",
                  }}
                >
                  {formatCurrency(Math.abs(line.value))}
                </span>
                <span
                  className="text-right font-mono text-[11px]"
                  style={{ color: "#475569" }}
                >
                  {formatCurrency(Math.abs(line.prev))}
                </span>
                <span
                  className="text-right font-mono text-[10px]"
                  style={{ color: deltaPos ? "#22c55e" : "#f43f5e" }}
                >
                  {delta > 0 ? "+" : ""}{delta.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
