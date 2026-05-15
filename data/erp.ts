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
  { label: "Total Revenue", value: "$2.84M", change: "+18.2%", positive: true, prefix: "YTD" },
  { label: "Net Profit", value: "$640K", change: "+12.4%", positive: true, prefix: "YTD" },
  { label: "Operating Expenses", value: "$1.18M", change: "+5.1%", positive: false, prefix: "YTD" },
  { label: "Cash Flow", value: "$420K", change: "+24.7%", positive: true, prefix: "Current" },
];

export const chartData: ChartDataPoint[] = [
  { month: "Jan", revenue: 380000, expenses: 210000, profit: 170000 },
  { month: "Feb", revenue: 420000, expenses: 195000, profit: 225000 },
  { month: "Mar", revenue: 390000, expenses: 220000, profit: 170000 },
  { month: "Apr", revenue: 480000, expenses: 235000, profit: 245000 },
  { month: "May", revenue: 510000, expenses: 190000, profit: 320000 },
  { month: "Jun", revenue: 660000, expenses: 280000, profit: 380000 },
];

export const transactions: Transaction[] = [
  { id: "t1", description: "Meridian Health — Enterprise License Q2", category: "Revenue", amount: 84000, type: "income", date: "Jun 12, 2024", status: "completed" },
  { id: "t2", description: "AWS Infrastructure — Monthly", category: "Infrastructure", amount: 12400, type: "expense", date: "Jun 10, 2024", status: "completed" },
  { id: "t3", description: "Orbital Systems — Professional Services", category: "Revenue", amount: 45000, type: "income", date: "Jun 8, 2024", status: "completed" },
  { id: "t4", description: "Team Payroll — June", category: "Payroll", amount: 78000, type: "expense", date: "Jun 7, 2024", status: "completed" },
  { id: "t5", description: "Vanta Finance — Annual Renewal", category: "Revenue", amount: 230000, type: "income", date: "Jun 5, 2024", status: "pending" },
  { id: "t6", description: "Office & Facilities — Q2", category: "Operations", amount: 8500, type: "expense", date: "Jun 3, 2024", status: "completed" },
  { id: "t7", description: "CloudPath — Implementation Fee", category: "Revenue", amount: 22000, type: "income", date: "Jun 1, 2024", status: "completed" },
  { id: "t8", description: "Marketing & Advertising — June", category: "Marketing", amount: 14000, type: "expense", date: "May 30, 2024", status: "failed" },
];

export const goals = [
  { label: "Annual Revenue", current: 2840000, target: 5000000 },
  { label: "New Customers", current: 34, target: 50 },
  { label: "Gross Margin", current: 67, target: 75, suffix: "%" },
];
