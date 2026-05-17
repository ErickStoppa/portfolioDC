"use client";

import { Bell, Search } from "lucide-react";
import { NAV_ITEMS, PERIOD_OPTIONS, type OrionTab, type Period } from "../types/orion.types";

interface TopBarProps {
  activeTab: OrionTab;
  period: Period;
  onPeriodChange: (p: Period) => void;
  onCmdOpen: () => void;
  onNotifOpen: () => void;
  unreadCount: number;
}

export default function TopBar({
  activeTab,
  period,
  onPeriodChange,
  onCmdOpen,
  onNotifOpen,
  unreadCount,
}: TopBarProps) {
  const activeItem = NAV_ITEMS.find((item) => item.id === activeTab);

  return (
    <header
      className="h-14 shrink-0 flex items-center px-6 gap-4 z-10"
      style={{
        borderBottom: "1px solid #1a2540",
        backgroundColor: "rgba(8,15,32,0.9)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center flex-1 min-w-0">
        <span className="text-xs" style={{ color: "#475569" }}>
          Orion
        </span>
        <span className="mx-1.5 text-xs" style={{ color: "#1e293b" }}>
          /
        </span>
        <span className="text-xs font-medium truncate" style={{ color: "#cbd5e1" }}>
          {activeItem?.label ?? activeTab}
        </span>
      </div>

      <div className="hidden md:flex items-center gap-1">
        {PERIOD_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onPeriodChange(opt.value)}
            className="text-xs px-3 py-1.5 rounded-lg transition-colors"
            style={{
              backgroundColor:
                period === opt.value ? "#6366f1" : "rgba(255,255,255,0.04)",
              color: period === opt.value ? "#ffffff" : "#475569",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onCmdOpen}
          className="hidden md:flex items-center gap-2 px-3 rounded-lg h-8"
          style={{
            width: "8rem",
            backgroundColor: "#0a1220",
            border: "1px solid #1a2540",
            color: "#475569",
          }}
        >
          <Search size={12} />
          <span className="text-xs flex-1 text-left">Buscar...</span>
          <kbd style={{ fontSize: "10px", color: "#475569" }}>⌘K</kbd>
        </button>

        <button
          onClick={onNotifOpen}
          className="relative flex items-center justify-center rounded-lg transition-colors"
          style={{ width: "2rem", height: "2rem", color: "#475569" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "rgba(255,255,255,0.04)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
          }}
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span
              className="absolute flex items-center justify-center rounded-full text-white font-bold"
              style={{
                top: "2px",
                right: "2px",
                width: "14px",
                height: "14px",
                fontSize: "9px",
                backgroundColor: "#f43f5e",
              }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

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
      </div>
    </header>
  );
}
