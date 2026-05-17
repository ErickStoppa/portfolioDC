export type {
  OrionTab, OrionDept, PoStatus, TxStatus, TxType,
  PlLine, BankAccount, CashFlowItem, FxRate, Transaction,
  Product, PurchaseOrder, Supplier, Employee, BudgetLine,
  OrionAlert, ActivityItem, MonthlyMetric,
} from "@/data/orion";

import type { PoStatus, TxStatus, OrionDept, OrionTab } from "@/data/orion";

export const NAV_ITEMS: Array<{
  id: OrionTab;
  label: string;
  icon: string;
  badge?: "alerts" | "stockCritical";
}> = [
  { id: "overview",   label: "Visão Geral", icon: "LayoutDashboard", badge: "alerts"        },
  { id: "financeiro", label: "Financeiro",  icon: "FileText"                                 },
  { id: "tesouraria", label: "Tesouraria",  icon: "Landmark"                                 },
  { id: "analytics",  label: "Analytics",   icon: "TrendingUp"                               },
  { id: "operacoes",  label: "Operações",   icon: "Package",         badge: "stockCritical"  },
  { id: "pessoas",    label: "Pessoas",     icon: "Users"                                    },
];

export const PO_STATUS_CONFIG: Record<PoStatus, { label: string; color: string; bg: string; dot: string }> = {
  rascunho:             { label: "Rascunho",       color: "text-slate-400",  bg: "bg-slate-400/10",  dot: "bg-slate-400"  },
  aguardando_aprovacao: { label: "Ag. Aprovação",  color: "text-amber-400",  bg: "bg-amber-400/10",  dot: "bg-amber-400"  },
  aprovada:             { label: "Aprovada",        color: "text-blue-400",   bg: "bg-blue-400/10",   dot: "bg-blue-400"   },
  enviada:              { label: "Enviada",         color: "text-violet-400", bg: "bg-violet-400/10", dot: "bg-violet-400" },
  recebida_parcial:     { label: "Receb. Parcial",  color: "text-amber-400",  bg: "bg-amber-400/10",  dot: "bg-amber-400"  },
  recebida:             { label: "Recebida",        color: "text-green-400",  bg: "bg-green-400/10",  dot: "bg-green-400"  },
  cancelada:            { label: "Cancelada",       color: "text-red-400",    bg: "bg-red-400/10",    dot: "bg-red-400"    },
};

export const TX_STATUS_CONFIG: Record<TxStatus, { label: string; color: string; bg: string }> = {
  pago:      { label: "Pago",      color: "text-green-400", bg: "bg-green-400/10" },
  pendente:  { label: "Pendente",  color: "text-amber-400", bg: "bg-amber-400/10" },
  vencido:   { label: "Vencido",   color: "text-red-400",   bg: "bg-red-400/10"   },
  cancelado: { label: "Cancelado", color: "text-slate-400", bg: "bg-slate-400/10" },
};

export const SEVERITY_CONFIG: Record<string, { icon: string; color: string; bg: string; border: string }> = {
  info:     { icon: "Info",         color: "text-sky-400",   bg: "bg-sky-400/8",   border: "border-sky-400/20"   },
  warning:  { icon: "AlertTriangle",color: "text-amber-400", bg: "bg-amber-400/8", border: "border-amber-400/20" },
  critical: { icon: "ShieldAlert",  color: "text-red-400",   bg: "bg-red-400/8",   border: "border-red-400/20"   },
};

export const DEPT_CONFIG: Record<OrionDept, { label: string; color: string; bg: string; icon: string }> = {
  diretoria:  { label: "Diretoria",  color: "text-violet-400", bg: "bg-violet-400/10", icon: "Crown"      },
  financeiro: { label: "Financeiro", color: "text-green-400",  bg: "bg-green-400/10",  icon: "Wallet"     },
  tecnologia: { label: "Tecnologia", color: "text-blue-400",   bg: "bg-blue-400/10",   icon: "Monitor"    },
  operacoes:  { label: "Operações",  color: "text-amber-400",  bg: "bg-amber-400/10",  icon: "Settings2"  },
  comercial:  { label: "Comercial",  color: "text-sky-400",    bg: "bg-sky-400/10",    icon: "TrendingUp" },
  logistica:  { label: "Logística",  color: "text-cyan-400",   bg: "bg-cyan-400/10",   icon: "Truck"      },
  rh:         { label: "RH",         color: "text-pink-400",   bg: "bg-pink-400/10",   icon: "Users"      },
};

export type PlFilter    = "anual" | "trimestral" | "mensal";
export type TxFilter    = "todos" | "receita" | "despesa" | "vencido" | "pendente";
export type StockFilter = "todos" | "critico" | "materia_prima" | "produto_acabado" | "insumo" | "ativo";
export type PoFilter    = "todos" | "aguardando_aprovacao" | "aprovada" | "enviada" | "urgente";
export type RhFilter    = "todos" | OrionDept;
