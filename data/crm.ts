export type ClientSegment = "Private" | "Corporate" | "PME" | "Varejo";
export type ClientStatus  = "Ativo" | "Prospecto" | "Em Risco" | "Inativo";
export type RiskScore     = "AAA" | "AA" | "A" | "BBB" | "BB" | "B" | "C";
export type KycStatus     = "Completo" | "Pendente" | "Expirado";
export type DealStage     = "prospeccao" | "qualificacao" | "proposta" | "negociacao" | "fechado-ganho" | "fechado-perdido";
export type ActivityType  = "ligacao" | "reuniao" | "proposta" | "fechamento" | "contato" | "alerta";

export interface Client {
  id: string;
  name: string;
  cpfCnpj: string;
  type: "PF" | "PJ";
  segment: ClientSegment;
  accountManager: string;
  status: ClientStatus;
  portfolioValue: number;
  creditLine: number;
  riskScore: RiskScore;
  kyc: KycStatus;
  lastContact: string;
  email: string;
  phone: string;
  nps: number;
  city: string;
  joinedAt: string;
  revenue: number;
  initials: string;
  avatarColor: string;
}

export interface Deal {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  value: number;
  stage: DealStage;
  probability: number;
  accountManager: string;
  daysInStage: number;
  priority: "alta" | "média" | "baixa";
  product: string;
  notes: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  avatarColor: string;
  revenueActual: number;
  revenueTarget: number;
  dealsWon: number;
  dealsOpen: number;
  clientCount: number;
  conversionRate: number;
  trendUp: boolean;
  ranking: number;
}

export interface Activity {
  id: string;
  type: ActivityType;
  text: string;
  actor: string;
  relatedTo: string;
  time: string;
}

export function formatBRL(n: number): string {
  if (n >= 1_000_000) return `R$ ${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `R$ ${(n / 1_000).toFixed(0)}k`;
  return `R$ ${n.toLocaleString("pt-BR")}`;
}

export const clients: Client[] = [
  // Private Banking
  { id:"c1",  name:"Grupo Monteiro Participações",  type:"PJ", segment:"Private",   cpfCnpj:"**.821.932/0001-**", accountManager:"Ana Cavalcante",  status:"Ativo",     portfolioValue:42500000, creditLine:15000000, riskScore:"AA",  kyc:"Completo", lastContact:"há 2 dias",    email:"financeiro@monteiro.com.br",     phone:"(11) 9 9872-4410", nps:9,  city:"São Paulo, SP",         joinedAt:"Jan 2019", revenue:148000, initials:"GM", avatarColor:"#3b82f6" },
  { id:"c2",  name:"Dr. Roberto Faria Neto",        type:"PF", segment:"Private",   cpfCnpj:"***.421.832-**",     accountManager:"Carlos Lima",     status:"Ativo",     portfolioValue:28800000, creditLine:8000000,  riskScore:"AAA", kyc:"Completo", lastContact:"há 1 dia",     email:"roberto.faria@drfaria.med.br",   phone:"(21) 9 8844-3391", nps:10, city:"Rio de Janeiro, RJ",    joinedAt:"Mar 2017", revenue:112000, initials:"RF", avatarColor:"#8b5cf6" },
  { id:"c3",  name:"Família Herculano Trust",       type:"PJ", segment:"Private",   cpfCnpj:"**.312.780/0001-**", accountManager:"Ana Cavalcante",  status:"Ativo",     portfolioValue:18200000, creditLine:5000000,  riskScore:"AA",  kyc:"Pendente", lastContact:"há 5 dias",    email:"gestao@herculano.com.br",        phone:"(11) 9 9543-2218", nps:8,  city:"Campinas, SP",          joinedAt:"Jun 2020", revenue:78000,  initials:"HT", avatarColor:"#06b6d4" },
  // Corporate
  { id:"c4",  name:"Aço Brasil Indústria S.A.",     type:"PJ", segment:"Corporate", cpfCnpj:"**.214.332/0001-**", accountManager:"Marcos Vidal",    status:"Ativo",     portfolioValue:9400000,  creditLine:20000000, riskScore:"BBB", kyc:"Completo", lastContact:"há 3 dias",    email:"financeiro@acobrasil.ind.br",    phone:"(11) 3344-9981",   nps:7,  city:"Santo André, SP",       joinedAt:"Ago 2018", revenue:52000,  initials:"AB", avatarColor:"#f59e0b" },
  { id:"c5",  name:"TechFlow Soluções LTDA",        type:"PJ", segment:"Corporate", cpfCnpj:"**.987.114/0001-**", accountManager:"Fernanda Rocha",  status:"Prospecto", portfolioValue:4200000,  creditLine:3500000,  riskScore:"A",   kyc:"Pendente", lastContact:"há 1 semana",  email:"cfo@techflow.com.br",            phone:"(48) 9 9821-0043", nps:8,  city:"Florianópolis, SC",     joinedAt:"Fev 2023", revenue:24000,  initials:"TF", avatarColor:"#10b981" },
  { id:"c6",  name:"Construtora Via Norte",         type:"PJ", segment:"Corporate", cpfCnpj:"**.543.219/0001-**", accountManager:"Marcos Vidal",    status:"Em Risco",  portfolioValue:6100000,  creditLine:12000000, riskScore:"BB",  kyc:"Expirado", lastContact:"há 3 semanas", email:"diretoria@vianorte.eng.br",      phone:"(92) 3421-8874",   nps:5,  city:"Manaus, AM",            joinedAt:"Abr 2020", revenue:18000,  initials:"VN", avatarColor:"#f43f5e" },
  { id:"c7",  name:"Holding Caiapó Agro",           type:"PJ", segment:"Corporate", cpfCnpj:"**.741.880/0001-**", accountManager:"Carlos Lima",     status:"Ativo",     portfolioValue:11300000, creditLine:8000000,  riskScore:"A",   kyc:"Completo", lastContact:"há 4 dias",    email:"financeiro@caiapo.agr.br",       phone:"(64) 3812-4490",   nps:9,  city:"Rio Verde, GO",         joinedAt:"Nov 2019", revenue:61000,  initials:"CA", avatarColor:"#84cc16" },
  // PME
  { id:"c8",  name:"Clínica Renascer Saúde",        type:"PJ", segment:"PME",       cpfCnpj:"**.213.741/0001-**", accountManager:"Fernanda Rocha",  status:"Ativo",     portfolioValue:1800000,  creditLine:800000,   riskScore:"A",   kyc:"Completo", lastContact:"há 2 dias",    email:"financeiro@renascer.med.br",     phone:"(31) 3421-0098",   nps:9,  city:"Belo Horizonte, MG",    joinedAt:"Mai 2021", revenue:12000,  initials:"CR", avatarColor:"#ec4899" },
  { id:"c9",  name:"Padaria Artesã Grão & Arte",    type:"PJ", segment:"PME",       cpfCnpj:"**.944.213/0001-**", accountManager:"Thiago Borges",   status:"Ativo",     portfolioValue:680000,   creditLine:250000,   riskScore:"BBB", kyc:"Completo", lastContact:"há 6 dias",    email:"financeiro@graoearte.com.br",    phone:"(11) 9 7732-0912", nps:8,  city:"São Paulo, SP",         joinedAt:"Out 2022", revenue:4800,   initials:"GA", avatarColor:"#f97316" },
  { id:"c10", name:"Studio Arquitetura Bravo",      type:"PJ", segment:"PME",       cpfCnpj:"**.312.018/0001-**", accountManager:"Thiago Borges",   status:"Prospecto", portfolioValue:420000,   creditLine:150000,   riskScore:"B",   kyc:"Pendente", lastContact:"há 2 semanas", email:"admin@bravo.arq.br",             phone:"(41) 9 9812-3318", nps:7,  city:"Curitiba, PR",          joinedAt:"Jan 2024", revenue:2100,   initials:"SB", avatarColor:"#a78bfa" },
  { id:"c11", name:"Escola de Idiomas GlobalTalk",  type:"PJ", segment:"PME",       cpfCnpj:"**.881.320/0001-**", accountManager:"Fernanda Rocha",  status:"Inativo",   portfolioValue:290000,   creditLine:100000,   riskScore:"C",   kyc:"Expirado", lastContact:"há 2 meses",   email:"adm@globaltalk.edu.br",          phone:"(85) 3321-4481",   nps:4,  city:"Fortaleza, CE",         joinedAt:"Jul 2021", revenue:0,      initials:"GT", avatarColor:"#64748b" },
  { id:"c12", name:"Distribuidora Prata Viva",      type:"PJ", segment:"PME",       cpfCnpj:"**.432.119/0001-**", accountManager:"Thiago Borges",   status:"Em Risco",  portfolioValue:940000,   creditLine:600000,   riskScore:"BB",  kyc:"Pendente", lastContact:"há 3 semanas", email:"financeiro@prataviva.com.br",    phone:"(51) 3421-0012",   nps:5,  city:"Porto Alegre, RS",      joinedAt:"Mar 2022", revenue:3200,   initials:"PV", avatarColor:"#f43f5e" },
  // Varejo
  { id:"c13", name:"Beatriz Sampaio Costa",         type:"PF", segment:"Varejo",    cpfCnpj:"***.912.234-**",     accountManager:"Thiago Borges",   status:"Ativo",     portfolioValue:312000,   creditLine:80000,    riskScore:"A",   kyc:"Completo", lastContact:"há 4 dias",    email:"bea.sampaio@gmail.com",          phone:"(11) 9 8812-0043", nps:9,  city:"São Paulo, SP",         joinedAt:"Ago 2020", revenue:1800,   initials:"BS", avatarColor:"#06b6d4" },
  { id:"c14", name:"Eng. Paulo Renato Melo",        type:"PF", segment:"Varejo",    cpfCnpj:"***.441.823-**",     accountManager:"Thiago Borges",   status:"Ativo",     portfolioValue:198000,   creditLine:50000,    riskScore:"AA",  kyc:"Completo", lastContact:"há 1 semana",  email:"paulomelo.eng@outlook.com",      phone:"(61) 9 8821-3391", nps:8,  city:"Brasília, DF",          joinedAt:"Nov 2021", revenue:900,    initials:"PM", avatarColor:"#8b5cf6" },
  { id:"c15", name:"Adriana Luz Ferreira",          type:"PF", segment:"Varejo",    cpfCnpj:"***.213.991-**",     accountManager:"Thiago Borges",   status:"Prospecto", portfolioValue:0,        creditLine:20000,    riskScore:"B",   kyc:"Pendente", lastContact:"há 1 dia",     email:"adriana.luz@email.com",          phone:"(71) 9 9923-1102", nps:0,  city:"Salvador, BA",          joinedAt:"Mai 2024", revenue:0,      initials:"AL", avatarColor:"#f59e0b" },
  { id:"c16", name:"Marcos Antonio Teixeira",       type:"PF", segment:"Varejo",    cpfCnpj:"***.822.134-**",     accountManager:"Thiago Borges",   status:"Inativo",   portfolioValue:45000,    creditLine:15000,    riskScore:"C",   kyc:"Expirado", lastContact:"há 4 meses",   email:"marcos.tex@hotmail.com",         phone:"(19) 9 8831-0033", nps:3,  city:"Campinas, SP",          joinedAt:"Fev 2019", revenue:0,      initials:"MT", avatarColor:"#64748b" },
];

export const deals: Deal[] = [
  // Prospecção
  { id:"d1",  clientId:"c5",  clientName:"TechFlow Soluções",       title:"Fundo de Renda Fixa Premium",        value:2400000,  stage:"prospeccao",    probability:20,  accountManager:"Fernanda Rocha",  daysInStage:8,  priority:"alta",  product:"Fundo Renda Fixa",          notes:"CFO muito interessado, agenda apresentação na próxima semana." },
  { id:"d2",  clientId:"c10", clientName:"Studio Arquitetura Bravo", title:"Capital de Giro 12 meses",           value:120000,   stage:"prospeccao",    probability:15,  accountManager:"Thiago Borges",   daysInStage:14, priority:"baixa", product:"Capital de Giro",           notes:"Empresa em crescimento, aguardando documentação." },
  { id:"d3",  clientId:"c15", clientName:"Adriana Luz Ferreira",    title:"Previdência Privada PGBL",            value:180000,   stage:"prospeccao",    probability:25,  accountManager:"Thiago Borges",   daysInStage:3,  priority:"média", product:"PGBL",                      notes:"Indicação do Marcos Teixeira." },
  { id:"d4",  clientId:"c7",  clientName:"Holding Caiapó Agro",     title:"Crédito Rural Expansão",              value:4800000,  stage:"prospeccao",    probability:30,  accountManager:"Carlos Lima",     daysInStage:6,  priority:"alta",  product:"Crédito Rural",             notes:"Oportunidade de expansão da safra 2025." },
  // Qualificação
  { id:"d5",  clientId:"c8",  clientName:"Clínica Renascer Saúde",  title:"Leasing de Equipamentos Médicos",     value:620000,   stage:"qualificacao",  probability:40,  accountManager:"Fernanda Rocha",  daysInStage:11, priority:"média", product:"Leasing",                   notes:"Análise de crédito aprovada internamente." },
  { id:"d6",  clientId:"c4",  clientName:"Aço Brasil Indústria",    title:"Hedge Cambial 6 meses",               value:3200000,  stage:"qualificacao",  probability:45,  accountManager:"Marcos Vidal",    daysInStage:7,  priority:"alta",  product:"Derivativos Cambiais",      notes:"Exposição ao dólar preocupa o CFO." },
  { id:"d7",  clientId:"c13", clientName:"Beatriz Sampaio",         title:"CDB Indexado IPCA+",                  value:85000,    stage:"qualificacao",  probability:50,  accountManager:"Thiago Borges",   daysInStage:5,  priority:"baixa", product:"CDB",                       notes:"Comparando com proposta de banco concorrente." },
  { id:"d8",  clientId:"c3",  clientName:"Família Herculano Trust", title:"Portfólio Multimercado",              value:5500000,  stage:"qualificacao",  probability:35,  accountManager:"Ana Cavalcante",  daysInStage:9,  priority:"alta",  product:"Fundo Multimercado",        notes:"KYC pendente — bloqueia avanço." },
  // Proposta
  { id:"d9",  clientId:"c1",  clientName:"Grupo Monteiro",          title:"Reestruturação de Dívida Corporativa",value:18000000, stage:"proposta",      probability:60,  accountManager:"Ana Cavalcante",  daysInStage:4,  priority:"alta",  product:"Crédito Corporativo",       notes:"Proposta enviada ontem. Reunião de board na 6ª feira." },
  { id:"d10", clientId:"c14", clientName:"Eng. Paulo Melo",         title:"Consórcio Imobiliário",               value:480000,   stage:"proposta",      probability:55,  accountManager:"Thiago Borges",   daysInStage:6,  priority:"média", product:"Consórcio",                 notes:"Aguardando aprovação do cônjuge." },
  { id:"d11", clientId:"c6",  clientName:"Construtora Via Norte",   title:"Linha de Crédito Imobiliário",        value:8400000,  stage:"proposta",      probability:40,  accountManager:"Marcos Vidal",    daysInStage:18, priority:"alta",  product:"Crédito Imobiliário",       notes:"ATENÇÃO: 18 dias na etapa. Risco de perda." },
  { id:"d12", clientId:"c9",  clientName:"Padaria Grão & Arte",     title:"Conta Investimento PJ",               value:150000,   stage:"proposta",      probability:65,  accountManager:"Thiago Borges",   daysInStage:3,  priority:"baixa", product:"Investimento PJ",           notes:"Proprietário muito engajado." },
  // Negociação
  { id:"d13", clientId:"c2",  clientName:"Dr. Roberto Faria Neto",  title:"Family Office — Estruturação",        value:22000000, stage:"negociacao",    probability:75,  accountManager:"Carlos Lima",     daysInStage:12, priority:"alta",  product:"Family Office",             notes:"Detalhes jurídicos em revisão com escritório parceiro." },
  { id:"d14", clientId:"c7",  clientName:"Holding Caiapó Agro",     title:"Fundo Exclusivo FIC",                 value:6200000,  stage:"negociacao",    probability:80,  accountManager:"Carlos Lima",     daysInStage:8,  priority:"alta",  product:"Fundo Exclusivo",           notes:"Termos acordados verbalmente. Formalizando esta semana." },
  { id:"d15", clientId:"c4",  clientName:"Aço Brasil Indústria",    title:"Swap de Taxa de Juros",               value:4100000,  stage:"negociacao",    probability:70,  accountManager:"Marcos Vidal",    daysInStage:5,  priority:"média", product:"Derivativos",               notes:"Aguardando aprovação do comitê de risco." },
  // Fechado Ganho
  { id:"d16", clientId:"c2",  clientName:"Dr. Roberto Faria Neto",  title:"Fundo Long Biased",                   value:3800000,  stage:"fechado-ganho", probability:100, accountManager:"Carlos Lima",     daysInStage:0,  priority:"alta",  product:"Fundo Long Biased",         notes:"Fechado em 18/05. Receita: R$ 38.000." },
  { id:"d17", clientId:"c1",  clientName:"Grupo Monteiro",          title:"Emissão de Debêntures",               value:15000000, stage:"fechado-ganho", probability:100, accountManager:"Ana Cavalcante",  daysInStage:0,  priority:"alta",  product:"Renda Fixa Estruturada",    notes:"Fechado em 12/05. Maior operação do mês." },
  // Fechado Perdido
  { id:"d18", clientId:"c11", clientName:"GlobalTalk Idiomas",      title:"Crédito PME",                         value:80000,    stage:"fechado-perdido",probability:0,  accountManager:"Fernanda Rocha",  daysInStage:0,  priority:"baixa", product:"Capital de Giro",           notes:"Cliente optou pelo banco do governo. Concorrência de taxa." },
];

export const teamMembers: TeamMember[] = [
  { id:"t1", name:"Ana Cavalcante", role:"Gerente Private Senior",      initials:"AC", avatarColor:"#3b82f6", revenueActual:386000, revenueTarget:400000, dealsWon:8,  dealsOpen:12, clientCount:24, conversionRate:42, trendUp:true,  ranking:1 },
  { id:"t2", name:"Carlos Lima",    role:"Gerente Private",             initials:"CL", avatarColor:"#8b5cf6", revenueActual:318000, revenueTarget:350000, dealsWon:6,  dealsOpen:9,  clientCount:18, conversionRate:38, trendUp:true,  ranking:2 },
  { id:"t3", name:"Marcos Vidal",   role:"Gerente Corporate",           initials:"MV", avatarColor:"#f59e0b", revenueActual:228000, revenueTarget:280000, dealsWon:5,  dealsOpen:8,  clientCount:22, conversionRate:31, trendUp:false, ranking:3 },
  { id:"t4", name:"Fernanda Rocha", role:"Gerente Corporate / PME",     initials:"FR", avatarColor:"#10b981", revenueActual:198000, revenueTarget:250000, dealsWon:4,  dealsOpen:11, clientCount:31, conversionRate:27, trendUp:false, ranking:4 },
  { id:"t5", name:"Thiago Borges",  role:"Gerente Varejo / PME",        initials:"TB", avatarColor:"#06b6d4", revenueActual:162000, revenueTarget:200000, dealsWon:11, dealsOpen:19, clientCount:48, conversionRate:24, trendUp:true,  ranking:5 },
];

export const monthlyData = [
  { month:"Jun/24", revenue:820000,  target:900000,  newClients:8  },
  { month:"Jul/24", revenue:940000,  target:900000,  newClients:12 },
  { month:"Ago/24", revenue:1020000, target:950000,  newClients:9  },
  { month:"Set/24", revenue:880000,  target:980000,  newClients:7  },
  { month:"Out/24", revenue:1140000, target:1000000, newClients:14 },
  { month:"Nov/24", revenue:1380000, target:1050000, newClients:11 },
  { month:"Dez/24", revenue:1640000, target:1100000, newClients:18 },
  { month:"Jan/25", revenue:920000,  target:1150000, newClients:6  },
  { month:"Fev/25", revenue:1080000, target:1200000, newClients:10 },
  { month:"Mar/25", revenue:1290000, target:1250000, newClients:13 },
  { month:"Abr/25", revenue:1480000, target:1300000, newClients:16 },
  { month:"Mai/25", revenue:1292000, target:1350000, newClients:11 },
];

export const activities: Activity[] = [
  { id:"a1",  type:"fechamento", text:"Emissão de Debêntures Grupo Monteiro fechada — R$15M",           actor:"Ana Cavalcante",  relatedTo:"Grupo Monteiro",          time:"há 2 horas" },
  { id:"a2",  type:"reuniao",    text:"Reunião de board com Roberto Faria Neto sobre Family Office",     actor:"Carlos Lima",     relatedTo:"Dr. Roberto Faria Neto",  time:"há 4 horas" },
  { id:"a3",  type:"alerta",     text:"KYC de Família Herculano Trust vencendo em 7 dias",               actor:"Sistema",         relatedTo:"Família Herculano Trust",  time:"há 5 horas" },
  { id:"a4",  type:"proposta",   text:"Proposta de reestruturação enviada para Grupo Monteiro",          actor:"Ana Cavalcante",  relatedTo:"Grupo Monteiro",          time:"há 1 dia"   },
  { id:"a5",  type:"ligacao",    text:"Ligação de qualificação com CFO da TechFlow Soluções",            actor:"Fernanda Rocha",  relatedTo:"TechFlow Soluções",       time:"há 1 dia"   },
  { id:"a6",  type:"alerta",     text:"Construtora Via Norte: 18 dias na etapa Proposta — risco de perda",actor:"Sistema",       relatedTo:"Construtora Via Norte",   time:"há 2 dias"  },
  { id:"a7",  type:"contato",    text:"Email enviado para Adriana Luz Ferreira sobre PGBL",              actor:"Thiago Borges",   relatedTo:"Adriana Luz Ferreira",    time:"há 2 dias"  },
  { id:"a8",  type:"fechamento", text:"Fundo Long Biased fechado com Dr. Roberto Faria Neto",            actor:"Carlos Lima",     relatedTo:"Dr. Roberto Faria Neto",  time:"há 3 dias"  },
  { id:"a9",  type:"reuniao",    text:"Apresentação de portfólio para Holding Caiapó Agro",              actor:"Carlos Lima",     relatedTo:"Holding Caiapó Agro",     time:"há 4 dias"  },
  { id:"a10", type:"contato",    text:"GlobalTalk Idiomas optou por banco concorrente — negócio perdido",actor:"Fernanda Rocha",  relatedTo:"GlobalTalk Idiomas",      time:"há 5 dias"  },
];

export const accountManagers = [...new Set(clients.map(c => c.accountManager))];

export const kpiData = {
  revenueMonth:   1292000,
  revenuePrev:    1480000,
  activeClients:  11,
  activeClientsNew: 2,
  pipelineTotal:  deals.filter(d => !["fechado-ganho","fechado-perdido"].includes(d.stage)).reduce((s, d) => s + d.value, 0),
  pipelineCount:  deals.filter(d => !["fechado-ganho","fechado-perdido"].includes(d.stage)).length,
  conversionRate: 34.2,
  conversionPrev: 32.1,
};

export const sparklineRevenue = [820,940,1020,880,1140,1380,1640,920,1080,1290,1480,1292];
export const sparklineClients = [3,5,4,2,6,5,8,2,4,6,7,4];
export const sparklineDeals   = [8,9,11,7,12,14,16,6,10,13,15,12];
export const sparklineConv    = [28,31,33,29,35,37,36,30,32,34,36,34];
