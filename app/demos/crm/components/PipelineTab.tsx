"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Deal } from "@/data/crm";
import { formatBRL, accountManagers } from "@/data/crm";
import type { DealStage } from "../types/crm.types";
import { PIPELINE_STAGES, STAGE_CONFIG } from "../types/crm.types";
import { PipelineColumn } from "./PipelineColumn";

interface PipelineTabProps {
  deals: Deal[];
  managerFilter: string;
  onManagerFilter: (m: string) => void;
  onSelectDeal: (d: Deal) => void;
}

export function PipelineTab({ deals, managerFilter, onManagerFilter, onSelectDeal }: PipelineTabProps) {
  const [showLost, setShowLost] = useState(false);

  const openDeals = deals.filter(d => !["fechado-ganho", "fechado-perdido"].includes(d.stage));
  const closedWon = deals.filter(d => d.stage === "fechado-ganho");
  const totalAberto = openDeals.reduce((s, d) => s + d.value, 0);

  const visibleStages: DealStage[] = showLost
    ? [...PIPELINE_STAGES, "fechado-perdido"]
    : [...PIPELINE_STAGES];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold text-[#f1f5f9]">Pipeline de Negócios</h2>
          <p className="text-xs text-[#64748b] mt-0.5">
            {openDeals.length} negócios{" "}
            | {formatBRL(totalAberto)} em aberto{" "}
            | {closedWon.length} fechados este mês
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={managerFilter}
              onChange={e => onManagerFilter(e.target.value)}
              className="h-8 pl-3 pr-7 bg-[#0c1220] border border-[rgba(255,255,255,0.08)] rounded-lg text-xs text-[#94a3b8] focus:outline-none cursor-pointer appearance-none"
            >
              <option value="Todos">Todos os gerentes</option>
              {accountManagers.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#475569] pointer-events-none" />
          </div>
          <button
            onClick={() => setShowLost(s => !s)}
            className={`h-8 px-3 rounded-lg text-xs font-medium transition-colors ${
              showLost
                ? "bg-[rgba(244,63,94,0.12)] text-[#f43f5e] border border-[rgba(244,63,94,0.3)]"
                : "bg-[rgba(255,255,255,0.04)] text-[#475569] hover:text-[#94a3b8] border border-transparent"
            }`}
          >
            {showLost ? "Ocultar Perdidos" : "Ver Perdidos"}
          </button>
        </div>
      </div>

      {/* Kanban board */}
      <div className="overflow-x-auto pb-4 mt-6">
        <div className="flex gap-4 min-w-max">
          {visibleStages.map(stage => (
            <PipelineColumn
              key={stage}
              stage={stage}
              deals={deals.filter(d => d.stage === stage)}
              onSelectDeal={onSelectDeal}
            />
          ))}
        </div>
      </div>

      {/* Summary bar */}
      <div className="border-t border-[rgba(255,255,255,0.06)] mt-4 pt-4 flex items-center flex-wrap gap-y-3">
        {visibleStages.map((stage, i) => {
          const stageDeals = deals.filter(d => d.stage === stage);
          const stageTotal = stageDeals.reduce((s, d) => s + d.value, 0);
          const cfg = STAGE_CONFIG[stage];
          return (
            <div key={stage} className="flex items-center">
              {i > 0 && <div className="w-px h-8 bg-[rgba(255,255,255,0.06)] mx-5" />}
              <div>
                <p className="text-[10px] text-[#475569] uppercase tracking-wider mb-0.5">{cfg.label}</p>
                <p className="text-xs font-semibold font-mono" style={{ color: cfg.color }}>{formatBRL(stageTotal)}</p>
                <p className="text-[10px] text-[#475569]">{stageDeals.length} neg.</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
