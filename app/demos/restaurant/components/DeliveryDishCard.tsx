"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import type { MenuItem } from "@/data/restaurant";
import { categoryLabels } from "@/data/restaurant";
import { formatCurrency } from "@/lib/utils";
import { StarRow } from "./StarRow";

export function DeliveryDishCard({
  dish,
  onOpen,
  onAdd,
}: {
  dish: MenuItem;
  onOpen: (d: MenuItem) => void;
  onAdd: (d: MenuItem) => void;
}) {
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd(dish);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#0c0c14]"
      onClick={() => onOpen(dish)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {imgError ? (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#16213e]" />
        ) : (
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {dish.badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/80 text-white backdrop-blur-sm">
              {dish.badge}
            </span>
          )}
          {dish.isChefChoice && (
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "#d4a853", color: "#000" }}
            >
              Chef
            </span>
          )}
          {dish.isVegetarian && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-900/80 text-green-400">
              🌿
            </span>
          )}
        </div>

        {/* Add button */}
        <button
          onClick={handleAdd}
          aria-label={`Adicionar ${dish.name} ao pedido`}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
        >
          {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <p
          className="text-[11px] uppercase tracking-wider font-semibold"
          style={{ color: "#d4a853" }}
        >
          {categoryLabels[dish.category]}
        </p>
        <h3 className="text-sm font-medium text-white line-clamp-2 mt-0.5">{dish.name}</h3>
        <div className="flex items-center gap-1.5 mt-1">
          <StarRow rating={dish.rating} size="xs" />
          <span className="text-[10px] text-white/30">({dish.reviews})</span>
        </div>
        <p className="text-[11px] text-white/30 mt-1">⏱ {dish.prepTime} min</p>
        <p className="text-sm font-semibold text-white mt-1.5">{formatCurrency(dish.price)}</p>
        <p className="text-[11px] text-white/30 line-clamp-1 mt-0.5">
          {dish.ingredients.slice(0, 3).join(" · ")}
        </p>
      </div>
    </motion.article>
  );
}
