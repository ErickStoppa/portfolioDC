"use client";

import { AnimatePresence } from "framer-motion";
import { Search, Plus, ChevronUp, ChevronDown } from "lucide-react";
import type { Client } from "@/data/crm";
import type { ClientFilter, SegmentFilter, SortField, SortDir } from "../types/crm.types";
import { ClientRow } from "./ClientRow";

const STATUS_FILTERS: ClientFilter[] = ["Todos", "Ativo", "Prospecto", "Em Risco", "Inativo"];
const SEGMENTS: SegmentFilter[] = ["Todos", "Private", "Corporate", "PME", "Varejo"];

const COLS: { label: string; field?: SortField }[] = [
  { label: "Cliente",    field: "name" },
  { label: "Segmento" },
  { label: "Portfólio",  field: "portfolioValue" },
  { label: "Receita/Mês", field: "revenue" },
  { label: "Risco" },
  { label: "KYC" },
  { label: "Gerente" },
  { label: "Status" },
  { label: "" },
];

export interface ClientsTabProps {
  clients: Client[];
  totalCount: number;
  search: string;
  onSearchChange: (s: string) => void;
  statusFilter: ClientFilter;
  onStatusFilter: (f: ClientFilter) => void;
  segmentFilter: SegmentFilter;
  onSegmentFilter: (f: SegmentFilter) => void;
  sort: { field: SortField; dir: SortDir };
  onSort: (field: SortField) => void;
  onSelectClient: (c: Client) => void;
}

export function ClientsTab({
  clients, totalCount, search, onSearchChange,
  statusFilter, onStatusFilter,
  segmentFilter, onSegmentFilter,
  sort, onSort, onSelectClient,
}: ClientsTabProps) {
  return (
    <div className="p-3 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-[#f1f5f9]">Clientes</h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[rgba(59,130,246,0.1)] text-[#3b82f6]">
            {totalCount}
          </span>
        </div>
        <button className="h-8 px-3 bg-[#3b82f6] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 hover:bg-[#2563eb] transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Adicionar
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex gap-3 mt-4 flex-wrap items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#475569] pointer-events-none" />
          <input
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Buscar cliente, e-mail, cidade..."
            className="w-full h-9 pl-9 pr-3 bg-[#0c1220] border border-[rgba(255,255,255,0.08)] rounded-lg text-xs text-white placeholder:text-[#334155] focus:outline-none focus:border-[rgba(59,130,246,0.4)] transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {STATUS_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => onStatusFilter(f)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                statusFilter === f
                  ? "bg-[rgba(59,130,246,0.12)] text-[#3b82f6] border-[rgba(59,130,246,0.3)]"
                  : "bg-[rgba(255,255,255,0.04)] text-[#64748b] border-transparent hover:text-[#f1f5f9]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <select
          value={segmentFilter}
          onChange={e => onSegmentFilter(e.target.value as SegmentFilter)}
          className="h-9 px-3 bg-[#0c1220] border border-[rgba(255,255,255,0.08)] rounded-lg text-xs text-[#94a3b8] focus:outline-none cursor-pointer"
        >
          {SEGMENTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[rgba(255,255,255,0.06)] overflow-x-auto mt-4">
        <table className="w-full text-left" style={{ minWidth: 700 }}>
          <thead>
            <tr>
              {COLS.map(({ label, field }) => (
                <th
                  key={label}
                  onClick={() => field && onSort(field)}
                  className={`px-4 py-3 text-[10px] text-[#475569] uppercase tracking-wider font-medium border-b border-[rgba(255,255,255,0.06)] bg-[#090e1b] whitespace-nowrap ${field ? "cursor-pointer hover:text-[#94a3b8] select-none" : ""}`}
                >
                  <span className="inline-flex items-center gap-1">
                    {label}
                    {field && sort.field === field && (
                      sort.dir === "asc"
                        ? <ChevronUp className="w-3 h-3" />
                        : <ChevronDown className="w-3 h-3" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {clients.map(client => (
                <ClientRow key={client.id} client={client} onSelect={onSelectClient} />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {clients.length === 0 && (
          <div className="py-16 text-center text-sm text-[#475569]">Nenhum cliente encontrado</div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-[#475569]">
          Exibindo {clients.length} de {totalCount} clientes
        </p>
        <div className="flex items-center gap-1">
          <button className="px-3 py-1.5 text-xs text-[#475569] hover:text-[#94a3b8] rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors">
            ← Anterior
          </button>
          <button className="w-8 h-8 text-xs bg-[#3b82f6] text-white rounded-lg font-semibold">1</button>
          <button className="w-8 h-8 text-xs text-[#64748b] hover:text-[#94a3b8] rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors">2</button>
          <button className="px-3 py-1.5 text-xs text-[#475569] hover:text-[#94a3b8] rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
