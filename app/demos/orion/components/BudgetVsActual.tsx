"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { BudgetLine } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import { DEPT_CONFIG } from "../types/orion.types";

interface Props { budgetLines: BudgetLine[] }

// Split: first 8 are revenues, rest are expenses (matches data ordering)
function splitLines(lines: BudgetLine[]) {
  const revenues = lines.filter((_, i) => i < 8);
  const expenses = lines.filter((_, i) => i >= 8);
  return { revenues, expenses };
}

function Section({
  items, title, color, defaultOpen,
}: {
  items: BudgetLine[]; title: string; color: string; defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const maxAbs = Math.max(...items.map(b => Math.abs(b.budgeted)), 1);
  const totalBudgeted = items.reduce((s, b) => s + Math.abs(b.budgeted), 0);
  const totalActual   = items.reduce((s, b) => s + Math.abs(b.actual),   0);
  const totalVariance = items.reduce((s, b) => s + b.variance, 0);
  const overBudget    = title === "Despesas" ? totalActual > totalBudgeted : totalActual < totalBudgeted;

  return (
    <div>
      {/* Section header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-3 border-b border-[#1a2540] hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2">
          {open ? <ChevronDown size={12} className="text-[#475569]" /> : <ChevronRight size={12} className="text-[#475569]" />}
          <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color }}>
            {title}
          </span>
        </div>
        <div className="flex items-center gap-5 text-[10px] font-mono">
          <span className="text-[#475569]">Orçado: {formatCurrency(totalBudgeted)}</span>
          <span style={{ color }}>Real: {formatCurrency(totalActual)}</span>
          <span style={{ color: overBudget ? "#f43f5e" : "#22c55e" }}>
            {totalVariance >= 0 ? "+" : ""}{(((totalActual - totalBudgeted) / totalBudgeted) * 100).toFixed(1)}%
          </span>
        </div>
      </button>

      {open && items.map(b => {
        const budgetPct = (Math.abs(b.budgeted) / maxAbs) * 100;
        const actualPct = Math.min((Math.abs(b.actual) / Math.abs(b.budgeted)) * 100, 130);
        const isOver    = Math.abs(b.actual) > Math.abs(b.budgeted);
        const varColor  = isOver
          ? (title === "Receitas" ? "#22c55e" : "#f43f5e")
          : (title === "Receitas" ? "#f43f5e" : "#22c55e");
        const deptCfg   = DEPT_CONFIG[b.dept];

        return (
          <div key={b.category} className="px-5 py-3 border-b border-[#1a2540] last:border-b-0">
            <div className="flex items-center justify-between mb-1.5 gap-2 flex-wrap">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${deptCfg.bg} ${deptCfg.color}`}>
                  {deptCfg.label}
                </span>
                <span className="text-[11px] text-[#94a3b8] truncate">{b.category}</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] shrink-0">
                <span className="font-mono text-[#475569]">{formatCurrency(Math.abs(b.budgeted))}</span>
                <span className="font-mono font-semibold" style={{ color }}>{formatCurrency(Math.abs(b.actual))}</span>
                <span className="font-mono font-bold w-14 text-right" style={{ color: varColor }}>
                  {b.variance >= 0 ? "+" : ""}{b.variancePct.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Horizontal dual bar */}
            <div className="space-y-0.5">
              {/* Budget bar (reference) */}
              <div className="relative h-1.5 rounded-full bg-[#1a2540]" style={{ width: "100%" }}>
                <div className="absolute top-0 left-0 h-full rounded-full bg-[#2a3a5a]"
                  style={{ width: `${budgetPct}%` }} />
                {/* Budget marker at 100% of its own space */}
                <div className="absolute top-0 h-full w-px bg-white/20"
                  style={{ left: `${budgetPct}%` }} />
              </div>
              {/* Actual bar */}
              <div className="relative h-1.5 rounded-full bg-[#1a2540]" style={{ width: "100%" }}>
                <div
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(actualPct * budgetPct / 100, 100)}%`,
                    backgroundColor: isOver ? (title === "Receitas" ? "#22c55ecc" : "#f43f5ecc") : color + "cc",
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function BudgetVsActual({ budgetLines }: Props) {
  const { revenues, expenses } = splitLines(budgetLines);

  const totalBudRev  = revenues.reduce((s, b) => s + Math.abs(b.budgeted), 0);
  const totalActRev  = revenues.reduce((s, b) => s + Math.abs(b.actual),   0);
  const totalBudExp  = expenses.reduce((s, b) => s + Math.abs(b.budgeted), 0);
  const totalActExp  = expenses.reduce((s, b) => s + Math.abs(b.actual),   0);
  const netVariance  = totalActRev - totalActExp - (totalBudRev - totalBudExp);
  const isPositive   = netVariance >= 0;

  return (
    <div className="orion-card overflow-hidden">
      {/* Header + summary */}
      <div className="px-5 py-4 border-b border-[#1a2540]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-[#cbd5e1]">Orçamento vs. Realizado — Mai/2026</h3>
            <p className="text-[10px] mt-0.5 text-[#475569]">Receitas e Despesas por categoria</p>
          </div>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
            style={{
              backgroundColor: isPositive ? "#22c55e18" : "#f43f5e18",
              color: isPositive ? "#22c55e" : "#f43f5e",
            }}
          >
            {isPositive ? "▲" : "▼"} {isPositive ? "Acima" : "Abaixo"} do plano
          </span>
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-3 gap-3 mt-3">
          {[
            { label: "Orçado",    val: totalBudRev - totalBudExp, color: "#475569" },
            { label: "Realizado", val: totalActRev - totalActExp, color: "#cbd5e1" },
            { label: "Variância", val: netVariance,               color: isPositive ? "#22c55e" : "#f43f5e" },
          ].map(({ label, val, color }) => (
            <div key={label}>
              <p className="text-[9px] uppercase tracking-wider text-[#334155] mb-0.5">{label}</p>
              <p className="text-xs font-bold font-mono tabular-nums" style={{ color }}>{formatCurrency(val)}</p>
            </div>
          ))}
        </div>
      </div>

      <Section items={revenues} title="Receitas" color="#22c55e" defaultOpen />
      <Section items={expenses} title="Despesas" color="#f43f5e" defaultOpen />
    </div>
  );
}
