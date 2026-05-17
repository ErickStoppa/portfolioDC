// ── ORION ERP — Nexum Indústria S.A. ──────────────────────────────────────
// Manufatura de componentes eletrônicos · Campinas, SP · CFO: Rafael Monteiro

export type ActivityType  = "pagamento" | "recebimento" | "nota_fiscal" | "contrato" | "alerta" | "aprovacao";
export type OrderStatus   = "producao" | "pendente" | "concluido" | "atrasado";
export type AlertSeverity = "critico" | "atencao" | "info";
export type EmployeeStatus = "ativo" | "ferias" | "afastado";

export interface MonthlyData {
  month: string; gross: number; net: number; ebitda: number; budget: number;
}
export interface ProductLine {
  name: string; revenue: number[]; color: string;
}
export interface PlLine {
  label: string; value: number; prev: number;
  type: "receita" | "deducao" | "subtotal" | "custo" | "despesa" | "resultado";
  indent?: number; separator?: boolean;
}
export interface CashFlowItem {
  label: string; value: number; type: "start" | "in" | "out" | "end";
}
export interface AgingBucket {
  bucket: string; amount: number; count: number; color: string;
}
export interface BankAccount {
  id: string; bank: string; type: string; balance: number;
  agency: string; account: string; currency: "BRL" | "USD" | "EUR";
  color: string; change: number;
}
export interface Activity {
  id: string; type: ActivityType; title: string;
  description: string; amount?: number; user: string; time: string;
}
export interface Alert {
  id: string; severity: AlertSeverity; title: string;
  message: string; time: string; read: boolean; module: string;
}
export interface Order {
  id: string; client: string; product: string; productLine: string;
  qty: number; value: number; status: OrderStatus;
  delivery: string; daysLeft: number; priority: "alta" | "media" | "baixa";
}
export interface Employee {
  id: string; name: string; dept: string; role: string;
  salary: number; startDate: string; status: EmployeeStatus;
  initials: string; avatarColor: string;
}
export interface DeptData {
  dept: string; count: number; payroll: number; color: string;
}

// ── KPIs ─────────────────────────────────────────────────────────────────
export const kpiData = {
  revenue: 8_940_000, revenuePrev: 8_610_000,
  ebitda: 1_072_800, ebitdaPrev: 1_032_000, ebitdaMargin: 12.0,
  cashPosition: 12_900_000, cashPositionPrev: 12_400_000,
  netIncome: 409_790, netIncomePrev: 388_420,
  accountsReceivable: 7_000_000, accountsPayable: 5_100_000,
  dso: 24, dpo: 18,
};

// ── MONTHLY DATA (Jun/24 → Mai/25) ───────────────────────────────────────
export const monthlyData: MonthlyData[] = [
  { month: "Jun/24", gross: 6_800_000, net: 5_780_000, ebitda: 816_000,   budget: 6_500_000 },
  { month: "Jul/24", gross: 7_200_000, net: 6_120_000, ebitda: 864_000,   budget: 6_800_000 },
  { month: "Ago/24", gross: 7_500_000, net: 6_375_000, ebitda: 900_000,   budget: 7_200_000 },
  { month: "Set/24", gross: 6_900_000, net: 5_865_000, ebitda: 828_000,   budget: 7_000_000 },
  { month: "Out/24", gross: 7_800_000, net: 6_630_000, ebitda: 936_000,   budget: 7_500_000 },
  { month: "Nov/24", gross: 8_300_000, net: 7_055_000, ebitda: 996_000,   budget: 8_000_000 },
  { month: "Dez/24", gross: 7_100_000, net: 6_035_000, ebitda: 852_000,   budget: 7_200_000 },
  { month: "Jan/25", gross: 7_400_000, net: 6_290_000, ebitda: 888_000,   budget: 7_000_000 },
  { month: "Fev/25", gross: 7_900_000, net: 6_715_000, ebitda: 948_000,   budget: 7_800_000 },
  { month: "Mar/25", gross: 8_200_000, net: 6_970_000, ebitda: 984_000,   budget: 8_200_000 },
  { month: "Abr/25", gross: 8_610_000, net: 7_318_500, ebitda:1_032_000,  budget: 8_500_000 },
  { month: "Mai/25", gross: 8_940_000, net: 7_599_000, ebitda:1_072_800,  budget: 8_800_000 },
];

export const productLines: ProductLine[] = [
  { name: "PCB Components",     color: "#6366f1", revenue: [3_060_000,3_240_000,3_375_000,3_105_000,3_510_000,3_735_000,3_195_000,3_330_000,3_555_000,3_690_000,3_874_500,4_023_000] },
  { name: "Sensores Industriais", color: "#38bdf8", revenue: [2_176_000,2_304_000,2_400_000,2_208_000,2_496_000,2_656_000,2_272_000,2_368_000,2_528_000,2_624_000,2_755_200,2_860_800] },
  { name: "Módulos de Potência", color: "#22c55e", revenue: [1_564_000,1_656_000,1_725_000,1_587_000,1_794_000,1_909_000,1_633_000,1_702_000,1_817_000,1_886_000,1_980_300,2_056_200] },
];

// ── P&L STATEMENT ─────────────────────────────────────────────────────────
export const plStatement: PlLine[] = [
  { label: "Receita Bruta",           value: 8_940_000,  prev: 8_610_000,  type: "receita"   },
  { label: "(-) Deduções e Impostos", value: -1_341_000, prev: -1_291_500, type: "deducao",  indent: 1 },
  { label: "Receita Líquida",         value: 7_599_000,  prev: 7_318_500,  type: "subtotal", separator: true },
  { label: "(-) CPV / CMV",           value: -4_179_450, prev: -4_025_175, type: "custo",   indent: 1 },
  { label: "Margem Bruta",            value: 3_419_550,  prev: 3_293_325,  type: "subtotal", separator: true },
  { label: "(-) Desp. Comercial",     value:  -455_940,  prev:  -439_110,  type: "despesa", indent: 1 },
  { label: "(-) Desp. Administrativa",value:  -531_930,  prev:  -512_295,  type: "despesa", indent: 1 },
  { label: "(-) Pesquisa & Desenvolvimento", value: -379_950, prev: -365_925, type: "despesa", indent: 1 },
  { label: "EBITDA",                  value: 2_051_730,  prev: 1_976_000,  type: "subtotal", separator: true },
  { label: "(-) Depreciação & Amortização", value: -227_970, prev: -219_555, type: "despesa", indent: 1 },
  { label: "EBIT",                    value: 1_823_760,  prev: 1_756_445,  type: "subtotal" },
  { label: "Resultado Financeiro",    value:  -151_980,  prev:  -146_370,  type: "despesa", indent: 1 },
  { label: "EBT (Resultado Antes IR)", value: 1_671_780, prev: 1_610_075,  type: "subtotal" },
  { label: "(-) IR / CSLL",           value:  -261_990,  prev:  -252_230,  type: "deducao", indent: 1 },
  { label: "Lucro Líquido",           value:  409_790,   prev:   388_420,  type: "resultado", separator: true },
];

// ── CASH FLOW WATERFALL ───────────────────────────────────────────────────
export const cashFlowItems: CashFlowItem[] = [
  { label: "Saldo Inicial Abr/25",     value: 12_400_000, type: "start" },
  { label: "Recebimentos de Clientes", value:  8_640_000, type: "in"    },
  { label: "Outras Receitas",          value:    200_000, type: "in"    },
  { label: "Pgto Fornecedores",        value: -4_600_000, type: "out"   },
  { label: "Folha de Pagamento",       value: -2_800_000, type: "out"   },
  { label: "Impostos e Taxas",         value:   -890_000, type: "out"   },
  { label: "CAPEX",                    value:    -50_000, type: "out"   },
  { label: "Saldo Final Mai/25",       value: 12_900_000, type: "end"   },
];

// ── AGING ─────────────────────────────────────────────────────────────────
export const agingReceivable: AgingBucket[] = [
  { bucket: "A vencer",  amount: 4_200_000, count: 48, color: "#22c55e" },
  { bucket: "1–30 dias", amount: 1_120_000, count: 14, color: "#6366f1" },
  { bucket: "31–60 dias",amount:   840_000, count:  9, color: "#f59e0b" },
  { bucket: "61–90 dias",amount:   560_000, count:  6, color: "#f97316" },
  { bucket: "+90 dias",  amount:   280_000, count:  3, color: "#f43f5e" },
];
export const agingPayable: AgingBucket[] = [
  { bucket: "A vencer",  amount: 2_805_000, count: 32, color: "#22c55e" },
  { bucket: "1–30 dias", amount: 1_224_000, count: 18, color: "#6366f1" },
  { bucket: "31–60 dias",amount:   714_000, count: 10, color: "#f59e0b" },
  { bucket: "+60 dias",  amount:   357_000, count:  5, color: "#f43f5e" },
];

// ── BANKS ─────────────────────────────────────────────────────────────────
export const bankAccounts: BankAccount[] = [
  { id: "b1", bank: "Itaú",     type: "Conta Corrente PJ", balance: 5_200_000, agency: "0042", account: "12345-7", currency: "BRL", color: "#f59e0b", change:  +48_200 },
  { id: "b2", bank: "Bradesco", type: "Conta Salário",     balance: 4_800_000, agency: "1234", account: "98765-4", currency: "BRL", color: "#f43f5e", change: -120_000 },
  { id: "b3", bank: "Santander",type: "Aplicação CDB 109%",balance: 2_900_000, agency: "3456", account: "54321-8", currency: "BRL", color: "#22c55e", change:  +11_600 },
];

// ── CASH PROJECTION (30 days) ─────────────────────────────────────────────
export const cashProjection = [
  12_900_000,12_851_000,12_782_000,12_720_000,12_074_000,
  12_012_000,11_965_000,11_908_000,12_184_000,12_648_000,
  12_580_000,12_512_000,12_450_000,12_820_000,12_758_000,
  12_694_000,12_168_000,12_104_000,12_048_000,11_342_000,
  11_280_000,11_842_000,11_784_000,11_718_000,12_094_000,
  12_028_000,11_964_000,12_248_000,12_182_000,12_460_000,
];

// ── FX ────────────────────────────────────────────────────────────────────
export const fxData = {
  USDBRL: 5.42, EURBRL: 5.87,
  usdExposure: 2_400_000, eurExposure: 1_800_000,
  hedgeRatio: 0.65,
  usdHistory: [5.18,5.22,5.30,5.28,5.35,5.41,5.44,5.40,5.38,5.42],
  eurHistory: [5.62,5.68,5.71,5.75,5.79,5.83,5.86,5.84,5.88,5.87],
};

// ── PEOPLE ────────────────────────────────────────────────────────────────
export const deptData: DeptData[] = [
  { dept: "Produção",        count: 148, payroll: 1_480_000, color: "#6366f1" },
  { dept: "Comercial",       count:  42, payroll:   504_000, color: "#38bdf8" },
  { dept: "Administrativo",  count:  38, payroll:   456_000, color: "#22c55e" },
  { dept: "P&D",             count:  28, payroll:   420_000, color: "#f59e0b" },
  { dept: "Logística",       count:  18, payroll:   198_000, color: "#a78bfa" },
  { dept: "RH / Outros",     count:  10, payroll:   142_000, color: "#f43f5e" },
];

export const employees: Employee[] = [
  { id:"e1",  name:"Rafael Monteiro",   dept:"Administrativo", role:"CFO",                    salary:28_000, startDate:"Jan 2015", status:"ativo",     initials:"RM", avatarColor:"#6366f1" },
  { id:"e2",  name:"Carla Souza",       dept:"Comercial",      role:"Diretora Comercial",     salary:22_000, startDate:"Mar 2018", status:"ativo",     initials:"CS", avatarColor:"#38bdf8" },
  { id:"e3",  name:"Bruno Almeida",     dept:"P&D",            role:"Gerente de Engenharia",  salary:19_500, startDate:"Jun 2019", status:"ativo",     initials:"BA", avatarColor:"#22c55e" },
  { id:"e4",  name:"Patrícia Lima",     dept:"RH / Outros",    role:"CHRO",                   salary:18_000, startDate:"Ago 2017", status:"ativo",     initials:"PL", avatarColor:"#f59e0b" },
  { id:"e5",  name:"Thiago Ferreira",   dept:"Produção",       role:"Gerente de Planta",      salary:16_800, startDate:"Fev 2016", status:"ativo",     initials:"TF", avatarColor:"#a78bfa" },
  { id:"e6",  name:"Mariana Costa",     dept:"Administrativo", role:"Controller",             salary:15_200, startDate:"Nov 2020", status:"ativo",     initials:"MC", avatarColor:"#f43f5e" },
  { id:"e7",  name:"João Paulo Ramos",  dept:"Logística",      role:"Coord. Supply Chain",    salary:12_400, startDate:"Jan 2021", status:"ferias",    initials:"JP", avatarColor:"#84cc16" },
  { id:"e8",  name:"Ana Beatriz Nunes", dept:"Comercial",      role:"Key Account Manager",    salary:11_800, startDate:"Mai 2022", status:"ativo",     initials:"AB", avatarColor:"#ec4899" },
  { id:"e9",  name:"Felipe Gomes",      dept:"P&D",            role:"Engenheiro Eletrônico",  salary:10_900, startDate:"Set 2023", status:"ativo",     initials:"FG", avatarColor:"#06b6d4" },
  { id:"e10", name:"Sandra Oliveira",   dept:"Produção",       role:"Supervisora de Qualidade",salary:9_800, startDate:"Mar 2024", status:"afastado",  initials:"SO", avatarColor:"#f97316" },
];

// ── ORDERS ────────────────────────────────────────────────────────────────
export const orders: Order[] = [
  { id:"OPE-2025-0847",client:"Siemens Brasil",    product:"PCB-X200",  productLine:"PCB Components",      qty:500,   value:285_000, status:"producao", delivery:"28/Mai/25", daysLeft:11,  priority:"alta"  },
  { id:"OPE-2025-0846",client:"WEG Motores",       product:"SNS-T400",  productLine:"Sensores Industriais", qty:200,   value:142_000, status:"producao", delivery:"30/Mai/25", daysLeft:13,  priority:"media" },
  { id:"OPE-2025-0845",client:"Embraer S.A.",      product:"MOD-P800",  productLine:"Módulos de Potência",  qty:100,   value:380_000, status:"pendente",  delivery:"05/Jun/25", daysLeft:19,  priority:"alta"  },
  { id:"OPE-2025-0844",client:"Fiat Chrysler",     product:"PCB-X150",  productLine:"PCB Components",       qty:1_200, value:192_000, status:"concluido", delivery:"15/Mai/25", daysLeft:-2,  priority:"media" },
  { id:"OPE-2025-0843",client:"Bosch Brasil",      product:"SNS-P200",  productLine:"Sensores Industriais", qty:350,   value:210_000, status:"atrasado",  delivery:"12/Mai/25", daysLeft:-5,  priority:"alta"  },
  { id:"OPE-2025-0842",client:"Embraco",           product:"MOD-P600",  productLine:"Módulos de Potência",  qty:80,    value:168_000, status:"producao", delivery:"02/Jun/25", daysLeft:16,  priority:"baixa" },
  { id:"OPE-2025-0841",client:"Weg Automação",     product:"PCB-M400",  productLine:"PCB Components",       qty:800,   value:344_000, status:"pendente",  delivery:"10/Jun/25", daysLeft:24,  priority:"media" },
  { id:"OPE-2025-0840",client:"Marcopolo S.A.",    product:"SNS-U100",  productLine:"Sensores Industriais", qty:120,   value: 96_000, status:"concluido", delivery:"10/Mai/25", daysLeft:-7,  priority:"baixa" },
  { id:"OPE-2025-0839",client:"Randon Part.",      product:"MOD-P400",  productLine:"Módulos de Potência",  qty:200,   value:224_000, status:"atrasado",  delivery:"08/Mai/25", daysLeft:-9,  priority:"alta"  },
  { id:"OPE-2025-0838",client:"Delphi Brasil",     product:"PCB-X300",  productLine:"PCB Components",       qty:400,   value:312_000, status:"producao", delivery:"25/Mai/25", daysLeft: 8,  priority:"media" },
  { id:"OPE-2025-0837",client:"Continental Brasil",product:"SNS-T800",  productLine:"Sensores Industriais", qty:150,   value:187_500, status:"pendente",  delivery:"15/Jun/25", daysLeft:29,  priority:"baixa" },
  { id:"OPE-2025-0836",client:"Mahle Metal Leve",  product:"PCB-X100",  productLine:"PCB Components",       qty:2_000, value:280_000, status:"concluido", delivery:"05/Mai/25", daysLeft:-12, priority:"media" },
];

// ── ACTIVITIES ────────────────────────────────────────────────────────────
export const activities: Activity[] = [
  { id:"a1",  type:"recebimento", title:"Recebimento — Siemens Brasil",       description:"NF 00847 liquidada",               amount:  285_000, user:"Sistema",          time:"há 2 min"   },
  { id:"a2",  type:"aprovacao",   title:"Aprovado — OC #4521",               description:"Componentes MOSFET · R$ 86K",       amount:   86_000, user:"Rafael Monteiro",  time:"há 18 min"  },
  { id:"a3",  type:"alerta",      title:"Inadimplência detectada",            description:"Metalúrgica Paulista +95 dias",     amount: -124_000, user:"Sistema",          time:"há 1 hora"  },
  { id:"a4",  type:"nota_fiscal", title:"NF emitida — WEG Motores",          description:"SNS-T400 × 200 un.",               amount:  142_000, user:"Faturamento",       time:"há 2 horas" },
  { id:"a5",  type:"pagamento",   title:"Pagamento — Avnet Silica",          description:"OC-3892 insumos IC",               amount: -342_000, user:"Tesouraria",        time:"há 3 horas" },
  { id:"a6",  type:"contrato",    title:"Contrato renovado — Bosch Brasil",  description:"Fornecimento 2025–2026",                       user:"Comercial",         time:"há 5 horas" },
  { id:"a7",  type:"recebimento", title:"Recebimento — Fiat Chrysler",       description:"NF 00844 liquidada",               amount:  192_000, user:"Sistema",          time:"há 8 horas" },
  { id:"a8",  type:"nota_fiscal", title:"NF emitida — Embraer S.A.",         description:"MOD-P800 × 100 un.",               amount:  380_000, user:"Faturamento",       time:"há 1 dia"   },
  { id:"a9",  type:"pagamento",   title:"Pagamento — Samsung Electro",       description:"Importação insumos Jul/25",        amount: -820_000, user:"Tesouraria",        time:"há 1 dia"   },
  { id:"a10", type:"aprovacao",   title:"Budget aprovado — P&D Jun/25",      description:"Projeto sensor ultrassônico",      amount:  120_000, user:"Rafael Monteiro",  time:"há 2 dias"  },
];

// ── ALERTS ────────────────────────────────────────────────────────────────
export const alerts: Alert[] = [
  { id:"al1", severity:"critico", title:"Inadimplência acima do limite",        message:"3 clientes com +90 dias somam R$ 280K — ação imediata requerida",  time:"hoje",    read:false, module:"financeiro"  },
  { id:"al2", severity:"atencao", title:"Vencimento de fornecedor em 2 dias",  message:"Avnet Silica — R$ 340K vence em 19/Mai/25",                        time:"hoje",    read:false, module:"tesouraria"  },
  { id:"al3", severity:"atencao", title:"Ordem OPE-2025-0843 atrasada 5 dias", message:"Bosch Brasil aguarda SNS-P200 — impacto contratual",               time:"hoje",    read:false, module:"operacoes"   },
  { id:"al4", severity:"info",    title:"SIMPLES Nacional apurado",            message:"Recolhimento R$ 234K — vencimento 20/Jun/25",                       time:"ontem",   read:true,  module:"financeiro"  },
  { id:"al5", severity:"info",    title:"Orçamento Mai/25 superado em 1,6%",   message:"Receita +R$ 140K vs. budget — desvio positivo",                   time:"ontem",   read:true,  module:"analytics"   },
  { id:"al6", severity:"atencao", title:"João Paulo Ramos em férias",          message:"Logística sem substituto designado 17–31/Mai",                     time:"2 dias",  read:true,  module:"pessoas"     },
];

export const sparkRevenue = monthlyData.map(d => d.gross);
export const sparkEbitda  = monthlyData.map(d => d.ebitda);
export const sparkCash    = cashProjection.slice(0, 12);
export const sparkNet     = monthlyData.map(d => d.net * 0.054);
