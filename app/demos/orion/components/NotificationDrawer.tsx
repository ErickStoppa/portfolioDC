"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { ALERT_CONFIG } from "../types/orion.types";
import { alerts } from "@/data/orion";
import { useEscKey, useFocusTrap } from "../hooks/hooks";

interface NotificationDrawerProps {
  onClose: () => void;
}

export default function NotificationDrawer({ onClose }: NotificationDrawerProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const drawerRef = useRef<HTMLDivElement>(null);

  useEscKey(onClose);
  useFocusTrap(drawerRef, true);

  const visible = alerts.filter((a) => !dismissed.has(a.id));

  const dismiss = (id: string) => {
    setDismissed((prev) => new Set([...prev, id]));
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        ref={drawerRef}
        className="fixed right-0 top-0 bottom-0 z-50 flex flex-col"
        style={{
          width: "20rem",
          backgroundColor: "#080f20",
          borderLeft: "1px solid #1a2540",
        }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        <div
          className="flex items-center justify-between px-5 shrink-0"
          style={{
            height: "3.5rem",
            borderBottom: "1px solid #1a2540",
          }}
        >
          <span className="text-sm font-semibold" style={{ color: "#cbd5e1" }}>
            Notificações
          </span>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-md transition-colors"
            style={{ width: "1.5rem", height: "1.5rem", color: "#475569" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#cbd5e1";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#475569";
            }}
          >
            <X size={14} />
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto"
          style={{ borderBottom: "1px solid #1a2540" }}
        >
          {visible.map((alert) => {
            const config = ALERT_CONFIG[alert.severity];
            return (
              <div
                key={alert.id}
                className="relative flex items-start gap-3 p-4"
                style={{
                  borderBottom: "1px solid #1a2540",
                  backgroundColor: !alert.read ? config.bg : "transparent",
                }}
              >
                <div
                  className="rounded-full flex-shrink-0 mt-1"
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: config.color,
                  }}
                />
                <div className="flex-1 min-w-0 pr-5">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-semibold truncate"
                      style={{ color: "#cbd5e1" }}
                    >
                      {alert.title}
                    </span>
                    {alert.severity === "critico" && (
                      <span
                        className="text-white font-bold rounded px-1 flex-shrink-0"
                        style={{
                          fontSize: "9px",
                          backgroundColor: "#f43f5e",
                          letterSpacing: "0.05em",
                        }}
                      >
                        CRÍTICO
                      </span>
                    )}
                  </div>
                  <p
                    className="mt-0.5 line-clamp-2"
                    style={{ fontSize: "11px", color: "#475569" }}
                  >
                    {alert.message}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span style={{ fontSize: "10px", color: "#1e293b" }}>
                      {alert.time}
                    </span>
                    <span
                      className="rounded px-1 py-0.5"
                      style={{
                        fontSize: "9px",
                        color: "#475569",
                        backgroundColor: "rgba(71,85,105,0.15)",
                      }}
                    >
                      {alert.module}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => dismiss(alert.id)}
                  className="absolute top-3 right-3 flex items-center justify-center rounded transition-colors"
                  style={{ color: "#475569" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "#cbd5e1";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "#475569";
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            );
          })}

          {visible.length === 0 && (
            <div className="flex items-center justify-center h-32">
              <p className="text-xs" style={{ color: "#475569" }}>
                Nenhuma notificação
              </p>
            </div>
          )}
        </div>

        <div className="p-4 shrink-0">
          <button
            className="text-xs transition-colors"
            style={{ color: "#6366f1" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.textDecoration = "none";
            }}
          >
            Marcar todas como lidas
          </button>
        </div>
      </motion.div>
    </>
  );
}
