"use client";

import { useState } from "react";
import { transactions } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";

const TODAY = "2026-05-17";

function daysDiff(dueDate: string): number {
  const due  = new Date(dueDate).getTime();
  const now  = new Date(TODAY).getTime();
  return Math.floor((now - due) / 86_400_000);
}

interface AgingBucket {
  label: string;
  color: string;
  amount: number;
  count: number;
}

function computeBuckets(type: "receita" | "despesa"): AgingBucket[] {
  const txs = transactions.filter(
    t => t.type === type && (t.status === "vencido" || t.status === "pendente")
  );

  const buckets: AgingBucket[] = [
    { label: "A vencer",   color: "#22c55e", amount: 0, count: 0 },
    { label: "1–30 dias",  color: "#f59e0b", amount: 0, count: 0 },
    { label: "31–60 dias", color: "#f97316", amount: 0, count: 0 },
    { label: "61–90 dias", color: "#ef4444", amount: 0, count: 0 },
    { label: "91+ dias",   color: "#9f1239", amount: 0, count: 0 },
  ];

  for (const tx of txs) {
    const days = daysDiff(tx.dueDate);
    if      (days <= 0)  { buckets[0].amount += tx.amount; buckets[0].count++; }
    else if (days <= 30) { buckets[1].amount += tx.amount; buckets[1].count++; }
    else if (days <= 60) { buckets[2].amount += tx.amount; buckets[2].count++; }
    else if (days <= 90) { buckets[3].amount += tx.amount; buckets[3].count++; }
    else                 { buckets[4].amount += tx.amount; buckets[4].count++; }
  }

  return buckets.filter(b => b.count > 0 || b.label === "A vencer");
}

export default function AgingPanel() {
  const [agingType, setAgingType] = useState<"receita" | "despesa">("receita");
  const buckets = computeBuckets(agingType);
  const total   = buckets.reduce((s, b) => s + b.amount, 0);
  const totalCount = buckets.reduce((s, b) => s + b.count, 0);

  return (
    <div className="orion-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a2540]">
        <div>
          <h3 className="text-sm font-semibold text-[#cbd5e1]">
            Aging — Contas a {agingType === "receita" ? "Receber" : "Pagar"}
          </h3>
          <p className="text-[10px] mt-0.5 text-[#475569]">
            {totalCount} títulos · {formatCurrency(total)}
          </p>
        </div>
        <div className="flex items-center rounded-lg overflow-hidden border border-[#1a2540]">
          {(["receita", "despesa"] as const).map(t => (
            <button
              key={t}
              onClick={() => setAgingType(t)}
              className="px-3 py-1.5 text-[10px] font-medium transition-colors"
              style={{
                backgroundColor: agingType === t ? "#6366f1" : "transparent",
                color: agingType === t ? "#fff" : "#475569",
              }}
            >
              {t === "receita" ? "Receber" : "Pagar"}
            </button>
          ))}
        </div>
      </div>

      {/* Bars */}
      <div className="p-5 space-y-4">
        {buckets.map(b => {
          const pct = total > 0 ? (b.amount / total) * 100 : 0;
          return (
            <div key={b.label}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: b.color }} />
                  <span className="text-[#94a3b8]">{b.label}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[11px] text-[#475569]">{b.count} tít.</span>
                  <span className="font-mono font-medium text-[11px] text-[#cbd5e1]">
                    {formatCurrency(b.amount)}
                  </span>
                  <span className="font-mono text-[10px] w-8 text-right" style={{ color: b.color }}>
                    {pct.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden bg-[#1a2540]">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: b.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Total footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-[#1a2540] text-xs">
        <span className="text-[#475569]">Total em aberto</span>
        <span className="font-mono font-semibold text-[#cbd5e1]">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
