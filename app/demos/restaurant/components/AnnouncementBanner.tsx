"use client";

import { ANNOUNCEMENT_ITEMS } from "../types/restaurant.types";

const items = [...ANNOUNCEMENT_ITEMS, ...ANNOUNCEMENT_ITEMS, ...ANNOUNCEMENT_ITEMS];

export function AnnouncementBanner() {
  return (
    <div
      className="sticky top-0 z-50 h-8 overflow-hidden flex items-center"
      style={{ background: "#000" }}
    >
      <div className="marquee-track gap-0">
        {items.map((item, i) => (
          <span key={i} className="shrink-0 text-xs text-white/50 px-6 flex items-center gap-6">
            {item}
            <span className="text-white/20">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
