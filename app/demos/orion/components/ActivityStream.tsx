import * as LucideIcons from "lucide-react";
import { ACTIVITY_CONFIG } from "../types/orion.types";
import type { Activity } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";

interface ActivityStreamProps {
  activities: Activity[];
}

const Icons = LucideIcons as unknown as Record<
  string,
  React.ComponentType<{ size?: number; style?: React.CSSProperties }>
>;

export default function ActivityStream({ activities }: ActivityStreamProps) {
  const visible = activities.slice(0, 8);

  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{ backgroundColor: "#0a1220", borderColor: "#1a2540" }}
    >
      {/* Header */}
      <div
        className="px-5 py-3.5 flex items-center justify-between border-b"
        style={{ borderColor: "#1a2540" }}
      >
        <span className="text-sm font-semibold" style={{ color: "#cbd5e1" }}>
          Feed de Atividades
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "#22c55e", display: "inline-block" }}
          />
          <span style={{ fontSize: "11px", color: "#475569" }}>Tempo Real</span>
        </div>
      </div>

      {/* List */}
      <div className="divide-y" style={{ borderColor: "#1a2540" }}>
        {visible.map((activity) => {
          const cfg = ACTIVITY_CONFIG[activity.type];
          const Icon = Icons[cfg.icon];
          const hasAmount = activity.amount !== undefined;
          const isPositive = hasAmount && (activity.amount ?? 0) > 0;

          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 px-5 py-3 transition-colors"
              style={{ borderColor: "#1a2540" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor =
                  "rgba(255,255,255,0.02)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent";
              }}
            >
              {/* Icon container */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${cfg.color}18` }}
              >
                {Icon && <Icon size={14} style={{ color: cfg.color }} />}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium" style={{ color: "#cbd5e1" }}>
                  {activity.title}
                </p>
                <p className="mt-0.5" style={{ fontSize: "10px", color: "#475569" }}>
                  {activity.description}
                  {activity.description && activity.user && " · "}
                  {activity.user}
                </p>
              </div>

              {/* Right side */}
              <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                {hasAmount && (
                  <span
                    className="text-xs tabular-nums font-mono"
                    style={{ color: isPositive ? "#22c55e" : "#f43f5e" }}
                  >
                    {isPositive ? "+" : ""}
                    {formatCurrency(activity.amount!)}
                  </span>
                )}
                <span style={{ fontSize: "10px", color: "#475569" }}>
                  {activity.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
