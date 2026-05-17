"use client";

import { monthlyData } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";

export default function BudgetVsActual() {
  const maxVal = Math.max(...monthlyData.flatMap((d) => [d.gross, d.budget]));

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ backgroundColor: "#0a1220", borderColor: "#1a2540" }}
    >
      <div className="px-5 py-4 border-b" style={{ borderColor: "#1a2540" }}>
        <h3 className="text-sm font-semibold" style={{ color: "#cbd5e1" }}>
          Realizado vs. Orçado
        </h3>
        <p className="text-[10px] mt-0.5" style={{ color: "#475569" }}>
          Receita Bruta vs. Budget — Jun/24–Mai/25
        </p>
      </div>

      <div className="p-5 space-y-2.5">
        {/* Column headers */}
        <div
          className="grid text-[10px] uppercase tracking-wider pb-2 border-b"
          style={{
            gridTemplateColumns: "5rem 1fr 90px 90px 60px",
            color: "#475569",
            borderColor: "#1a2540",
          }}
        >
          <span>Mês</span>
          <span>Realizado vs. Budget</span>
          <span className="text-right">Realizado</span>
          <span className="text-right">Budget</span>
          <span className="text-right">Δ%</span>
        </div>

        {monthlyData.map((d) => {
          const actualPct = (d.gross / maxVal) * 100;
          const budgetPct = (d.budget / maxVal) * 100;
          const delta = ((d.gross - d.budget) / d.budget) * 100;
          const deltaPos = delta >= 0;
          const isLastMonth = d.month === "Mai/25";

          return (
            <div
              key={d.month}
              className="grid items-center gap-2"
              style={{ gridTemplateColumns: "5rem 1fr 90px 90px 60px" }}
            >
              <span
                className="text-[10px]"
                style={{ color: isLastMonth ? "#cbd5e1" : "#475569", fontWeight: isLastMonth ? 600 : 400 }}
              >
                {d.month}
              </span>

              {/* Dual bar */}
              <div className="space-y-0.5">
                <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#1a2540" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${actualPct}%`, backgroundColor: deltaPos ? "#22c55e" : "#f43f5e" }}
                  />
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#1a2540" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${budgetPct}%`, backgroundColor: "#334155" }}
                  />
                </div>
              </div>

              <span
                className="text-right text-[10px] font-mono"
                style={{ color: isLastMonth ? "#cbd5e1" : "#475569" }}
              >
                {formatCurrency(d.gross)}
              </span>
              <span
                className="text-right text-[10px] font-mono"
                style={{ color: "#334155" }}
              >
                {formatCurrency(d.budget)}
              </span>
              <span
                className="text-right text-[10px] font-mono font-semibold"
                style={{ color: deltaPos ? "#22c55e" : "#f43f5e" }}
              >
                {deltaPos ? "+" : ""}{delta.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Summary footer */}
      <div
        className="flex items-center justify-between px-5 py-3 border-t text-[10px]"
        style={{ borderColor: "#1a2540" }}
      >
        <div className="flex items-center gap-4">
          {[
            { color: "#22c55e", label: "Acima do budget" },
            { color: "#334155", label: "Budget" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              <span style={{ color: "#475569" }}>{label}</span>
            </div>
          ))}
        </div>
        <span style={{ color: "#475569" }}>
          Média:{" "}
          <span className="font-mono" style={{ color: "#22c55e" }}>
            +{(
              (monthlyData.reduce((s, d) => s + ((d.gross - d.budget) / d.budget) * 100, 0) /
                monthlyData.length)
            ).toFixed(1)}%
          </span>
        </span>
      </div>
    </div>
  );
}
