"use client";

import { categoryLabels } from "@/data/restaurant";
import { RESTAURANT_INFO } from "../types/restaurant.types";

const PAYMENT_METHODS = ["VISA", "MASTER", "PIX", "AMEX", "VR", "SODEXO"];

const RESTAURANT_LINKS = [
  "Sobre nós",
  "Reservas",
  "Eventos",
  "Imprensa",
  "Carreiras",
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/6 mt-16">
      <div className="max-w-7xl mx-auto px-5 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Col 1 — Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-black tracking-[0.25em] text-white text-xl font-display mb-2">
              CAIS
            </p>
            <p className="text-xs text-white/40 mb-4">{RESTAURANT_INFO.tagline}</p>
            <p className="text-xs text-white/30 leading-relaxed">
              {RESTAURANT_INFO.address}
            </p>
            <p className="text-xs text-white/30 mt-1">
              Aberto Ter–Dom, 12h–23h
            </p>
            <p className="text-xs text-white/30 mt-1">{RESTAURANT_INFO.phone}</p>
          </div>

          {/* Col 2 — Cardápio */}
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">
              Cardápio
            </p>
            <ul className="space-y-2.5">
              {Object.values(categoryLabels).map((label) => (
                <li key={label}>
                  <span className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-default">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Restaurante */}
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">
              Restaurante
            </p>
            <ul className="space-y-2.5">
              {RESTAURANT_LINKS.map((link) => (
                <li key={link}>
                  <span className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-default">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Pagamento */}
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">
              Aceitamos
            </p>
            <div className="flex flex-wrap gap-2">
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method}
                  className="text-[11px] border border-white/16 rounded px-2 py-1 text-white/50"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/6 mt-12 pt-6 text-center">
          <p className="text-[11px] text-white/20">
            © 2025 Restaurante CAIS. Gastronomia Contemporânea.
          </p>
        </div>
      </div>
    </footer>
  );
}
