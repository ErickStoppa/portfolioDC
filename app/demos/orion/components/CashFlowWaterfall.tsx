"use client";

import { cashFlowItems } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";

const W = 560;
const H = 160;
const PAD = { t: 8, r: 8, b: 28, l: 8 };
const CHART_W = W - PAD.l - PAD.r;
const CHART_H = H - PAD.t - PAD.b;

// Show first 15 days as dual bars (inflows green / outflows red)
const DAYS = cashFlowItems.slice(0, 15);

export default function CashFlowWaterfall() {
  const maxFlow = Math.max(...DAYS.flatMap(d => [d.inflows, d.outflows]));
  const barW = CHART_W / DAYS.length;
  const halfW = barW * 0.34;

  return (
    <div className="orion-card overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1a2540]">
        <h3 className="text-sm font-semibold text-[#cbd5e1]">Fluxo Diário — Mai/2026</h3>
        <p className="text-[10px] mt-0.5 text-[#475569]">Entradas e saídas dos próximos 15 dias</p>
      </div>

      <div className="p-5 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ minWidth: 400 }}>
          {/* Grid */}
          {[0, 0.5, 1].map(f => {
            const y = PAD.t + f * CHART_H;
            const val = maxFlow * (1 - f);
            return (
              <g key={f}>
                <line x1={PAD.l} y1={y} x2={PAD.l + CHART_W} y2={y} stroke="#1a2540" strokeWidth="1" />
                {f < 1 && (
                  <text x={PAD.l} y={y - 2} fill="#334155" fontSize="7" fontFamily="monospace">
                    {(val / 1000).toFixed(0)}k
                  </text>
                )}
              </g>
            );
          })}

          {/* Bars */}
          {DAYS.map((d, i) => {
            const cx = PAD.l + i * barW + barW / 2;
            const inH = maxFlow > 0 ? (d.inflows / maxFlow) * CHART_H : 0;
            const outH = maxFlow > 0 ? (d.outflows / maxFlow) * CHART_H : 0;
            const isWeekend = new Date(d.date).getDay() === 0 || new Date(d.date).getDay() === 6;

            return (
              <g key={d.date}>
                {/* Weekend shade */}
                {isWeekend && (
                  <rect
                    x={cx - barW / 2} y={PAD.t}
                    width={barW} height={CHART_H}
                    fill="#ffffff06"
                  />
                )}

                {/* Inflow bar */}
                {d.inflows > 0 && (
                  <rect
                    x={cx - halfW * 2 - 1} y={PAD.t + CHART_H - inH}
                    width={halfW * 1.8} height={inH}
                    rx={2} fill="#22c55e99"
                  />
                )}

                {/* Outflow bar */}
                {d.outflows > 0 && (
                  <rect
                    x={cx + 1} y={PAD.t + CHART_H - outH}
                    width={halfW * 1.8} height={outH}
                    rx={2} fill="#f43f5e99"
                  />
                )}

                {/* Event dot */}
                {d.label && (
                  <circle cx={cx} cy={PAD.t + 4} r={2.5} fill="#f59e0b" />
                )}

                {/* X label */}
                <text
                  x={cx} y={H - 8}
                  textAnchor="middle" fill={isWeekend ? "#1e2d40" : "#334155"}
                  fontSize="7"
                >
                  {d.date.slice(8)}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Summary row */}
        <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-[#1a2540]">
          {[
            { label: "Total Entradas", value: DAYS.reduce((s, d) => s + d.inflows, 0), color: "#22c55e" },
            { label: "Total Saídas",   value: DAYS.reduce((s, d) => s + d.outflows, 0), color: "#f43f5e" },
            {
              label: "Saldo Líquido",
              value: DAYS.reduce((s, d) => s + d.inflows - d.outflows, 0),
              color: "#38bdf8",
            },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <p className="text-[10px] uppercase tracking-wider mb-0.5 text-[#475569]">{label}</p>
              <p className="text-sm font-bold font-mono" style={{ color }}>
                {value >= 0 ? "+" : ""}{formatCurrency(Math.abs(value))}
              </p>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-2">
          {[
            { color: "#22c55e", label: "Entradas" },
            { color: "#f43f5e", label: "Saídas" },
            { color: "#f59e0b", label: "Evento relevante" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color + "99" }} />
              <span className="text-[10px] text-[#475569]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
