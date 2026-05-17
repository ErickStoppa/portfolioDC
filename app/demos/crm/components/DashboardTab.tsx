"use client";

import { clients, deals, activities, sparklineRevenue, sparklineClients, sparklineDeals, sparklineConv } from "@/data/crm";
import { formatBRL } from "@/data/crm";
import type { CrmTab, DashboardPeriod } from "../types/crm.types";
import { STATUS_CONFIG } from "../types/crm.types";
import { KpiCard } from "./KpiCard";
import { RevenueChart } from "./RevenueChart";
import { PipelineDonut } from "./PipelineDonut";
import { ActivityFeed } from "./ActivityFeed";
import { ClientStatusBadge } from "./StatusBadge";
import { useState } from "react";

const PERIODS: { value: DashboardPeriod; label: string }[] = [
  { value: "hoje",      label: "Hoje" },
  { value: "semana",    label: "Semana" },
  { value: "mes",       label: "Mês" },
  { value: "trimestre", label: "Trimestre" },
];

const topClients = [...clients].sort((a, b) => b.revenue - a.revenue).slice(0, 5);

interface DashboardTabProps {
  period: DashboardPeriod;
  onPeriodChange: (p: DashboardPeriod) => void;
  onTabChange: (t: CrmTab) => void;
}

export function DashboardTab({ period, onPeriodChange, onTabChange }: DashboardTabProps) {
  const [chartType, setChartType] = useState<"barras" | "linha">("barras");

  const kpis = [
    {
      title: "Receita do Mês",
      value: "R$ 1,29M",
      change: "-12,7%",
      changePositive: false,
      subtitle: "vs. R$ 1,48M em Abr",
      sparkData: sparklineRevenue,
      sparkColor: "#3b82f6",
      icon: "DollarSign",
      onClick: () => onTabChange("relatorios"),
    },
    {
      title: "Clientes Ativos",
      value: "11",
      change: "+2 este mês",
      changePositive: true,
      subtitle: "de 16 no portfólio",
      sparkData: sparklineClients,
      sparkColor: "#10b981",
      icon: "Users",
      onClick: () => onTabChange("clientes"),
    },
    {
      title: "Pipeline Aberto",
      value: "R$ 73,5M",
      change: "13 negócios",
      changePositive: true,
      subtitle: "em 4 estágios",
      sparkData: sparklineDeals,
      sparkColor: "#f59e0b",
      icon: "Briefcase",
      onClick: () => onTabChange("pipeline"),
    },
    {
      title: "Conversão",
      value: "34,2%",
      change: "+2,1pp",
      changePositive: true,
      subtitle: "vs. mês anterior",
      sparkData: sparklineConv,
      sparkColor: "#8b5cf6",
      icon: "Target",
      onClick: () => onTabChange("relatorios"),
    },
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Header + period toggle */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold text-[#f1f5f9]">Bom dia, Ana.</h2>
          <p className="text-sm text-[#64748b] mt-0.5">Aqui está o resumo do seu portfólio.</p>
        </div>
        <div className="flex items-center gap-1">
          {PERIODS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onPeriodChange(value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                period === value
                  ? "bg-[#3b82f6] text-white"
                  : "bg-[rgba(255,255,255,0.04)] text-[#64748b] hover:text-[#f1f5f9]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => <KpiCard key={i} {...kpi} />)}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RevenueChart period={period} chartType={chartType} onChartTypeChange={setChartType} />
        </div>
        <PipelineDonut deals={deals} />
      </div>

      {/* Activity + top clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ActivityFeed activities={activities} onViewAll={() => onTabChange("clientes")} />

        {/* Top clients mini-table */}
        <div className="bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(255,255,255,0.06)]">
            <h3 className="text-sm font-semibold text-[#f1f5f9]">Top Clientes por Receita</h3>
            <button
              onClick={() => onTabChange("clientes")}
              className="text-xs text-[#3b82f6] hover:underline"
            >
              Ver todos →
            </button>
          </div>
          <div className="divide-y divide-[rgba(255,255,255,0.04)]">
            {topClients.map(client => (
              <div key={client.id} className="flex items-center gap-3 px-5 py-3 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-white"
                  style={{ backgroundColor: client.avatarColor }}
                >
                  {client.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#f1f5f9] font-medium truncate">{client.name}</p>
                  <p className="text-[10px] text-[#475569]">{client.segment}</p>
                </div>
                <span className="text-xs font-semibold text-[#f1f5f9] shrink-0">
                  {formatBRL(client.revenue)}
                </span>
                <ClientStatusBadge status={client.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
