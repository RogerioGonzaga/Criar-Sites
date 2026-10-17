import { pendenciasConfiguracao } from "@/lib/contato";

/**
 * Lista configurações pendentes. Aparece SOMENTE em desenvolvimento
 * (`npm run dev`) e nunca na versão publicada.
 */
export function AvisoDesenvolvimento() {
  if (process.env.NODE_ENV === "production") return null;
  const pendencias = pendenciasConfiguracao();
  if (pendencias.length === 0) return null;
  return (
    <details className="fixed left-4 bottom-4 z-[60] max-w-[calc(100vw-2rem)] rounded-2xl border border-amber-300 bg-amber-50 text-sm text-amber-950 shadow-elevada sm:max-w-sm">
      <summary className="cursor-pointer px-4 py-3 font-semibold">
        Desenvolvimento: {pendencias.length} configuração(ões) pendente(s)
      </summary>
      <div className="border-t border-amber-200 px-4 py-3">
        <p>Edite src/config/site.ts e o arquivo .env.local. Este aviso não aparece na versão publicada.</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {pendencias.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </details>
  );
}
