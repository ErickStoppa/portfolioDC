"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const rows = [
  { criteria: "Quem escreve o código",      agency: "Júnior alocado no projeto",  dc: "Quem está na call com você" },
  { criteria: "Tempo para primeira versão", agency: "6 a 12 semanas",             dc: "2 a 4 semanas" },
  { criteria: "Ponto de contato",           agency: "Account manager",            dc: "O desenvolvedor direto" },
  { criteria: "Custo fixo",                 agency: "Alto — estrutura de equipe", dc: "Só o que o projeto precisa" },
  { criteria: "Responsividade",             agency: "Ticket no Jira",             dc: "Resposta em horas" },
  { criteria: "Código após entrega",        agency: "Dependência do contrato",    dc: "Você é dono do repositório" },
  { criteria: "Escopo fechado",             agency: "Raro",                       dc: "Sempre" },
  { criteria: "Suporte pós-lançamento",     agency: "Contrato à parte",           dc: "30 dias incluído" },
];

export function Comparison() {
  return (
    <section className="py-28 px-5 lg:px-8" aria-labelledby="comparison-heading">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">
              A diferença na prática
            </p>
            <h2
              id="comparison-heading"
              className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Por que não uma agência grande?
            </h2>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              Não é sobre tamanho — é sobre quem faz o trabalho.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="bg-[var(--bg-secondary)]">
                  <th className="text-left text-[var(--text-muted)] font-normal py-3 px-4">Critério</th>
                  <th className="text-center text-[var(--text-muted)] font-medium py-3 px-4">Agência grande</th>
                  <th className="text-center text-[var(--primary)] font-semibold py-3 px-4 border-x border-t border-[var(--border-brand)] rounded-t-xl">
                    Development Consulting
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-[var(--border)]">
                    <td className="text-[var(--text-muted)] py-3 px-4">{row.criteria}</td>
                    <td className="text-center text-[var(--text-subtle)] py-3 px-4">{row.agency}</td>
                    <td
                      className={cn(
                        "text-center text-[var(--text)] font-medium py-3 px-4 border-x border-[var(--border-brand)] bg-[rgba(29,109,240,0.04)]",
                        i === rows.length - 1 && "border-b border-[var(--border-brand)] rounded-b-xl"
                      )}
                    >
                      {row.dc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
