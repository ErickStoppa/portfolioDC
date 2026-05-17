"use client";

import { useState } from "react";
import { monthlyMetrics } from "@/data/orion";

const W = 560;
const H = 160;
const PAD = { t: 20, r: 20, b: 30, l: 20 };
const CW = W - PAD.l - PAD.r;
const CH = H - PAD.t - PAD.b;
const N = monthlyMetrics.length;
const BAR_W = CW / N - 4;

export default function MarginBarChart() {
  const [hovered, setHovered] = useState<number | null>(null);

  const margins = monthlyMetrics.map(d => ({
    month:  d.month,
    gross:  (d.grossProfit / d.revenue) * 100,
    ebitda: (d.ebitda / d.revenue) * 100,
    net:    (d.netIncome / d.revenue) * 100,
  }));

  const maxPct = Math.ceil(Math.max(...margins.map(m => m.gross)) / 10) * 10;

  return (
    <div className="orion-card overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1a2540]">
        <h3 className="text-sm font-semibold text-[#cbd5e1]">Evolução de Margens — 2026</h3>
        <p className="text-[10px] mt-0.5 text-[#475569]">Margem Bruta · EBITDA · Lucro Líquido</p>
      </div>

      <div className="p-5">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          onMouseLeave={() => setHovered(null)}
        >
          {/* Y-axis guides */}
          {[0, maxPct / 4, maxPct / 2, maxPct * 3 / 4, maxPct].map(pct => {
            const y = PAD.t + (1 - pct / maxPct) * CH;
            return (
              <g key={pct}>
                <line x1={PAD.l} y1={y} x2={PAD.l + CW} y2={y} stroke="#1a2540" strokeWidth="1" />
                <text x={PAD.l} y={y - 2} fill="#334155" fontSize="7">{pct.toFixed(0)}%</text>
              </g>
            );
          })}

          {/* Bars */}
          {margins.map((m, i) => {
            const x = PAD.l + i * (CW / N) + 2;
            const isHov = hovered === i;

            const grossH  = (m.gross  / maxPct) * CH;
            const ebitdaH = (m.ebitda / maxPct) * CH;
            const netH    = (m.net    / maxPct) * CH;

            return (
              <g key={m.month} onMouseEnter={() => setHovered(i)}>
                {/* Gross margin bar (background) */}
                <rect
                  x={x} y={PAD.t + CH - grossH}
                  width={BAR_W} height={grossH}
                  rx={2} fill="#22c55e"
                  fillOpacity={isHov ? 0.5 : 0.25}
                />
                {/* EBITDA bar */}
                <rect
                  x={x + BAR_W * 0.15} y={PAD.t + CH - ebitdaH}
                  width={BAR_W * 0.5} height={ebitdaH}
                  rx={2} fill="#38bdf8"
                  fillOpacity={isHov ? 0.9 : 0.65}
                />
                {/* Net income bar (thin) */}
                <rect
                  x={x + BAR_W * 0.65} y={PAD.t + CH - netH}
                  width={BAR_W * 0.2} height={netH}
                  rx={1} fill="#a78bfa"
                  fillOpacity={isHov ? 1 : 0.8}
                />
                {/* X label */}
                <text
                  x={x + BAR_W / 2} y={H - 8}
                  textAnchor="middle"
                  fill={isHov ? "#94a3b8" : "#334155"}
                  fontSize="7"
                >
                  {m.month}
                </text>
              </g>
            );
          })}

          {/* Tooltip */}
          {hovered !== null && (() => {
            const m = margins[hovered];
            const cx = PAD.l + hovered * (CW / N) + 2 + BAR_W / 2;
            const tx = cx > W / 2 ? cx - 92 : cx + 6;
            return (
              <g>
                <rect x={tx} y={PAD.t} width={88} height={54} rx={4}
                  fill="#0d1628" stroke="#1a2540" strokeWidth={1} />
                <text x={tx + 44} y={PAD.t + 13} textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="600">{m.month}/26</text>
                <text x={tx + 44} y={PAD.t + 26} textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="monospace">Bruta {m.gross.toFixed(1)}%</text>
                <text x={tx + 44} y={PAD.t + 38} textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">EBITDA {m.ebitda.toFixed(1)}%</text>
                <text x={tx + 44} y={PAD.t + 50} textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="monospace">Liq. {m.net.toFixed(1)}%</text>
              </g>
            );
          })()}
        </svg>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-2">
          {[
            { color: "#22c55e", label: "Margem Bruta" },
            { color: "#38bdf8", label: "EBITDA" },
            { color: "#a78bfa", label: "Margem Líquida" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color, opacity: 0.7 }} />
              <span className="text-[10px] text-[#475569]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
