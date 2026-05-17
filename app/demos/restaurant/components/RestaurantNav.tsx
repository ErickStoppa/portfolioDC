"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag } from "lucide-react";
import type { AppMode } from "../types/restaurant.types";

export function RestaurantNav({
  mode,
  onModeChange,
  totalItems,
  onCartOpen,
  onSearchChange,
}: {
  mode: AppMode;
  onModeChange: (m: AppMode) => void;
  totalItems: number;
  onCartOpen: () => void;
  onSearchChange: (q: string) => void;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchChange = (v: string) => {
    setSearch(v);
    onSearchChange(v);
  };

  const toggleSearch = () => {
    if (searchOpen) {
      setSearch("");
      onSearchChange("");
    }
    setSearchOpen((v) => !v);
  };

  return (
    <nav
      className="sticky z-40 border-b border-white/6 backdrop-blur-xl"
      style={{
        top: "32px",
        background: "rgba(7,7,14,0.92)",
      }}
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="max-w-7xl mx-auto px-5 h-[60px] flex items-center justify-between gap-4">
        {/* Logo */}
        <span className="font-black tracking-[0.25em] text-white text-lg shrink-0 font-display">
          CAIS
        </span>

        {/* Mode toggle */}
        <div className="h-8 rounded-full flex items-center gap-0 p-0.5 border border-white/10 bg-white/6">
          {(["menu", "delivery"] as AppMode[]).map((m) => (
            <button
              key={m}
              onClick={() => onModeChange(m)}
              className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                mode === m
                  ? "bg-white text-black font-semibold"
                  : "text-white/50 hover:text-white"
              }`}
              aria-pressed={mode === m}
            >
              {m === "menu" ? "Menu" : "Delivery"}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <div className="flex items-center">
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  key="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 160, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  type="search"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Buscar prato..."
                  autoFocus
                  className="h-8 px-3 rounded-lg bg-[#111120] border border-white/8 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 mr-1"
                  aria-label="Buscar pratos"
                />
              )}
            </AnimatePresence>
            <button
              onClick={toggleSearch}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/8 transition-colors"
              aria-label="Abrir busca"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Cart — delivery only */}
          {mode === "delivery" && (
            <button
              onClick={onCartOpen}
              className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/8 transition-colors"
              aria-label={`Sacola (${totalItems} itens)`}
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 1.4 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
