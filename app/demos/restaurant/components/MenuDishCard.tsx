"use client";

import { useState } from "react";
import type { MenuItem } from "@/data/restaurant";
import { categoryLabels } from "@/data/restaurant";
import { formatCurrency } from "@/lib/utils";
import { StarRow } from "./StarRow";

const BADGE_CONFIGS = [
  { flag: "isChefChoice", label: "Chef's Choice", style: { background: "#d4a853", color: "#000" } },
  { flag: "isNew", label: "Novo", style: { background: "#1d6df0", color: "#fff" } },
  { flag: "isSeasonal", label: "Sazonal", style: { background: "#059669", color: "#fff" } },
] as const;

export function MenuDishCard({
  dish,
  onOpen,
}: {
  dish: MenuItem;
  onOpen: (d: MenuItem) => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex flex-col md:flex-row rounded-xl overflow-hidden border border-white/6 hover:border-white/12 transition-colors bg-[#0c0c14]">
      {/* Image */}
      <div className="relative shrink-0 w-full md:w-[280px] aspect-video md:aspect-auto md:h-[200px] overflow-hidden">
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

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {BADGE_CONFIGS.map(({ flag, label, style }) =>
            dish[flag] ? (
              <span
                key={flag}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={style}
              >
                {label}
              </span>
            ) : null,
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 md:pl-6 md:py-5 md:pr-5">
        {/* Category label */}
        <p className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#d4a853" }}>
          {categoryLabels[dish.category]}
        </p>

        {/* Name */}
        <h3 className="text-xl font-bold text-white font-display mt-1">{dish.name}</h3>

        {/* Animated underline */}
        <div className="menu-card-line h-px bg-white/20 mt-2" />

        {/* Ingredients */}
        <p className="text-xs text-white/40 mt-2 line-clamp-1">
          {dish.ingredients.join(" · ")}
        </p>

        {/* Description */}
        <p className="text-sm text-white/60 leading-relaxed line-clamp-2 mt-2 flex-1">
          {dish.description}
        </p>

        {/* Diet badges */}
        {(dish.isVegan || dish.isVegetarian || dish.isGlutenFree) && (
          <div className="flex items-center gap-3 mt-3">
            {dish.isVegan && (
              <span className="text-[10px] text-white/40">🌱 Vegano</span>
            )}
            {dish.isVegetarian && !dish.isVegan && (
              <span className="text-[10px] text-white/40">🌿 Vegetariano</span>
            )}
            {dish.isGlutenFree && (
              <span className="text-[10px] text-white/40">🌾 Sem glúten</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 gap-4">
          <div className="flex items-center gap-2">
            <StarRow rating={dish.rating} size="xs" />
            <span className="text-xs text-white/30">({dish.reviews} avaliações)</span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-xl font-bold text-white">{formatCurrency(dish.price)}</span>
            <button
              onClick={() => onOpen(dish)}
              className="text-xs text-white/40 hover:text-white underline underline-offset-2 transition-colors"
            >
              Ver prato →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
