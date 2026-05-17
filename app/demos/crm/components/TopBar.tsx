"use client";

import { useState } from "react";
import { Search, Bell, Plus, X } from "lucide-react";
import type { CrmTab } from "../types/crm.types";
import { NAV_ITEMS } from "../types/crm.types";
import { activities } from "@/data/crm";

const alerts = activities.filter(a => a.type === "alerta").slice(0, 2);

export function TopBar({ activeTab, onTabChange }: { activeTab: CrmTab; onTabChange: (t: CrmTab) => void }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const label = NAV_ITEMS.find(n => n.id === activeTab)?.label ?? "";

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(9,14,27,0.8)] backdrop-blur-md relative z-20">
      {/* Breadcrumb */}
      <div className="hidden md:flex items-center text-sm">
        <span className="text-[#475569]">Nexus</span>
        <span className="text-[#1e293b] mx-2">/</span>
        <span className="text-[#f1f5f9] font-medium">{label}</span>
      </div>

      {/* Mobile tab pills */}
      <div className="flex md:hidden flex-1 overflow-x-auto gap-1 scrollbar-none pr-2">
        {NAV_ITEMS.map(({ id, label: lbl }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === id
                ? "bg-[#3b82f6] text-white"
                : "bg-[rgba(255,255,255,0.04)] text-[#64748b]"
            }`}
          >
            {lbl}
          </button>
        ))}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative flex items-center">
          {searchOpen ? (
            <div className="flex items-center gap-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#475569] pointer-events-none" />
                <input
                  autoFocus
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  placeholder="Buscar cliente, negócio..."
                  className="w-48 h-8 pl-8 pr-3 rounded-lg bg-[#111827] border border-[rgba(255,255,255,0.08)] text-xs text-[#f1f5f9] placeholder:text-[#334155] focus:outline-none focus:border-[rgba(59,130,246,0.4)] transition-colors"
                />
              </div>
              <button
                onClick={() => { setSearchOpen(false); setSearchVal(""); }}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#475569] hover:text-[#f1f5f9] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-[#475569] hover:text-[#f1f5f9] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(o => !o)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#475569] hover:text-[#f1f5f9] hover:bg-[rgba(255,255,255,0.04)] transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            {alerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#f43f5e] text-[9px] font-bold text-white flex items-center justify-center leading-none">
                {alerts.length}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute top-11 right-0 w-72 bg-[#0c1220] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 shadow-xl z-30">
              <p className="text-xs font-semibold text-[#f1f5f9] mb-3">Alertas</p>
              <div className="flex flex-col gap-3">
                {alerts.map(alert => (
                  <div key={alert.id} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f43f5e] mt-1.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#94a3b8] leading-snug">{alert.text}</p>
                      <p className="text-[10px] text-[#475569] mt-0.5">{alert.time}</p>
                    </div>
                    <button className="text-[10px] text-[#3b82f6] hover:underline shrink-0">Ver</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* New button */}
        <button
          onClick={() => onTabChange("pipeline")}
          className="h-8 px-3 bg-[#3b82f6] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 hover:bg-[#2563eb] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Novo
        </button>
      </div>
    </header>
  );
}
