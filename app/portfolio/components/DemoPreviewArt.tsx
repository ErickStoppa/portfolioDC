/**
 * DemoPreviewArt — unique per-demo SVG composition that hints at
 * what lives inside without being a screenshot.
 */

interface Props {
  slug: string;
  className?: string;
}

// ── Ecommerce (Luxe) ─────────────────────────────────────────────────────────
function EcommerceArt() {
  return (
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background subtle grid */}
      <rect width="320" height="200" fill="#0d1117" />
      {/* Large product card */}
      <rect x="28" y="24" width="120" height="152" rx="10" fill="#18213a" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      {/* Product image placeholder */}
      <rect x="36" y="32" width="104" height="80" rx="7" fill="rgba(29,109,240,0.12)" />
      <circle cx="88" cy="72" r="20" fill="rgba(29,109,240,0.18)" />
      <circle cx="88" cy="72" r="12" fill="rgba(29,109,240,0.3)" />
      {/* Price tag */}
      <rect x="36" y="122" width="52" height="16" rx="4" fill="rgba(29,109,240,0.2)" />
      <rect x="36" y="142" width="82" height="8" rx="3" fill="rgba(255,255,255,0.06)" />
      <rect x="36" y="154" width="62" height="8" rx="3" fill="rgba(255,255,255,0.04)" />
      {/* Add to cart button */}
      <rect x="36" y="168" width="104" height="22" rx="6" fill="rgba(29,109,240,0.8)" />
      <rect x="70" y="175" width="56" height="8" rx="3" fill="rgba(255,255,255,0.6)" />

      {/* Second card (smaller, slightly behind) */}
      <rect x="164" y="40" width="110" height="136" rx="10" fill="#18213a" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <rect x="172" y="48" width="94" height="68" rx="6" fill="rgba(251,146,60,0.1)" />
      <circle cx="219" cy="82" r="18" fill="rgba(251,146,60,0.15)" />
      <circle cx="219" cy="82" r="10" fill="rgba(251,146,60,0.25)" />
      <rect x="172" y="126" width="44" height="14" rx="3" fill="rgba(251,146,60,0.2)" />
      <rect x="172" y="144" width="80" height="7" rx="3" fill="rgba(255,255,255,0.05)" />
      <rect x="172" y="156" width="62" height="7" rx="3" fill="rgba(255,255,255,0.04)" />
      <rect x="172" y="168" width="94" height="20" rx="6" fill="rgba(251,146,60,0.35)" />

      {/* Color swatches row */}
      {[0,1,2,3].map((i) => (
        <circle key={i} cx={28 + i * 14} cy={185} r={5}
          fill={["#1d6df0","#f43f5e","#22c55e","#f59e0b"][i]} fillOpacity="0.75" />
      ))}

      {/* Cart badge top-right */}
      <rect x="274" y="14" width="32" height="22" rx="6" fill="rgba(29,109,240,0.25)" stroke="rgba(29,109,240,0.4)" strokeWidth="1" />
      <circle cx="298" cy="10" r="7" fill="#1d6df0" />
      <text x="298" y="14" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">2</text>
    </svg>
  );
}

// ── Restaurant (CAIS) ────────────────────────────────────────────────────────
function RestaurantArt() {
  return (
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="200" fill="#0d1117" />
      {/* Plate */}
      <circle cx="160" cy="100" r="68" fill="rgba(251,146,60,0.06)" stroke="rgba(251,146,60,0.15)" strokeWidth="1.5" />
      <circle cx="160" cy="100" r="52" fill="rgba(251,146,60,0.04)" stroke="rgba(251,146,60,0.1)" strokeWidth="1" />
      {/* Food blobs on plate */}
      <ellipse cx="148" cy="96" rx="22" ry="14" fill="rgba(234,179,8,0.35)" />
      <ellipse cx="172" cy="104" rx="18" ry="12" fill="rgba(239,68,68,0.3)" />
      <ellipse cx="155" cy="110" rx="14" ry="9" fill="rgba(34,197,94,0.35)" />
      <circle cx="168" cy="90" r="10" fill="rgba(251,146,60,0.4)" />
      {/* Fork left */}
      <rect x="72" y="60" width="3" height="80" rx="1.5" fill="rgba(255,255,255,0.2)" />
      <rect x="67" y="60" width="3" height="28" rx="1.5" fill="rgba(255,255,255,0.2)" />
      <rect x="77" y="60" width="3" height="28" rx="1.5" fill="rgba(255,255,255,0.2)" />
      <rect x="72" y="60" width="3" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
      {/* Knife right */}
      <rect x="245" y="60" width="3" height="80" rx="1.5" fill="rgba(255,255,255,0.2)" />
      <path d="M245 60 Q252 68 248 88 L245 88 Z" fill="rgba(255,255,255,0.12)" />

      {/* Menu card top-left */}
      <rect x="14" y="16" width="80" height="52" rx="8" fill="#18213a" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="22" y="24" width="50" height="6" rx="3" fill="rgba(251,146,60,0.5)" />
      <rect x="22" y="34" width="64" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
      <rect x="22" y="42" width="52" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
      <rect x="22" y="50" width="58" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
      <rect x="22" y="58" width="40" height="4" rx="2" fill="rgba(255,255,255,0.04)" />

      {/* Delivery badge top-right */}
      <rect x="226" y="16" width="80" height="32" rx="8" fill="#18213a" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="234" y="24" width="16" height="16" rx="4" fill="rgba(34,197,94,0.2)" />
      <rect x="255" y="26" width="42" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
      <rect x="255" y="34" width="30" height="5" rx="2" fill="rgba(34,197,94,0.3)" />

      {/* Status chip bottom */}
      <rect x="108" y="168" width="104" height="22" rx="11" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.25)" strokeWidth="1" />
      <circle cx="122" cy="179" r="4" fill="#22c55e" />
      <rect x="130" y="174" width="72" height="10" rx="3" fill="rgba(255,255,255,0.1)" />
    </svg>
  );
}

// ── CRM / Nexus ───────────────────────────────────────────────────────────────
function CrmArt() {
  const bars = [62, 82, 54, 96, 70, 88, 44];
  return (
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="200" fill="#0d1117" />
      {/* Sidebar */}
      <rect x="0" y="0" width="52" height="200" fill="#18213a" />
      {[0,1,2,3,4].map((i) => (
        <rect key={i} x="12" y={24 + i * 28} width="28" height="18" rx="5"
          fill={i === 0 ? "rgba(29,109,240,0.3)" : "rgba(255,255,255,0.04)"} />
      ))}

      {/* Main panel */}
      <rect x="60" y="8" width="252" height="184" rx="8" fill="#18213a" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

      {/* KPI row */}
      {[0,1,2].map((i) => (
        <g key={i}>
          <rect x={68 + i * 84} y="16" width="76" height="40" rx="6" fill="rgba(29,109,240,0.08)" stroke="rgba(29,109,240,0.12)" strokeWidth="1" />
          <rect x={75 + i * 84} y="23" width="40" height="7" rx="3" fill="rgba(29,109,240,0.4)" />
          <rect x={75 + i * 84} y="34" width="56" height="14" rx="3" fill="rgba(255,255,255,0.08)" />
        </g>
      ))}

      {/* Bar chart */}
      {bars.map((h, i) => (
        <rect key={i}
          x={68 + i * 33} y={128 - h}
          width="24" height={h}
          rx="4"
          fill={i === 4 ? "#1d6df0" : "rgba(29,109,240,0.25)"}
        />
      ))}
      {/* Line chart overlay */}
      <polyline
        points={bars.map((h, i) => `${80 + i * 33},${130 - h * 0.52}`).join(" ")}
        fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"
      />

      {/* Mini table */}
      {[0,1,2].map((i) => (
        <g key={i}>
          <rect x="68" y={140 + i * 14} width="236" height="12" rx="3"
            fill={i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent"} />
          <rect x="72" y={143 + i * 14} width="48" height="6" rx="2" fill="rgba(255,255,255,0.1)" />
          <rect x="130" y={143 + i * 14} width="32" height="6" rx="2" fill="rgba(34,197,94,0.25)" />
          <rect x="176" y={143 + i * 14} width="64" height="6" rx="2" fill="rgba(255,255,255,0.06)" />
          <circle cx="294" cy={146 + i * 14} r="4"
            fill={["rgba(34,197,94,0.4)","rgba(251,146,60,0.4)","rgba(29,109,240,0.4)"][i]} />
        </g>
      ))}

      {/* X axis */}
      <line x1="68" y1="130" x2="304" y2="130" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
    </svg>
  );
}

// ── Booking / Aura ────────────────────────────────────────────────────────────
function BookingArt() {
  const days = ["S","T","Q","Q","S"];
  const slots = [
    [false, true,  false],
    [true,  false, true ],
    [false, false, true ],
    [true,  true,  false],
    [false, true,  false],
  ];
  return (
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="200" fill="#0d1117" />

      {/* Calendar card */}
      <rect x="24" y="16" width="176" height="168" rx="12" fill="#18213a" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      {/* Month header */}
      <rect x="32" y="24" width="80" height="12" rx="4" fill="rgba(29,109,240,0.4)" />
      <rect x="166" y="26" width="8" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
      <rect x="152" y="26" width="8" height="8" rx="2" fill="rgba(255,255,255,0.1)" />

      {/* Day headers */}
      {days.map((d, i) => (
        <text key={d} x={48 + i * 30} y={54} textAnchor="middle"
          fill="rgba(255,255,255,0.25)" fontSize="8" fontWeight="600">{d}</text>
      ))}

      {/* Calendar grid */}
      {slots.map((row, ri) =>
        row.map((booked, ci) => (
          <rect
            key={`${ri}-${ci}`}
            x={33 + ci * 54} y={60 + ri * 24}
            width={46} height={18} rx="5"
            fill={booked ? "rgba(29,109,240,0.3)" : "rgba(255,255,255,0.03)"}
            stroke={booked ? "rgba(29,109,240,0.5)" : "rgba(255,255,255,0.04)"}
            strokeWidth="1"
          />
        ))
      )}

      {/* Selected slot highlight */}
      <rect x="87" y="108" width="46" height="18" rx="5" fill="rgba(29,109,240,0.8)" />
      <rect x="92" y="113" width="36" height="8" rx="3" fill="rgba(255,255,255,0.4)" />

      {/* Clock legend */}
      <rect x="32" y="162" width="160" height="14" rx="4" fill="rgba(29,109,240,0.08)" />
      <rect x="38" y="165" width="60" height="8" rx="3" fill="rgba(29,109,240,0.3)" />
      <rect x="110" y="165" width="48" height="8" rx="3" fill="rgba(255,255,255,0.08)" />

      {/* Appointment detail card */}
      <rect x="212" y="16" width="96" height="108" rx="10" fill="#18213a" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <circle cx="236" cy="42" r="14" fill="rgba(29,109,240,0.2)" />
      <rect x="236" y="36" width="2" height="8" rx="1" fill="rgba(29,109,240,0.7)" />
      <rect x="234" y="42" width="4" height="2" rx="1" fill="rgba(29,109,240,0.7)" />
      <rect x="222" y="62" width="60" height="7" rx="3" fill="rgba(255,255,255,0.12)" />
      <rect x="222" y="73" width="44" height="6" rx="3" fill="rgba(29,109,240,0.3)" />
      <rect x="222" y="83" width="60" height="5" rx="2" fill="rgba(255,255,255,0.06)" />
      <rect x="222" y="92" width="48" height="5" rx="2" fill="rgba(255,255,255,0.06)" />
      <rect x="222" y="108" width="60" height="22" rx="6" fill="rgba(29,109,240,0.8)" />

      {/* Status pills */}
      <rect x="212" y="134" width="96" height="24" rx="8" fill="#18213a" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <circle cx="224" cy="146" r="5" fill="#22c55e" fillOpacity="0.7" />
      <rect x="233" y="142" width="62" height="8" rx="3" fill="rgba(255,255,255,0.08)" />

      <rect x="212" y="164" width="96" height="20" rx="8" fill="#18213a" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <rect x="220" y="168" width="36" height="8" rx="3" fill="rgba(251,146,60,0.3)" />
      <rect x="260" y="168" width="40" height="8" rx="3" fill="rgba(255,255,255,0.06)" />
    </svg>
  );
}

// ── ORION ERP ────────────────────────────────────────────────────────────────
function OrionArt() {
  const wBars = [
    { x: 56,  w: 40, up: true  },
    { x: 104, w: 48, up: true  },
    { x: 160, w: 30, up: false },
    { x: 198, w: 52, up: true  },
    { x: 258, w: 24, up: false },
  ];
  return (
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="200" fill="#0d1117" />

      {/* Top KPI strip */}
      {[0,1,2,3].map((i) => (
        <g key={i}>
          <rect x={8 + i * 78} y="8" width="70" height="36" rx="7"
            fill="#18213a" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <rect x={14 + i * 78} y="14" width="36" height="5" rx="2"
            fill="rgba(255,255,255,0.08)" />
          <rect x={14 + i * 78} y="22" width="50" height="14" rx="3"
            fill={["rgba(29,109,240,0.3)","rgba(34,197,94,0.3)","rgba(56,189,248,0.3)","rgba(167,139,250,0.3)"][i]} />
        </g>
      ))}

      {/* Waterfall chart */}
      <rect x="8" y="50" width="208" height="96" rx="8" fill="#18213a" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      {/* Baseline */}
      <line x1="16" y1="114" x2="208" y2="114" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      {wBars.map((b, i) => (
        <rect
          key={i}
          x={b.x - 16} y={b.up ? 114 - b.w : 114}
          width="28" height={b.w} rx="3"
          fill={b.up ? "rgba(34,197,94,0.45)" : "rgba(244,63,94,0.45)"}
        />
      ))}
      {/* Balance line */}
      <polyline
        points="48,82 96,70 144,86 192,60 240,76"
        fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"
      />

      {/* Right panel: DRE table */}
      <rect x="222" y="50" width="90" height="96" rx="8" fill="#18213a" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <rect x="228" y="56" width="78" height="7" rx="3" fill="rgba(255,255,255,0.08)" />
      {[0,1,2,3,4,5].map((i) => (
        <g key={i}>
          <rect x="228" y={68 + i * 12} width="48" height="6" rx="2"
            fill="rgba(255,255,255,0.06)" />
          <rect x="282" y={68 + i * 12} width="28" height="6" rx="2"
            fill={i === 4 ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.05)"} />
        </g>
      ))}
      <rect x="228" y="136" width="78" height="8" rx="3" fill="rgba(29,109,240,0.2)" />

      {/* Bottom: bank pills */}
      {["Itaú","Bradesco","Caixa"].map((name, i) => (
        <g key={name}>
          <rect x={8 + i * 108} y="152" width="100" height="40" rx="8"
            fill="#18213a" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <rect x={14 + i * 108} y="158" width="32" height="10" rx="3"
            fill={["rgba(236,112,0,0.3)","rgba(204,0,0,0.3)","rgba(0,92,169,0.3)"][i]} />
          <rect x={14 + i * 108} y="172" width="60" height="12" rx="3"
            fill="rgba(255,255,255,0.05)" />
          <rect x={78 + i * 108} y="174" width="24" height="8" rx="2"
            fill={["rgba(34,197,94,0.3)","rgba(244,63,94,0.3)","rgba(34,197,94,0.3)"][i]} />
        </g>
      ))}
    </svg>
  );
}

// ── Dispatcher ────────────────────────────────────────────────────────────────
const ART_MAP: Record<string, () => React.ReactElement> = {
  ecommerce:  EcommerceArt,
  restaurant: RestaurantArt,
  crm:        CrmArt,
  booking:    BookingArt,
  orion:      OrionArt,
};

export function DemoPreviewArt({ slug, className }: Props) {
  const Art = ART_MAP[slug];
  if (!Art) {
    // Fallback: generic shimmer
    return (
      <div className={className} aria-hidden="true"
        style={{ background: "linear-gradient(135deg, #18213a 0%, #1d6df015 50%, #18213a 100%)" }} />
    );
  }
  return (
    <div className={className} aria-hidden="true">
      <Art />
    </div>
  );
}
