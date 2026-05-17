"use client";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#07070e] py-12">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <span className="font-black tracking-[0.2em] text-white text-lg block mb-2 font-display">
              LUXE
            </span>
            <p className="text-xs text-white/40 mb-1">Curated for the Few</p>
            <p className="text-xs text-white/30 leading-relaxed">
              Peças selecionadas de marcas independentes ao redor do mundo.
              Qualidade sem concessões.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Links
            </p>
            {["Sobre", "Coleções", "Blog", "Carreiras", "Imprensa"].map((link) => (
              <button
                key={link}
                className="block text-xs text-white/40 hover:text-white transition-colors mb-2"
              >
                {link}
              </button>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Atendimento
            </p>
            {["Contato", "FAQ", "Trocas", "Rastrear pedido", "Whatsapp"].map(
              (link) => (
                <button
                  key={link}
                  className="block text-xs text-white/40 hover:text-white transition-colors mb-2"
                >
                  {link}
                </button>
              ),
            )}
          </div>
          <div>
            <p className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Pagamentos
            </p>
            <div className="flex flex-wrap gap-2">
              {["VISA", "MASTER", "PIX", "AMEX"].map((method) => (
                <span
                  key={method}
                  className="text-[11px] text-white/50 border border-white/16 rounded px-2 py-1"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/8 pt-6">
          <p className="text-xs text-white/20 text-center">
            © 2025 LUXE. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
