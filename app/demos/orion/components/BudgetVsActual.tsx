"use client";

import { budgetLines } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import { DEPT_CONFIG } from "../types/orion.types";

export default function BudgetVsActual() {
  const revenues = budgetLines.filter((_, i) => i < 8);
  const expenses = budgetLines.filter((_, i) => i >= 8);

  const maxBudgeted = Math.max(...budgetLines.map(b => Math.abs(b.budgeted)));

  function Section({ items, title, color }: { items: typeof budgetLines; title: string; color: string }) {
    return (
      <div>
        <p className="text-[10px] uppercase tracking-wider text-[#475569] px-5 py-2 border-b border-[#1a2540]">
          {title}
        </p>
        {items.map(b => {
          const budgetPct = (Math.abs(b.budgeted) / maxBudgeted) * 100;
          const actualPct = (Math.abs(b.actual) / maxBudgeted) * 100;
          const ahead = b.variance > 0;
          const deptCfg = DEPT_CONFIG[b.dept];
          return (
            <div key={b.category} className="px-5 py-3 border-b border-[#1a2540] last:border-b-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${deptCfg.bg} ${deptCfg.color}`}>
                    {deptCfg.label}
                  </span>
                  <span className="text-[11px] text-[#94a3b8]">{b.category}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="font-mono text-[#475569]">{formatCurrency(b.budgeted)}</span>
                  <span className="font-mono font-semibold" style={{ color }}>
                    {formatCurrency(b.actual)}
                  </span>
                  <span
                    className="font-mono font-bold w-14 text-right"
                    style={{ color: ahead ? "#22c55e" : "#f43f5e" }}
                  >
                    {ahead ? "+" : ""}{b.variancePct.toFixed(1)}%
                  </span>
                </div>
              </div>
              {/* Dual bar */}
              <div className="space-y-0.5">
                <div className="h-1 rounded-full overflow-hidden bg-[#1a2540]">
                  <div className="h-full rounded-full bg-[#334155]" style={{ width: `${budgetPct}%` }} />
                </div>
                <div className="h-1 rounded-full overflow-hidden bg-[#1a2540]">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${actualPct}%`, backgroundColor: color + "cc" }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const totalBudRev = revenues.reduce((s, b) => s + b.budgeted, 0);
  const totalActRev = revenues.reduce((s, b) => s + b.actual, 0);
  const totalBudExp = expenses.reduce((s, b) => s + b.budgeted, 0);
  const totalActExp = expenses.reduce((s, b) => s + b.actual, 0);

  return (
    <div className="orion-card overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1a2540]">
        <h3 className="text-sm font-semibold text-[#cbd5e1]">Realizado vs. Budget — Mai/2026</h3>
        <p className="text-[10px] mt-0.5 text-[#475569]">Receitas e Despesas por categoria</p>
      </div>

      <Section items={revenues} title="Receitas" color="#22c55e" />
      <Section items={expenses} title="Despesas" color="#f43f5e" />

      {/* Summary footer */}
      <div className="px-5 py-4 border-t border-[#1a2540] grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[#475569] mb-1">Receita Total</p>
          <p className="text-sm font-bold font-mono text-[#22c55e]">{formatCurrency(totalActRev)}</p>
          <p className="text-[10px] text-[#475569] font-mono mt-0.5">
            vs. orçado {formatCurrency(totalBudRev)} ·{" "}
            <span style={{ color: totalActRev >= totalBudRev ? "#22c55e" : "#f43f5e" }}>
              {totalActRev >= totalBudRev ? "+" : ""}{(((totalActRev - totalBudRev) / totalBudRev) * 100).toFixed(1)}%
            </span>
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[#475569] mb-1">Despesa Total</p>
          <p className="text-sm font-bold font-mono text-[#f43f5e]">{formatCurrency(totalActExp)}</p>
          <p className="text-[10px] text-[#475569] font-mono mt-0.5">
            vs. orçado {formatCurrency(totalBudExp)} ·{" "}
            <span style={{ color: totalActExp <= totalBudExp ? "#22c55e" : "#f43f5e" }}>
              {totalActExp >= totalBudExp ? "+" : ""}{(((totalActExp - totalBudExp) / totalBudExp) * 100).toFixed(1)}%
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
