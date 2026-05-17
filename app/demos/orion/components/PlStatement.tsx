"use client";

import { useState } from "react";
import { plLines } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import type { PlFilter } from "../types/orion.types";

const MONTHS = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

const FILTER_OPTIONS: { id: PlFilter; label: string }[] = [
  { id: "mensal",      label: "Mensal"      },
  { id: "trimestral",  label: "Trimestral"  },
  { id: "anual",       label: "Anual"       },
];

function getColIndices(filter: PlFilter): number[] {
  if (filter === "mensal")      return [4, 3]; // Mai, Abr
  if (filter === "trimestral")  return [4, 3, 2]; // Q2 Mai, Abr, Mar
  return [4, 3, 2, 1, 0]; // Anual: últimos 5 meses
}

function getColLabel(filter: PlFilter, idx: number): string {
  if (filter === "mensal") return idx === 4 ? "Mai/26" : "Abr/26";
  return `${MONTHS[idx]}/26`;
}

export default function PlStatement() {
  const [filter, setFilter] = useState<PlFilter>("mensal");
  const cols = getColIndices(filter);
  const [curIdx, prevIdx] = cols;

  return (
    <div className="orion-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a2540] flex-wrap gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[#cbd5e1]">DRE — Demonstrativo de Resultado</h3>
          <p className="text-[10px] mt-0.5 text-[#475569]">Nexum Componentes S.A. · 2026</p>
        </div>
        <div className="flex items-center gap-1">
          {FILTER_OPTIONS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`orion-pill-filter ${filter === f.id ? "orion-pill-active" : ""}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left" style={{ minWidth: 520 }}>
          <thead>
            <tr className="border-b border-[#1a2540]">
              <th className="px-5 py-2.5 text-[10px] uppercase tracking-wider text-[#475569] font-medium w-full">
                Descrição
              </th>
              {cols.map(idx => (
                <th key={idx} className="px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#475569] font-medium text-right whitespace-nowrap">
                  {getColLabel(filter, idx)}
                </th>
              ))}
              {filter === "mensal" && (
                <th className="px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#475569] font-medium text-right">
                  Δ%
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {plLines.map(line => {
              const curVal  = line.values[curIdx];
              const prevVal = line.values[prevIdx];
              const delta   = prevVal !== 0 ? ((curVal - prevVal) / Math.abs(prevVal)) * 100 : 0;
              // For negative lines (costs/deductions), a decrease is good
              const deltaGood = line.isNegative ? delta <= 0 : delta >= 0;

              const textColor = line.isTotal
                ? line.key === "lucro_liquido" ? "#6366f1"
                  : line.key === "ebitda"      ? "#22c55e"
                  : "#cbd5e1"
                : line.isNegative ? "#f43f5e" : "#94a3b8";

              return (
                <tr
                  key={line.key}
                  className="border-b border-[#1a2540] last:border-b-0"
                  style={{
                    backgroundColor: line.isTotal ? "rgba(255,255,255,0.03)" : "transparent",
                  }}
                >
                  <td
                    className="px-5 py-2.5 text-xs"
                    style={{
                      paddingLeft: `${1.25 + line.indent * 1}rem`,
                      color: textColor,
                      fontWeight: line.isTotal ? 600 : 400,
                    }}
                  >
                    {line.isNegative && !line.isTotal && <span className="mr-1 opacity-60">(-)</span>}
                    {line.label}
                  </td>
                  {cols.map((idx, ci) => (
                    <td
                      key={idx}
                      className="px-4 py-2.5 text-right font-mono text-[11px] whitespace-nowrap"
                      style={{
                        color: ci === 0 ? textColor : "#475569",
                        fontWeight: ci === 0 && line.isTotal ? 600 : 400,
                      }}
                    >
                      {formatCurrency(line.values[idx])}
                    </td>
                  ))}
                  {filter === "mensal" && (
                    <td
                      className="px-4 py-2.5 text-right font-mono text-[10px] whitespace-nowrap"
                      style={{ color: deltaGood ? "#22c55e" : "#f43f5e" }}
                    >
                      {delta > 0 ? "+" : ""}{delta.toFixed(1)}%
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
