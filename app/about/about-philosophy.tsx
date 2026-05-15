"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function AboutPhilosophy() {
  const { t } = useLanguage();

  const principles = [
    { title: t("about", "p1title"), description: t("about", "p1desc") },
    { title: t("about", "p2title"), description: t("about", "p2desc") },
    { title: t("about", "p3title"), description: t("about", "p3desc") },
    { title: t("about", "p4title"), description: t("about", "p4desc") },
    { title: t("about", "p5title"), description: t("about", "p5desc") },
    { title: t("about", "p6title"), description: t("about", "p6desc") },
  ];

  return (
    <section className="py-24 px-5 lg:px-8 bg-[var(--bg-secondary)]" aria-labelledby="philosophy-heading">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">
              {t("about", "phEyebrow")}
            </p>
            <h2
              id="philosophy-heading"
              className="text-4xl sm:text-5xl font-black tracking-tight mb-6"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {t("about", "phHead1")}
              <br />
              <span className="gradient-text">{t("about", "phHead2")}</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              {t("about", "phSub")}
            </p>

            <div className="mt-10 p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
              <p className="text-sm text-[var(--text-muted)] leading-relaxed italic">
                {t("about", "quote")}
              </p>
              <p className="text-xs text-[var(--text-subtle)] mt-3 font-medium">
                {t("about", "quoteAuthor")}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="grid sm:grid-cols-2 gap-5">
            {principles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-strong)] transition-colors duration-200"
              >
                <CheckCircle2
                  className="w-5 h-5 text-[var(--primary)] mb-3"
                  aria-hidden="true"
                />
                <h3 className="text-sm font-bold text-[var(--text)] mb-2">{p.title}</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
