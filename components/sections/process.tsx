"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Entender antes de propor",
    description: "Antes de qualquer orçamento ou protótipo, entendemos o que você está tentando resolver — não só o que você pediu. Uma hora de conversa boa evita semanas de retrabalho.",
  },
  {
    number: "02",
    title: "Decidir o que vai e o que não vai",
    description: "Definimos telas, fluxos e estrutura de dados antes de codar. Você aprova. Quando o desenvolvimento começa, não há mais dúvida sobre o que está sendo construído.",
  },
  {
    number: "03",
    title: "Construir em ciclos curtos",
    description: "Cada semana tem entrega real — algo que você consegue abrir no navegador e testar. Problema aparece cedo, quando ainda é barato corrigir.",
  },
  {
    number: "04",
    title: "Lançar e não sumir",
    description: "Deploy com CI/CD, monitoramento ativo e documentação que sua equipe consegue ler. O projeto termina, o produto continua rodando.",
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
              Como um projeto acontece
            </p>
            <h2
              id="process-heading"
              className="text-4xl sm:text-5xl font-black tracking-tight mb-6"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Sem surpresas
              <br />
              <span className="gradient-text">no meio do caminho.</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed max-w-md">
              Projetos travam quando o escopo não está claro. Por isso começamos definindo o que vai ser feito antes de escrever uma linha. Parece óbvio — mas poucos fazem.
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
