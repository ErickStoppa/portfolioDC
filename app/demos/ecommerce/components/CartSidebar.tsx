"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, X, Minus, Plus, Check } from "lucide-react";
import type { Product } from "@/data/ecommerce";
import { formatCurrency } from "@/lib/utils";
import type { CartItem } from "../types/store.types";
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
  COUPON_CODE,
  COUPON_DISCOUNT,
} from "../types/store.types";
import { useFocusTrap, useEscKey } from "../hooks/hooks";

export function CartSidebar({
  cart,
  onClose,
  onRemove,
  onQtyChange,
  onAddToCart,
  allProducts,
}: {
  cart: CartItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onQtyChange: (id: string, qty: number) => void;
  onAddToCart: (p: Product) => void;
  allProducts: Product[];
}) {
  const [showCoupon, setShowCoupon] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discountAmount = couponApplied ? subtotal * COUPON_DISCOUNT : 0;
  const total = subtotal - discountAmount + shipping;
  const freeShippingProgress = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );
  const cartIds = new Set(cart.map((i) => i.id));
  const upsell = allProducts.filter((p) => !cartIds.has(p.id)).slice(0, 2);

  const handleApplyCoupon = () => {
    if (coupon === COUPON_CODE) {
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
      setCouponApplied(false);
    }
  };

  useEscKey(onClose);
  useFocusTrap(sidebarRef, true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.aside
        ref={sidebarRef}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className="relative w-full md:w-[400px] bg-[#0c0c18] border-l border-white/8 flex flex-col h-full"
        role="dialog"
        aria-modal="true"
        aria-label="Sacola de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <div className="flex items-center gap-2">
            <span className="font-black tracking-[0.2em] text-white font-display">
              LUXE
            </span>
            <span className="text-sm text-white/50">
              Sacola ({cart.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:bg-white/8 transition-colors"
            aria-label="Fechar sacola"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free shipping bar */}
        <div className="px-5 py-3 border-b border-white/6">
          <p className="text-xs text-white/50 mb-2">
            {subtotal >= FREE_SHIPPING_THRESHOLD
              ? "🎉 Você ganhou frete grátis!"
              : `Falta ${formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} para frete grátis!`}
          </p>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              animate={{ width: `${freeShippingProgress}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <ShoppingBag className="w-10 h-10 text-white/20 mb-3" />
              <p className="text-sm text-white/40">Sua sacola está vazia</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="relative flex gap-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#111120]">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 pr-5">
                  <p className="text-[11px] text-white/40 uppercase tracking-wider">
                    {item.brand}
                  </p>
                  <p className="text-sm font-medium text-white line-clamp-1">
                    {item.name}
                  </p>
                  {(item.selectedColor || item.selectedSize) && (
                    <p className="text-xs text-white/40 mt-0.5">
                      {[item.selectedSize, item.selectedColor]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                  <p className="text-sm font-semibold text-white mt-1">
                    {formatCurrency(item.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onQtyChange(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-md bg-white/8 flex items-center justify-center hover:bg-white/16 transition-colors"
                      aria-label={`Diminuir quantidade de ${item.name}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onQtyChange(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-md bg-white/8 flex items-center justify-center hover:bg-white/16 transition-colors"
                      aria-label={`Aumentar quantidade de ${item.name}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button className="ml-1 text-xs text-white/30 hover:text-white/60 transition-colors">
                      Salvar para depois
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="absolute top-0 right-0 text-white/30 hover:text-red-400 transition-colors"
                  aria-label={`Remover ${item.name}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}

          {/* Upsell */}
          {cart.length > 0 && upsell.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
                Complete o Look
              </p>
              <div className="flex flex-col gap-2">
                {upsell.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-2 rounded-lg bg-white/4 border border-white/6"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#111120]">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white line-clamp-1">
                        {p.name}
                      </p>
                      <p className="text-xs text-white/40">
                        {formatCurrency(p.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => onAddToCart(p)}
                      className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shrink-0"
                      aria-label={`Adicionar ${p.name} ao carrinho`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-white/8 px-5 py-4 space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Subtotal</span>
                <span className="text-white">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Frete</span>
                <span
                  className={shipping === 0 ? "text-green-400" : "text-white"}
                >
                  {shipping === 0 ? "Grátis" : formatCurrency(shipping)}
                </span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-green-400 text-sm">
                  <span>Desconto ({COUPON_CODE})</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="h-px bg-white/8" />
              <div className="flex justify-between font-bold text-white">
                <span>Total</span>
                <span className="text-lg">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Coupon */}
            <div>
              {!showCoupon ? (
                <button
                  onClick={() => setShowCoupon(true)}
                  className="text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  Tem um cupom?
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    placeholder={COUPON_CODE}
                    className="flex-1 h-8 px-3 rounded-lg bg-[#111120] border border-white/8 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white/20"
                    aria-label="Código do cupom"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="h-8 px-3 rounded-lg bg-white text-black text-xs font-semibold"
                  >
                    Aplicar
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-xs text-red-400 mt-1">Cupom inválido</p>
              )}
              {couponApplied && (
                <p className="text-xs text-green-400 mt-1">
                  ✓ {Math.round(COUPON_DISCOUNT * 100)}% de desconto aplicado!
                </p>
              )}
            </div>

            <button
              onClick={() => setCheckedOut(true)}
              className="w-full h-12 bg-white text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              {checkedOut ? (
                <>
                  <Check className="w-4 h-4" /> Pedido Realizado!
                </>
              ) : (
                "Finalizar Compra"
              )}
            </button>
            <p className="text-xs text-white/40 text-center">
              ou parcele em 12x de {formatCurrency(total / 12)} sem juros
            </p>
          </div>
        )}
      </motion.aside>
    </motion.div>
  );
}
