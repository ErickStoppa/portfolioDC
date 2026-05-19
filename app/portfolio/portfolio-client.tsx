"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { demos } from "@/data";
import { GuideBanner } from "./components/GuideBanner";
import { FilterBar }   from "./components/FilterBar";
import { DemoCard }    from "./components/DemoCard";

// Derive categories from data so the list is always in sync
const ALL_LABEL = "Todos";
const CATEGORIES = [
  ALL_LABEL,
  ...Array.from(new Set(demos.map((d) => d.category))),
];

export function PortfolioClient() {
  const [activeCategory, setActiveCategory] = useState(ALL_LABEL);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = demos;
    if (activeCategory !== ALL_LABEL) {
      list = list.filter((d) => d.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, search]);

  return (
    <div className="min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-5 lg:px-8 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] rounded-full pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(ellipse, var(--primary-glow) 0%, transparent 70%)",
            opacity: 0.35,
          }}
        />

        <div className="mx-auto max-w-7xl relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-4"
          >
            Demos Interativos
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.07] mb-5"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Produtos reais,
            <br />
            <span className="gradient-text">totalmente interativos</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="text-base text-[var(--text-muted)] max-w-lg leading-relaxed mb-8"
          >
            Cada demo é um protótipo de produto completo — não um mockup estático.
            Navegue, filtre e experimente a qualidade que entregamos.
          </motion.p>

          {/* Guide banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.28 }}
          >
            <GuideBanner demoCount={demos.length} />
          </motion.div>
        </div>
      </section>

      {/* ── Sticky filter bar ─────────────────────────────────────────── */}
      <FilterBar
        search={search}
        onSearch={setSearch}
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategory={setActiveCategory}
        totalVisible={filtered.length}
        totalAll={demos.length}
      />

      {/* ── Grid ──────────────────────────────────────────────────────── */}
      <section className="py-10 px-5 lg:px-8 pb-28" aria-label="Demos interativos">
        <div className="mx-auto max-w-7xl">

          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-28"
            >
              <p className="text-4xl mb-4" aria-hidden="true">🔍</p>
              <p className="text-[var(--text-subtle)] text-base font-medium">
                Nenhum demo corresponde à sua busca.
              </p>
              <button
                onClick={() => { setSearch(""); setActiveCategory(ALL_LABEL); }}
                className="mt-4 text-sm text-[var(--primary)] hover:text-[var(--primary-bright)] hover:underline transition-colors"
              >
                Limpar filtros
              </button>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((demo, i) => (
                  <DemoCard key={demo.id} demo={demo} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Bottom count */}
          {filtered.length > 0 && (
            <p className="mt-12 text-center text-xs text-[var(--text-faint)]">
              {filtered.length} demo{filtered.length !== 1 ? "s" : ""} disponíve{filtered.length !== 1 ? "is" : "l"}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
