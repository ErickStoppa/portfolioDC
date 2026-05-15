"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { localeFlags, localeNames, type Locale } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

const LOCALES: Locale[] = ["pt", "en", "es"];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const select = (l: Locale) => {
    setLocale(l);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Selecionar idioma / Select language"
        className={cn(
          "flex items-center gap-1.5 h-8 px-2.5 rounded-[8px] border text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
          open
            ? "bg-[var(--bg-card-hover)] border-[var(--border-strong)] text-[var(--text)]"
            : "bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)]"
        )}
      >
        <span className="text-base leading-none" aria-hidden="true">
          {localeFlags[locale]}
        </span>
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <ChevronDown
          className={cn(
            "w-3 h-3 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Idioma / Language"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-40 rounded-[12px] border border-[var(--border)] bg-[var(--bg-card)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden z-50 py-1"
          >
            {LOCALES.map((l) => (
              <li key={l} role="option" aria-selected={locale === l}>
                <button
                  onClick={() => select(l)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-100 focus-visible:outline-none",
                    locale === l
                      ? "text-[var(--primary)] bg-[var(--primary-light)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-card-hover)]"
                  )}
                >
                  <span className="text-xl leading-none" aria-hidden="true">
                    {localeFlags[l]}
                  </span>
                  <span className="font-medium">{localeNames[l]}</span>
                  {locale === l && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--primary)]" aria-hidden="true" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
