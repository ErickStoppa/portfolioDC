"use client";

import React from "react";
import { Monitor, ShoppingCart, Utensils, BarChart3, Calendar, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  demoId:     string;
  className?: string;
}

/* ─── Per-demo art components ────────────────────────────────── */

function EcommerceArt() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d1a] to-[#07070e]">
      {/* Ambient blobs */}
      <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-purple-500/15 blur-3xl" />
      <div className="absolute bottom-0 -left-8 w-32 h-32 rounded-full bg-indigo-500/10 blur-2xl" />

      {/* Navbar mock */}
      <div className="absolute top-5 left-4 right-4 h-6 bg-white/5 rounded-lg flex items-center px-2 gap-2">
        <div className="w-12 h-2 rounded bg-white/20" />
        <div className="flex-1" />
        <div className="w-6 h-2 rounded bg-white/10" />
        <div className="w-6 h-2 rounded bg-white/10" />
        <div className="w-6 h-2 rounded bg-purple-400/30" />
      </div>

      {/* Product cards */}
      <div className="absolute top-16 left-4 right-4 flex gap-2 items-end">
        <div className="flex-1 h-[72px] rounded-lg bg-white/6 border border-white/8 flex flex-col justify-between p-2">
          <div className="w-6 h-6 rounded bg-purple-400/20" />
          <div>
            <div className="w-8 h-1.5 rounded bg-white/20 mb-1" />
            <div className="w-10 h-1.5 rounded bg-purple-400/40" />
          </div>
        </div>
        {/* Card 2 — featured */}
        <div className="flex-1 h-[90px] rounded-xl bg-white/10 border border-purple-400/20 flex flex-col justify-between p-2 -mt-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-400/30 to-indigo-400/30" />
          <div>
            <div className="w-10 h-1.5 rounded bg-white/30 mb-1" />
            <span className="text-[9px] text-purple-300/70 font-mono">R$ 299</span>
          </div>
        </div>
        <div className="flex-1 h-[72px] rounded-lg bg-white/6 border border-white/8 flex flex-col justify-between p-2">
          <div className="w-6 h-6 rounded bg-indigo-400/20" />
          <div>
            <div className="w-8 h-1.5 rounded bg-white/20 mb-1" />
            <div className="w-10 h-1.5 rounded bg-indigo-400/30" />
          </div>
        </div>
      </div>

      {/* Color swatches */}
      <div className="absolute bottom-6 left-4 flex gap-1.5">
        {["bg-purple-400/50", "bg-rose-400/40", "bg-slate-400/40", "bg-amber-400/40"].map((c, i) => (
          <div key={i} className={cn("w-3 h-3 rounded-full border border-white/10", c)} />
        ))}
      </div>

      {/* Cart badge */}
      <div className="absolute top-4 right-4 opacity-30">
        <ShoppingCart size={20} className="text-white" />
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-purple-400 text-[6px] flex items-center justify-center text-white font-bold">
          3
        </div>
      </div>
    </div>
  );
}

function RestaurantArt() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0a0805] to-[#111008]">
      {/* Bloom */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-40 h-24 rounded-full bg-amber-500/12 blur-2xl" />

      {/* Utensils watermark */}
      <div className="absolute bottom-4 right-4 opacity-25">
        <Utensils size={40} className="text-amber-400" />
      </div>

      {/* Menu cards */}
      <div className="absolute top-6 left-4 right-4 flex flex-col gap-2">
        {[
          { price: "R$ 87",  h: "h-10" },
          { price: "R$ 64",  h: "h-9"  },
          { price: "R$ 189", h: "h-10" },
        ].map(({ price, h }, i) => (
          <div
            key={i}
            className={cn(
              h,
              "flex items-center gap-2 pl-3 pr-3 rounded-r-lg",
              "border-l-2 border-amber-500/60 bg-white/5"
            )}
          >
            <div className="flex-1">
              <div className="w-20 h-1.5 rounded bg-white/20 mb-1" />
              <div className="w-12 h-1.5 rounded bg-white/10" />
            </div>
            <span className="text-[9px] text-amber-400/60 font-mono">{price}</span>
          </div>
        ))}
      </div>

      {/* Plate circles */}
      <div className="absolute bottom-6 left-4 flex gap-3 items-center">
        {[48, 36, 40].map((s, i) => (
          <div
            key={i}
            style={{ width: s, height: s }}
            className="rounded-full bg-amber-400/15 border border-amber-400/20"
          />
        ))}
      </div>
    </div>
  );
}

function CrmArt() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#070b14] to-[#040810]">
      {/* Bloom */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl" />

      {/* BarChart watermark */}
      <div className="absolute bottom-3 right-3 opacity-20">
        <BarChart3 size={44} className="text-blue-400" />
      </div>

      {/* KPI card */}
      <div className="absolute top-5 left-4 bg-white/6 border border-white/8 rounded-lg px-3 py-2">
        <div className="text-[9px] text-blue-300/60 font-mono mb-0.5">Receita Acum.</div>
        <div className="text-[11px] text-blue-200/80 font-semibold font-mono">R$ 1.2M</div>
      </div>

      {/* Second KPI */}
      <div className="absolute top-5 right-4 bg-white/6 border border-white/8 rounded-lg px-3 py-2">
        <div className="text-[9px] text-emerald-300/60 font-mono mb-0.5">Fechamentos</div>
        <div className="text-[11px] text-emerald-200/80 font-semibold font-mono">+48</div>
      </div>

      {/* Chart bars */}
      <div className="absolute bottom-10 left-4 right-4 flex items-end gap-1.5 h-16">
        {[32, 56, 42, 64, 48, 70, 52].map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className={cn(
              "flex-1 rounded-sm",
              i === 5 ? "bg-blue-400/60" : "bg-blue-500/25"
            )}
          />
        ))}
      </div>

      {/* Table rows */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-1.5 bg-white/5 rounded" />
        ))}
      </div>
    </div>
  );
}

function BookingArt() {
  const markedSlots = new Set([2, 5, 8, 13, 17]);
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#08060f] to-[#0a0812]">
      {/* Bloom */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-28 rounded-full bg-violet-500/12 blur-2xl" />

      {/* Calendar watermark */}
      <div className="absolute bottom-4 right-4 opacity-20">
        <Calendar size={40} className="text-violet-400" />
      </div>

      {/* Calendar header */}
      <div className="absolute top-5 left-4 right-4">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <div className="w-14 h-2 rounded bg-white/20" />
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded bg-white/6 border border-white/8" />
            <div className="w-4 h-4 rounded bg-white/6 border border-white/8" />
          </div>
        </div>

        {/* Grid 5×4 */}
        <div className="grid grid-cols-5 gap-1">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className={cn(
                "h-7 rounded-md flex items-center justify-center",
                markedSlots.has(i)
                  ? "bg-violet-500/40 border border-violet-400/30"
                  : "bg-white/6 border border-white/5"
              )}
            >
              {markedSlots.has(i) && (
                <div className="w-1 h-1 rounded-full bg-violet-300/70" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Time slot pills */}
      <div className="absolute bottom-5 left-4 flex gap-1.5">
        {["09:00", "11:30", "14:00"].map((t) => (
          <div
            key={t}
            className="px-2 py-0.5 rounded-full bg-violet-400/18 border border-violet-400/25"
          >
            <span className="text-[9px] text-violet-300/70 font-mono">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrionArt() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#030711] to-[#060d1c]">
      {/* Bloom */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-indigo-600/10 blur-3xl" />

      {/* TrendingUp watermark */}
      <div className="absolute bottom-3 right-3 opacity-20">
        <TrendingUp size={40} className="text-indigo-400" />
      </div>

      {/* Sidebar */}
      <div className="absolute top-0 left-0 bottom-0 w-10 bg-indigo-900/30 border-r border-white/5 flex flex-col items-center py-4 gap-3">
        <div className="w-5 h-5 rounded bg-indigo-400/30" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="w-4 h-4 rounded-sm bg-white/6" />
        ))}
      </div>

      {/* KPI strip */}
      <div className="absolute top-5 left-14 right-4 flex gap-1.5">
        {[
          { label: "Receita",  val: "R$ 4.2M", color: "text-indigo-300/70"  },
          { label: "EBITDA",   val: "18.3%",   color: "text-emerald-300/60" },
        ].map(({ label, val, color }) => (
          <div
            key={label}
            className="flex-1 bg-white/5 border border-white/8 rounded-lg px-2 py-1.5"
          >
            <div className="text-[8px] text-white/30 mb-0.5">{label}</div>
            <div className={cn("text-[10px] font-mono font-semibold", color)}>{val}</div>
          </div>
        ))}
      </div>

      {/* Waterfall bars */}
      <div className="absolute top-20 left-14 right-4 flex items-end gap-1 h-14">
        {[55, 75, 40, 65, 50, 80, 35].map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className={cn(
              "flex-1 rounded-sm",
              i % 3 === 0 ? "bg-indigo-400/40"
              : i % 3 === 1 ? "bg-emerald-400/30"
              : "bg-rose-400/25"
            )}
          />
        ))}
      </div>

      {/* DRE table rows */}
      <div className="absolute bottom-4 left-14 right-4 flex flex-col gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex gap-2 items-center">
            <div className="flex-1 h-1.5 bg-white/5 rounded" />
            <div className="w-8 h-1.5 bg-indigo-400/20 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

function FallbackArt() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg)] flex items-center justify-center">
      <Monitor size={32} className="text-[var(--text-subtle)]" aria-hidden="true" />
    </div>
  );
}

const ART_MAP: Record<string, () => React.ReactElement> = {
  ecommerce:  EcommerceArt,
  restaurant: RestaurantArt,
  crm:        CrmArt,
  booking:    BookingArt,
  orion:      OrionArt,
};

/* ─── Main export ────────────────────────────────────────────── */

export function DemoPreviewArt({ demoId, className }: Props) {
  const ArtComponent = ART_MAP[demoId] ?? FallbackArt;
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <ArtComponent />
    </div>
  );
}
