"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, Kanban, BarChart2, UserCheck,
  Settings, LogOut, ChevronLeft, ChevronRight,
} from "lucide-react";
import type { CrmTab } from "../types/crm.types";
import { NAV_ITEMS } from "../types/crm.types";

const ICON_MAP = { LayoutDashboard, Users, Kanban, BarChart2, UserCheck } as const;

export function Sidebar({ activeTab, onTabChange }: { activeTab: CrmTab; onTabChange: (t: CrmTab) => void }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden md:flex shrink-0 flex-col bg-[#090e1b] border-r border-[rgba(255,255,255,0.06)] transition-all duration-200 ${collapsed ? "w-14" : "w-56"}`}
    >
      {/* Logo + collapse toggle */}
      <div className="h-16 flex items-center justify-between px-3 border-b border-[rgba(255,255,255,0.06)] shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#3b82f6] flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">N</span>
          </div>
          {!collapsed && (
            <span className="text-sm font-bold text-[#f1f5f9] truncate">NEXUS</span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(c => !c)}
          className="w-6 h-6 flex items-center justify-center rounded text-[#475569] hover:text-[#f1f5f9] transition-colors shrink-0"
          title={collapsed ? "Expandir" : "Recolher"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map(({ id, label, icon }) => {
          const isActive = activeTab === id;
          const IconComp = ICON_MAP[icon as keyof typeof ICON_MAP];
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              title={collapsed ? label : undefined}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-[rgba(59,130,246,0.12)] text-[#3b82f6] font-medium crm-nav-active"
                  : "text-[#64748b] hover:text-[#f1f5f9] hover:bg-[rgba(255,255,255,0.04)]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute left-0 inset-y-0 w-0.5 bg-[#3b82f6] rounded-r-full"
                />
              )}
              {IconComp && <IconComp className="w-[18px] h-[18px] shrink-0" />}
              {!collapsed && label}
            </button>
          );
        })}

        <div className="border-t border-[rgba(255,255,255,0.06)] my-2" />

        <button
          title={collapsed ? "Configurações" : undefined}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#475569] hover:text-[#f1f5f9] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
        >
          <Settings className="w-[18px] h-[18px] shrink-0" />
          {!collapsed && "Configurações"}
        </button>
      </nav>

      {/* User footer */}
      <div className="border-t border-[rgba(255,255,255,0.06)] p-3 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-white">AC</span>
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#f1f5f9] truncate">Ana Cavalcante</p>
            <p className="text-[10px] text-[#475569]">Gerente Senior</p>
          </div>
        )}
        {!collapsed && (
          <button className="ml-auto text-[#475569] hover:text-[#f43f5e] transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
}
