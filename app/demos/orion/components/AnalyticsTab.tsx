"use client";

import { useState } from "react";
import { monthlyData, kpiData } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import type { AnalMetric } from "../types/orion.types";
import RevenueStackedArea from "./RevenueStackedArea";
import MarginBarChart from "./MarginBarChart";
import BudgetVsActual from "./BudgetVsActual";

const METRIC_OPTIONS: { id: AnalMetric; label: string }[] = [
  { id: "receita", label: "Receita" },
  { id: "margem",  label: "Margens" },
  { id: "budget",  label: "Budget" },
];

const lastMonth = monthlyData[monthlyData.length - 1];
const prevMonth = monthlyData[monthlyData.length - 2];

export default function AnalyticsTab() {
  const [metric, setMetric] = useState<AnalMetric>("receita");

  const kpiRow = [
    {
      label: "Receita Bruta",
      value: formatCurrency(lastMonth.gross),
      change: `+${(((lastMonth.gross - prevMonth.gross) / prevMonth.gross) * 100).toFixed(1)}%`,
      pos: true,
      color: "#6366f1",
    },
    {
      label: "EBITDA",
      value: formatCurrency(lastMonth.ebitda),
      change: `${((lastMonth.ebitda / lastMonth.gross) * 100).toFixed(1)}% margem`,
      pos: true,
      color: "#22c55e",
    },
    {
      label: "Receita Líquida",
      value: formatCurrency(lastMonth.net),
      change: `${((lastMonth.net / lastMonth.gross) * 100).toFixed(1)}% do bruto`,
      pos: true,
      color: "#38bdf8",
    },
    {
      label: "vs. Budget",
      value: `+${(((lastMonth.gross - lastMonth.budget) / lastMonth.budget) * 100).toFixed(1)}%`,
      change: `${formatCurrency(lastMonth.gross - lastMonth.budget)} acima`,
      pos: true,
      color: "#a78bfa",
    },
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: "#cbd5e1" }}>
            Analytics Financeiro
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
            Análise de performance — Jun/24 a Mai/25
          </p>
        </div>

        {/* Metric toggle */}
        <div className="flex items-center gap-1">
          {METRIC_OPTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setMetric(id)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{
                backgroundColor: metric === id ? "#6366f1" : "rgba(255,255,255,0.04)",
                color: metric === id ? "#fff" : "#475569",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiRow.map(({ label, value, change, pos, color }) => (
          <div
            key={label}
            className="rounded-xl border p-4"
            style={{ backgroundColor: "#0a1220", borderColor: "#1a2540" }}
          >
            <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "#475569" }}>
              {label}
            </p>
            <p className="text-lg font-bold font-mono" style={{ color }}>
              {value}
            </p>
            <p className="text-[10px] mt-1" style={{ color: pos ? "#22c55e" : "#f43f5e" }}>
              {change}
            </p>
          </div>
        ))}
      </div>

      {/* Active chart */}
      {metric === "receita" && <RevenueStackedArea />}
      {metric === "margem"  && <MarginBarChart />}
      {metric === "budget"  && <BudgetVsActual />}

      {/* 12-month summary table */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: "#0a1220", borderColor: "#1a2540" }}
      >
        <div className="px-5 py-4 border-b" style={{ borderColor: "#1a2540" }}>
          <h3 className="text-sm font-semibold" style={{ color: "#cbd5e1" }}>
            Sumário Mensal
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ minWidth: 600 }}>
            <thead>
              <tr className="border-b" style={{ borderColor: "#1a2540" }}>
                {["Mês", "Receita Bruta", "Receita Líquida", "EBITDA", "Marg. EBITDA", "Budget", "Δ Budget"].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-[10px] uppercase tracking-wider font-medium"
                      style={{ color: "#475569" }}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {[...monthlyData].reverse().map((d) => {
                const deltaB = ((d.gross - d.budget) / d.budget) * 100;
                const isLast = d.month === "Mai/25";
                return (
                  <tr
                    key={d.month}
                    className="border-b"
                    style={{
                      borderColor: "#1a2540",
                      backgroundColor: isLast ? "rgba(99,102,241,0.06)" : "transparent",
                    }}
                  >
                    <td
                      className="px-4 py-2.5 text-xs font-medium"
                      style={{ color: isLast ? "#cbd5e1" : "#94a3b8" }}
                    >
                      {d.month}
                    </td>
                    <td className="px-4 py-2.5 text-[11px] font-mono" style={{ color: "#6366f1" }}>
                      {formatCurrency(d.gross)}
                    </td>
                    <td className="px-4 py-2.5 text-[11px] font-mono" style={{ color: "#38bdf8" }}>
                      {formatCurrency(d.net)}
                    </td>
                    <td className="px-4 py-2.5 text-[11px] font-mono" style={{ color: "#22c55e" }}>
                      {formatCurrency(d.ebitda)}
                    </td>
                    <td className="px-4 py-2.5 text-[11px] font-mono" style={{ color: "#22c55e" }}>
                      {((d.ebitda / d.gross) * 100).toFixed(1)}%
                    </td>
                    <td className="px-4 py-2.5 text-[11px] font-mono" style={{ color: "#334155" }}>
                      {formatCurrency(d.budget)}
                    </td>
                    <td
                      className="px-4 py-2.5 text-[11px] font-mono font-semibold"
                      style={{ color: deltaB >= 0 ? "#22c55e" : "#f43f5e" }}
                    >
                      {deltaB >= 0 ? "+" : ""}{deltaB.toFixed(1)}%
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
