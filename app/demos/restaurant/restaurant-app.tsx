"use client";

import { useState, useMemo, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { menuItems } from "@/data/restaurant";
import type { MenuItem } from "@/data/restaurant";
import type { OrderItem, AppMode, DishFilter, SortKey } from "./types/restaurant.types";
import { AnnouncementBanner } from "./components/AnnouncementBanner";
import { RestaurantNav } from "./components/RestaurantNav";
import { MenuHero } from "./components/MenuHero";
import { MenuSection } from "./components/MenuSection";
import { AboutSection } from "./components/AboutSection";
import { DeliverySection } from "./components/DeliverySection";
import { ReviewsSection } from "./components/ReviewsSection";
import { SiteFooter } from "./components/SiteFooter";
import { DishModal } from "./components/DishModal";
import { CartDrawer } from "./components/CartDrawer";

export function RestaurantApp() {
  const [mode, setMode] = useState<AppMode>("menu");
  const [activeFilter, setActiveFilter] = useState<DishFilter>("todos");
  const [sortBy, setSortBy] = useState<SortKey>("relevance");
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<Record<string, number>>({});

  const filteredDishes = useMemo(() => {
    let list = menuItems;
    if (activeFilter === "chef") list = list.filter((d) => d.isChefChoice);
    else if (activeFilter === "novidades") list = list.filter((d) => d.isNew);
    else if (activeFilter !== "todos") list = list.filter((d) => d.category === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.ingredients.some((i) => i.toLowerCase().includes(q)) ||
          d.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    if (sortBy === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "sold") return [...list].sort((a, b) => b.sold - a.sold);
    if (sortBy === "new") return [...list].reverse();
    return list;
  }, [activeFilter, search, sortBy]);

  const addToOrder = useCallback((dish: MenuItem, note?: string) => {
    setOrder((prev) => {
      const ex = prev.find((i) => i.id === dish.id);
      if (ex) return prev.map((i) => i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...dish, quantity: 1, note }];
    });
  }, []);

  const removeFromOrder = useCallback((id: string) => {
    setOrder((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) setOrder((prev) => prev.filter((i) => i.id !== id));
    else setOrder((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i));
  }, []);

  const handleSelectImg = useCallback((id: string, idx: number) => {
    setSelectedImageIndex((prev) => ({ ...prev, [id]: idx }));
  }, []);

  const totalItems = order.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#07070e] text-white">
      <AnnouncementBanner />
      <RestaurantNav
        mode={mode}
        onModeChange={setMode}
        totalItems={totalItems}
        onCartOpen={() => setCartOpen(true)}
        onSearchChange={setSearch}
      />

      {mode === "menu" ? (
        <>
          <MenuHero />
          <MenuSection dishes={menuItems} onDishOpen={setSelectedDish} />
          <AboutSection />
        </>
      ) : (
        <DeliverySection
          dishes={filteredDishes}
          activeFilter={activeFilter}
          sortBy={sortBy}
          onFilterChange={setActiveFilter}
          onSortChange={setSortBy}
          onDishOpen={setSelectedDish}
          onAddToOrder={addToOrder}
        />
      )}

      <ReviewsSection />
      <SiteFooter />

      <AnimatePresence>
        {selectedDish && (
          <DishModal
            key="dish-modal"
            dish={selectedDish}
            mode={mode}
            imgIndex={selectedImageIndex[selectedDish.id] ?? 0}
            onSelectImg={handleSelectImg}
            onAddToOrder={addToOrder}
            onClose={() => setSelectedDish(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && mode === "delivery" && (
          <CartDrawer
            key="cart"
            order={order}
            onClose={() => setCartOpen(false)}
            onRemove={removeFromOrder}
            onQtyChange={updateQty}
            onAddDish={addToOrder}
            allDishes={menuItems}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
