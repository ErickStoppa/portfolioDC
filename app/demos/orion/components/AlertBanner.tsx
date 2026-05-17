"use client";

import { motion } from "framer-motion";
import { ShieldAlert, ArrowRight } from "lucide-react";
import type { OrionAlert } from "@/data/orion";

interface AlertBannerProps {
  alerts: OrionAlert[];
  onNavigate: () => void;
}

export function AlertBanner({ alerts, onNavigate }: AlertBannerProps) {
  const criticals = alerts.filter(a => a.severity === "critical" && !a.resolved);
  if (criticals.length === 0) return null;

  return (
    <motion.div
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/8"
    >
      <div className="flex items-center gap-3">
        <ShieldAlert size={16} className="text-red-400 shrink-0" />
        <span className="text-sm text-red-400 font-medium">
          {criticals.length} alerta{criticals.length > 1 ? "s" : ""} crítico{criticals.length > 1 ? "s" : ""} requer{criticals.length > 1 ? "em" : ""} atenção
        </span>
      </div>
      <button
        onClick={onNavigate}
        className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors whitespace-nowrap"
      >
        Ver todos <ArrowRight size={12} />
      </button>
    </motion.div>
  );
}
