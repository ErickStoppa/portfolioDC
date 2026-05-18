"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import type { FxRate } from "@/data/orion";

interface Props { rates: FxRate[] }

// 24-hour USD/BRL decorative sparkline
const USD_SPARK = [5.41,5.42,5.40,5.43,5.44,5.42,5.45,5.46,5.44,5.43,5.45,5.47,5.48,5.46,5.47,5.49,5.48,5.47,5.49,5.50,5.49,5.48,5.49,5.47];
const SPARK_MIN = Math.min(...USD_SPARK);
const SPARK_MAX = Math.max(...USD_SPARK);

const FLAG: Record<string, string> = {
  "USD/BRL": "🇺🇸",
  "EUR/BRL": "🇪🇺",
  "GBP/BRL": "🇬🇧",
};

function toSy(v: number): number {
  return 36 - ((v - SPARK_MIN) / (SPARK_MAX - SPARK_MIN)) * 30;
}

export default function FxWidget({ rates }: Props) {
  const [showConverter, setShowConverter] = useState(false);
  const [converterAmount, setConverterAmount] = useState("1000");
  const [converterPair, setConverterPair] = useState(rates[0]?.pair ?? "USD/BRL");

  const selectedRate = rates.find(r => r.pair === converterPair);
  const brlResult = selectedRate
    ? (parseFloat(converterAmount) || 0) * selectedRate.rate
    : 0;

  const sparkPts = USD_SPARK
    .map((v, i) => `${(i / (USD_SPARK.length - 1)) * 120},${toSy(v).toFixed(1)}`)
    .join(" ");

  return (
    <div className="orion-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a2540]">
        <div>
          <h3 className="text-sm font-semibold text-[#cbd5e1]">Câmbio ao Vivo</h3>
          <p className="text-[10px] mt-0.5 text-[#475569]">PTAX BCB · atualizado {rates[0]?.updatedAt}</p>
        </div>
        <RefreshCw size={12} className="text-[#334155]" />
      </div>

      {/* USD/BRL mini chart */}
      <div className="px-5 pt-3 pb-1">
        <div className="flex items-end justify-between mb-1">
          <span className="text-[9px] text-[#334155] uppercase tracking-wider">USD/BRL 24h</span>
          <span className="text-[9px] font-mono text-[#475569]">
            {SPARK_MIN.toFixed(2)} — {SPARK_MAX.toFixed(2)}
          </span>
        </div>
        <svg viewBox="0 0 120 36" width="100%" height="36" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            points={`0,${toSy(USD_SPARK[0])} ${sparkPts} 120,${toSy(USD_SPARK[USD_SPARK.length - 1])} 120,36 0,36`}
            fill="url(#sparkGrad)"
          />
          <polyline points={sparkPts} fill="none" stroke="#6366f1" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Rates */}
      <div className="divide-y divide-[#1a2540]">
        {rates.map(fx => {
          const pos = fx.change24h >= 0;
          return (
            <div key={fx.pair} className="px-5 py-3.5 flex items-center gap-3">
              <span className="text-xl shrink-0">{FLAG[fx.pair] ?? "🌍"}</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#cbd5e1]">{fx.pair}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-mono text-[#475569]">
                    H {fx.high24h.toFixed(4)}
                  </span>
                  <span className="text-[9px] text-[#1a2540]">·</span>
                  <span className="text-[10px] font-mono text-[#475569]">
                    L {fx.low24h.toFixed(4)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold font-mono text-white tabular-nums">
                  R$ {fx.rate.toFixed(4)}
                </p>
                <div className="flex items-center justify-end gap-1 mt-0.5">
                  {pos
                    ? <TrendingUp size={10} className="text-[#f43f5e]" />
                    : <TrendingDown size={10} className="text-[#22c55e]" />}
                  <span className="text-[10px] font-mono tabular-nums" style={{ color: pos ? "#f43f5e" : "#22c55e" }}>
                    {pos ? "+" : ""}{fx.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Converter toggle */}
      <div className="px-5 py-3 border-t border-[#1a2540]">
        <button
          onClick={() => setShowConverter(c => !c)}
          className="text-[10px] font-medium text-[#6366f1] hover:text-indigo-300 transition-colors"
        >
          {showConverter ? "✕ Fechar conversor" : "⇄ Simular conversão"}
        </button>

        {showConverter && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2">
              <select
                value={converterPair}
                onChange={e => setConverterPair(e.target.value)}
                className="orion-input h-7 px-2 text-xs flex-1"
              >
                {rates.map(r => (
                  <option key={r.pair} value={r.pair}>{r.pair}</option>
                ))}
              </select>
              <input
                type="number"
                value={converterAmount}
                onChange={e => setConverterAmount(e.target.value)}
                className="orion-input h-7 px-2 text-xs w-24 font-mono"
                placeholder="Valor"
              />
            </div>
            <div className="flex items-center justify-between bg-[#0d1628] rounded-lg px-3 py-2">
              <span className="text-[10px] text-[#475569]">
                {converterAmount || "0"} {converterPair.split("/")[0]}
              </span>
              <span className="text-xs font-mono font-bold text-[#22c55e]">
                = R$ {brlResult.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
