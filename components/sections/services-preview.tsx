"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe, Layers, BarChart3, ShoppingBag, Code2, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/language-context";

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

export function ServicesPreview() {
  const { t } = useLanguage();

  const services = [
    { icon: "Globe",       title: t("servicesPreview", "s1title"), description: t("servicesPreview", "s1desc"), category: t("services", "cat_dev") },
    { icon: "Layers",      title: t("servicesPreview", "s2title"), description: t("servicesPreview", "s2desc"), category: t("services", "cat_prod") },
    { icon: "BarChart3",   title: t("servicesPreview", "s3title"), description: t("servicesPreview", "s3desc"), category: t("services", "cat_anal") },
    { icon: "ShoppingBag", title: t("servicesPreview", "s4title"), description: t("servicesPreview", "s4desc"), category: t("services", "cat_comm") },
    { icon: "Code2",       title: t("servicesPreview", "s5title"), description: t("servicesPreview", "s5desc"), category: t("services", "cat_arch") },
    { icon: "Palette",     title: t("servicesPreview", "s6title"), description: t("servicesPreview", "s6desc"), category: t("services", "cat_des") },
  ];

  return (
    <section className="py-28 px-5 lg:px-8" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">
            {t("servicesPreview", "eyebrow")}
          </p>
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {t("servicesPreview", "headline1")}
            <br />
            <span className="gradient-text-primary">{t("servicesPreview", "headline2")}</span>
          </h2>
          <p className="text-[var(--text-muted)] text-lg leading-relaxed">
            {t("servicesPreview", "sub")}
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
            {t("servicesPreview", "viewAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
