"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Truck, ChevronDown } from "lucide-react";
import type { MenuItem } from "@/data/restaurant";
import type { DishFilter, SortKey } from "../types/restaurant.types";
import {
  FILTER_LABELS,
  DELIVERY_TIME_MIN,
  DELIVERY_TIME_MAX,
  FREE_DELIVERY_THRESHOLD,
  DELIVERY_FEE,
} from "../types/restaurant.types";
import { formatCurrency } from "@/lib/utils";
import { DeliveryDishCard } from "./DeliveryDishCard";

const ALL_FILTERS: DishFilter[] = [
  "todos",
  "chef",
  "novidades",
  "entradas",
  "principais",
  "massas",
  "grelhados",
  "sobremesas",
  "bebidas",
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Relevância" },
  { value: "price-asc", label: "Menor Preço" },
  { value: "price-desc", label: "Maior Preço" },
  { value: "sold", label: "Mais Pedidos" },
  { value: "new", label: "Novidades" },
];

export function DeliverySection({
  dishes,
  activeFilter,
  sortBy,
  onFilterChange,
  onSortChange,
  onDishOpen,
  onAddToOrder,
}: {
  dishes: MenuItem[];
  activeFilter: DishFilter;
  sortBy: SortKey;
  onFilterChange: (f: DishFilter) => void;
  onSortChange: (s: SortKey) => void;
  onDishOpen: (d: MenuItem) => void;
  onAddToOrder: (d: MenuItem) => void;
}) {
  return (
    <div>
      {/* Delivery banner */}
      <div className="w-full h-14 flex items-center justify-center border-b border-white/6 bg-[#0c0c14]">
        <div className="flex items-center gap-3 text-xs text-white/40 flex-wrap justify-center px-4">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" />
            Entrega em {DELIVERY_TIME_MIN}–{DELIVERY_TIME_MAX} min
          </span>
          <span className="text-white/20">·</span>
          <span>Pedido mínimo: {formatCurrency(FREE_DELIVERY_THRESHOLD)}</span>
          <span className="text-white/20">·</span>
          <span>Taxa: {formatCurrency(DELIVERY_FEE)}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="py-8">
          <h2 className="text-2xl font-black text-white font-display">Peça Agora</h2>
          <p className="text-sm text-white/40 mt-1">
            Entrega em {DELIVERY_TIME_MIN}–{DELIVERY_TIME_MAX} minutos direto na sua porta
          </p>
        </div>

        {/* Filters row */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-3">
            {/* Filter pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide flex-1">
              {ALL_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => onFilterChange(f)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeFilter === f
                      ? "bg-white text-black font-semibold"
                      : "border border-white/20 text-white/60 hover:text-white hover:border-white/40"
                  }`}
                  aria-pressed={activeFilter === f}
                >
                  {FILTER_LABELS[f]}
                </button>
              ))}
            </div>

            {/* Sort dropdown */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortKey)}
                className="appearance-none h-9 pl-3 pr-8 rounded-lg bg-[#111120] border border-white/8 text-xs text-white focus:outline-none focus:border-white/20"
                aria-label="Ordenar por"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
            </div>
          </div>

          {/* Count */}
          <p className="text-sm text-white/40">{dishes.length} pratos disponíveis</p>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-5 pb-16">
          <AnimatePresence mode="popLayout">
            {dishes.map((dish) => (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <DeliveryDishCard
                  dish={dish}
                  onOpen={onDishOpen}
                  onAdd={onAddToOrder}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
