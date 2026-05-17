"use client";

import { useState } from "react";
import { cashFlowItems } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";

const W = 600;
const H = 180;
const PAD = { t: 20, r: 20, b: 32, l: 20 };
const CHART_W = W - PAD.l - PAD.r;
const CHART_H = H - PAD.t - PAD.b;

export default function CashProjectionChart() {
  const [hovered, setHovered] = useState<number | null>(null);

  const balances = cashFlowItems.map(c => c.balance);
  const min = Math.min(...balances) * 0.996;
  const max = Math.max(...balances) * 1.002;
  const range = max - min;
  const n = cashFlowItems.length;

  const pts = cashFlowItems.map((c, i) => ({
    x: PAD.l + (i / (n - 1)) * CHART_W,
    y: PAD.t + (1 - (c.balance - min) / range) * CHART_H,
    v: c.balance,
    date: c.date,
    confirmed: c.confirmed,
    label: c.label,
    i,
  }));

  const confirmedPts = pts.filter(p => p.confirmed);
  const allPts = pts;

  const polylineAll = allPts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const polylineConf = confirmedPts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  const areaAll = [
    `${allPts[0].x.toFixed(1)},${(PAD.t + CHART_H).toFixed(1)}`,
    ...allPts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`),
    `${allPts[n - 1].x.toFixed(1)},${(PAD.t + CHART_H).toFixed(1)}`,
  ].join(" ");

  const hp = hovered !== null ? pts[hovered] : null;

  // Events with labels
  const events = pts.filter(p => p.label);

  return (
    <div className="orion-card overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1a2540]">
        <h3 className="text-sm font-semibold text-[#cbd5e1]">Projeção de Caixa — 30 dias</h3>
        <p className="text-[10px] mt-0.5 text-[#475569]">Saldo consolidado projetado · Mai–Jun/2026</p>
      </div>

      <div className="p-5">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "crosshair" }}
        >
          <defs>
            <linearGradient id="projGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map(f => {
            const y = PAD.t + f * CHART_H;
            const val = max - f * range;
            return (
              <g key={f}>
                <line x1={PAD.l} y1={y} x2={PAD.l + CHART_W} y2={y} stroke="#1a2540" strokeWidth="1" />
                <text x={PAD.l} y={y - 3} fill="#334155" fontSize="8" fontFamily="monospace">
                  {(val / 1_000_000).toFixed(2)}M
                </text>
              </g>
            );
          })}

          {/* Event markers */}
          {events.map(p => (
            <line
              key={p.i}
              x1={p.x} y1={PAD.t}
              x2={p.x} y2={PAD.t + CHART_H}
              stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="3 3"
            />
          ))}

          {/* Confirmed/projected split */}
          {(() => {
            const splitIdx = confirmedPts.length - 1;
            const splitX = splitIdx >= 0 ? confirmedPts[splitIdx].x : 0;
            return (
              <line
                x1={splitX} y1={PAD.t}
                x2={splitX} y2={PAD.t + CHART_H}
                stroke="#6366f1" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 2"
              />
            );
          })()}

          {/* Area fill */}
          <polygon points={areaAll} fill="url(#projGrad2)" />

          {/* Projected line (dashed) */}
          <polyline points={polylineAll} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="5 3" strokeOpacity="0.5" />

          {/* Confirmed line (solid) */}
          <polyline points={polylineConf} fill="none" stroke="#38bdf8" strokeWidth="2" />

          {/* Hover capture */}
          {pts.map((p, i) => (
            <rect
              key={i}
              x={p.x - CHART_W / (n - 1) / 2}
              y={PAD.t}
              width={CHART_W / (n - 1)}
              height={CHART_H}
              fill="transparent"
              onMouseEnter={() => setHovered(i)}
            />
          ))}

          {/* Hover tooltip */}
          {hp && (
            <g>
              <line x1={hp.x} y1={PAD.t} x2={hp.x} y2={PAD.t + CHART_H} stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />
              <circle cx={hp.x} cy={hp.y} r={3.5} fill={hp.confirmed ? "#38bdf8" : "#6366f1"} />
              <rect
                x={hp.x > W / 2 ? hp.x - 118 : hp.x + 6}
                y={hp.y - 18} width={114} height={hp.label ? 32 : 22}
                rx={4} fill="#0d1628" stroke="#1a2540" strokeWidth="1"
              />
              <text
                x={hp.x > W / 2 ? hp.x - 61 : hp.x + 63}
                y={hp.y - 5}
                textAnchor="middle" fill="#38bdf8"
                fontSize="9" fontFamily="monospace"
              >
                {hp.date.slice(5).replace("-", "/")} · {(hp.v / 1_000_000).toFixed(3)}M
              </text>
              {hp.label && (
                <text
                  x={hp.x > W / 2 ? hp.x - 61 : hp.x + 63}
                  y={hp.y + 7}
                  textAnchor="middle" fill="#f59e0b"
                  fontSize="8"
                >
                  {hp.label}
                </text>
              )}
            </g>
          )}

          {/* X-axis labels */}
          {[0, 7, 14, 21, 28].map(i => i < n && (
            <text
              key={i} x={pts[i].x} y={H - 6}
              textAnchor="middle" fill="#334155" fontSize="8"
            >
              {cashFlowItems[i].date.slice(5).replace("-", "/")}
            </text>
          ))}
        </svg>

        {/* Legend + callouts */}
        <div className="flex items-center gap-4 mt-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-0.5 rounded bg-[#38bdf8]" />
            <span className="text-[10px] text-[#475569]">Confirmado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-px rounded" style={{ background: "#38bdf8", borderBottom: "1px dashed #38bdf8" }} />
            <span className="text-[10px] text-[#475569]">Projetado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#f59e0b40", border: "1px solid #f59e0b" }} />
            <span className="text-[10px] text-[#475569]">Evento relevante</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#1a2540]">
          <div>
            <p className="text-[10px] uppercase tracking-wider mb-0.5 text-[#475569]">Saldo Atual</p>
            <p className="text-sm font-bold font-mono text-[#38bdf8]">
              {formatCurrency(cashFlowItems[0].balance)}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider mb-0.5 text-[#475569]">Mínimo 30d</p>
            <p className="text-sm font-bold font-mono text-[#f43f5e]">
              {formatCurrency(Math.min(...balances))}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider mb-0.5 text-[#475569]">Projeção D+30</p>
            <p className="text-sm font-bold font-mono text-[#22c55e]">
              {formatCurrency(balances[n - 1])}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
