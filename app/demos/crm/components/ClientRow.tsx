import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Client } from "@/data/crm";
import { formatBRL } from "@/data/crm";
import { RISK_CONFIG, KYC_CONFIG, STATUS_CONFIG } from "../types/crm.types";
import { StatusBadge } from "./StatusBadge";

export function ClientRow({ client, onSelect }: { client: Client; onSelect: (c: Client) => void }) {
  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      onClick={() => onSelect(client)}
      className="crm-row border-b border-[rgba(255,255,255,0.04)] group cursor-pointer"
    >
      {/* Cliente */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold"
            style={{ backgroundColor: client.avatarColor + "28", color: client.avatarColor }}
          >
            {client.initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#f1f5f9] truncate">{client.name}</p>
            <p className="text-[10px] text-[#475569] truncate">{client.email}</p>
          </div>
        </div>
      </td>

      {/* Segmento */}
      <td className="px-4 py-3">
        <span className="text-xs bg-[rgba(255,255,255,0.04)] text-[#94a3b8] px-2 py-0.5 rounded">
          {client.segment}
        </span>
      </td>

      {/* Portfólio */}
      <td className="px-4 py-3">
        <span className="text-sm font-mono text-[#f1f5f9] font-semibold">{formatBRL(client.portfolioValue)}</span>
      </td>

      {/* Receita/Mês */}
      <td className="px-4 py-3">
        <span className="text-xs text-[#94a3b8]">{formatBRL(client.revenue)}</span>
      </td>

      {/* Risco */}
      <td className="px-4 py-3">
        <StatusBadge value={client.riskScore} config={RISK_CONFIG[client.riskScore]} />
      </td>

      {/* KYC */}
      <td className="px-4 py-3">
        <StatusBadge value={client.kyc} config={KYC_CONFIG[client.kyc]} size="xs" />
      </td>

      {/* Gerente */}
      <td className="px-4 py-3">
        <span className="text-xs text-[#64748b]">{client.accountManager}</span>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <StatusBadge value={client.status} config={STATUS_CONFIG[client.status]} />
      </td>

      {/* Ação */}
      <td className="px-4 py-3 text-[#334155] group-hover:text-[#94a3b8] transition-colors">
        <ChevronRight className="w-4 h-4" />
      </td>
    </motion.tr>
  );
}
