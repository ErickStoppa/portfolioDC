"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Maximize2, Minimize2, Smartphone, Monitor, RefreshCw,
} from "lucide-react";

interface BrowserShellProps {
  title: string;
  url: string;
  backHref?: string;
  children: React.ReactNode;
}

export function BrowserShell({ title, url, backHref = "/portfolio", children }: BrowserShellProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <div className={`flex flex-col ${isFullscreen ? "fixed inset-0 z-[100] bg-[var(--bg)]" : "min-h-screen"}`}>
      {/* Browser chrome */}
      <div className="shrink-0 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 h-12">
          {/* Back */}
          <Link
            href={backHref}
            className="shrink-0 flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors focus-visible:outline-none"
            aria-label="Back to portfolio"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Portfolio</span>
          </Link>

          {/* Traffic lights */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-amber-500/60" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
          </div>

          {/* Address bar */}
          <div className="flex-1 min-w-0">
            <div className="mx-auto max-w-sm h-7 rounded-[6px] bg-[var(--bg-card)] border border-[var(--border)] flex items-center px-3 gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--success)] shrink-0" aria-hidden="true" />
              <span className="text-xs text-[var(--text-subtle)] truncate font-mono">{url}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setKey((k) => k + 1)}
              className="w-8 h-8 rounded-[6px] flex items-center justify-center text-[var(--text-subtle)] hover:text-[var(--text)] hover:bg-[var(--bg-card)] transition-all"
              aria-label="Reload demo"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsMobile(!isMobile)}
              className={`w-8 h-8 rounded-[6px] flex items-center justify-center transition-all ${
                isMobile
                  ? "text-[var(--primary)] bg-[var(--primary-light)]"
                  : "text-[var(--text-subtle)] hover:text-[var(--text)] hover:bg-[var(--bg-card)]"
              }`}
              aria-label={isMobile ? "Switch to desktop view" : "Switch to mobile view"}
              aria-pressed={isMobile}
            >
              {isMobile ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-8 h-8 rounded-[6px] flex items-center justify-center text-[var(--text-subtle)] hover:text-[var(--text)] hover:bg-[var(--bg-card)] transition-all"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              aria-pressed={isFullscreen}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Demo label bar */}
        <div className="px-4 pb-2 flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--text-subtle)]">{title}</span>
          <span className="text-xs text-[var(--text-faint)]">— Interactive Demo</span>
        </div>
      </div>

      {/* Viewport */}
      <div className="flex-1 overflow-hidden bg-[var(--bg)] flex items-start justify-center">
        <motion.div
          key={`${isMobile}-${key}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className={`w-full h-full overflow-auto ${isMobile ? "max-w-[390px] border-x border-[var(--border)]" : ""}`}
          style={{ minHeight: "calc(100vh - 96px)" }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
