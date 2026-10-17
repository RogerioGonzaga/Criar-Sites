import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo({ claro = false, className = "" }: { claro?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.marca.nome}: voltar ao início`}
      className={`group inline-flex items-center gap-2 font-titulo text-[1.6rem] leading-none font-extrabold tracking-[-0.04em] ${
        claro ? "text-white" : "text-tinta"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`grid h-8 w-8 place-items-center rounded-[10px] transition-transform duration-500 group-hover:rotate-[8deg] ${
          claro ? "bg-destaque text-tinta" : "bg-tinta text-destaque"
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6l8 13 8-13" />
        </svg>
      </span>
      <span>
        {siteConfig.marca.logotipo}
        <span className="text-destaque-escuro">.</span>
      </span>
    </Link>
  );
}
