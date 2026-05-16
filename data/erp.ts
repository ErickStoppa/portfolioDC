export interface KpiCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  prefix?: string;
}

export interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  status: "completed" | "pending" | "failed";
}

export interface ChartDataPoint {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export const kpis: KpiCard[] = [
  { label: "Receita Total", value: "R$14,2mi", change: "+18,2%", positive: true, prefix: "Acumulado" },
  { label: "Lucro Líquido", value: "R$3,2mi", change: "+12,4%", positive: true, prefix: "Acumulado" },
  { label: "Despesas Operacionais", value: "R$5,9mi", change: "+5,1%", positive: false, prefix: "Acumulado" },
  { label: "Fluxo de Caixa", value: "R$2,1mi", change: "+24,7%", positive: true, prefix: "Atual" },
];

export const chartData: ChartDataPoint[] = [
  { month: "Jan", revenue: 1900000, expenses: 1050000, profit: 850000 },
  { month: "Fev", revenue: 2100000, expenses: 975000, profit: 1125000 },
  { month: "Mar", revenue: 1950000, expenses: 1100000, profit: 850000 },
  { month: "Abr", revenue: 2400000, expenses: 1175000, profit: 1225000 },
  { month: "Mai", revenue: 2550000, expenses: 950000, profit: 1600000 },
  { month: "Jun", revenue: 3300000, expenses: 1400000, profit: 1900000 },
];

export const transactions: Transaction[] = [
  { id: "t1", description: "Meridian Health — Licença Enterprise T2", category: "Receita", amount: 420000, type: "income", date: "12 jun 2024", status: "completed" },
  { id: "t2", description: "AWS Infraestrutura — Mensal", category: "Infraestrutura", amount: 62000, type: "expense", date: "10 jun 2024", status: "completed" },
  { id: "t3", description: "Orbital Systems — Serviços Profissionais", category: "Receita", amount: 225000, type: "income", date: "8 jun 2024", status: "completed" },
  { id: "t4", description: "Folha de Pagamento — Junho", category: "Folha de Pagamento", amount: 390000, type: "expense", date: "7 jun 2024", status: "completed" },
  { id: "t5", description: "Vanta Finance — Renovação Anual", category: "Receita", amount: 1150000, type: "income", date: "5 jun 2024", status: "pending" },
  { id: "t6", description: "Escritório & Instalações — T2", category: "Operações", amount: 42500, type: "expense", date: "3 jun 2024", status: "completed" },
  { id: "t7", description: "CloudPath — Taxa de Implementação", category: "Receita", amount: 110000, type: "income", date: "1 jun 2024", status: "completed" },
  { id: "t8", description: "Marketing & Publicidade — Junho", category: "Marketing", amount: 70000, type: "expense", date: "30 mai 2024", status: "failed" },
];

export const goals = [
  { label: "Receita Anual", current: 14200000, target: 25000000 },
  { label: "Novos Clientes", current: 34, target: 50 },
  { label: "Margem Bruta", current: 67, target: 75, suffix: "%" },
];
