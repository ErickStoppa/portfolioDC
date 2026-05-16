"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const principles = [
  {
    title: "Pensamento focado em engenharia",
    description: "Tratamos a qualidade do código como um requisito do produto. A dívida técnica acumula juros — mantemos o saldo baixo tomando decisões cuidadosas desde o início.",
  },
  {
    title: "Design que conquista confiança",
    description: "Uma ótima UX não é decoração. É a diferença entre software que as pessoas usam e software que as pessoas suportam.",
  },
  {
    title: "Transparência radical",
    description: "Compartilhamos nosso raciocínio, identificamos problemas antecipadamente e nunca nos escondemos. Você sempre saberá onde seu produto está e por quê.",
  },
  {
    title: "Performance como funcionalidade",
    description: "Software lento perde usuários e receita. Instrumentamos, medimos e otimizamos sem descanso — performance é uma preocupação de primeira classe.",
  },
  {
    title: "Mentalidade focada no produto",
    description: "Não somos apenas executores. Pensamos profundamente sobre seus usuários, mercado e objetivos — e nos posicionamos quando o plano não serve a essas coisas.",
  },
  {
    title: "Artesanato em cada detalhe",
    description: "Os detalhes invisíveis — estados de carregamento, mensagens de erro, navegação por teclado — são o que separa o software premium do software que simplesmente funciona.",
  },
];

export function AboutPhilosophy() {
  return (
    <section className="py-24 px-5 lg:px-8 bg-[var(--bg-secondary)]" aria-labelledby="philosophy-heading">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">
              Nossa Filosofia
            </p>
            <h2
              id="philosophy-heading"
              className="text-4xl sm:text-5xl font-black tracking-tight mb-6"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Princípios que
              <br />
              <span className="gradient-text">nunca comprometemos</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              Trabalhamos com startups, scale-ups e grandes empresas. O trabalho que dura nunca é acidental — vem de equipes que consideram certas coisas sagradas.
            </p>

            <div className="mt-10 p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
              <p className="text-sm text-[var(--text-muted)] leading-relaxed italic">
                &ldquo;O melhor software é o produto de pessoas que se importam mais com o resultado do que com a entrega.&rdquo;
              </p>
              <p className="text-xs text-[var(--text-subtle)] mt-3 font-medium">
                — Princípios Fundadores da Development Consulting
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
