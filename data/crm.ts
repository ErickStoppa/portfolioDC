export type DealStage = "lead" | "qualified" | "proposal" | "negotiation" | "closed";

export interface Deal {
  id: string;
  company: string;
  contact: string;
  value: number;
  stage: DealStage;
  probability: number;
  owner: string;
  lastActivity: string;
  avatar: string;
  tags: string[];
}

export interface Activity {
  id: string;
  type: "call" | "email" | "meeting" | "note";
  description: string;
  contact: string;
  time: string;
  avatar: string;
}

export const stageLabels: Record<DealStage, string> = {
  lead: "Lead",
  qualified: "Qualificado",
  proposal: "Proposta",
  negotiation: "Negociação",
  closed: "Fechado",
};

export const deals: Deal[] = [
  { id: "d1", company: "Meridian Health", contact: "Sarah Chen", value: 420000, stage: "negotiation", probability: 80, owner: "AR", lastActivity: "há 2h", avatar: "SC", tags: ["Enterprise", "Saúde"] },
  { id: "d2", company: "Orbital Systems", contact: "Marcus Rivera", value: 600000, stage: "proposal", probability: 60, owner: "MT", lastActivity: "há 1 dia", avatar: "MR", tags: ["Enterprise", "Tecnologia"] },
  { id: "d3", company: "Strata Commerce", contact: "Priya Nair", value: 225000, stage: "qualified", probability: 40, owner: "JK", lastActivity: "há 3h", avatar: "PN", tags: ["Mid-market"] },
  { id: "d4", company: "Apex Logistics", contact: "Tom Bradley", value: 335000, stage: "lead", probability: 20, owner: "AR", lastActivity: "há 5 dias", avatar: "TB", tags: ["Enterprise"] },
  { id: "d5", company: "Vanta Finance", contact: "Lena Cross", value: 1150000, stage: "closed", probability: 100, owner: "MT", lastActivity: "há 1 sem", avatar: "LC", tags: ["Enterprise", "Finanças"] },
  { id: "d6", company: "Nexus Retail", contact: "Diego Ruiz", value: 190000, stage: "proposal", probability: 55, owner: "SC", lastActivity: "há 6h", avatar: "DR", tags: ["PME"] },
  { id: "d7", company: "CloudPath Inc.", contact: "Amy Liu", value: 475000, stage: "qualified", probability: 45, owner: "JK", lastActivity: "há 2 dias", avatar: "AL", tags: ["Mid-market", "Tecnologia"] },
  { id: "d8", company: "Ember Studios", contact: "James Park", value: 140000, stage: "lead", probability: 15, owner: "AR", lastActivity: "há 3 dias", avatar: "JP", tags: ["PME"] },
];

export const activities: Activity[] = [
  { id: "a1", type: "call", description: "Ligação de descoberta com Sarah Chen — forte interesse no plano enterprise", contact: "Sarah Chen", time: "há 2h", avatar: "SC" },
  { id: "a2", type: "email", description: "Envio do deck de proposta para liderança da Orbital Systems", contact: "Marcus Rivera", time: "há 4h", avatar: "MR" },
  { id: "a3", type: "meeting", description: "Demo do produto com Strata Commerce — 3 stakeholders", contact: "Priya Nair", time: "há 6h", avatar: "PN" },
  { id: "a4", type: "note", description: "Orçamento da Apex Logistics confirmado em R$ 350 mil. Próximo passo: revisão jurídica", contact: "Tom Bradley", time: "há 1 dia", avatar: "TB" },
  { id: "a5", type: "call", description: "Contrato assinado com Vanta Finance. Início: 15 de jan", contact: "Lena Cross", time: "há 1 sem", avatar: "LC" },
];

export const kpis = [
  { label: "Valor do Pipeline", value: "R$3,5mi", change: "+18%", positive: true },
  { label: "Negócios este Mês", value: "14", change: "+3", positive: true },
  { label: "Taxa de Fechamento", value: "62%", change: "-4%", positive: false },
  { label: "Ticket Médio", value: "R$440mil", change: "+12%", positive: true },
];
