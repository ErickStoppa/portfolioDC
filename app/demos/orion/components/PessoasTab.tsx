"use client";

import { useState } from "react";
import { employees, deptData } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";
import { EMPLOYEE_STATUS_CONFIG } from "../types/orion.types";

export default function PessoasTab() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("Todos");

  const depts = ["Todos", ...deptData.map((d) => d.dept)];
  const totalHeadcount = deptData.reduce((s, d) => s + d.count, 0);
  const totalPayroll = deptData.reduce((s, d) => s + d.payroll, 0);

  const visible = employees.filter((e) => {
    if (deptFilter !== "Todos" && e.dept !== deptFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: "#cbd5e1" }}>
            Pessoas & RH
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
            {totalHeadcount} colaboradores · folha {formatCurrency(totalPayroll)}/mês
          </p>
        </div>
        <div className="flex items-center gap-6">
          {[
            { label: "Headcount", value: totalHeadcount.toString(), color: "#6366f1" },
            { label: "Folha/Mês", value: formatCurrency(totalPayroll), color: "#22c55e" },
            { label: "Ticket Médio", value: formatCurrency(totalPayroll / totalHeadcount), color: "#38bdf8" },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-right">
              <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "#475569" }}>
                {label}
              </p>
              <p className="text-base font-bold font-mono" style={{ color }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Dept breakdown */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: "#0a1220", borderColor: "#1a2540" }}
      >
        <div className="px-5 py-4 border-b" style={{ borderColor: "#1a2540" }}>
          <h3 className="text-sm font-semibold" style={{ color: "#cbd5e1" }}>
            Headcount por Departamento
          </h3>
        </div>
        <div className="p-5 space-y-3">
          {deptData.map((d) => {
            const pct = (d.count / totalHeadcount) * 100;
            return (
              <div key={d.dept}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                    <span style={{ color: "#94a3b8" }}>{d.dept}</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="font-mono text-[10px]" style={{ color: "#475569" }}>
                      {formatCurrency(d.payroll)}/mês
                    </span>
                    <span className="font-mono font-semibold w-6 text-right text-[11px]" style={{ color: d.color }}>
                      {d.count}
                    </span>
                    <span className="font-mono text-[10px] w-8 text-right" style={{ color: "#475569" }}>
                      {pct.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#1a2540" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: d.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Employee list */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: "#0a1220", borderColor: "#1a2540" }}
      >
        <div
          className="flex items-center gap-3 px-5 py-4 border-b flex-wrap"
          style={{ borderColor: "#1a2540" }}
        >
          <h3 className="text-sm font-semibold flex-1" style={{ color: "#cbd5e1" }}>
            Colaboradores
          </h3>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar nome ou cargo..."
            className="h-7 px-3 rounded-lg border text-xs outline-none"
            style={{
              backgroundColor: "#080f20",
              borderColor: "#1a2540",
              color: "#cbd5e1",
              width: "200px",
            }}
          />
          <div className="flex items-center gap-1 flex-wrap">
            {depts.map((d) => (
              <button
                key={d}
                onClick={() => setDeptFilter(d)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors"
                style={{
                  backgroundColor: deptFilter === d ? "#6366f1" : "rgba(255,255,255,0.04)",
                  color: deptFilter === d ? "#fff" : "#475569",
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b" style={{ borderColor: "#1a2540" }}>
              {["Colaborador", "Departamento", "Cargo", "Admissão", "Salário", "Status"].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-[10px] uppercase tracking-wider font-medium"
                  style={{ color: "#475569" }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((e) => {
              const sCfg = EMPLOYEE_STATUS_CONFIG[e.status];
              return (
                <tr
                  key={e.id}
                  className="border-b transition-colors"
                  style={{ borderColor: "#1a2540" }}
                  onMouseEnter={(el) => {
                    (el.currentTarget as HTMLTableRowElement).style.backgroundColor = "rgba(255,255,255,0.02)";
                  }}
                  onMouseLeave={(el) => {
                    (el.currentTarget as HTMLTableRowElement).style.backgroundColor = "transparent";
                  }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex items-center justify-center rounded-full font-bold flex-shrink-0"
                        style={{
                          backgroundColor: e.avatarColor + "22",
                          color: e.avatarColor,
                          width: "2rem",
                          height: "2rem",
                          fontSize: "10px",
                        }}
                      >
                        {e.initials}
                      </div>
                      <span className="text-xs font-medium" style={{ color: "#cbd5e1" }}>
                        {e.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[10px]" style={{ color: "#94a3b8" }}>
                    {e.dept}
                  </td>
                  <td className="px-4 py-3 text-[10px]" style={{ color: "#94a3b8" }}>
                    {e.role}
                  </td>
                  <td className="px-4 py-3 text-[10px] font-mono" style={{ color: "#475569" }}>
                    {e.startDate}
                  </td>
                  <td className="px-4 py-3 text-[10px] font-mono font-semibold" style={{ color: "#6366f1" }}>
                    {formatCurrency(e.salary)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: sCfg.bg, color: sCfg.color }}
                    >
                      {sCfg.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {visible.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-sm" style={{ color: "#475569" }}>Nenhum colaborador encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
