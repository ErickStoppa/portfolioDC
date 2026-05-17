"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  DollarSign,
  Landmark,
  BarChart3,
  Factory,
  Users,
  ChevronLeft,
  ChevronRight,
  Settings,
  Command,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { NAV_ITEMS, type OrionTab } from "../types/orion.types";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  DollarSign,
  Landmark,
  BarChart3,
  Factory,
  Users,
};

interface SidebarProps {
  activeTab: OrionTab;
  onTabChange: (t: OrionTab) => void;
  onCmdOpen: () => void;
}

export default function Sidebar({ activeTab, onTabChange, onCmdOpen }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="hidden md:flex flex-col border-r"
      style={{
        backgroundColor: "#080f20",
        borderColor: "#1a2540",
        width: collapsed ? "3.5rem" : "14rem",
        transition: "width 200ms",
        flexShrink: 0,
      }}
    >
      <div
        className="flex items-center h-16 border-b px-3"
        style={{ borderColor: "#1a2540" }}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div
            className="flex items-center justify-center rounded-lg text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: "#6366f1", width: "2rem", height: "2rem" }}
          >
            O
          </div>
          {!collapsed && (
            <span className="text-sm font-bold tracking-widest" style={{ color: "#cbd5e1" }}>
              ORION
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex items-center justify-center rounded-md flex-shrink-0"
          style={{ color: "#475569", width: "1.5rem", height: "1.5rem" }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="flex-1 py-4 px-2 flex flex-col gap-0.5 overflow-hidden">
        {NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const isActive = activeTab === item.id;
          return (
            <div key={item.id} className="relative">
              {isActive && (
                <motion.div
                  layoutId="orion-pill"
                  className="absolute left-0 rounded-r-full"
                  style={{
                    width: "0.125rem",
                    top: "0.25rem",
                    bottom: "0.25rem",
                    backgroundColor: "#6366f1",
                  }}
                />
              )}
              <button
                title={collapsed ? item.label : undefined}
                onClick={() => onTabChange(item.id)}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 w-full text-left transition-colors"
                style={{
                  backgroundColor: isActive ? "rgba(99,102,241,0.12)" : "transparent",
                  color: isActive ? "#6366f1" : "#475569",
                  fontWeight: isActive ? 500 : 400,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLButtonElement).style.color = "#cbd5e1";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "#475569";
                  }
                }}
              >
                {Icon && <Icon size={16} style={{ flexShrink: 0 }} />}
                {!collapsed && (
                  <span className="text-xs truncate">{item.label}</span>
                )}
              </button>
            </div>
          );
        })}

        <div
          className="my-2 mx-2"
          style={{ borderTop: "1px solid #1a2540" }}
        />

        <button
          title={collapsed ? "Configurações" : undefined}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 w-full text-left transition-colors"
          style={{ color: "#475569" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLButtonElement).style.color = "#cbd5e1";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "#475569";
          }}
        >
          <Settings size={16} style={{ flexShrink: 0 }} />
          {!collapsed && <span className="text-xs">Configurações</span>}
        </button>

        <button
          title={collapsed ? "Abrir paleta de comandos" : undefined}
          onClick={onCmdOpen}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 w-full text-left transition-colors"
          style={{ color: "#475569" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#6366f1";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#475569";
          }}
        >
          <Command size={16} style={{ flexShrink: 0 }} />
          {!collapsed && (
            <span style={{ fontSize: "10px" }}>⌘K</span>
          )}
        </button>
      </nav>

      <div
        className="p-3 border-t flex items-center gap-2"
        style={{ borderColor: "#1a2540" }}
      >
        <div
          className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0"
          style={{
            backgroundColor: "#6366f1",
            width: "2rem",
            height: "2rem",
            fontSize: "10px",
          }}
        >
          RM
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate" style={{ color: "#cbd5e1" }}>
                Rafael Monteiro
              </p>
              <p style={{ fontSize: "10px", color: "#475569" }}>CFO</p>
            </div>
            <LogOut size={14} style={{ color: "#475569", flexShrink: 0 }} />
          </>
        )}
      </div>
    </aside>
  );
}
