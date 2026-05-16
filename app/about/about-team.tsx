"use client";

import { motion } from "framer-motion";
import { Code2, Palette, BarChart3, Globe } from "lucide-react";

const team = [
  {
    initials: "AR",
    name: "Alex Reeves",
    role: "Arquiteto Frontend Líder",
    bio: "10 anos entregando aplicações React performáticas para fintech, saúde e e-commerce em escala.",
    icon: Code2,
    gradient: "from-[#1d6df0] to-[#2a83ff]",
  },
  {
    initials: "MT",
    name: "Maya Torres",
    role: "Designer de Produto Principal",
    bio: "Ex-líder de design em duas startups financiadas pela YC. Obcecada com design de interação e sistemas de design.",
    icon: Palette,
    gradient: "from-rose-500 to-orange-500",
  },
  {
    initials: "JK",
    name: "James Kim",
    role: "Engenheiro Full-Stack",
    bio: "Criou e escalou pipelines de dados e sistemas em tempo real para empresas atendendo milhões de usuários.",
    icon: BarChart3,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    initials: "SC",
    name: "Sofia Carvalho",
    role: "Estrategista de UX",
    bio: "Traduz pesquisa de usuário complexa em decisões de produto que melhoram mensuravelmente a retenção e a conversão.",
    icon: Globe,
    gradient: "from-emerald-500 to-teal-500",
  },
];

export function AboutTeam() {
  return (
    <section className="py-24 px-5 lg:px-8" aria-labelledby="team-heading">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">
            A Equipe
          </p>
          <h2
            id="team-heading"
            className="text-4xl sm:text-5xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Especialistas sênior,
            <br />
            <span className="gradient-text">sem juniores</span>
          </h2>
          <p className="text-[var(--text-muted)] mt-5 leading-relaxed">
            Cada pessoa da nossa equipe é uma especialista com anos de experiência em produção. Não aprendemos no seu tempo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, i) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-strong)] transition-colors duration-200"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-4`}
                aria-hidden="true"
              >
                <span className="text-white text-sm font-bold">{member.initials}</span>
              </div>
              <h3 className="text-base font-bold text-[var(--text)]">{member.name}</h3>
              <p className="text-xs text-[var(--primary)] font-medium mt-0.5 mb-3">{member.role}</p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{member.bio}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
