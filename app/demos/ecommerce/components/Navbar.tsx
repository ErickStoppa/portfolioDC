"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Heart } from "lucide-react";
import { NAV_LINKS } from "../types/store.types";

export function Navbar({
  totalItems,
  wishlistCount,
  activeCategory,
  onNavClick,
  onSearchChange,
  onOpenCart,
}: {
  totalItems: number;
  wishlistCount: number;
  activeCategory: string;
  onNavClick: (cat: string) => void;
  onSearchChange: (q: string) => void;
  onOpenCart: () => void;
}) {
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

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
      className="sticky z-40 border-b border-white/6"
      style={{
        top: "32px",
        background: "rgba(7,7,14,0.92)",
        backdropFilter: "blur(20px)",
      }}
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="max-w-7xl mx-auto px-5 h-[60px] flex items-center justify-between gap-4">
        <span className="text-white font-black tracking-[0.2em] text-lg shrink-0 font-display">
          LUXE
        </span>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.value}
              onClick={() => onNavClick(link.value)}
              className={`text-xs transition-colors ${
                activeCategory === link.value
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

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
                  placeholder="Buscar..."
                  autoFocus
                  className="h-8 px-3 rounded-lg bg-[#111120] border border-white/8 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 mr-1"
                  aria-label="Buscar produtos"
                />
              )}
            </AnimatePresence>
            <button
              onClick={toggleSearch}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/8 transition-colors"
              aria-label="Abrir busca"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist */}
          <button
            className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/8 transition-colors"
            aria-label={`Favoritos (${wishlistCount})`}
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={onOpenCart}
            className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/8 transition-colors"
            aria-label={`Sacola (${totalItems} itens)`}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--primary)] text-white text-[10px] font-black flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
