"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Check } from "lucide-react";
import type { MenuItem } from "@/data/restaurant";
import { categoryLabels } from "@/data/restaurant";
import { formatCurrency } from "@/lib/utils";
import type { OrderItem } from "../types/restaurant.types";
import { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE, COUPON_CODE, COUPON_DISCOUNT, DELIVERY_TIME_MIN, DELIVERY_TIME_MAX } from "../types/restaurant.types";
import { useEscKey, useFocusTrap } from "../hooks/hooks";

export function CartDrawer({ order, onClose, onRemove, onQtyChange, onAddDish, allDishes }: {
  order: OrderItem[]; onClose: () => void; onRemove: (id: string) => void;
  onQtyChange: (id: string, qty: number) => void; onAddDish: (d: MenuItem) => void; allDishes: MenuItem[];
}) {
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  const subtotal = order.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const discount = couponApplied ? subtotal * COUPON_DISCOUNT : 0;
  const total = subtotal - discount + delivery;
  const progress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);
  const totalQty = order.reduce((s, i) => s + i.quantity, 0);
  const upsell = allDishes.filter((d) => !order.find((o) => o.id === d.id)).slice(0, 2);

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === COUPON_CODE) { setCouponApplied(true); setCouponError(false); }
    else { setCouponError(true); setCouponApplied(false); }
  };

  useEscKey(onClose);
  useFocusTrap(sidebarRef, true);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.aside ref={sidebarRef} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className="relative w-full md:w-[400px] bg-[#0c0c14] border-l border-white/8 flex flex-col h-full"
        role="dialog" aria-modal="true" aria-label="Seu pedido">

        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <div className="flex items-center gap-2">
            <span className="font-black tracking-[0.2em] text-white font-display">CAIS</span>
            <span className="text-sm text-white/50">Seu Pedido ({totalQty})</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:bg-white/8 transition-colors" aria-label="Fechar">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 py-3 border-b border-white/6">
          <p className="text-xs text-white/50 mb-2">
            {subtotal >= FREE_DELIVERY_THRESHOLD ? "🎉 Entrega grátis!" : `Falta ${formatCurrency(FREE_DELIVERY_THRESHOLD - subtotal)} para entrega grátis!`}
          </p>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-white rounded-full" animate={{ width: `${progress}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {order.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="w-10 h-10 text-white/20 mb-3" />
              <p className="text-sm text-white/40">Seu pedido está vazio</p>
            </div>
          ) : order.map((item) => (
            <div key={item.id} className="relative flex gap-3">
              <div className="w-[72px] h-[72px] rounded-lg overflow-hidden shrink-0 bg-[#111120]">
                <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              </div>
              <div className="flex-1 min-w-0 pr-5">
                <p className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#d4a853" }}>{categoryLabels[item.category]}</p>
                <p className="text-sm font-medium text-white line-clamp-1">{item.name}</p>
                <p className="text-sm font-semibold text-white mt-0.5">{formatCurrency(item.price)}</p>
                <p className="text-[11px] text-white/30">⏱ {item.prepTime} min</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <button onClick={() => onQtyChange(item.id, item.quantity - 1)} className="w-6 h-6 rounded-md bg-white/8 flex items-center justify-center hover:bg-white/16 transition-colors" aria-label={`Diminuir ${item.name}`}><Minus className="w-3 h-3 text-white" /></button>
                  <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                  <button onClick={() => onQtyChange(item.id, item.quantity + 1)} className="w-6 h-6 rounded-md bg-white/8 flex items-center justify-center hover:bg-white/16 transition-colors" aria-label={`Aumentar ${item.name}`}><Plus className="w-3 h-3 text-white" /></button>
                </div>
              </div>
              <button onClick={() => onRemove(item.id)} className="absolute top-0 right-0 text-white/30 hover:text-red-400 transition-colors" aria-label={`Remover ${item.name}`}><X className="w-3.5 h-3.5" /></button>
            </div>
          ))}

          {order.length > 0 && upsell.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Adicione ao seu pedido</p>
              {upsell.map((dish) => (
                <div key={dish.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/4 border border-white/6 mb-2">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#111120]">
                    <img src={dish.image} alt={dish.name} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white line-clamp-1">{dish.name}</p>
                    <p className="text-xs text-white/40">{formatCurrency(dish.price)}</p>
                  </div>
                  <button onClick={() => onAddDish(dish)} className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity" aria-label={`Adicionar ${dish.name}`}><Plus className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        {order.length > 0 && (
          <div className="border-t border-white/8 px-5 py-4 space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/50">Subtotal</span><span className="text-white">{formatCurrency(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-white/50">Entrega</span><span className={delivery === 0 ? "text-green-400" : "text-white"}>{delivery === 0 ? "Grátis" : formatCurrency(delivery)}</span></div>
              {couponApplied && <div className="flex justify-between text-green-400"><span>Desconto ({COUPON_CODE})</span><span>-{formatCurrency(discount)}</span></div>}
              <div className="h-px bg-white/8" />
              <div className="flex justify-between font-bold text-white"><span>Total</span><span className="text-lg">{formatCurrency(total)}</span></div>
            </div>
            <div>
              {!showCoupon ? (
                <button onClick={() => setShowCoupon(true)} className="text-xs text-white/30 hover:text-white/60 transition-colors">Tem um cupom?</button>
              ) : (
                <div className="flex gap-2">
                  <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())} placeholder={COUPON_CODE} className="flex-1 h-8 px-3 rounded-lg bg-[#111120] border border-white/8 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white/20" aria-label="Código do cupom" />
                  <button onClick={handleApplyCoupon} className="h-8 px-3 rounded-lg bg-white text-black text-xs font-semibold">Aplicar</button>
                </div>
              )}
              {couponError && <p className="text-xs text-red-400 mt-1">Cupom inválido</p>}
              {couponApplied && <p className="text-xs text-green-400 mt-1">✓ {Math.round(COUPON_DISCOUNT * 100)}% de desconto aplicado!</p>}
            </div>
            <button onClick={() => setOrderPlaced(true)} className="w-full h-12 bg-white text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              {orderPlaced ? <><Check className="w-4 h-4" /> Pedido confirmado!</> : "Confirmar Pedido"}
            </button>
            {orderPlaced && <p className="text-xs text-white/30 text-center">Demo — nenhum pedido real.</p>}
            <p className="text-xs text-white/30 text-center">Estimativa: {DELIVERY_TIME_MIN}–{DELIVERY_TIME_MAX} minutos</p>
          </div>
        )}
      </motion.aside>
    </motion.div>
  );
}
