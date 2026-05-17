"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import type { PurchaseOrder, Product } from "@/data/orion";
import { purchaseOrders, products } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import { PO_STATUS_CONFIG } from "../types/orion.types";
import type { PoFilter, StockFilter } from "../types/orion.types";

interface OperacoesTabProps {
  filteredPOs:   PurchaseOrder[];
  filteredStock: Product[];
  poFilter:      PoFilter;
  onPoFilter:    (f: PoFilter) => void;
  poSearch:      string;
  onPoSearch:    (s: string) => void;
  stockFilter:   StockFilter;
  onStockFilter: (f: StockFilter) => void;
  stockSearch:   string;
  onStockSearch: (s: string) => void;
  onApprove:     (id: string) => void;
}

const PO_FILTERS: { id: PoFilter; label: string }[] = [
  { id: "todos",               label: "Todos"        },
  { id: "aguardando_aprovacao",label: "Ag. Aprovação"},
  { id: "aprovada",            label: "Aprovadas"    },
  { id: "enviada",             label: "Enviadas"     },
  { id: "urgente",             label: "Urgentes"     },
];

const STOCK_FILTERS: { id: StockFilter; label: string }[] = [
  { id: "todos",          label: "Todos"       },
  { id: "critico",        label: "Crítico"     },
  { id: "materia_prima",  label: "Mat. Prima"  },
  { id: "produto_acabado",label: "Prod. Acab." },
  { id: "insumo",         label: "Insumo"      },
  { id: "ativo",          label: "Ativo"       },
];

export default function OperacoesTab({
  filteredPOs, filteredStock,
  poFilter, onPoFilter, poSearch, onPoSearch,
  stockFilter, onStockFilter, stockSearch, onStockSearch,
  onApprove,
}: OperacoesTabProps) {
  const [activeView, setActiveView] = useState<"po" | "estoque">("po");

  const totalPOValue = purchaseOrders.reduce((s, p) => s + p.totalValue, 0);
  const pendingApproval = purchaseOrders.filter(p => p.status === "aguardando_aprovacao").length;
  const criticalStock = products.filter(p => p.stock <= p.minStock).length;

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold text-[#cbd5e1]">Operações</h2>
          <p className="text-xs mt-0.5 text-[#475569]">
            Compras, estoque e fornecedores — Mai/2026
          </p>
        </div>
        <div className="flex items-center gap-6">
          {[
            { label: "Volume OC",      value: formatCurrency(totalPOValue), color: "#6366f1"  },
            { label: "Ag. Aprovação",  value: pendingApproval.toString(),   color: "#f59e0b"  },
            { label: "Estoque Crítico",value: criticalStock.toString(),      color: "#f43f5e"  },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-right">
              <p className="text-[10px] uppercase tracking-wider mb-0.5 text-[#475569]">{label}</p>
              <p className="text-base font-bold font-mono" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* View toggle */}
      <div className="flex items-center gap-1 border-b border-[#1a2540]">
        {([["po", "Ordens de Compra"], ["estoque", "Estoque"]] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveView(id)}
            className="px-4 py-2.5 text-xs font-medium transition-colors border-b-2 -mb-px"
            style={{
              borderColor: activeView === id ? "#6366f1" : "transparent",
              color: activeView === id ? "#cbd5e1" : "#475569",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Purchase Orders View */}
      {activeView === "po" && (
        <>
          <div className="flex items-center gap-3 flex-wrap">
            <input
              value={poSearch}
              onChange={e => onPoSearch(e.target.value)}
              placeholder="Buscar fornecedor ou OC..."
              className="orion-input h-8 px-3 text-xs flex-1 min-w-48"
            />
            <div className="flex items-center gap-1 flex-wrap">
              {PO_FILTERS.map(f => (
                <button
                  key={f.id}
                  onClick={() => onPoFilter(f.id)}
                  className={`orion-pill-filter ${poFilter === f.id ? "orion-pill-active" : ""}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="orion-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left" style={{ minWidth: 720 }}>
                <thead>
                  <tr className="border-b border-[#1a2540]">
                    {["OC","Fornecedor","Categoria","Itens","Valor","Status","Entrega","Prioridade",""].map(col => (
                      <th key={col} className="px-4 py-3 text-[10px] uppercase tracking-wider font-medium text-[#475569]">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredPOs.map(po => {
                    const cfg = PO_STATUS_CONFIG[po.status];
                    const isPending = po.status === "aguardando_aprovacao";
                    const isUrgent  = po.priority === "urgente" || po.priority === "critica";
                    return (
                      <tr key={po.id} className="orion-table-row">
                        <td className="px-4 py-3 text-[10px] font-mono text-[#475569]">{po.id}</td>
                        <td className="px-4 py-3">
                          <p className="text-xs text-[#cbd5e1]">{po.supplierName}</p>
                          <p className="text-[10px] text-[#475569]">{po.requestedBy}</p>
                        </td>
                        <td className="px-4 py-3 text-[10px] text-[#94a3b8]">{po.category}</td>
                        <td className="px-4 py-3 text-xs font-mono text-[#94a3b8]">{po.items}</td>
                        <td className="px-4 py-3 text-xs font-mono font-semibold text-[#6366f1]">
                          {formatCurrency(po.totalValue)}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`orion-badge text-[10px] ${cfg.color} ${cfg.bg}`}>{cfg.label}</span>
                        </td>
                        <td className="px-4 py-3 text-[10px] font-mono text-[#475569]">
                          {po.expectedDelivery.split("-").reverse().join("/")}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="text-[10px] font-medium px-1.5 py-0.5 rounded capitalize"
                            style={{
                              backgroundColor: isUrgent ? "#f43f5e22" : "#ffffff0a",
                              color: isUrgent ? "#f43f5e" : "#475569",
                            }}
                          >
                            {po.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {isPending && (
                            <button
                              onClick={() => onApprove(po.id)}
                              className="flex items-center gap-1 text-[10px] text-[#22c55e] hover:text-green-300 transition-colors"
                            >
                              <CheckCircle size={12} />
                              Aprovar
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {filteredPOs.length === 0 && (
              <div className="py-10 text-center">
                <p className="text-sm text-[#475569]">Nenhuma OC encontrada</p>
              </div>
            )}
            <div className="px-5 py-3 border-t border-[#1a2540] text-[10px] text-[#475569]">
              {filteredPOs.length} ordens · {formatCurrency(filteredPOs.reduce((s, p) => s + p.totalValue, 0))} em exibição
            </div>
          </div>
        </>
      )}

      {/* Stock View */}
      {activeView === "estoque" && (
        <>
          <div className="flex items-center gap-3 flex-wrap">
            <input
              value={stockSearch}
              onChange={e => onStockSearch(e.target.value)}
              placeholder="Buscar produto ou SKU..."
              className="orion-input h-8 px-3 text-xs flex-1 min-w-48"
            />
            <div className="flex items-center gap-1 flex-wrap">
              {STOCK_FILTERS.map(f => (
                <button
                  key={f.id}
                  onClick={() => onStockFilter(f.id)}
                  className={`orion-pill-filter ${stockFilter === f.id ? "orion-pill-active" : ""}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="orion-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left" style={{ minWidth: 720 }}>
                <thead>
                  <tr className="border-b border-[#1a2540]">
                    {["SKU","Produto","Categoria","Estoque","Mínimo","Status","Custo Unit.","Localização"].map(col => (
                      <th key={col} className="px-4 py-3 text-[10px] uppercase tracking-wider font-medium text-[#475569]">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStock.map(p => {
                    const isCritical = p.stock <= p.minStock;
                    const stockPct   = Math.min((p.stock / p.maxStock) * 100, 100);
                    return (
                      <tr key={p.id} className="orion-table-row">
                        <td className="px-4 py-3 text-[10px] font-mono text-[#475569]">{p.sku}</td>
                        <td className="px-4 py-3">
                          <p className="text-xs text-[#cbd5e1]">{p.name}</p>
                          <p className="text-[10px] text-[#475569]">últ. mov. {p.lastMovement.split("-").reverse().join("/")}</p>
                        </td>
                        <td className="px-4 py-3 text-[10px] text-[#94a3b8] capitalize">
                          {p.category.replace("_", " ")}
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs font-mono font-semibold" style={{ color: isCritical ? "#f43f5e" : "#cbd5e1" }}>
                            {p.stock.toLocaleString("pt-BR")} {p.unit}
                          </p>
                          <div className="mt-1 h-1 w-16 rounded-full overflow-hidden bg-[#1a2540]">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${stockPct}%`,
                                backgroundColor: isCritical ? "#f43f5e" : stockPct < 50 ? "#f59e0b" : "#22c55e",
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[10px] font-mono text-[#475569]">
                          {p.minStock.toLocaleString("pt-BR")}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="orion-badge text-[10px]"
                            style={{
                              color: isCritical ? "#f43f5e" : "#22c55e",
                              backgroundColor: isCritical ? "#f43f5e22" : "#22c55e22",
                            }}
                          >
                            {isCritical ? "Crítico" : "OK"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[10px] font-mono text-[#475569]">
                          {formatCurrency(p.unitCost)}
                        </td>
                        <td className="px-4 py-3 text-[10px] text-[#475569]">{p.location}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {filteredStock.length === 0 && (
              <div className="py-10 text-center">
                <p className="text-sm text-[#475569]">Nenhum produto encontrado</p>
              </div>
            )}
            <div className="px-5 py-3 border-t border-[#1a2540] text-[10px] text-[#475569]">
              {filteredStock.length} produtos exibidos
            </div>
          </div>
        </>
      )}
    </div>
  );
}
