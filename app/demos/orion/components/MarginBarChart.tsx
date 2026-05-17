"use client";

import { useState } from "react";
import { monthlyData } from "@/data/orion";

const W = 560;
const H = 160;
const PAD = { t: 20, r: 20, b: 30, l: 20 };
const CW = W - PAD.l - PAD.r;
const CH = H - PAD.t - PAD.b;
const N = monthlyData.length;
const BAR_W = CW / N - 4;

const margins = monthlyData.map((d) => ({
  month: d.month,
  gross: ((d.gross - d.net) / d.gross) * 100,  // deductions rate (inverse view)
  ebitda: (d.ebitda / d.gross) * 100,
  net: (d.net / d.gross) * 100,
}));

export default function MarginBarChart() {
  const [hovered, setHovered] = useState<number | null>(null);

  const maxPct = 100;

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ backgroundColor: "#0a1220", borderColor: "#1a2540" }}
    >
      <div className="px-5 py-4 border-b" style={{ borderColor: "#1a2540" }}>
        <h3 className="text-sm font-semibold" style={{ color: "#cbd5e1" }}>
          Evolução de Margens
        </h3>
        <p className="text-[10px] mt-0.5" style={{ color: "#475569" }}>
          Margem Líquida e EBITDA — Jun/24–Mai/25
        </p>
      </div>

      <div className="p-5">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          onMouseLeave={() => setHovered(null)}
        >
          {/* Y-axis guides */}
          {[0, 25, 50, 75, 100].map((pct) => {
            const y = PAD.t + (1 - pct / maxPct) * CH;
            return (
              <g key={pct}>
                <line
                  x1={PAD.l} y1={y} x2={PAD.l + CW} y2={y}
                  stroke="#1a2540" strokeWidth="1"
                />
                {pct > 0 && (
                  <text x={PAD.l} y={y - 2} fill="#334155" fontSize="7">
                    {pct}%
                  </text>
                )}
              </g>
            );
          })}

          {/* Bars — net margin (background) */}
          {margins.map((m, i) => {
            const x = PAD.l + i * (CW / N) + 2;
            const isHov = hovered === i;

            // Net margin bar (lighter, full height context)
            const netH = (m.net / maxPct) * CH;
            const netY = PAD.t + CH - netH;

            // EBITDA bar (overlaid)
            const ebitdaH = (m.ebitda / maxPct) * CH;
            const ebitdaY = PAD.t + CH - ebitdaH;

            return (
              <g
                key={m.month}
                onMouseEnter={() => setHovered(i)}
              >
                {/* Net margin bar */}
                <rect
                  x={x} y={netY} width={BAR_W} height={netH}
                  rx={2} fill="#6366f1"
                  fillOpacity={isHov ? 0.8 : 0.4}
                />
                {/* EBITDA bar */}
                <rect
                  x={x + BAR_W * 0.15} y={ebitdaY}
                  width={BAR_W * 0.7} height={ebitdaH}
                  rx={2} fill="#22c55e"
                  fillOpacity={isHov ? 0.95 : 0.7}
                />
                {/* X label */}
                <text
                  x={x + BAR_W / 2} y={H - 8}
                  textAnchor="middle" fill={isHov ? "#94a3b8" : "#334155"}
                  fontSize="7"
                >
                  {m.month.split("/")[0]}
                </text>
              </g>
            );
          })}

          {/* Tooltip */}
          {hovered !== null && (() => {
            const m = margins[hovered];
            const x = PAD.l + hovered * (CW / N) + 2 + BAR_W / 2;
            const tx = x > W / 2 ? x - 90 : x + 6;
            return (
              <g>
                <rect x={tx} y={PAD.t} width={86} height={46} rx={4}
                  fill="#0f1e35" stroke="#1a2540" strokeWidth={1} />
                <text x={tx + 43} y={PAD.t + 13} textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="600">
                  {m.month}
                </text>
                <text x={tx + 43} y={PAD.t + 25} textAnchor="middle" fill="#6366f1" fontSize="8" fontFamily="monospace">
                  Liq. {m.net.toFixed(1)}%
                </text>
                <text x={tx + 43} y={PAD.t + 38} textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="monospace">
                  EBITDA {m.ebitda.toFixed(1)}%
                </text>
              </g>
            );
          })()}
        </svg>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-2">
          {[
            { color: "#6366f1", label: "Margem Líquida" },
            { color: "#22c55e", label: "Margem EBITDA" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
              <span className="text-[10px]" style={{ color: "#475569" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
