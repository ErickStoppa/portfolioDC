"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, ArrowUpRight, Play, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { demos } from "@/data";
import { useLanguage } from "@/contexts/language-context";

const CATEGORIES = ["All", "Commerce", "Food & Beverage", "B2B SaaS", "Scheduling", "Enterprise"];

const gradients = [
  "from-blue-600/20 via-blue-500/10 to-blue-400/20",
  "from-rose-500/20 via-orange-500/10 to-amber-500/20",
  "from-sky-500/20 via-blue-500/10 to-blue-600/20",
  "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
  "from-amber-500/20 via-yellow-500/10 to-lime-500/20",
];

export function PortfolioClient() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = demos;
    if (activeCategory !== "All") {
      list = list.filter((d) => d.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, search]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-28 px-5 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[var(--primary)] opacity-[0.05] blur-[100px] rounded-full" />
        </div>

        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-4"
          >
            {t("portfolio", "eyebrow")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {t("portfolio", "headline1")}
            <br />
            <span className="gradient-text">{t("portfolio", "headline2")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-[var(--text-muted)] max-w-xl leading-relaxed"
          >
            {t("portfolio", "sub")}
          </motion.p>
        </div>
      </section>

      {/* Filters + Search */}
      <div className="sticky top-16 z-30 bg-[var(--bg)] border-b border-[var(--border)] py-4 px-5 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-0 max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-subtle)]"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder={t("portfolio", "searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label={t("portfolio", "searchPlaceholder")}
              className="w-full h-9 pl-9 pr-9 rounded-[8px] bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 flex-nowrap"
            role="tablist"
            aria-label="Filter by category"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                  activeCategory === cat
                    ? "bg-[var(--primary)] text-white shadow-[0_0_16px_var(--primary-glow)]"
                    : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)]"
                }`}
              >
                {cat === "All" ? t("portfolio", "all") : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-12 px-5 lg:px-8 pb-28" aria-label="Demo projects">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[var(--text-subtle)] text-lg">{t("portfolio", "noResults")}</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="mt-4 text-sm text-[var(--primary)] hover:underline"
              >
                {t("portfolio", "clearFilters")}
              </button>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((demo, i) => (
                  <motion.article
                    key={demo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <Link
                      href={`/demos/${demo.slug}`}
                      className="group block rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden hover:border-[var(--border-strong)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.35)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                    >
                      {/* Thumbnail */}
                      <div
                        className={`h-52 bg-gradient-to-br ${gradients[i % gradients.length]} relative flex items-center justify-center overflow-hidden`}
                      >
                        {/* Fake UI preview dots */}
                        <div className="absolute inset-3 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm" aria-hidden="true" />
                        <div
                          className="relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300"
                        >
                          <Play className="w-5 h-5 text-white ml-0.5" aria-hidden="true" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="accent">{demo.category}</Badge>
                          {demo.tags.slice(0, 1).map((tag) => (
                            <Badge key={tag} variant="muted">{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-sm font-bold text-[var(--text)] leading-tight group-hover:text-[var(--primary)] transition-colors duration-200">
                              {demo.title}
                            </h3>
                            <p className="text-xs text-[var(--text-subtle)] mt-1.5 leading-relaxed line-clamp-2">
                              {demo.description}
                            </p>
                          </div>
                          <div className="shrink-0 w-8 h-8 rounded-[8px] border border-[var(--border)] flex items-center justify-center text-[var(--text-subtle)] group-hover:border-[var(--primary)] group-hover:text-[var(--primary)] transition-all duration-200">
                            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                          </div>
                        </div>
                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-[var(--border-subtle)]">
                          {demo.techStack.map((tech) => (
                            <span key={tech} className="text-[10px] text-[var(--text-subtle)] px-2 py-0.5 rounded bg-[var(--bg-secondary)]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
