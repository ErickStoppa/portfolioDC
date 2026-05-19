"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { demos } from "@/data";
import { DemoCard } from "@/app/portfolio/components/DemoCard";

export function DemosPreview() {
  const [featured, ...rest] = demos;

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            {/* Label — mesmo estilo dos outros labels de seção */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-subtle)]">
                Portfólio Interativo
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text)] leading-tight">
              Produtos reais.<br />
              <span className="text-[var(--text-muted)]">
                Totalmente interativos.
              </span>
            </h2>
          </div>

          {/* Link "Ver todas" */}
          <Link
            href="/portfolio"
            className="group flex items-center gap-1.5 text-sm font-medium
                       text-[var(--primary)] hover:gap-2.5 transition-all
                       shrink-0 self-end sm:self-auto pb-1"
          >
            Ver todas as demos
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Card featured (primeiro demo) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <DemoCard demo={featured} index={0} featured />
        </motion.div>

        {/* Grid dos demais demos (máx. 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.slice(0, 4).map((demo, i) => (
            <DemoCard key={demo.id} demo={demo} index={i + 1} />
          ))}
        </div>

      </div>
    </section>
  );
}
