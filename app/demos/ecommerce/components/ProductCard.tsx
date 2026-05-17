"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/data/ecommerce";
import { formatCurrency } from "@/lib/utils";
import { StarRow } from "./StarRow";

export function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpen,
  selectedColor,
  onSelectColor,
  selectedSize,
  onSelectSize,
}: {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (p: Product, color?: string, size?: string) => void;
  onOpen: (p: Product) => void;
  selectedColor: string | undefined;
  onSelectColor: (id: string, color: string) => void;
  selectedSize: string | undefined;
  onSelectSize: (id: string, size: string) => void;
}) {
  const [heartScale, setHeartScale] = useState(1);
  const [imgError, setImgError] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeartScale(1.3);
    setTimeout(() => setHeartScale(1), 200);
    onToggleWishlist(product.id);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor, selectedSize);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#0c0c18]"
      onClick={() => onOpen(product)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {imgError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]" />
        ) : (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badge && (
            <span className="text-[10px] bg-black/80 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
              {product.badge}
            </span>
          )}
          {product.discount && (
            <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
          onClick={handleWishlist}
          aria-label={
            isWishlisted
              ? `Remover ${product.name} dos favoritos`
              : `Adicionar ${product.name} aos favoritos`
          }
        >
          <motion.div
            animate={{ scale: heartScale }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-white"}`}
            />
          </motion.div>
        </button>

        {/* Quick-add — CSS group-hover slide up */}
        <div
          className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {product.sizes ? (
            <div className="bg-[#0c0c18]/95 backdrop-blur-sm px-3 py-2 flex items-center gap-1.5">
              {product.sizes.slice(0, 4).map((s) => (
                <button
                  key={s}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSize(product.id, s);
                  }}
                  className={`text-xs px-2 py-1 rounded border transition-colors ${
                    selectedSize === s
                      ? "bg-white text-black border-white"
                      : "border-white/20 text-white/60 hover:border-white/40"
                  }`}
                >
                  {s}
                </button>
              ))}
              <button
                onClick={handleQuickAdd}
                className="ml-auto text-xs bg-white text-black font-semibold px-3 py-1.5 rounded"
              >
                Adicionar
              </button>
            </div>
          ) : (
            <button
              onClick={handleQuickAdd}
              className="w-full h-10 bg-white text-black font-semibold text-sm flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" /> Adicionar ao Carrinho
            </button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-[11px] text-white/40 uppercase tracking-wider">
          {product.brand}
        </p>
        <p className="text-sm font-medium text-white line-clamp-2 mt-0.5">
          {product.name}
        </p>
        <div className="mt-1">
          <StarRow rating={product.rating} count={product.reviews} size="xs" />
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-sm font-semibold text-white">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-white/30 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>
        {product.colors && (
          <div
            className="flex items-center gap-1.5 mt-2"
            onClick={(e) => e.stopPropagation()}
          >
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectColor(product.id, c);
                }}
                aria-label={`Cor ${c}`}
                className={`w-3 h-3 rounded-full border border-white/20 transition-transform ${
                  selectedColor === c
                    ? "scale-125 ring-1 ring-white ring-offset-1 ring-offset-[#0c0c18]"
                    : ""
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
