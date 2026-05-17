// ── ORION ERP — Nexum Componentes S.A. ────────────────────────────────────
// Manufatura eletrônica industrial · Campinas, SP · CEO: Marcelo Andrade

export type OrionTab =
  | "overview" | "financeiro" | "tesouraria"
  | "analytics" | "operacoes" | "pessoas";

export type OrionDept =
  | "diretoria" | "financeiro" | "tecnologia"
  | "operacoes" | "comercial" | "logistica" | "rh";

export type PoStatus =
  | "rascunho" | "aguardando_aprovacao" | "aprovada"
  | "enviada" | "recebida_parcial" | "recebida" | "cancelada";

export type TxStatus = "pago" | "pendente" | "vencido" | "cancelado";
export type TxType   = "receita" | "despesa";

export interface PlLine {
  key: string;
  label: string;
  isTotal: boolean;
  isNegative: boolean;
  values: number[];   // 12 meses Jan–Dez (valores absolutos)
  indent: number;
}

export interface BankAccount {
  id: string;
  bank: string;
  bankCode: string;
  agency: string;
  account: string;
  type: "corrente" | "aplicacao" | "investimento";
  balance: number;
  available: number;
  currency: "BRL" | "USD" | "EUR";
  lastSync: string;
  color: string;
  projection7d: number;
  projection30d: number;
}

export interface CashFlowItem {
  date: string;
  inflows: number;
  outflows: number;
  balance: number;
  confirmed: boolean;
  label?: string;
}

export interface FxRate {
  pair: string;
  rate: number;
  change24h: number;
  high24h: number;
  low24h: number;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  type: TxType;
  category: string;
  description: string;
  counterparty: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: TxStatus;
  nfNumber?: string;
  paymentMethod?: string;
  dept: OrionDept;
  tags?: string[];
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: "materia_prima" | "produto_acabado" | "insumo" | "ativo";
  unit: string;
  stock: number;
  minStock: number;
  maxStock: number;
  unitCost: number;
  unitPrice: number;
  supplierId: string;
  location: string;
  lastMovement: string;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  status: PoStatus;
  totalValue: number;
  items: number;
  requestedBy: string;
  createdAt: string;
  expectedDelivery: string;
  priority: "normal" | "urgente" | "critica";
  category: string;
}

export interface Supplier {
  id: string;
  name: string;
  cnpj: string;
  category: string;
  status: "ativo" | "bloqueado" | "em_analise";
  rating: number;
  leadTimeDays: number;
  paymentTerms: number;
  totalPurchasesYtd: number;
  city: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  dept: OrionDept;
  status: "ativo" | "ferias" | "afastado";
  salary: number;
  benefits: number;
  admissionDate: string;
  initials: string;
  avatarColor: string;
  performance: number;
  hoursMonth: number;
  location: string;
}

export interface BudgetLine {
  dept: OrionDept;
  category: string;
  budgeted: number;
  actual: number;
  variance: number;
  variancePct: number;
}

export interface OrionAlert {
  id: string;
  severity: "info" | "warning" | "critical";
  module: OrionTab;
  title: string;
  description: string;
  time: string;
  resolved: boolean;
}

export interface ActivityItem {
  id: string;
  actor: string;
  initials: string;
  color: string;
  action: string;
  module: OrionTab;
  time: string;
  amount?: number;
}

export interface MonthlyMetric {
  month: string;
  revenue: number;
  cogs: number;
  grossProfit: number;
  opex: number;
  ebitda: number;
  netIncome: number;
  headcount: number;
}

// ── DRE helpers ───────────────────────────────────────────────────────────
const G = [
  2_840_000, 2_920_000, 3_080_000, 3_150_000, 3_340_000, 3_420_000,
  3_580_000, 3_640_000, 3_780_000, 3_920_000, 4_050_000, 4_180_000,
];
const r = (v: number) => Math.round(v);
const D   = G.map(v => r(v * 0.05));
const RL  = G.map((v, i) => v - D[i]);
const cgP = [0.73,0.72,0.71,0.70,0.69,0.68,0.67,0.66,0.65,0.65,0.64,0.64];
const COGS = RL.map((v, i) => r(v * cgP[i]));
const LB  = RL.map((v, i) => v - COGS[i]);
const DV  = RL.map(v => r(v * 0.06));
const DA  = RL.map(v => r(v * 0.075));
const OR  = G.map(v => r(v * 0.01));
const EBITDA = LB.map((v, i) => v - DV[i] - DA[i] + OR[i]);
const DEPR = G.map(v => r(v * 0.02));
const EBIT = EBITDA.map((v, i) => v - DEPR[i]);
const FIN  = G.map(v => r(v * 0.008));
const LAIR = EBIT.map((v, i) => v - FIN[i]);
const IR   = LAIR.map(v => v > 0 ? r(v * 0.25) : 0);
const LL   = LAIR.map((v, i) => v - IR[i]);

// ── P&L Statement ─────────────────────────────────────────────────────────
export const plLines: PlLine[] = [
  { key:"receita_bruta",   label:"Receita Bruta de Vendas",            isTotal:false, isNegative:false, values:G,     indent:0 },
  { key:"deducoes",        label:"(-) Deduções de Receita",            isTotal:false, isNegative:true,  values:D,     indent:1 },
  { key:"receita_liquida", label:"Receita Líquida",                    isTotal:true,  isNegative:false, values:RL,    indent:0 },
  { key:"cogs",            label:"(-) Custo dos Produtos Vendidos",    isTotal:false, isNegative:true,  values:COGS,  indent:1 },
  { key:"lucro_bruto",     label:"Lucro Bruto",                        isTotal:true,  isNegative:false, values:LB,    indent:0 },
  { key:"despesas_vendas", label:"(-) Despesas com Vendas",            isTotal:false, isNegative:true,  values:DV,    indent:1 },
  { key:"despesas_admin",  label:"(-) Despesas Administrativas",       isTotal:false, isNegative:true,  values:DA,    indent:1 },
  { key:"outras_receitas", label:"Outras Receitas Operacionais",       isTotal:false, isNegative:false, values:OR,    indent:1 },
  { key:"ebitda",          label:"EBITDA",                             isTotal:true,  isNegative:false, values:EBITDA,indent:0 },
  { key:"depreciacao",     label:"(-) Depreciação e Amortização",      isTotal:false, isNegative:true,  values:DEPR,  indent:1 },
  { key:"ebit",            label:"EBIT (Lucro Operacional)",           isTotal:true,  isNegative:false, values:EBIT,  indent:0 },
  { key:"resultado_fin",   label:"(-) Resultado Financeiro Líquido",   isTotal:false, isNegative:true,  values:FIN,   indent:1 },
  { key:"lair",            label:"LAIR (Lucro Antes do IR)",           isTotal:true,  isNegative:false, values:LAIR,  indent:0 },
  { key:"ir_csll",         label:"(-) IR e CSLL",                      isTotal:false, isNegative:true,  values:IR,    indent:1 },
  { key:"lucro_liquido",   label:"Lucro Líquido",                      isTotal:true,  isNegative:false, values:LL,    indent:0 },
];

// ── Bank Accounts ─────────────────────────────────────────────────────────
export const bankAccounts: BankAccount[] = [
  {
    id:"ba1", bank:"Itaú", bankCode:"341", agency:"0482", account:"****-7",
    type:"corrente", balance:2_847_320, available:2_614_100, currency:"BRL",
    lastSync:"há 3 minutos", color:"#f59e0b",
    projection7d:2_293_000, projection30d:1_840_000,
  },
  {
    id:"ba2", bank:"Bradesco", bankCode:"237", agency:"1234", account:"****-4",
    type:"aplicacao", balance:1_240_880, available:1_240_880, currency:"BRL",
    lastSync:"há 8 minutos", color:"#f43f5e",
    projection7d:1_246_200, projection30d:1_261_000,
  },
  {
    id:"ba3", bank:"Caixa", bankCode:"104", agency:"3891", account:"****-2",
    type:"corrente", balance:394_750, available:312_000, currency:"BRL",
    lastSync:"há 12 minutos", color:"#1d6df0",
    projection7d:368_000, projection30d:320_000,
  },
  {
    id:"ba4", bank:"Santander", bankCode:"033", agency:"0214", account:"****-9",
    type:"investimento", balance:84_300, available:84_300, currency:"USD",
    lastSync:"há 5 minutos", color:"#ef4444",
    projection7d:79_000, projection30d:72_000,
  },
];

// ── FX Rates ──────────────────────────────────────────────────────────────
export const fxRates: FxRate[] = [
  { pair:"USD/BRL", rate:5.47, change24h:0.31,  high24h:5.49, low24h:5.41, updatedAt:"há 2 min" },
  { pair:"EUR/BRL", rate:5.92, change24h:-0.12, high24h:5.96, low24h:5.89, updatedAt:"há 2 min" },
  { pair:"GBP/BRL", rate:6.98, change24h:0.08,  high24h:7.02, low24h:6.95, updatedAt:"há 2 min" },
];

// ── Cash Flow (30 days from 2026-05-17) ──────────────────────────────────
export const cashFlowItems: CashFlowItem[] = [
  { date:"2026-05-17", inflows:0,       outflows:0,       balance:4_483_000, confirmed:true  },
  { date:"2026-05-18", inflows:95_000,  outflows:72_000,  balance:4_506_000, confirmed:true  },
  { date:"2026-05-19", inflows:112_000, outflows:68_000,  balance:4_550_000, confirmed:true  },
  { date:"2026-05-20", inflows:85_000,  outflows:412_000, balance:4_223_000, confirmed:true,  label:"Pagto. Fornecedores"          },
  { date:"2026-05-21", inflows:98_000,  outflows:75_000,  balance:4_246_000, confirmed:true  },
  { date:"2026-05-22", inflows:475_000, outflows:68_000,  balance:4_653_000, confirmed:true,  label:"Recbt. Metalúrgica Horizonte" },
  { date:"2026-05-23", inflows:0,       outflows:0,       balance:4_653_000, confirmed:true  },
  { date:"2026-05-24", inflows:0,       outflows:0,       balance:4_653_000, confirmed:true  },
  { date:"2026-05-25", inflows:102_000, outflows:74_000,  balance:4_681_000, confirmed:true  },
  { date:"2026-05-26", inflows:88_000,  outflows:71_000,  balance:4_698_000, confirmed:true  },
  { date:"2026-05-27", inflows:95_000,  outflows:70_000,  balance:4_723_000, confirmed:false },
  { date:"2026-05-28", inflows:110_000, outflows:73_000,  balance:4_760_000, confirmed:false },
  { date:"2026-05-29", inflows:92_000,  outflows:68_000,  balance:4_784_000, confirmed:false },
  { date:"2026-05-30", inflows:0,       outflows:0,       balance:4_784_000, confirmed:false },
  { date:"2026-05-31", inflows:0,       outflows:0,       balance:4_784_000, confirmed:false },
  { date:"2026-06-01", inflows:125_000, outflows:82_000,  balance:4_827_000, confirmed:false },
  { date:"2026-06-02", inflows:98_000,  outflows:71_000,  balance:4_854_000, confirmed:false },
  { date:"2026-06-03", inflows:515_000, outflows:73_000,  balance:5_296_000, confirmed:false },
  { date:"2026-06-04", inflows:88_000,  outflows:70_000,  balance:5_314_000, confirmed:false },
  { date:"2026-06-05", inflows:92_000,  outflows:302_000, balance:5_104_000, confirmed:false, label:"Folha de Pagamento"          },
  { date:"2026-06-06", inflows:0,       outflows:0,       balance:5_104_000, confirmed:false },
  { date:"2026-06-07", inflows:0,       outflows:0,       balance:5_104_000, confirmed:false },
  { date:"2026-06-08", inflows:115_000, outflows:75_000,  balance:5_144_000, confirmed:false },
  { date:"2026-06-09", inflows:98_000,  outflows:72_000,  balance:5_170_000, confirmed:false },
  { date:"2026-06-10", inflows:85_000,  outflows:352_000, balance:4_903_000, confirmed:false, label:"Pgto. Alfa Componentes"      },
  { date:"2026-06-11", inflows:102_000, outflows:68_000,  balance:4_937_000, confirmed:false },
  { date:"2026-06-12", inflows:95_000,  outflows:468_000, balance:4_564_000, confirmed:false, label:"Vencto. Debênture"           },
  { date:"2026-06-13", inflows:0,       outflows:0,       balance:4_564_000, confirmed:false },
  { date:"2026-06-14", inflows:0,       outflows:0,       balance:4_564_000, confirmed:false },
  { date:"2026-06-15", inflows:98_000,  outflows:90_400,  balance:4_571_600, confirmed:false, label:"Pgto. Fornecedores"          },
];

// ── Transactions (42) ─────────────────────────────────────────────────────
export const transactions: Transaction[] = [
  // ── RECEITAS PAGAS (14) ──
  { id:"TX-0001", type:"receita", category:"vendas",    description:"Fornecimento PCBs lote #847",         counterparty:"Metalúrgica Horizonte",    amount:285_000, dueDate:"2026-04-20", paidDate:"2026-04-18", status:"pago",    nfNumber:"NF-e 004.521", paymentMethod:"boleto", dept:"comercial" },
  { id:"TX-0002", type:"receita", category:"vendas",    description:"Módulos Inversores 5kVA × 80 un.",    counterparty:"Indústria Alfa S.A.",       amount:380_000, dueDate:"2026-04-28", paidDate:"2026-04-25", status:"pago",    nfNumber:"NF-e 004.522", paymentMethod:"ted",    dept:"comercial" },
  { id:"TX-0003", type:"receita", category:"vendas",    description:'Painel HMI Touch 7" × 60 un.',        counterparty:"Construtora Delta",         amount:142_000, dueDate:"2026-05-05", paidDate:"2026-05-04", status:"pago",    nfNumber:"NF-e 004.523", paymentMethod:"pix",    dept:"comercial" },
  { id:"TX-0004", type:"receita", category:"servicos",  description:"Consultoria técnica — integração",    counterparty:"TechParts Brasil",          amount:68_000,  dueDate:"2026-05-08", paidDate:"2026-05-07", status:"pago",    nfNumber:"NF-e 004.524", paymentMethod:"pix",    dept:"comercial" },
  { id:"TX-0005", type:"receita", category:"vendas",    description:"Sensores PT100 × 400 un.",            counterparty:"Eletro Componentes Ltda",   amount:215_000, dueDate:"2026-05-10", paidDate:"2026-05-09", status:"pago",    nfNumber:"NF-e 004.525", paymentMethod:"ted",    dept:"comercial" },
  { id:"TX-0006", type:"receita", category:"vendas",    description:"Driver Servo Motor Compact × 150 un.",counterparty:"Grupo Ventura",             amount:320_000, dueDate:"2026-05-12", paidDate:"2026-05-12", status:"pago",    nfNumber:"NF-e 004.526", paymentMethod:"boleto", dept:"comercial" },
  { id:"TX-0007", type:"receita", category:"vendas",    description:"Placa CLP-200 × 100 un.",             counterparty:"Sistemas Industriais RJ",   amount:178_000, dueDate:"2026-05-14", paidDate:"2026-05-13", status:"pago",    nfNumber:"NF-e 004.527", paymentMethod:"pix",    dept:"comercial" },
  { id:"TX-0008", type:"receita", category:"servicos",  description:"Manutenção preventiva contratos",     counterparty:"Metalúrgica Horizonte",     amount:45_000,  dueDate:"2026-05-15", paidDate:"2026-05-15", status:"pago",    nfNumber:"NF-e 004.528", paymentMethod:"pix",    dept:"comercial" },
  { id:"TX-0009", type:"receita", category:"vendas",    description:"Módulo Inversor retrofit × 70 un.",   counterparty:"Indústria Alfa S.A.",       amount:290_000, dueDate:"2026-05-16", paidDate:"2026-05-16", status:"pago",    nfNumber:"NF-e 004.529", paymentMethod:"ted",    dept:"comercial" },
  { id:"TX-0010", type:"receita", category:"vendas",    description:"PCBs CLP-200 lote #852",              counterparty:"TechParts Brasil",          amount:156_000, dueDate:"2026-04-30", paidDate:"2026-04-29", status:"pago",    nfNumber:"NF-e 004.530", paymentMethod:"boleto", dept:"comercial" },
  { id:"TX-0011", type:"receita", category:"vendas",    description:"Sensores PT100 × 200 un.",            counterparty:"Construtora Delta",         amount:98_000,  dueDate:"2026-05-02", paidDate:"2026-05-02", status:"pago",    nfNumber:"NF-e 004.531", paymentMethod:"pix",    dept:"comercial" },
  { id:"TX-0012", type:"receita", category:"servicos",  description:"Suporte técnico mensal — Grupo",      counterparty:"Grupo Ventura",             amount:32_000,  dueDate:"2026-05-05", paidDate:"2026-05-05", status:"pago",    nfNumber:"NF-e 004.532", paymentMethod:"boleto", dept:"comercial" },
  { id:"TX-0013", type:"receita", category:"vendas",    description:"Driver Servo × 110 un.",              counterparty:"Eletro Componentes Ltda",   amount:265_000, dueDate:"2026-05-01", paidDate:"2026-04-30", status:"pago",    nfNumber:"NF-e 004.533", paymentMethod:"ted",    dept:"comercial" },
  { id:"TX-0014", type:"receita", category:"vendas",    description:"CLP-200 × 80 un. + Sensores",         counterparty:"Sistemas Industriais RJ",   amount:188_000, dueDate:"2026-05-16", paidDate:"2026-05-15", status:"pago",    nfNumber:"NF-e 004.534", paymentMethod:"pix",    dept:"comercial" },
  // ── RECEITAS PENDENTES (6) ──
  { id:"TX-0015", type:"receita", category:"vendas",    description:"Inversores 5kVA × 90 un. lote #863",  counterparty:"Metalúrgica Horizonte",     amount:340_000, dueDate:"2026-05-28", status:"pendente", nfNumber:"NF-e 004.535", paymentMethod:"boleto", dept:"comercial" },
  { id:"TX-0016", type:"receita", category:"vendas",    description:"PCBs CLP-200 lote #864",              counterparty:"Indústria Alfa S.A.",       amount:220_000, dueDate:"2026-05-30", status:"pendente", nfNumber:"NF-e 004.536", paymentMethod:"ted",    dept:"comercial" },
  { id:"TX-0017", type:"receita", category:"servicos",  description:"Calibração e laudos técnicos",        counterparty:"TechParts Brasil",          amount:78_000,  dueDate:"2026-05-25", status:"pendente", nfNumber:"NF-e 004.537", paymentMethod:"pix",    dept:"comercial" },
  { id:"TX-0018", type:"receita", category:"vendas",    description:"Painel HMI × 48 un.",                 counterparty:"Construtora Delta",         amount:185_000, dueDate:"2026-06-03", status:"pendente", nfNumber:"NF-e 004.538", paymentMethod:"boleto", dept:"comercial" },
  { id:"TX-0019", type:"receita", category:"vendas",    description:"Placa CLP-200 × 60 un.",              counterparty:"Grupo Ventura",             amount:128_000, dueDate:"2026-06-05", status:"pendente", nfNumber:"NF-e 004.539", paymentMethod:"pix",    dept:"comercial" },
  { id:"TX-0020", type:"receita", category:"vendas",    description:"Driver Servo Compact × 50 un.",       counterparty:"Sistemas Industriais RJ",   amount:95_000,  dueDate:"2026-05-29", status:"pendente", nfNumber:"NF-e 004.540", paymentMethod:"boleto", dept:"comercial" },
  // ── RECEITAS VENCIDAS (4) ──
  { id:"TX-0021", type:"receita", category:"vendas",    description:"Sensores PT100 × 380 un. lote #831",  counterparty:"Eletro Componentes Ltda",   amount:245_000, dueDate:"2026-05-12", status:"vencido",  nfNumber:"NF-e 004.218", paymentMethod:"boleto", dept:"comercial", tags:["inadimplencia"] },
  { id:"TX-0022", type:"receita", category:"servicos",  description:"Manutenção emergencial linha A",       counterparty:"Metalúrgica Horizonte",     amount:28_000,  dueDate:"2026-05-10", status:"vencido",  nfNumber:"NF-e 004.195", paymentMethod:"pix",    dept:"comercial", tags:["inadimplencia"] },
  { id:"TX-0023", type:"receita", category:"servicos",  description:"Assistência técnica campo Brasília",   counterparty:"Construtora Delta",         amount:62_000,  dueDate:"2026-05-08", status:"vencido",  nfNumber:"NF-e 004.187", paymentMethod:"pix",    dept:"comercial", tags:["inadimplencia"] },
  { id:"TX-0024", type:"receita", category:"vendas",    description:"PCBs customizados FR4 × 300 un.",     counterparty:"TechParts Brasil",          amount:115_000, dueDate:"2026-05-05", status:"vencido",  nfNumber:"NF-e 004.172", paymentMethod:"boleto", dept:"comercial", tags:["inadimplencia"] },
  // ── DESPESAS PAGAS (12) ──
  { id:"TX-0025", type:"despesa", category:"aluguel",   description:"Aluguel sede abril/2026",             counterparty:"Imobiliária Central Ltda",  amount:32_000,  dueDate:"2026-04-05", paidDate:"2026-04-04", status:"pago", paymentMethod:"boleto", dept:"diretoria" },
  { id:"TX-0026", type:"despesa", category:"energia",   description:"Energia elétrica CPFL abril/2026",   counterparty:"CPFL Energia",              amount:18_400,  dueDate:"2026-04-15", paidDate:"2026-04-14", status:"pago", paymentMethod:"boleto", dept:"operacoes" },
  { id:"TX-0027", type:"despesa", category:"folha",     description:"Folha de pagamento abril/2026",       counterparty:"Funcionários Nexum",        amount:234_000, dueDate:"2026-04-05", paidDate:"2026-04-04", status:"pago", paymentMethod:"ted",    dept:"rh" },
  { id:"TX-0028", type:"despesa", category:"inss",      description:"INSS e encargos folha abril/2026",    counterparty:"Receita Federal",           amount:89_000,  dueDate:"2026-04-20", paidDate:"2026-04-18", status:"pago", paymentMethod:"ted",    dept:"rh" },
  { id:"TX-0029", type:"despesa", category:"manutencao",description:"Manutenção preventiva CNC Linha B",  counterparty:"TechService Manutenção",    amount:15_800,  dueDate:"2026-04-25", paidDate:"2026-04-24", status:"pago", paymentMethod:"boleto", dept:"operacoes" },
  { id:"TX-0030", type:"despesa", category:"ti",        description:"AWS Brasil — infraestrutura cloud",   counterparty:"Amazon Web Services",       amount:8_400,   dueDate:"2026-05-01", paidDate:"2026-05-01", status:"pago", paymentMethod:"pix",    dept:"tecnologia" },
  { id:"TX-0031", type:"despesa", category:"ti",        description:"Salesforce Sales Cloud — licenças",   counterparty:"Salesforce Brasil",         amount:12_200,  dueDate:"2026-05-05", paidDate:"2026-05-05", status:"pago", paymentMethod:"pix",    dept:"comercial" },
  { id:"TX-0032", type:"despesa", category:"marketing", description:"Campanha LinkedIn + Google Ads mai.", counterparty:"Agência Digital Nexum",     amount:24_000,  dueDate:"2026-05-08", paidDate:"2026-05-07", status:"pago", paymentMethod:"ted",    dept:"comercial" },
  { id:"TX-0033", type:"despesa", category:"insumos",   description:"Cobre Eletrolítico 800kg — OC-0022", counterparty:"Alfa Componentes SMD",      amount:124_000, dueDate:"2026-05-10", paidDate:"2026-05-09", status:"pago", paymentMethod:"boleto", dept:"operacoes" },
  { id:"TX-0034", type:"despesa", category:"insumos",   description:"PCB FR4 lote #21 — OC-0023",         counterparty:"PCB Indústria Brasil",      amount:86_000,  dueDate:"2026-05-12", paidDate:"2026-05-12", status:"pago", paymentMethod:"boleto", dept:"operacoes" },
  { id:"TX-0035", type:"despesa", category:"manutencao",description:"Ferramental CNC — mandris e brocas", counterparty:"Ind. Ferramentas BR",       amount:31_200,  dueDate:"2026-05-14", paidDate:"2026-05-13", status:"pago", paymentMethod:"boleto", dept:"operacoes" },
  { id:"TX-0036", type:"despesa", category:"aluguel",   description:"Aluguel sede maio/2026",              counterparty:"Imobiliária Central Ltda",  amount:32_000,  dueDate:"2026-05-05", paidDate:"2026-05-04", status:"pago", paymentMethod:"boleto", dept:"diretoria" },
  // ── DESPESAS PENDENTES (4) ──
  { id:"TX-0037", type:"despesa", category:"insumos",   description:"Capacitor SMD 100µF × 80k un.",       counterparty:"Alfa Componentes SMD",      amount:280_000, dueDate:"2026-05-22", status:"pendente", paymentMethod:"boleto", dept:"operacoes" },
  { id:"TX-0038", type:"despesa", category:"energia",   description:"Energia elétrica CPFL maio/2026",     counterparty:"CPFL Energia",              amount:18_400,  dueDate:"2026-05-15", status:"pendente", paymentMethod:"boleto", dept:"operacoes" },
  { id:"TX-0039", type:"despesa", category:"manutencao",description:"Revisão anual SMT Line 1 — OC-0024",  counterparty:"TechService Manutenção",    amount:22_400,  dueDate:"2026-05-28", status:"pendente", paymentMethod:"boleto", dept:"operacoes" },
  { id:"TX-0040", type:"despesa", category:"ti",        description:"Microsoft Azure — licenças maio",     counterparty:"Microsoft Brasil",          amount:14_800,  dueDate:"2026-05-20", status:"pendente", paymentMethod:"pix",    dept:"tecnologia" },
  // ── DESPESAS VENCIDAS (2) ──
  { id:"TX-0041", type:"despesa", category:"insumos",   description:"Solda Estanhada 60/40 — 100kg",       counterparty:"Metais & Soldagem Ltda",    amount:74_000,  dueDate:"2026-05-10", status:"vencido",  paymentMethod:"boleto", dept:"operacoes", tags:["bloqueado"] },
  { id:"TX-0042", type:"despesa", category:"inss",      description:"INSS complementar parcela 03/2026",   counterparty:"Receita Federal",           amount:12_400,  dueDate:"2026-05-08", status:"vencido",  paymentMethod:"ted",    dept:"rh", tags:["multa_risco"] },
];

// ── Products (16) ─────────────────────────────────────────────────────────
export const products: Product[] = [
  // Matéria-prima (4):
  { id:"P001", sku:"MP-001", name:"Cobre Eletrolítico",              category:"materia_prima",   unit:"kg",    stock:180,    minStock:500,   maxStock:2_000,  unitCost:48.90,      unitPrice:0,      supplierId:"S001", location:"Almox A-01", lastMovement:"2026-05-14" },
  { id:"P002", sku:"MP-002", name:"Resina Epóxi",                    category:"materia_prima",   unit:"kg",    stock:1_200,  minStock:400,   maxStock:3_000,  unitCost:28.50,      unitPrice:0,      supplierId:"S002", location:"Almox A-02", lastMovement:"2026-05-15" },
  { id:"P003", sku:"MP-003", name:'PCB FR4 (100×150mm)',             category:"materia_prima",   unit:"un",    stock:8_400,  minStock:2_000, maxStock:20_000, unitCost:3.20,       unitPrice:0,      supplierId:"S003", location:"Almox A-03", lastMovement:"2026-05-16" },
  { id:"P004", sku:"MP-004", name:"Tubo PVC 25mm (barra 6m)",        category:"materia_prima",   unit:"m",     stock:840,    minStock:200,   maxStock:1_500,  unitCost:8.90,       unitPrice:0,      supplierId:"S006", location:"Almox B-01", lastMovement:"2026-05-10" },
  // Insumos (4):
  { id:"P005", sku:"IN-001", name:"Capacitor SMD 100µF/25V",         category:"insumo",          unit:"un",    stock:12_000, minStock:15_000,maxStock:80_000, unitCost:0.28,       unitPrice:0,      supplierId:"S004", location:"Almox C-01", lastMovement:"2026-05-16" },
  { id:"P006", sku:"IN-002", name:"Resistor 10kΩ 0805",              category:"insumo",          unit:"un",    stock:65_000, minStock:20_000,maxStock:150_000,unitCost:0.04,       unitPrice:0,      supplierId:"S004", location:"Almox C-02", lastMovement:"2026-05-17" },
  { id:"P007", sku:"IN-003", name:"Solda Estanhada 60/40",           category:"insumo",          unit:"kg",    stock:28,     minStock:50,    maxStock:200,    unitCost:42.80,      unitPrice:0,      supplierId:"S005", location:"Almox C-03", lastMovement:"2026-05-13" },
  { id:"P008", sku:"IN-004", name:"Parafuso M4 Inox (cx100)",        category:"insumo",          unit:"cx",    stock:340,    minStock:100,   maxStock:800,    unitCost:12.40,      unitPrice:0,      supplierId:"S006", location:"Almox C-04", lastMovement:"2026-05-12" },
  // Produtos Acabados (5):
  { id:"P009", sku:"PA-001", name:"Placa Controladora CLP-200",      category:"produto_acabado", unit:"un",    stock:85,     minStock:20,    maxStock:200,    unitCost:1_240,      unitPrice:2_180,  supplierId:"S001", location:"Expedicao E-01", lastMovement:"2026-05-17" },
  { id:"P010", sku:"PA-002", name:"Módulo Inversor 5kVA",            category:"produto_acabado", unit:"un",    stock:42,     minStock:15,    maxStock:120,    unitCost:2_840,      unitPrice:4_950,  supplierId:"S001", location:"Expedicao E-02", lastMovement:"2026-05-16" },
  { id:"P011", sku:"PA-003", name:'Painel HMI Touch 7"',             category:"produto_acabado", unit:"un",    stock:28,     minStock:10,    maxStock:80,     unitCost:1_680,      unitPrice:2_890,  supplierId:"S002", location:"Expedicao E-03", lastMovement:"2026-05-15" },
  { id:"P012", sku:"PA-004", name:"Sensor Temperatura PT100",        category:"produto_acabado", unit:"un",    stock:156,    minStock:40,    maxStock:400,    unitCost:384,        unitPrice:680,    supplierId:"S003", location:"Expedicao E-04", lastMovement:"2026-05-17" },
  { id:"P013", sku:"PA-005", name:"Driver Servo Motor Compact",      category:"produto_acabado", unit:"un",    stock:64,     minStock:20,    maxStock:180,    unitCost:920,        unitPrice:1_640,  supplierId:"S001", location:"Expedicao E-05", lastMovement:"2026-05-16" },
  // Ativos (3):
  { id:"P014", sku:"AT-001", name:"Estação de Solda SMT",            category:"ativo",           unit:"un",    stock:3,      minStock:1,     maxStock:5,      unitCost:48_000,     unitPrice:0,      supplierId:"S005", location:"Producao P-01", lastMovement:"2026-03-10" },
  { id:"P015", sku:"AT-002", name:"Osciloscópio 4CH 200MHz",         category:"ativo",           unit:"un",    stock:2,      minStock:1,     maxStock:4,      unitCost:12_800,     unitPrice:0,      supplierId:"S007", location:"Lab L-01",      lastMovement:"2026-02-20" },
  { id:"P016", sku:"AT-003", name:"Torno CNC BRM-200",               category:"ativo",           unit:"un",    stock:1,      minStock:1,     maxStock:2,      unitCost:185_000,    unitPrice:0,      supplierId:"S008", location:"Producao P-02", lastMovement:"2025-11-15" },
];

// ── Suppliers (8) ─────────────────────────────────────────────────────────
export const suppliers: Supplier[] = [
  { id:"S001", name:"Distribuidora Eletrônica Nacional", cnpj:"12.345.678/0001-90", category:"Componentes",    status:"ativo",      rating:4.7, leadTimeDays:14, paymentTerms:30, totalPurchasesYtd:840_000, city:"São Paulo, SP"     },
  { id:"S002", name:"Química Industrial Paulista",        cnpj:"23.456.789/0001-12", category:"Materiais",      status:"ativo",      rating:4.2, leadTimeDays:21, paymentTerms:45, totalPurchasesYtd:420_000, city:"Guarulhos, SP"     },
  { id:"S003", name:"PCB Indústria Brasil",               cnpj:"34.567.890/0001-23", category:"PCB / Subst.",   status:"ativo",      rating:4.9, leadTimeDays:10, paymentTerms:30, totalPurchasesYtd:680_000, city:"Campinas, SP"      },
  { id:"S004", name:"Alfa Componentes SMD",               cnpj:"45.678.901/0001-34", category:"Componentes",    status:"ativo",      rating:3.8, leadTimeDays:7,  paymentTerms:28, totalPurchasesYtd:1_240_000,city:"São Paulo, SP"    },
  { id:"S005", name:"Metais & Soldagem Ltda",             cnpj:"56.789.012/0001-45", category:"Insumos",        status:"ativo",      rating:4.1, leadTimeDays:15, paymentTerms:30, totalPurchasesYtd:280_000, city:"Santo André, SP"   },
  { id:"S006", name:"Materiais Construtivos Araújo",      cnpj:"67.890.123/0001-56", category:"Civil / Infra",  status:"em_analise", rating:3.5, leadTimeDays:20, paymentTerms:60, totalPurchasesYtd:180_000, city:"Jundiaí, SP"       },
  { id:"S007", name:"TechInstruments Brasil",             cnpj:"78.901.234/0001-67", category:"Instrumentação", status:"ativo",      rating:4.6, leadTimeDays:25, paymentTerms:30, totalPurchasesYtd:95_000,  city:"Belo Horizonte, MG"},
  { id:"S008", name:"Tornos & Fresas Industriais",        cnpj:"89.012.345/0001-78", category:"Maquinário",     status:"em_analise", rating:3.1, leadTimeDays:45, paymentTerms:90, totalPurchasesYtd:185_000, city:"São Bernardo, SP"  },
];

// ── Purchase Orders (14) ──────────────────────────────────────────────────
export const purchaseOrders: PurchaseOrder[] = [
  { id:"OC-2026-0031", supplierId:"S004", supplierName:"Alfa Componentes SMD",        status:"aguardando_aprovacao", totalValue:340_000, items:4,  requestedBy:"Rafael Melo",     createdAt:"2026-05-16", expectedDelivery:"2026-05-24", priority:"urgente", category:"Componentes"    },
  { id:"OC-2026-0030", supplierId:"S001", supplierName:"Distribuidora Eletrônica",    status:"aguardando_aprovacao", totalValue:215_000, items:8,  requestedBy:"Carla Nunes",     createdAt:"2026-05-15", expectedDelivery:"2026-05-29", priority:"urgente", category:"Componentes"    },
  { id:"OC-2026-0029", supplierId:"S002", supplierName:"Química Industrial Paulista", status:"aguardando_aprovacao", totalValue:48_000,  items:2,  requestedBy:"Diego Rocha",     createdAt:"2026-05-15", expectedDelivery:"2026-06-05", priority:"normal",  category:"Materiais"      },
  { id:"OC-2026-0028", supplierId:"S003", supplierName:"PCB Indústria Brasil",        status:"aguardando_aprovacao", totalValue:89_000,  items:5,  requestedBy:"Rafael Melo",     createdAt:"2026-05-14", expectedDelivery:"2026-05-24", priority:"normal",  category:"PCB / Subst."   },
  { id:"OC-2026-0027", supplierId:"S004", supplierName:"Alfa Componentes SMD",        status:"aprovada",             totalValue:280_000, items:3,  requestedBy:"Carla Nunes",     createdAt:"2026-05-12", expectedDelivery:"2026-05-19", priority:"critica", category:"Componentes"    },
  { id:"OC-2026-0026", supplierId:"S005", supplierName:"Metais & Soldagem Ltda",      status:"aprovada",             totalValue:32_400,  items:6,  requestedBy:"Diego Rocha",     createdAt:"2026-05-10", expectedDelivery:"2026-05-25", priority:"normal",  category:"Insumos"        },
  { id:"OC-2026-0025", supplierId:"S001", supplierName:"Distribuidora Eletrônica",    status:"aprovada",             totalValue:156_000, items:10, requestedBy:"Rafael Melo",     createdAt:"2026-05-09", expectedDelivery:"2026-05-23", priority:"normal",  category:"Componentes"    },
  { id:"OC-2026-0024", supplierId:"S004", supplierName:"Alfa Componentes SMD",        status:"enviada",              totalValue:124_000, items:4,  requestedBy:"Carla Nunes",     createdAt:"2026-05-07", expectedDelivery:"2026-05-14", priority:"urgente", category:"Componentes"    },
  { id:"OC-2026-0023", supplierId:"S003", supplierName:"PCB Indústria Brasil",        status:"enviada",              totalValue:68_000,  items:8,  requestedBy:"Diego Rocha",     createdAt:"2026-05-06", expectedDelivery:"2026-05-16", priority:"normal",  category:"PCB / Subst."   },
  { id:"OC-2026-0022", supplierId:"S002", supplierName:"Química Industrial Paulista", status:"enviada",              totalValue:24_800,  items:2,  requestedBy:"Rafael Melo",     createdAt:"2026-05-05", expectedDelivery:"2026-05-26", priority:"normal",  category:"Materiais"      },
  { id:"OC-2026-0021", supplierId:"S001", supplierName:"Distribuidora Eletrônica",    status:"recebida",             totalValue:184_000, items:12, requestedBy:"Carla Nunes",     createdAt:"2026-04-28", expectedDelivery:"2026-05-12", priority:"normal",  category:"Componentes"    },
  { id:"OC-2026-0020", supplierId:"S004", supplierName:"Alfa Componentes SMD",        status:"recebida",             totalValue:96_000,  items:6,  requestedBy:"Diego Rocha",     createdAt:"2026-04-25", expectedDelivery:"2026-05-02", priority:"normal",  category:"Componentes"    },
  { id:"OC-2026-0019", supplierId:"S005", supplierName:"Metais & Soldagem Ltda",      status:"recebida",             totalValue:18_600,  items:4,  requestedBy:"Rafael Melo",     createdAt:"2026-04-22", expectedDelivery:"2026-05-07", priority:"normal",  category:"Insumos"        },
  { id:"OC-2026-0018", supplierId:"S003", supplierName:"PCB Indústria Brasil",        status:"recebida",             totalValue:52_000,  items:3,  requestedBy:"Carla Nunes",     createdAt:"2026-04-20", expectedDelivery:"2026-04-30", priority:"normal",  category:"PCB / Subst."   },
];

// ── Employees (20) ────────────────────────────────────────────────────────
export const employees: Employee[] = [
  { id:"E001", name:"Marcelo Andrade",   role:"CEO",                    dept:"diretoria",  status:"ativo",    salary:32_000, benefits:8_000, admissionDate:"2018-03-01", initials:"MA", avatarColor:"#6366f1", performance:92, hoursMonth:168, location:"Campinas, SP" },
  { id:"E002", name:"Fernanda Lima",     role:"CFO",                    dept:"diretoria",  status:"ativo",    salary:28_000, benefits:7_000, admissionDate:"2019-08-15", initials:"FL", avatarColor:"#8b5cf6", performance:89, hoursMonth:168, location:"Campinas, SP" },
  { id:"E003", name:"Roberto Campos",    role:"Controller",             dept:"financeiro", status:"ativo",    salary:18_000, benefits:4_500, admissionDate:"2020-01-10", initials:"RC", avatarColor:"#22c55e", performance:85, hoursMonth:168, location:"Campinas, SP" },
  { id:"E004", name:"Juliana Torres",    role:"Analista Sênior",        dept:"financeiro", status:"ativo",    salary:12_500, benefits:3_100, admissionDate:"2021-06-01", initials:"JT", avatarColor:"#10b981", performance:88, hoursMonth:168, location:"Campinas, SP" },
  { id:"E005", name:"Lucas Ferreira",    role:"Analista Jr.",           dept:"financeiro", status:"ativo",    salary:7_800,  benefits:1_950, admissionDate:"2024-03-15", initials:"LF", avatarColor:"#34d399", performance:72, hoursMonth:168, location:"Campinas, SP" },
  { id:"E006", name:"Thiago Azevedo",    role:"CTO",                    dept:"tecnologia", status:"ativo",    salary:24_000, benefits:6_000, admissionDate:"2019-11-01", initials:"TA", avatarColor:"#3b82f6", performance:91, hoursMonth:168, location:"Campinas, SP" },
  { id:"E007", name:"Amanda Costa",      role:"Dev Sênior",             dept:"tecnologia", status:"ativo",    salary:16_000, benefits:4_000, admissionDate:"2021-04-01", initials:"AC", avatarColor:"#60a5fa", performance:87, hoursMonth:168, location:"Campinas, SP" },
  { id:"E008", name:"Bruno Santos",      role:"Dev Jr.",                dept:"tecnologia", status:"ferias",   salary:9_200,  benefits:2_300, admissionDate:"2023-09-01", initials:"BS", avatarColor:"#93c5fd", performance:75, hoursMonth:0,   location:"Campinas, SP" },
  { id:"E009", name:"Rafael Melo",       role:"Gerente de Operações",   dept:"operacoes",  status:"ativo",    salary:18_000, benefits:4_500, admissionDate:"2020-05-15", initials:"RM", avatarColor:"#f59e0b", performance:83, hoursMonth:168, location:"Campinas, SP" },
  { id:"E010", name:"Carla Nunes",       role:"Técnica Sênior",         dept:"operacoes",  status:"ativo",    salary:9_500,  benefits:2_375, admissionDate:"2022-02-01", initials:"CN", avatarColor:"#fbbf24", performance:90, hoursMonth:168, location:"Campinas, SP" },
  { id:"E011", name:"Diego Rocha",       role:"Técnico Sênior",         dept:"operacoes",  status:"ativo",    salary:9_500,  benefits:2_375, admissionDate:"2022-07-15", initials:"DR", avatarColor:"#fcd34d", performance:84, hoursMonth:168, location:"Campinas, SP" },
  { id:"E012", name:"Patrícia Vieira",   role:"Operadora",              dept:"operacoes",  status:"afastado", salary:5_800,  benefits:1_450, admissionDate:"2023-11-01", initials:"PV", avatarColor:"#fde68a", performance:68, hoursMonth:0,   location:"Campinas, SP" },
  { id:"E013", name:"Ana Clara Oliveira",role:"Diretora Comercial",     dept:"comercial",  status:"ativo",    salary:22_000, benefits:5_500, admissionDate:"2020-09-01", initials:"AO", avatarColor:"#38bdf8", performance:93, hoursMonth:168, location:"Campinas, SP" },
  { id:"E014", name:"Gustavo Ramos",     role:"Key Account Manager",    dept:"comercial",  status:"ativo",    salary:12_800, benefits:3_200, admissionDate:"2021-12-01", initials:"GR", avatarColor:"#7dd3fc", performance:86, hoursMonth:168, location:"Campinas, SP" },
  { id:"E015", name:"Isabela Martins",   role:"Vendedora",              dept:"comercial",  status:"ferias",   salary:7_200,  benefits:1_800, admissionDate:"2023-04-15", initials:"IM", avatarColor:"#bae6fd", performance:78, hoursMonth:0,   location:"Campinas, SP" },
  { id:"E016", name:"Rodrigo Pereira",   role:"Gerente de Logística",   dept:"logistica",  status:"ativo",    salary:15_000, benefits:3_750, admissionDate:"2019-07-01", initials:"RP", avatarColor:"#06b6d4", performance:81, hoursMonth:168, location:"Campinas, SP" },
  { id:"E017", name:"Camila Souza",      role:"Coordenadora",           dept:"logistica",  status:"ativo",    salary:9_800,  benefits:2_450, admissionDate:"2022-03-01", initials:"CS", avatarColor:"#22d3ee", performance:85, hoursMonth:168, location:"Campinas, SP" },
  { id:"E018", name:"Felipe Cardoso",    role:"Auxiliar de Logística",  dept:"logistica",  status:"ferias",   salary:5_200,  benefits:1_300, admissionDate:"2026-01-15", initials:"FC", avatarColor:"#67e8f9", performance:70, hoursMonth:0,   location:"Campinas, SP" },
  { id:"E019", name:"Vanessa Lima",      role:"CHRO",                   dept:"rh",         status:"ativo",    salary:16_000, benefits:4_000, admissionDate:"2020-06-01", initials:"VL", avatarColor:"#f43f5e", performance:88, hoursMonth:168, location:"Campinas, SP" },
  { id:"E020", name:"Henrique Alves",    role:"Analista de RH",         dept:"rh",         status:"ferias",   salary:7_400,  benefits:1_850, admissionDate:"2023-08-01", initials:"HA", avatarColor:"#fb7185", performance:77, hoursMonth:0,   location:"Campinas, SP" },
];

// ── Budget Lines (16) ─────────────────────────────────────────────────────
export const budgetLines: BudgetLine[] = [
  // Receitas (8)
  { dept:"comercial",  category:"Vendas Industriais",   budgeted:3_200_000, actual:3_340_000, variance:140_000,  variancePct:4.4   },
  { dept:"comercial",  category:"Exportação",           budgeted:480_000,   actual:420_000,   variance:-60_000,  variancePct:-12.5 },
  { dept:"comercial",  category:"Serviços",             budgeted:280_000,   actual:318_000,   variance:38_000,   variancePct:13.6  },
  { dept:"comercial",  category:"Outros",               budgeted:120_000,   actual:108_000,   variance:-12_000,  variancePct:-10.0 },
  { dept:"financeiro", category:"Receitas Financeiras", budgeted:45_000,    actual:52_400,    variance:7_400,    variancePct:16.4  },
  { dept:"logistica",  category:"Frete Reembolso",      budgeted:38_000,    actual:35_200,    variance:-2_800,   variancePct:-7.4  },
  { dept:"comercial",  category:"Royalties/Licenças",   budgeted:25_000,    actual:28_400,    variance:3_400,    variancePct:13.6  },
  { dept:"financeiro", category:"Outras Receitas",      budgeted:18_000,    actual:20_100,    variance:2_100,    variancePct:11.7  },
  // Despesas (8)
  { dept:"comercial",  category:"Desp. Comercial",      budgeted:180_000,   actual:168_400,   variance:-11_600,  variancePct:-6.4  },
  { dept:"operacoes",  category:"Desp. Operacional",    budgeted:340_000,   actual:358_200,   variance:18_200,   variancePct:5.4   },
  { dept:"tecnologia", category:"TI / Software",        budgeted:65_000,    actual:72_400,    variance:7_400,    variancePct:11.4  },
  { dept:"rh",         category:"Desp. RH",             budgeted:290_000,   actual:283_600,   variance:-6_400,   variancePct:-2.2  },
  { dept:"financeiro", category:"Desp. Financeira",     budgeted:48_000,    actual:54_200,    variance:6_200,    variancePct:12.9  },
  { dept:"logistica",  category:"Desp. Logística",      budgeted:124_000,   actual:118_800,   variance:-5_200,   variancePct:-4.2  },
  { dept:"operacoes",  category:"CAPEX",                budgeted:210_000,   actual:234_000,   variance:24_000,   variancePct:11.4  },
  { dept:"diretoria",  category:"G&A",                  budgeted:95_000,    actual:88_400,    variance:-6_600,   variancePct:-6.9  },
];

// ── Monthly Metrics (Jan–Dez 2025) ────────────────────────────────────────
export const monthlyMetrics: MonthlyMetric[] = [
  { month:"Jan", revenue:G[0],  cogs:COGS[0],  grossProfit:LB[0],  opex:DV[0]+DA[0],  ebitda:EBITDA[0],  netIncome:LL[0],  headcount:18 },
  { month:"Fev", revenue:G[1],  cogs:COGS[1],  grossProfit:LB[1],  opex:DV[1]+DA[1],  ebitda:EBITDA[1],  netIncome:LL[1],  headcount:18 },
  { month:"Mar", revenue:G[2],  cogs:COGS[2],  grossProfit:LB[2],  opex:DV[2]+DA[2],  ebitda:EBITDA[2],  netIncome:LL[2],  headcount:18 },
  { month:"Abr", revenue:G[3],  cogs:COGS[3],  grossProfit:LB[3],  opex:DV[3]+DA[3],  ebitda:EBITDA[3],  netIncome:LL[3],  headcount:19 },
  { month:"Mai", revenue:G[4],  cogs:COGS[4],  grossProfit:LB[4],  opex:DV[4]+DA[4],  ebitda:EBITDA[4],  netIncome:LL[4],  headcount:19 },
  { month:"Jun", revenue:G[5],  cogs:COGS[5],  grossProfit:LB[5],  opex:DV[5]+DA[5],  ebitda:EBITDA[5],  netIncome:LL[5],  headcount:19 },
  { month:"Jul", revenue:G[6],  cogs:COGS[6],  grossProfit:LB[6],  opex:DV[6]+DA[6],  ebitda:EBITDA[6],  netIncome:LL[6],  headcount:20 },
  { month:"Ago", revenue:G[7],  cogs:COGS[7],  grossProfit:LB[7],  opex:DV[7]+DA[7],  ebitda:EBITDA[7],  netIncome:LL[7],  headcount:20 },
  { month:"Set", revenue:G[8],  cogs:COGS[8],  grossProfit:LB[8],  opex:DV[8]+DA[8],  ebitda:EBITDA[8],  netIncome:LL[8],  headcount:20 },
  { month:"Out", revenue:G[9],  cogs:COGS[9],  grossProfit:LB[9],  opex:DV[9]+DA[9],  ebitda:EBITDA[9],  netIncome:LL[9],  headcount:20 },
  { month:"Nov", revenue:G[10], cogs:COGS[10], grossProfit:LB[10], opex:DV[10]+DA[10],ebitda:EBITDA[10], netIncome:LL[10], headcount:20 },
  { month:"Dez", revenue:G[11], cogs:COGS[11], grossProfit:LB[11], opex:DV[11]+DA[11],ebitda:EBITDA[11], netIncome:LL[11], headcount:20 },
];

// ── Alerts (10) ──────────────────────────────────────────────────────────
export const orionAlerts: OrionAlert[] = [
  { id:"AL-001", severity:"critical", module:"operacoes",  title:"Cobre Eletrolítico abaixo do mínimo",      description:"Estoque atual: 180kg vs. mínimo 500kg — risco de parada de produção",         time:"há 2 horas",  resolved:false },
  { id:"AL-002", severity:"critical", module:"financeiro", title:"NF-e 004.218 vencida há 5 dias",           description:"Eletro Componentes Ltda · R$ 245.000 · venceu em 12/Mai/2026",              time:"hoje",        resolved:false },
  { id:"AL-003", severity:"critical", module:"financeiro", title:"Limite de crédito Alfa Componentes atingido",description:"Exposição total R$ 1,24M — limite R$ 1,20M excedido",                    time:"há 3 horas",  resolved:false },
  { id:"AL-004", severity:"warning",  module:"tesouraria", title:"Saldo Santander USD abaixo de USD 90k",    description:"Saldo atual USD 84.300 — threshold de alerta USD 90.000",                   time:"hoje",        resolved:false },
  { id:"AL-005", severity:"warning",  module:"operacoes",  title:"OC-2026-0028 aguarda aprovação há 3 dias", description:"PCB Indústria Brasil · R$ 89.000 · criada em 14/Mai/2026",                 time:"há 3 dias",   resolved:false },
  { id:"AL-006", severity:"warning",  module:"analytics",  title:"Margem bruta Abr -1.8pp vs meta",          description:"Realizado 32,8% vs. meta 34,6% — impacto R$ 54K no resultado",             time:"ontem",       resolved:false },
  { id:"AL-007", severity:"warning",  module:"pessoas",    title:"Folha maio não aprovada",                  description:"Pagamento programado para 05/Jun/2026 — aprovação pendente desde 15/Mai", time:"hoje",        resolved:false },
  { id:"AL-008", severity:"info",     module:"tesouraria", title:"Câmbio USD/BRL acima de R$5.40",           description:"USD/BRL atual 5,47 — contratos indexados podem ser impactados",             time:"há 1 hora",   resolved:true  },
  { id:"AL-009", severity:"info",     module:"analytics",  title:"Relatório DRE Q1 disponível",              description:"Demonstrativo completo Jan-Mar 2026 disponível para download",              time:"ontem",       resolved:true  },
  { id:"AL-010", severity:"info",     module:"pessoas",    title:"3 funcionários com aniversário essa semana",description:"Rafael Melo (19/Mai), Camila Souza (21/Mai), Bruno Santos (22/Mai)",      time:"hoje",        resolved:true  },
];

// ── Activity Feed (12) ────────────────────────────────────────────────────
export const activityFeed: ActivityItem[] = [
  { id:"AC-001", actor:"Roberto Campos",   initials:"RC", color:"#22c55e", action:"aprovou OC-2026-0027 — Alfa Componentes R$ 280.000",            module:"financeiro", time:"há 5 min",  amount:280_000  },
  { id:"AC-002", actor:"Sistema",          initials:"SY", color:"#6366f1", action:"pagamento TX-0033 registrado — Alfa Componentes R$ 124.000",    module:"tesouraria", time:"há 18 min", amount:-124_000 },
  { id:"AC-003", actor:"Fernanda Lima",    initials:"FL", color:"#8b5cf6", action:"NF-e 004.535 emitida — Metalúrgica Horizonte R$ 340.000",       module:"financeiro", time:"há 42 min", amount:340_000  },
  { id:"AC-004", actor:"Vanessa Lima",     initials:"VL", color:"#f43f5e", action:"novo funcionário cadastrado — Felipe Cardoso (Logística)",       module:"pessoas",    time:"há 1h"                     },
  { id:"AC-005", actor:"Roberto Campos",   initials:"RC", color:"#22c55e", action:"limite de crédito Indústria Alfa S.A. atualizado para R$ 500k", module:"financeiro", time:"há 2h"                     },
  { id:"AC-006", actor:"Sistema",          initials:"SY", color:"#6366f1", action:"recebimento TX-0015 confirmado — Metalúrgica Horizonte R$ 340k",module:"tesouraria", time:"há 3h",    amount:340_000  },
  { id:"AC-007", actor:"Ana Clara Oliveira",initials:"AO",color:"#38bdf8", action:"proposta enviada — Construtora Delta R$ 185.000",               module:"overview",   time:"há 4h",    amount:185_000  },
  { id:"AC-008", actor:"Thiago Azevedo",   initials:"TA", color:"#3b82f6", action:"migração servidor concluída — ambiente produção atualizado",     module:"overview",   time:"há 5h"                     },
  { id:"AC-009", actor:"Rafael Melo",      initials:"RM", color:"#f59e0b", action:"OC-2026-0031 criada — Alfa Componentes urgente R$ 340.000",      module:"operacoes",  time:"há 6h",    amount:-340_000 },
  { id:"AC-010", actor:"Fernanda Lima",    initials:"FL", color:"#8b5cf6", action:"EBITDA Abr/2026 encerrado — margem 18,4% vs. meta 20%",          module:"analytics",  time:"há 8h"                     },
  { id:"AC-011", actor:"Gustavo Ramos",    initials:"GR", color:"#7dd3fc", action:"contrato renovado — Grupo Ventura R$ 1,2M/ano",                  module:"overview",   time:"ontem",    amount:1_200_000},
  { id:"AC-012", actor:"Roberto Campos",   initials:"RC", color:"#22c55e", action:"conciliação bancária Mai/2026 concluída — 3 contas",             module:"tesouraria", time:"ontem"                     },
];

// ── Derived constants ────────────────────────────────────────────────────
export const stockAlerts = products.filter(p => p.stock <= p.minStock);
export const overdueTransactions = transactions.filter(t => t.status === "vencido");
export const pendingPOs = purchaseOrders.filter(p =>
  ["rascunho","aguardando_aprovacao","aprovada","enviada","recebida_parcial"].includes(p.status)
);

const FX_USD = 5.47;
const _cashBRL = bankAccounts.filter(b => b.currency === "BRL").reduce((s, b) => s + b.balance, 0);
const _cashUSD = bankAccounts.find(b => b.currency === "USD")?.balance ?? 0;

export const kpiSnapshot = {
  revenueMonth:       G[4],
  revenuePrev:        G[3],
  revenueYtd:         G.slice(0, 5).reduce((s, v) => s + v, 0),
  revenueYtdPrev:     13_200_000,
  ebitdaMonth:        EBITDA[4],
  ebitdaMarginPct:    parseFloat((EBITDA[4] / G[4] * 100).toFixed(1)),
  netIncomeMonth:     LL[4],
  netIncomePct:       parseFloat((LL[4] / G[4] * 100).toFixed(1)),
  cashPosition:       Math.round(_cashBRL + _cashUSD * FX_USD),
  cashChange7d:       215_000,
  headcountActive:    employees.filter(e => e.status === "ativo").length,
  headcountNew:       1,
  payrollMonth:       employees.reduce((s, e) => s + e.salary + e.benefits, 0),
  overdueReceivables: overdueTransactions.filter(t => t.type === "receita").reduce((s, t) => s + t.amount, 0),
  overduePayables:    overdueTransactions.filter(t => t.type === "despesa").reduce((s, t) => s + t.amount, 0),
  stockCritical:      stockAlerts.length,
  pendingPOsCount:    pendingPOs.length,
  pendingPOsValue:    pendingPOs.reduce((s, p) => s + p.totalValue, 0),
};

export const revenueSparkline: number[] = G;
export const ebitdaSparkline:  number[] = EBITDA;
export const cashSparkline:    number[] = cashFlowItems.slice(0, 12).map(c => c.balance);
