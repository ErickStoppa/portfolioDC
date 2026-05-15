"use client";

import Link from "next/link";
import { ArrowUpRight, Globe, Code2, Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    [t("footer", "company")]: [
      { label: t("nav", "about"),     href: "/about" },
      { label: t("nav", "services"),  href: "/services" },
      { label: t("nav", "portfolio"), href: "/portfolio" },
      { label: t("nav", "demos"),     href: "/demos" },
    ],
    [t("footer", "services")]: [
      { label: t("footer", "webDev"),       href: "/services" },
      { label: t("footer", "saas"),         href: "/services" },
      { label: t("footer", "uiux"),         href: "/services" },
      { label: t("footer", "frontendArch"), href: "/services" },
      { label: t("footer", "perfOpt"),      href: "/services" },
    ],
    [t("footer", "demos")]: [
      { label: t("footer", "ecommerce"),  href: "/demos/ecommerce" },
      { label: t("footer", "restaurant"), href: "/demos/restaurant" },
      { label: t("footer", "crm"),        href: "/demos/crm" },
      { label: t("footer", "booking"),    href: "/demos/booking" },
      { label: t("footer", "erp"),        href: "/demos/erp" },
    ],
  };

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
              {t("footer", "tagline")}
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Globe, label: "Website", href: "#" },
                { Icon: Code2, label: "GitHub", href: "#" },
                { Icon: Briefcase, label: "LinkedIn", href: "#" },
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
            &copy; {new Date().getFullYear()} Development Consulting. {t("footer", "copyright")}
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
