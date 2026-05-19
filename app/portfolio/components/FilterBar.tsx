"use client";

import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  categories:       string[];
  activeCategory:   string;
  onCategoryChange: (c: string) => void;
  search:           string;
  onSearchChange:   (s: string) => void;
  total:            number;
}

export function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  search,
  onSearchChange,
  total,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 justify-between">

      {/* Category pills */}
      <div
        className="flex items-center gap-1.5 flex-wrap"
        role="tablist"
        aria-label="Filtrar por categoria"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const label = cat === "todos" ? "Todos" : cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategoryChange(cat)}
              className={cn(
                "relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                isActive
                  ? "text-white"
                  : "border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-brand)] hover:text-[var(--text)]"
              )}
            >
              {/* Sliding active indicator — shared layoutId so it slides between pills */}
              {isActive && (
                <motion.span
                  layoutId="active-filter-pill"
                  className="absolute inset-0 rounded-full bg-[var(--primary)]"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
              {label}
            </button>
          );
        })}
      </div>

      {/* Right side: search + count */}
      <div className="flex items-center gap-3">
        {/* Search input */}
        <div className="relative w-48">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-subtle)] pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Buscar demos…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Buscar demos"
            className={cn(
              "w-full h-8 pl-8 pr-7 rounded-[var(--radius)] text-sm",
              "bg-[var(--bg-secondary)] border border-[var(--border)]",
              "text-[var(--text)] placeholder:text-[var(--text-faint)]",
              "focus:outline-none focus:border-[var(--border-brand)]",
              "transition-colors"
            )}
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              aria-label="Limpar busca"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Result count */}
        <p className="text-sm text-[var(--text-muted)] tabular-nums whitespace-nowrap">
          {total} demo{total !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
