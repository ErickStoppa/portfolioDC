"use client";

import { motion } from "framer-motion";
import { techStack } from "@/data";

export function TechStack() {
  const doubled = [...techStack, ...techStack];

  return (
    <section className="py-20 overflow-hidden border-y border-[var(--border-subtle)]" aria-label="A stack que está em produção nos nossos projetos">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 mb-10 text-center">
        <p className="text-xs font-semibold text-[var(--text-subtle)] uppercase tracking-widest">
          A stack que está em produção nos nossos projetos
        </p>
      </div>
      <div className="relative flex" aria-hidden="true">
        {/* Left fade edge */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--bg), transparent)" }} />
        {/* Right fade edge */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />
        <motion.div
          className="flex gap-4 pr-4 shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
          style={{ willChange: "transform" }}
        >
          {doubled.map((tech, i) => (
            <div
              key={i}
              className="shrink-0 px-5 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-sm font-medium text-[var(--text-muted)] whitespace-nowrap hover:border-[var(--border-brand)] hover:text-[var(--text)] transition-colors duration-200 cursor-default"
            >
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
