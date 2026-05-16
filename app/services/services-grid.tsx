"use client";

import { motion } from "framer-motion";
import {
  Globe, Layers, BarChart3, ShoppingBag, Code2, Palette,
  Zap, Target, Gauge, Monitor,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { services } from "@/data";

const iconMap: Record<string, React.ElementType> = {
  Globe, Layers, BarChart3, ShoppingBag, Code2, Palette, Zap, Target, Gauge, Monitor,
};

type BadgeVariant = "primary" | "accent" | "success" | "warning" | "muted";

const categoryColor: Record<string, BadgeVariant> = {
  Development: "primary",
  Product: "accent",
  Analytics: "success",
  Commerce: "warning",
  Architecture: "primary",
  Design: "accent",
  Strategy: "success",
  Engineering: "muted",
};

const categoryLabel: Record<string, string> = {
  Development: "Desenvolvimento",
  Product:     "Produto",
  Analytics:   "Analytics",
  Commerce:    "Comércio",
  Architecture:"Arquitetura",
  Design:      "Design",
  Engineering: "Engenharia",
  Strategy:    "Estratégia",
};

export function ServicesGrid() {
  return (
    <section className="py-16 px-5 lg:px-8 pb-32" aria-labelledby="services-grid-heading">
      <div className="mx-auto max-w-7xl">
        <h2 id="services-grid-heading" className="sr-only">Serviços</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            const variant = categoryColor[service.category] ?? "muted";
            const label = categoryLabel[service.category] ?? service.category;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="group p-7 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-card-hover)] transition-all duration-200"
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-[var(--primary-light)] flex items-center justify-center mb-5 group-hover:bg-[var(--primary)] transition-colors duration-300">
                  {Icon && (
                    <Icon
                      className="w-5 h-5 text-[var(--primary)] group-hover:text-white transition-colors duration-300"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-[var(--text)] leading-tight">{service.title}</h3>
                  <Badge variant={variant}>{label}</Badge>
                </div>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
                  {service.description}
                </p>

                <ul className="space-y-1.5" role="list" aria-label={`${service.title} funcionalidades`}>
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-[var(--text-subtle)]">
                      <span className="w-1 h-1 rounded-full bg-[var(--primary)] shrink-0" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
