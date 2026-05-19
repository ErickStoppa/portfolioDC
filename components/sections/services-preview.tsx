"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, Layers, BarChart3, ShoppingBag, Code2, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, React.ElementType> = {
  Globe, Layers, BarChart3, ShoppingBag, Code2, Palette,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const services = [
  { icon: "Globe",       title: "Desenvolvimento Web Personalizado",  description: "Aplicações web construídas do zero, com foco em velocidade de carregamento, acessibilidade e código que a próxima pessoa consegue entender.", category: "Desenvolvimento" },
  { icon: "Layers",      title: "Plataformas SaaS",                   description: "Desde a tela de login até o painel de admin — entregamos o produto inteiro, não só a parte bonita.",                                         category: "Produto" },
  { icon: "BarChart3",   title: "Dashboards e Analytics",             description: "Painéis que mostram o que importa, sem scroll infinito nem gráfico que ninguém sabe ler. Dados fazem sentido quando a visualização é bem feita.", category: "Analytics" },
  { icon: "ShoppingBag", title: "Soluções de E-commerce",             description: "Lojas que carregam rápido, têm checkout que não espanta o cliente e inventário que não vira planilha manual.",                                 category: "Comércio" },
  { icon: "Code2",       title: "Arquitetura Frontend",               description: "Estrutura de componentes, design system e padrões de código que fazem a próxima feature levar dias, não semanas.",                              category: "Arquitetura" },
  { icon: "Palette",     title: "Sistemas UI/UX",                     description: "Interface que o usuário entende sem tutorial, em qualquer tela, em qualquer estado. Testado, não chutado.",                                      category: "Design" },
];

export function ServicesPreview() {
  return (
    <section className="py-28 px-5 lg:px-8" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">
            O que entregamos
          </p>
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Do zero ao produto —
            <br />
            <span className="gradient-text-primary">sem terceirizar a parte difícil.</span>
          </h2>
          <p className="text-[var(--text-muted)] text-lg leading-relaxed">
            Fazemos front, back e design no mesmo time. Sem sub-contratos, sem repasse de responsabilidade. Você fala com quem escreve o código.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] rounded-2xl overflow-hidden border border-[var(--border)]"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.icon}
                variants={cardVariants}
                className="group bg-[var(--bg-card)] p-8 hover:bg-[var(--bg-card-hover)] transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-[10px] bg-[var(--primary-light)] flex items-center justify-center mb-5 group-hover:bg-[var(--primary)] transition-colors duration-200">
                  {Icon && (
                    <Icon
                      className="w-5 h-5 text-[var(--primary)] group-hover:text-white transition-colors duration-200"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <Badge variant="primary" className="mb-3">
                  {service.category}
                </Badge>
                <h3 className="text-base font-semibold text-[var(--text)] mb-2 leading-tight">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer link */}
        <div className="mt-8 flex justify-end">
          <Link
            href="/services"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-150 focus-visible:outline-none focus-visible:text-[var(--text)]"
          >
            Como trabalhamos →
          </Link>
        </div>
      </div>
    </section>
  );
}
