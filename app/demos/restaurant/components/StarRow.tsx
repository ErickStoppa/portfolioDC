"use client";

import { Star } from "lucide-react";

export function StarRow({
  rating,
  count,
  size = "sm",
}: {
  rating: number;
  count?: number;
  size?: "xs" | "sm";
}) {
  const cls = size === "xs" ? "w-2.5 h-2.5" : "w-3 h-3";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${cls} ${i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-white/20"}`}
        />
      ))}
      {count !== undefined && (
        <span className="ml-1 text-xs text-white/30">({count})</span>
      )}
    </div>
  );
}
