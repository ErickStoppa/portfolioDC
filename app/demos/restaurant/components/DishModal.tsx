"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, Check, Plus } from "lucide-react";
import type { MenuItem } from "@/data/restaurant";
import { categoryLabels } from "@/data/restaurant";
import { formatCurrency } from "@/lib/utils";
import type { AppMode } from "../types/restaurant.types";
import { useEscKey, useFocusTrap, useIsMobile } from "../hooks/hooks";
import { StarRow } from "./StarRow";

export function DishModal({ dish, mode, imgIndex, onSelectImg, onAddToOrder, onClose }: {
  dish: MenuItem; mode: AppMode; imgIndex: number;
  onSelectImg: (id: string, idx: number) => void; onAddToOrder: (d: MenuItem) => void; onClose: () => void;
}) {
  const [added, setAdded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const allImages = Array.from(new Set([dish.image, ...dish.images]));
  const [imgErrors, setImgErrors] = useState<boolean[]>(() => Array(allImages.length).fill(false));
  const currentImg = allImages[imgIndex] ?? dish.image;
  const setImgError = (idx: number) => setImgErrors((p) => p.map((v, i) => i === idx ? true : v));

  useEscKey(onClose);
  useFocusTrap(panelRef, true);

  const panelInitial = isMobile ? { y: "100%", opacity: 1 } : { y: 0, scale: 0.96, opacity: 0 };
  const panelAnimate = isMobile ? { y: 0, opacity: 1 } : { y: 0, scale: 1, opacity: 1 };
  const panelExit = isMobile ? { y: "100%", opacity: 1 } : { y: 0, scale: 0.96, opacity: 0 };

  const handleAdd = () => { onAddToOrder(dish); setAdded(true); setTimeout(() => setAdded(false), 1500); };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div ref={panelRef} initial={panelInitial} animate={panelAnimate} exit={panelExit}
        transition={{ type: "spring", stiffness: 380, damping: 38 }}
        className="relative w-full md:max-w-4xl max-h-[92vh] md:max-h-[88vh] overflow-y-auto rounded-t-2xl md:rounded-2xl bg-[#0c0c14] border border-white/8 flex flex-col md:flex-row"
        role="dialog" aria-modal="true" aria-label={dish.name}>

        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white transition-colors" aria-label="Fechar">
          <X className="w-4 h-4" />
        </button>

        {/* Left — image */}
        <div className="w-full md:w-1/2 shrink-0 p-4 md:p-5 flex flex-col gap-3">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-[#111120]">
            {imgErrors[imgIndex] ? (
              <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#16213e]" />
            ) : (
              <img src={currentImg} alt={dish.name} className="w-full h-full object-cover" onError={() => setImgError(imgIndex)} />
            )}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {dish.isChefChoice && <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: "#d4a853", color: "#000" }}>Chef's Choice</span>}
              {dish.badge && !dish.isChefChoice && <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/80 text-white backdrop-blur-sm">{dish.badge}</span>}
            </div>
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2">
              {allImages.slice(0, 4).map((src, idx) => (
                <button key={idx} onClick={() => onSelectImg(dish.id, idx)} aria-label={`Imagem ${idx + 1}`}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${idx === imgIndex ? "border-white opacity-100" : "border-transparent opacity-60 hover:opacity-100"}`}>
                  {imgErrors[idx] ? <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#16213e]" /> : <img src={src} alt="" className="w-full h-full object-cover" onError={() => setImgError(idx)} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — info */}
        <div className="flex-1 flex flex-col p-4 md:py-5 md:pr-5 md:pl-2 overflow-y-auto">
          <p className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#d4a853" }}>{categoryLabels[dish.category]}</p>
          <h2 className="text-2xl font-black text-white font-display mt-1 leading-tight">{dish.name}</h2>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <StarRow rating={dish.rating} count={dish.reviews} size="sm" />
            <span className="text-xs text-white/50">⏱ Preparo em {dish.prepTime} minutos</span>
          </div>
          {(dish.isVegan || dish.isVegetarian || dish.isGlutenFree) && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {dish.isVegan && <span className="text-xs border border-green-500/30 text-green-400 rounded-full px-2 py-0.5">🌱 Vegano</span>}
              {dish.isVegetarian && !dish.isVegan && <span className="text-xs border border-green-500/30 text-green-400 rounded-full px-2 py-0.5">🌿 Vegetariano</span>}
              {dish.isGlutenFree && <span className="text-xs border border-amber-500/30 text-amber-400 rounded-full px-2 py-0.5">🌾 Sem Glúten</span>}
            </div>
          )}
          <div className="h-px bg-white/8 my-4" />
          <p className="text-3xl font-bold text-white">{formatCurrency(dish.price)}</p>
          <div className="mt-4">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Ingredientes principais</p>
            <div className="flex flex-wrap gap-1.5">
              {dish.ingredients.map((ing) => <span key={ing} className="text-xs border border-white/10 text-white/50 px-2.5 py-1 rounded-full">{ing}</span>)}
            </div>
          </div>
          <p className="text-sm text-white/60 leading-relaxed mt-4">{dish.description}</p>
          <ul className="mt-4 flex flex-col gap-1.5">
            {dish.ingredients.map((ing) => (
              <li key={ing} className="flex items-center gap-2 text-xs text-white/50">
                <Check className="w-3 h-3 text-green-400 shrink-0" />{ing}
              </li>
            ))}
          </ul>
          <p className="text-xs text-green-400 mt-4">{dish.sold.toLocaleString("pt-BR")} pedidos esta semana</p>
          <div className="mt-5">
            {mode === "delivery" ? (
              <button onClick={handleAdd} className="w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-white text-black hover:opacity-90 transition-opacity">
                {added ? <><Check className="w-4 h-4" /> Adicionado!</> : <><Plus className="w-4 h-4" /> Adicionar ao Pedido</>}
              </button>
            ) : (
              <p className="text-xs text-white/30 italic text-center">Disponível apenas no restaurante ou pelo Delivery</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
