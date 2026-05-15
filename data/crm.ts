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
  qualified: "Qualified",
  proposal: "Proposal",
  negotiation: "Negotiation",
  closed: "Closed Won",
};

export const deals: Deal[] = [
  { id: "d1", company: "Meridian Health", contact: "Sarah Chen", value: 84000, stage: "negotiation", probability: 80, owner: "AR", lastActivity: "2h ago", avatar: "SC", tags: ["Enterprise", "Health"] },
  { id: "d2", company: "Orbital Systems", contact: "Marcus Rivera", value: 120000, stage: "proposal", probability: 60, owner: "MT", lastActivity: "1d ago", avatar: "MR", tags: ["Enterprise", "Tech"] },
  { id: "d3", company: "Strata Commerce", contact: "Priya Nair", value: 45000, stage: "qualified", probability: 40, owner: "JK", lastActivity: "3h ago", avatar: "PN", tags: ["Mid-market"] },
  { id: "d4", company: "Apex Logistics", contact: "Tom Bradley", value: 67000, stage: "lead", probability: 20, owner: "AR", lastActivity: "5d ago", avatar: "TB", tags: ["Enterprise"] },
  { id: "d5", company: "Vanta Finance", contact: "Lena Cross", value: 230000, stage: "closed", probability: 100, owner: "MT", lastActivity: "1w ago", avatar: "LC", tags: ["Enterprise", "Finance"] },
  { id: "d6", company: "Nexus Retail", contact: "Diego Ruiz", value: 38000, stage: "proposal", probability: 55, owner: "SC", lastActivity: "6h ago", avatar: "DR", tags: ["SMB"] },
  { id: "d7", company: "CloudPath Inc.", contact: "Amy Liu", value: 95000, stage: "qualified", probability: 45, owner: "JK", lastActivity: "2d ago", avatar: "AL", tags: ["Mid-market", "Tech"] },
  { id: "d8", company: "Ember Studios", contact: "James Park", value: 28000, stage: "lead", probability: 15, owner: "AR", lastActivity: "3d ago", avatar: "JP", tags: ["SMB"] },
];

export const activities: Activity[] = [
  { id: "a1", type: "call", description: "Discovery call with Sarah Chen — strong interest in enterprise plan", contact: "Sarah Chen", time: "2h ago", avatar: "SC" },
  { id: "a2", type: "email", description: "Sent proposal deck to Orbital Systems leadership", contact: "Marcus Rivera", time: "4h ago", avatar: "MR" },
  { id: "a3", type: "meeting", description: "Product demo with Strata Commerce — 3 stakeholders", contact: "Priya Nair", time: "6h ago", avatar: "PN" },
  { id: "a4", type: "note", description: "Apex Logistics budget confirmed at $70k. Next step: legal review", contact: "Tom Bradley", time: "1d ago", avatar: "TB" },
  { id: "a5", type: "call", description: "Contract signed with Vanta Finance. Start date: Jan 15", contact: "Lena Cross", time: "1w ago", avatar: "LC" },
];

export const kpis = [
  { label: "Pipeline Value", value: "$707K", change: "+18%", positive: true },
  { label: "Deals This Month", value: "14", change: "+3", positive: true },
  { label: "Win Rate", value: "62%", change: "-4%", positive: false },
  { label: "Avg Deal Size", value: "$88K", change: "+12%", positive: true },
];
