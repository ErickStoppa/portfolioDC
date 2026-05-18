"use client";

import { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils";
import type { BankAccount, CashFlowItem, FxRate, Transaction } from "@/data/orion";
import BankCard from "./BankCard";
import CashProjectionChart from "./CashProjectionChart";
import FxWidget from "./FxWidget";

interface Props {
  bankAccounts:  BankAccount[];
  cashFlowItems: CashFlowItem[];
  fxRates:       FxRate[];
  selectedBankId: string | null;
  onSelectBank:   (id: string) => void;
}

const USD_BRL = 5.47;

// Synthetic recent bank movements (10 entries, hardcoded)
const BANK_MOVES = [
  { id:"m01", date:"2026-05-17", bank:"Itaú",      desc:"Recebimento NF-47821",   type:"credito" as const, amount:128400,  balance:3_842_150, bankId:"bank-001" },
  { id:"m02", date:"2026-05-17", bank:"Bradesco",  desc:"Fornecedor Eletrônica Sul",type:"debito" as const, amount:47200,   balance:891_340,   bankId:"bank-002" },
  { id:"m03", date:"2026-05-16", bank:"Itaú",      desc:"Recebimento NF-47809",   type:"credito" as const, amount:84_000,   balance:3_713_750, bankId:"bank-001" },
  { id:"m04", date:"2026-05-16", bank:"Caixa",     desc:"Pagamento DARF CSLL",    type:"debito" as const, amount:19_800,   balance:218_600,   bankId:"bank-003" },
  { id:"m05", date:"2026-05-15", bank:"Santander", desc:"Câmbio exportação USD",  type:"credito" as const, amount:92_000,   balance:462_350,   bankId:"bank-004" },
  { id:"m06", date:"2026-05-15", bank:"Itaú",      desc:"TED Folha de Pagamento", type:"debito" as const, amount:187_200,  balance:3_629_750, bankId:"bank-001" },
  { id:"m07", date:"2026-05-14", bank:"Bradesco",  desc:"Recebimento NF-47780",   type:"credito" as const, amount:63_500,   balance:938_540,   bankId:"bank-002" },
  { id:"m08", date:"2026-05-14", bank:"Caixa",     desc:"Recolhimento FGTS Mai",  type:"debito" as const, amount:24_600,   balance:238_400,   bankId:"bank-003" },
  { id:"m09", date:"2026-05-13", bank:"Itaú",      desc:"Recebimento NF-47762",   type:"credito" as const, amount:156_000,  balance:3_817_950, bankId:"bank-001" },
  { id:"m10", date:"2026-05-13", bank:"Bradesco",  desc:"Pag. Energia Elétrica",  type:"debito" as const, amount:8_740,    balance:875_040,   bankId:"bank-002" },
];

const BANK_FILTER_OPTIONS = [
  { id: "todos",  label: "Todos"     },
  { id: "bank-001", label: "Itaú"   },
  { id: "bank-002", label: "Bradesco"},
  { id: "bank-003", label: "Caixa"  },
  { id: "bank-004", label: "Santander"},
];

export default function TesourariaTab({ bankAccounts, cashFlowItems, fxRates, selectedBankId, onSelectBank }: Props) {
  const [moveFilter, setMoveFilter] = useState("todos");

  const usdRate = fxRates.find(r => r.pair === "USD/BRL")?.rate ?? USD_BRL;

  const totalBRL = useMemo(() =>
    bankAccounts.reduce((s, b) =>
      s + (b.currency === "USD" ? b.balance * usdRate : b.balance), 0
    ), [bankAccounts, usdRate]);

  const total7d = useMemo(() =>
    bankAccounts.reduce((s, b) =>
      s + (b.currency === "USD" ? (b.projection7d - b.balance) * usdRate : b.projection7d - b.balance), 0
    ), [bankAccounts, usdRate]);

  const countBRL = bankAccounts.filter(b => b.currency === "BRL").length;
  const countUSD = bankAccounts.filter(b => b.currency === "USD").length;
  const lastSync = bankAccounts.reduce((latest, b) => b.lastSync > latest ? b.lastSync : latest, "");

  const filteredMoves = moveFilter === "todos"
    ? BANK_MOVES
    : BANK_MOVES.filter(m => m.bankId === moveFilter);

  return (
    <div className="p-6 space-y-6">
      {/* ROW 1: Consolidated position */}
      <div className="orion-card p-4 flex items-center justify-between gap-6 flex-wrap">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[#475569] mb-1">Posição Consolidada</p>
          <p className="text-3xl font-bold font-mono text-white tabular-nums">{formatCurrency(totalBRL)}</p>
          <p className="text-[10px] font-mono mt-1" style={{ color: total7d >= 0 ? "#22c55e" : "#f43f5e" }}>
            {total7d >= 0 ? "+" : ""}{formatCurrency(total7d)} projeção 7d
          </p>
        </div>
        <div className="flex items-center gap-6">
          {[
            { label: "Contas BRL", value: countBRL.toString(), color: "#6366f1" },
            { label: "Contas USD", value: countUSD.toString(), color: "#38bdf8" },
            { label: "Última sincronização", value: lastSync, color: "#475569" },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-right">
              <p className="text-[9px] uppercase tracking-wider text-[#334155] mb-0.5">{label}</p>
              <p className="text-sm font-bold font-mono tabular-nums" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 2: Bank cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {bankAccounts.map(account => (
          <BankCard
            key={account.id}
            account={account}
            isSelected={selectedBankId === account.id}
            onSelect={() => onSelectBank(account.id)}
          />
        ))}
      </div>

      {/* ROW 3: Cash projection (2/3) + FX widget (1/3) */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <CashProjectionChart items={cashFlowItems} />
        </div>
        <div className="col-span-1">
          <FxWidget rates={fxRates} />
        </div>
      </div>

      {/* ROW 4: Recent bank movements */}
      <div className="orion-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a2540] flex-wrap gap-3">
          <div>
            <h3 className="text-sm font-semibold text-[#cbd5e1]">Movimentações Bancárias Recentes</h3>
            <p className="text-[10px] mt-0.5 text-[#475569]">{filteredMoves.length} registros</p>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {BANK_FILTER_OPTIONS.map(f => (
              <button
                key={f.id}
                onClick={() => setMoveFilter(f.id)}
                className={`orion-pill-filter ${moveFilter === f.id ? "orion-pill-active" : ""}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ minWidth: 680 }}>
            <thead>
              <tr className="border-b border-[#1a2540]">
                {["Data", "Banco", "Descrição", "Tipo", "Valor", "Saldo Após"].map(col => (
                  <th key={col} className="px-4 py-3 text-[10px] uppercase tracking-wider font-medium text-[#475569]">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredMoves.map(m => (
                <tr key={m.id} className="orion-table-row">
                  <td className="px-4 py-3 text-[10px] font-mono text-[#475569]">
                    {m.date.split("-").reverse().join("/")}
                  </td>
                  <td className="px-4 py-3 text-xs text-[#94a3b8]">{m.bank}</td>
                  <td className="px-4 py-3 text-xs text-[#cbd5e1]">{m.desc}</td>
                  <td className="px-4 py-3">
                    <span
                      className="orion-badge text-[9px] font-semibold"
                      style={{
                        color:           m.type === "credito" ? "#22c55e" : "#f43f5e",
                        backgroundColor: m.type === "credito" ? "#22c55e18" : "#f43f5e18",
                      }}
                    >
                      {m.type === "credito" ? "↑ Crédito" : "↓ Débito"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs font-mono font-semibold tabular-nums"
                      style={{ color: m.type === "credito" ? "#22c55e" : "#f43f5e" }}
                    >
                      {m.type === "credito" ? "+" : "−"}{formatCurrency(m.amount)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[10px] font-mono text-[#475569] tabular-nums">
                    {formatCurrency(m.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
