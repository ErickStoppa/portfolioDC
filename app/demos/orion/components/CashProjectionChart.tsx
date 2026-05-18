"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CashFlowItem } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";

interface Props { items: CashFlowItem[] }

// ── SVG constants ─────────────────────────────────────────────────────────────
const W = 700; const H = 200;
const L = 52; const R = 692; const T = 20; const B = 178;
const CW = R - L; const CH = B - T;

function cx(i: number, n: number) { return L + (i / (n - 1)) * CW; }

export default function CashProjectionChart({ items }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const N = items.length;

  const { maxFlow, balMin, balMax, balRange, gridVals } = useMemo(() => {
    const inMax  = Math.max(...items.map(d => d.inflows));
    const outMax = Math.max(...items.map(d => d.outflows));
    const mF     = Math.max(inMax, outMax, 1);
    const bals   = items.map(d => d.balance);
    const bMin   = Math.min(...bals);
    const bMax   = Math.max(...bals);
    const bRange = bMax - bMin || 1;
    // y-axis for balance: maps to top 70% of chart
    const gVals  = [bMin, bMin + bRange * 0.25, bMin + bRange * 0.5, bMin + bRange * 0.75, bMax];
    return { maxFlow: mF, balMin: bMin, balMax: bMax, balRange: bRange, gridVals: gVals };
  }, [items]);

  const yBal = (v: number) => T + CH * 0.9 - ((v - balMin) / balRange) * CH * 0.88;
  const yIn  = (v: number) => B - (v / maxFlow) * CH * 0.35;
  const yOut = (v: number) => B - (v / maxFlow) * CH * 0.35;

  // Inflow area (top region)
  const inflowTop  = items.map((d, i) => `${cx(i, N).toFixed(1)},${yIn(d.inflows).toFixed(1)}`).join(" ");
  const outflowTop = items.map((d, i) => `${cx(i, N).toFixed(1)},${yOut(d.outflows).toFixed(1)}`).join(" ");
  const inflowArea = `${cx(0,N).toFixed(1)},${B} ${inflowTop} ${cx(N-1,N).toFixed(1)},${B}`;
  const outflowArea= `${cx(0,N).toFixed(1)},${B} ${outflowTop} ${cx(N-1,N).toFixed(1)},${B}`;

  // Balance polyline
  const balPoly = items.map((d, i) => `${cx(i, N).toFixed(1)},${yBal(d.balance).toFixed(1)}`).join(" ");

  // Confidence band: ±15% of balance for projected items
  const confTop = items
    .filter(d => !d.confirmed)
    .map((d, idx) => {
      const fullIdx = items.findIndex(it => it === d);
      return `${cx(fullIdx, N).toFixed(1)},${yBal(d.balance * 1.15).toFixed(1)}`;
    });
  const confBot = [...items]
    .filter(d => !d.confirmed)
    .reverse()
    .map(d => {
      const fullIdx = items.findIndex(it => it === d);
      return `${cx(fullIdx, N).toFixed(1)},${yBal(d.balance * 0.85).toFixed(1)}`;
    });
  const confBand = [...confTop, ...confBot].join(" ");

  const splitIdx = items.findLastIndex(d => d.confirmed);
  const splitX   = splitIdx >= 0 ? cx(splitIdx, N) : L;

  const hp  = hovered !== null ? items[hovered] : null;
  const hpX = hovered !== null ? cx(hovered, N) : 0;
  const tipRight = hovered !== null && hpX > W * 0.6;

  const xLabels = [0, 5, 10, 15, 20, 25, 29].filter(i => i < N);

  return (
    <div className="orion-card overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1a2540]">
        <h3 className="text-sm font-semibold text-[#cbd5e1]">Projeção de Caixa — 30 Dias</h3>
        <p className="text-[10px] mt-0.5 text-[#475569]">
          Entradas · Saídas · Saldo projetado com banda de confiança ±15%
        </p>
      </div>

      <div className="p-5 overflow-x-auto">
        <div className="relative" onMouseLeave={() => setHovered(null)}>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ minWidth: 480, display: "block" }}>
            <defs>
              <linearGradient id="cpIn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="cpOut" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {gridVals.map((v, gi) => {
              const y = yBal(v);
              return (
                <g key={gi}>
                  <line x1={L} y1={y} x2={R} y2={y} stroke="#1a2540" strokeWidth="1" />
                  <text x={L - 4} y={y + 3} textAnchor="end" fill="#334155" fontSize="7" fontFamily="monospace">
                    {(v / 1_000_000).toFixed(2)}M
                  </text>
                </g>
              );
            })}

            {/* Baseline (where bars start from) */}
            <line x1={L} y1={B} x2={R} y2={B} stroke="#2a3a5a" strokeWidth="1" />

            {/* Inflow area (indigo) */}
            <polygon points={inflowArea} fill="url(#cpIn)" />
            <polyline points={inflowTop} fill="none" stroke="#6366f1" strokeWidth="1.2" strokeOpacity="0.6" />

            {/* Outflow area (red) */}
            <polygon points={outflowArea} fill="url(#cpOut)" />
            <polyline points={outflowTop} fill="none" stroke="#f43f5e" strokeWidth="1.2" strokeOpacity="0.5" />

            {/* Confidence band */}
            {confBand.length > 10 && (
              <polygon points={confBand} fill="#94a3b8" fillOpacity="0.07" />
            )}

            {/* Balance polyline (projected = dashed) */}
            {splitIdx >= 0 && (
              <polyline
                points={items.slice(splitIdx).map((d, i) =>
                  `${cx(splitIdx + i, N).toFixed(1)},${yBal(d.balance).toFixed(1)}`
                ).join(" ")}
                fill="none" stroke="#6366f1" strokeWidth="1.8" strokeDasharray="4 3" strokeOpacity="0.6"
              />
            )}
            {/* Balance polyline (confirmed = solid) */}
            <polyline
              points={items.slice(0, splitIdx + 1).map((d, i) =>
                `${cx(i, N).toFixed(1)},${yBal(d.balance).toFixed(1)}`
              ).join(" ")}
              fill="none" stroke="#6366f1" strokeWidth="2"
            />

            {/* Confirmed/projected boundary */}
            {splitIdx >= 0 && (
              <g>
                <line x1={splitX} y1={T} x2={splitX} y2={B}
                  stroke="#6366f1" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.4" />
                <text x={splitX - 4} y={T + 8} textAnchor="end" fill="#6366f1" fontSize="7" fillOpacity="0.6">
                  Confirmado
                </text>
                <text x={splitX + 4} y={T + 8} textAnchor="start" fill="#94a3b8" fontSize="7" fillOpacity="0.5">
                  Projetado
                </text>
              </g>
            )}

            {/* Hover rule */}
            {hovered !== null && (
              <line x1={hpX} y1={T} x2={hpX} y2={B}
                stroke="#ffffff" strokeWidth="1" strokeOpacity="0.12" />
            )}

            {/* X labels */}
            {xLabels.map(i => (
              <text key={i} x={cx(i, N)} y={H - 4} textAnchor="middle" fill="#334155" fontSize="7">
                {items[i].date.slice(5).replace("-", "/")}
              </text>
            ))}

            {/* Hit areas */}
            {items.map((_, i) => (
              <rect
                key={i}
                x={cx(i, N) - CW / (N - 1) / 2} y={T}
                width={CW / (N - 1)} height={B - T}
                fill="transparent" style={{ cursor: "crosshair" }}
                onMouseEnter={() => setHovered(i)}
              />
            ))}
          </svg>

          {/* Tooltip */}
          <AnimatePresence>
            {hp && (
              <motion.div
                key={hovered}
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="absolute pointer-events-none z-20 w-44 rounded-xl border border-[#1a2540] bg-[#0d1628] shadow-xl px-3 py-2.5"
                style={{
                  top: "24px",
                  left: tipRight ? undefined : `calc(${(hpX / W) * 100}% + 8px)`,
                  right: tipRight ? `calc(${100 - (hpX / W) * 100}% + 8px)` : undefined,
                }}
              >
                <p className="text-[10px] font-semibold text-[#cbd5e1] mb-1.5">
                  {hp.date.split("-").reverse().join("/")}
                  <span className="ml-2 text-[9px]" style={{ color: hp.confirmed ? "#22c55e" : "#818cf8" }}>
                    {hp.confirmed ? "✓ Conf." : "~ Proj."}
                  </span>
                </p>
                {hp.label && <p className="text-[9px] text-[#f59e0b] mb-1.5 leading-tight">{hp.label}</p>}
                <div className="space-y-1">
                  {hp.inflows > 0 && (
                    <div className="flex justify-between text-[10px]">
                      <span className="text-[#475569]">Entradas</span>
                      <span className="font-mono text-[#6366f1]">+{formatCurrency(hp.inflows)}</span>
                    </div>
                  )}
                  {hp.outflows > 0 && (
                    <div className="flex justify-between text-[10px]">
                      <span className="text-[#475569]">Saídas</span>
                      <span className="font-mono text-[#f43f5e]">−{formatCurrency(hp.outflows)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[10px] pt-1 border-t border-[#1a2540]">
                    <span className="text-[#475569]">Saldo</span>
                    <span className="font-mono font-semibold text-[#6366f1]">{formatCurrency(hp.balance)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Legend + summary */}
        <div className="flex items-center flex-wrap gap-4 mt-3">
          {[
            { color: "#6366f1", label: "Entradas" },
            { color: "#f43f5e", label: "Saídas" },
            { color: "#6366f1", label: "Saldo", dashed: true },
            { color: "#94a3b8", label: "Banda ±15%", band: true },
          ].map(({ color, label, dashed, band }) => (
            <div key={label} className="flex items-center gap-1.5">
              {band
                ? <div className="w-4 h-2 rounded-sm" style={{ backgroundColor: "#94a3b822", border: "1px solid #94a3b844" }} />
                : dashed
                ? <div className="w-4 h-px" style={{ borderTop: `1px dashed ${color}99` }} />
                : <div className="w-4 h-px" style={{ backgroundColor: color + "aa" }} />}
              <span className="text-[10px] text-[#475569]">{label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#1a2540]">
          {[
            { label: "Saldo Atual",   val: items[0]?.balance,                 color: "#6366f1" },
            { label: "Mínimo 30d",    val: Math.min(...items.map(d=>d.balance)), color: "#f43f5e" },
            { label: "Projeção D+30", val: items[N-1]?.balance,               color: "#22c55e" },
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
