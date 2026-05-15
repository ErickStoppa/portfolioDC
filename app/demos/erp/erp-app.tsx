"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight,
  Filter, Download, Bell, BarChart2, LayoutDashboard, FileText, Settings,
} from "lucide-react";
import { kpis, chartData, transactions, goals } from "@/data/erp";
import { formatCurrency } from "@/lib/utils";

const DATE_RANGES = ["Last 7 days", "Last 30 days", "This Quarter", "YTD", "Last Year"];

const MAX_REVENUE = Math.max(...chartData.map((d) => d.revenue));

type ErpView = "dashboard" | "transactions";

const statusStyles: Record<string, string> = {
  completed: "bg-[var(--success-light)] text-[var(--success)]",
  pending: "bg-[var(--warning-light)] text-[var(--warning)]",
  failed: "bg-[var(--error-light)] text-[var(--error)]",
};

export function ErpApp() {
  const [view, setView] = useState<ErpView>("dashboard");
  const [dateRange, setDateRange] = useState("This Quarter");
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">("all");

  const filteredTx = transactions.filter(
    (tx) => typeFilter === "all" || tx.type === typeFilter
  );

  return (
    <div className="h-screen flex bg-[#06060f] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-14 flex-col items-center py-4 border-r border-white/6 bg-[#08080f] gap-2">
        {[
          { Icon: LayoutDashboard, label: "Dashboard", v: "dashboard" as ErpView },
          { Icon: FileText, label: "Transactions", v: "transactions" as ErpView },
          { Icon: BarChart2, label: "Reports", v: null },
          { Icon: Settings, label: "Settings", v: null },
        ].map(({ Icon, label, v }) => (
          <button
            key={label}
            onClick={() => v && setView(v)}
            aria-label={label}
            aria-pressed={view === v}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              view === v
                ? "bg-[var(--primary-light)] text-[var(--primary)]"
                : "text-white/30 hover:text-white hover:bg-white/8"
            }`}
          >
            <Icon className="w-4.5 h-4.5" aria-hidden="true" style={{ width: 18, height: 18 }} />
          </button>
        ))}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="shrink-0 flex items-center justify-between px-5 h-12 border-b border-white/6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-black tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>APEX</span>
            <div className="h-4 w-px bg-white/10" aria-hidden="true" />
            <div className="flex gap-1">
              {(["dashboard", "transactions"] as ErpView[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                    view === v ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                  }`}
                >
                  {v === "dashboard" ? "Dashboard" : "Transactions"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Date range */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              aria-label="Date range"
              className="h-8 px-2 rounded-lg bg-white/6 border border-white/8 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            >
              {DATE_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <button className="w-8 h-8 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center text-white/40 hover:text-white transition-colors relative" aria-label="Notifications">
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[var(--primary)]" aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {view === "dashboard" ? (
            <div className="p-5 space-y-5 max-w-5xl mx-auto">
              {/* KPI cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {kpis.map((kpi, i) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="p-4 rounded-2xl border border-white/8 bg-[#0c0c1e]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] text-white/40 font-medium">{kpi.prefix}</p>
                      <DollarSign className="w-3.5 h-3.5 text-white/20" aria-hidden="true" />
                    </div>
                    <p className="text-xs text-white/60 mb-1">{kpi.label}</p>
                    <p className="text-xl font-black text-white mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                      {kpi.value}
                    </p>
                    <div className={`flex items-center gap-1 text-xs font-semibold ${kpi.positive ? "text-[var(--success)]" : "text-red-400"}`}>
                      {kpi.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {kpi.change} vs last period
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Revenue chart */}
              <div className="rounded-2xl border border-white/8 bg-[#0c0c1e] p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-sm font-bold text-white">Revenue vs Expenses</h3>
                    <p className="text-xs text-white/40">{dateRange}</p>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-white/40">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[var(--primary)]" aria-hidden="true" />Revenue</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />Expenses</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[var(--success)]" aria-hidden="true" />Profit</div>
                  </div>
                </div>
                {/* Custom bar chart */}
                <div className="flex items-end gap-3 h-40">
                  {chartData.map((d, i) => (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex items-end gap-0.5 h-32">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(d.revenue / MAX_REVENUE) * 100}%` }}
                          transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                          className="flex-1 bg-[var(--primary)] rounded-t-sm opacity-80"
                        />
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(d.expenses / MAX_REVENUE) * 100}%` }}
                          transition={{ delay: i * 0.08 + 0.05, duration: 0.5, ease: "easeOut" }}
                          className="flex-1 bg-[var(--accent)] rounded-t-sm opacity-70"
                        />
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(d.profit / MAX_REVENUE) * 100}%` }}
                          transition={{ delay: i * 0.08 + 0.1, duration: 0.5, ease: "easeOut" }}
                          className="flex-1 bg-[var(--success)] rounded-t-sm opacity-80"
                        />
                      </div>
                      <span className="text-[10px] text-white/30">{d.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom row: Goals + Recent transactions */}
              <div className="grid lg:grid-cols-2 gap-5">
                {/* Goals */}
                <div className="rounded-2xl border border-white/8 bg-[#0c0c1e] p-5">
                  <h3 className="text-sm font-bold text-white mb-4">Goals Progress</h3>
                  <div className="space-y-5">
                    {goals.map((goal) => {
                      const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
                      const display = goal.suffix
                        ? `${goal.current}${goal.suffix}`
                        : formatCurrency(goal.current);
                      const targetDisplay = goal.suffix
                        ? `${goal.target}${goal.suffix}`
                        : formatCurrency(goal.target);
                      return (
                        <div key={goal.label}>
                          <div className="flex items-center justify-between text-xs mb-2">
                            <span className="text-white/60">{goal.label}</span>
                            <span className="font-bold text-white">{display} <span className="text-white/30">/ {targetDisplay}</span></span>
                          </div>
                          <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full"
                            />
                          </div>
                          <p className="text-[10px] text-white/30 mt-1 text-right">{pct}% complete</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent transactions */}
                <div className="rounded-2xl border border-white/8 bg-[#0c0c1e] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white">Recent Transactions</h3>
                    <button onClick={() => setView("transactions")} className="text-[10px] text-[var(--primary)] hover:underline">
                      View all
                    </button>
                  </div>
                  <div className="space-y-3">
                    {transactions.slice(0, 4).map((tx) => (
                      <div key={tx.id} className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          tx.type === "income" ? "bg-[var(--success-light)]" : "bg-[var(--error-light)]"
                        }`}>
                          {tx.type === "income"
                            ? <ArrowUpRight className="w-3.5 h-3.5 text-[var(--success)]" />
                            : <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white truncate">{tx.description}</p>
                          <p className="text-[10px] text-white/30">{tx.date}</p>
                        </div>
                        <span className={`text-xs font-bold ${tx.type === "income" ? "text-[var(--success)]" : "text-red-400"}`}>
                          {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Transactions view */
            <div className="p-5 max-w-4xl mx-auto">
              {/* Toolbar */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-1 bg-white/6 border border-white/8 rounded-xl p-1">
                  {(["all", "income", "expense"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setTypeFilter(f)}
                      aria-pressed={typeFilter === f}
                      className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                        typeFilter === f ? "bg-white/12 text-white" : "text-white/40 hover:text-white"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <div className="ml-auto flex gap-2">
                  <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white/6 border border-white/8 text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors" aria-label="Filter transactions">
                    <Filter className="w-3 h-3" />
                    Filter
                  </button>
                  <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white/6 border border-white/8 text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors" aria-label="Export transactions">
                    <Download className="w-3 h-3" />
                    Export
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="rounded-2xl border border-white/8 overflow-hidden">
                <table className="w-full text-xs" role="table">
                  <thead>
                    <tr className="border-b border-white/8 bg-white/4">
                      <th className="text-left px-4 py-3 text-white/40 font-medium">Description</th>
                      <th className="text-left px-4 py-3 text-white/40 font-medium hidden sm:table-cell">Category</th>
                      <th className="text-left px-4 py-3 text-white/40 font-medium hidden md:table-cell">Date</th>
                      <th className="text-left px-4 py-3 text-white/40 font-medium">Status</th>
                      <th className="text-right px-4 py-3 text-white/40 font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTx.map((tx, i) => (
                      <motion.tr
                        key={tx.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-white/4 hover:bg-white/4 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                              tx.type === "income" ? "bg-[var(--success-light)]" : "bg-[var(--error-light)]"
                            }`}>
                              {tx.type === "income"
                                ? <ArrowUpRight className="w-3 h-3 text-[var(--success)]" />
                                : <ArrowDownRight className="w-3 h-3 text-red-400" />
                              }
                            </div>
                            <span className="text-white font-medium truncate max-w-[180px]">{tx.description}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-white/40 hidden sm:table-cell">{tx.category}</td>
                        <td className="px-4 py-3 text-white/40 hidden md:table-cell">{tx.date}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${statusStyles[tx.status]}`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className={`px-4 py-3 text-right font-black ${tx.type === "income" ? "text-[var(--success)]" : "text-red-400"}`}>
                          {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-white/20 mt-4 text-center">
                Showing {filteredTx.length} of {transactions.length} transactions
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
