"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="py-28 px-5 lg:px-8" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden p-12 text-center"
        >
          {/* Glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[var(--primary)] opacity-10 blur-[80px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 right-1/4 w-64 h-32 bg-[var(--primary-bright)] opacity-[0.08] blur-[60px] pointer-events-none"
            aria-hidden="true"
          />

          <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-4">
            Tem um projeto em mente?
          </p>
          <h2
            id="cta-heading"
            className="text-4xl sm:text-5xl font-black tracking-tight mb-5"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            A gente analisa sua ideia
            <br />
            <span className="gradient-text">sem compromisso.</span>
          </h2>
          <p className="text-[var(--text-muted)] text-lg max-w-lg mx-auto leading-relaxed mb-10">
            Manda um resumo do que você quer construir. Em até 48 horas você recebe uma resposta real — sem template, sem pitch de vendas, sem enrolação.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" asChild>
              <a
                href="mailto:contato@developmentconsulting.io"
                className="flex items-center gap-2"
              >
                Mandar mensagem
                <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
              </a>
            </Button>
            <Button variant="secondary" size="xl" asChild>
              <a href="/portfolio">Ver os projetos</a>
            </Button>
          </div>

          <p className="mt-8 text-xs text-[var(--text-subtle)]">
            Sem formulário de 10 campos. Só um e-mail.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
