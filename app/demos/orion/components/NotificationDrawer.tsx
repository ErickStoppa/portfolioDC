"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Info, AlertTriangle, ShieldAlert, type LucideIcon } from "lucide-react";
import type { OrionAlert } from "@/data/orion";
import { SEVERITY_CONFIG } from "../types/orion.types";
import { useEscKey, useFocusTrap } from "../hooks/hooks";

const ICON_MAP: Record<string, LucideIcon> = { Info, AlertTriangle, ShieldAlert };

interface NotificationDrawerProps {
  alerts: OrionAlert[];
  onClose: () => void;
  onResolve: (id: string) => void;
}

export function NotificationDrawer({ alerts, onClose, onResolve }: NotificationDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useEscKey(onClose);
  useFocusTrap(panelRef, true);

  const unresolved = alerts.filter(a => !a.resolved);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />
      <motion.div
        ref={panelRef}
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 340, damping: 38 }}
        className="fixed right-0 top-0 bottom-0 z-50 w-[380px] bg-[#080f20] border-l border-[#1a2540] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Notificações"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a2540] shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-[#cbd5e1]">Notificações</h2>
            {unresolved.length > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {unresolved.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#475569] hover:text-[#cbd5e1] hover:bg-white/5 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Alert list */}
        <div className="flex-1 overflow-y-auto py-3">
          <AnimatePresence initial={false}>
            {alerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-2">
                <CheckCircle2 size={32} className="text-green-400" />
                <p className="text-sm text-[#475569]">Tudo limpo por aqui.</p>
              </div>
            ) : (
              alerts.map(alert => {
                const cfg = SEVERITY_CONFIG[alert.severity];
                const Icon = ICON_MAP[cfg.icon];
                return (
                  <motion.div
                    key={alert.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`mx-3 mb-2 p-4 rounded-xl border ${cfg.bg} ${cfg.border} ${alert.resolved ? "opacity-40" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 ${cfg.color}`}>
                          {Icon && <Icon size={15} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-semibold ${cfg.color}`}>{alert.title}</p>
                          <p className="text-[11px] text-[#94a3b8] mt-1 leading-relaxed">{alert.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] text-[#475569]">{alert.time}</span>
                            {!alert.resolved && (
                              <button
                                onClick={() => onResolve(alert.id)}
                                className="text-[10px] text-[#475569] hover:text-[#cbd5e1] underline transition-colors"
                              >
                                Marcar como lida
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
