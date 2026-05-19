"use client";

import { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils";
import { kpiSnapshot } from "@/data/orion";
import type { MonthlyMetric, BudgetLine, Transaction } from "@/data/orion";
import RevenueStackedArea from "./RevenueStackedArea";
import MarginBarChart from "./MarginBarChart";
import BudgetVsActual from "./BudgetVsActual";

interface Props {
  monthlyMetrics: MonthlyMetric[];
  budgetLines:    BudgetLine[];
  transactions:   Transaction[];
}

// Decorative performance heatmap (12 weeks × 7 days)
const HEATMAP: number[][] = [
  [0,3,5,4,6,5,0], [0,4,6,5,7,6,0], [0,5,7,6,8,5,0], [0,6,5,7,6,4,0],
  [0,4,6,5,8,7,0], [0,5,7,8,6,5,0], [0,6,8,7,5,6,0], [0,7,6,8,7,5,0],
  [0,5,7,6,8,6,0], [0,6,8,7,6,5,0], [0,7,6,8,5,4,0], [0,8,7,6,8,7,0],
];

function heatColor(v: number): string {
  if (v === 0) return "#0d1628";
  const stops = ["#052e16","#14532d","#166534","#15803d","#16a34a","#22c55e","#4ade80","#86efac"];
  return stops[Math.min(v - 1, stops.length - 1)];
}

type AnalMetric = "receita" | "margem" | "budget";

export default function AnalyticsTab({ monthlyMetrics, budgetLines, transactions }: Props) {
  const [metric, setMetric] = useState<AnalMetric>("receita");

  const lastM = monthlyMetrics[monthlyMetrics.length - 1];
  const prevM = monthlyMetrics[monthlyMetrics.length - 2];
  const firstM = monthlyMetrics[0];

  // KPI 1: EBITDA Margin atual + 6-month sparkline
  const ebitdaMargin  = (lastM.ebitda / lastM.revenue) * 100;
  const spark6 = monthlyMetrics.slice(-6).map(d => (d.ebitda / d.revenue) * 100);
  const sparkMin = Math.min(...spark6); const sparkMax = Math.max(...spark6);

  // KPI 2: Revenue growth (first vs last month, annualised proxy)
  const revGrowth = ((lastM.revenue - firstM.revenue) / firstM.revenue) * 100;

  // KPI 3: Revenue per employee
  const revYtd = monthlyMetrics.reduce((s, d) => s + d.revenue, 0);
  const revPerEmp = revYtd / (lastM.headcount || kpiSnapshot.headcountActive);

  // Segment analysis from transactions
  const segmentData = useMemo(() => {
    const paid = transactions.filter(t => t.type === "receita" && t.status === "pago");
    const totalRev = paid.reduce((s, t) => s + t.amount, 0) || 1;
    const byCategory: Record<string, number> = {};
    paid.forEach(t => {
      byCategory[t.category] = (byCategory[t.category] ?? 0) + t.amount;
    });
    return Object.entries(byCategory)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, val]) => ({
        segment: cat.charAt(0).toUpperCase() + cat.slice(1),
        revenue: val,
        pct:     (val / totalRev) * 100,
        yoy:     +(Math.random() * 30 - 5).toFixed(1), // decorative
        margin:  +(Math.random() * 15 + 20).toFixed(1), // decorative
      }));
  }, [transactions]);

  const sparkH = 28; const sparkW = 80;
  function toSparkY(v: number) {
    return sparkH - ((v - sparkMin) / (sparkMax - sparkMin || 1)) * sparkH;
  }
  const sparkPts = spark6.map((v, i) =>
    `${((i / (spark6.length - 1)) * sparkW).toFixed(1)},${toSparkY(v).toFixed(1)}`
  ).join(" ");

  return (
    <div className="p-3 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold text-[#cbd5e1]">Analytics Financeiro</h2>
          <p className="text-xs mt-0.5 text-[#475569]">Performance acumulada Jan–{lastM.month}/2026</p>
        </div>
        <div className="flex items-center gap-1">
          {([["receita","Receita"],["margem","Margens"],["budget","Budget"]] as [AnalMetric, string][]).map(([id, lbl]) => (
            <button key={id} onClick={() => setMetric(id)}
              className={`orion-pill-filter ${metric === id ? "orion-pill-active" : ""}`}>{lbl}</button>
          ))}
        </div>
      </div>

      {/* SEÇÃO 1: 3 analysis KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* KPI 1: EBITDA Margin */}
        <div className="orion-card p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#475569] mb-2">EBITDA Margin — {lastM.month}</p>
          <div className="flex items-end justify-between">
            <p className="text-xl font-bold font-mono text-[#38bdf8]">{ebitdaMargin.toFixed(1)}%</p>
            <svg viewBox={`0 0 ${sparkW} ${sparkH}`} width={sparkW} height={sparkH}>
              <defs>
                <linearGradient id="analSparkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon
                points={`0,${sparkH} ${sparkPts} ${sparkW},${sparkH}`}
                fill="url(#analSparkGrad)"
              />
              <polyline points={sparkPts} fill="none" stroke="#38bdf8" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="text-[10px] text-[#475569] mt-1">últimos 6 meses · meta 17%</p>
        </div>

        {/* KPI 2: Revenue growth */}
        <div className="orion-card p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#475569] mb-2">Crescimento Receita</p>
          <p className="text-xl font-bold font-mono" style={{ color: revGrowth >= 0 ? "#22c55e" : "#f43f5e" }}>
            {revGrowth >= 0 ? "+" : ""}{revGrowth.toFixed(1)}%
          </p>
          <p className="text-[10px] text-[#475569] mt-1">
            {firstM.month} → {lastM.month} · {formatCurrency(firstM.revenue)} → {formatCurrency(lastM.revenue)}
          </p>
          <div className="mt-2 h-1 rounded-full bg-[#1a2540]">
            <div className="h-full rounded-full bg-[#22c55e]"
              style={{ width: `${Math.min(Math.abs(revGrowth), 100)}%` }} />
          </div>
        </div>

        {/* KPI 3: Revenue per employee */}
        <div className="orion-card p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#475569] mb-2">Receita por Colaborador</p>
          <p className="text-xl font-bold font-mono text-[#a78bfa]">{formatCurrency(revPerEmp)}</p>
          <p className="text-[10px] text-[#475569] mt-1">
            {formatCurrency(revYtd)} ÷ {lastM.headcount} colaboradores
          </p>
        </div>
      </div>

      {/* SEÇÃO 2: Chart based on active metric */}
      {metric === "receita" && <RevenueStackedArea monthlyMetrics={monthlyMetrics} />}
      {metric === "margem"  && <MarginBarChart     monthlyMetrics={monthlyMetrics} />}
      {metric === "budget"  && <BudgetVsActual     budgetLines={budgetLines} />}

      {/* SEÇÃO 3: Two-column charts (when not active via tabs — show both for context) */}
      {metric === "receita" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MarginBarChart monthlyMetrics={monthlyMetrics} />
          <BudgetVsActual budgetLines={budgetLines} />
        </div>
      )}

      {/* SEÇÃO 4: Segment analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Segment table */}
        <div className="orion-card overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1a2540]">
            <h3 className="text-sm font-semibold text-[#cbd5e1]">Análise por Segmento</h3>
            <p className="text-[10px] mt-0.5 text-[#475569]">Receitas pagas por categoria</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left" style={{ minWidth: 380 }}>
              <thead>
                <tr className="border-b border-[#1a2540]">
                  {["Segmento","Receita","% Total","YoY","Margem Est."].map(c => (
                    <th key={c} className="px-4 py-2.5 text-[9px] uppercase tracking-wider text-[#475569] font-medium">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {segmentData.slice(0, 8).map(s => (
                  <tr key={s.segment} className="orion-table-row">
                    <td className="px-4 py-2.5 text-xs text-[#94a3b8] capitalize">{s.segment}</td>
                    <td className="px-4 py-2.5 text-[11px] font-mono text-[#6366f1] tabular-nums">{formatCurrency(s.revenue)}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="h-1 rounded-full bg-[#1a2540] w-14">
                          <div className="h-full rounded-full bg-[#6366f1]" style={{ width: `${s.pct}%` }} />
                        </div>
                        <span className="text-[10px] font-mono text-[#475569]">{s.pct.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-[10px] font-mono tabular-nums"
                      style={{ color: s.yoy >= 0 ? "#22c55e" : "#f43f5e" }}>
                      {s.yoy >= 0 ? "+" : ""}{s.yoy}%
                    </td>
                    <td className="px-4 py-2.5 text-[10px] font-mono tabular-nums"
                      style={{ color: s.margin >= 25 ? "#22c55e" : s.margin >= 20 ? "#f59e0b" : "#f43f5e" }}>
                      {s.margin}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance heatmap */}
        <div className="orion-card p-5">
          <h3 className="text-sm font-semibold text-[#cbd5e1] mb-1">Performance Semanal</h3>
          <p className="text-[10px] text-[#475569] mb-4">Intensidade de receita por dia — Jan a Dez</p>

          <div className="flex gap-1">
            {HEATMAP.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((val, di) => (
                  <div
                    key={di}
                    className="w-3 h-3 rounded-sm transition-colors"
                    style={{ backgroundColor: heatColor(val) }}
                    title={val === 0 ? "Fim de semana" : `Intensidade ${val}/8`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Heatmap legend */}
          <div className="flex items-center gap-1.5 mt-4">
            <span className="text-[9px] text-[#334155]">Baixo</span>
            {[1,2,3,4,5,6,7,8].map(v => (
              <div key={v} className="w-3 h-3 rounded-sm" style={{ backgroundColor: heatColor(v) }} />
            ))}
            <span className="text-[9px] text-[#334155]">Alto</span>
          </div>
        </div>
      </div>

      {/* Monthly summary table */}
      <div className="orion-card overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1a2540]">
          <h3 className="text-sm font-semibold text-[#cbd5e1]">Sumário Mensal</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ minWidth: 600 }}>
            <thead>
              <tr className="border-b border-[#1a2540]">
                {["Mês","Receita Bruta","Lucro Bruto","EBITDA","Marg. EBITDA","Lucro Líquido","Marg. Líq."].map(col => (
                  <th key={col} className="px-4 py-3 text-[10px] uppercase tracking-wider font-medium text-[#475569]">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...monthlyMetrics].reverse().map(d => {
                const isCur = d.month === lastM.month;
                return (
                  <tr key={d.month} className="border-b border-[#1a2540]"
                    style={{ backgroundColor: isCur ? "rgba(99,102,241,0.06)" : "transparent" }}>
                    <td className="px-4 py-2.5 text-xs font-medium" style={{ color: isCur ? "#cbd5e1" : "#94a3b8" }}>
                      {d.month}/26
                    </td>
                    <td className="px-4 py-2.5 text-[11px] font-mono tabular-nums text-[#6366f1]">{formatCurrency(d.revenue)}</td>
                    <td className="px-4 py-2.5 text-[11px] font-mono tabular-nums text-[#22c55e]">{formatCurrency(d.grossProfit)}</td>
                    <td className="px-4 py-2.5 text-[11px] font-mono tabular-nums text-[#38bdf8]">{formatCurrency(d.ebitda)}</td>
                    <td className="px-4 py-2.5 text-[11px] font-mono tabular-nums text-[#38bdf8]">{((d.ebitda/d.revenue)*100).toFixed(1)}%</td>
                    <td className="px-4 py-2.5 text-[11px] font-mono tabular-nums text-[#a78bfa]">{formatCurrency(d.netIncome)}</td>
                    <td className="px-4 py-2.5 text-[11px] font-mono tabular-nums text-[#a78bfa]">{((d.netIncome/d.revenue)*100).toFixed(1)}%</td>
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
