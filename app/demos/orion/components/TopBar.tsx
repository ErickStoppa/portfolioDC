"use client";

import { Bell, Search, ChevronRight } from "lucide-react";
import { NAV_ITEMS, type OrionTab } from "../types/orion.types";

interface TopBarProps {
  activeTab: OrionTab;
  onCommandOpen: () => void;
  onNotifOpen: () => void;
  alertCount: number;
}

export function TopBar({ activeTab, onCommandOpen, onNotifOpen, alertCount }: TopBarProps) {
  const activeItem = NAV_ITEMS.find(n => n.id === activeTab);

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-6 gap-4 bg-[#080f20]/80 backdrop-blur-md border-b border-[#1a2540] z-10">
      {/* Left: breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-[#475569]">ORION</span>
        <ChevronRight size={14} className="text-[#334155]" />
        <span className="text-[#cbd5e1] font-medium">{activeItem?.label ?? "—"}</span>
      </div>

      {/* Center: search */}
      <button
        onClick={onCommandOpen}
        className="hidden md:flex items-center gap-2 w-48 orion-input cursor-pointer text-left"
      >
        <Search size={14} className="text-[#475569] shrink-0" />
        <span className="text-[#475569] text-sm flex-1">Busca rápida...</span>
        <kbd className="text-[10px] bg-[#1a2540] text-[#475569] px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
      </button>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Bell */}
        <button
          onClick={onNotifOpen}
          className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors text-[#475569] hover:text-[#cbd5e1]"
        >
          <Bell size={16} />
          {alertCount > 0 && (
            <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
              {alertCount}
            </span>
          )}
        </button>

        <div className="h-5 w-px bg-[#1a2540]" />

        {/* Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            MA
          </div>
          <div className="hidden lg:block">
            <p className="text-sm text-[#cbd5e1] leading-none">Marcelo Andrade</p>
            <p className="text-[10px] text-[#475569] mt-0.5">CEO</p>
          </div>
        </div>
      </div>
    </header>
  );
}
