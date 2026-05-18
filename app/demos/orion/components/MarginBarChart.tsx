"use client";

import { useState, useMemo } from "react";
import type { MonthlyMetric } from "@/data/orion";

interface Props { monthlyMetrics: MonthlyMetric[] }

const W = 800; const H = 220;
const L = 36; const R = 794; const T = 20; const B = 188;
const CW = R - L; const CH = B - T;
const EBITDA_TARGET = 17; // %

export default function MarginBarChart({ monthlyMetrics }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const N = monthlyMetrics.length;

  const margins = useMemo(() => monthlyMetrics.map(d => ({
    month:  d.month,
    gross:  (d.grossProfit / d.revenue) * 100,
    ebitda: (d.ebitda / d.revenue) * 100,
    net:    (d.netIncome / d.revenue) * 100,
    revenue: d.revenue,
  })), [monthlyMetrics]);

  const maxPct = Math.ceil(Math.max(...margins.map(m => m.gross)) / 5) * 5;

  const slotW = CW / N;
  // 3 bars × 6px + 2 gaps × 2px = 22px group, centered in slot
  const B1 = 6; const B2 = 6; const B3 = 6; const GAP = 2;
  const groupW = B1 + GAP + B2 + GAP + B3;
  const barOffset = (slotW - groupW) / 2;

  const toY = (pct: number) => B - (pct / maxPct) * CH;
  const toX = (i: number)  => L + i * slotW;

  const targetY = toY(EBITDA_TARGET);
  const gridPcts = [0, maxPct * 0.25, maxPct * 0.5, maxPct * 0.75, maxPct];

  return (
    <div className="orion-card overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1a2540]">
        <h3 className="text-sm font-semibold text-[#cbd5e1]">Análise de Margens — 2026</h3>
        <p className="text-[10px] mt-0.5 text-[#475569]">Margem Bruta · EBITDA · Líquida · Meta EBITDA 17%</p>
      </div>

      <div className="p-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ minWidth: 520, display: "block" }}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Grid */}
          {gridPcts.map(pct => {
            const y = toY(pct);
            return (
              <g key={pct}>
                <line x1={L} y1={y} x2={R} y2={y} stroke="#1a2540" strokeWidth="1" />
                <text x={L - 4} y={y + 3} textAnchor="end" fill="#334155" fontSize="7">{pct.toFixed(0)}%</text>
              </g>
            );
          })}

          {/* EBITDA target line */}
          <line x1={L} y1={targetY} x2={R} y2={targetY}
            stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 3" strokeOpacity="0.7" />
          <text x={R + 2} y={targetY + 3} fill="#f59e0b" fontSize="7" fillOpacity="0.8">Meta {EBITDA_TARGET}%</text>

          {/* Bars */}
          {margins.map((m, i) => {
            const x0 = toX(i) + barOffset;
            const isHov = hovered === i;

            const grossH  = (m.gross  / maxPct) * CH;
            const ebitdaH = (m.ebitda / maxPct) * CH;
            const netH    = Math.max((m.net / maxPct) * CH, 0);

            return (
              <g key={m.month} onMouseEnter={() => setHovered(i)}>
                {/* Hover bg */}
                {isHov && (
                  <rect x={toX(i)} y={T} width={slotW} height={CH}
                    fill="#ffffff" fillOpacity="0.02" />
                )}
                {/* Bar 1: Gross margin (blue) */}
                <rect
                  x={x0} y={B - grossH} width={B1} height={grossH}
                  rx={1.5} fill="#22c55e" fillOpacity={isHov ? 0.85 : 0.55}
                />
                {/* Bar 2: EBITDA (indigo) */}
                <rect
                  x={x0 + B1 + GAP} y={B - ebitdaH} width={B2} height={ebitdaH}
                  rx={1.5} fill="#38bdf8" fillOpacity={isHov ? 0.9 : 0.65}
                />
                {/* Bar 3: Net margin (violet) */}
                <rect
                  x={x0 + B1 + GAP + B2 + GAP} y={B - netH} width={B3} height={netH}
                  rx={1.5} fill="#a78bfa" fillOpacity={isHov ? 1 : 0.75}
                />
                {/* X label */}
                <text
                  x={toX(i) + slotW / 2} y={H - 6}
                  textAnchor="middle"
                  fill={isHov ? "#94a3b8" : "#334155"}
                  fontSize="8"
                >
                  {m.month}
                </text>
              </g>
            );
          })}

          {/* Tooltip */}
          {hovered !== null && (() => {
            const m  = margins[hovered];
            const cx = toX(hovered) + slotW / 2;
            const tx = cx > W / 2 ? cx - 106 : cx + 6;
            return (
              <g>
                <rect x={tx} y={T} width={102} height={72} rx={4}
                  fill="#0d1628" stroke="#1a2540" strokeWidth={1} />
                <text x={tx+51} y={T+13} textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="600">{m.month}/26</text>
                <text x={tx+51} y={T+26} textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="monospace">Bruta  {m.gross.toFixed(1)}%</text>
                <text x={tx+51} y={T+38} textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">EBITDA {m.ebitda.toFixed(1)}%</text>
                <text x={tx+51} y={T+50} textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="monospace">Líq.   {m.net.toFixed(1)}%</text>
                <text x={tx+51} y={T+63} textAnchor="middle" fill="#6366f1" fontSize="7" fontFamily="monospace">Rev {(m.revenue/1e6).toFixed(2)}M</text>
              </g>
            );
          })()}
        </svg>

        {/* Legend */}
        <div className="flex items-center flex-wrap gap-5 mt-3">
          {[
            { color: "#22c55e", label: "Margem Bruta",    alpha: 0.55 },
            { color: "#38bdf8", label: "EBITDA",           alpha: 0.65 },
            { color: "#a78bfa", label: "Margem Líquida",  alpha: 0.75 },
            { color: "#f59e0b", label: `Meta ${EBITDA_TARGET}%`, dashed: true },
          ].map(({ color, label, alpha, dashed }) => (
            <div key={label} className="flex items-center gap-1.5">
              {dashed
                ? <div className="w-4 h-px" style={{ borderTop: `1.5px dashed ${color}cc` }} />
                : <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color, opacity: alpha }} />
              }
              <span className="text-[10px] text-[#475569]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
