"use client";

import { motion } from "framer-motion";
import { RESTAURANT_INFO } from "../types/restaurant.types";

export function MenuHero() {
  const scrollToMenu = () => {
    document.getElementById("menu-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex items-center justify-center text-center px-5 h-[380px] md:h-[520px] overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #07070e 0%, #0c0c12 50%, #07070e 100%)",
      }}
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Tag pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 border border-white/10 bg-white/5 text-white/30 text-xs rounded-full px-3 py-1 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Aberto hoje — 12h às 23h
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-black text-7xl md:text-9xl tracking-[0.3em] text-white font-display"
        >
          CAIS
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base text-white/40 tracking-widest uppercase mt-2"
        >
          {RESTAURANT_INFO.tagline}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.4 }}
          className="w-16 bg-white/20 h-px mx-auto my-6"
        />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3 text-xs text-white/30 flex-wrap justify-center"
        >
          <span>★ {RESTAURANT_INFO.rating}</span>
          <span className="text-white/15">·</span>
          <span>{RESTAURANT_INFO.reviews.toLocaleString("pt-BR")} avaliações</span>
          <span className="text-white/15">·</span>
          <span>{RESTAURANT_INFO.address}</span>
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-3 mt-8 flex-wrap justify-center"
        >
          <button
            onClick={scrollToMenu}
            className="bg-white text-black font-semibold px-8 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            Ver Cardápio ↓
          </button>
          <button className="border border-white/20 text-white px-8 py-3 rounded-lg text-sm hover:bg-white/5 transition-colors">
            Fazer Reserva
          </button>
        </motion.div>
      </div>
    </section>
  );
}
