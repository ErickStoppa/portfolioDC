"use client";

import { motion } from "framer-motion";
import type { BankAccount } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";

export default function BankCard({ account }: { account: BankAccount }) {
  const delta7d  = account.projection7d - account.balance;
  const deltaPos = delta7d >= 0;

  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.98 }}
      className="orion-card p-5 cursor-default"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-bold text-[#cbd5e1]">{account.bank}</p>
          <p className="text-[10px] mt-0.5 text-[#475569] capitalize">{account.type}</p>
        </div>
        <div
          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: account.color + "22", color: account.color }}
        >
          {account.currency}
        </div>
      </div>

      {/* Balance */}
      <div className="mb-4">
        <p className="text-[10px] uppercase tracking-wider mb-1 text-[#475569]">Saldo Disponível</p>
        <p className="text-2xl font-bold font-mono" style={{ color: account.color }}>
          {formatCurrency(account.available)}
        </p>
        <p className="text-[10px] font-mono mt-1" style={{ color: deltaPos ? "#22c55e" : "#f43f5e" }}>
          {deltaPos ? "+" : ""}{formatCurrency(Math.abs(delta7d))} projeção 7d
        </p>
      </div>

      {/* Account details */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#1a2540] text-[10px]">
        <div>
          <p className="text-[#475569]">Agência</p>
          <p className="font-mono mt-0.5 text-[#94a3b8]">{account.agency}</p>
        </div>
        <div>
          <p className="text-[#475569]">Conta</p>
          <p className="font-mono mt-0.5 text-[#94a3b8]">{account.account}</p>
        </div>
        <div className="col-span-2">
          <p className="text-[#475569]">Última sinc.</p>
          <p className="font-mono mt-0.5 text-[#94a3b8]">{account.lastSync}</p>
        </div>
      </div>
    </motion.div>
  );
}
