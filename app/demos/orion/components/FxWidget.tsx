"use client";

import { fxRates } from "@/data/orion";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function FxWidget() {
  return (
    <div className="orion-card overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1a2540]">
        <h3 className="text-sm font-semibold text-[#cbd5e1]">Câmbio</h3>
        <p className="text-[10px] mt-0.5 text-[#475569]">Taxas em tempo real · base BRL</p>
      </div>

      <div className="divide-y divide-[#1a2540]">
        {fxRates.map(fx => {
          const pos = fx.change24h >= 0;
          return (
            <div key={fx.pair} className="px-5 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0d1628] border border-[#1a2540] flex items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold text-[#6366f1]">
                    {fx.pair.split("/")[0]}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#cbd5e1]">{fx.pair}</p>
                  <p className="text-[10px] text-[#475569]">atualizado {fx.updatedAt}</p>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center gap-6">
                <div className="text-center">
                  <p className="text-[9px] text-[#475569] mb-0.5">Máx 24h</p>
                  <p className="text-[11px] font-mono text-[#94a3b8]">{fx.high24h.toFixed(4)}</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-[#475569] mb-0.5">Mín 24h</p>
                  <p className="text-[11px] font-mono text-[#94a3b8]">{fx.low24h.toFixed(4)}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold font-mono text-[#cbd5e1]">
                  R$ {fx.rate.toFixed(4)}
                </p>
                <div className="flex items-center justify-end gap-1 mt-0.5">
                  {pos
                    ? <TrendingUp size={10} className="text-[#f43f5e]" />
                    : <TrendingDown size={10} className="text-[#22c55e]" />
                  }
                  <span className="text-[10px] font-mono" style={{ color: pos ? "#f43f5e" : "#22c55e" }}>
                    {pos ? "+" : ""}{fx.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FX exposure note */}
      <div className="px-5 py-3 border-t border-[#1a2540]">
        <p className="text-[10px] text-[#475569]">
          Conta Santander USD · saldo USD 84.300 · equiv. ≈{" "}
          <span className="font-mono text-[#94a3b8]">
            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(84300 * 5.47)}
          </span>
        </p>
      </div>
    </div>
  );
}
