"use client";

import { Phone, Users, FileText, CheckCircle, Mail, AlertTriangle } from "lucide-react";
import type { Activity } from "@/data/crm";
import { ACTIVITY_CONFIG } from "../types/crm.types";

const ICON_MAP = { Phone, Users, FileText, CheckCircle, Mail, AlertTriangle } as const;

interface ActivityFeedProps {
  activities: Activity[];
  onViewAll: () => void;
}

export function ActivityFeed({ activities, onViewAll }: ActivityFeedProps) {
  const visible = activities.slice(0, 8);

  return (
    <div className="bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(255,255,255,0.06)]">
        <h3 className="text-sm font-semibold text-[#f1f5f9]">Feed de Atividades</h3>
        <span className="text-[11px] text-[#475569]">Hoje</span>
      </div>
      <div className="divide-y divide-[rgba(255,255,255,0.04)]">
        {visible.map(act => {
          const cfg = ACTIVITY_CONFIG[act.type];
          const IconComp = ICON_MAP[cfg.icon as keyof typeof ICON_MAP];
          const isAlert = act.type === "alerta";
          const isClose = act.type === "fechamento";
          return (
            <div
              key={act.id}
              className={`flex items-start gap-3 px-5 py-3 hover:bg-[rgba(255,255,255,0.02)] transition-colors ${isAlert ? "border-l-2 border-[#f43f5e] bg-[rgba(244,63,94,0.03)]" : ""} ${isClose ? "border-l-2 border-[#10b981] bg-[rgba(16,185,129,0.03)]" : ""}`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: cfg.color + "18" }}
              >
                {IconComp && <IconComp className="w-3.5 h-3.5" style={{ color: cfg.color }} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#f1f5f9] leading-snug line-clamp-2">
                  <span className="font-semibold">{act.actor}</span>{" "}{act.text}
                </p>
                <p className="text-[10px] text-[#3b82f6] mt-0.5">{act.relatedTo}</p>
              </div>
              <span className="text-[10px] text-[#475569] shrink-0 mt-0.5">{act.time}</span>
            </div>
          );
        })}
      </div>
      <div className="px-5 py-3 border-t border-[rgba(255,255,255,0.06)]">
        <button
          onClick={onViewAll}
          className="text-xs text-[#3b82f6] hover:underline"
        >
          Ver histórico completo →
        </button>
      </div>
    </div>
  );
}
