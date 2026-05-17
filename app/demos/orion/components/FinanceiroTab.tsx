"use client";

import { plLines, transactions } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import type { Transaction } from "@/data/orion";
import type { TxFilter } from "../types/orion.types";
import { TX_STATUS_CONFIG } from "../types/orion.types";
import PlStatement from "./PlStatement";
import AgingPanel from "./AgingPanel";

interface FinanceiroTabProps {
  filteredTx: Transaction[];
  txFilter: TxFilter;
  onTxFilter: (f: TxFilter) => void;
}

const TX_FILTERS: { id: TxFilter; label: string }[] = [
  { id: "todos",    label: "Todos"    },
  { id: "receita",  label: "Receitas" },
  { id: "despesa",  label: "Despesas" },
  { id: "vencido",  label: "Vencidos" },
  { id: "pendente", label: "Pendentes"},
];

export default function FinanceiroTab({ filteredTx, txFilter, onTxFilter }: FinanceiroTabProps) {
  const totalRec = transactions.filter(t => t.type === "receita" && t.status === "pago").reduce((s, t) => s + t.amount, 0);
  const totalDesp = transactions.filter(t => t.type === "despesa" && t.status === "pago").reduce((s, t) => s + t.amount, 0);
  const overdue = transactions.filter(t => t.status === "vencido");

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      <div>
        <h2 className="text-lg font-semibold text-[#cbd5e1]">Gestão Financeira</h2>
        <p className="text-xs mt-0.5 text-[#475569]">DRE, transações e aging — Mai/2026</p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Receitas Recebidas", value: totalRec,  color: "#22c55e" },
          { label: "Despesas Pagas",     value: totalDesp, color: "#f43f5e" },
          { label: "Títulos Vencidos",   value: overdue.reduce((s,t) => s+t.amount, 0), color: "#f59e0b" },
        ].map(({ label, value, color }) => (
          <div key={label} className="orion-card p-4">
            <p className="text-[10px] uppercase tracking-wider text-[#475569] mb-1">{label}</p>
            <p className="text-xl font-bold font-mono" style={{ color }}>{formatCurrency(value)}</p>
          </div>
        ))}
      </div>

      {/* DRE */}
      <PlStatement />

      {/* Aging */}
      <AgingPanel />

      {/* Transactions */}
      <div className="orion-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a2540] flex-wrap gap-3">
          <h3 className="text-sm font-semibold text-[#cbd5e1]">Transações</h3>
          <div className="flex items-center gap-1">
            {TX_FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => onTxFilter(f.id)}
                className={`orion-pill-filter ${txFilter === f.id ? "orion-pill-active" : ""}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ minWidth: 700 }}>
            <thead>
              <tr className="border-b border-[#1a2540]">
                {["ID","Descrição","Contraparte","Vencimento","Valor","Status","Método"].map(c => (
                  <th key={c} className="px-4 py-3 text-[10px] uppercase tracking-wider text-[#475569] font-medium">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTx.map(tx => {
                const cfg = TX_STATUS_CONFIG[tx.status];
                return (
                  <tr key={tx.id} className="orion-table-row">
                    <td className="px-4 py-3 text-[10px] font-mono text-[#475569]">{tx.id}</td>
                    <td className="px-4 py-3">
                      <p className="text-xs text-[#cbd5e1]">{tx.description}</p>
                      {tx.nfNumber && <p className="text-[10px] text-[#475569]">{tx.nfNumber}</p>}
                    </td>
                    <td className="px-4 py-3 text-xs text-[#94a3b8]">{tx.counterparty}</td>
                    <td className="px-4 py-3 text-[10px] font-mono text-[#475569]">
                      {tx.dueDate.split("-").reverse().join("/")}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono font-semibold"
                      style={{ color: tx.type === "receita" ? "#22c55e" : "#f43f5e" }}>
                      {tx.type === "despesa" ? "-" : "+"}{formatCurrency(tx.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`orion-badge text-[10px] ${cfg.color} ${cfg.bg}`}>{cfg.label}</span>
                    </td>
                    <td className="px-4 py-3 text-[10px] text-[#475569] capitalize">{tx.paymentMethod ?? "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-[#1a2540] text-[10px] text-[#475569]">
          {filteredTx.length} transações exibidas
        </div>
      </div>
    </div>
  );
}
