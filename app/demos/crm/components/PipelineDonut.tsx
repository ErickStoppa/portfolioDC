"use client";

import { useState } from "react";
import type { Deal } from "@/data/crm";
import { formatBRL } from "@/data/crm";
import type { DealStage } from "../types/crm.types";
import { PIPELINE_STAGES, STAGE_CONFIG } from "../types/crm.types";

const R = 15.91549430918954;
const C = 2 * Math.PI * R; // ≈ 100

export function PipelineDonut({ deals }: { deals: Deal[] }) {
  const [hoveredStage, setHoveredStage] = useState<DealStage | null>(null);

  const stageTotals = PIPELINE_STAGES.map(stage => {
    const stageDeals = deals.filter(d => d.stage === stage);
    return {
      stage,
      value: stageDeals.reduce((s, d) => s + d.value, 0),
      count: stageDeals.length,
    };
  }).filter(s => s.value > 0);

  const total = stageTotals.reduce((s, st) => s + st.value, 0);

  let cumPercent = 0;
  const segments = stageTotals.map(({ stage, value }) => {
    const perc = (value / total) * 100;
    const offset = 25 - cumPercent;
    cumPercent += perc;
    return { stage, perc, offset, value };
  });

  const hovered = hoveredStage ? stageTotals.find(s => s.stage === hoveredStage) : null;

  return (
    <div className="bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#f1f5f9]">Pipeline por Estágio</h3>
        <span className="text-xs text-[#475569]">{formatBRL(total)}</span>
      </div>

      <svg viewBox="0 0 42 42" className="w-36 h-36 mx-auto block">
        <circle cx="21" cy="21" r={R} fill="none" stroke="#1e293b" strokeWidth="4" />
        {segments.map(({ stage, perc, offset }) => (
          <circle
            key={stage}
            cx="21" cy="21" r={R}
            fill="none"
            stroke={STAGE_CONFIG[stage].color}
            strokeWidth="4"
            strokeDasharray={`${perc} ${100 - perc}`}
            strokeDashoffset={offset}
            strokeLinecap="butt"
            style={{ opacity: hoveredStage && hoveredStage !== stage ? 0.3 : 1, transition: "opacity 0.15s" }}
            onMouseEnter={() => setHoveredStage(stage)}
            onMouseLeave={() => setHoveredStage(null)}
            className="cursor-pointer"
          />
        ))}
        <text x="21" y="19.5" textAnchor="middle" fill="#f1f5f9" fontSize="4" fontWeight="700">
          {hovered ? STAGE_CONFIG[hovered.stage].label : formatBRL(total)}
        </text>
        <text x="21" y="23.5" textAnchor="middle" fill="#475569" fontSize="3">
          {hovered ? `${hovered.count} deal${hovered.count !== 1 ? "s" : ""}` : "pipeline"}
        </text>
      </svg>

      <div className="flex flex-col gap-2 mt-4">
        {PIPELINE_STAGES.map(stage => {
          const st = stageTotals.find(s => s.stage === stage);
          const cfg = STAGE_CONFIG[stage];
          return (
            <div
              key={stage}
              className="flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setHoveredStage(stage)}
              onMouseLeave={() => setHoveredStage(null)}
            >
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: cfg.color }} />
              <span className="text-xs text-[#64748b] flex-1">{cfg.label}</span>
              {st && (
                <>
                  <span className="text-[10px] text-[#475569]">{st.count}</span>
                  <span className="text-[10px] text-[#64748b]">{formatBRL(st.value)}</span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
