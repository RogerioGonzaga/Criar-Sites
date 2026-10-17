"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Erro({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70dvh] items-center px-4 pt-28 pb-20">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="font-titulo text-4xl font-bold tracking-tight">Algo não saiu como esperado</h1>
        <p className="mt-4 text-lg text-suave">
          Ocorreu um erro ao carregar esta página. Tente novamente ou volte ao início.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-tinta px-6 font-semibold text-white"
          >
            Tentar novamente
          </button>
          <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-full border border-tinta/15 px-6 font-semibold">
            Voltar ao início
          </Link>
        </div>
      </div>
    </section>
  );
}
