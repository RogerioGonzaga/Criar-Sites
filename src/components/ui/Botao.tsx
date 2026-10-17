import Link from "next/link";
import type { ReactNode } from "react";

type Variante = "destaque" | "escuro" | "contorno" | "contornoClaro" | "claro";

const estilos: Record<Variante, string> = {
  destaque:
    "bg-destaque text-tinta hover:bg-[#d6ff52] shadow-[0_10px_30px_-10px_rgb(160_210_20/0.8)] hover:shadow-[0_14px_36px_-10px_rgb(160_210_20/0.9)]",
  escuro: "bg-tinta text-white hover:bg-grafite shadow-suave",
  contorno: "border border-tinta/15 bg-white/70 text-tinta hover:border-tinta/40 hover:bg-white",
  contornoClaro: "border border-white/20 text-white hover:border-white/50 hover:bg-white/5",
  claro: "bg-white text-tinta hover:bg-nevoa shadow-suave",
};

type Props = {
  href: string;
  children: ReactNode;
  variante?: Variante;
  externo?: boolean;
  tamanho?: "md" | "lg";
  className?: string;
  ariaLabel?: string;
};

export function Botao({ href, children, variante = "destaque", externo = false, tamanho = "md", className = "", ariaLabel }: Props) {
  const classes = `group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-300 ease-out active:scale-[0.98] motion-safe:hover:-translate-y-0.5 ${
    tamanho === "lg" ? "px-7 py-4 text-base sm:text-lg" : "px-5 py-3 text-[0.95rem]"
  } ${estilos[variante]} ${className}`;

  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
