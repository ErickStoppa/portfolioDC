import type { ClientStatus, DealStage } from "@/data/crm";
import { STATUS_CONFIG, STAGE_CONFIG } from "../types/crm.types";

interface BadgeProps {
  value: string;
  config: { color: string; bg: string; dot?: string };
  size?: "xs" | "sm";
}

export function StatusBadge({ value, config, size = "xs" }: BadgeProps) {
  const px = size === "sm" ? "px-2.5 py-1" : "px-2 py-0.5";
  const text = size === "sm" ? "text-[11px]" : "text-[10px]";
  return (
    <span
      className={`inline-flex items-center ${px} ${text} font-semibold rounded-full`}
      style={{ color: config.color, backgroundColor: config.bg }}
    >
      {config.dot && (
        <span className="pulse-dot w-1.5 h-1.5 rounded-full mr-1.5" style={{ background: config.dot }} />
      )}
      {value}
    </span>
  );
}

export function ClientStatusBadge({ status }: { status: ClientStatus }) {
  return <StatusBadge value={status} config={STATUS_CONFIG[status]} />;
}

export function DealStageBadge({ stage }: { stage: DealStage }) {
  const cfg = STAGE_CONFIG[stage];
  return <StatusBadge value={cfg.label} config={cfg} />;
}
