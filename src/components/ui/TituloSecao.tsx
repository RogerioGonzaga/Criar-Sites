import type { ReactNode } from "react";
import { Revelar } from "./Revelar";

type Props = {
  rotulo: string;
  titulo: ReactNode;
  subtitulo?: ReactNode;
  id?: string;
  escuro?: boolean;
  centralizado?: boolean;
};

export function TituloSecao({ rotulo, titulo, subtitulo, id, escuro = false, centralizado = false }: Props) {
  return (
    <Revelar className={`max-w-3xl ${centralizado ? "mx-auto text-center" : ""}`}>
      <p
        className={`inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase ${
          escuro ? "text-destaque" : "text-suave"
        }`}
      >
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-destaque ring-4 ring-destaque/25" />
        {rotulo}
      </p>
      <h2
        id={id}
        className={`texto-equilibrado mt-4 font-titulo text-4xl leading-[1.04] font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] ${
          escuro ? "text-white" : "text-tinta"
        }`}
      >
        {titulo}
      </h2>
      {subtitulo && (
        <p className={`mt-5 text-lg leading-relaxed sm:text-xl ${escuro ? "text-white/70" : "text-suave"}`}>{subtitulo}</p>
      )}
    </Revelar>
  );
}
