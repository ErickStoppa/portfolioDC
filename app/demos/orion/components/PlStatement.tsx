"use client";

import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import type { PlLine } from "@/data/orion";
import type { PlFilter } from "../types/orion.types";

const MONTHS = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

interface PlStatementProps {
  lines:          PlLine[];
  filter:         PlFilter;
  selectedMonth:  number;         // 0–11
  onFilterChange: (f: PlFilter) => void;
  onMonthChange:  (m: number)  => void;
}

// ── column definitions ────────────────────────────────────────────────────────
type ColKind = "val" | "varAbs" | "varPct" | "pct";

interface ColDef {
  label:    string;
  kind:     ColKind;
  getValue: (line: PlLine) => number;
  /** for varAbs/varPct: positive = good for this line type? computed per-line */
}

function qsum(values: number[], q: 0|1|2|3): number {
  const s = q * 3;
  return values[s] + values[s+1] + values[s+2];
}

function buildCols(filter: PlFilter, m: number): ColDef[] {
  if (filter === "anual") {
    return [
      ...MONTHS.map((lbl, i) => ({
        label: lbl, kind: "val" as ColKind,
        getValue: (l: PlLine) => l.values[i],
      })),
      {
        label: "Total", kind: "val" as ColKind,
        getValue: (l: PlLine) => l.values.reduce((s, v) => s + v, 0),
      },
    ];
  }
  if (filter === "trimestral") {
    return ([0,1,2,3] as const).map(q => ({
      label: `Q${q+1}`, kind: "val" as ColKind,
      getValue: (l: PlLine) => qsum(l.values, q),
    })).concat([{
      label: "Total", kind: "val" as ColKind,
      getValue: (l: PlLine) => l.values.reduce((s, v) => s + v, 0),
    }]);
  }
  // mensal
  const prev = m > 0 ? m - 1 : 0;
  return [
    { label: MONTHS[m],              kind: "val",    getValue: (l) => l.values[m]    },
    { label: `${MONTHS[prev]} (ant.)`,kind: "val",   getValue: (l) => l.values[prev]  },
    { label: "Var. R$",              kind: "varAbs", getValue: (l) => l.values[m] - l.values[prev] },
    { label: "Var. %",               kind: "varPct", getValue: (l) => l.values[prev] !== 0 ? ((l.values[m] - l.values[prev]) / l.values[prev]) * 100 : 0 },
  ];
}

// ── per-cell rendering helpers ────────────────────────────────────────────────
function marginColor(pct: number): string {
  if (pct >= 30) return "#22c55e";
  if (pct >= 20) return "#f59e0b";
  return "#f43f5e";
}

function deltaColor(delta: number, isNegative: boolean): string {
  // For cost lines: going up (positive delta) is bad
  const good = isNegative ? delta < 0 : delta > 0;
  if (delta === 0) return "#475569";
  return good ? "#22c55e" : "#f43f5e";
}

export default function PlStatement({
  lines, filter, selectedMonth, onFilterChange, onMonthChange,
}: PlStatementProps) {
  const cols = buildCols(filter, selectedMonth);

  // ── Mobile detection (SSR-safe) ──────────────────────────────────────────────
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // locate anchor lines for margin row
  const lb   = lines.find(l => l.key === "lucro_bruto");
  const rl   = lines.find(l => l.key === "receita_liquida");

  // For the anual total column (last col), show "Total" header with right border
  const isAnual = filter === "anual";
  const isMensal = filter === "mensal";

  // helper: for "anual" the Total col is last; we want a visual separator
  const isLastColTotal = (ci: number) => (isAnual && ci === cols.length - 1);

  // ── Mobile column hiding: in anual mode show only prev+current month + Total ──
  const currentMonthIdx = selectedMonth;
  const prevMonthIdx    = selectedMonth > 0 ? selectedMonth - 1 : 0;
  const hiddenColIndices: Set<number> = (isAnual && isMobile)
    ? new Set(cols.map((_, i) => i).filter(i => {
        const isTotal   = i === cols.length - 1;
        const isCurrent = i === currentMonthIdx;
        const isPrev    = i === prevMonthIdx;
        return !isTotal && !isCurrent && !isPrev;
      }))
    : new Set<number>();

  return (
    <div className="orion-card overflow-hidden">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between px-5 py-4 border-b border-[#1a2540] gap-4 flex-wrap">
        <div>
          <h3 className="text-sm font-semibold text-[#cbd5e1]">Demonstrativo de Resultado (DRE)</h3>
          <p className="text-[10px] mt-0.5 text-[#475569]">Nexum Componentes S.A. · 2026</p>
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {(["anual","trimestral","mensal"] as PlFilter[]).map(f => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={`orion-pill-filter capitalize ${filter === f ? "orion-pill-active" : ""}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ── Month selector (mensal only) ─────────────────────────────────── */}
      {isMensal && (
        <div className="px-5 py-2.5 border-b border-[#1a2540] flex items-center gap-1 overflow-x-auto">
          {MONTHS.map((m, i) => (
            <button
              key={m}
              onClick={() => onMonthChange(i)}
              className={`shrink-0 px-2.5 py-1 rounded text-[10px] font-medium transition-colors ${
                selectedMonth === i ? "bg-[#6366f1] text-white" : "text-[#475569] hover:text-[#94a3b8]"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      )}

      {/* ── Table ────────────────────────────────────────────────────────── */}
      <div className="overflow-x-auto -mx-px">
        <table className="w-full text-left tabular-nums" style={{ minWidth: isMobile ? (isMensal ? 320 : isAnual ? 320 : 360) : (isMensal ? 520 : isAnual ? 1040 : 560) }}>
          <thead>
            <tr className="border-b border-[#1a2540]">
              <th className="px-5 py-2.5 text-[10px] uppercase tracking-wider text-[#475569] font-medium sticky left-0 bg-[#0a1220] z-10">
                Descrição
              </th>
              {cols.map((col, ci) => (
                <th
                  key={ci}
                  className={`px-3 py-2.5 text-[10px] uppercase tracking-wider font-medium text-right whitespace-nowrap ${
                    isLastColTotal(ci) ? "text-[#94a3b8] border-l border-[#1a2540]" : "text-[#475569]"
                  }${hiddenColIndices.has(ci) ? " hidden" : ""}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lines.map((line, li) => {
              const isTotal = line.isTotal;
              const rowBg   = isTotal ? "#0d1628" : "transparent";

              const row = (
                <tr
                  key={line.key}
                  className={`border-b border-[#1a2540] last:border-b-0 group ${!isTotal ? "hover:bg-white/[0.025]" : ""}`}
                  style={{ backgroundColor: rowBg }}
                >
                  {/* Description */}
                  <td
                    className="px-5 py-2.5 text-xs whitespace-nowrap sticky left-0 z-10"
                    style={{
                      paddingLeft: `${1.25 + line.indent * 1}rem`,
                      color: isTotal ? "#e2e8f0" : line.isNegative ? "#f43f5e" : "#94a3b8",
                      fontWeight: isTotal ? 600 : 400,
                      backgroundColor: rowBg,
                    }}
                  >
                    {line.isNegative && !isTotal && <span className="opacity-50 mr-1">(−)</span>}
                    {line.label}
                  </td>

                  {/* Value cells */}
                  {cols.map((col, ci) => {
                    const raw   = col.getValue(line);
                    const isVar = col.kind === "varAbs" || col.kind === "varPct";
                    const dc    = isVar ? deltaColor(raw, line.isNegative) : undefined;

                    let display: string;
                    if (col.kind === "varPct") {
                      display = `${raw > 0 ? "+" : ""}${raw.toFixed(1)}%`;
                    } else if (col.kind === "varAbs") {
                      display = raw >= 0 ? `+${formatCurrency(raw)}` : `−${formatCurrency(Math.abs(raw))}`;
                    } else if (line.isNegative && !isTotal) {
                      display = `(${formatCurrency(raw)})`;
                    } else {
                      display = formatCurrency(raw);
                    }

                    return (
                      <td
                        key={ci}
                        className={`px-3 py-2.5 text-right font-mono text-[12px] whitespace-nowrap ${
                          isLastColTotal(ci) ? "border-l border-[#1a2540] font-semibold" : ""
                        }${hiddenColIndices.has(ci) ? " hidden" : ""}`}
                        style={{
                          color: dc ?? (isTotal ? "#e2e8f0" : line.isNegative ? "#f43f5e" : ci === 0 ? "#94a3b8" : "#475569"),
                          fontWeight: isTotal ? 600 : 400,
                        }}
                      >
                        {display}
                      </td>
                    );
                  })}
                </tr>
              );

              // ── inject synthetic "% Margem Bruta" row after lucro_bruto ───
              if (line.key === "lucro_bruto" && lb && rl) {
                const marginRow = (
                  <tr
                    key="margin_bruta"
                    className="border-b border-[#1a2540] hover:bg-white/[0.015]"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <td
                      className="px-5 py-2 text-[11px] whitespace-nowrap sticky left-0 z-10 bg-[#0a1220] italic"
                      style={{ paddingLeft: "2.25rem", color: "#475569", backgroundColor: "#0a1220" }}
                    >
                      % Margem Bruta
                    </td>
                    {cols.map((col, ci) => {
                      let pctVal: number;
                      if (col.kind === "varAbs") {
                        // show pp difference
                        const mCur  = lb.values[selectedMonth] / rl.values[selectedMonth] * 100;
                        const mPrev = lb.values[selectedMonth > 0 ? selectedMonth-1 : 0] / rl.values[selectedMonth > 0 ? selectedMonth-1 : 0] * 100;
                        pctVal = mCur - mPrev;
                        const c = pctVal >= 0 ? "#22c55e" : "#f43f5e";
                        return (
                          <td key={ci} className={`px-3 py-2 text-right font-mono text-[11px] whitespace-nowrap italic${hiddenColIndices.has(ci) ? " hidden" : ""}`} style={{ color: c }}>
                            {pctVal > 0 ? "+" : ""}{pctVal.toFixed(1)} pp
                          </td>
                        );
                      } else if (col.kind === "varPct") {
                        return <td key={ci} className={`px-3 py-2 text-right text-[#1a2540] text-[11px]${hiddenColIndices.has(ci) ? " hidden" : ""}`} style={{ color: "#334155" }}>—</td>;
                      } else {
                        const lbV = col.getValue(lb);
                        const rlV = col.getValue(rl);
                        pctVal = rlV > 0 ? (lbV / rlV) * 100 : 0;
                        return (
                          <td
                            key={ci}
                            className={`px-3 py-2 text-right font-mono text-[11px] whitespace-nowrap italic ${isLastColTotal(ci) ? "border-l border-[#1a2540]" : ""}${hiddenColIndices.has(ci) ? " hidden" : ""}`}
                            style={{ color: marginColor(pctVal) }}
                          >
                            {pctVal.toFixed(1)}%
                          </td>
                        );
                      }
                    })}
                  </tr>
                );
                return [row, marginRow];
              }

              return row;
            })}
          </tbody>
        </table>
      </div>
      {isAnual && (
        <p className="sm:hidden text-[11px] text-center text-[#475569] py-2 border-t border-[#1a2540]">
          Exibindo mês atual e anterior · Gire o dispositivo para ver a DRE completa
        </p>
      )}
    </div>
  );
}
