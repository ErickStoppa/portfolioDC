"use client";

import { useState } from "react";
import { monthlyData, productLines } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";

const W = 600;
const H = 200;
const PAD = { t: 20, r: 20, b: 40, l: 20 };
const CW = W - PAD.l - PAD.r;
const CH = H - PAD.t - PAD.b;
const N = monthlyData.length;

export default function RevenueStackedArea() {
  const [hovered, setHovered] = useState<number | null>(null);

  const maxGross = Math.max(...monthlyData.map((d) => d.gross));

  // Build stacked paths per product line
  // Each product line occupies a proportional slice of gross revenue per month
  const lineStacks = monthlyData.map((md, mi) => {
    const totLineRev = productLines.reduce((s, pl) => s + pl.revenue[mi], 0);
    let cumulY = 0;
    return productLines.map((pl) => {
      const frac = pl.revenue[mi] / totLineRev;
      const segH = (md.gross / maxGross) * CH * frac;
      const result = { frac, segH, cumY: cumulY, rev: pl.revenue[mi] };
      cumulY += segH;
      return result;
    });
  });

  // Build SVG polygon for each product line
  const buildPath = (lineIdx: number) => {
    const topPts = monthlyData.map((_, mi) => {
      const x = PAD.l + (mi / (N - 1)) * CW;
      const stackEntry = lineStacks[mi][lineIdx];
      const bottomY = PAD.t + CH - stackEntry.cumY;
      const topY = bottomY - stackEntry.segH;
      return { x, topY, bottomY };
    });
    const top = topPts.map((p) => `${p.x.toFixed(1)},${p.topY.toFixed(1)}`).join(" ");
    const bottom = [...topPts]
      .reverse()
      .map((p) => `${p.x.toFixed(1)},${p.bottomY.toFixed(1)}`)
      .join(" ");
    return `${top} ${bottom}`;
  };

  const hp = hovered !== null ? monthlyData[hovered] : null;
  const hpX = hovered !== null ? PAD.l + (hovered / (N - 1)) * CW : null;

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ backgroundColor: "#0a1220", borderColor: "#1a2540" }}
    >
      <div className="px-5 py-4 border-b" style={{ borderColor: "#1a2540" }}>
        <h3 className="text-sm font-semibold" style={{ color: "#cbd5e1" }}>
          Receita por Linha de Produto
        </h3>
        <p className="text-[10px] mt-0.5" style={{ color: "#475569" }}>
          Jun/24 – Mai/25 · Área empilhada
        </p>
      </div>

      <div className="p-5">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "crosshair" }}
        >
          {/* Stacked areas */}
          {productLines.map((pl, li) => (
            <polygon
              key={pl.name}
              points={buildPath(li)}
              fill={pl.color}
              fillOpacity="0.7"
            />
          ))}

          {/* Month hover zones */}
          {monthlyData.map((_, mi) => (
            <rect
              key={mi}
              x={PAD.l + (mi / (N - 1)) * CW - CW / (N - 1) / 2}
              y={PAD.t}
              width={CW / (N - 1)}
              height={CH}
              fill="transparent"
              onMouseEnter={() => setHovered(mi)}
            />
          ))}

          {/* X-axis labels */}
          {monthlyData.map((md, mi) => (
            <text
              key={mi}
              x={PAD.l + (mi / (N - 1)) * CW}
              y={H - 10}
              textAnchor="middle"
              fill="#334155"
              fontSize="8"
            >
              {md.month.split("/")[0]}
            </text>
          ))}

          {/* Hover line */}
          {hpX !== null && (
            <line
              x1={hpX} y1={PAD.t} x2={hpX} y2={PAD.t + CH}
              stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2"
            />
          )}

          {/* Hover tooltip */}
          {hp && hpX !== null && (
            <g>
              <rect
                x={hpX > W / 2 ? hpX - 114 : hpX + 6}
                y={PAD.t + 4}
                width={110} height={52} rx={4}
                fill="#0f1e35" stroke="#1a2540" strokeWidth="1"
              />
              <text
                x={hpX > W / 2 ? hpX - 59 : hpX + 61}
                y={PAD.t + 18}
                textAnchor="middle" fill="#cbd5e1"
                fontSize="9" fontWeight="600"
              >
                {hp.month}
              </text>
              <text
                x={hpX > W / 2 ? hpX - 59 : hpX + 61}
                y={PAD.t + 31}
                textAnchor="middle" fill="#94a3b8"
                fontSize="8" fontFamily="monospace"
              >
                {(hp.gross / 1_000_000).toFixed(2)}M bruto
              </text>
              <text
                x={hpX > W / 2 ? hpX - 59 : hpX + 61}
                y={PAD.t + 44}
                textAnchor="middle" fill="#22c55e"
                fontSize="8" fontFamily="monospace"
              >
                EBITDA {(hp.ebitda / 1_000_000).toFixed(2)}M
              </text>
            </g>
          )}
        </svg>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-2">
          {productLines.map((pl) => (
            <div key={pl.name} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: pl.color }} />
              <span className="text-[10px]" style={{ color: "#475569" }}>{pl.name}</span>
            </div>
          ))}
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t" style={{ borderColor: "#1a2540" }}>
          {productLines.map((pl) => {
            const totalRev = pl.revenue.reduce((s, v) => s + v, 0);
            const lastMth = pl.revenue[pl.revenue.length - 1];
            return (
              <div key={pl.name}>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pl.color }} />
                  <p className="text-[10px]" style={{ color: "#475569" }}>{pl.name}</p>
                </div>
                <p className="text-sm font-bold font-mono" style={{ color: pl.color }}>
                  {formatCurrency(lastMth)}
                </p>
                <p className="text-[10px] font-mono mt-0.5" style={{ color: "#475569" }}>
                  acum. {(totalRev / 1_000_000).toFixed(1)}M
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
