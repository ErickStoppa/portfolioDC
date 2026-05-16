"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe, Layers, BarChart3, ShoppingBag, Code2, Palette } from "lucide-react";
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
  { icon: "Globe",       title: "Desenvolvimento Web Personalizado",  description: "Aplicações web artesanais criadas para performance, escalabilidade e experiência do usuário excepcional.", category: "Desenvolvimento" },
  { icon: "Layers",      title: "Plataformas SaaS",                   description: "Produtos SaaS completos com autenticação, cobrança, multi-tenancy e tudo que o enterprise exige.",          category: "Produto" },
  { icon: "BarChart3",   title: "Dashboards e Analytics",             description: "Dashboards executivos repletos de dados que transformam informações brutas em decisões claras.",              category: "Analytics" },
  { icon: "ShoppingBag", title: "Soluções de E-commerce",             description: "Lojas virtuais e plataformas de comércio premium projetadas para converter em cada ponto de contato.",       category: "Comércio" },
  { icon: "Code2",       title: "Arquitetura Frontend",               description: "Design estratégico de sistemas frontend escaláveis e sustentáveis para equipes de qualquer tamanho.",         category: "Arquitetura" },
  { icon: "Palette",     title: "Sistemas UI/UX",                     description: "Sistemas de design e bibliotecas de componentes abrangentes que garantem consistência em escala.",            category: "Design" },
];

export function ServicesPreview() {
  return (
    <section className="py-28 px-5 lg:px-8" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">
            O que Fazemos
          </p>
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Criado para empresas que
            <br />
            <span className="gradient-text-primary">exigem o melhor</span>
          </h2>
          <p className="text-[var(--text-muted)] text-lg leading-relaxed">
            Somos especialistas em todo o espectro do desenvolvimento de produtos digitais modernos — de interfaces perfeitas a arquiteturas backend escaláveis.
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
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-150 group focus-visible:outline-none focus-visible:text-[var(--text)]"
          >
            Ver todos os serviços
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
