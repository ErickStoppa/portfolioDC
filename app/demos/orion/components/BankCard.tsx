"use client";

import { motion } from "framer-motion";
import type { BankAccount } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";

export default function BankCard({ account }: { account: BankAccount }) {
  const changePos = account.change >= 0;
  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.98 }}
      className="rounded-xl border p-5 cursor-default"
      style={{ backgroundColor: "#0a1220", borderColor: "#1a2540" }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-bold" style={{ color: "#cbd5e1" }}>
            {account.bank}
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: "#475569" }}>
            {account.type}
          </p>
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
        <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "#475569" }}>
          Saldo Disponível
        </p>
        <p className="text-2xl font-bold font-mono" style={{ color: account.color }}>
          {formatCurrency(account.balance)}
        </p>
        <p
          className="text-[10px] font-mono mt-1"
          style={{ color: changePos ? "#22c55e" : "#f43f5e" }}
        >
          {changePos ? "+" : ""}{formatCurrency(account.change)} hoje
        </p>
      </div>

      {/* Account details */}
      <div
        className="grid grid-cols-2 gap-3 pt-4 border-t text-[10px]"
        style={{ borderColor: "#1a2540" }}
      >
        <div>
          <p style={{ color: "#475569" }}>Agência</p>
          <p className="font-mono mt-0.5" style={{ color: "#94a3b8" }}>{account.agency}</p>
        </div>
        <div>
          <p style={{ color: "#475569" }}>Conta</p>
          <p className="font-mono mt-0.5" style={{ color: "#94a3b8" }}>{account.account}</p>
        </div>
      </div>
    </motion.div>
  );
}
