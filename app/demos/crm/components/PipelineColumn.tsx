import { Plus } from "lucide-react";
import type { Deal } from "@/data/crm";
import { formatBRL } from "@/data/crm";
import type { DealStage } from "../types/crm.types";
import { STAGE_CONFIG } from "../types/crm.types";
import { PipelineCard } from "./PipelineCard";

export function PipelineColumn({
  stage, deals, onSelectDeal,
}: { stage: DealStage; deals: Deal[]; onSelectDeal: (d: Deal) => void }) {
  const cfg = STAGE_CONFIG[stage];
  const total = deals.reduce((s, d) => s + d.value, 0);

  return (
    <div className="w-64 flex flex-col">
      {/* Column header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cfg.color }} />
          <span className="text-xs font-semibold text-[#f1f5f9]">{cfg.label}</span>
          <span
            className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
            style={{ color: cfg.color, backgroundColor: cfg.bg }}
          >
            {deals.length}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-[#64748b]">{formatBRL(total)}</span>
          <button className="w-5 h-5 rounded flex items-center justify-center text-[#334155] hover:text-[#3b82f6] transition-colors">
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-[rgba(255,255,255,0.04)] rounded mb-3 overflow-hidden">
        <div
          className="h-full rounded"
          style={{ width: deals.length > 0 ? "100%" : "0%", backgroundColor: cfg.color, opacity: 0.5 }}
        />
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2 max-h-[calc(100vh-280px)] overflow-y-auto">
        {deals.map(d => (
          <PipelineCard key={d.id} deal={d} onSelect={onSelectDeal} />
        ))}
        {deals.length === 0 && (
          <div className="h-24 border border-dashed border-[rgba(255,255,255,0.06)] rounded-lg flex items-center justify-center">
            <span className="text-xs text-[#334155]">Nenhum negócio</span>
          </div>
        )}
      </div>
    </div>
  );
}
