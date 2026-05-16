import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 text-center">
      <p
        className="text-8xl font-black gradient-text-primary mb-4"
        style={{ fontFamily: "var(--font-outfit)" }}
        aria-hidden="true"
      >
        404
      </p>
      <h1 className="text-2xl font-bold text-[var(--text)] mb-3">Página não encontrada</h1>
      <p className="text-[var(--text-muted)] mb-8 max-w-sm">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Button asChild>
        <Link href="/">Ir para o Início</Link>
      </Button>
    </div>
  );
}
