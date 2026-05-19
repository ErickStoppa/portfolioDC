"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchX } from "lucide-react";
import { demos } from "@/data";
import { GuideBanner } from "./components/GuideBanner";
import { FilterBar }   from "./components/FilterBar";
import { DemoCard }    from "./components/DemoCard";

/* ─── Animated counter hook ─────────────────────────────────── */
function useCountUp(target: number, duration = 900) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return count;
}

export function PortfolioClient() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [search, setSearch]                 = useState("");

  const categories = useMemo(
    () => ["todos", ...Array.from(new Set(demos.map((d) => d.category)))],
    []
  );

  const filtered = useMemo(() => {
    let list = [...demos];
    if (activeCategory !== "todos")
      list = list.filter((d) => d.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((d) =>
        [d.title, d.description, d.category, ...d.tags].some((s) =>
          s.toLowerCase().includes(q)
        )
      );
    }
    return list;
  }, [activeCategory, search]);

  const animatedCount = useCountUp(demos.length);

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Page header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-subtle)]">
              Demos Interativas
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text)] mb-3 leading-tight">
            Explore os projetos
          </h1>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl leading-relaxed">
            Cada card é um site completo e funcional. Navegue, interaja e explore como se
            fosse o produto real.{" "}
            <span className="text-[var(--text-subtle)] tabular-nums">
              {animatedCount} projetos disponíveis.
            </span>
          </p>
        </motion.div>

        {/* ── Guide banner ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-6"
        >
          <GuideBanner />
        </motion.div>

        {/* ── Filters ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="mb-8"
        >
          <FilterBar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            search={search}
            onSearchChange={setSearch}
            total={filtered.length}
          />
        </motion.div>

        {/* ── Demo grid ────────────────────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((demo, index) => (
              <DemoCard key={demo.id} demo={demo} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Empty state ──────────────────────────────────────────── */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div
                className="w-14 h-14 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)]
                            flex items-center justify-center mb-4"
              >
                <SearchX size={22} className="text-[var(--text-subtle)]" aria-hidden="true" />
              </div>
              <p className="text-[var(--text)] font-semibold mb-1">
                Nenhuma demo encontrada
              </p>
              <p className="text-[var(--text-muted)] text-sm mb-4">
                Tente outro filtro ou termo de busca.
              </p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("todos"); }}
                className="text-sm text-[var(--primary)] hover:text-[var(--primary-bright)] hover:underline transition-colors"
              >
                Limpar filtros
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
