"use client";

import { FileSearch } from "lucide-react";
import { cashFlowItems } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import type { Transaction, PlLine } from "@/data/orion";
import type { TxFilter, PlFilter } from "../types/orion.types";
import { TX_STATUS_CONFIG } from "../types/orion.types";
import PlStatement from "./PlStatement";
import AgingPanel from "./AgingPanel";
import CashFlowWaterfall from "./CashFlowWaterfall";

// ── Types ──────────────────────────────────────────────────────────────────────
interface FinanceiroTabProps {
  transactions:      Transaction[];   // filtered by txFilter
  allTransactions:   Transaction[];   // unfiltered — for KPI cards
  txFilter:          TxFilter;
  onTxFilterChange:  (f: TxFilter) => void;
  plLines:           PlLine[];
  plFilter:          PlFilter;
  plMonth:           number;          // 0–11
  onPlFilterChange:  (f: PlFilter) => void;
  onPlMonthChange:   (m: number)  => void;
}

const TX_FILTERS: { id: TxFilter; label: string }[] = [
  { id: "todos",    label: "Todos"     },
  { id: "receita",  label: "Receitas"  },
  { id: "despesa",  label: "Despesas"  },
  { id: "vencido",  label: "Vencidos"  },
  { id: "pendente", label: "Pendentes" },
];

// ── KPI helpers ────────────────────────────────────────────────────────────────
function varPct(cur: number, prev: number): number {
  if (prev === 0) return 0;
  return ((cur - prev) / prev) * 100;
}

function pctLabel(pct: number): string {
  return `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`;
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function FinanceiroTab({
  transactions,
  allTransactions,
  txFilter,
  onTxFilterChange,
  plLines,
  plFilter,
  plMonth,
  onPlFilterChange,
  onPlMonthChange,
}: FinanceiroTabProps) {

  // ── SEÇÃO 1: KPI cards from allTransactions + plLines ───────────────────────
  const prev = plMonth > 0 ? plMonth - 1 : 0;

  const kpiReceita = plLines.find(l => l.key === "receita_bruta");
  const kpiDespOp  = plLines.find(l => l.key === "despesas_operacionais");

  const receitaMes  = kpiReceita?.values[plMonth]  ?? 0;
  const receitaPrev = kpiReceita?.values[prev]      ?? 0;
  const despMes     = kpiDespOp?.values[plMonth]   ?? 0;
  const despPrev    = kpiDespOp?.values[prev]      ?? 0;

  const aReceber = allTransactions
    .filter(t => t.type === "receita" && (t.status === "pendente" || t.status === "vencido"))
    .reduce((s, t) => s + t.amount, 0);

  const aPagar = allTransactions
    .filter(t => t.type === "despesa" && (t.status === "pendente" || t.status === "vencido"))
    .reduce((s, t) => s + t.amount, 0);

  const aReceberVencido = allTransactions
    .filter(t => t.type === "receita" && t.status === "vencido")
    .reduce((s, t) => s + t.amount, 0);

  const aPagarVencido = allTransactions
    .filter(t => t.type === "despesa" && t.status === "vencido")
    .reduce((s, t) => s + t.amount, 0);

  const kpis = [
    {
      label: "Receita do Mês",
      value: receitaMes,
      pct:   varPct(receitaMes, receitaPrev),
      color: "#22c55e",
      sub:   "vs mês anterior",
      good:  (p: number) => p >= 0,
    },
    {
      label: "Despesas do Mês",
      value: despMes,
      pct:   varPct(despMes, despPrev),
      color: "#f43f5e",
      sub:   "vs mês anterior",
      good:  (p: number) => p <= 0, // lower despesas = good
    },
    {
      label: "A Receber",
      value: aReceber,
      pct:   aReceber > 0 ? (aReceberVencido / aReceber) * 100 : 0,
      color: "#38bdf8",
      sub:   "vencidos",
      good:  (p: number) => p === 0,
      isRatio: true,
    },
    {
      label: "A Pagar",
      value: aPagar,
      pct:   aPagar > 0 ? (aPagarVencido / aPagar) * 100 : 0,
      color: "#a78bfa",
      sub:   "vencidos",
      good:  (p: number) => p === 0,
      isRatio: true,
    },
  ];

  // ── SEÇÃO 3: AgingPanel receives only receivables pending/overdue ─────────────
  const agingTx = allTransactions.filter(
    t => t.type === "receita" && (t.status === "pendente" || t.status === "vencido")
  );

  return (
    <div className="p-3 sm:p-6 space-y-6">
      {/* ── Page header ──────────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-lg font-semibold text-[#cbd5e1]">Gestão Financeira</h2>
        <p className="text-xs mt-0.5 text-[#475569]">DRE · fluxo de caixa · aging · transações — 2026</p>
      </div>

      {/* ── SEÇÃO 1: 4 KPI cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map(({ label, value, pct, color, sub, good, isRatio }) => {
          const isGood   = good(pct);
          const pctColor = isGood ? "#22c55e" : "#f43f5e";
          return (
            <div key={label} className="orion-card p-4">
              <p className="text-[10px] uppercase tracking-wider text-[#475569] mb-2">{label}</p>
              <p className="text-xl font-bold font-mono mb-2" style={{ color }}>{formatCurrency(value)}</p>
              <div className="flex items-center gap-1.5">
                <span
                  className="text-[10px] font-semibold font-mono"
                  style={{ color: pctColor }}
                >
                  {isRatio
                    ? `${pct.toFixed(1)}%`
                    : pctLabel(pct)}
                </span>
                <span className="text-[10px] text-[#334155]">{sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── SEÇÃO 2: DRE / PlStatement ───────────────────────────────────────── */}
      <PlStatement
        lines={plLines}
        filter={plFilter}
        selectedMonth={plMonth}
        onFilterChange={onPlFilterChange}
        onMonthChange={onPlMonthChange}
      />

      {/* ── SEÇÃO 3: CashFlow (2/3) + Aging (1/3) ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CashFlowWaterfall items={cashFlowItems} />
        </div>
        <div className="lg:col-span-1 flex flex-col">
          <AgingPanel transactions={agingTx} />
        </div>
      </div>

      {/* ── SEÇÃO 4: Transactions table ──────────────────────────────────────── */}
      <div className="orion-card overflow-hidden">
        {/* Header + filters */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a2540] flex-wrap gap-3">
          <div>
            <h3 className="text-sm font-semibold text-[#cbd5e1]">Transações</h3>
            <p className="text-[10px] mt-0.5 text-[#475569]">{transactions.length} registros</p>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {TX_FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => onTxFilterChange(f.id)}
                className={`orion-pill-filter ${txFilter === f.id ? "orion-pill-active" : ""}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ minWidth: 400 }}>
            <thead>
              <tr className="border-b border-[#1a2540]">
                {[
                  { label: "Tipo",       cls: "w-24"            },
                  { label: "NF-e",       cls: "w-28",  hide: true },
                  { label: "Descrição",  cls: ""                },
                  { label: "Método",     cls: "w-28",  hide: true },
                  { label: "Vencimento", cls: "w-28"            },
                  { label: "Status",     cls: "w-28"            },
                  { label: "Valor",      cls: "w-32 text-right" },
                ].map(({ label, cls, hide }) => (
                  <th
                    key={label}
                    className={`px-4 py-3 text-[10px] uppercase tracking-wider text-[#475569] font-medium ${cls}${hide ? " hidden sm:table-cell" : ""}`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => {
                const cfg = TX_STATUS_CONFIG[tx.status];
                const isRec = tx.type === "receita";
                return (
                  <tr key={tx.id} className="orion-table-row">
                    {/* Tipo */}
                    <td className="px-4 py-3">
                      <span
                        className="orion-badge text-[9px] font-semibold"
                        style={{
                          color:            isRec ? "#22c55e" : "#f43f5e",
                          backgroundColor:  isRec ? "#22c55e18" : "#f43f5e18",
                        }}
                      >
                        {isRec ? "↑ Receita" : "↓ Despesa"}
                      </span>
                    </td>
                    {/* NF-e */}
                    <td className="px-4 py-3 text-[10px] font-mono text-[#475569] hidden sm:table-cell">
                      {tx.nfNumber ?? "—"}
                    </td>
                    {/* Descrição + Contraparte */}
                    <td className="px-4 py-3">
                      <p className="text-xs text-[#cbd5e1] leading-snug">{tx.description}</p>
                      <p className="hidden sm:block text-[10px] text-[#475569] mt-0.5">{tx.counterparty}</p>
                    </td>
                    {/* Método */}
                    <td className="px-4 py-3 text-[10px] text-[#94a3b8] capitalize hidden sm:table-cell">
                      {tx.paymentMethod ?? "—"}
                    </td>
                    {/* Vencimento */}
                    <td className="px-4 py-3 text-[10px] font-mono text-[#475569]">
                      {tx.dueDate.split("-").reverse().join("/")}
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className={`orion-badge text-[10px] ${cfg.color} ${cfg.bg}`}>
                        {cfg.label}
                      </span>
                    </td>
                    {/* Valor */}
                    <td className="px-4 py-3 text-right">
                      <span
                        className="text-xs font-mono font-semibold"
                        style={{ color: isRec ? "#22c55e" : "#f43f5e" }}
                      >
                        {isRec ? "+" : "−"}{formatCurrency(tx.amount)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Empty state */}
          {transactions.length === 0 && (
            <div className="py-14 flex flex-col items-center gap-3">
              <FileSearch size={32} className="text-[#1a2540]" />
              <p className="text-sm text-[#334155]">Nenhuma transação encontrada</p>
              <p className="text-[10px] text-[#1a2540]">Tente ajustar os filtros acima</p>
            </div>
          )}
        </div>

        {/* Footer count */}
        <div className="px-5 py-3 border-t border-[#1a2540] text-[10px] text-[#475569]">
          {transactions.length} transaç{transactions.length === 1 ? "ão exibida" : "ões exibidas"}
        </div>
      </div>
    </div>
  );
}
