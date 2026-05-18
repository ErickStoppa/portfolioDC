"use client";

import { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils";
import type { MonthlyMetric } from "@/data/orion";

interface Props { monthlyMetrics: MonthlyMetric[] }

const W = 800; const H = 280;
const L = 52; const R = 794; const T = 24; const B = 248;
const CW = R - L; const CH = B - T;

export default function RevenueStackedArea({ monthlyMetrics }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const N = monthlyMetrics.length;

  const maxRev = useMemo(() => Math.max(...monthlyMetrics.map(d => d.revenue)), [monthlyMetrics]);

  const toX = (i: number) => L + (i / (N - 1)) * CW;
  const toY = (v: number) => B - (v / maxRev) * CH;

  // Stacked areas (bottom → top): COGS | OPEX | EBITDA+rest
  const pts = useMemo(() => monthlyMetrics.map((d, i) => ({
    x:        toX(i),
    yCogs:    toY(d.cogs),
    yOpex:    toY(d.cogs + d.opex),
    yEbitda:  toY(d.cogs + d.opex + d.ebitda),
    yRev:     toY(d.revenue),
    d,
  })), [monthlyMetrics, maxRev]);

  const buildArea = (topPts: { x: number; y: number }[]) => {
    const top = topPts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    const bot = `${toX(N-1).toFixed(1)},${B} ${toX(0).toFixed(1)},${B}`;
    return `${top} ${bot}`;
  };

  const cogsArea  = buildArea(pts.map(p => ({ x: p.x, y: p.yCogs  })));
  const opexArea  = buildArea(pts.map(p => ({ x: p.x, y: p.yOpex  })));
  const ebitdArea = buildArea(pts.map(p => ({ x: p.x, y: p.yEbitda})));

  const revLine  = pts.map(p => `${p.x.toFixed(1)},${p.yRev.toFixed(1)}`).join(" ");
  const gProfLine= pts.map(p => `${p.x.toFixed(1)},${p.yCogs.toFixed(1)}`).join(" ");

  const gridPcts = [0, 0.25, 0.5, 0.75, 1];

  const hp  = hovered !== null ? monthlyMetrics[hovered] : null;
  const hpX = hovered !== null ? toX(hovered) : null;

  return (
    <div className="orion-card overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1a2540]">
        <h3 className="text-sm font-semibold text-[#cbd5e1]">Decomposição da Receita — Jan a Dez 2026</h3>
        <p className="text-[10px] mt-0.5 text-[#475569]">COGS · Despesas Op. · EBITDA · Receita Total</p>
      </div>

      <div className="p-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ minWidth: 540, display: "block" }}
          onMouseLeave={() => setHovered(null)}
        >
          <defs>
            <linearGradient id="rsaCogs" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="rsaOpex" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="rsaEbt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.06" />
            </linearGradient>
            <clipPath id="rsaClip">
              <rect x={L} y={T} width={CW} height={CH}>
                <animate attributeName="width" from="0" to={CW} dur="1.2s" fill="freeze" />
              </rect>
            </clipPath>
          </defs>

          {/* Grid */}
          {gridPcts.map(f => {
            const y   = T + f * CH;
            const val = maxRev * (1 - f);
            return (
              <g key={f}>
                <line x1={L} y1={y} x2={R} y2={y} stroke="#1a2540" strokeWidth="1" />
                <text x={L - 4} y={y + 3.5} textAnchor="end" fill="#334155" fontSize="7" fontFamily="monospace">
                  {(val / 1e6).toFixed(1)}M
                </text>
              </g>
            );
          })}

          <g clipPath="url(#rsaClip)">
            {/* COGS layer (bottom, indigo) */}
            <polygon points={cogsArea}  fill="url(#rsaCogs)" />
            {/* OPEX layer (red) */}
            <polygon points={opexArea}  fill="url(#rsaOpex)" />
            {/* EBITDA layer (green) */}
            <polygon points={ebitdArea} fill="url(#rsaEbt)" />

            {/* Gross profit outline */}
            <polyline points={gProfLine} fill="none" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.7" />
            {/* Revenue outline (bold) */}
            <polyline points={revLine}  fill="none" stroke="#6366f1" strokeWidth="2" />
          </g>

          {/* Hover zones */}
          {monthlyMetrics.map((_, i) => (
            <rect
              key={i}
              x={toX(i) - CW / (N - 1) / 2} y={T}
              width={CW / (N - 1)} height={CH}
              fill="transparent"
              onMouseEnter={() => setHovered(i)}
            />
          ))}

          {/* Hover rule */}
          {hpX !== null && (
            <line x1={hpX} y1={T} x2={hpX} y2={B} stroke="#ffffff" strokeWidth="1" strokeOpacity="0.15" />
          )}

          {/* X labels */}
          {monthlyMetrics.map((d, i) => (
            <text key={i} x={toX(i)} y={H - 6} textAnchor="middle" fill="#334155" fontSize="8">
              {d.month}
            </text>
          ))}

          {/* Tooltip */}
          {hp && hpX !== null && (
            <g>
              <rect
                x={hpX > W / 2 ? hpX - 128 : hpX + 6} y={T + 4}
                width={124} height={76} rx={4}
                fill="#0d1628" stroke="#1a2540" strokeWidth={1}
              />
              <text x={hpX > W / 2 ? hpX - 66 : hpX + 68} y={T+18} textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="600">{hp.month}/26</text>
              <text x={hpX > W / 2 ? hpX - 66 : hpX + 68} y={T+31} textAnchor="middle" fill="#6366f1"  fontSize="8" fontFamily="monospace">Rev {(hp.revenue/1e6).toFixed(2)}M</text>
              <text x={hpX > W / 2 ? hpX - 66 : hpX + 68} y={T+43} textAnchor="middle" fill="#6366f1"  fontSize="8" fontFamily="monospace" fillOpacity="0.6">COGS {(hp.cogs/1e6).toFixed(2)}M ({((hp.cogs/hp.revenue)*100).toFixed(0)}%)</text>
              <text x={hpX > W / 2 ? hpX - 66 : hpX + 68} y={T+55} textAnchor="middle" fill="#f43f5e"  fontSize="8" fontFamily="monospace">Opex {(hp.opex/1e6).toFixed(2)}M</text>
              <text x={hpX > W / 2 ? hpX - 66 : hpX + 68} y={T+67} textAnchor="middle" fill="#22c55e"  fontSize="8" fontFamily="monospace">EBIT {(hp.ebitda/1e6).toFixed(2)}M</text>
              <text x={hpX > W / 2 ? hpX - 66 : hpX + 68} y={T+79} textAnchor="middle" fill="#a78bfa"  fontSize="8" fontFamily="monospace">LL   {(hp.netIncome/1e6).toFixed(2)}M</text>
            </g>
          )}
        </svg>

        {/* Legend */}
        <div className="flex items-center flex-wrap gap-5 mt-3">
          {[
            { color: "#6366f1", label: "Custo do Produto (COGS)",  alpha: 0.5 },
            { color: "#f43f5e", label: "Despesas Operacionais",      alpha: 0.5 },
            { color: "#22c55e", label: "EBITDA",                    alpha: 0.5 },
            { color: "#6366f1", label: "Receita Total",             alpha: 1   },
          ].map(({ color, label, alpha }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color, opacity: alpha }} />
              <span className="text-[10px] text-[#475569]">{label}</span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-[#1a2540]">
          {[
            { label: "Receita Bruta", val: monthlyMetrics.reduce((s,d)=>s+d.revenue,0),    color: "#6366f1" },
            { label: "Lucro Bruto",   val: monthlyMetrics.reduce((s,d)=>s+d.grossProfit,0), color: "#22c55e" },
            { label: "EBITDA Acum.",  val: monthlyMetrics.reduce((s,d)=>s+d.ebitda,0),      color: "#38bdf8" },
            { label: "Lucro Líq.",    val: monthlyMetrics.reduce((s,d)=>s+d.netIncome,0),   color: "#a78bfa" },
          ].map(({ label, val, color }) => (
            <div key={label}>
              <p className="text-[10px] uppercase tracking-wider mb-0.5 text-[#475569]">{label}</p>
              <p className="text-sm font-bold font-mono tabular-nums" style={{ color }}>{formatCurrency(val)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
