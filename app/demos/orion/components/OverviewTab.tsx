"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldAlert, AlertTriangle, Info } from "lucide-react";
import type { OrionAlert, ActivityItem, MonthlyMetric, Product } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import type { OrionTab } from "../types/orion.types";
import { KpiSparkCard } from "./KpiSparkCard";
import { AlertBanner } from "./AlertBanner";
import { ActivityStream } from "./ActivityStream";

interface OverviewTabProps {
  revenueSparkline: number[];
  ebitdaSparkline: number[];
  cashSparkline: number[];
  activeAlerts: OrionAlert[];
  stockAlerts: Product[];
  activities: ActivityItem[];
  monthlyMetrics: MonthlyMetric[];
  revenueMonth: number;
  revenuePrev: number;
  ebitdaMonth: number;
  ebitdaMarginPct: number;
  cashPosition: number;
  cashChange7d: number;
  headcountActive: number;
  onNavigate: (tab: OrionTab) => void;
  onNotifOpen: () => void;
  onResolve: (id: string) => void;
}

const MONTHS_SHORT = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

export function OverviewTab({
  revenueSparkline, ebitdaSparkline, cashSparkline, activeAlerts, stockAlerts,
  activities, monthlyMetrics, revenueMonth, revenuePrev, ebitdaMonth, ebitdaMarginPct,
  cashPosition, cashChange7d, headcountActive, onNavigate, onNotifOpen, onResolve,
}: OverviewTabProps) {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const last6 = monthlyMetrics.slice(-6);
  const maxRev = Math.max(...last6.map(m => m.revenue));
  const minRev = Math.min(...last6.map(m => m.revenue));
  const rangeRev = maxRev - minRev || 1;

  const revChange = ((revenueMonth - revenuePrev) / revenuePrev) * 100;
  const headcountSpark = monthlyMetrics.map(m => m.headcount);

  // Top 5 pending due soon
  const pending = [
    { desc: "Capacitor SMD — TX-0037", counterparty: "Alfa Componentes SMD", dueDate: "2026-05-22", amount: 280_000 },
    { desc: "Energia CPFL — TX-0038",  counterparty: "CPFL Energia",          dueDate: "2026-05-15", amount: 18_400  },
    { desc: "NF-e 004.218 vencida",    counterparty: "Eletro Componentes",    dueDate: "2026-05-12", amount: 245_000 },
    { desc: "Azure licenças — TX-0040",counterparty: "Microsoft Brasil",       dueDate: "2026-05-20", amount: 14_800  },
    { desc: "TechService — TX-0039",   counterparty: "TechService Manutenção", dueDate: "2026-05-28", amount: 22_400  },
  ];

  const criticalCount  = activeAlerts.filter(a => a.severity === "critical" && !a.resolved).length;
  const warningCount   = activeAlerts.filter(a => a.severity === "warning" && !a.resolved).length;
  const infoCount      = activeAlerts.filter(a => a.severity === "info" && !a.resolved).length;

  return (
    <div className="p-6 space-y-6">
      {/* AlertBanner */}
      <AlertBanner alerts={activeAlerts} onNavigate={onNotifOpen} />

      {/* ROW 1: KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiSparkCard
          title="Receita do Mês"
          value={formatCurrency(revenueMonth)}
          change={revChange}
          trend={revChange >= 0 ? "up" : "down"}
          trendGood={true}
          sparkline={revenueSparkline}
          icon="TrendingUp"
          accentColor="green"
          subtitle="vs. mês anterior"
          onClick={() => onNavigate("analytics")}
        />
        <KpiSparkCard
          title="EBITDA"
          value={formatCurrency(ebitdaMonth)}
          change={ebitdaMarginPct}
          trend="up"
          trendGood={true}
          sparkline={ebitdaSparkline}
          icon="BarChart3"
          accentColor="indigo"
          subtitle={`margem ${ebitdaMarginPct.toFixed(1)}%`}
          onClick={() => onNavigate("financeiro")}
        />
        <KpiSparkCard
          title="Posição de Caixa"
          value={formatCurrency(cashPosition)}
          change={(cashChange7d / cashPosition) * 100}
          trend="up"
          trendGood={true}
          sparkline={cashSparkline}
          icon="Landmark"
          accentColor="sky"
          subtitle="projeção +7 dias"
          onClick={() => onNavigate("tesouraria")}
        />
        <KpiSparkCard
          title="Headcount"
          value={headcountActive.toString()}
          change={5.3}
          trend="up"
          trendGood={true}
          sparkline={headcountSpark}
          icon="Users"
          accentColor="violet"
          subtitle="colaboradores ativos"
          onClick={() => onNavigate("pessoas")}
        />
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mini Revenue Chart (col 1-2) */}
        <div className="lg:col-span-2 orion-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#cbd5e1]">Receita & EBITDA — 2026</h3>
            <div className="flex items-center gap-3 text-[10px] text-[#475569]">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-indigo-500" /><span>Receita</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-1 rounded bg-green-400" /><span>EBITDA</span></div>
            </div>
          </div>

          <div className="relative" style={{ height: 140 }}>
            <svg viewBox="0 0 500 140" width="100%" height="140" onMouseLeave={() => setHoveredMonth(null)}>
              {/* Grid lines */}
              {[0, 0.33, 0.66, 1].map((f, fi) => (
                <g key={fi}>
                  <line x1="40" y1={10 + f * 100} x2="490" y2={10 + f * 100} stroke="#1a2540" strokeWidth="1" />
                  <text x="36" y={14 + f * 100} textAnchor="end" fill="#334155" fontSize="8">
                    {((maxRev - f * rangeRev) / 1_000_000).toFixed(1)}M
                  </text>
                </g>
              ))}

              {/* Bars + EBITDA line */}
              {last6.map((m, i) => {
                const barW = 50;
                const spacing = (490 - 40) / last6.length;
                const x = 40 + i * spacing + spacing / 2 - barW / 2;
                const barH = ((m.revenue - minRev) / rangeRev) * 90 + 10;
                const barY = 110 - barH;
                const isHov = hoveredMonth === i;
                return (
                  <g key={m.month} onMouseEnter={() => setHoveredMonth(i)}>
                    <rect
                      x={x} y={barY} width={barW} height={barH}
                      rx={3} fill={isHov ? "#6366f1" : "#6366f140"}
                    />
                    <text x={x + barW / 2} y={130} textAnchor="middle" fill={isHov ? "#a5b4fc" : "#334155"} fontSize="9">
                      {m.month}
                    </text>
                  </g>
                );
              })}

              {/* EBITDA polyline */}
              {(() => {
                const spacing = (490 - 40) / last6.length;
                const pts = last6.map((m, i) => {
                  const cx = 40 + i * spacing + spacing / 2;
                  const cy = 110 - ((m.ebitda - (minRev * 0.14)) / rangeRev) * 90;
                  return `${cx},${Math.max(12, Math.min(108, cy))}`;
                });
                return <polyline points={pts.join(" ")} fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />;
              })()}

              {/* Tooltip */}
              {hoveredMonth !== null && (() => {
                const m = last6[hoveredMonth];
                const spacing = (490 - 40) / last6.length;
                const cx = 40 + hoveredMonth * spacing + spacing / 2;
                const tx = cx > 250 ? cx - 106 : cx + 6;
                return (
                  <g>
                    <rect x={tx} y={12} width={102} height={52} rx={4} fill="#0d1628" stroke="#1a2540" strokeWidth={1} />
                    <text x={tx+51} y={27} textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="600">{m.month}/26</text>
                    <text x={tx+51} y={39} textAnchor="middle" fill="#6366f1" fontSize="8" fontFamily="monospace">{(m.revenue/1e6).toFixed(2)}M rec.</text>
                    <text x={tx+51} y={51} textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="monospace">
                      {(m.ebitda/1e6).toFixed(2)}M · {(m.ebitda/m.revenue*100).toFixed(1)}%
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>

        {/* Alert summary (col 3) */}
        <div className="orion-card p-5 flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-[#cbd5e1]">Resumo de Alertas</h3>
          {[
            { icon: ShieldAlert, label: "Críticos", count: criticalCount, color: "text-red-400",   bg: "bg-red-400/10"   },
            { icon: AlertTriangle,label: "Avisos",  count: warningCount,  color: "text-amber-400", bg: "bg-amber-400/10" },
            { icon: Info,          label: "Info",   count: infoCount,     color: "text-sky-400",   bg: "bg-sky-400/10"   },
          ].map(({ icon: Icon, label, count, color, bg }) => (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-1 rounded ${bg}`}><Icon size={12} className={color} /></div>
                <span className="text-xs text-[#94a3b8]">{label}</span>
              </div>
              <span className={`text-sm font-bold ${color}`}>{count}</span>
            </div>
          ))}

          <button
            onClick={onNotifOpen}
            className="flex items-center justify-center gap-1.5 text-xs text-[#475569] hover:text-[#cbd5e1] transition-colors py-1 border border-[#1a2540] rounded-lg"
          >
            Ver notificações <ArrowRight size={11} />
          </button>

          <div className="border-t border-[#1a2540] pt-3">
            <p className="text-[10px] uppercase tracking-wider text-[#475569] mb-2">Estoque Crítico</p>
            <div className="space-y-2">
              {stockAlerts.slice(0, 3).map(p => {
                const pct = (p.stock / p.minStock) * 100;
                return (
                  <div key={p.id}>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="text-[#94a3b8] truncate">{p.name}</span>
                      <span className="text-[#475569] shrink-0 ml-2">{p.stock}/{p.minStock}</span>
                    </div>
                    <div className="h-1 rounded-full bg-[#1a2540] overflow-hidden">
                      <div className="h-full rounded-full bg-red-500" style={{ width: `${Math.min(pct, 100)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity (col 1-2) */}
        <div className="lg:col-span-2">
          <ActivityStream activities={activities} />
        </div>

        {/* Upcoming (col 3) */}
        <div className="orion-card p-5 flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-[#cbd5e1]">Vencimentos Próximos</h3>
          <div className="space-y-0 flex-1">
            {pending.map((p, i) => {
              const isOverdue = p.dueDate < "2026-05-17";
              return (
                <div key={i} className="py-2.5 border-b border-[#1a2540] last:border-b-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#cbd5e1] truncate">{p.desc}</p>
                      <p className="text-[10px] text-[#475569] mt-0.5 truncate">{p.counterparty}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-[10px] ${isOverdue ? "text-red-400" : "text-[#475569]"}`}>{p.dueDate.split("-").reverse().join("/")}</p>
                      <p className="text-xs font-mono font-semibold text-[#f43f5e]">-{formatCurrency(p.amount)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate("financeiro")}
            className="flex items-center justify-center gap-1.5 text-xs text-[#475569] hover:text-[#cbd5e1] transition-colors py-1.5 border border-[#1a2540] rounded-lg"
          >
            Ver Financeiro <ArrowRight size={11} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
