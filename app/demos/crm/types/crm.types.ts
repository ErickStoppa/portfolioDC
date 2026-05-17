import type { ClientStatus, RiskScore, KycStatus, ClientSegment,
              DealStage, ActivityType } from "@/data/crm";
export type { ClientStatus, RiskScore, KycStatus, ClientSegment,
              DealStage, ActivityType };

export type CrmTab        = "dashboard" | "clientes" | "pipeline" | "relatorios" | "equipe";
export type ClientFilter  = ClientStatus | "Todos";
export type SegmentFilter = ClientSegment | "Todos";
export type SortField     = "name" | "portfolioValue" | "riskScore" | "lastContact" | "revenue";
export type SortDir       = "asc" | "desc";
export type DashboardPeriod = "hoje" | "semana" | "mes" | "trimestre";
export type ReportPeriod    = "mes" | "trimestre" | "semestre" | "ano";

export const STAGE_CONFIG: Record<DealStage, {
  label: string; color: string; bg: string; order: number;
}> = {
  "prospeccao":     { label:"Prospecção",   color:"#94a3b8", bg:"rgba(148,163,184,0.1)", order:1 },
  "qualificacao":   { label:"Qualificação", color:"#f59e0b", bg:"rgba(245,158,11,0.1)",  order:2 },
  "proposta":       { label:"Proposta",     color:"#3b82f6", bg:"rgba(59,130,246,0.1)",  order:3 },
  "negociacao":     { label:"Negociação",   color:"#a78bfa", bg:"rgba(167,139,250,0.1)", order:4 },
  "fechado-ganho":  { label:"Ganho ✓",      color:"#10b981", bg:"rgba(16,185,129,0.1)",  order:5 },
  "fechado-perdido":{ label:"Perdido",      color:"#f43f5e", bg:"rgba(244,63,94,0.1)",   order:6 },
};

export const RISK_CONFIG: Record<RiskScore, { color: string; bg: string }> = {
  "AAA": { color:"#10b981", bg:"rgba(16,185,129,0.1)"  },
  "AA":  { color:"#34d399", bg:"rgba(52,211,153,0.1)"  },
  "A":   { color:"#6ee7b7", bg:"rgba(110,231,183,0.1)" },
  "BBB": { color:"#f59e0b", bg:"rgba(245,158,11,0.1)"  },
  "BB":  { color:"#fb923c", bg:"rgba(251,146,60,0.1)"  },
  "B":   { color:"#f43f5e", bg:"rgba(244,63,94,0.1)"   },
  "C":   { color:"#7f1d1d", bg:"rgba(127,29,29,0.1)"   },
};

export const KYC_CONFIG: Record<KycStatus, { color: string; bg: string; dot: string }> = {
  "Completo": { color:"#10b981", bg:"rgba(16,185,129,0.1)", dot:"#10b981" },
  "Pendente": { color:"#f59e0b", bg:"rgba(245,158,11,0.1)", dot:"#f59e0b" },
  "Expirado": { color:"#f43f5e", bg:"rgba(244,63,94,0.1)",  dot:"#f43f5e" },
};

export const STATUS_CONFIG: Record<ClientStatus, { color: string; bg: string }> = {
  "Ativo":     { color:"#10b981", bg:"rgba(16,185,129,0.1)" },
  "Prospecto": { color:"#3b82f6", bg:"rgba(59,130,246,0.1)" },
  "Em Risco":  { color:"#f43f5e", bg:"rgba(244,63,94,0.1)"  },
  "Inativo":   { color:"#475569", bg:"rgba(71,85,105,0.1)"  },
};

export const ACTIVITY_CONFIG: Record<ActivityType, { icon: string; color: string }> = {
  "ligacao":    { icon:"Phone",          color:"#3b82f6" },
  "reuniao":    { icon:"Users",          color:"#8b5cf6" },
  "proposta":   { icon:"FileText",       color:"#f59e0b" },
  "fechamento": { icon:"CheckCircle",    color:"#10b981" },
  "contato":    { icon:"Mail",           color:"#06b6d4" },
  "alerta":     { icon:"AlertTriangle",  color:"#f43f5e" },
};

export const NAV_ITEMS: Array<{ id: CrmTab; label: string; icon: string }> = [
  { id:"dashboard",  label:"Dashboard",  icon:"LayoutDashboard" },
  { id:"clientes",   label:"Clientes",   icon:"Users" },
  { id:"pipeline",   label:"Pipeline",   icon:"Kanban" },
  { id:"relatorios", label:"Relatórios", icon:"BarChart2" },
  { id:"equipe",     label:"Equipe",     icon:"UserCheck" },
];

export const PIPELINE_STAGES: DealStage[] = [
  "prospeccao","qualificacao","proposta","negociacao","fechado-ganho",
];
