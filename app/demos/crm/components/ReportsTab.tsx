"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { teamMembers } from "@/data/crm";
import { formatBRL } from "@/data/crm";
import type { ReportPeriod } from "../types/crm.types";
import { RevenueChart } from "./RevenueChart";

const PERIODS: { value: ReportPeriod; label: string }[] = [
  { value: "mes",       label: "Este Mês" },
  { value: "trimestre", label: "Trimestre" },
  { value: "semestre",  label: "Semestre" },
  { value: "ano",       label: "Ano" },
];

const PERIOD_REVENUE: Record<ReportPeriod, string> = {
  mes:       "R$ 1,29M",
  trimestre: "R$ 3,86M",
  semestre:  "R$ 6,81M",
  ano:       "R$ 13,59M",
};

const SEGMENTS = [
  { key: "Private",   value: 338000, pct: 26.1, color: "#3b82f6" },
  { key: "Corporate", value: 351000, pct: 27.2, color: "#8b5cf6" },
  { key: "PME",       value: 222000, pct: 17.2, color: "#06b6d4" },
  { key: "Varejo",    value: 381000, pct: 29.5, color: "#10b981" },
] as const;

const FUNNEL = [
  { label: "Prospecção",   pct: 100, value: "R$73,5M", count: 13 },
  { label: "Qualificação", pct: 76,  value: "R$55,9M", count: 10 },
  { label: "Proposta",     pct: 58,  value: "R$42,7M", count: 7  },
  { label: "Negociação",   pct: 38,  value: "R$27,9M", count: 5  },
  { label: "Fechamento",   pct: 26,  value: "R$18,8M", count: 3  },
];

const FUNNEL_COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd"];

interface ReportsTabProps {
  period: ReportPeriod;
  onPeriodChange: (p: ReportPeriod) => void;
  chartType: "barras" | "linha";
  onChartTypeChange: (t: "barras" | "linha") => void;
}

export function ReportsTab({ period, onPeriodChange, chartType, onChartTypeChange }: ReportsTabProps) {
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExported(true);
      setTimeout(() => setExported(false), 1000);
    }, 2000);
  };

  const sorted = [...teamMembers].sort((a, b) => b.revenueActual - a.revenueActual);

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold text-[#f1f5f9]">Relatórios de Performance</h2>
          <p className="text-xs text-[#64748b] mt-0.5">Desempenho comercial consolidado</p>
        </div>
        <div className="flex items-center gap-2">
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
          <button
            onClick={handleExport}
            className="h-8 px-3 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded-lg text-xs text-[#94a3b8] hover:text-[#f1f5f9] flex items-center gap-1.5 transition-colors"
          >
            {exporting ? (
              <><Loader2 className="w-3 h-3 animate-spin" />Exportando...</>
            ) : exported ? (
              <><CheckCircle2 className="w-3 h-3 text-[#10b981]" />Exportado!</>
            ) : (
              <>⬇ Exportar</>
            )}
          </button>
        </div>
      </div>

      {/* KPI mini-cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
          <p className="text-[10px] text-[#475569] uppercase tracking-wider mb-1">Receita Acumulada</p>
          <p className="text-2xl font-bold text-[#f1f5f9]">{PERIOD_REVENUE[period]}</p>
          <p className="text-[11px] text-[#475569] mt-1">no período selecionado</p>
        </div>
        <div className="bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
          <p className="text-[10px] text-[#475569] uppercase tracking-wider mb-1">Ticket Médio</p>
          <p className="text-2xl font-bold text-[#f1f5f9]">R$ 4,2M</p>
          <p className="text-[11px] text-[#475569] mt-1">por negócio fechado</p>
        </div>
        <div className="bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
          <p className="text-[10px] text-[#475569] uppercase tracking-wider mb-2">Taxa de Conversão</p>
          <p className="text-2xl font-bold text-[#f1f5f9]">34,2%</p>
          <div className="mt-2 h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
            <div className="h-full bg-[#3b82f6] rounded-full" style={{ width: "34.2%" }} />
          </div>
        </div>
      </div>

      {/* Revenue chart */}
      <RevenueChart period="mes" chartType={chartType} onChartTypeChange={onChartTypeChange} />

      {/* Two panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Receita por Segmento */}
        <div className="bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#f1f5f9] mb-4">Receita por Segmento</h3>
          <div className="space-y-4">
            {SEGMENTS.map(({ key, value, pct, color }) => (
              <div key={key}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#94a3b8]">{key}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#475569]">{formatBRL(value)}</span>
                    <span className="font-semibold text-[#f1f5f9] w-10 text-right">{pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funil de Conversão */}
        <div className="bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#f1f5f9] mb-4">Funil de Conversão</h3>
          <div className="space-y-2">
            {FUNNEL.map(({ label, pct, value, count }, i) => (
              <div key={label}>
                {i > 0 && (
                  <p className="text-[10px] text-[#475569] text-right mb-1">
                    → {FUNNEL[i].pct}%
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="text-[#94a3b8]">{label}</span>
                      <span className="text-[#475569]">{value} / {count} neg.</span>
                    </div>
                    <div className="h-5 bg-[rgba(255,255,255,0.04)] rounded overflow-hidden">
                      <div
                        className="h-full rounded flex items-center justify-end pr-2"
                        style={{ width: `${pct}%`, backgroundColor: FUNNEL_COLORS[i] + "40" }}
                      >
                        <span className="text-[9px] font-semibold" style={{ color: FUNNEL_COLORS[i] }}>{pct}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance table */}
      <div className="bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
          <h3 className="text-sm font-semibold text-[#f1f5f9]">Performance por Gerente</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)]">
              {["Gerente", "Receita", "Meta", "Cumprimento", "Ganhos", "Conversão"].map(col => (
                <th key={col} className="px-4 py-3 text-[10px] text-[#475569] uppercase tracking-wider font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map(m => {
              const pct = (m.revenueActual / m.revenueTarget) * 100;
              const barColor = pct >= 100 ? "#10b981" : pct >= 80 ? "#f59e0b" : "#f43f5e";
              return (
                <tr key={m.id} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                        style={{ backgroundColor: m.avatarColor + "28", color: m.avatarColor }}
                      >
                        {m.initials}
                      </div>
                      <span className="text-xs text-[#f1f5f9] font-medium">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#f1f5f9] font-mono">{formatBRL(m.revenueActual)}</td>
                  <td className="px-4 py-3 text-xs text-[#475569] font-mono">{formatBRL(m.revenueTarget)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-24 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: barColor }} />
                      </div>
                      <span className="text-xs font-semibold" style={{ color: barColor }}>{pct.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#94a3b8]">{m.dealsWon}</td>
                  <td className="px-4 py-3 text-xs text-[#94a3b8]">{m.conversionRate}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
