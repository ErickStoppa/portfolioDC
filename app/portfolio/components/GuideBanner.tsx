"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "portfolio-guide-dismissed";

export function GuideBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      setDismissed(true);
    }
  }, []);

  function handleDismiss() {
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, "true");
  }

  // Avoid hydration mismatch — don't render until we've read localStorage
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -16, height: "auto" }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div
            className={cn(
              "w-full flex items-center gap-4 px-5 py-3.5",
              "bg-[var(--primary-haze)] border border-[var(--border-brand)]",
              "rounded-[var(--radius-lg)]"
            )}
          >
            {/* Icon */}
            <Sparkles
              size={18}
              className="shrink-0 text-[var(--primary)]"
              aria-hidden="true"
            />

            {/* Text */}
            <p className="flex-1 min-w-0 text-sm text-[var(--text-muted)] leading-relaxed">
              Estas são demos interativas de sites reais.{" "}
              <span className="font-semibold text-[var(--primary)]">
                Clique em qualquer card para entrar e explorar à vontade.
              </span>
            </p>

            {/* Animated arrow hint */}
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <ChevronRight size={14} className="text-[var(--primary)] shrink-0" />
            </motion.div>

            {/* Dismiss */}
            <button
              onClick={handleDismiss}
              aria-label="Fechar aviso"
              className={cn(
                "shrink-0 p-1.5 rounded-full",
                "text-[var(--text-muted)] hover:text-[var(--text)]",
                "hover:bg-[var(--bg-card)] transition-colors"
              )}
            >
              <X size={13} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
