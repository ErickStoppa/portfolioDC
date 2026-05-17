"use client";

import * as LucideIcons from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KpiSparkCardProps {
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

const Icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>>;

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 72;
  const h = 28;
  const n = data.length;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => {
    const x = (i / (n - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 0;
    return { x, y };
  });

  const polyPoints = pts.map((p) => `${p.x},${p.y}`).join(" ");

  const areaPoints = [
    `0,${h}`,
    ...pts.map((p) => `${p.x},${p.y}`),
    `${w},${h}`,
  ].join(" ");

  const gradId = `sg-${color.replace("#", "")}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradId})`} />
      <polyline
        points={polyPoints}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function KpiSparkCard({
  title,
  value,
  change,
  changePositive,
  subtitle,
  sparkData,
  sparkColor,
  icon,
  onClick,
}: KpiSparkCardProps) {
  const Icon = Icons[icon];

  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "p-5 rounded-xl border",
        onClick && "cursor-pointer"
      )}
      style={{ backgroundColor: "#0a1220", borderColor: "#1a2540" }}
    >
      {/* Row 1: icon + title */}
      <div className="flex items-center gap-1.5 mb-3">
        {Icon && (
          <Icon size={16} style={{ color: "#475569", flexShrink: 0 }} />
        )}
        <span
          className="uppercase tracking-widest font-medium"
          style={{ fontSize: "10px", color: "#475569" }}
        >
          {title}
        </span>
      </div>

      {/* Row 2: value + sparkline */}
      <div className="flex items-end justify-between mb-3">
        <span
          className="text-2xl font-bold tabular-nums leading-none"
          style={{ color: "#cbd5e1" }}
        >
          {value}
        </span>
        <Sparkline data={sparkData} color={sparkColor} />
      </div>

      {/* Row 3: change badge + subtitle */}
      <div className="flex items-center gap-2">
        <span
          className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
          style={{
            backgroundColor: changePositive
              ? "rgba(34,197,94,0.1)"
              : "rgba(244,63,94,0.1)",
            color: changePositive ? "#22c55e" : "#f43f5e",
          }}
        >
          {changePositive ? (
            <TrendingUp size={11} />
          ) : (
            <TrendingDown size={11} />
          )}
          {change}
        </span>
        <span style={{ fontSize: "11px", color: "#475569" }}>{subtitle}</span>
      </div>
    </motion.div>
  );
}
