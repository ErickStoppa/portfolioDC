"use client";

import { DELIVERY_REVIEWS } from "../types/restaurant.types";
import { StarRow } from "./StarRow";

export function ReviewsSection() {
  return (
    <section className="max-w-7xl mx-auto px-5 py-16 border-t border-white/6">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-black text-white font-display">
          O que dizem nossos clientes
        </h2>
        <p className="text-sm text-white/40 mt-1">
          Mais de 1.800 avaliações no Google e no iFood
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DELIVERY_REVIEWS.map((review) => (
          <div
            key={review.name}
            className="p-4 rounded-xl bg-[#0c0c14] border border-white/6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: review.color, color: "#07070e" }}
              >
                {review.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{review.name}</p>
                <p className="text-[11px] text-white/40">{review.city}</p>
              </div>
            </div>

            <StarRow rating={review.rating} size="xs" />

            <p
              className="text-[11px] mt-1 mb-2"
              style={{ color: "#d4a853" }}
            >
              Pediu: {review.dish}
            </p>

            <p className="text-sm text-white/70 leading-relaxed">{review.text}</p>

            <p className="text-[11px] text-white/30 mt-3">{review.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
