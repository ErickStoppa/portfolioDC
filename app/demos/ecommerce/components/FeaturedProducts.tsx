"use client";

import { topSoldProducts } from "@/data/ecommerce";
import type { Product } from "@/data/ecommerce";
import { formatCurrency } from "@/lib/utils";

export function FeaturedProducts({ onOpen }: { onOpen: (p: Product) => void }) {
  return (
    <section className="max-w-7xl mx-auto px-5 py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-white font-display">
          Em Alta Agora
        </h2>
        <p className="text-sm text-white/50 mt-1">
          Os mais adicionados ao carrinho esta semana
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {topSoldProducts.map((p) => (
          <button
            key={p.id}
            onClick={() => onOpen(p)}
            className="group text-left rounded-xl overflow-hidden bg-[#0c0c18]"
            aria-label={`Ver ${p.name}`}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                loading="eager"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-white line-clamp-1">{p.name}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-semibold text-white">
                  {formatCurrency(p.price)}
                </span>
                <span className="text-[10px] text-white/40">
                  🔥 {p.sold.toLocaleString("pt-BR")} vendidos
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
