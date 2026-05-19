"use client";

import { TrendingUp, TrendingDown, X } from "lucide-react";
import type { TeamMember } from "@/data/crm";
import { teamMembers, deals, formatBRL } from "@/data/crm";
import { STAGE_CONFIG } from "../types/crm.types";
import { AnimatePresence, motion } from "framer-motion";

const MEDALS = ["🥇", "🥈", "🥉"];
const ARC_R = 40;
const ARC_C = Math.PI * ARC_R;

function ConversionGauge({ rate, color }: { rate: number; color: string }) {
  const fill = (rate / 100) * ARC_C;
  const gaugeColor = rate >= 35 ? "#10b981" : rate >= 25 ? "#f59e0b" : "#f43f5e";
  return (
    <svg viewBox="0 0 100 58" className="w-24 h-14">
      <path d="M 10,50 A 40,40 0 0 1 90,50" fill="none" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
      <path
        d="M 10,50 A 40,40 0 0 1 90,50"
        fill="none"
        stroke={gaugeColor}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${fill.toFixed(1)} ${ARC_C.toFixed(1)}`}
      />
      <text x="50" y="46" textAnchor="middle" fill="#f1f5f9" fontSize="14" fontWeight="700">{rate}%</text>
    </svg>
  );
}

interface TeamTabProps {
  selectedMember: TeamMember | null;
  onSelectMember: (m: TeamMember | null) => void;
}

export function TeamTab({ selectedMember, onSelectMember }: TeamTabProps) {
  const sorted = [...teamMembers].sort((a, b) => a.ranking - b.ranking);
  const top3 = sorted.slice(0, 3);

  return (
    <div className="p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#f1f5f9]">Equipe Comercial</h2>
        <p className="text-xs text-[#64748b] mt-0.5">5 gerentes de conta | ciclo Mai/25</p>
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {top3.map((m, i) => {
          const pct = (m.revenueActual / m.revenueTarget) * 100;
          return (
            <div
              key={m.id}
              className={`p-4 rounded-xl border text-center ${
                i === 0
                  ? "bg-[rgba(59,130,246,0.06)] border-[rgba(59,130,246,0.3)] shadow-[0_0_20px_rgba(59,130,246,0.08)]"
                  : "bg-[#0c1220] border-[rgba(255,255,255,0.06)]"
              }`}
            >
              <div className="text-2xl mb-2">{MEDALS[i]}</div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2"
                style={{ backgroundColor: m.avatarColor + "28", color: m.avatarColor }}
              >
                {m.initials}
              </div>
              <p className="text-xs font-semibold text-[#f1f5f9] truncate">{m.name.split(" ")[0]}</p>
              <p className="text-lg font-bold text-[#f1f5f9] mt-1">{formatBRL(m.revenueActual)}</p>
              <p className="text-[10px] text-[#475569]">{pct.toFixed(0)}% da meta</p>
            </div>
          );
        })}
      </div>

      <div className="flex gap-6">
        {/* Member cards grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
          {sorted.map(m => {
            const pct = (m.revenueActual / m.revenueTarget) * 100;
            const barColor = pct >= 100 ? "#10b981" : pct >= 80 ? "#f59e0b" : "#f43f5e";
            const isSelected = selectedMember?.id === m.id;
            return (
              <div
                key={m.id}
                onClick={() => onSelectMember(isSelected ? null : m)}
                className={`p-5 rounded-xl border cursor-pointer transition-colors ${
                  isSelected
                    ? "border-[#3b82f6] bg-[#0c1220]"
                    : "border-[rgba(255,255,255,0.06)] bg-[#0c1220] hover:bg-[#111827]"
                }`}
              >
                {/* Avatar + name + trend */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                    style={{ backgroundColor: m.avatarColor + "28", color: m.avatarColor }}
                  >
                    {m.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-[#f1f5f9] truncate">{m.name}</p>
                      {m.trendUp
                        ? <TrendingUp className="w-3 h-3 text-[#10b981] shrink-0" />
                        : <TrendingDown className="w-3 h-3 text-[#f43f5e] shrink-0" />}
                    </div>
                    <p className="text-[10px] text-[#475569] truncate">{m.role}</p>
                  </div>
                </div>

                {/* Revenue progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-[10px] mb-1.5">
                    <span className="text-[#475569]">{formatBRL(m.revenueActual)} de {formatBRL(m.revenueTarget)}</span>
                    <span className="font-semibold" style={{ color: barColor }}>{pct.toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#1e293b] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: barColor }}
                    />
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Ganhos",    value: m.dealsWon },
                    { label: "Em Aberto", value: m.dealsOpen },
                    { label: "Clientes",  value: m.clientCount },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center">
                      <p className="text-xs text-[#94a3b8] font-semibold">{value}</p>
                      <p className="text-[10px] text-[#475569]">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Expanded: conversion gauge */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)] flex flex-col items-center">
                        <p className="text-[10px] text-[#475569] uppercase tracking-wider mb-2">Taxa de Conversão</p>
                        <ConversionGauge rate={m.conversionRate} color={m.avatarColor} />
                        {m.ranking === 1 && (
                          <p className="text-[10px] text-[#f59e0b] mt-2 font-semibold">★ Top performer do período</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Lateral panel */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block shrink-0 overflow-hidden"
            >
              <div className="w-[280px] bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold text-[#f1f5f9]">Pipeline de {selectedMember.name.split(" ")[0]}</p>
                    <p className="text-[10px] text-[#475569]">
                      {deals.filter(d => d.accountManager === selectedMember.name && !["fechado-ganho","fechado-perdido"].includes(d.stage)).length} em aberto
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectMember(null)}
                    className="w-6 h-6 flex items-center justify-center text-[#475569] hover:text-[#94a3b8]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {deals
                    .filter(d => d.accountManager === selectedMember.name && !["fechado-ganho","fechado-perdido"].includes(d.stage))
                    .map(d => (
                      <div key={d.id} className="p-3 bg-[#111827] rounded-lg border border-[rgba(255,255,255,0.04)]">
                        <p className="text-[11px] font-medium text-[#f1f5f9] line-clamp-1">{d.title}</p>
                        <p className="text-[10px] text-[#475569] mt-0.5">{d.clientName}</p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-[10px] font-mono text-[#94a3b8]">{formatBRL(d.value)}</span>
                          <span
                            className="text-[10px] font-semibold"
                            style={{ color: STAGE_CONFIG[d.stage].color }}
                          >
                            {STAGE_CONFIG[d.stage].label}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
                {(() => {
                  const memberDeals = deals.filter(d => d.accountManager === selectedMember.name && !["fechado-ganho","fechado-perdido"].includes(d.stage));
                  const totalPipeline = memberDeals.reduce((s, d) => s + d.value, 0);
                  return (
                    <p className="text-[10px] text-[#475569] mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                      Pipeline: <span className="text-[#f1f5f9] font-semibold">{formatBRL(totalPipeline)}</span>
                    </p>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
