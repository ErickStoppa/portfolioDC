"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data";

export function Testimonials() {
  return (
    <section
      className="py-28 px-5 lg:px-8 bg-[var(--bg-secondary)]"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">
            O que dizem quem já trabalhou com a gente
          </p>
          <h2
            id="testimonials-heading"
            className="text-4xl sm:text-5xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Na prática,{" "}
            <span className="gradient-text">o que muda.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="flex flex-col gap-5 p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-strong)] transition-colors duration-200"
            >
              {/* Stars */}
              <div className="flex gap-1" aria-label={`${item.rating} de 5 estrelas`}>
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">
                &ldquo;{item.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
                <div
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-xs font-bold text-white shrink-0"
                  aria-hidden="true"
                >
                  {item.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text)]">{item.name}</p>
                  <p className="text-xs text-[var(--text-subtle)]">
                    {item.role}, {item.company}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
