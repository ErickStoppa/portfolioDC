"use client";

import Link from "next/link";
import { ArrowUpRight, Globe, Code2, Briefcase } from "lucide-react";

const footerLinks = {
  Empresa: [
    { label: "Sobre",     href: "/about" },
    { label: "Serviços",  href: "/services" },
    { label: "Portfólio", href: "/portfolio" },
    { label: "Demos",     href: "/demos" },
  ],
  Serviços: [
    { label: "Desenvolvimento Web",        href: "/services" },
    { label: "Plataformas SaaS",           href: "/services" },
    { label: "Design UI/UX",               href: "/services" },
    { label: "Arquitetura Frontend",       href: "/services" },
    { label: "Otimização de Performance",  href: "/services" },
  ],
  Demos: [
    { label: "Ecommerce",              href: "/demos/ecommerce" },
    { label: "Restaurante",            href: "/demos/restaurant" },
    { label: "CRM Dashboard",          href: "/demos/crm" },
    { label: "Sistema de Agendamento", href: "/demos/booking" },
    { label: "ERP / Financeiro",       href: "/demos/erp" },
  ],
};

export function Footer() {
  return (
    <footer
      className="border-t border-[var(--border)] bg-[var(--bg-secondary)]"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4 focus-visible:outline-none"
              aria-label="Development Consulting"
            >
              <div className="w-8 h-8 rounded-[8px] bg-gradient-to-br from-[var(--primary)] to-[var(--primary-bright)] flex items-center justify-center shadow-[0_0_12px_var(--primary-glow)]">
                <span className="text-white text-xs font-bold tracking-tight">DC</span>
              </div>
              <span className="text-sm font-semibold text-[var(--text)] tracking-tight">
                Development Consulting
              </span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
              Experiências de software premium e soluções digitais para empresas que exigem o melhor.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Globe,    label: "Website",  href: "#" },
                { Icon: Code2,    label: "GitHub",   href: "#" },
                { Icon: Briefcase,label: "LinkedIn", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-[8px] border border-[var(--border)] bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-subtle)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-all duration-150"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs font-semibold text-[var(--text-subtle)] uppercase tracking-widest mb-4">
                {section}
              </p>
              <ul className="flex flex-col gap-2.5" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-150 focus-visible:outline-none focus-visible:text-[var(--text)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-subtle)]">
            &copy; {new Date().getFullYear()} Development Consulting. Todos os direitos reservados.
          </p>
          <a
            href="mailto:contato@developmentconsulting.io"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--text-subtle)] hover:text-[var(--primary)] transition-colors duration-150 focus-visible:outline-none"
          >
            contato@developmentconsulting.io
            <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
