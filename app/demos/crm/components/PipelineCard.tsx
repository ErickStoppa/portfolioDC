"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Deal } from "@/data/crm";
import { formatBRL } from "@/data/crm";
import { STAGE_CONFIG } from "../types/crm.types";

const PRIORITY_CFG = {
  alta:  { color: "#f43f5e", bg: "rgba(244,63,94,0.1)",  label: "Alta" },
  média: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", label: "Média" },
  baixa: { color: "#94a3b8", bg: "rgba(148,163,184,0.1)", label: "Baixa" },
} as const;

export function PipelineCard({ deal, onSelect }: { deal: Deal; onSelect: (d: Deal) => void }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = STAGE_CONFIG[deal.stage];
  const pri = PRIORITY_CFG[deal.priority];
  const isStale = deal.daysInStage > 14;

  return (
    <div
      onClick={() => setExpanded(e => !e)}
      className="pipeline-card rounded-xl p-4 bg-[#0c1220] border border-[rgba(255,255,255,0.06)] cursor-pointer select-none"
    >
      {/* Title */}
      <p className="text-sm font-medium text-[#f1f5f9] leading-snug line-clamp-1 mb-1">{deal.title}</p>

      {/* Client + priority */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs text-[#64748b] truncate">{deal.clientName}</span>
        <span
          className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0"
          style={{ color: pri.color, backgroundColor: pri.bg }}
        >
          {pri.label}
        </span>
      </div>

      {/* Value + product */}
      <div className="flex items-baseline justify-between gap-2 mb-2">
        <span className="text-sm font-mono font-semibold text-[#f1f5f9]">{formatBRL(deal.value)}</span>
        <span className="text-[10px] text-[#475569] truncate">{deal.product}</span>
      </div>

      {/* Probability gauge + days */}
      <div className="mb-2">
        <div className="h-1 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden mb-1.5">
          <div
            className="h-full rounded-full"
            style={{ width: `${deal.probability}%`, backgroundColor: cfg.color }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-[#475569]">{deal.probability}% prob.</span>
          <span className={`text-[10px] ${isStale ? "text-[#f43f5e] font-semibold" : "text-[#475569]"}`}>
            {isStale ? `⚠ há ${deal.daysInStage} dias` : `há ${deal.daysInStage} dias`}
          </span>
        </div>
      </div>

      {/* Manager */}
      <div className="flex items-center gap-1.5">
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
          style={{ backgroundColor: "#3b82f620", color: "#3b82f6" }}
        >
          {deal.accountManager.split(" ").map(n => n[0]).join("").slice(0, 2)}
        </div>
        <span className="text-[10px] text-[#475569] truncate">{deal.accountManager}</span>
      </div>

      {/* Expanded section */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
              <p className="text-xs text-[#64748b] italic leading-snug mb-3">{deal.notes}</p>
              <div className="flex gap-3" onClick={e => e.stopPropagation()}>
                <button className="text-xs text-[#3b82f6] hover:underline">Avançar estágio →</button>
                <button className="text-xs text-[#475569] hover:text-[#94a3b8]">Ver cliente</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
