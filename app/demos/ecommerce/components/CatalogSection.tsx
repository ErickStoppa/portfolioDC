"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Product } from "@/data/ecommerce";
import type { SortKey } from "../types/store.types";
import { CATEGORY_LABELS } from "../types/store.types";
import { ProductCard } from "./ProductCard";

export function CatalogSection({
  filtered,
  activeCategory,
  sortBy,
  categories,
  wishlist,
  selectedColor,
  selectedSize,
  onCategoryChange,
  onSortChange,
  onToggleWishlist,
  onAddToCart,
  onOpen,
  onSelectColor,
  onSelectSize,
}: {
  filtered: Product[];
  activeCategory: string;
  sortBy: SortKey;
  categories: string[];
  wishlist: string[];
  selectedColor: Record<string, string>;
  selectedSize: Record<string, string>;
  onCategoryChange: (cat: string) => void;
  onSortChange: (sort: SortKey) => void;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (p: Product, color?: string, size?: string) => void;
  onOpen: (p: Product) => void;
  onSelectColor: (id: string, c: string) => void;
  onSelectSize: (id: string, s: string) => void;
}) {
  return (
    <section id="catalog" className="max-w-7xl mx-auto px-5 py-12">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-black text-white font-display">
            Coleção Completa
          </h2>
          <p className="text-sm text-white/40 mt-0.5">
            {filtered.length} produtos encontrados
          </p>
        </div>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className="appearance-none h-9 pl-3 pr-8 rounded-lg bg-[#111120] border border-white/8 text-xs text-white focus:outline-none focus:border-white/20"
            aria-label="Ordenar por"
          >
            <option value="relevance">Relevância</option>
            <option value="price-asc">Menor Preço</option>
            <option value="price-desc">Maior Preço</option>
            <option value="sold">Mais Vendidos</option>
            <option value="new">Novidades</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm transition-all ${
              activeCategory === cat
                ? "bg-white text-black font-semibold"
                : "border border-white/20 text-white/60 hover:text-white hover:border-white/40"
            }`}
          >
            {CATEGORY_LABELS[cat] ?? cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onOpen={onOpen}
              selectedColor={selectedColor[product.id]}
              onSelectColor={onSelectColor}
              selectedSize={selectedSize[product.id]}
              onSelectSize={onSelectSize}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
