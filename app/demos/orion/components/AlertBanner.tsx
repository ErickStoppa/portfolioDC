"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { ALERT_CONFIG } from "../types/orion.types";
import type { Alert } from "@/data/orion";

interface AlertBannerProps {
  alert: Alert;
}

const ICON_MAP = {
  AlertCircle,
  AlertTriangle,
  Info,
} as const;

export default function AlertBanner({ alert }: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  const cfg = ALERT_CONFIG[alert.severity];
  const IconComponent = ICON_MAP[cfg.icon as keyof typeof ICON_MAP] ?? Info;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          layout
          initial={{ opacity: 1, height: "auto", marginBottom: 0 }}
          exit={{ height: 0, opacity: 0, marginBottom: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ overflow: "hidden" }}
        >
          <div
            className="border-l-2 rounded-r-lg px-4 py-3 flex items-start gap-3"
            style={{
              borderLeftColor: cfg.color,
              backgroundColor: cfg.bg,
            }}
          >
            {/* Left: icon */}
            <IconComponent
              size={16}
              style={{ color: cfg.color, flexShrink: 0, marginTop: "1px" }}
            />

            {/* Center: text */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold" style={{ color: "#cbd5e1" }}>
                {alert.title}
              </p>
              <p className="mt-0.5" style={{ fontSize: "11px", color: "#475569" }}>
                {alert.message}
              </p>
              <p className="mt-1" style={{ fontSize: "10px", color: "#1e293b" }}>
                {alert.time}
              </p>
            </div>

            {/* Right: dismiss button */}
            <button
              onClick={() => setDismissed(true)}
              className="w-5 h-5 flex items-center justify-center flex-shrink-0 transition-colors"
              style={{ color: "#475569" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#f43f5e";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#475569";
              }}
              aria-label="Dispensar alerta"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
