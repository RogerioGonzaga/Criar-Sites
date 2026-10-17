"use client";

import { useId, useRef, type CSSProperties, type ReactNode } from "react";
import { destinoContratacao, mensagemDemonstracao } from "@/lib/contato";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  segmento: string;
  /** O que o botão faria no site real. Ex.: "abre o WhatsApp da barbearia para agendar". */
  acaoReal: string;
};

/**
 * Botão de ação dentro de uma demonstração. Como o negócio é fictício,
 * ele explica o que aconteceria no site real em vez de abrir um link falso.
 */
export function AcaoDemo({ children, className = "", style, segmento, acaoReal }: Props) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const idTitulo = useId();
  const destino = destinoContratacao(mensagemDemonstracao(segmento));

  return (
    <>
      <button type="button" className={className} style={style} onClick={() => dialogo.current?.showModal()}>
        {children}
      </button>
      <dialog
        ref={dialogo}
        aria-labelledby={idTitulo}
        onClick={(e) => e.target === dialogo.current && dialogo.current?.close()}
        className="m-auto w-[min(92vw,28rem)] rounded-3xl bg-white p-0 font-sans text-[#0d100e] shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="p-7">
          <p className="inline-block rounded-full bg-[#c8f53c] px-3 py-1 text-xs font-semibold">Demonstração</p>
          <h2 id={idTitulo} className="mt-4 text-2xl font-bold tracking-tight">
            Este botão funcionaria no seu site
          </h2>
          <p className="mt-3 leading-relaxed text-[#545a53]">
            Esta página é uma demonstração conceitual. No site do seu negócio, este botão {acaoReal}.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={destino.href}
              {...(destino.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => dialogo.current?.close()}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#0d100e] px-5 font-semibold text-white"
            >
              Quero um site assim
            </a>
            <button
              type="button"
              onClick={() => dialogo.current?.close()}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/15 px-5 font-semibold"
            >
              Continuar vendo
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
