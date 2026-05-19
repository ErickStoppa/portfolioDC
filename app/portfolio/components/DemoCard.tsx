"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoPreviewArt } from "./DemoPreviewArt";
import type { Demo } from "@/types";

interface Props {
  demo:  Demo;
  index: number;
}

// Per-category accent palette
const CATEGORY_COLORS: Record<string, { pill: string; glow: string }> = {
  "Comércio":   { pill: "text-orange-400 bg-orange-400/10 border-orange-400/20",   glow: "rgba(251,146,60,0.12)"  },
  "Gastronomia":{ pill: "text-amber-400  bg-amber-400/10  border-amber-400/20",    glow: "rgba(245,158,11,0.12)"  },
  "B2B SaaS":   { pill: "text-sky-400    bg-sky-400/10    border-sky-400/20",      glow: "rgba(56,189,248,0.12)"  },
  "Agendamento":{ pill: "text-violet-400 bg-violet-400/10 border-violet-400/20",   glow: "rgba(167,139,250,0.12)" },
  "Enterprise": { pill: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",   glow: "rgba(99,102,241,0.12)"  },
};

const DEFAULT_COLOR = {
  pill: "text-[var(--primary)] bg-[var(--primary-light)] border-[var(--border-brand)]",
  glow: "rgba(29,109,240,0.10)",
};

export function DemoCard({ demo, index }: Props) {
  const accent = CATEGORY_COLORS[demo.category] ?? DEFAULT_COLOR;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/demos/${demo.slug}`}
        className={cn(
          "group block rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden",
          "hover:border-[var(--border-strong)]",
          "hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)]",
          "transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
        )}
      >
        {/* ── Thumbnail ─────────────────────────────────────────────── */}
        <div className="relative h-52 overflow-hidden bg-[var(--bg)]">
          <DemoPreviewArt
            slug={demo.slug}
            className="w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
          />

          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)]/80 via-transparent to-transparent" />

          {/* LIVE badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[var(--bg-card)]/90 border border-[var(--border)] text-[var(--text-muted)] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            Ao vivo
          </div>

          {/* Play button (center) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              "bg-[var(--bg-card)]/80 border border-[var(--border)] backdrop-blur-sm",
              "text-[var(--text-muted)]",
              "group-hover:bg-[var(--primary)] group-hover:border-[var(--primary)] group-hover:text-white",
              "group-hover:scale-110 group-hover:shadow-[0_0_24px_var(--primary-glow)]",
              "transition-all duration-300"
            )}>
              <Play className="w-5 h-5 ml-0.5" aria-hidden="true" />
            </div>
          </div>

          {/* Category pill (bottom-right of thumbnail) */}
          <div className="absolute bottom-3 right-3">
            <span className={cn(
              "text-[10px] font-semibold px-2 py-0.5 rounded-full border",
              accent.pill
            )}>
              {demo.category}
            </span>
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────────────────── */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-sm font-bold text-[var(--text)] leading-snug group-hover:text-[var(--primary)] transition-colors duration-200">
              {demo.title}
            </h3>
            <div className={cn(
              "shrink-0 w-8 h-8 rounded-[8px] border border-[var(--border)] flex items-center justify-center",
              "text-[var(--text-subtle)]",
              "group-hover:border-[var(--primary)] group-hover:text-[var(--primary)]",
              "transition-all duration-200"
            )}>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>

          <p className="text-xs text-[var(--text-subtle)] leading-relaxed line-clamp-2">
            {demo.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-[var(--border-subtle)]">
            {demo.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-[var(--text-subtle)] px-2 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)]"
              >
                {tag}
              </span>
            ))}
            {demo.tags.length > 3 && (
              <span className="text-[10px] text-[var(--text-faint)] px-1.5 py-0.5">
                +{demo.tags.length - 3}
              </span>
            )}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1 mt-2">
            {demo.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[10px] text-[var(--text-faint)] px-1.5 py-0.5 rounded font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── Footer CTA ────────────────────────────────────────────── */}
        <div className={cn(
          "mx-5 mb-5 px-4 py-2.5 rounded-xl flex items-center justify-between",
          "border border-[var(--border-subtle)] bg-[var(--bg-secondary)]",
          "group-hover:border-[var(--border-brand)] group-hover:bg-[var(--primary-haze)]",
          "transition-all duration-300"
        )}>
          <span className="text-xs font-semibold text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">
            Explorar demo
          </span>
          <Play className="w-3.5 h-3.5 text-[var(--text-subtle)] group-hover:text-[var(--primary)] transition-colors" aria-hidden="true" />
        </div>
      </Link>
    </motion.article>
  );
}
