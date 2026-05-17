"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { orders } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import { ORDER_STATUS_CONFIG, PRIORITY_CONFIG } from "../types/orion.types";
import type { OrderStatus } from "@/data/orion";

type FilterStatus = OrderStatus | "todos";

const STATUS_FILTERS: { id: FilterStatus; label: string }[] = [
  { id: "todos",    label: "Todos"       },
  { id: "producao", label: "Em Produção" },
  { id: "pendente", label: "Pendente"    },
  { id: "atrasado", label: "Atrasado"   },
  { id: "concluido",label: "Concluído"  },
];

export default function OperacoesTab() {
  const [filter, setFilter] = useState<FilterStatus>("todos");
  const [search, setSearch] = useState("");

  const visible = orders.filter((o) => {
    if (filter !== "todos" && o.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.client.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Summary KPIs
  const totalValue = orders.reduce((s, o) => s + o.value, 0);
  const atrasados = orders.filter((o) => o.status === "atrasado").length;
  const emProducao = orders.filter((o) => o.status === "producao").length;

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: "#cbd5e1" }}>
            Ordens de Produção
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
            {orders.length} ordens · {emProducao} em produção · {atrasados} atrasadas
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "#475569" }}>
            Volume Total
          </p>
          <p className="text-xl font-bold font-mono" style={{ color: "#6366f1" }}>
            {formatCurrency(totalValue)}
          </p>
        </div>
      </div>

      {/* Status summary pills */}
      <div className="grid grid-cols-4 gap-3">
        {(["producao", "pendente", "atrasado", "concluido"] as OrderStatus[]).map((s) => {
          const cfg = ORDER_STATUS_CONFIG[s];
          const count = orders.filter((o) => o.status === s).length;
          const val = orders.filter((o) => o.status === s).reduce((a, o) => a + o.value, 0);
          return (
            <div
              key={s}
              className="rounded-xl border p-3 cursor-pointer transition-colors"
              style={{
                backgroundColor: filter === s ? cfg.bg : "#0a1220",
                borderColor: filter === s ? cfg.color : "#1a2540",
              }}
              onClick={() => setFilter(filter === s ? "todos" : s)}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                <span className="text-[10px]" style={{ color: cfg.color }}>{cfg.label}</span>
              </div>
              <p className="text-xl font-bold" style={{ color: "#cbd5e1" }}>{count}</p>
              <p className="text-[10px] font-mono mt-0.5" style={{ color: "#475569" }}>
                {formatCurrency(val)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Search + filter row */}
      <div className="flex items-center gap-3 flex-wrap">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar ordem, cliente, produto..."
          className="h-8 px-3 rounded-lg border text-xs flex-1 min-w-48 outline-none"
          style={{
            backgroundColor: "#0a1220",
            borderColor: "#1a2540",
            color: "#cbd5e1",
          }}
        />
        <div className="flex items-center gap-1">
          {STATUS_FILTERS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className="px-3 py-1.5 rounded-lg text-[10px] font-medium transition-colors"
              style={{
                backgroundColor: filter === id ? "#6366f1" : "rgba(255,255,255,0.04)",
                color: filter === id ? "#fff" : "#475569",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders table */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: "#0a1220", borderColor: "#1a2540" }}
      >
        <table className="w-full text-left" style={{ minWidth: 700 }}>
          <thead>
            <tr className="border-b" style={{ borderColor: "#1a2540" }}>
              {["Ordem", "Cliente", "Produto", "Qty", "Valor", "Status", "Prazo", "Prioridade"].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-[10px] uppercase tracking-wider font-medium"
                  style={{ color: "#475569" }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {visible.map((o) => {
                const sCfg = ORDER_STATUS_CONFIG[o.status];
                const pCfg = PRIORITY_CONFIG[o.priority];
                const isLate = o.daysLeft < 0;
                const isUrgent = o.daysLeft >= 0 && o.daysLeft <= 3;
                return (
                  <motion.tr
                    key={o.id}
                    layout
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="border-b"
                    style={{ borderColor: "#1a2540" }}
                  >
                    <td className="px-4 py-3 text-[10px] font-mono" style={{ color: "#475569" }}>
                      {o.id}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#cbd5e1" }}>
                      {o.client}
                    </td>
                    <td className="px-4 py-3 text-[10px]" style={{ color: "#94a3b8" }}>
                      <div>{o.product}</div>
                      <div style={{ color: "#334155", fontSize: "9px" }}>{o.productLine}</div>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: "#94a3b8" }}>
                      {o.qty.toLocaleString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono font-semibold" style={{ color: "#6366f1" }}>
                      {formatCurrency(o.value)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: sCfg.bg, color: sCfg.color }}
                      >
                        {sCfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[10px]" style={{ color: isLate ? "#f43f5e" : isUrgent ? "#f59e0b" : "#94a3b8" }}>
                        {o.delivery}
                      </div>
                      <div
                        className="text-[9px] font-mono mt-0.5"
                        style={{ color: isLate ? "#f43f5e" : isUrgent ? "#f59e0b" : "#475569" }}
                      >
                        {isLate
                          ? `${Math.abs(o.daysLeft)}d atrasado`
                          : `${o.daysLeft}d restantes`}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: pCfg.bg, color: pCfg.color }}
                      >
                        {o.priority.charAt(0).toUpperCase() + o.priority.slice(1)}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>

        {visible.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm" style={{ color: "#475569" }}>Nenhuma ordem encontrada</p>
          </div>
        )}

        <div
          className="flex items-center justify-between px-4 py-3 border-t text-[10px]"
          style={{ borderColor: "#1a2540" }}
        >
          <span style={{ color: "#475569" }}>
            {visible.length} de {orders.length} ordens
          </span>
          <span className="font-mono" style={{ color: "#6366f1" }}>
            {formatCurrency(visible.reduce((s, o) => s + o.value, 0))} em exibição
          </span>
        </div>
      </div>
    </div>
  );
}
