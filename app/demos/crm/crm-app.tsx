"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3, Users, Phone, Mail, Calendar, FileText, TrendingUp, TrendingDown,
  Search, Bell, ChevronRight, X, Plus, Circle,
} from "lucide-react";
import { deals, activities, kpis, stageLabels, type Deal, type DealStage } from "@/data/crm";
import { formatCurrency } from "@/lib/utils";

const STAGES: DealStage[] = ["lead", "qualified", "proposal", "negotiation", "closed"];

const stageColors: Record<DealStage, string> = {
  lead: "bg-slate-700",
  qualified: "bg-blue-700/60",
  proposal: "bg-violet-700/60",
  negotiation: "bg-amber-700/60",
  closed: "bg-emerald-700/60",
};

const activityIcon: Record<string, React.ElementType> = {
  call: Phone, email: Mail, meeting: Calendar, note: FileText,
};

function DealCard({ deal, onClick }: { deal: Deal; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111120] border border-white/8 rounded-xl p-3.5 cursor-pointer hover:border-white/16 transition-all duration-200 group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="text-xs font-bold text-white truncate">{deal.company}</p>
          <p className="text-[10px] text-white/40">{deal.contact}</p>
        </div>
        <div className="w-6 h-6 rounded-full bg-[var(--primary-light)] flex items-center justify-center text-[9px] font-black text-[var(--primary)] shrink-0">
          {deal.avatar}
        </div>
      </div>
      <p className="text-sm font-black text-white mb-2">{formatCurrency(deal.value)}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="h-1.5 w-16 bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--primary)] rounded-full transition-all"
              style={{ width: `${deal.probability}%` }}
            />
          </div>
          <span className="text-[10px] text-white/30">{deal.probability}%</span>
        </div>
        <span className="text-[10px] text-white/30">{deal.lastActivity}</span>
      </div>
    </motion.div>
  );
}

function DealDetailPanel({ deal, onClose }: { deal: Deal; onClose: () => void }) {
  return (
    <motion.aside
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="absolute top-0 right-0 bottom-0 w-72 bg-[#0c0c1a] border-l border-white/8 flex flex-col z-20"
      role="complementary"
      aria-label="Deal details"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
        <h3 className="text-sm font-bold text-white">Deal Details</h3>
        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors" aria-label="Close">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div>
          <p className="text-xs text-white/40 mb-1">Company</p>
          <p className="text-base font-bold text-white">{deal.company}</p>
        </div>
        <div>
          <p className="text-xs text-white/40 mb-1">Contact</p>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[var(--primary-light)] flex items-center justify-center text-xs font-bold text-[var(--primary)]">
              {deal.avatar}
            </div>
            <p className="text-sm text-white">{deal.contact}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-white/40 mb-1">Value</p>
            <p className="text-sm font-black text-white">{formatCurrency(deal.value)}</p>
          </div>
          <div>
            <p className="text-xs text-white/40 mb-1">Probability</p>
            <p className="text-sm font-black text-[var(--primary)]">{deal.probability}%</p>
          </div>
          <div>
            <p className="text-xs text-white/40 mb-1">Stage</p>
            <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${stageColors[deal.stage]}`}>
              {stageLabels[deal.stage]}
            </span>
          </div>
          <div>
            <p className="text-xs text-white/40 mb-1">Owner</p>
            <p className="text-sm text-white">{deal.owner}</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-white/40 mb-2">Tags</p>
          <div className="flex flex-wrap gap-1.5">
            {deal.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/8 text-white/60">{tag}</span>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-white/8">
          <div className="flex gap-2">
            <button className="flex-1 h-8 rounded-lg bg-white/8 text-white/60 text-xs font-medium hover:bg-white/12 transition-colors flex items-center justify-center gap-1">
              <Phone className="w-3 h-3" /> Call
            </button>
            <button className="flex-1 h-8 rounded-lg bg-white/8 text-white/60 text-xs font-medium hover:bg-white/12 transition-colors flex items-center justify-center gap-1">
              <Mail className="w-3 h-3" /> Email
            </button>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

type CrmView = "pipeline" | "activity";

export function CrmApp() {
  const [view, setView] = useState<CrmView>("pipeline");
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [search, setSearch] = useState("");

  const filteredDeals = search
    ? deals.filter((d) => d.company.toLowerCase().includes(search.toLowerCase()) || d.contact.toLowerCase().includes(search.toLowerCase()))
    : deals;

  return (
    <div className="h-screen flex flex-col bg-[#08081a] text-white overflow-hidden">
      {/* Top bar */}
      <header className="shrink-0 flex items-center justify-between px-5 h-12 border-b border-white/8 bg-[#0a0a1f]">
        <div className="flex items-center gap-3">
          <span className="text-sm font-black tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>NEXUS</span>
          <div className="h-4 w-px bg-white/10" aria-hidden="true" />
          <nav className="flex gap-1" role="navigation">
            {(["pipeline", "activity"] as CrmView[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                  view === v ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                }`}
                aria-pressed={view === v}
              >
                {v === "pipeline" ? "Pipeline" : "Activity"}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
            <input
              type="search"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search deals"
              className="w-40 h-8 pl-8 pr-3 rounded-lg bg-white/6 border border-white/8 text-xs text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>
          <button
            className="w-8 h-8 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[var(--primary)]" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* KPIs */}
      <div className="shrink-0 grid grid-cols-4 gap-px bg-white/8 border-b border-white/8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-[#0a0a1f] px-4 py-3">
            <p className="text-[10px] text-white/40 mb-1">{kpi.label}</p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>{kpi.value}</p>
              <span className={`flex items-center gap-0.5 text-[10px] font-semibold ${kpi.positive ? "text-[var(--success)]" : "text-red-400"}`}>
                {kpi.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden relative">
        {view === "pipeline" ? (
          /* Kanban board */
          <div className="h-full overflow-x-auto">
            <div className="flex gap-3 p-4 h-full" style={{ minWidth: `${STAGES.length * 220}px` }}>
              {STAGES.map((stage) => {
                const stageDeals = filteredDeals.filter((d) => d.stage === stage);
                const stageValue = stageDeals.reduce((s, d) => s + d.value, 0);
                return (
                  <div key={stage} className="flex flex-col w-52 shrink-0">
                    {/* Column header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${stageColors[stage]}`} aria-hidden="true" />
                        <span className="text-xs font-semibold text-white/70">{stageLabels[stage]}</span>
                      </div>
                      <span className="text-[10px] text-white/30 font-mono">{stageDeals.length}</span>
                    </div>
                    <p className="text-[10px] text-white/25 mb-3 font-medium">{formatCurrency(stageValue)}</p>

                    {/* Cards */}
                    <div className="flex flex-col gap-2 overflow-y-auto flex-1">
                      {stageDeals.map((deal) => (
                        <DealCard
                          key={deal.id}
                          deal={deal}
                          onClick={() => setSelectedDeal(deal)}
                        />
                      ))}
                      <button className="flex items-center gap-1.5 text-xs text-white/20 hover:text-white/50 transition-colors py-2 px-1">
                        <Plus className="w-3.5 h-3.5" />
                        Add deal
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Activity feed */
          <div className="h-full overflow-y-auto p-5">
            <div className="max-w-lg mx-auto space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-white">Recent Activity</h2>
                <span className="text-xs text-white/30">{activities.length} events</span>
              </div>
              {activities.map((act) => {
                const Icon = activityIcon[act.type];
                return (
                  <div key={act.id} className="flex gap-3 p-4 rounded-xl bg-[#111120] border border-white/8 hover:border-white/16 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary-light)] flex items-center justify-center text-[10px] font-bold text-[var(--primary)] shrink-0">
                      {act.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-3 h-3 text-white/30" />
                        <span className="text-[10px] text-white/30 capitalize">{act.type}</span>
                        <span className="ml-auto text-[10px] text-white/20">{act.time}</span>
                      </div>
                      <p className="text-xs text-white/80 leading-relaxed">{act.description}</p>
                      <p className="text-[10px] text-[var(--primary)] mt-1">{act.contact}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Deal detail panel */}
        <AnimatePresence>
          {selectedDeal && (
            <DealDetailPanel
              deal={selectedDeal}
              onClose={() => setSelectedDeal(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
