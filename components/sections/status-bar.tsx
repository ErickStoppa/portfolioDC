"use client";

import { Clock, MapPin, Globe } from "lucide-react";

export function StatusBar() {
  return (
    <div className="bg-[var(--bg-secondary)] border-y border-[var(--border)] py-3 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="overflow-x-auto flex gap-3 flex-nowrap">
          <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] bg-[var(--bg-card)] border border-[var(--border)] px-3 py-1.5 rounded-full shrink-0">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            Disponível para projetos — Jun 2026
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] bg-[var(--bg-card)] border border-[var(--border)] px-3 py-1.5 rounded-full shrink-0">
            <Clock size={13} aria-hidden="true" />
            Resposta em &lt; 48h
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] bg-[var(--bg-card)] border border-[var(--border)] px-3 py-1.5 rounded-full shrink-0">
            <MapPin size={13} aria-hidden="true" />
            São Paulo, BR · Remoto
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] bg-[var(--bg-card)] border border-[var(--border)] px-3 py-1.5 rounded-full shrink-0">
            <Globe size={13} aria-hidden="true" />
            PT · EN · ES
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] shrink-0">
          <span>Quer ver o código por trás das demos?</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] hover:underline"
          >
            Ver no GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}
