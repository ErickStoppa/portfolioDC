"use client";

import { useState, useMemo, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { products, categories } from "@/data/ecommerce";
import type { Product } from "@/data/ecommerce";
import type { CartItem, SortKey } from "./types/store.types";

import { AnnouncementBar } from "./components/AnnouncementBar";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { TrustBadges } from "./components/TrustBadges";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { PromoBanner } from "./components/PromoBanner";
import { CatalogSection } from "./components/CatalogSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { NewsletterSection } from "./components/NewsletterSection";
import { SiteFooter } from "./components/SiteFooter";
import { ProductModal } from "./components/ProductModal";
import { CartSidebar } from "./components/CartSidebar";

export function EcommerceApp() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("todos");
  const [sortBy, setSortBy] = useState<SortKey>("relevance");
  const [search, setSearch] = useState("");
  const [selectedColor, setSelectedColor] = useState<Record<string, string>>(
    {},
  );
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({});
  const [selectedImageIndex, setSelectedImageIndex] = useState<
    Record<string, number>
  >({});

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory === "oferta")
      list = list.filter((p) => (p.discount ?? 0) > 0 || p.badge === "Oferta");
    else if (activeCategory === "novidades")
      list = list.filter(
        (p) => p.badge === "Novo" || p.badge === "Edição Limitada",
      );
    else if (activeCategory === "mais-vendidos")
      list = list.filter((p) => p.sold >= 900);
    else if (activeCategory === "estilo")
      list = list.filter(
        (p) => p.category === "vestuario" || p.category === "calcados",
      );
    else if (activeCategory !== "todos")
      list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        [p.name, p.brand, ...(p.tags ?? [])].some((s) =>
          s.toLowerCase().includes(q),
        ),
      );
    }
    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "sold":
        list.sort((a, b) => b.sold - a.sold);
        break;
      case "new":
        list.sort((a, b) => Number(b.id.slice(1)) - Number(a.id.slice(1)));
        break;
    }
    return list;
  }, [activeCategory, search, sortBy]);

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  const addToCart = useCallback(
    (product: Product, color?: string, size?: string) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing)
          return prev.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
          );
        return [
          ...prev,
          { ...product, quantity: 1, selectedColor: color, selectedSize: size },
        ];
      });
    },
    [],
  );

  const removeFromCart = useCallback(
    (id: string) => setCart((prev) => prev.filter((i) => i.id !== id)),
    [],
  );

  const updateQty = useCallback(
    (id: string, qty: number) => {
      if (qty <= 0) {
        removeFromCart(id);
        return;
      }
      setCart((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
      );
    },
    [removeFromCart],
  );

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id],
    );
  }, []);

  const handleSelectColor = useCallback(
    (id: string, c: string) => setSelectedColor((p) => ({ ...p, [id]: c })),
    [],
  );
  const handleSelectSize = useCallback(
    (id: string, s: string) => setSelectedSize((p) => ({ ...p, [id]: s })),
    [],
  );
  const handleSelectImg = useCallback(
    (id: string, idx: number) =>
      setSelectedImageIndex((p) => ({ ...p, [id]: idx })),
    [],
  );

  const scrollToCatalog = () =>
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-[#07070e] text-white">
      <AnnouncementBar />

      <Navbar
        totalItems={totalItems}
        wishlistCount={wishlist.length}
        activeCategory={activeCategory}
        onNavClick={setActiveCategory}
        onSearchChange={setSearch}
        onOpenCart={() => setCartOpen(true)}
      />

      <HeroSection
        onExplore={scrollToCatalog}
        onBestSellers={() => setActiveCategory("mais-vendidos")}
        onOpen={setSelectedProduct}
      />

      <TrustBadges />

      <FeaturedProducts onOpen={setSelectedProduct} />

      <PromoBanner
        onViewOffers={() => {
          setActiveCategory("oferta");
          scrollToCatalog();
        }}
      />

      <CatalogSection
        filtered={filtered}
        activeCategory={activeCategory}
        sortBy={sortBy}
        categories={[...categories]}
        wishlist={wishlist}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onCategoryChange={setActiveCategory}
        onSortChange={setSortBy}
        onToggleWishlist={toggleWishlist}
        onAddToCart={addToCart}
        onOpen={setSelectedProduct}
        onSelectColor={handleSelectColor}
        onSelectSize={handleSelectSize}
      />

      <ReviewsSection />
      <NewsletterSection />
      <SiteFooter />

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            key="modal"
            product={selectedProduct}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            onToggleWishlist={toggleWishlist}
            onAddToCart={(p, color, size) => {
              addToCart(p, color, size);
              setSelectedProduct(null);
            }}
            onClose={() => setSelectedProduct(null)}
            imgIndex={selectedImageIndex[selectedProduct.id] ?? 0}
            onSelectImg={handleSelectImg}
            selectedColor={selectedColor[selectedProduct.id]}
            onSelectColor={handleSelectColor}
            selectedSize={selectedSize[selectedProduct.id]}
            onSelectSize={handleSelectSize}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <CartSidebar
            key="cart"
            cart={cart}
            onClose={() => setCartOpen(false)}
            onRemove={removeFromCart}
            onQtyChange={updateQty}
            onAddToCart={addToCart}
            allProducts={products}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
