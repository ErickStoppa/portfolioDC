"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden noise" aria-label="Hero">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Atmospheric blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[var(--primary)] opacity-[0.06] blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-[var(--primary-bright)] opacity-[0.04] blur-[100px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-24 pb-16 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-xs text-[var(--text-muted)] mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" aria-hidden="true" />
          Estúdio de engenharia de software premium
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.05]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          <span className="gradient-text">Experiências de software</span>
          <br />
          <span className="text-[var(--text)]">premium e soluções</span>
          <br />
          <span className="text-[var(--text)]">digitais excepcionais</span>
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
          className="mt-7 text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed"
        >
          Projetamos e desenvolvemos aplicações web, plataformas SaaS e produtos digitais de nível mundial para empresas que se recusam a ser comuns.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" asChild>
            <Link href="/portfolio" className="flex items-center gap-2">
              Ver Nosso Trabalho
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <a href="mailto:contato@developmentconsulting.io" className="flex items-center gap-2">
              Iniciar um Projeto
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </Button>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px border border-[var(--border)] rounded-2xl bg-[var(--border)] overflow-hidden"
        >
          {[
            { label: "Projetos Entregues",    value: "120+" },
            { label: "Satisfação do Cliente", value: "99%" },
            { label: "Anos de Excelência",    value: "8+" },
            { label: "Especialistas",         value: "24" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[var(--bg-card)] px-8 py-6 text-center">
              <p className="text-3xl font-black gradient-text-primary" style={{ fontFamily: "var(--font-outfit)" }}>{value}</p>
              <p className="text-xs text-[var(--text-subtle)] mt-1 font-medium">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
