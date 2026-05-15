"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

export function ServicesHero() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 px-5 lg:px-8 overflow-hidden" aria-label="Services hero">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--accent)] opacity-[0.05] blur-[100px] rounded-full" />
      </div>

      <div className="mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest mb-5"
        >
          {t("services", "eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-8"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {t("services", "headline1")}
          <br />
          <span className="gradient-text">{t("services", "headline2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl"
        >
          {t("services", "sub")}
        </motion.p>
      </div>
    </section>
  );
}
