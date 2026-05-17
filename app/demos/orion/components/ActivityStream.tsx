import type { ActivityItem } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";

interface ActivityStreamProps {
  activities: ActivityItem[];
}

export function ActivityStream({ activities }: ActivityStreamProps) {
  const items = activities.slice(0, 10);

  return (
    <div className="orion-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#cbd5e1]">Atividade Recente</h3>
        <span className="text-[10px] text-[#475569] bg-[#0d1628] px-2 py-0.5 rounded-full">Hoje</span>
      </div>

      <div className="relative overflow-y-auto max-h-[280px]">
        {/* Timeline line */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-[#1a2540]" />

        <div className="space-y-0">
          {items.map((item) => (
            <div key={item.id} className="pl-8 pr-2 py-2.5 relative">
              {/* Dot */}
              <div
                className="absolute left-2 top-3.5 w-2.5 h-2.5 rounded-full border-2 border-[#080f20] -translate-x-[1px]"
                style={{ backgroundColor: item.color }}
              />

              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#94a3b8] leading-snug">
                    <span className="font-semibold text-[#cbd5e1]">{item.actor}</span>
                    {" "}{item.action}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {item.amount !== undefined && (
                      <span
                        className="text-[10px] font-mono font-semibold"
                        style={{ color: item.amount >= 0 ? "#22c55e" : "#f43f5e" }}
                      >
                        {item.amount >= 0 ? "+" : ""}{formatCurrency(Math.abs(item.amount))}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-[#475569] shrink-0 mt-0.5">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
