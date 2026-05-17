export type { ActivityType, OrderStatus, AlertSeverity, EmployeeStatus,
  MonthlyData, ProductLine, PlLine, CashFlowItem, AgingBucket,
  BankAccount, Activity, Alert, Order, Employee, DeptData,
} from "@/data/orion";

export type OrionTab   = "overview" | "financeiro" | "tesouraria" | "analytics" | "operacoes" | "pessoas";
export type Period     = "dia" | "mes" | "trimestre" | "ano";
export type PlView     = "dre" | "fluxo";
export type AgingType  = "receber" | "pagar";
export type FxBase     = "USD" | "EUR";
export type AnalMetric = "receita" | "margem" | "budget";

// ── Nav ───────────────────────────────────────────────────────────────────
export const NAV_ITEMS: Array<{ id: OrionTab; label: string; icon: string }> = [
  { id: "overview",   label: "Visão Geral", icon: "LayoutDashboard" },
  { id: "financeiro", label: "Financeiro",  icon: "DollarSign"      },
  { id: "tesouraria", label: "Tesouraria",  icon: "Landmark"        },
  { id: "analytics",  label: "Analytics",   icon: "BarChart3"       },
  { id: "operacoes",  label: "Operações",   icon: "Factory"         },
  { id: "pessoas",    label: "Pessoas",     icon: "Users"           },
];

export const PERIOD_OPTIONS: Array<{ value: Period; label: string }> = [
  { value: "dia",       label: "Hoje"       },
  { value: "mes",       label: "Este Mês"   },
  { value: "trimestre", label: "Trimestre"  },
  { value: "ano",       label: "Ano"        },
];

// ── Config objects ────────────────────────────────────────────────────────
export const ORDER_STATUS_CONFIG = {
  producao:  { label: "Em Produção", color: "#38bdf8", bg: "rgba(56,189,248,0.1)"  },
  pendente:  { label: "Pendente",    color: "#f59e0b", bg: "rgba(245,158,11,0.1)"  },
  concluido: { label: "Concluído",   color: "#22c55e", bg: "rgba(34,197,94,0.1)"   },
  atrasado:  { label: "Atrasado",    color: "#f43f5e", bg: "rgba(244,63,94,0.1)"   },
} as const;

export const ALERT_CONFIG = {
  critico: { color: "#f43f5e", bg: "rgba(244,63,94,0.08)",   icon: "AlertCircle"   },
  atencao: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  icon: "AlertTriangle" },
  info:    { color: "#38bdf8", bg: "rgba(56,189,248,0.08)",  icon: "Info"          },
} as const;

export const ACTIVITY_CONFIG = {
  pagamento:   { icon: "ArrowUpRight",   color: "#f43f5e" },
  recebimento: { icon: "ArrowDownLeft",  color: "#22c55e" },
  nota_fiscal: { icon: "FileText",       color: "#6366f1" },
  contrato:    { icon: "FileCheck",      color: "#38bdf8" },
  alerta:      { icon: "AlertTriangle",  color: "#f59e0b" },
  aprovacao:   { icon: "CheckCircle2",   color: "#22c55e" },
} as const;

export const PRIORITY_CONFIG = {
  alta:  { color: "#f43f5e", bg: "rgba(244,63,94,0.1)"  },
  media: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  baixa: { color: "#475569", bg: "rgba(71,85,105,0.1)"  },
} as const;

export const EMPLOYEE_STATUS_CONFIG = {
  ativo:     { label: "Ativo",     color: "#22c55e", bg: "rgba(34,197,94,0.1)"  },
  ferias:    { label: "Férias",    color: "#38bdf8", bg: "rgba(56,189,248,0.1)" },
  afastado:  { label: "Afastado", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
} as const;

export const PL_TYPE_CONFIG = {
  receita:   { color: "#22c55e",  bold: true,  indent: 0 },
  deducao:   { color: "#f43f5e", bold: false, indent: 1 },
  subtotal:  { color: "#cbd5e1", bold: true,  indent: 0 },
  custo:     { color: "#f43f5e", bold: false, indent: 1 },
  despesa:   { color: "#f43f5e", bold: false, indent: 1 },
  resultado: { color: "#6366f1", bold: true,  indent: 0 },
} as const;
