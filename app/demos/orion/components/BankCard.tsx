"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { BankAccount } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";

interface Props {
  account:    BankAccount;
  isSelected: boolean;
  onSelect:   () => void;
}

// USD→BRL approximate rate (decorative; real rate from FxWidget)
const USD_BRL = 5.47;

const TYPE_LABEL: Record<BankAccount["type"], string> = {
  corrente:    "Corrente",
  aplicacao:   "Aplicação",
  investimento:"Investimento",
};

export default function BankCard({ account, isSelected, onSelect }: Props) {
  const delta7d  = account.projection7d  - account.balance;
  const delta30d = account.projection30d - account.balance;
  const pos7d    = delta7d  >= 0;
  const pos30d   = delta30d >= 0;
  const isUSD    = account.currency === "USD";

  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="orion-card p-5 cursor-pointer flex flex-col gap-4 transition-colors"
      style={{
        borderColor: isSelected ? "rgba(99,102,241,0.4)" : undefined,
        borderWidth: isSelected ? 1 : undefined,
        borderStyle: isSelected ? "solid" : undefined,
      }}
    >
      {/* Row 1: badge + type pill */}
      <div className="flex items-center justify-between">
        <div
          className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: account.color + "22", color: account.color }}
        >
          {account.bankCode}
        </div>
        <div className="flex items-center gap-1.5">
          {isUSD && (
            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-sky-400/10 text-sky-400">
              USD
            </span>
          )}
          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-white/[0.05] text-[#94a3b8]">
            {TYPE_LABEL[account.type]}
          </span>
        </div>
      </div>

      {/* Row 2: balance */}
      <div>
        <p className="text-[10px] uppercase tracking-wider mb-1 text-[#475569]">Saldo Disponível</p>
        {isUSD ? (
          <>
            <p className="text-xl font-bold font-mono text-sky-400 tabular-nums">
              US$ {account.available.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-[10px] font-mono mt-0.5 text-[#475569]">
              ≈ {formatCurrency(account.available * USD_BRL)}
            </p>
          </>
        ) : (
          <p className="text-xl font-bold font-mono tabular-nums" style={{ color: account.color }}>
            {formatCurrency(account.available)}
          </p>
        )}
      </div>

      {/* Row 3: sync */}
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-[#475569]">
          Disponível: {isUSD
            ? `US$ ${account.available.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}`
            : formatCurrency(account.available)}
        </span>
        <span className="text-[#334155]">Sinc. {account.lastSync}</span>
      </div>

      {/* Footer: projections */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#1a2540]">
        {[
          { label: "7 dias", val: account.projection7d, pos: pos7d, delta: delta7d },
          { label: "30 dias", val: account.projection30d, pos: pos30d, delta: delta30d },
        ].map(({ label, val, pos, delta }) => (
          <div key={label}>
            <p className="text-[9px] uppercase tracking-wider text-[#334155] mb-0.5">{label}</p>
            <div className="flex items-center gap-1">
              {pos
                ? <TrendingUp size={10} className="text-[#22c55e] shrink-0" />
                : <TrendingDown size={10} className="text-[#f43f5e] shrink-0" />
              }
              <span className="text-[10px] font-mono font-semibold tabular-nums" style={{ color: pos ? "#22c55e" : "#f43f5e" }}>
                {pos ? "+" : ""}{formatCurrency(delta)}
              </span>
            </div>
            <p className="text-[10px] font-mono text-[#475569] tabular-nums">{formatCurrency(val)}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
