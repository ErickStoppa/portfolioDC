"use client";

export function AnnouncementBar() {
  return (
    <div className="bg-black h-8 flex items-center overflow-hidden sticky top-0 z-50">
      <div className="marquee-track whitespace-nowrap">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="text-white/60 text-xs px-16 shrink-0">
            🚚 Frete Grátis acima de R$500 &nbsp;·&nbsp; Entrega em 5-12 dias
            úteis &nbsp;·&nbsp; Parcele em 12x sem juros
          </span>
        ))}
      </div>
    </div>
  );
}
