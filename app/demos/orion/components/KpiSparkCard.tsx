"use client";

import { type ComponentType } from "react";
import * as LucideIcons from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ACCENT_HEX: Record<string, string> = {
  green:  "#22c55e",
  red:    "#f43f5e",
  indigo: "#6366f1",
  amber:  "#f59e0b",
  sky:    "#38bdf8",
  violet: "#8b5cf6",
};

interface KpiSparkCardProps {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
  trendGood: boolean;
  sparkline: number[];
  icon: string;
  accentColor: "green" | "red" | "indigo" | "amber" | "sky" | "violet";
  subtitle?: string;
  onClick?: () => void;
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const n = data.length;
  const pts = data.map((v, i) => {
    const x = ((i / (n - 1)) * 78 + 1).toFixed(1);
    const y = (30 - ((v - min) / range) * 28).toFixed(1);
    return `${x},${y}`;
  });
  const poly = pts.join(" ");
  const area = `M ${pts[0]} ${pts.slice(1).map(p => `L ${p}`).join(" ")} L 80,32 L 0,32 Z`;
  return (
    <svg viewBox="0 0 80 32" width="80" height="32">
      <path d={area} fill={color} fillOpacity="0.08" />
      <polyline points={poly} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function KpiSparkCard({
  title, value, change, trend, trendGood, sparkline,
  icon, accentColor, subtitle, onClick,
}: KpiSparkCardProps) {
  const Icon = (LucideIcons as unknown as Record<string, ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>>)[icon];
  const hex = ACCENT_HEX[accentColor];

  const isGood = (trendGood && trend === "up") || (!trendGood && trend === "down");
  const isBad  = (trendGood && trend === "down") || (!trendGood && trend === "up");
  const pillColor = isGood ? "#22c55e" : isBad ? "#f43f5e" : "#94a3b8";
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "orion-card orion-card-hover p-5 relative overflow-hidden",
        onClick && "cursor-pointer",
      )}
    >
      {/* Bg radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at 90% 110%, ${hex}0d 0%, transparent 60%)` }}
      />

      {/* Row 1 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg" style={{ backgroundColor: hex + "22" }}>
            {Icon && <Icon size={14} className="" style={{ color: hex } as React.CSSProperties} />}
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#475569] font-medium">{title}</span>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex items-end justify-between gap-2">
        <p className="text-[26px] font-bold text-white tabular-nums leading-none">{value}</p>
        <span className="hidden sm:block shrink-0">
          <Sparkline data={sparkline} color={hex} />
        </span>
      </div>

      {/* Row 3 */}
      <div className="flex items-center gap-2 mt-2.5">
        <span
          className="flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.5 rounded-full"
          style={{ backgroundColor: pillColor + "22", color: pillColor }}
        >
          <TrendIcon size={10} />
          {change > 0 ? "+" : ""}{change.toFixed(1)}%
        </span>
        {subtitle && <span className="text-[11px] text-[#475569]">{subtitle}</span>}
      </div>
    </motion.div>
  );
}
