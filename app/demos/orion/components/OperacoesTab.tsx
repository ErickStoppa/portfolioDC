"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, X, Package, Search, Star, AlertTriangle } from "lucide-react";
import type { PurchaseOrder, Product, Supplier } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import { PO_STATUS_CONFIG } from "../types/orion.types";
import type { PoFilter, StockFilter } from "../types/orion.types";

interface Props {
  products:            Product[];
  allProducts:         Product[];
  stockFilter:         StockFilter;
  stockSearch:         string;
  onStockFilterChange: (f: StockFilter) => void;
  onStockSearchChange: (s: string) => void;
  purchaseOrders:      PurchaseOrder[];
  allOrders:           PurchaseOrder[];
  suppliers:           Supplier[];
  poFilter:            PoFilter;
  poSearch:            string;
  onPoFilterChange:    (f: PoFilter) => void;
  onPoSearchChange:    (s: string) => void;
  onApproveOrder:      (id: string) => void;
}

const PO_FILTERS: { id: PoFilter; label: string }[] = [
  { id: "todos",               label: "Todos"         },
  { id: "aguardando_aprovacao",label: "Ag. Aprovação" },
  { id: "aprovada",            label: "Aprovadas"     },
  { id: "enviada",             label: "Enviadas"      },
  { id: "urgente",             label: "Urgentes"      },
];

const STOCK_FILTERS: { id: StockFilter; label: string }[] = [
  { id: "todos",          label: "Todos"       },
  { id: "critico",        label: "Crítico"     },
  { id: "materia_prima",  label: "Mat. Prima"  },
  { id: "produto_acabado",label: "Prod. Acab." },
  { id: "insumo",         label: "Insumo"      },
  { id: "ativo",          label: "Ativo"       },
];

const SUPPLIER_STATUS: Record<Supplier["status"], { label: string; color: string; bg: string }> = {
  ativo:      { label: "Ativo",      color: "text-green-400", bg: "bg-green-400/10"  },
  bloqueado:  { label: "Bloqueado",  color: "text-red-400",   bg: "bg-red-400/10"    },
  em_analise: { label: "Em Análise", color: "text-amber-400", bg: "bg-amber-400/10"  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star
          key={i} size={9}
          className={i <= Math.round(rating) ? "text-[#f59e0b]" : "text-[#1a2540]"}
          fill={i <= Math.round(rating) ? "#f59e0b" : "transparent"}
        />
      ))}
      <span className="ml-1 text-[9px] font-mono text-[#475569]">{rating.toFixed(1)}</span>
    </div>
  );
}

type View = "estoque" | "po" | "fornecedores";

export default function OperacoesTab({
  products, allProducts, stockFilter, stockSearch, onStockFilterChange, onStockSearchChange,
  purchaseOrders, allOrders, suppliers, poFilter, poSearch, onPoFilterChange, onPoSearchChange,
  onApproveOrder,
}: Props) {
  const [view, setView]                             = useState<View>("po");
  const [selectedSupplier, setSelectedSupplier]     = useState<Supplier | null>(null);

  // Escape to close supplier modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedSupplier(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ── KPIs ──────────────────────────────────────────────────────────────────
  const stockValue     = allProducts.reduce((s, p) => s + p.stock * p.unitCost, 0);
  const criticalCount  = allProducts.filter(p => p.stock <= p.minStock).length;
  const avgCoverage    = Math.round(
    allProducts.reduce((s, p) => s + (p.minStock > 0 ? p.stock / p.minStock : 0), 0) / allProducts.length * 30
  );

  const openPOs        = allOrders.filter(p => p.status !== "recebida" && p.status !== "cancelada").length;
  const openPOValue    = allOrders.filter(p => p.status !== "recebida" && p.status !== "cancelada")
                           .reduce((s, p) => s + p.totalValue, 0);
  const pendingApproval= allOrders.filter(p => p.status === "aguardando_aprovacao").length;
  const deliveredMonth = allOrders.filter(p => p.status === "recebida").length;

  const handleApprove = useCallback((id: string) => onApproveOrder(id), [onApproveOrder]);

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold text-[#cbd5e1]">Operações</h2>
          <p className="text-xs mt-0.5 text-[#475569]">Estoque · Compras · Fornecedores — Mai/2026</p>
        </div>
        {/* View tabs */}
        <div className="flex items-center gap-px border border-[#1a2540] rounded-lg overflow-hidden">
          {([["po","Ordens de Compra"],["estoque","Estoque"],["fornecedores","Fornecedores"]] as [View,string][]).map(([id, lbl]) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className="px-3.5 py-1.5 text-xs font-medium transition-colors"
              style={{
                backgroundColor: view === id ? "#6366f1" : "transparent",
                color: view === id ? "#ffffff" : "#475569",
              }}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* ─── ESTOQUE ──────────────────────────────────────────────────────── */}
      {view === "estoque" && (
        <>
          {/* Stock KPIs */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Valor Total Estoque",  val: formatCurrency(stockValue), color: "#6366f1" },
              { label: "SKUs Críticos",         val: criticalCount.toString(),   color: "#f43f5e" },
              { label: "Cobertura Média (dias)", val: avgCoverage.toString(),    color: "#22c55e" },
            ].map(({ label, val, color }) => (
              <div key={label} className="orion-card p-4">
                <p className="text-[10px] uppercase tracking-wider text-[#475569] mb-1">{label}</p>
                <p className="text-xl font-bold font-mono tabular-nums" style={{ color }}>{val}</p>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-48">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#334155]" />
              <input
                value={stockSearch}
                onChange={e => onStockSearchChange(e.target.value)}
                placeholder="Buscar produto ou SKU..."
                className="orion-input h-8 pl-7 pr-3 text-xs w-full"
              />
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              {STOCK_FILTERS.map(f => (
                <button key={f.id} onClick={() => onStockFilterChange(f.id)}
                  className={`orion-pill-filter ${stockFilter === f.id ? "orion-pill-active" : ""}`}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product cards grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map(p => {
              const isCritical = p.stock <= p.minStock;
              const isLow      = !isCritical && p.stock <= p.minStock * 1.5;
              const stockPct   = Math.min((p.stock / p.maxStock) * 100, 100);
              const barColor   = isCritical ? "#f43f5e" : isLow ? "#f59e0b" : "#22c55e";
              return (
                <div key={p.id} className="orion-card p-4 relative overflow-hidden">
                  {/* Critical badge */}
                  {isCritical && (
                    <div className="absolute top-2 right-2">
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 animate-pulse">
                        CRÍTICO
                      </span>
                    </div>
                  )}

                  <p className="text-[9px] font-mono text-[#475569] mb-0.5">{p.sku}</p>
                  <p className="text-xs font-semibold text-[#cbd5e1] mb-3 pr-12 leading-snug">{p.name}</p>

                  {/* Stock bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-[9px] mb-1">
                      <span className="text-[#475569]">Estoque</span>
                      <span className="font-mono" style={{ color: barColor }}>
                        {p.stock.toLocaleString("pt-BR")} {p.unit}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#1a2540] overflow-hidden">
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${stockPct}%`, backgroundColor: barColor }} />
                    </div>
                  </div>

                  {/* 2×2 grid */}
                  <div className="grid grid-cols-2 gap-2 text-[9px]">
                    {[
                      { label: "Mínimo",     val: `${p.minStock.toLocaleString("pt-BR")} ${p.unit}` },
                      { label: "Custo Unit.", val: formatCurrency(p.unitCost) },
                      { label: "Valor Total", val: formatCurrency(p.stock * p.unitCost) },
                      { label: "Local",       val: p.location },
                    ].map(({ label, val }) => (
                      <div key={label}>
                        <p className="text-[#334155] leading-none">{label}</p>
                        <p className="font-mono text-[#94a3b8] mt-0.5 truncate">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {products.length === 0 && (
            <div className="py-14 flex flex-col items-center gap-3">
              <Package size={32} className="text-[#1a2540]" />
              <p className="text-sm text-[#334155]">Nenhum produto encontrado</p>
            </div>
          )}
        </>
      )}

      {/* ─── ORDENS DE COMPRA ─────────────────────────────────────────────── */}
      {view === "po" && (
        <>
          {/* PO KPIs */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "OCs em Aberto",    val: openPOs.toString(),          color: "#6366f1"  },
              { label: "Valor em Aberto",   val: formatCurrency(openPOValue), color: "#38bdf8"  },
              { label: "Ag. Aprovação",     val: pendingApproval.toString(),  color: "#f59e0b"  },
              { label: "Recebidas/Mês",     val: deliveredMonth.toString(),   color: "#22c55e"  },
            ].map(({ label, val, color }) => (
              <div key={label} className="orion-card p-4">
                <p className="text-[10px] uppercase tracking-wider text-[#475569] mb-1">{label}</p>
                <p className="text-xl font-bold font-mono tabular-nums" style={{ color }}>{val}</p>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-48">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#334155]" />
              <input
                value={poSearch}
                onChange={e => onPoSearchChange(e.target.value)}
                placeholder="Buscar fornecedor ou OC..."
                className="orion-input h-8 pl-7 pr-3 text-xs w-full"
              />
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              {PO_FILTERS.map(f => (
                <button key={f.id} onClick={() => onPoFilterChange(f.id)}
                  className={`orion-pill-filter ${poFilter === f.id ? "orion-pill-active" : ""}`}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* PO table */}
          <div className="orion-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left" style={{ minWidth: 780 }}>
                <thead>
                  <tr className="border-b border-[#1a2540]">
                    {["OC","Fornecedor","Categoria","Itens","Valor","Status","Entrega","Prioridade","Ações"].map(c => (
                      <th key={c} className="px-4 py-3 text-[10px] uppercase tracking-wider font-medium text-[#475569]">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.map(po => {
                    const cfg       = PO_STATUS_CONFIG[po.status];
                    const isPending = po.status === "aguardando_aprovacao";
                    const isApproved= po.status === "aprovada";
                    const isUrgent  = po.priority === "urgente" || po.priority === "critica";
                    const urgColor  = po.priority === "critica" ? "#f43f5e" : "#f59e0b";
                    return (
                      <tr key={po.id} className="orion-table-row">
                        <td className="px-4 py-3 text-[10px] font-mono text-[#475569]">{po.id}</td>
                        <td className="px-4 py-3">
                          <p className="text-xs text-[#cbd5e1]">{po.supplierName}</p>
                          <p className="text-[10px] text-[#475569]">{po.requestedBy}</p>
                        </td>
                        <td className="px-4 py-3 text-[10px] text-[#94a3b8]">{po.category}</td>
                        <td className="px-4 py-3 text-xs font-mono tabular-nums text-[#94a3b8]">{po.items}</td>
                        <td className="px-4 py-3 text-xs font-mono font-semibold tabular-nums text-[#6366f1]">
                          {formatCurrency(po.totalValue)}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`orion-badge text-[9px] ${cfg.color} ${cfg.bg}`}>{cfg.label}</span>
                        </td>
                        <td className="px-4 py-3 text-[10px] font-mono text-[#475569]">
                          {po.expectedDelivery.split("-").reverse().join("/")}
                        </td>
                        <td className="px-4 py-3">
                          {isUrgent && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded capitalize"
                              style={{ backgroundColor: urgColor + "22", color: urgColor }}>
                              {po.priority}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {isPending && (
                              <button onClick={() => handleApprove(po.id)}
                                className="flex items-center gap-1 text-[10px] text-[#22c55e] hover:text-green-300 transition-colors">
                                <CheckCircle size={11} /> Aprovar
                              </button>
                            )}
                            {isApproved && (
                              <button
                                onClick={() => {}} // visual only
                                className="text-[10px] text-[#38bdf8] hover:text-sky-300 transition-colors">
                                Enviar →
                              </button>
                            )}
                            {!isPending && !isApproved && (
                              <button className="text-[10px] text-[#475569] hover:text-[#94a3b8] transition-colors">
                                Ver
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {purchaseOrders.length === 0 && (
              <div className="py-10 text-center">
                <p className="text-sm text-[#475569]">Nenhuma OC encontrada</p>
              </div>
            )}
            <div className="px-5 py-3 border-t border-[#1a2540] text-[10px] text-[#475569]">
              {purchaseOrders.length} ordens · {formatCurrency(purchaseOrders.reduce((s, p) => s + p.totalValue, 0))} em exibição
            </div>
          </div>
        </>
      )}

      {/* ─── FORNECEDORES ──────────────────────────────────────────────────── */}
      {view === "fornecedores" && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {suppliers.map(s => {
              const sCfg = SUPPLIER_STATUS[s.status];
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSupplier(s)}
                  className="orion-card p-4 text-left hover:border-indigo-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs font-semibold text-[#cbd5e1] leading-snug">{s.name}</p>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ml-1 ${sCfg.bg} ${sCfg.color}`}>
                      {sCfg.label}
                    </span>
                  </div>
                  <p className="text-[9px] font-mono text-[#334155] mb-2">
                    {s.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}
                  </p>
                  <StarRating rating={s.rating} />
                  <div className="mt-2 flex items-center justify-between text-[9px] text-[#475569]">
                    <span>Lead {s.leadTimeDays}d</span>
                    <span>{s.city}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* ─── Supplier Modal ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedSupplier && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSupplier(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#080f20] border border-[#1a2540] rounded-xl w-full max-w-md max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal header */}
              <div className="flex items-start justify-between p-5 border-b border-[#1a2540]">
                <div>
                  <h3 className="text-sm font-semibold text-[#cbd5e1]">{selectedSupplier.name}</h3>
                  <p className="text-[10px] mt-0.5 text-[#475569]">{selectedSupplier.category}</p>
                </div>
                <button onClick={() => setSelectedSupplier(null)}
                  className="text-[#334155] hover:text-[#94a3b8] transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Supplier details */}
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "CNPJ",          val: selectedSupplier.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") },
                    { label: "Status",         val: SUPPLIER_STATUS[selectedSupplier.status].label },
                    { label: "Cidade",         val: selectedSupplier.city },
                    { label: "Lead Time",      val: `${selectedSupplier.leadTimeDays} dias` },
                    { label: "Prazo Pgto.",    val: `${selectedSupplier.paymentTerms} dias` },
                    { label: "Compras YTD",    val: formatCurrency(selectedSupplier.totalPurchasesYtd) },
                  ].map(({ label, val }) => (
                    <div key={label}>
                      <p className="text-[9px] uppercase tracking-wider text-[#334155] mb-0.5">{label}</p>
                      <p className="text-xs text-[#94a3b8] font-mono">{val}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-wider text-[#334155] mb-1">Avaliação</p>
                  <StarRating rating={selectedSupplier.rating} />
                </div>

                {/* Recent POs */}
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#475569] mb-2 font-semibold">OCs Recentes</p>
                  {allOrders.filter(po => po.supplierId === selectedSupplier.id).slice(0, 5).map(po => {
                    const cfg = PO_STATUS_CONFIG[po.status];
                    return (
                      <div key={po.id} className="flex items-center justify-between py-2 border-b border-[#1a2540] last:border-b-0">
                        <div>
                          <p className="text-[10px] font-mono text-[#475569]">{po.id}</p>
                          <p className="text-[9px] text-[#334155]">{po.expectedDelivery.split("-").reverse().join("/")}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-mono font-semibold text-[#6366f1]">{formatCurrency(po.totalValue)}</p>
                          <span className={`text-[8px] ${cfg.color}`}>{cfg.label}</span>
                        </div>
                      </div>
                    );
                  })}
                  {allOrders.filter(po => po.supplierId === selectedSupplier.id).length === 0 && (
                    <p className="text-[10px] text-[#334155] italic">Nenhuma OC registrada</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
