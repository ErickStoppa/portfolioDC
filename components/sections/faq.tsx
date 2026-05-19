"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Vocês fazem projetos pequenos ou só contratos grandes?",
    a: "Fazemos projetos de todos os tamanhos — desde uma landing page bem feita até um sistema completo. O que define se trabalhamos juntos não é o tamanho, é se conseguimos entregar valor real para o que você precisa.",
  },
  {
    q: "Qual é o prazo médio de um projeto?",
    a: "Depende do escopo. Uma aplicação com autenticação, dashboard e área do cliente leva entre 6 e 10 semanas. Uma landing page com animações, 1 a 2 semanas. A gente define isso junto antes de começar — e mantém.",
  },
  {
    q: "Preciso ter o design pronto para contratar?",
    a: "Não. Se você tem ideia mas não tem interface, trabalhamos o design junto com o desenvolvimento. Se você já tem design, seguimos ele. Das duas formas funciona.",
  },
  {
    q: "Consigo acompanhar o que está sendo feito?",
    a: "Sim. Você tem acesso ao repositório desde o primeiro dia e recebe atualizações semanais. Nada de surpresa no final — você vê o projeto crescendo em tempo real.",
  },
  {
    q: "Usam IA para gerar código?",
    a: "Usamos ferramentas de IA como assistência — para testes, documentação e sugestões de refatoração. O código que vai para produção é revisado por humano que entende o que está aprovando. Não entregamos saída de prompt sem revisão.",
  },
  {
    q: "Depois que o projeto termina, vocês dão suporte?",
    a: "Sim. Nos primeiros 30 dias pós-lançamento, qualquer bug é corrigido sem custo adicional. Para manutenção contínua, temos planos mensais. Não sumimos depois da entrega.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "50% no início do projeto, 50% na entrega. Para projetos maiores, dividimos em marcos. Nunca pedimos 100% adiantado.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-5 lg:px-8" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">
            Perguntas frequentes
          </p>
          <h2
            id="faq-heading"
            className="text-4xl sm:text-5xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            O que as pessoas sempre perguntam.
          </h2>
        </div>

        <div>
          {faqs.map((item, i) => (
            <div
              key={i}
              className="border-b border-[var(--border)] py-5 cursor-pointer"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-[var(--text)] text-[15px] pr-4">
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  className={cn(
                    "text-[var(--text-muted)] shrink-0 transition-transform duration-200",
                    openIndex === i && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </div>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="text-[var(--text-muted)] text-[14px] leading-relaxed pt-3 pb-1">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
