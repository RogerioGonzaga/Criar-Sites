"use client";

import { useId, useState } from "react";
import { Icone } from "@/components/ui/Icone";
import { perguntas } from "./perguntas";

export function ListaPerguntas() {
  const [aberta, setAberta] = useState<number | null>(0);
  const base = useId();

  return (
    <div className="divide-y divide-tinta/10 rounded-[2rem] border border-tinta/10 bg-white px-5 shadow-suave sm:px-8">
      {perguntas.map((item, i) => {
        const expandida = aberta === i;
        const idBotao = `${base}-p-${i}`;
        const idPainel = `${base}-r-${i}`;
        return (
          <div key={item.pergunta}>
            <h3>
              <button
                id={idBotao}
                type="button"
                aria-expanded={expandida}
                aria-controls={idPainel}
                onClick={() => setAberta(expandida ? null : i)}
                className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left font-titulo text-lg font-semibold tracking-tight text-tinta sm:text-xl"
              >
                <span>{item.pergunta}</span>
                <span
                  aria-hidden="true"
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                    expandida ? "rotate-45 bg-tinta text-destaque" : "bg-nevoa text-tinta group-hover:bg-destaque"
                  }`}
                >
                  <Icone nome="mais" tamanho={18} strokeWidth={2.25} />
                </span>
              </button>
            </h3>
            <div
              id={idPainel}
              role="region"
              aria-labelledby={idBotao}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                expandida ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
              inert={!expandida}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 text-[1.05rem] leading-relaxed text-suave">{item.resposta}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
