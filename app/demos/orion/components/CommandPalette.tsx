"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Search, LayoutDashboard, FileText, Landmark, TrendingUp, Package, Users,
  type LucideIcon,
} from "lucide-react";
import { NAV_ITEMS, type OrionTab } from "../types/orion.types";
import { useEscKey, useFocusTrap } from "../hooks/hooks";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard, FileText, Landmark, TrendingUp, Package, Users,
};

interface CommandPaletteProps {
  onClose: () => void;
  onNav: (tab: OrionTab) => void;
}

export function CommandPalette({ onClose, onNav }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useEscKey(onClose);
  useFocusTrap(panelRef, true);

  const filtered = NAV_ITEMS.filter(n =>
    n.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setHovered(h => Math.min(h + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setHovered(h => Math.max(h - 1, 0)); }
    if (e.key === "Enter" && filtered[hovered]) { onNav(filtered[hovered].id); }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[20vh] px-3 sm:px-4">
        <motion.div
          ref={panelRef}
          initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="w-full max-w-lg bg-[#0a1220] border border-[#1a2540] rounded-xl shadow-2xl overflow-hidden"
          onKeyDown={handleKey}
        >
          {/* Input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1a2540]">
            <Search size={18} className="text-[#475569] shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={e => { setQuery(e.target.value); setHovered(0); }}
              placeholder="Navegar para..."
              className="flex-1 bg-transparent text-[15px] text-white placeholder-[#475569] outline-none border-none"
            />
            <kbd className="text-[10px] text-[#475569] bg-[#1a2540] px-1.5 py-0.5 rounded font-mono">ESC</kbd>
          </div>

          {/* Results */}
          <div className="py-2">
            {filtered.map((item, i) => {
              const Icon = ICON_MAP[item.icon];
              return (
                <button
                  key={item.id}
                  onClick={() => onNav(item.id)}
                  onMouseEnter={() => setHovered(i)}
                  className="w-full flex items-center gap-3 px-5 py-3 text-left transition-colors"
                  style={{ backgroundColor: hovered === i ? "#0d1628" : "transparent" }}
                >
                  {Icon && <Icon size={16} className={hovered === i ? "text-indigo-400" : "text-[#475569]"} />}
                  <span className={`text-sm ${hovered === i ? "text-white" : "text-[#94a3b8]"}`}>
                    {item.label}
                  </span>
                  {hovered === i && (
                    <kbd className="ml-auto text-[10px] text-[#475569] bg-[#1a2540] px-1.5 py-0.5 rounded font-mono">↵</kbd>
                  )}
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="px-5 py-4 text-sm text-[#475569]">Nenhum módulo encontrado.</p>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-[#1a2540] text-[11px] text-[#334155] flex gap-4">
            <span>↑↓ navegar</span>
            <span>↵ selecionar</span>
            <span>ESC fechar</span>
          </div>
        </motion.div>
      </div>
    </>
  );
}
