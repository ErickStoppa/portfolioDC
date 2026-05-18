"use client";

import type { Transaction } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";

interface Props { transactions: Transaction[] }

const TODAY = "2026-05-17";

function daysDiff(dueDate: string): number {
  return Math.floor(
    (new Date(TODAY).getTime() - new Date(dueDate).getTime()) / 86_400_000
  );
}

const BUCKETS = [
  { label: "A vencer",       color: "#38bdf8", test: (d: number, s: string) => d <= 0  && s === "pendente" },
  { label: "0–30 dias",      color: "#f59e0b", test: (d: number, s: string) => d >= 1  && d <= 30  && s === "vencido" },
  { label: "31–60 dias",     color: "#f97316", test: (d: number, s: string) => d >= 31 && d <= 60  && s === "vencido" },
  { label: "61–90 dias",     color: "#ef4444", test: (d: number, s: string) => d >= 61 && d <= 90  && s === "vencido" },
  { label: "+90 dias",       color: "#9f1239", test: (d: number, s: string) => d > 90              && s === "vencido" },
] as const;

export default function AgingPanel({ transactions }: Props) {
  const buckets = BUCKETS.map(b => {
    const matched = transactions.filter(t => b.test(daysDiff(t.dueDate), t.status));
    return {
      ...b,
      count:  matched.length,
      amount: matched.reduce((s, t) => s + t.amount, 0),
    };
  });

  const total       = buckets.reduce((s, b) => s + b.amount, 0);
  const totalCount  = buckets.reduce((s, b) => s + b.count,  0);

  return (
    <div className="orion-card overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b border-[#1a2540]">
        <h3 className="text-sm font-semibold text-[#cbd5e1]">Aging de Recebíveis</h3>
        <p className="text-[10px] mt-0.5 text-[#475569]">
          {totalCount} títulos · {formatCurrency(total)}
        </p>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left" style={{ minWidth: 280 }}>
          <thead>
            <tr className="border-b border-[#1a2540]">
              <th className="px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#475569] font-medium">Faixa</th>
              <th className="px-3 py-2.5 text-[10px] uppercase tracking-wider text-[#475569] font-medium text-right">Qtd</th>
              <th className="px-3 py-2.5 text-[10px] uppercase tracking-wider text-[#475569] font-medium text-right">Valor</th>
              <th className="px-3 py-2.5 text-[10px] uppercase tracking-wider text-[#475569] font-medium text-right">%</th>
              <th className="px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#475569] font-medium w-24">Distribuição</th>
            </tr>
          </thead>
          <tbody>
            {buckets.map(b => {
              const pct = total > 0 ? (b.amount / total) * 100 : 0;
              const hasData = b.count > 0;
              return (
                <tr key={b.label} className="border-b border-[#1a2540] last:border-b-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: b.color }} />
                      <span className="text-[11px] text-[#94a3b8]">{b.label}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-[11px]" style={{ color: hasData ? "#cbd5e1" : "#334155" }}>
                    {hasData ? b.count : "—"}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-[11px]" style={{ color: hasData ? "#cbd5e1" : "#334155" }}>
                    {hasData ? formatCurrency(b.amount) : "—"}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-[10px]" style={{ color: hasData ? b.color : "#334155" }}>
                    {hasData ? `${pct.toFixed(1)}%` : "—"}
                  </td>
                  <td className="px-4 py-2.5">
                    {hasData ? (
                      <div className="h-1.5 rounded-full overflow-hidden bg-[#1a2540]">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: b.color }}
                        />
                      </div>
                    ) : (
                      <div className="h-1.5 rounded-full bg-[#1a2540]" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr style={{ backgroundColor: "#0d1628" }}>
              <td className="px-4 py-2.5 text-xs font-semibold text-[#cbd5e1]" colSpan={1}>Total</td>
              <td className="px-3 py-2.5 text-right font-mono font-semibold text-xs text-[#cbd5e1]">{totalCount}</td>
              <td className="px-3 py-2.5 text-right font-mono font-semibold text-xs text-[#cbd5e1]">{formatCurrency(total)}</td>
              <td className="px-3 py-2.5 text-right font-mono text-[10px] text-[#475569]">100%</td>
              <td className="px-4 py-2.5">
                <div className="h-1.5 rounded-full overflow-hidden bg-[#1a2540]">
                  <div className="h-full rounded-full bg-[#38bdf8]" style={{ width: "100%" }} />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
