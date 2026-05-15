"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { demos } from "@/data";
import { useLanguage } from "@/contexts/language-context";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const gradients = [
  "from-blue-600/20 to-blue-400/20",
  "from-rose-500/20 to-orange-500/20",
  "from-cyan-500/20 to-blue-500/20",
  "from-emerald-500/20 to-teal-500/20",
  "from-amber-500/20 to-yellow-500/20",
];

export function DemosPreview() {
  const { t } = useLanguage();

  return (
    <section className="py-28 px-5 lg:px-8 bg-[var(--bg-secondary)]" aria-labelledby="demos-heading">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest mb-3">
              {t("demosPreview", "eyebrow")}
            </p>
            <h2
              id="demos-heading"
              className="text-4xl sm:text-5xl font-black tracking-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {t("demosPreview", "headline1")}
              <br />
              <span className="gradient-text">{t("demosPreview", "headline2")}</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors group focus-visible:outline-none focus-visible:text-[var(--text)] shrink-0"
          >
            {t("demosPreview", "viewAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* Featured large card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          custom={0}
          className="mb-4"
        >
          <Link href={`/demos/${demos[0].slug}`} className="group block focus-visible:outline-none">
            <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden hover:border-[var(--border-strong)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
              {/* Thumbnail placeholder */}
              <div
                className={`h-72 sm:h-96 bg-gradient-to-br ${gradients[0]} flex items-center justify-center relative`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-white ml-1" aria-hidden="true" />
                  </div>
                </div>
                <span
                  className="text-8xl font-black text-white/5 select-none"
                  style={{ fontFamily: "var(--font-outfit)" }}
                  aria-hidden="true"
                >
                  {demos[0].title.split("—")[0].trim()}
                </span>
              </div>
              <div className="p-6 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="accent">{demos[0].category}</Badge>
                    {demos[0].tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="muted">{tag}</Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text)]">{demos[0].title}</h3>
                  <p className="text-sm text-[var(--text-muted)] mt-1 leading-relaxed max-w-lg">
                    {demos[0].description}
                  </p>
                </div>
                <div className="shrink-0 w-10 h-10 rounded-[10px] border border-[var(--border)] flex items-center justify-center text-[var(--text-subtle)] group-hover:text-[var(--primary)] group-hover:border-[var(--primary)] transition-all duration-200">
                  <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Small grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {demos.slice(1).map((demo, i) => (
            <motion.div
              key={demo.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i + 1}
            >
              <Link href={`/demos/${demo.slug}`} className="group block focus-visible:outline-none">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden hover:border-[var(--border-strong)] transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                  <div
                    className={`h-32 bg-gradient-to-br ${gradients[i + 1]} flex items-center justify-center relative`}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-4 h-4 text-white ml-0.5" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="p-4">
                    <Badge variant="muted" className="mb-2">{demo.category}</Badge>
                    <h3 className="text-sm font-semibold text-[var(--text)] leading-tight">
                      {demo.title.split("—")[0].trim()}
                    </h3>
                    <p className="text-xs text-[var(--text-subtle)] mt-1 leading-relaxed line-clamp-2">
                      {demo.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
