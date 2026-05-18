"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CashFlowItem } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";

interface Props { items: CashFlowItem[] }

// ── SVG constants ─────────────────────────────────────────────────────────────
const VW = 760;
const VH = 260;
const LEFT    = 56;       // y-axis label space
const RIGHT   = 754;
const TOP     = 24;       // room for event labels
const BOT     = 236;      // x-axis labels below this
const BASELINE = Math.round((TOP + BOT) / 2);   // 130
const HALF_H   = BASELINE - TOP;                  // 106

const CHART_W  = RIGHT - LEFT;                    // 698

function cx(i: number, n: number) { return LEFT + (i + 0.5) * (CHART_W / n); }

// ── helpers ───────────────────────────────────────────────────────────────────
const BAR_W     = 8;
const WEEKDAYS  = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

export default function CashFlowWaterfall({ items }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const N = items.length;

  const maxFlow = Math.max(...items.flatMap(d => [d.inflows, d.outflows]), 1);
  const pxPer   = HALF_H / maxFlow;

  // balance polyline mapping
  const bals    = items.map(d => d.balance);
  const balMin  = Math.min(...bals);
  const balMax  = Math.max(...bals);
  const balRange = balMax - balMin || 1;
  const BAL_H   = HALF_H * 0.74;
  const BAL_OFF = 8;   // pixels above baseline for min-balance point
  function yBal(v: number) {
    return BASELINE - BAL_OFF - ((v - balMin) / balRange) * BAL_H;
  }

  const balPoly = items.map((d, i) => `${cx(i, N).toFixed(1)},${yBal(d.balance).toFixed(1)}`).join(" ");

  // Y-axis grid values (every 100k)
  const gridVals = [-400,-300,-200,-100,0,100,200,300,400,500].map(v => v * 1000)
    .filter(v => {
      const y = BASELINE - v * pxPer;
      return y >= TOP - 2 && y <= BOT + 2;
    });

  // X-axis label indices (every 5 items)
  const xLabels = Array.from({ length: N }, (_, i) => i).filter(i => i % 5 === 0);

  const slotW = CHART_W / N;

  const hovItem = hovered !== null ? items[hovered] : null;
  const hovX    = hovered !== null ? cx(hovered, N) : 0;
  // tooltip horizontal alignment
  const tipLeft = hovered !== null ? (hovX / VW) * 100 : 0;
  const tipRight = tipLeft > 62;

  return (
    <div className="orion-card overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1a2540]">
        <h3 className="text-sm font-semibold text-[#cbd5e1]">Fluxo de Caixa — Próximos 30 Dias</h3>
        <p className="text-[10px] mt-0.5 text-[#475569]">Entradas · Saídas · Saldo projetado · Mai–Jun 2026</p>
      </div>

      <div className="p-5 overflow-x-auto">
        {/* ── SVG wrapper with tooltip overlay ────────────────────────────── */}
        <div className="relative" onMouseLeave={() => setHovered(null)}>
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            width="100%"
            style={{ minWidth: 520, display: "block" }}
          >
            <defs>
              <style>{`
                @keyframes barIn { from { transform: scaleY(0); } to { transform: scaleY(1); } }
                .bar-in  { transform-box: fill-box; transform-origin: center bottom; animation: barIn .35s ease both; }
                .bar-out { transform-box: fill-box; transform-origin: center top;    animation: barIn .35s ease both; }
                .bal-line { stroke-dasharray: none; }
              `}</style>
              <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity=".25" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Weekend shade */}
            {items.map((d, i) => {
              const dow = new Date(d.date).getDay();
              return (dow === 0 || dow === 6) ? (
                <rect key={i} x={LEFT + i * slotW} y={TOP} width={slotW} height={BOT - TOP}
                  fill="#ffffff04" />
              ) : null;
            })}

            {/* Grid lines + Y labels */}
            {gridVals.map(v => {
              const y = BASELINE - v * pxPer;
              const isBase = v === 0;
              return (
                <g key={v}>
                  <line x1={LEFT} y1={y} x2={RIGHT} y2={y}
                    stroke={isBase ? "#2a3a5a" : "#1a2540"}
                    strokeWidth={isBase ? 1.5 : 1}
                  />
                  <text x={LEFT - 4} y={y + 3.5} textAnchor="end"
                    fill="#334155" fontSize="7" fontFamily="monospace">
                    {v === 0 ? "0" : `${v > 0 ? "+" : ""}${(v / 1000).toFixed(0)}k`}
                  </text>
                </g>
              );
            })}

            {/* Bars */}
            {items.map((d, i) => {
              const x = cx(i, N);
              const confirmed = d.confirmed;
              const isHov  = hovered === i;

              const inH  = d.inflows  * pxPer;
              const outH = d.outflows * pxPer;

              return (
                <g key={d.date}>
                  {/* Inflow bar */}
                  {d.inflows > 0 && (
                    <rect
                      className="bar-in"
                      x={x - BAR_W - 0.5}
                      y={BASELINE - inH}
                      width={BAR_W}
                      height={inH}
                      rx={1.5}
                      fill="#22c55e"
                      fillOpacity={isHov ? 1 : confirmed ? 0.82 : 0.38}
                      stroke={isHov ? "#fff" : "none"}
                      strokeWidth={0.8}
                      style={{ animationDelay: `${i * 18}ms` }}
                    />
                  )}
                  {/* Outflow bar */}
                  {d.outflows > 0 && (
                    <rect
                      className="bar-out"
                      x={x + 0.5}
                      y={BASELINE}
                      width={BAR_W}
                      height={outH}
                      rx={1.5}
                      fill="#f43f5e"
                      fillOpacity={isHov ? 1 : confirmed ? 0.78 : 0.35}
                      stroke={isHov ? "#fff" : "none"}
                      strokeWidth={0.8}
                      style={{ animationDelay: `${i * 18}ms` }}
                    />
                  )}
                  {/* Event label */}
                  {d.label && (
                    <text
                      x={x} y={TOP + 4}
                      textAnchor="start"
                      fill="#f59e0b"
                      fontSize="7"
                      transform={`rotate(-42, ${x}, ${TOP + 4})`}
                    >
                      {d.label.length > 18 ? d.label.slice(0, 16) + "…" : d.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Balance area fill */}
            {(() => {
              const pts = items.map((d, i) => `${cx(i,N).toFixed(1)},${yBal(d.balance).toFixed(1)}`);
              const area = `${LEFT},${BASELINE - BAL_OFF} ${pts.join(" ")} ${RIGHT},${BASELINE - BAL_OFF}`;
              return <polygon points={area} fill="url(#balGrad)" />;
            })()}

            {/* Balance polyline */}
            <polyline points={balPoly} fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" className="bal-line" />

            {/* Confirmed/projected boundary */}
            {(() => {
              const splitIdx = items.findLastIndex(d => d.confirmed);
              if (splitIdx < 0) return null;
              const sx = cx(splitIdx, N) + slotW * 0.5;
              return (
                <line x1={sx} y1={TOP} x2={sx} y2={BOT}
                  stroke="#6366f1" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.5" />
              );
            })()}

            {/* Hover vertical rule */}
            {hovered !== null && (
              <line x1={hovX} y1={TOP} x2={hovX} y2={BOT}
                stroke="#ffffff" strokeWidth="1" strokeOpacity="0.14" />
            )}

            {/* X-axis labels */}
            {xLabels.map(i => (
              <text key={i} x={cx(i, N)} y={VH - 6}
                textAnchor="middle" fill="#334155" fontSize="7.5">
                {items[i].date.slice(5).replace("-","/")}
              </text>
            ))}

            {/* Hover hit areas */}
            {items.map((_, i) => (
              <rect key={i}
                x={LEFT + i * slotW} y={TOP}
                width={slotW} height={BOT - TOP}
                fill="transparent"
                style={{ cursor: "crosshair" }}
                onMouseEnter={() => setHovered(i)}
              />
            ))}
          </svg>

          {/* ── Tooltip ───────────────────────────────────────────────────── */}
          <AnimatePresence>
            {hovItem && (
              <motion.div
                key={hovered}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="absolute pointer-events-none z-20 w-[168px] rounded-xl border border-[#1a2540] bg-[#0d1628] shadow-xl px-3 py-2.5"
                style={{
                  top: "28px",
                  left: tipRight ? undefined : `calc(${tipLeft}% + 8px)`,
                  right: tipRight ? `calc(${100 - tipLeft}% + 8px)` : undefined,
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-semibold text-[#cbd5e1]">
                    {hovItem.date.split("-").reverse().join("/")}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{
                    backgroundColor: hovItem.confirmed ? "#22c55e22" : "#6366f122",
                    color: hovItem.confirmed ? "#22c55e" : "#818cf8",
                  }}>
                    {hovItem.confirmed ? "✓ Confirmado" : "~ Projetado"}
                  </span>
                </div>
                {hovItem.label && (
                  <p className="text-[9px] text-[#f59e0b] mb-1.5 leading-tight">{hovItem.label}</p>
                )}
                <div className="space-y-1">
                  {hovItem.inflows > 0 && (
                    <div className="flex justify-between text-[10px]">
                      <span className="text-[#475569]">Entradas</span>
                      <span className="font-mono text-[#22c55e]">+{formatCurrency(hovItem.inflows)}</span>
                    </div>
                  )}
                  {hovItem.outflows > 0 && (
                    <div className="flex justify-between text-[10px]">
                      <span className="text-[#475569]">Saídas</span>
                      <span className="font-mono text-[#f43f5e]">−{formatCurrency(hovItem.outflows)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[10px] pt-1 mt-1 border-t border-[#1a2540]">
                    <span className="text-[#475569]">Saldo</span>
                    <span className="font-mono font-semibold text-[#6366f1]">{formatCurrency(hovItem.balance)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Legend ──────────────────────────────────────────────────────── */}
        <div className="flex items-center flex-wrap gap-4 mt-3">
          {[
            { color:"#22c55e", label:"Entradas"  },
            { color:"#f43f5e", label:"Saídas"    },
            { color:"#6366f1", label:"Saldo"     },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color + "99" }} />
              <span className="text-[10px] text-[#475569]">{label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-2.5 rounded-sm" style={{ backgroundColor: "#6366f111", border: "1px dashed #6366f166" }} />
            <span className="text-[10px] text-[#475569]">Projetado</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <div className="w-3 h-px" style={{ borderTop: "1px dashed #6366f199" }} />
            <span className="text-[10px] text-[#475569]">Hoje</span>
          </div>
        </div>
      </div>
    </div>
  );
}
