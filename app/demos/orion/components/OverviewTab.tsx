"use client";

import { AnimatePresence } from "framer-motion";
import {
  kpiData,
  activities,
  alerts,
  sparkRevenue,
  sparkEbitda,
  sparkCash,
  sparkNet,
} from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import type { OrionTab, Period } from "../types/orion.types";
import KpiSparkCard from "./KpiSparkCard";
import AlertBanner from "./AlertBanner";
import ActivityStream from "./ActivityStream";

interface OverviewTabProps {
  period: Period;
  onTabChange: (t: OrionTab) => void;
}

const PERIOD_SUBTITLE: Record<Period, string> = {
  dia:       "Resumo do dia — 17/Mai/2025",
  mes:       "Resumo do mês — Mai/2025",
  trimestre: "Resumo do trimestre — Q2 2025",
  ano:       "Resumo do ano — 2025",
};

export default function OverviewTab({ period, onTabChange }: OverviewTabProps) {
  const visibleAlerts = alerts
    .filter((al) => !al.read)
    .concat(alerts.filter((al) => al.read))
    .slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold" style={{ color: "#cbd5e1" }}>
          Bom dia, Rafael.
        </h2>
        <p className="text-sm mt-0.5" style={{ color: "#475569" }}>
          Nexum Indústria S.A. — {PERIOD_SUBTITLE[period]}
        </p>
      </div>

      {/* Alerts */}
      <div className="space-y-2">
        <AnimatePresence>
          {visibleAlerts.map((al) => (
            <AlertBanner key={al.id} alert={al} />
          ))}
        </AnimatePresence>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiSparkCard
          title="Receita Bruta"
          value={formatCurrency(kpiData.revenue)}
          change="+3,8%"
          changePositive={true}
          subtitle="vs. Abr/25"
          sparkData={sparkRevenue}
          sparkColor="#6366f1"
          icon="TrendingUp"
          onClick={() => onTabChange("analytics")}
        />
        <KpiSparkCard
          title="EBITDA"
          value={formatCurrency(kpiData.ebitda)}
          change="+3,9%"
          changePositive={true}
          subtitle="margem 12,0%"
          sparkData={sparkEbitda}
          sparkColor="#22c55e"
          icon="BarChart3"
          onClick={() => onTabChange("financeiro")}
        />
        <KpiSparkCard
          title="Posição de Caixa"
          value={formatCurrency(kpiData.cashPosition)}
          change="+4,0%"
          changePositive={true}
          subtitle="consolidado 3 bancos"
          sparkData={sparkCash}
          sparkColor="#38bdf8"
          icon="Landmark"
          onClick={() => onTabChange("tesouraria")}
        />
        <KpiSparkCard
          title="Lucro Líquido"
          value={formatCurrency(kpiData.netIncome)}
          change="+5,5%"
          changePositive={true}
          subtitle="margem 4,6%"
          sparkData={sparkNet}
          sparkColor="#a78bfa"
          icon="DollarSign"
          onClick={() => onTabChange("financeiro")}
        />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Activity Stream */}
        <ActivityStream activities={activities} />

        {/* Quick Metrics */}
        <div
          className="rounded-xl border p-5"
          style={{ backgroundColor: "#0a1220", borderColor: "#1a2540" }}
        >
          <h3 className="text-sm font-semibold mb-1" style={{ color: "#cbd5e1" }}>
            Indicadores Operacionais
          </h3>

          <div className="mt-2">
            {/* DSO */}
            <div
              className="flex justify-between items-center py-2.5 border-b text-xs"
              style={{ borderColor: "#1a2540" }}
            >
              <span style={{ color: "#475569" }}>DSO (Prazo Médio Recebimento)</span>
              <span className="tabular-nums font-medium" style={{ color: "#38bdf8" }}>
                {kpiData.dso} dias
              </span>
            </div>

            {/* DPO */}
            <div
              className="flex justify-between items-center py-2.5 border-b text-xs"
              style={{ borderColor: "#1a2540" }}
            >
              <span style={{ color: "#475569" }}>DPO (Prazo Médio Pagamento)</span>
              <span className="tabular-nums font-medium" style={{ color: "#a78bfa" }}>
                {kpiData.dpo} dias
              </span>
            </div>

            {/* EBITDA Margin */}
            <div
              className="flex justify-between items-center py-2.5 border-b text-xs"
              style={{ borderColor: "#1a2540" }}
            >
              <span style={{ color: "#475569" }}>Margem EBITDA</span>
              <span className="tabular-nums font-medium" style={{ color: "#22c55e" }}>
                {kpiData.ebitdaMargin.toFixed(1)}%
              </span>
            </div>

            {/* Accounts Receivable */}
            <div
              className="flex justify-between items-center py-2.5 border-b text-xs"
              style={{ borderColor: "#1a2540" }}
            >
              <span style={{ color: "#475569" }}>Contas a Receber</span>
              <span className="tabular-nums font-medium" style={{ color: "#cbd5e1" }}>
                {formatCurrency(kpiData.accountsReceivable)}
              </span>
            </div>

            {/* Accounts Payable */}
            <div
              className="flex justify-between items-center py-2.5 border-b text-xs"
              style={{ borderColor: "#1a2540" }}
            >
              <span style={{ color: "#475569" }}>Contas a Pagar</span>
              <span className="tabular-nums font-medium" style={{ color: "#f43f5e" }}>
                {formatCurrency(kpiData.accountsPayable)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
