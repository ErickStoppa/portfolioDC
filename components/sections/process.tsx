"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

export function Process() {
  const { t } = useLanguage();

  const steps = [
    { number: "01", title: t("process", "step1title"), description: t("process", "step1desc") },
    { number: "02", title: t("process", "step2title"), description: t("process", "step2desc") },
    { number: "03", title: t("process", "step3title"), description: t("process", "step3desc") },
    { number: "04", title: t("process", "step4title"), description: t("process", "step4desc") },
  ];

  return (
    <section className="py-28 px-5 lg:px-8" aria-labelledby="process-heading">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">
              {t("process", "eyebrow")}
            </p>
            <h2
              id="process-heading"
              className="text-4xl sm:text-5xl font-black tracking-tight mb-6"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {t("process", "headline1")}
              <br />
              <span className="gradient-text">{t("process", "headline2")}</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed max-w-md">
              {t("process", "sub")}
            </p>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="group flex gap-6 py-8 border-b border-[var(--border-subtle)] last:border-0"
              >
                <div className="shrink-0 w-16">
                  <span
                    className="text-4xl font-black select-none transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-outfit)",
                      color: "var(--border-strong)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "linear-gradient(135deg,#6ea8ff,#2a83ff)";
                      el.style.webkitBackgroundClip = "text";
                      el.style.backgroundClip = "text";
                      el.style.webkitTextFillColor = "transparent";
                      el.style.color = "transparent";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "";
                      el.style.webkitBackgroundClip = "";
                      el.style.backgroundClip = "";
                      el.style.webkitTextFillColor = "";
                      el.style.color = "var(--border-strong)";
                    }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
