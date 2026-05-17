"use client";

export function PromoBanner({ onViewOffers }: { onViewOffers: () => void }) {
  return (
    <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] h-[100px] flex items-center">
      <div className="max-w-7xl mx-auto px-5 w-full flex items-center justify-between gap-4">
        <p className="text-white font-semibold text-sm md:text-base">
          SALE — Até 30% OFF em peças selecionadas. Somente esta semana.
        </p>
        <button
          onClick={onViewOffers}
          className="shrink-0 bg-white text-black font-semibold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity"
        >
          Ver Ofertas
        </button>
      </div>
    </div>
  );
}
