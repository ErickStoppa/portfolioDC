"use client";

import { useState } from "react";
import { monthlyMetrics } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import RevenueStackedArea from "./RevenueStackedArea";
import MarginBarChart from "./MarginBarChart";
import BudgetVsActual from "./BudgetVsActual";

type AnalMetric = "receita" | "margem" | "budget";

const METRIC_OPTIONS: { id: AnalMetric; label: string }[] = [
  { id: "receita", label: "Receita" },
  { id: "margem",  label: "Margens" },
  { id: "budget",  label: "Budget" },
];

const lastM = monthlyMetrics[4];  // Mai
const prevM = monthlyMetrics[3];  // Abr

export default function AnalyticsTab() {
  const [metric, setMetric] = useState<AnalMetric>("receita");

  const kpiRow = [
    {
      label: "Receita Bruta",
      value: formatCurrency(lastM.revenue),
      change: `+${(((lastM.revenue - prevM.revenue) / prevM.revenue) * 100).toFixed(1)}%`,
      pos: true,
      color: "#6366f1",
    },
    {
      label: "EBITDA",
      value: formatCurrency(lastM.ebitda),
      change: `${((lastM.ebitda / lastM.revenue) * 100).toFixed(1)}% margem`,
      pos: true,
      color: "#22c55e",
    },
    {
      label: "Lucro Bruto",
      value: formatCurrency(lastM.grossProfit),
      change: `${((lastM.grossProfit / lastM.revenue) * 100).toFixed(1)}% do bruto`,
      pos: true,
      color: "#38bdf8",
    },
    {
      label: "Lucro Líquido",
      value: formatCurrency(lastM.netIncome),
      change: `${((lastM.netIncome / lastM.revenue) * 100).toFixed(1)}% margem`,
      pos: lastM.netIncome > 0,
      color: "#a78bfa",
    },
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold text-[#cbd5e1]">Analytics Financeiro</h2>
          <p className="text-xs mt-0.5 text-[#475569]">Performance Jan–Mai/2026</p>
        </div>
        <div className="flex items-center gap-1">
          {METRIC_OPTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setMetric(id)}
              className={`orion-pill-filter ${metric === id ? "orion-pill-active" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiRow.map(({ label, value, change, pos, color }) => (
          <div key={label} className="orion-card p-4">
            <p className="text-[10px] uppercase tracking-wider mb-1 text-[#475569]">{label}</p>
            <p className="text-lg font-bold font-mono" style={{ color }}>{value}</p>
            <p className="text-[10px] mt-1" style={{ color: pos ? "#22c55e" : "#f43f5e" }}>{change}</p>
          </div>
        ))}
      </div>

      {/* Active chart */}
      {metric === "receita" && <RevenueStackedArea />}
      {metric === "margem"  && <MarginBarChart />}
      {metric === "budget"  && <BudgetVsActual />}

      {/* 12-month summary table */}
      <div className="orion-card overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1a2540]">
          <h3 className="text-sm font-semibold text-[#cbd5e1]">Sumário Mensal</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ minWidth: 600 }}>
            <thead>
              <tr className="border-b border-[#1a2540]">
                {["Mês", "Receita Bruta", "Lucro Bruto", "EBITDA", "Marg. EBITDA", "Lucro Líquido", "Marg. Líq."].map(col => (
                  <th key={col} className="px-4 py-3 text-[10px] uppercase tracking-wider font-medium text-[#475569]">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...monthlyMetrics].reverse().map(d => {
                const isCurrent = d.month === "Mai";
                const ebitdaMarg = ((d.ebitda / d.revenue) * 100).toFixed(1);
                const netMarg    = ((d.netIncome / d.revenue) * 100).toFixed(1);
                return (
                  <tr
                    key={d.month}
                    className="border-b border-[#1a2540]"
                    style={{ backgroundColor: isCurrent ? "rgba(99,102,241,0.06)" : "transparent" }}
                  >
                    <td className="px-4 py-2.5 text-xs font-medium" style={{ color: isCurrent ? "#cbd5e1" : "#94a3b8" }}>
                      {d.month}/26
                    </td>
                    <td className="px-4 py-2.5 text-[11px] font-mono text-[#6366f1]">
                      {formatCurrency(d.revenue)}
                    </td>
                    <td className="px-4 py-2.5 text-[11px] font-mono text-[#22c55e]">
                      {formatCurrency(d.grossProfit)}
                    </td>
                    <td className="px-4 py-2.5 text-[11px] font-mono text-[#38bdf8]">
                      {formatCurrency(d.ebitda)}
                    </td>
                    <td className="px-4 py-2.5 text-[11px] font-mono text-[#38bdf8]">
                      {ebitdaMarg}%
                    </td>
                    <td className="px-4 py-2.5 text-[11px] font-mono text-[#a78bfa]">
                      {formatCurrency(d.netIncome)}
                    </td>
                    <td className="px-4 py-2.5 text-[11px] font-mono text-[#a78bfa]">
                      {netMarg}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
