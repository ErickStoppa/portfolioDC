"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 text-center">
      <p
        className="text-8xl font-black gradient-text-primary mb-4"
        style={{ fontFamily: "var(--font-outfit)" }}
        aria-hidden="true"
      >
        404
      </p>
      <h1 className="text-2xl font-bold text-[var(--text)] mb-3">{t("notFound", "title")}</h1>
      <p className="text-[var(--text-muted)] mb-8 max-w-sm">
        {t("notFound", "sub")}
      </p>
      <Button asChild>
        <Link href="/">{t("notFound", "goHome")}</Link>
      </Button>
    </div>
  );
}
