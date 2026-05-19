"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  const navLinks = [
    { label: "Sobre",    href: "/about"      },
    { label: "Serviços", href: "/services"   },
    { label: "Demos",    href: "/portfolio"  },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass border-b border-[var(--border)] shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none shrink-0"
            aria-label="Development Consulting"
          >
            <div className="relative w-8 h-8 rounded-[8px] bg-gradient-to-br from-[var(--primary)] to-[var(--primary-bright)] flex items-center justify-center shadow-[0_0_16px_var(--primary-glow)] group-hover:shadow-[0_0_24px_var(--primary-glow)] transition-shadow duration-300">
              <span className="text-white text-xs font-bold tracking-tight select-none">DC</span>
            </div>
            <span className="text-sm font-semibold text-[var(--text)] tracking-tight hidden sm:block">
              Development<span className="text-[var(--text-subtle)]"> Consulting</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname?.startsWith(link.href + "/");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative px-3 py-1.5 text-sm rounded-[8px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                      active
                        ? "text-[var(--text)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-card)]"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-[8px] bg-[var(--bg-card)] border border-[var(--border)]"
                        style={{ zIndex: -1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right: CTAs */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 rounded-[8px] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-card)] transition-colors"
              aria-label="Alternar tema"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/portfolio">Ver Trabalhos</Link>
            </Button>
            <Button size="sm" asChild>
              <a
                href="mailto:contato@developmentconsulting.io"
                className="flex items-center gap-1.5"
              >
                Fale Conosco
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </Button>
          </div>

          {/* Mobile: hamburger */}
          <div className="md:hidden flex items-center gap-2 shrink-0">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 rounded-[8px] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-card)] transition-colors"
              aria-label="Alternar tema"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-[8px] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-card)] transition-colors"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden pt-16 glass"
          >
            <nav className="flex flex-col gap-1 p-5">
              {navLinks.map((link) => {
                const active =
                  pathname === link.href || pathname?.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-3 rounded-[10px] text-base font-medium transition-colors",
                      active
                        ? "bg-[var(--bg-card)] text-[var(--text)] border border-[var(--border)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-card)]"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-[var(--border)]">
                <Button variant="secondary" size="lg" asChild className="w-full">
                  <Link href="/portfolio">Ver Trabalhos</Link>
                </Button>
                <Button size="lg" asChild className="w-full">
                  <a
                    href="mailto:contato@developmentconsulting.io"
                    className="flex items-center justify-center gap-2"
                  >
                    Fale Conosco
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
