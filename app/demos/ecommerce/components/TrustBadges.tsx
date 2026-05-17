"use client";

import { motion } from "framer-motion";
import { TRUST_BADGES } from "../types/store.types";

export function TrustBadges() {
  return (
    <div className="border-y border-white/6 py-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="max-w-7xl mx-auto px-5 flex gap-8 overflow-x-auto justify-center"
      >
        {TRUST_BADGES.map((badge) => (
          <motion.div
            key={badge.title}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
            className="flex items-center gap-3 shrink-0"
          >
            <span className="text-2xl">{badge.icon}</span>
            <div>
              <p className="text-sm font-bold text-white">{badge.title}</p>
              <p className="text-[11px] text-white/40">{badge.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
