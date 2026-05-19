"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FileText, Landmark, TrendingUp, Package, Users,
  Settings, HelpCircle, LogOut, type LucideIcon,
} from "lucide-react";
import { NAV_ITEMS, type OrionTab } from "../types/orion.types";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard, FileText, Landmark, TrendingUp, Package, Users,
};

interface SidebarProps {
  collapsed: boolean;
  activeTab: OrionTab;
  onTabChange: (t: OrionTab) => void;
  onToggle: () => void;
  activeAlertsCount: number;
  stockCriticalCount: number;
}

export function Sidebar({
  collapsed, activeTab, onTabChange, onToggle,
  activeAlertsCount, stockCriticalCount,
}: SidebarProps) {
  const badgeCount = { alerts: activeAlertsCount, stockCritical: stockCriticalCount };

  return (
    <motion.aside
      animate={{ width: collapsed ? 60 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex flex-col h-full bg-[#080f20] border-r border-[#1a2540] shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <button
        onClick={onToggle}
        className="h-14 flex items-center gap-3 px-4 border-b border-[#1a2540] w-full hover:bg-white/4 transition-colors shrink-0"
      >
        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
          O
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="text-[13px] font-bold tracking-[0.2em] text-white whitespace-nowrap overflow-hidden"
            >
              ORION
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-0.5 overflow-hidden">
        {!collapsed && (
          <p className="text-[10px] font-semibold tracking-widest text-[#334155] uppercase px-2 mb-2">
            Módulos
          </p>
        )}

        {NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const isActive = activeTab === item.id;
          const count = item.badge ? badgeCount[item.badge] : 0;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              title={collapsed ? item.label : undefined}
              className={cn(
                "orion-nav-item w-full relative",
                isActive && "orion-nav-active",
                collapsed && "justify-center px-0",
              )}
            >
              {Icon && <Icon size={16} className="shrink-0" />}
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {count > 0 && (
                <span
                  className={cn(
                    "absolute top-1 right-1 flex items-center justify-center rounded-full text-[9px] font-bold text-white",
                    item.badge === "alerts" ? "bg-red-500" : "bg-amber-500",
                    collapsed ? "w-4 h-4" : "w-4 h-4",
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}

        <div className="h-px bg-[#1a2540] my-2" />

        {!collapsed && (
          <p className="text-[10px] font-semibold tracking-widest text-[#334155] uppercase px-2 mb-2">
            Empresa
          </p>
        )}

        {[
          { icon: Settings, label: "Configurações" },
          { icon: HelpCircle, label: "Suporte" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            title={collapsed ? label : undefined}
            className={cn("orion-nav-item w-full", collapsed && "justify-center px-0")}
          >
            <Icon size={16} className="shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm whitespace-nowrap"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#1a2540] flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
          MA
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 min-w-0 overflow-hidden"
            >
              <p className="text-xs font-medium text-[#cbd5e1] truncate">Marcelo Andrade</p>
              <p className="text-[10px] text-[#475569]">CEO</p>
            </motion.div>
          )}
        </AnimatePresence>
        {!collapsed && (
          <button className="shrink-0 hover:text-red-400 transition-colors">
            <LogOut size={14} className="text-[#475569]" />
          </button>
        )}
      </div>
    </motion.aside>
  );
}
