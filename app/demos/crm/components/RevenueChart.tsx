"use client";

import { useState } from "react";
import { monthlyData } from "@/data/crm";
import type { DashboardPeriod } from "../types/crm.types";

const VISIBLE_LABELS = new Set(["Jun", "Set", "Dez", "Mar"]);

interface RevenueChartProps {
  period: DashboardPeriod;
  chartType: "barras" | "linha";
  onChartTypeChange: (t: "barras" | "linha") => void;
}

export function RevenueChart({ period, chartType, onChartTypeChange }: RevenueChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const data = monthlyData;
  const maxRev = Math.max(...data.map(d => d.revenue));

  const highlightSet = new Set<number>(
    period === "hoje" ? [data.length - 1]
    : period === "semana" ? data.slice(-4).map((_, i) => data.length - 4 + i)
    : period === "trimestre" ? data.slice(-3).map((_, i) => data.length - 3 + i)
    : data.map((_, i) => i)
  );

  return (
    <div className="bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[#f1f5f9]">Receita Mensal</h3>
          <p className="text-xs text-[#475569]">últimos 12 meses</p>
        </div>
        <div className="flex items-center gap-1">
          {(["barras", "linha"] as const).map(t => (
            <button
              key={t}
              onClick={() => onChartTypeChange(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                chartType === t
                  ? "bg-[#3b82f6] text-white"
                  : "bg-[rgba(255,255,255,0.04)] text-[#64748b] hover:text-[#f1f5f9]"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {chartType === "barras" ? (
        <div className="relative">
          <div className="flex items-end gap-1 h-48">
            {data.map((d, i) => {
              const ratio = d.revenue / maxRev;
              const isHovered = hoveredIndex === i;
              const isHighlighted = highlightSet.has(i);
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1 relative group"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {isHovered && (
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#1e293b] text-white text-[10px] rounded px-2 py-1 whitespace-nowrap z-10 pointer-events-none">
                      {d.month}<br />R$ {(d.revenue / 1000).toFixed(0)}k
                    </div>
                  )}
                  <div
                    className="chart-bar w-full rounded-t-sm transition-opacity"
                    style={{
                      height: `${ratio * 176}px`,
                      backgroundColor: isHighlighted ? "#3b82f6" : "rgba(59,130,246,0.25)",
                      opacity: hoveredIndex !== null && !isHovered ? 0.4 : 1,
                    }}
                  />
                  <span
                    className="text-[8px] text-[#334155]"
                    style={{ visibility: VISIBLE_LABELS.has(d.month.slice(0, 3)) ? "visible" : "hidden" }}
                  >
                    {d.month.slice(0, 3)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        (() => {
          const W = 520, H = 160, PAD = 4;
          const minRev = Math.min(...data.map(d => d.revenue));
          const range = maxRev - minRev || 1;
          const avgTarget = data.reduce((s, d) => s + d.target, 0) / data.length;
          const targetY = H - ((avgTarget - minRev) / range) * (H - PAD * 2) - PAD;

          const revPts = data.map((d, i) => {
            const x = (i / (data.length - 1)) * W;
            const y = H - ((d.revenue - minRev) / range) * (H - PAD * 2) - PAD;
            return { x, y };
          });

          const polyStr = revPts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
          const areaStr = `0,${H} ${polyStr} ${W},${H}`;

          return (
            <div className="relative">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-48" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1={targetY} x2={W} y2={targetY} stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4" />
                <polygon points={areaStr} fill="url(#rev-grad)" />
                <polyline points={polyStr} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                {revPts.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x} cy={p.y} r={hoveredIndex === i ? 4 : 0}
                    fill="#3b82f6" stroke="#0c1220" strokeWidth="2"
                  />
                ))}
              </svg>
              {/* Month labels */}
              <div className="flex gap-0 mt-1">
                {data.map((d, i) => (
                  <div
                    key={i}
                    className="flex-1 text-center"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <span
                      className="text-[9px] text-[#334155]"
                      style={{ visibility: VISIBLE_LABELS.has(d.month.slice(0, 3)) ? "visible" : "hidden" }}
                    >
                      {d.month.slice(0, 3)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
}
