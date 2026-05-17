"use client";

import { useState } from "react";
import { cashProjection } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";

const W = 600;
const H = 180;
const PAD = { t: 20, r: 20, b: 32, l: 20 };
const CHART_W = W - PAD.l - PAD.r;
const CHART_H = H - PAD.t - PAD.b;

export default function CashProjectionChart() {
  const [hovered, setHovered] = useState<number | null>(null);

  const min = Math.min(...cashProjection) * 0.995;
  const max = Math.max(...cashProjection) * 1.005;
  const range = max - min;
  const n = cashProjection.length;

  const pts = cashProjection.map((v, i) => ({
    x: PAD.l + (i / (n - 1)) * CHART_W,
    y: PAD.t + (1 - (v - min) / range) * CHART_H,
    v,
    day: i + 1,
  }));

  const polyline = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = [
    `${pts[0].x.toFixed(1)},${(PAD.t + CHART_H).toFixed(1)}`,
    ...pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`),
    `${pts[n - 1].x.toFixed(1)},${(PAD.t + CHART_H).toFixed(1)}`,
  ].join(" ");

  const hp = hovered !== null ? pts[hovered] : null;

  // Payroll dip days (approx days 5, 10, 17, 20 in projection)
  const dipDays = [4, 9, 16, 19];

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ backgroundColor: "#0a1220", borderColor: "#1a2540" }}
    >
      <div className="px-5 py-4 border-b" style={{ borderColor: "#1a2540" }}>
        <h3 className="text-sm font-semibold" style={{ color: "#cbd5e1" }}>
          Projeção de Caixa — 30 dias
        </h3>
        <p className="text-[10px] mt-0.5" style={{ color: "#475569" }}>
          Saldo consolidado projetado · Mai–Jun/2025
        </p>
      </div>

      <div className="p-5">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "crosshair" }}
        >
          <defs>
            <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((f) => {
            const y = PAD.t + f * CHART_H;
            const val = max - f * range;
            return (
              <g key={f}>
                <line
                  x1={PAD.l} y1={y} x2={PAD.l + CHART_W} y2={y}
                  stroke="#1a2540" strokeWidth="1"
                />
                <text
                  x={PAD.l} y={y - 3}
                  fill="#334155" fontSize="8" fontFamily="monospace"
                >
                  {(val / 1_000_000).toFixed(1)}M
                </text>
              </g>
            );
          })}

          {/* Payroll dip markers */}
          {dipDays.map((d) => (
            <line
              key={d}
              x1={pts[d].x} y1={PAD.t}
              x2={pts[d].x} y2={PAD.t + CHART_H}
              stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3"
            />
          ))}

          {/* Area */}
          <polygon points={area} fill="url(#projGrad)" />

          {/* Line */}
          <polyline points={polyline} fill="none" stroke="#38bdf8" strokeWidth="1.5" />

          {/* Hover capture layer */}
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

          {/* Hover dot + tooltip */}
          {hp && (
            <g>
              <line
                x1={hp.x} y1={PAD.t} x2={hp.x} y2={PAD.t + CHART_H}
                stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4"
              />
              <circle cx={hp.x} cy={hp.y} r={3.5} fill="#38bdf8" />
              <rect
                x={hp.x > W / 2 ? hp.x - 104 : hp.x + 6}
                y={hp.y - 18}
                width={100} height={22} rx={4}
                fill="#0f1e35" stroke="#1a2540" strokeWidth="1"
              />
              <text
                x={hp.x > W / 2 ? hp.x - 54 : hp.x + 56}
                y={hp.y - 3}
                textAnchor="middle" fill="#38bdf8"
                fontSize="9" fontFamily="monospace"
              >
                D+{hp.day}: {(hp.v / 1_000_000).toFixed(2)}M
              </text>
            </g>
          )}

          {/* X-axis day labels */}
          {[0, 6, 13, 20, 27, 29].map((i) => (
            <text
              key={i}
              x={pts[i].x} y={H - 6}
              textAnchor="middle"
              fill="#334155" fontSize="8"
            >
              D+{i + 1}
            </text>
          ))}
        </svg>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 rounded" style={{ backgroundColor: "#38bdf8" }} />
            <span className="text-[10px]" style={{ color: "#475569" }}>Saldo projetado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 rounded" style={{ backgroundColor: "#f59e0b", opacity: 0.5 }} />
            <span className="text-[10px]" style={{ color: "#475569" }}>Folha de pagamento</span>
          </div>
        </div>

        {/* Min/Max callout */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t" style={{ borderColor: "#1a2540" }}>
          <div>
            <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "#475569" }}>Saldo Atual</p>
            <p className="text-sm font-bold font-mono" style={{ color: "#38bdf8" }}>
              {formatCurrency(cashProjection[0])}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "#475569" }}>Mínimo D+30</p>
            <p className="text-sm font-bold font-mono" style={{ color: "#f43f5e" }}>
              {formatCurrency(Math.min(...cashProjection))}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "#475569" }}>Projeção D+30</p>
            <p className="text-sm font-bold font-mono" style={{ color: "#22c55e" }}>
              {formatCurrency(cashProjection[cashProjection.length - 1])}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
