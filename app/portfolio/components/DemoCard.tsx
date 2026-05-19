"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, ExternalLink, MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoPreviewArt } from "./DemoPreviewArt";
import type { Demo } from "@/types";

interface Props {
  demo:     Demo;
  index:    number;
  featured?: boolean;
}

export function DemoCard({ demo, index, featured = false }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/demos/${demo.slug}`}
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={cn(
            "relative rounded-[var(--radius-xl)] border border-[var(--border)]",
            "bg-[var(--bg-card)] overflow-hidden",
            "transition-all duration-300",
            "hover:border-[var(--border-brand)]",
            "hover:shadow-[var(--shadow-glow-lg)]",
            "hover:-translate-y-1"
          )}
        >
          {/* ── Preview area ──────────────────────────────────────── */}
          <div className={cn("relative overflow-hidden", featured ? "h-72 sm:h-80" : "h-52")}>
            <DemoPreviewArt demoId={demo.id} className="absolute inset-0" />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Category pill — top left */}
            <div className="absolute top-3 left-3">
              <span
                className={cn(
                  "text-[11px] font-medium px-2.5 py-1 rounded-full",
                  "bg-black/40 backdrop-blur-sm border border-white/10 text-white/80"
                )}
              >
                {demo.category}
              </span>
            </div>

            {/* Live dot — top right */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <div className="live-dot w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-green-400 text-[11px] font-medium">Live</span>
            </div>

            {/* Play overlay — center, on hover */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                >
                  {/* Play button */}
                  <div
                    className={cn(
                      "flex items-center gap-2.5",
                      "bg-white/95 backdrop-blur-md text-gray-900",
                      "font-semibold text-sm rounded-full shadow-xl",
                      featured ? "px-6 py-3" : "px-5 py-2.5"
                    )}
                  >
                    <Play size={14} className="fill-current" aria-hidden="true" />
                    Explorar demo
                  </div>

                  {/* Tooltip balloon */}
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={cn(
                      "flex items-center gap-1.5",
                      "bg-black/70 backdrop-blur-sm text-white/80 text-[11px]",
                      "px-3 py-1.5 rounded-full border border-white/10"
                    )}
                  >
                    <MousePointerClick size={11} className="text-[var(--primary)]" aria-hidden="true" />
                    Clique para entrar no site
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Content ───────────────────────────────────────────── */}
          <div className="p-5">
            {/* Title + arrow */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3
                className={cn(
                  "font-bold text-[var(--text)] leading-tight",
                  "group-hover:text-[var(--primary)] transition-colors",
                  featured ? "text-xl sm:text-2xl" : "text-[15px]"
                )}
              >
                {demo.title}
              </h3>
              <motion.div
                animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight
                  size={16}
                  className="text-[var(--text-subtle)] shrink-0 mt-0.5 group-hover:text-[var(--primary)] transition-colors"
                  aria-hidden="true"
                />
              </motion.div>
            </div>

            {/* Description */}
            <p className={cn("text-[var(--text-muted)] text-[13px] leading-relaxed mb-4", featured ? "line-clamp-3" : "line-clamp-2")}>
              {demo.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {demo.tags.slice(0, featured ? 6 : 4).map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "text-[11px] text-[var(--text-subtle)] px-2.5 py-0.5 rounded-full",
                    "bg-[var(--bg-secondary)] border border-[var(--border)]"
                  )}
                >
                  {tag}
                </span>
              ))}
              {demo.tags.length > (featured ? 6 : 4) && (
                <span className="text-[11px] text-[var(--text-faint)] px-1">
                  +{demo.tags.length - (featured ? 6 : 4)}
                </span>
              )}
            </div>

            {/* Tech stack + CTA */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                {demo.techStack.slice(0, featured ? 4 : 3).map((tech) => (
                  <span key={tech} className="text-[11px] text-[var(--text-faint)] font-mono">
                    {tech}
                  </span>
                ))}
                {demo.techStack.length > (featured ? 4 : 3) && (
                  <span className="text-[11px] text-[var(--text-faint)]">
                    +{demo.techStack.length - (featured ? 4 : 3)}
                  </span>
                )}
              </div>

              <div
                className={cn(
                  "flex items-center gap-1 text-[12px] font-medium",
                  "text-[var(--primary)] transition-all duration-150",
                  hovered ? "gap-2" : "gap-1"
                )}
              >
                Ver demo
                <ExternalLink size={11} aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* ── Bottom hover bar ──────────────────────────────────── */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-0.5",
                  "bg-gradient-to-r from-[var(--primary)] via-[var(--primary-bright)] to-[var(--primary)]"
                )}
              />
            )}
          </AnimatePresence>
        </div>
      </Link>
    </motion.div>
  );
}
