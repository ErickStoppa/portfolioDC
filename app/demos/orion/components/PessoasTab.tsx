"use client";

import type { Employee } from "@/data/orion";
import { employees } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import { DEPT_CONFIG } from "../types/orion.types";
import type { RhFilter } from "../types/orion.types";

interface PessoasTabProps {
  filteredEmployees: Employee[];
  rhFilter:   RhFilter;
  onRhFilter: (f: RhFilter) => void;
  rhSearch:   string;
  onRhSearch: (s: string) => void;
}

const STATUS_CFG = {
  ativo:     { label: "Ativo",     color: "text-green-400", bg: "bg-green-400/10"  },
  ferias:    { label: "Férias",    color: "text-sky-400",   bg: "bg-sky-400/10"    },
  afastado:  { label: "Afastado",  color: "text-amber-400", bg: "bg-amber-400/10"  },
} as const;

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

export default function PessoasTab({ filteredEmployees, rhFilter, onRhFilter, rhSearch, onRhSearch }: PessoasTabProps) {
  const totalPayroll = employees.reduce((s, e) => s + e.salary + e.benefits, 0);
  const totalActive  = employees.filter(e => e.status === "ativo").length;

  // Dept breakdown from full list
  const deptKeys = Object.keys(DEPT_CONFIG) as Array<keyof typeof DEPT_CONFIG>;
  const deptStats = deptKeys.map(dept => ({
    dept,
    count:   employees.filter(e => e.dept === dept).length,
    payroll: employees.filter(e => e.dept === dept).reduce((s, e) => s + e.salary + e.benefits, 0),
    cfg:     DEPT_CONFIG[dept],
  })).filter(d => d.count > 0);

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold text-[#cbd5e1]">Pessoas & RH</h2>
          <p className="text-xs mt-0.5 text-[#475569]">
            {employees.length} colaboradores · folha {formatCurrency(totalPayroll)}/mês
          </p>
        </div>
        <div className="flex items-center gap-6">
          {[
            { label: "Headcount", value: employees.length.toString(),              color: "#6366f1" },
            { label: "Ativos",    value: totalActive.toString(),                   color: "#22c55e" },
            { label: "Folha/Mês", value: formatCurrency(totalPayroll),             color: "#38bdf8" },
            { label: "Ticket Médio", value: formatCurrency(totalPayroll / employees.length), color: "#a78bfa" },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-right">
              <p className="text-[10px] uppercase tracking-wider mb-0.5 text-[#475569]">{label}</p>
              <p className="text-base font-bold font-mono" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dept breakdown */}
      <div className="orion-card overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1a2540]">
          <h3 className="text-sm font-semibold text-[#cbd5e1]">Headcount por Departamento</h3>
        </div>
        <div className="p-5 space-y-3">
          {deptStats.map(({ dept, count, payroll, cfg }) => {
            const pct = (count / employees.length) * 100;
            return (
              <div key={dept}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="font-mono text-[10px] text-[#475569]">{formatCurrency(payroll)}/mês</span>
                    <span className="font-mono font-semibold w-5 text-right text-[11px]" style={{ color: cfg.color.replace("text-","").includes("-") ? undefined : undefined }}>
                      {count}
                    </span>
                    <span className="font-mono text-[10px] w-8 text-right text-[#475569]">
                      {pct.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden bg-[#1a2540]">
                  <div className={`h-full rounded-full ${cfg.color.replace("text-", "bg-").replace(/\d+$/, v => String(Math.min(parseInt(v), 500)))}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Employee list */}
      <div className="orion-card overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1a2540] flex-wrap">
          <h3 className="text-sm font-semibold text-[#cbd5e1] flex-1">Colaboradores</h3>
          <input
            value={rhSearch}
            onChange={e => onRhSearch(e.target.value)}
            placeholder="Buscar nome ou cargo..."
            className="orion-input h-7 px-3 text-xs"
            style={{ width: "200px" }}
          />
          <div className="flex items-center gap-1 flex-wrap">
            {RH_FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => onRhFilter(f.id)}
                className={`orion-pill-filter ${rhFilter === f.id ? "orion-pill-active" : ""}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ minWidth: 680 }}>
            <thead>
              <tr className="border-b border-[#1a2540]">
                {["Colaborador","Departamento","Cargo","Admissão","Salário","Perf.","Status"].map(col => (
                  <th key={col} className="px-4 py-3 text-[10px] uppercase tracking-wider font-medium text-[#475569]">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(e => {
                const sCfg = STATUS_CFG[e.status];
                const dCfg = DEPT_CONFIG[e.dept];
                return (
                  <tr key={e.id} className="orion-table-row">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="flex items-center justify-center rounded-full font-bold shrink-0 text-[10px]"
                          style={{
                            backgroundColor: e.avatarColor + "22",
                            color: e.avatarColor,
                            width: "2rem",
                            height: "2rem",
                          }}
                        >
                          {e.initials}
                        </div>
                        <span className="text-xs font-medium text-[#cbd5e1]">{e.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`orion-badge text-[9px] ${dCfg.bg} ${dCfg.color}`}>{dCfg.label}</span>
                    </td>
                    <td className="px-4 py-3 text-[10px] text-[#94a3b8]">{e.role}</td>
                    <td className="px-4 py-3 text-[10px] font-mono text-[#475569]">
                      {e.admissionDate.split("-").reverse().join("/")}
                    </td>
                    <td className="px-4 py-3 text-[10px] font-mono font-semibold text-[#6366f1]">
                      {formatCurrency(e.salary)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-12 rounded-full overflow-hidden bg-[#1a2540]">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${e.performance}%`,
                              backgroundColor: e.performance >= 80 ? "#22c55e" : e.performance >= 60 ? "#f59e0b" : "#f43f5e",
                            }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-[#475569]">{e.performance}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`orion-badge text-[10px] ${sCfg.color} ${sCfg.bg}`}>{sCfg.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-sm text-[#475569]">Nenhum colaborador encontrado</p>
          </div>
        )}

        <div className="px-5 py-3 border-t border-[#1a2540] text-[10px] text-[#475569]">
          {filteredEmployees.length} colaboradores exibidos
        </div>
      </div>
    </div>
  );
}
