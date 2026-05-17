"use client";

import { useState } from "react";
import { monthlyMetrics } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";

const W = 600;
const H = 200;
const PAD = { t: 20, r: 20, b: 32, l: 20 };
const CW = W - PAD.l - PAD.r;
const CH = H - PAD.t - PAD.b;
const N = monthlyMetrics.length;

export default function RevenueStackedArea() {
  const [hovered, setHovered] = useState<number | null>(null);

  const maxRev = Math.max(...monthlyMetrics.map(d => d.revenue));

  const toY = (v: number) => PAD.t + CH - (v / maxRev) * CH;
  const toX = (i: number) => PAD.l + (i / (N - 1)) * CW;

  const buildPoly = (vals: number[]) => {
    const pts = vals.map((v, i) => `${toX(i).toFixed(1)},${toY(v).toFixed(1)}`);
    const bot = `${toX(N - 1).toFixed(1)},${(PAD.t + CH).toFixed(1)} ${toX(0).toFixed(1)},${(PAD.t + CH).toFixed(1)}`;
    return `${pts.join(" ")} ${bot}`;
  };

  const buildLine = (vals: number[]) =>
    vals.map((v, i) => `${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(" ");

  const hp = hovered !== null ? monthlyMetrics[hovered] : null;
  const hpX = hovered !== null ? toX(hovered) : null;

  return (
    <div className="orion-card overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1a2540]">
        <h3 className="text-sm font-semibold text-[#cbd5e1]">Evolução de Receita — 2026</h3>
        <p className="text-[10px] mt-0.5 text-[#475569]">Receita Bruta · Lucro Bruto · EBITDA · Lucro Líquido</p>
      </div>

      <div className="p-5">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "crosshair" }}
        >
          <defs>
            <linearGradient id="areaRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="areaGP" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid */}
          {[0, 0.25, 0.5, 0.75, 1].map(f => {
            const y = PAD.t + f * CH;
            const val = maxRev * (1 - f);
            return (
              <g key={f}>
                <line x1={PAD.l} y1={y} x2={PAD.l + CW} y2={y} stroke="#1a2540" strokeWidth="1" />
                {f < 1 && (
                  <text x={PAD.l} y={y - 2} fill="#334155" fontSize="7" fontFamily="monospace">
                    {(val / 1_000_000).toFixed(1)}M
                  </text>
                )}
              </g>
            );
          })}

          {/* Revenue area */}
          <polygon points={buildPoly(monthlyMetrics.map(d => d.revenue))} fill="url(#areaRev)" />
          <polyline points={buildLine(monthlyMetrics.map(d => d.revenue))} fill="none" stroke="#6366f1" strokeWidth="1.5" />

          {/* Gross profit area */}
          <polygon points={buildPoly(monthlyMetrics.map(d => d.grossProfit))} fill="url(#areaGP)" />
          <polyline points={buildLine(monthlyMetrics.map(d => d.grossProfit))} fill="none" stroke="#22c55e" strokeWidth="1.5" />

          {/* EBITDA line */}
          <polyline points={buildLine(monthlyMetrics.map(d => d.ebitda))} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />

          {/* Net income line */}
          <polyline points={buildLine(monthlyMetrics.map(d => d.netIncome))} fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Hover zones */}
          {monthlyMetrics.map((_, i) => (
            <rect
              key={i}
              x={toX(i) - CW / (N - 1) / 2}
              y={PAD.t}
              width={CW / (N - 1)}
              height={CH}
              fill="transparent"
              onMouseEnter={() => setHovered(i)}
            />
          ))}

          {/* Hover line */}
          {hpX !== null && (
            <line x1={hpX} y1={PAD.t} x2={hpX} y2={PAD.t + CH} stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
          )}

          {/* X labels */}
          {monthlyMetrics.map((d, i) => (
            <text key={i} x={toX(i)} y={H - 10} textAnchor="middle" fill="#334155" fontSize="8">
              {d.month}
            </text>
          ))}

          {/* Tooltip */}
          {hp && hpX !== null && (
            <g>
              <rect
                x={hpX > W / 2 ? hpX - 114 : hpX + 6}
                y={PAD.t + 4}
                width={110} height={66} rx={4}
                fill="#0d1628" stroke="#1a2540" strokeWidth={1}
              />
              <text x={hpX > W / 2 ? hpX - 59 : hpX + 61} y={PAD.t + 17} textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="600">{hp.month}/26</text>
              <text x={hpX > W / 2 ? hpX - 59 : hpX + 61} y={PAD.t + 30} textAnchor="middle" fill="#6366f1" fontSize="8" fontFamily="monospace">Rev {(hp.revenue / 1e6).toFixed(2)}M</text>
              <text x={hpX > W / 2 ? hpX - 59 : hpX + 61} y={PAD.t + 42} textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="monospace">GP  {(hp.grossProfit / 1e6).toFixed(2)}M</text>
              <text x={hpX > W / 2 ? hpX - 59 : hpX + 61} y={PAD.t + 54} textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">EBT {(hp.ebitda / 1e6).toFixed(2)}M</text>
              <text x={hpX > W / 2 ? hpX - 59 : hpX + 61} y={PAD.t + 66} textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="monospace">LL  {(hp.netIncome / 1e6).toFixed(2)}M</text>
            </g>
          )}
        </svg>

        {/* Legend */}
        <div className="flex items-center flex-wrap gap-4 mt-2">
          {[
            { color: "#6366f1", label: "Receita Bruta" },
            { color: "#22c55e", label: "Lucro Bruto" },
            { color: "#38bdf8", label: "EBITDA" },
            { color: "#a78bfa", label: "Lucro Líquido" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 rounded" style={{ backgroundColor: color }} />
              <span className="text-[10px] text-[#475569]">{label}</span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-[#1a2540]">
          {[
            { label: "Receita Bruta", value: monthlyMetrics.reduce((s, d) => s + d.revenue, 0), color: "#6366f1" },
            { label: "Lucro Bruto",   value: monthlyMetrics.reduce((s, d) => s + d.grossProfit, 0), color: "#22c55e" },
            { label: "EBITDA Acum.",  value: monthlyMetrics.reduce((s, d) => s + d.ebitda, 0), color: "#38bdf8" },
            { label: "Lucro Líq.",    value: monthlyMetrics.reduce((s, d) => s + d.netIncome, 0), color: "#a78bfa" },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <p className="text-[10px] uppercase tracking-wider mb-0.5 text-[#475569]">{label}</p>
              <p className="text-sm font-bold font-mono" style={{ color }}>
                {formatCurrency(value)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
