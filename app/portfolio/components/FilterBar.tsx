"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  search:         string;
  onSearch:       (v: string) => void;
  categories:     string[];
  activeCategory: string;
  onCategory:     (c: string) => void;
  totalVisible:   number;
  totalAll:       number;
}

export function FilterBar({
  search, onSearch, categories, activeCategory, onCategory, totalVisible, totalAll,
}: FilterBarProps) {
  return (
    <div className="sticky top-16 z-30 bg-[var(--bg)] border-b border-[var(--border)] py-3.5 px-5 lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center gap-3">

        {/* Search */}
        <div className="relative flex-shrink-0 w-full sm:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-subtle)]"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Buscar demos…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Buscar demos"
            className={cn(
              "w-full h-9 pl-8.5 pr-8 rounded-[8px] text-sm",
              "bg-[var(--bg-card)] border border-[var(--border)]",
              "text-[var(--text)] placeholder:text-[var(--text-subtle)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent",
              "transition-all"
            )}
          />
          {search && (
            <button
              onClick={() => onSearch("")}
              aria-label="Limpar busca"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-0.5 sm:pb-0 flex-nowrap flex-1"
          role="tablist"
          aria-label="Filtrar por categoria"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategory(cat)}
                className={cn(
                  "shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                  isActive
                    ? "bg-[var(--primary)] text-white shadow-[0_0_14px_var(--primary-glow)]"
                    : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)]"
                )}
              >
                {cat === "Todos" ? "Todos" : cat}
              </button>
            );
          })}
        </div>

        {/* Result count */}
        <p className="hidden sm:block shrink-0 text-xs text-[var(--text-subtle)] tabular-nums">
          {totalVisible === totalAll
            ? `${totalAll} demos`
            : `${totalVisible} de ${totalAll}`}
        </p>
      </div>
    </div>
  );
}
