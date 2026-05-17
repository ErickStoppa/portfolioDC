"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { X, Mail, Phone, MapPin, CheckCircle2, Users, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import type { Client, Deal } from "@/data/crm";
import { formatBRL, activities } from "@/data/crm";
import { RISK_CONFIG, KYC_CONFIG, STATUS_CONFIG, STAGE_CONFIG, ACTIVITY_CONFIG } from "../types/crm.types";
import { StatusBadge } from "./StatusBadge";
import { useEscKey, useFocusTrap } from "../hooks/hooks";

const ICON_MAP = { Phone, Users, FileText, CheckCircle, Mail, AlertTriangle } as const;

type ModalTab = "dados" | "negocios" | "atividades";

const ARC_R = 40;
const ARC_C = Math.PI * ARC_R;

function NpsGauge({ nps }: { nps: number }) {
  const fill = (nps / 10) * ARC_C;
  const color = nps >= 9 ? "#10b981" : nps >= 7 ? "#f59e0b" : "#f43f5e";
  return (
    <svg viewBox="0 0 100 58" className="w-full h-16">
      <path d="M 10,50 A 40,40 0 0 1 90,50" fill="none" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
      <path
        d="M 10,50 A 40,40 0 0 1 90,50"
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${fill.toFixed(1)} ${ARC_C.toFixed(1)}`}
      />
      <text x="50" y="46" textAnchor="middle" fill="#f1f5f9" fontSize="16" fontWeight="700">{nps}</text>
      <text x="50" y="57" textAnchor="middle" fill="#475569" fontSize="8">/10</text>
    </svg>
  );
}

export function ClientModal({
  client, relatedDeals, onClose,
}: { client: Client; relatedDeals: Deal[]; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeModalTab, setActiveModalTab] = useState<ModalTab>("dados");
  const [simAction, setSimAction] = useState<string | null>(null);

  useEscKey(onClose);
  useFocusTrap(panelRef, true);

  const handleAction = useCallback((label: string) => {
    setSimAction(label);
    setTimeout(() => setSimAction(null), 2000);
  }, []);

  const clientActivities = activities.filter(a =>
    a.relatedTo.toLowerCase().includes(client.name.toLowerCase().split(" ").slice(0, 2).join(" ").toLowerCase())
  );

  const MODAL_TABS: { id: ModalTab; label: string }[] = [
    { id: "dados",      label: "Dados" },
    { id: "negocios",  label: "Negócios" },
    { id: "atividades", label: "Atividades" },
  ];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        ref={panelRef}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 340, damping: 38 }}
        className="fixed right-0 top-0 bottom-0 z-50 w-[480px] max-w-full bg-[#090e1b] border-l border-[rgba(255,255,255,0.06)] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={client.name}
      >
        {/* Header */}
        <div className="p-5 border-b border-[rgba(255,255,255,0.06)] shrink-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base shrink-0"
                style={{ backgroundColor: client.avatarColor + "28", color: client.avatarColor }}
              >
                {client.initials}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold text-[#f1f5f9]">{client.name}</h2>
                  <StatusBadge value={client.status} config={STATUS_CONFIG[client.status]} />
                </div>
                <p className="text-[11px] text-[#475569] mt-0.5">{client.segment} · {client.city}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#475569] hover:text-[#94a3b8] hover:bg-[rgba(255,255,255,0.06)] transition-colors shrink-0"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-[#475569] font-mono">
            {client.type} · {client.cpfCnpj}
          </p>
        </div>

        {/* Internal tabs */}
        <div className="flex border-b border-[rgba(255,255,255,0.06)] shrink-0 px-5">
          {MODAL_TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveModalTab(id)}
              className={`px-4 py-3 text-xs font-medium transition-colors border-b-2 -mb-px ${
                activeModalTab === id
                  ? "border-[#3b82f6] text-[#3b82f6]"
                  : "border-transparent text-[#475569] hover:text-[#94a3b8]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeModalTab === "dados" && (
            <>
              {/* Metrics 2x2 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
                  <p className="text-[10px] text-[#475569] uppercase tracking-wider mb-1">Portfólio Total</p>
                  <p className="text-lg font-bold text-[#f1f5f9]">{formatBRL(client.portfolioValue)}</p>
                </div>
                <div className="bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
                  <p className="text-[10px] text-[#475569] uppercase tracking-wider mb-1">Limite de Crédito</p>
                  <p className="text-lg font-bold text-[#f1f5f9]">{formatBRL(client.creditLine)}</p>
                </div>
                <div className="bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
                  <p className="text-[10px] text-[#475569] uppercase tracking-wider mb-2">NPS Score</p>
                  <NpsGauge nps={client.nps} />
                </div>
                <div className="bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
                  <p className="text-[10px] text-[#475569] uppercase tracking-wider mb-1">Receita/Mês</p>
                  <p className="text-lg font-bold text-[#f1f5f9]">{formatBRL(client.revenue)}</p>
                </div>
              </div>

              {/* Contact info */}
              <div className="bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 space-y-3">
                <p className="text-[10px] text-[#475569] uppercase tracking-wider">Contato</p>
                <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
                  <Mail className="w-3.5 h-3.5 text-[#475569] shrink-0" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
                  <Phone className="w-3.5 h-3.5 text-[#475569] shrink-0" />
                  {client.phone}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
                  <MapPin className="w-3.5 h-3.5 text-[#475569] shrink-0" />
                  {client.city}
                </div>
              </div>

              {/* Relationship */}
              <div className="bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 space-y-2.5">
                <p className="text-[10px] text-[#475569] uppercase tracking-wider">Relacionamento</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {[
                    { label: "Gerente", value: client.accountManager },
                    { label: "Último contato", value: client.lastContact },
                    { label: "Membro desde", value: client.joinedAt },
                    { label: "CPF/CNPJ", value: client.cpfCnpj },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-[10px] text-[#475569]">{label}</p>
                      <p className="text-xs text-[#94a3b8] font-mono">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-1 border-t border-[rgba(255,255,255,0.06)]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-[#475569]">KYC</span>
                    <StatusBadge value={client.kyc} config={KYC_CONFIG[client.kyc]} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-[#475569]">Risco</span>
                    <StatusBadge value={client.riskScore} config={RISK_CONFIG[client.riskScore]} />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeModalTab === "negocios" && (
            <div className="space-y-3">
              {relatedDeals.length === 0 ? (
                <p className="text-sm text-[#475569] text-center py-8">Nenhum negócio registrado</p>
              ) : (
                <>
                  {relatedDeals.map(deal => {
                    const cfg = STAGE_CONFIG[deal.stage];
                    return (
                      <div key={deal.id} className="bg-[#0c1220] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <p className="text-sm font-medium text-[#f1f5f9]">{deal.title}</p>
                          <StatusBadge value={cfg.label} config={cfg} />
                        </div>
                        <p className="text-base font-bold text-[#f1f5f9] mb-2">{formatBRL(deal.value)}</p>
                        <div className="flex items-center gap-3 text-[10px] text-[#475569]">
                          <span>Probabilidade: <span className="text-[#94a3b8]">{deal.probability}%</span></span>
                          <span>·</span>
                          <span>{deal.daysInStage} dia{deal.daysInStage !== 1 ? "s" : ""} nesta etapa</span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="text-xs text-[#475569] pt-2 border-t border-[rgba(255,255,255,0.06)]">
                    Pipeline total:{" "}
                    <span className="text-[#f1f5f9] font-semibold">
                      {formatBRL(relatedDeals.reduce((s, d) => s + d.value, 0))}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          {activeModalTab === "atividades" && (
            <div className="space-y-2">
              {clientActivities.length === 0 ? (
                <p className="text-sm text-[#475569] text-center py-8">Sem atividades registradas</p>
              ) : (
                clientActivities.map(act => {
                  const cfg = ACTIVITY_CONFIG[act.type];
                  const IconComp = ICON_MAP[cfg.icon as keyof typeof ICON_MAP];
                  return (
                    <div key={act.id} className="flex items-start gap-3 py-2 border-b border-[rgba(255,255,255,0.04)]">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: cfg.color + "18" }}
                      >
                        {IconComp && <IconComp className="w-3.5 h-3.5" style={{ color: cfg.color }} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#f1f5f9] leading-snug">
                          <span className="font-semibold">{act.actor}</span>{" "}{act.text}
                        </p>
                        <p className="text-[10px] text-[#475569] mt-0.5">{act.time}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="border-t border-[rgba(255,255,255,0.06)] p-4 flex gap-2 shrink-0">
          {[
            { label: "Enviar E-mail",       icon: "✉" },
            { label: "Registrar Contato",   icon: "📞" },
            { label: "Nova Proposta",       icon: "📄", primary: true },
          ].map(({ label, icon, primary }) => (
            <button
              key={label}
              onClick={() => handleAction(label)}
              className={`flex-1 h-9 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                primary
                  ? "bg-[#3b82f6] text-white hover:bg-[#2563eb]"
                  : "bg-transparent border border-[rgba(255,255,255,0.1)] text-[#94a3b8] hover:text-[#f1f5f9] hover:border-[rgba(255,255,255,0.2)]"
              }`}
            >
              {simAction === label ? (
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              ) : (
                <>
                  <span>{icon}</span>
                  <span className="hidden sm:inline">{label}</span>
                </>
              )}
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
