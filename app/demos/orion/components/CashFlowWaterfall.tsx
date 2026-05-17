"use client";

import { cashFlowItems } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";

const BAR_HEIGHT = 32;
const GAP = 12;
const LABEL_W = 200;
const BAR_AREA = 340;
const PADDING = 16;

export default function CashFlowWaterfall() {
  const maxVal = Math.max(...cashFlowItems.map((i) => Math.abs(i.value)));

  // Compute running baseline for waterfall
  let running = 0;
  const bars = cashFlowItems.map((item) => {
    const isEdge = item.type === "start" || item.type === "end";
    const barW = (Math.abs(item.value) / maxVal) * (BAR_AREA - PADDING * 2);
    const color =
      isEdge
        ? "#6366f1"
        : item.type === "in"
        ? "#22c55e"
        : "#f43f5e";
    const offset = isEdge ? 0 : item.type === "in" ? running : running;
    const offsetPx = isEdge ? 0 : (offset / maxVal) * (BAR_AREA - PADDING * 2);

    const result = { item, barW, offsetPx, color, isEdge };
    if (!isEdge) {
      running += item.value;
    }
    return result;
  });

  const svgH = cashFlowItems.length * (BAR_HEIGHT + GAP) + GAP;

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ backgroundColor: "#0a1220", borderColor: "#1a2540" }}
    >
      <div className="px-5 py-4 border-b" style={{ borderColor: "#1a2540" }}>
        <h3 className="text-sm font-semibold" style={{ color: "#cbd5e1" }}>
          Fluxo de Caixa — Mai/2025
        </h3>
        <p className="text-[10px] mt-0.5" style={{ color: "#475569" }}>
          Demonstrativo de entradas e saídas do período
        </p>
      </div>

      <div className="p-5 overflow-x-auto">
        <svg
          width="100%"
          viewBox={`0 0 ${LABEL_W + BAR_AREA} ${svgH}`}
          style={{ minWidth: 480 }}
        >
          {bars.map(({ item, barW, offsetPx, color, isEdge }, i) => {
            const y = GAP + i * (BAR_HEIGHT + GAP);
            return (
              <g key={item.label}>
                {/* Label */}
                <text
                  x={LABEL_W - 8}
                  y={y + BAR_HEIGHT / 2 + 4}
                  textAnchor="end"
                  fill={isEdge ? "#cbd5e1" : "#94a3b8"}
                  fontSize={isEdge ? "11" : "10"}
                  fontWeight={isEdge ? "600" : "400"}
                >
                  {item.label}
                </text>

                {/* Connector line (not for first) */}
                {!isEdge && i > 0 && (
                  <line
                    x1={LABEL_W + offsetPx + (item.type === "out" ? barW : 0)}
                    y1={y - GAP / 2}
                    x2={LABEL_W + offsetPx + (item.type === "out" ? barW : 0)}
                    y2={y}
                    stroke="#1a2540"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Bar */}
                <rect
                  x={LABEL_W + (isEdge ? 0 : offsetPx)}
                  y={y}
                  width={isEdge ? barW : barW}
                  height={BAR_HEIGHT}
                  rx="4"
                  fill={color + (isEdge ? "cc" : "88")}
                  stroke={color}
                  strokeWidth="1"
                />

                {/* Value label */}
                <text
                  x={LABEL_W + (isEdge ? 0 : offsetPx) + barW + 8}
                  y={y + BAR_HEIGHT / 2 + 4}
                  fill={isEdge ? "#cbd5e1" : color}
                  fontSize="10"
                  fontWeight={isEdge ? "600" : "400"}
                  fontFamily="monospace"
                >
                  {item.type === "out" ? "-" : ""}
                  {formatCurrency(Math.abs(item.value))}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t" style={{ borderColor: "#1a2540" }}>
          {[
            { color: "#6366f1", label: "Saldo" },
            { color: "#22c55e", label: "Entrada" },
            { color: "#f43f5e", label: "Saída" },
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
