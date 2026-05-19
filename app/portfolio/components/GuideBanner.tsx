"use client";

import { useState } from "react";
import { X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  demoCount: number;
}

export function GuideBanner({ demoCount }: Props) {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "relative flex items-start sm:items-center gap-3 px-4 py-3.5 rounded-xl",
            "border border-[var(--border-brand)] bg-[var(--primary-haze)]"
          )}
        >
          {/* Icon */}
          <div className="shrink-0 w-8 h-8 rounded-lg bg-[var(--primary-light)] flex items-center justify-center">
            <Zap className="w-4 h-4 text-[var(--primary)]" aria-hidden="true" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--text)]">
              Demos ao vivo — não são mockups
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">
              Cada um dos{" "}
              <span className="text-[var(--primary)] font-medium">{demoCount} demos</span>{" "}
              é um produto funcional completo. Clique em qualquer card para explorar —
              navegue, filtre, preencha formulários. Tudo funciona de verdade.
            </p>
          </div>

          {/* Chips */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {["100% interativo", "Sem login"].map((chip) => (
              <span
                key={chip}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-[var(--border-brand)] text-[var(--primary)]"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            aria-label="Fechar aviso"
            className="shrink-0 p-1 rounded-md text-[var(--text-subtle)] hover:text-[var(--text)] hover:bg-[var(--bg-card)] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
