"use client";

import { useRef, useState } from "react";
import { Search, LayoutDashboard, DollarSign, Landmark, BarChart3, Factory, Users, type LucideIcon } from "lucide-react";
import { NAV_ITEMS, type OrionTab } from "../types/orion.types";
import { useEscKey, useFocusTrap } from "../hooks/hooks";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  DollarSign,
  Landmark,
  BarChart3,
  Factory,
  Users,
};

interface CommandPaletteProps {
  onClose: () => void;
  onNavigate: (tab: OrionTab) => void;
}

export default function CommandPalette({ onClose, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  useEscKey(onClose);
  useFocusTrap(panelRef, true);

  const filtered = query.trim()
    ? NAV_ITEMS.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : NAV_ITEMS;

  return (
    <div
      className="fixed inset-0 flex items-start justify-center z-50"
      style={{
        paddingTop: "20vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="w-full rounded-xl overflow-hidden shadow-2xl"
        style={{
          maxWidth: "28rem",
          backgroundColor: "#080f20",
          border: "1px solid #1a2540",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center px-4 gap-3"
          style={{
            height: "3rem",
            borderBottom: "1px solid #1a2540",
          }}
        >
          <Search size={16} style={{ color: "#475569", flexShrink: 0 }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar módulo, ação..."
            autoFocus
            className="flex-1 bg-transparent text-sm outline-none"
            style={{
              color: "#cbd5e1",
            }}
          />
        </div>

        <div className="overflow-y-auto py-2" style={{ maxHeight: "18rem" }}>
          {filtered.length > 0 ? (
            <>
              <p
                className="px-4 py-2 uppercase tracking-widest"
                style={{ fontSize: "10px", color: "#475569" }}
              >
                Módulos
              </p>
              {filtered.map((item) => {
                const Icon = ICON_MAP[item.icon];
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors"
                    style={{ color: "#94a3b8" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        "rgba(255,255,255,0.04)";
                      (e.currentTarget as HTMLButtonElement).style.color = "#cbd5e1";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
                    }}
                  >
                    {Icon && <Icon size={16} style={{ flexShrink: 0 }} />}
                    <span className="text-sm flex-1">{item.label}</span>
                    <span style={{ color: "#475569" }}>→</span>
                  </button>
                );
              })}
            </>
          ) : (
            <p
              className="text-center py-8"
              style={{ color: "#475569", fontSize: "14px" }}
            >
              Nenhum resultado
            </p>
          )}
        </div>

        <div
          className="flex items-center gap-4 px-4 py-2"
          style={{
            borderTop: "1px solid #1a2540",
            fontSize: "10px",
            color: "#475569",
          }}
        >
          <span>↵ navegar</span>
          <span>⎋ fechar</span>
        </div>
      </div>
    </div>
  );
}
