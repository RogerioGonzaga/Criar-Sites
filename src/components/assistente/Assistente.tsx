import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Icone } from "@/components/ui/Icone";
import { montarBaseAssistente } from "@/lib/assistente/base";
import { linkWhatsapp } from "@/lib/contato";
import { AtivarAssistente } from "./AtivarAssistente";

/**
 * Janela de conversa do assistente virtual.
 *
 * A marcação é toda renderizada aqui; o comportamento fica em
 * `src/lib/assistente/widget.ts`. O botão de abrir só aparece quando o
 * JavaScript está ativo, para nunca exibir um botão que não funciona.
 */
export function Assistente() {
  const base = montarBaseAssistente();
  const whatsapp = linkWhatsapp();
  const marca = siteConfig.marca.nome;

  return (
    <div id="assistente" data-base={JSON.stringify(base)} data-api="/api/chat">
      {/* Ícones copiados pelo widget para os botões das mensagens */}
      <span hidden data-icone="whatsapp">
        <Icone nome="whatsapp" tamanho={18} />
      </span>
      <span hidden data-icone="seta">
        <Icone nome="seta" tamanho={16} />
      </span>

      {/* Convite que aparece uma vez por visita */}
      <div
        data-assistente-convite
        hidden
        className="fixed right-4 bottom-[5.25rem] z-40 w-[min(19rem,calc(100vw-2rem))] rounded-3xl rounded-br-md border border-linha bg-white p-4 pr-10 shadow-elevada sm:right-6 sm:bottom-24"
      >
        <button type="button" data-assistente-convite-abrir className="text-left">
          <span className="block font-titulo font-semibold text-tinta">Ficou com alguma dúvida?</span>
          <span className="mt-1 block text-sm text-suave">Pergunte aqui sobre valores, domínio, prazos ou como funciona.</span>
        </button>
        <button
          type="button"
          data-assistente-convite-fechar
          aria-label="Dispensar convite"
          className="absolute top-2 right-2 grid h-9 w-9 place-items-center rounded-full text-suave hover:bg-nevoa hover:text-tinta"
        >
          <Icone nome="x" tamanho={16} />
        </button>
      </div>

      <button
        type="button"
        data-assistente-abrir
        hidden
        aria-expanded="false"
        aria-controls="assistente-janela"
        className="fixed right-4 bottom-4 z-40 inline-flex min-h-14 items-center gap-2.5 rounded-full bg-tinta p-2 font-semibold text-white shadow-elevada transition-transform duration-300 hover:-translate-y-0.5 sm:right-6 sm:bottom-6 sm:pr-5"
      >
        <span className="relative grid h-10 w-10 place-items-center rounded-full bg-destaque text-tinta">
          <Icone nome="conversa" tamanho={20} />
          <span aria-hidden="true" className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-tinta bg-[#3ddc84]" />
        </span>
        <span className="sr-only sm:not-sr-only">Tire suas dúvidas</span>
      </button>

      <section
        id="assistente-janela"
        data-assistente-janela
        hidden
        role="dialog"
        aria-labelledby="assistente-titulo"
        className="fixed inset-0 z-[70] flex flex-col overflow-hidden bg-papel sm:inset-auto sm:right-6 sm:bottom-6 sm:h-[min(44rem,calc(100dvh-3rem))] sm:w-[25.5rem] sm:rounded-[1.75rem] sm:border sm:border-tinta/10 sm:shadow-elevada"
      >
        <header className="flex items-center gap-3 bg-tinta px-4 py-3.5 text-white">
          <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-destaque text-tinta">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6l8 13 8-13" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="assistente-titulo" data-assistente-titulo tabIndex={-1} className="font-titulo text-lg leading-tight font-semibold outline-none">
              Assistente {marca}
            </h2>
            <p className="flex items-center gap-1.5 text-sm text-white/70">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#3ddc84]" />
              Responde na hora
            </p>
          </div>
          <button
            type="button"
            data-assistente-recomecar
            aria-label="Começar uma nova conversa"
            title="Nova conversa"
            className="grid h-11 w-11 place-items-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Icone nome="recomecar" tamanho={20} />
          </button>
          <button
            type="button"
            data-assistente-fechar
            aria-label="Fechar conversa"
            className="grid h-11 w-11 place-items-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Icone nome="x" tamanho={22} />
          </button>
        </header>

        <div
          data-assistente-mensagens
          role="log"
          aria-live="polite"
          aria-label="Conversa com o assistente"
          className="flex flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-4 py-5"
        />

        <div data-assistente-sugestoes className="flex flex-wrap gap-2 px-4 pb-3 empty:hidden" aria-label="Sugestões de perguntas" />

        <div className="border-t border-tinta/10 bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <form data-assistente-form className="flex items-end gap-2 rounded-3xl border border-tinta/15 bg-papel p-1.5 pl-4 focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-[#2f6bff] focus-within:outline-solid">
            <label htmlFor="assistente-campo" className="sr-only">
              Escreva sua dúvida
            </label>
            <textarea
              id="assistente-campo"
              data-assistente-campo
              rows={1}
              maxLength={600}
              placeholder="Escreva sua dúvida…"
              className="max-h-33 min-h-10 flex-1 resize-none bg-transparent py-2 text-base text-tinta outline-none placeholder:text-suave/80 focus-visible:outline-none"
            />
            <button
              type="submit"
              data-assistente-enviar
              aria-label="Enviar mensagem"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-tinta text-destaque transition-opacity disabled:opacity-40"
            >
              <Icone nome="enviar" tamanho={20} />
            </button>
          </form>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-assistente-whatsapp
                className="inline-flex min-h-9 items-center gap-1.5 font-semibold text-[#128c4a] hover:underline"
              >
                <Icone nome="whatsapp" tamanho={17} />
                Falar no WhatsApp
              </a>
            )}
            <Link href="/#orcamento" data-assistente-orcamento className="inline-flex min-h-9 items-center gap-1 font-semibold text-tinta hover:underline">
              Pedir orçamento
              <Icone nome="seta" tamanho={15} />
            </Link>
          </div>
          <p className="mt-1 text-xs leading-snug text-suave">
            Assistente automático. Valores e condições finais vêm sempre na proposta.{" "}
            <Link href="/privacidade" className="underline underline-offset-2 hover:text-tinta">
              Privacidade
            </Link>
          </p>
        </div>
      </section>

      <AtivarAssistente />
    </div>
  );
}
