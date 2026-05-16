"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Descoberta e Estratégia",
    description: "Começamos entendendo seus objetivos de negócio, usuários e restrições técnicas. Cada decisão que segue é baseada em pesquisa e pensamento estratégico.",
  },
  {
    number: "02",
    title: "Design e Arquitetura",
    description: "Projetamos o sistema do zero — componentes de UI, modelos de dados, contratos de API. As decisões são tomadas explicitamente, antes de uma linha de código ser escrita.",
  },
  {
    number: "03",
    title: "Engenharia e Iteração",
    description: "Construímos em ciclos focados com feedback contínuo. Cada sprint entrega software funcional que você pode ver, testar e responder.",
  },
  {
    number: "04",
    title: "Entrega e Escala",
    description: "Entregamos com pipelines de CI/CD, monitoramento e documentação em vigor. Seu produto é construído para crescer — técnica e comercialmente.",
  },
];

export function Process() {
  return (
    <section className="py-28 px-5 lg:px-8" aria-labelledby="process-heading">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">
              Como Trabalhamos
            </p>
            <h2
              id="process-heading"
              className="text-4xl sm:text-5xl font-black tracking-tight mb-6"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Processo rigoroso.
              <br />
              <span className="gradient-text">Resultados excepcionais.</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed max-w-md">
              Seguimos um processo testado em batalha que elimina ambiguidade, mantém as partes alinhadas e entrega software que funciona — na primeira vez.
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
