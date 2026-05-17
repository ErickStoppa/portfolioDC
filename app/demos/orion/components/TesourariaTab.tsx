"use client";

import { bankAccounts, kpiData } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import BankCard from "./BankCard";
import CashProjectionChart from "./CashProjectionChart";
import FxWidget from "./FxWidget";

export default function TesourariaTab() {
  const totalBalance = bankAccounts.reduce((s, b) => s + b.balance, 0);

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: "#cbd5e1" }}>
            Tesouraria
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
            Posição consolidada de caixa e câmbio — Mai/2025
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "#475569" }}>
            Caixa Consolidado
          </p>
          <p className="text-2xl font-bold font-mono" style={{ color: "#38bdf8" }}>
            {formatCurrency(totalBalance)}
          </p>
          <p className="text-[10px] font-mono mt-0.5" style={{ color: "#22c55e" }}>
            +{formatCurrency(kpiData.cashPosition - kpiData.cashPositionPrev)} vs. Abr/25
          </p>
        </div>
      </div>

      {/* Bank Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bankAccounts.map((account) => (
          <BankCard key={account.id} account={account} />
        ))}
      </div>

      {/* Cash Projection */}
      <CashProjectionChart />

      {/* FX Widget */}
      <FxWidget />
    </div>
  );
}
