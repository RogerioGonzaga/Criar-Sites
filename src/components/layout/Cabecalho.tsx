"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { destinoContratacao } from "@/lib/contato";
import { Icone } from "@/components/ui/Icone";
import { Logo } from "./Logo";
import { linksNavegacao } from "./navegacao";

export function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);
  const destino = destinoContratacao();

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 12);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    painelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        botaoRef.current?.focus();
      }
      if (e.key === "Tab" && painelRef.current) {
        const focaveis = [botaoRef.current, ...painelRef.current.querySelectorAll<HTMLElement>("a")].filter(
          Boolean,
        ) as HTMLElement[];
        const primeiro = focaveis[0];
        const ultimo = focaveis[focaveis.length - 1];
        if (e.shiftKey && document.activeElement === primeiro) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primeiro.focus();
        }
      }
    };
    const aoRedimensionar = () => window.innerWidth >= 1024 && setAberto(false);
    document.addEventListener("keydown", aoTeclar);
    window.addEventListener("resize", aoRedimensionar);
    return () => {
      document.body.style.overflow = anterior;
      document.removeEventListener("keydown", aoTeclar);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, [aberto]);

  const fechar = () => setAberto(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        rolou || aberto
          ? "border-b border-tinta/[0.06] bg-papel/85 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {linksNavegacao.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-[0.94rem] font-medium text-tinta/75 transition-colors hover:bg-tinta/[0.05] hover:text-tinta"
                >
                  {link.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={destino.href}
            {...(destino.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="hidden min-h-11 items-center gap-2 rounded-full bg-tinta px-5 text-[0.94rem] font-semibold text-white transition-all duration-300 hover:bg-grafite motion-safe:hover:-translate-y-0.5 sm:inline-flex"
          >
            {destino.externo && <Icone nome="whatsapp" tamanho={18} className="text-destaque" />}
            Quero meu site
          </a>
          <button
            ref={botaoRef}
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-celular"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="grid h-11 w-11 place-items-center rounded-full border border-tinta/10 bg-white/80 text-tinta transition-colors hover:bg-white lg:hidden"
          >
            <Icone nome={aberto ? "x" : "menu"} tamanho={22} />
          </button>
        </div>
      </div>

      <div
        id="menu-celular"
        ref={painelRef}
        hidden={!aberto}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-tinta/[0.06] bg-papel lg:hidden"
      >
        <nav aria-label="Navegação para celular" className="px-4 pt-4 pb-10 sm:px-6">
          <ul className="divide-y divide-tinta/[0.07]">
            {linksNavegacao.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={fechar}
                  className="flex items-center justify-between py-4 font-titulo text-2xl font-semibold tracking-tight text-tinta"
                >
                  <span>
                    <span className="mr-3 align-middle font-sans text-xs font-medium text-suave tabular-nums">0{i + 1}</span>
                    {link.rotulo}
                  </span>
                  <Icone nome="seta" tamanho={20} className="text-suave" />
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={destino.href}
            onClick={fechar}
            {...(destino.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="mt-8 flex min-h-14 items-center justify-center gap-2 rounded-full bg-destaque px-6 text-lg font-semibold text-tinta"
          >
            {destino.externo && <Icone nome="whatsapp" tamanho={20} />}
            Quero meu site
          </a>
          <p className="mt-4 text-center text-sm text-suave">Pagamento único pela criação. Condições claras desde o início.</p>
        </nav>
      </div>
    </header>
  );
}
