"use client";

import { fxData } from "@/data/orion";
import { formatCurrency } from "@/lib/utils";

const W = 120;
const H = 36;

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const n = data.length;
  const pts = data.map((v, i) => {
    const x = (i / (n - 1)) * W;
    const y = H - ((v - min) / range) * (H - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const polyline = pts.join(" ");
  const area = `0,${H} ${polyline} ${W},${H}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
      <defs>
        <linearGradient id={`fx-grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#fx-grad-${color.replace("#", "")})`} />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export default function FxWidget() {
  const totalExposure = fxData.usdExposure + fxData.eurExposure;

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ backgroundColor: "#0a1220", borderColor: "#1a2540" }}
    >
      <div className="px-5 py-4 border-b" style={{ borderColor: "#1a2540" }}>
        <h3 className="text-sm font-semibold" style={{ color: "#cbd5e1" }}>
          Câmbio & Exposição FX
        </h3>
        <p className="text-[10px] mt-0.5" style={{ color: "#475569" }}>
          Cotações em tempo real · hedge ratio {(fxData.hedgeRatio * 100).toFixed(0)}%
        </p>
      </div>

      {/* Rate cards */}
      <div className="grid grid-cols-2 gap-4 p-5 border-b" style={{ borderColor: "#1a2540" }}>
        {/* USD/BRL */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: "#475569" }}>USD/BRL</p>
              <p className="text-xl font-bold font-mono mt-0.5" style={{ color: "#38bdf8" }}>
                {fxData.USDBRL.toFixed(2)}
              </p>
            </div>
            <MiniSparkline data={fxData.usdHistory} color="#38bdf8" />
          </div>
          <p className="text-[10px] font-mono" style={{ color: "#475569" }}>
            Exposição: <span style={{ color: "#cbd5e1" }}>{formatCurrency(fxData.usdExposure)}</span>
          </p>
        </div>

        {/* EUR/BRL */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: "#475569" }}>EUR/BRL</p>
              <p className="text-xl font-bold font-mono mt-0.5" style={{ color: "#a78bfa" }}>
                {fxData.EURBRL.toFixed(2)}
              </p>
            </div>
            <MiniSparkline data={fxData.eurHistory} color="#a78bfa" />
          </div>
          <p className="text-[10px] font-mono" style={{ color: "#475569" }}>
            Exposição: <span style={{ color: "#cbd5e1" }}>{formatCurrency(fxData.eurExposure)}</span>
          </p>
        </div>
      </div>

      {/* Exposure summary */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span style={{ color: "#475569" }}>Exposição Total</span>
          <span className="font-mono font-semibold" style={{ color: "#cbd5e1" }}>
            {formatCurrency(totalExposure)}
          </span>
        </div>

        {/* Hedge ratio bar */}
        <div>
          <div className="flex items-center justify-between text-[10px] mb-1.5">
            <span style={{ color: "#475569" }}>Hedge Ratio</span>
            <span className="font-mono" style={{ color: "#22c55e" }}>
              {(fxData.hedgeRatio * 100).toFixed(0)}% coberto
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#1a2540" }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${fxData.hedgeRatio * 100}%`, backgroundColor: "#22c55e" }}
            />
          </div>
        </div>

        {/* Breakdown table */}
        <div className="space-y-0 pt-1">
          {[
            { label: "USD hedgeado", value: fxData.usdExposure * fxData.hedgeRatio, color: "#38bdf8" },
            { label: "EUR hedgeado", value: fxData.eurExposure * fxData.hedgeRatio, color: "#a78bfa" },
            {
              label: "Exposição líquida",
              value: totalExposure * (1 - fxData.hedgeRatio),
              color: "#f59e0b",
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="flex items-center justify-between py-2 border-b text-[10px]"
              style={{ borderColor: "#1a2540" }}
            >
              <span style={{ color: "#475569" }}>{label}</span>
              <span className="font-mono" style={{ color }}>
                {formatCurrency(value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
