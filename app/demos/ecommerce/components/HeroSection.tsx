"use client";

import { motion } from "framer-motion";
import { products } from "@/data/ecommerce";
import type { Product } from "@/data/ecommerce";

export function HeroSection({
  onExplore,
  onBestSellers,
  onOpen,
}: {
  onExplore: () => void;
  onBestSellers: () => void;
  onOpen: (p: Product) => void;
}) {
  return (
    <section className="bg-gradient-to-b from-[#07070e] to-[#0c0c18] h-[380px] md:h-[520px] flex items-center">
      <div className="max-w-7xl mx-auto px-5 w-full flex items-center gap-12">
        <div className="flex-1">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block border border-white/10 bg-white/5 text-white/30 text-xs rounded-full px-3 py-1 mb-4"
          >
            Nova Coleção 2025
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] font-display"
          >
            Crafted for those who
            <br />
            notice the details.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base text-white/50 mt-4 max-w-md"
          >
            Peças selecionadas de marcas independentes ao redor do mundo.
            Qualidade sem concessões.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 mt-6 flex-wrap"
          >
            <button
              onClick={onExplore}
              className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Explorar Coleção
            </button>
            <button
              onClick={onBestSellers}
              className="border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/8 transition-colors"
            >
              Ver Mais Vendidos
            </button>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[11px] text-white/30 mt-4"
          >
            ★ 4.9 &nbsp;·&nbsp; +12.000 clientes &nbsp;·&nbsp; Frete grátis
            &nbsp;·&nbsp; Devoluções em 30 dias
          </motion.p>
        </div>

        <div className="hidden md:grid grid-cols-2 gap-2 w-[220px] shrink-0">
          {products.slice(0, 4).map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              onClick={() => onOpen(p)}
              className="w-[104px] h-[104px] rounded-xl overflow-hidden"
              aria-label={`Ver ${p.name}`}
            >
              <img
                src={p.image}
                alt={p.name}
                loading="eager"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
