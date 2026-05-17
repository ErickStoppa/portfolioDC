"use client";

import { menuItems } from "@/data/restaurant";

const STATS = [
  { value: "18 anos", label: "de história" },
  { value: "Horto próprio", label: "em Petrópolis" },
  { value: "Pescado fresco", label: "todos os dias" },
] as const;

const thumbnails = menuItems.slice(0, 4);

export function AboutSection() {
  return (
    <section className="bg-[#0c0c14] border-y border-white/6 py-16">
      <div className="max-w-4xl mx-auto px-5">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left — text */}
          <div className="flex-1">
            <p
              className="text-xs uppercase tracking-wider font-semibold"
              style={{ color: "#d4a853" }}
            >
              Nossa História
            </p>
            <h2 className="font-black text-3xl text-white font-display mt-2 leading-tight">
              Da praia ao prato,<br />uma filosofia
            </h2>
            <p className="text-sm text-white/60 leading-relaxed mt-5">
              O CAIS nasceu do encontro entre o respeito pelos ingredientes da costa brasileira e as
              técnicas clássicas da culinária mediterrânea. Nossa cozinha é um reflexo do mar: honesta,
              viva, em constante movimento.
            </p>
            <p className="text-sm text-white/60 leading-relaxed mt-4">
              Cada prato é construído em torno do produto. O pescado vem do mercado às 6h da manhã.
              Os vegetais, do horto próprio em Petrópolis. O vinho, de pequenos produtores que
              compartilham nossa obsessão por qualidade.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mt-8 flex-wrap">
              {STATS.map((s) => (
                <div key={s.value}>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image grid */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            {thumbnails.map((dish) => (
              <div
                key={dish.id}
                className="w-[140px] h-[140px] rounded-xl overflow-hidden"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
