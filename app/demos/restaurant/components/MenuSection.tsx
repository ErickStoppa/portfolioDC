"use client";

import { menuCategories, categoryLabels } from "@/data/restaurant";
import type { MenuItem } from "@/data/restaurant";
import { MenuDishCard } from "./MenuDishCard";

export function MenuSection({
  dishes,
  onDishOpen,
}: {
  dishes: MenuItem[];
  onDishOpen: (d: MenuItem) => void;
}) {
  return (
    <section id="menu-section" className="max-w-4xl mx-auto px-5">
      {/* Header */}
      <div className="text-center py-16">
        <h2 className="text-3xl font-black text-white font-display">Nossa Carta</h2>
        <p className="text-sm text-white/40 mt-2">
          Uma curadoria que celebra o melhor do mar e da terra
        </p>
      </div>

      {/* Categories */}
      {menuCategories.map((cat, catIdx) => {
        const catDishes = dishes.filter((d) => d.category === cat);
        if (catDishes.length === 0) return null;
        return (
          <div key={cat} className={catIdx === 0 ? "pb-14" : "py-14 border-t border-white/6"}>
            {/* Category header */}
            <div className={catIdx === 0 ? "" : "pt-2"}>
              <h3 className="font-black text-2xl text-white font-display">
                {categoryLabels[cat]}
              </h3>
              <div className="w-full h-px bg-white/8 mt-3" />
            </div>

            {/* Dish list */}
            <div className="flex flex-col gap-6 mt-8">
              {catDishes.map((dish) => (
                <MenuDishCard key={dish.id} dish={dish} onOpen={onDishOpen} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
