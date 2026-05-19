"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Maximize2, Minimize2,
  Smartphone, Monitor, RefreshCw, Lock, Plus, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [pageDark, setPageDark] = useState(true);

  useEffect(() => {
    const update = () => {
      const html = document.documentElement;
      const isDark = html.classList.contains("dark") || !html.classList.contains("light");
      setPageDark(isDark);
    };
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const shell = pageDark
    ? {
        bg:            "#f1f3f4",
        bgTab:         "#ffffff",
        bgTabInactive: "#dee1e6",
        bgAddress:     "#ffffff",
        border:        "#dadce0",
        text:          "#202124",
        textMuted:     "#5f6368",
        dot:           "#1a73e8",
        hover:         "#e8eaed",
        iconColor:     "#5f6368",
        iconActive:    "#1a73e8",
        activeBg:      "#d2e3fc",
      }
    : {
        bg:            "#202124",
        bgTab:         "#35363a",
        bgTabInactive: "#2a2b2e",
        bgAddress:     "#303134",
        border:        "#3c4043",
        text:          "#e8eaed",
        textMuted:     "#9aa0a6",
        dot:           "#81c995",
        hover:         "#3c4043",
        iconColor:     "#9aa0a6",
        iconActive:    "#8ab4f8",
        activeBg:      "#394457",
      };

  return (
    <div
      className={cn(
        "flex flex-col",
        isFullscreen ? "fixed inset-0 z-[100]" : "h-[calc(100vh-64px)]"
      )}
      style={{ background: "var(--bg)" }}
    >
      {/* ── CHROME ─────────────────────────────────────── */}
      <div
        className="shrink-0 select-none"
        style={{ background: shell.bg, borderBottom: `1px solid ${shell.border}`, transition: "background 300ms ease, border-color 300ms ease" }}
      >
        {/* ROW 1 — Tab bar */}
        <div className="hidden sm:flex items-end px-3 pt-2 gap-1" style={{ background: shell.bg, transition: "background 300ms ease" }}>
          {/* Tab ativa */}
          <div
            className="flex items-center gap-2 px-3 h-8 rounded-t-lg max-w-[220px] min-w-0 relative"
            style={{ background: shell.bgTab, border: `1px solid ${shell.border}`, borderBottom: "none", transition: "background 300ms ease, border-color 300ms ease" }}
          >
            <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ background: shell.dot }} />
            <span className="text-[12px] font-medium truncate flex-1" style={{ color: shell.text }}>
              {title}
            </span>
            <button
              className="w-4 h-4 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity shrink-0"
              style={{ background: shell.hover }}
              tabIndex={-1}
              aria-hidden="true"
            >
              <X size={8} style={{ color: shell.textMuted }} />
            </button>
          </div>

          {/* + nova aba (decorativo) */}
          <button
            className="w-8 h-7 flex items-center justify-center rounded-full opacity-50 hover:opacity-80 transition-opacity"
            style={{ color: shell.textMuted }}
            tabIndex={-1}
            aria-hidden="true"
          >
            <Plus size={14} />
          </button>

          <div className="flex-1" />

          {/* Controles de janela macOS (decorativos) */}
          <div className="flex items-center gap-1.5 pb-2 pr-1" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
        </div>

        {/* ROW 2 — Omnibar */}
        <div
          className="flex items-center gap-2 px-3 h-10"
          style={{ background: shell.bgTab, borderTop: `1px solid ${shell.border}`, transition: "background 300ms ease, border-color 300ms ease" }}
        >
          {/* Navegação esquerda */}
          <div className="flex items-center gap-0.5">
            {/* Back + Forward: ocultos em mobile */}
            <div className="hidden sm:flex items-center">
              <Link
                href={backHref}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ color: shell.iconColor }}
                onMouseEnter={e => (e.currentTarget.style.background = shell.hover)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                title="Voltar para demos"
              >
                <ArrowLeft size={16} />
              </Link>

              <button
                className="w-8 h-8 rounded-full flex items-center justify-center opacity-30 cursor-default"
                style={{ color: shell.iconColor }}
                tabIndex={-1}
                aria-hidden="true"
              >
                <ArrowRight size={16} />
              </button>
            </div>

            <button
              onClick={() => setKey(k => k + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ color: shell.iconColor }}
              onMouseEnter={e => (e.currentTarget.style.background = shell.hover)}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              title="Recarregar demo"
              aria-label="Recarregar demo"
            >
              <RefreshCw size={15} />
            </button>
          </div>

          {/* Address bar */}
          <div
            className="flex-1 h-7 rounded-full flex items-center gap-2 px-3 mx-1 min-w-0"
            style={{ background: shell.bgAddress, border: `1px solid ${shell.border}`, transition: "background 300ms ease, border-color 300ms ease" }}
          >
            <Lock size={11} style={{ color: shell.dot, flexShrink: 0 }} />
            <span
              className="text-[12px] truncate font-mono flex-1"
              style={{ color: shell.textMuted }}
            >
              {url}
            </span>
          </div>

          {/* Segmented toggle: Desktop / Mobile */}
          <div
            className="flex items-center gap-0.5 px-1 py-0.5 rounded-full"
            style={{ background: shell.bg, border: `1px solid ${shell.border}` }}
          >
            <button
              onClick={() => setIsMobile(false)}
              title="Visualização desktop"
              aria-label="Modo desktop"
              aria-pressed={!isMobile}
              className="flex items-center gap-1 px-2.5 h-6 rounded-full text-[11px] font-medium transition-all"
              style={{
                background: !isMobile ? shell.activeBg : "transparent",
                color: !isMobile ? shell.iconActive : shell.textMuted,
              }}
            >
              <Monitor size={12} />
              <span className="hidden sm:inline">Desktop</span>
            </button>

            <button
              onClick={() => setIsMobile(true)}
              title="Visualização mobile"
              aria-label="Modo mobile (430px)"
              aria-pressed={isMobile}
              className="flex items-center gap-1 px-2.5 h-6 rounded-full text-[11px] font-medium transition-all"
              style={{
                background: isMobile ? shell.activeBg : "transparent",
                color: isMobile ? shell.iconActive : shell.textMuted,
              }}
            >
              <Smartphone size={12} />
              <span className="hidden sm:inline">430px</span>
            </button>
          </div>

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen(f => !f)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{
              color:      isFullscreen ? shell.iconActive : shell.iconColor,
              background: isFullscreen ? shell.activeBg   : undefined,
            }}
            onMouseEnter={e => { if (!isFullscreen) e.currentTarget.style.background = shell.hover; }}
            onMouseLeave={e => { if (!isFullscreen) e.currentTarget.style.background = "transparent"; }}
            title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
            aria-label={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
            aria-pressed={isFullscreen}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </div>

      {/* ── VIEWPORT ───────────────────────────────────── */}
      <div
        className="flex-1 overflow-hidden flex flex-col items-center"
        style={{ background: "var(--bg)" }}
      >
        {isMobile && (
          <div
            className="w-full flex justify-center pt-2 pb-1"
            style={{ background: shell.bgTab, transition: "background 300ms ease" }}
          >
            <div className="w-24 h-1 rounded-full" style={{ background: shell.border }} />
          </div>
        )}
        <motion.div
          key={`${isMobile}-${key}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className={cn("w-full h-full overflow-auto", isMobile && "max-w-[430px] shadow-2xl")}
          style={{
            minHeight: isFullscreen ? "calc(100vh - 84px)" : "calc(100vh - 148px)",
            borderLeft:  isMobile ? `1px solid ${shell.border}` : undefined,
            borderRight: isMobile ? `1px solid ${shell.border}` : undefined,
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
