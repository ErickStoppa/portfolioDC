"use client";

import { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils";
import type { Employee } from "@/data/orion";
import { DEPT_CONFIG } from "../types/orion.types";
import type { RhFilter } from "../types/orion.types";

interface Props {
  employees:       Employee[];
  allEmployees:    Employee[];
  rhFilter:        RhFilter;
  rhSearch:        string;
  onRhFilterChange:(f: RhFilter) => void;
  onRhSearchChange:(s: string) => void;
}

const STATUS_CFG = {
  ativo:    { label: "Ativo",    color: "text-green-400", bg: "bg-green-400/10"  },
  ferias:   { label: "Férias",   color: "text-sky-400",   bg: "bg-sky-400/10"    },
  afastado: { label: "Afastado", color: "text-amber-400", bg: "bg-amber-400/10"  },
} as const;

const TODAY = new Date("2026-05-17");

function yearsOfService(admissionDate: string): string {
  const start = new Date(admissionDate);
  let y = TODAY.getFullYear() - start.getFullYear();
  if (
    TODAY.getMonth() < start.getMonth() ||
    (TODAY.getMonth() === start.getMonth() && TODAY.getDate() < start.getDate())
  ) y--;
  return `${y}a`;
}

const RH_FILTERS: { id: RhFilter; label: string }[] = [
  { id: "todos",      label: "Todos"      },
  { id: "diretoria",  label: "Diretoria"  },
  { id: "financeiro", label: "Financeiro" },
  { id: "tecnologia", label: "Tecnologia" },
  { id: "operacoes",  label: "Operações"  },
  { id: "comercial",  label: "Comercial"  },
  { id: "logistica",  label: "Logística"  },
  { id: "rh",         label: "RH"         },
];

export default function PessoasTab({
  employees, allEmployees, rhFilter, rhSearch, onRhFilterChange, onRhSearchChange,
}: Props) {
  const [revealedId, setRevealedId] = useState<string | null>(null);

  // ── KPIs ──────────────────────────────────────────────────────────────────
  const activeCount   = allEmployees.filter(e => e.status === "ativo").length;
  const feriasCount   = allEmployees.filter(e => e.status === "ferias").length;
  const folhaBruta    = allEmployees.filter(e => e.status === "ativo").reduce((s, e) => s + e.salary, 0);
  const totalCost     = allEmployees.reduce((s, e) => s + e.salary + e.benefits, 0);
  const avgPerf       = allEmployees.reduce((s, e) => s + e.performance, 0) / allEmployees.length;

  // ── Dept stats ────────────────────────────────────────────────────────────
  const deptKeys = Object.keys(DEPT_CONFIG) as Array<keyof typeof DEPT_CONFIG>;
  const deptStats = useMemo(() => deptKeys.map(dept => ({
    dept,
    count:   allEmployees.filter(e => e.dept === dept).length,
    payroll: allEmployees.filter(e => e.dept === dept).reduce((s, e) => s + e.salary, 0),
    avgPerf: allEmployees.filter(e => e.dept === dept).length > 0
      ? allEmployees.filter(e => e.dept === dept).reduce((s, e) => s + e.performance, 0)
        / allEmployees.filter(e => e.dept === dept).length
      : 0,
    cfg: DEPT_CONFIG[dept],
  })).filter(d => d.count > 0), [allEmployees]);

  // Payroll summary
  const encargos    = folhaBruta * 0.68;
  const beneficios  = allEmployees.reduce((s, e) => s + e.benefits, 0);
  const totalFolha  = folhaBruta + encargos + beneficios;
  const costPerHead = totalFolha / (allEmployees.length || 1);

  return (
    <div className="p-3 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold text-[#cbd5e1]">Pessoas & RH</h2>
          <p className="text-xs mt-0.5 text-[#475569]">
            {allEmployees.length} colaboradores · folha {formatCurrency(folhaBruta)}/mês
          </p>
        </div>

        {/* SEÇÃO 1: 4 KPIs */}
        <div className="flex items-center gap-6 flex-wrap">
          {[
            { label: "Headcount Ativo", val: `${activeCount} (${feriasCount} férias)`, color: "#6366f1" },
            { label: "Folha/Mês",       val: formatCurrency(folhaBruta),                color: "#22c55e" },
            { label: "Custo Total",     val: formatCurrency(totalCost),                  color: "#38bdf8" },
            { label: "Perf. Média",     val: `${avgPerf.toFixed(1)}%`,                  color: "#a78bfa" },
          ].map(({ label, val, color }) => (
            <div key={label} className="text-right">
              <p className="text-[9px] uppercase tracking-wider mb-0.5 text-[#475569]">{label}</p>
              <p className="text-sm font-bold font-mono tabular-nums" style={{ color }}>{val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SEÇÃO 2: Dept cards (grid-cols-7, compact) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {deptStats.map(({ dept, count, payroll, avgPerf: dp, cfg }) => (
          <button
            key={dept}
            onClick={() => onRhFilterChange(rhFilter === dept ? "todos" : dept as RhFilter)}
            className="orion-card p-3 text-left transition-colors hover:border-indigo-500/30"
            style={{
              borderColor: rhFilter === dept ? "rgba(99,102,241,0.3)" : undefined,
              borderWidth: rhFilter === dept ? 1 : undefined,
              borderStyle: rhFilter === dept ? "solid" : undefined,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                {cfg.label}
              </span>
              <span className="text-xs font-bold font-mono text-[#cbd5e1]">{count}</span>
            </div>
            <div className="mb-2">
              <p className="text-[9px] text-[#475569] mb-0.5">Folha</p>
              <p className="text-[10px] font-mono text-[#94a3b8]">{formatCurrency(payroll)}</p>
            </div>
            <div>
              <div className="flex items-center justify-between text-[9px] mb-0.5">
                <span className="text-[#334155]">Perf.</span>
                <span className="font-mono text-[#475569]">{dp.toFixed(0)}%</span>
              </div>
              <div className="h-1 rounded-full bg-[#1a2540]">
                <div className="h-full rounded-full"
                  style={{
                    width: `${dp}%`,
                    backgroundColor: dp >= 80 ? "#22c55e" : dp >= 65 ? "#f59e0b" : "#f43f5e",
                  }} />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* SEÇÃO 3: Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <input
          value={rhSearch}
          onChange={e => onRhSearchChange(e.target.value)}
          placeholder="Buscar nome ou cargo..."
          className="orion-input h-8 px-3 text-xs"
          style={{ width: 200 }}
        />
        <div className="flex items-center gap-1 flex-wrap">
          {RH_FILTERS.map(f => (
            <button key={f.id} onClick={() => onRhFilterChange(f.id)}
              className={`orion-pill-filter ${rhFilter === f.id ? "orion-pill-active" : ""}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* SEÇÃO 4: Employee table */}
      <div className="orion-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ minWidth: 360 }}>
            <thead>
              <tr className="border-b border-[#1a2540]">
                {[
                  { label: "Colaborador" },
                  { label: "Cargo",        cls: "hidden sm:table-cell" },
                  { label: "Departamento", cls: "hidden md:table-cell" },
                  { label: "Status" },
                  { label: "Admissão",     cls: "hidden lg:table-cell" },
                  { label: "Salário" },
                  { label: "Performance" },
                ].map(({ label, cls }) => (
                  <th key={label} className={`px-4 py-3 text-[10px] uppercase tracking-wider font-medium text-[#475569]${cls ? ` ${cls}` : ""}`}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map(e => {
                const sCfg = STATUS_CFG[e.status];
                const dCfg = DEPT_CONFIG[e.dept];
                const perfColor = e.performance >= 80 ? "#22c55e" : e.performance >= 65 ? "#f59e0b" : "#f43f5e";
                return (
                  <tr key={e.id} className="orion-table-row">
                    {/* Avatar + Name */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex items-center justify-center rounded-full font-bold shrink-0 text-[10px]"
                          style={{ width: 32, height: 32, backgroundColor: e.avatarColor + "22", color: e.avatarColor }}
                        >
                          {e.initials}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#cbd5e1]">{e.name}</p>
                          <p className="text-[9px] text-[#334155]">{e.location}</p>
                        </div>
                      </div>
                    </td>
                    {/* Cargo */}
                    <td className="px-4 py-3 text-[10px] text-[#94a3b8] hidden sm:table-cell">{e.role}</td>
                    {/* Dept */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`orion-badge text-[9px] ${dCfg.bg} ${dCfg.color}`}>{dCfg.label}</span>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className={`orion-badge text-[9px] ${sCfg.color} ${sCfg.bg}`}>{sCfg.label}</span>
                    </td>
                    {/* Admission */}
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-[10px] font-mono text-[#475569]">
                        {e.admissionDate.split("-").reverse().join("/")}
                      </p>
                      <p className="text-[9px] text-[#334155]">{yearsOfService(e.admissionDate)}</p>
                    </td>
                    {/* Salary (hover to reveal) */}
                    <td
                      className="px-4 py-3 cursor-pointer"
                      title="Passe o mouse para ver"
                      onMouseEnter={() => setRevealedId(e.id)}
                      onMouseLeave={() => setRevealedId(null)}
                    >
                      <span className="text-[10px] font-mono font-semibold tabular-nums text-[#6366f1]">
                        {revealedId === e.id ? formatCurrency(e.salary) : "R$ ••••"}
                      </span>
                    </td>
                    {/* Performance */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 rounded-full overflow-hidden bg-[#1a2540]">
                          <div className="h-full rounded-full" style={{ width: `${e.performance}%`, backgroundColor: perfColor }} />
                        </div>
                        <span className="text-[10px] font-mono tabular-nums" style={{ color: perfColor }}>
                          {e.performance}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {employees.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-[#475569]">Nenhum colaborador encontrado</p>
          </div>
        )}

        <div className="px-5 py-3 border-t border-[#1a2540] text-[10px] text-[#475569]">
          {employees.length} colaboradores exibidos de {allEmployees.length}
        </div>
      </div>

      {/* SEÇÃO 5: Payroll summary */}
      <div className="orion-card p-5">
        <h3 className="text-sm font-semibold text-[#cbd5e1] mb-4">Demonstrativo de Folha — Mai/2026</h3>

        <div className="grid grid-cols-3 gap-6">
          {[
            { label: "Salários Brutos",     val: folhaBruta,  color: "#6366f1"  },
            { label: "Encargos (68%)*",      val: encargos,   color: "#f59e0b"  },
            { label: "Benefícios",           val: beneficios, color: "#38bdf8"  },
          ].map(({ label, val, color }) => (
            <div key={label}>
              <p className="text-[10px] uppercase tracking-wider text-[#475569] mb-1">{label}</p>
              <p className="text-base font-bold font-mono tabular-nums" style={{ color }}>{formatCurrency(val)}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-[#1a2540] grid grid-cols-3 gap-6">
          {/* Total highlighted */}
          <div className="col-span-1">
            <p className="text-[10px] uppercase tracking-wider text-[#475569] mb-1">Total Folha + Encargos</p>
            <p className="text-2xl font-bold font-mono tabular-nums text-white">{formatCurrency(totalFolha)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#475569] mb-1">Horas Extras</p>
            <p className="text-base font-bold font-mono tabular-nums text-[#a78bfa]">
              {formatCurrency(allEmployees.reduce((s, e) => s + e.hoursMonth * 22, 0))}
            </p>
            <p className="text-[9px] text-[#334155] mt-0.5">estimado</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#475569] mb-1">Custo/Colaborador</p>
            <p className="text-base font-bold font-mono tabular-nums text-[#22c55e]">
              {formatCurrency(costPerHead)}
            </p>
          </div>
        </div>

        <p className="text-[9px] text-[#334155] mt-4 italic">
          * Encargos estimados (68% sobre salário bruto). Consulte o Departamento Pessoal para valores exatos.
        </p>
      </div>
    </div>
  );
}
