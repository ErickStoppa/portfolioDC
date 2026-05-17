"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, Check, Heart } from "lucide-react";
import type { Product } from "@/data/ecommerce";
import { formatCurrency } from "@/lib/utils";
import { useIsMobile, useFocusTrap, useEscKey } from "../hooks/hooks";
import { StarRow } from "./StarRow";

export function ProductModal({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onClose,
  imgIndex,
  onSelectImg,
  selectedColor,
  onSelectColor,
  selectedSize,
  onSelectSize,
}: {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (p: Product, color?: string, size?: string) => void;
  onClose: () => void;
  imgIndex: number;
  onSelectImg: (id: string, idx: number) => void;
  selectedColor: string | undefined;
  onSelectColor: (id: string, color: string) => void;
  selectedSize: string | undefined;
  onSelectSize: (id: string, size: string) => void;
}) {
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const allImages = [product.image, ...product.images];
  const savings = product.originalPrice
    ? product.originalPrice - product.price
    : 0;

  useEscKey(onClose);
  useFocusTrap(panelRef, true);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const panelInitial = isMobile
    ? { y: "100%", opacity: 1, scale: 1 }
    : { y: 0, scale: 0.96, opacity: 0 };
  const panelAnimate = { y: 0, scale: 1, opacity: 1 };
  const panelExit = isMobile
    ? { y: "100%", opacity: 1, scale: 1 }
    : { y: 0, scale: 0.96, opacity: 0 };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        ref={panelRef}
        initial={panelInitial}
        animate={panelAnimate}
        exit={panelExit}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="relative bg-[#0c0c18] rounded-t-2xl md:rounded-2xl w-full md:max-w-[680px] max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image column */}
          <div className="md:w-1/2 p-4 flex flex-col gap-3 shrink-0">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#111120]">
              {imgError ? (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]" />
              ) : (
                <img
                  src={allImages[imgIndex] ?? product.image}
                  alt={product.name}
                  loading="eager"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              )}
              {product.badge && (
                <span className="absolute top-3 left-3 text-xs bg-black/80 text-white px-2.5 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {allImages.slice(0, 4).map((src, i) => (
                <button
                  key={i}
                  onClick={() => onSelectImg(product.id, i)}
                  className={`w-[70px] h-[70px] rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    imgIndex === i
                      ? "border-white"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Ver imagem ${i + 1}`}
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info column */}
          <div className="md:w-1/2 p-4 md:p-6 flex flex-col gap-4 overflow-y-auto">
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider">
                {product.brand}
                {product.origin ? ` · ${product.origin}` : ""}
              </p>
              <h2
                id="modal-title"
                className="text-2xl font-black text-white mt-1 font-display"
              >
                {product.name}
              </h2>
              <div className="mt-2">
                <StarRow rating={product.rating} count={product.reviews} />
              </div>
              <p className="text-xs text-white/50 mt-2">
                🚚 Chegará em {product.deliveryDays - 2}–
                {product.deliveryDays + 2} dias úteis
              </p>
            </div>

            <div className="h-px bg-white/8" />

            {/* Price */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-2xl font-bold text-white">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-white/30 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              {savings > 0 && (
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                  Economize {formatCurrency(savings)}
                </span>
              )}
            </div>

            {/* Colors */}
            {product.colors && (
              <div>
                <p className="text-xs text-white/50 mb-2">Cor:</p>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => onSelectColor(product.id, c)}
                      aria-label={`Cor ${c}`}
                      className={`w-6 h-6 rounded-full transition-all ${
                        selectedColor === c
                          ? "ring-2 ring-white ring-offset-2 ring-offset-[#0c0c18]"
                          : "opacity-60 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div>
                <p className="text-xs text-white/50 mb-2">Tamanho:</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => onSelectSize(product.id, s)}
                      className={`px-3 py-1.5 border rounded-lg text-sm transition-colors ${
                        selectedSize === s
                          ? "bg-white text-black border-white"
                          : "border-white/20 text-white/60 hover:border-white/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Meta */}
            <div className="flex gap-4 text-xs text-white/40 flex-wrap">
              {product.material && <span>Material: {product.material}</span>}
              {product.origin && <span>{product.origin}</span>}
            </div>

            <p className="text-xs text-green-400">
              ✓ {product.sold.toLocaleString("pt-BR")} pessoas compraram esta
              semana
            </p>

            {/* CTAs */}
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="flex-1 h-12 bg-white text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Adicionado!
                  </>
                ) : (
                  "Adicionar ao Carrinho"
                )}
              </button>
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`w-12 h-12 border rounded-lg flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? "border-red-500/50 bg-red-500/10"
                    : "border-white/20 hover:bg-white/8"
                }`}
                aria-label={
                  isWishlisted
                    ? "Remover dos favoritos"
                    : "Adicionar aos favoritos"
                }
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-white"}`}
                />
              </button>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-1.5">
              {product.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-white/60"
                >
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <p className="text-sm text-white/50 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
