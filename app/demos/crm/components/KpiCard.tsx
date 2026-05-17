"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Sparkline } from "./Sparkline";

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  changePositive: boolean;
  subtitle: string;
  sparkData: number[];
  sparkColor: string;
  icon: string;
  onClick?: () => void;
}

export function KpiCard({
  title, value, change, changePositive, subtitle,
  sparkData, sparkColor, icon, onClick,
}: KpiCardProps) {
  const TrendIcon = changePositive ? TrendingUp : TrendingDown;
  const trendColor = changePositive ? "#10b981" : "#f43f5e";
  const trendBg = changePositive ? "rgba(16,185,129,0.1)" : "rgba(244,63,94,0.1)";
  const IconComp = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[icon];

  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-xl bg-[#0c1220] border border-[rgba(255,255,255,0.06)] kpi-card flex flex-col gap-3 ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {IconComp && <IconComp className="w-[18px] h-[18px] text-[#475569]" />}
          <p className="text-xs text-[#64748b] uppercase tracking-wider">{title}</p>
        </div>
        <Sparkline data={sparkData} color={sparkColor} width={72} height={28} />
      </div>
      <p className="text-2xl font-bold text-[#f1f5f9] leading-none">{value}</p>
      <div className="flex items-center gap-2">
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{ color: trendColor, backgroundColor: trendBg }}
        >
          <TrendIcon className="w-3 h-3" />
          {change}
        </span>
        <span className="text-[11px] text-[#475569]">{subtitle}</span>
      </div>
    </div>
  );
}
