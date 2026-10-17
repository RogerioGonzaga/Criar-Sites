"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { enviarOrcamento } from "@/app/acoes/orcamento";
import { siteConfig } from "@/config/site";
import { linkWhatsapp } from "@/lib/contato";
import {
  LIMITE_DESCRICAO,
  lerFormulario,
  mensagemWhatsappOrcamento,
  segmentos,
  validarOrcamento,
  type ErrosOrcamento,
  type EstadoEnvio,
} from "@/lib/orcamento";
import { Icone } from "@/components/ui/Icone";

export type ModoEnvio = "servidor" | "whatsapp" | "indisponivel";

const emailContato = siteConfig.contato.email;

const ordemCampos: (keyof ErrosOrcamento)[] = ["nome", "negocio", "segmento", "whatsapp", "email", "descricao", "consentimento"];

export function FormularioOrcamento({ modo, avisoDesenvolvimento }: { modo: ModoEnvio; avisoDesenvolvimento?: string }) {
  const [estado, acao, enviando] = useActionState<EstadoEnvio, FormData>(enviarOrcamento, { status: "inicial" });
  const [errosLocais, setErrosLocais] = useState<ErrosOrcamento>({});
  const [abriuWhatsapp, setAbriuWhatsapp] = useState(false);
  const [caracteres, setCaracteres] = useState(0);
  const [sucessoDispensado, setSucessoDispensado] = useState<EstadoEnvio | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const sucessoRef = useRef<HTMLDivElement>(null);

  const erros: ErrosOrcamento = estado.status === "invalido" && Object.keys(errosLocais).length === 0 ? estado.erros : errosLocais;

  const mostrarSucesso = estado.status === "sucesso" && estado !== sucessoDispensado;

  useEffect(() => {
    if (mostrarSucesso) sucessoRef.current?.focus();
  }, [mostrarSucesso]);

  useEffect(() => {
    if (estado.status === "invalido") focarPrimeiroErro(estado.erros);
  }, [estado]);

  function focarPrimeiroErro(lista: ErrosOrcamento) {
    const primeiro = ordemCampos.find((c) => lista[c]);
    if (primeiro) formRef.current?.querySelector<HTMLElement>(`[name="${primeiro}"]`)?.focus();
  }

  function aoEnviar(e: FormEvent<HTMLFormElement>) {
    // Com JavaScript ativo, o envio é controlado aqui para manter os campos
    // preenchidos caso ocorra algum erro.
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dados = lerFormulario(formData);
    const novosErros = validarOrcamento(dados);
    setErrosLocais(novosErros);
    if (Object.keys(novosErros).length > 0) {
      focarPrimeiroErro(novosErros);
      return;
    }
    if (modo === "servidor") {
      startTransition(() => acao(formData));
      return;
    }
    if (modo === "whatsapp") {
      const link = linkWhatsapp(mensagemWhatsappOrcamento(dados));
      if (link) {
        window.open(link, "_blank", "noopener,noreferrer");
        setAbriuWhatsapp(true);
      }
    }
  }

  if (mostrarSucesso) {
    return (
      <div
        ref={sucessoRef}
        tabIndex={-1}
        role="status"
        className="rounded-[2rem] border border-tinta/10 bg-white p-8 text-center shadow-suave sm:p-12"
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-destaque text-tinta">
          <Icone nome="check" tamanho={30} strokeWidth={2.5} />
        </span>
        <h3 className="mt-6 font-titulo text-3xl font-bold tracking-tight">Pedido enviado com sucesso!</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-suave">
          Recebemos suas informações. Vamos entrar em contato pelo WhatsApp informado para conversar sobre o seu negócio e
          explicar a proposta.
        </p>
        <button
          type="button"
          onClick={() => {
            setSucessoDispensado(estado);
            setCaracteres(0);
          }}
          className="mt-8 inline-flex min-h-12 items-center rounded-full border border-tinta/15 px-6 font-semibold transition-colors hover:bg-nevoa"
        >
          Enviar outro pedido
        </button>
      </div>
    );
  }

  const desativado = modo === "indisponivel";
  const campo =
    "mt-2 block w-full min-h-12 rounded-2xl border bg-white px-4 py-3 text-base text-tinta shadow-[inset_0_1px_2px_rgb(0_0_0/0.04)] transition-colors placeholder:text-tinta/40 focus:border-tinta focus:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-nevoa";
  const borda = (nome: keyof ErrosOrcamento) => (erros[nome] ? "border-red-600" : "border-tinta/15 hover:border-tinta/30");

  return (
    <form
      ref={formRef}
      action={acao}
      onSubmit={aoEnviar}
      noValidate
      aria-describedby="orcamento-ajuda"
      className="relative rounded-[2rem] border border-tinta/10 bg-white p-6 shadow-suave sm:p-10"
    >
      {desativado && (
        <div role="note" className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-950">
          <p className="font-semibold">O envio de pedidos está temporariamente indisponível.</p>
          {avisoDesenvolvimento ? (
            <p className="mt-1 text-sm">{avisoDesenvolvimento}</p>
          ) : emailContato ? (
            <p className="mt-1 text-sm">
              Enquanto isso, envie seu pedido para{" "}
              <a href={`mailto:${emailContato}`} className="font-semibold underline underline-offset-2">
                {emailContato}
              </a>
              .
            </p>
          ) : (
            <p className="mt-1 text-sm">Por favor, tente novamente mais tarde.</p>
          )}
        </div>
      )}

      <fieldset disabled={desativado || enviando} className="grid gap-6 sm:grid-cols-2">
        <legend className="sr-only">Dados para o orçamento</legend>

        <Campo id="nome" rotulo="Seu nome" erro={erros.nome}>
          <input id="nome" name="nome" type="text" autoComplete="name" required maxLength={80} placeholder="Como podemos chamar você?" aria-invalid={!!erros.nome} aria-describedby={erros.nome ? "nome-erro" : undefined} className={`${campo} ${borda("nome")}`} />
        </Campo>

        <Campo id="negocio" rotulo="Nome do negócio" erro={erros.negocio}>
          <input id="negocio" name="negocio" type="text" autoComplete="organization" required maxLength={100} placeholder="Ex.: Padaria do Bairro" aria-invalid={!!erros.negocio} aria-describedby={erros.negocio ? "negocio-erro" : undefined} className={`${campo} ${borda("negocio")}`} />
        </Campo>

        <Campo id="segmento" rotulo="Segmento de atuação" erro={erros.segmento}>
          <div className="relative">
            <select id="segmento" name="segmento" required defaultValue="" aria-invalid={!!erros.segmento} aria-describedby={erros.segmento ? "segmento-erro" : undefined} className={`${campo} ${borda("segmento")} appearance-none pr-12`}>
              <option value="" disabled>
                Selecione uma opção
              </option>
              {segmentos.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <Icone nome="seta" tamanho={18} className="pointer-events-none absolute top-1/2 right-4 mt-1 -translate-y-1/2 rotate-90 text-suave" />
          </div>
        </Campo>

        <Campo id="whatsapp" rotulo="WhatsApp com DDD" erro={erros.whatsapp}>
          <input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel-national" required maxLength={20} placeholder="(11) 91234-5678" aria-invalid={!!erros.whatsapp} aria-describedby={erros.whatsapp ? "whatsapp-erro" : undefined} className={`${campo} ${borda("whatsapp")}`} />
        </Campo>

        <Campo id="email" rotulo="E-mail" opcional erro={erros.email} className="sm:col-span-2">
          <input id="email" name="email" type="email" autoComplete="email" maxLength={120} placeholder="seuemail@exemplo.com" aria-invalid={!!erros.email} aria-describedby={erros.email ? "email-erro" : undefined} className={`${campo} ${borda("email")}`} />
        </Campo>

        <Campo id="descricao" rotulo="Conte um pouco sobre o projeto" opcional erro={erros.descricao} className="sm:col-span-2">
          <textarea
            id="descricao"
            name="descricao"
            rows={4}
            maxLength={LIMITE_DESCRICAO}
            onChange={(e) => setCaracteres(e.target.value.length)}
            placeholder="O que você gostaria de mostrar no site? Já tem domínio, logotipo ou fotos?"
            aria-invalid={!!erros.descricao}
            aria-describedby={`descricao-contador${erros.descricao ? " descricao-erro" : ""}`}
            className={`${campo} ${borda("descricao")} resize-y`}
          />
          <p id="descricao-contador" className="mt-1.5 text-right text-xs text-suave tabular-nums">
            {caracteres}/{LIMITE_DESCRICAO} caracteres
          </p>
        </Campo>

        {/* Campo-armadilha contra robôs: invisível para pessoas */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="empresa_site">Não preencha este campo</label>
          <input id="empresa_site" name="empresa_site" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-papel p-4">
            <input
              type="checkbox"
              name="consentimento"
              aria-invalid={!!erros.consentimento}
              aria-describedby={erros.consentimento ? "consentimento-erro" : undefined}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-tinta"
            />
            <span className="text-sm leading-relaxed text-tinta/85">
              Autorizo o uso dos meus dados apenas para responder a este pedido de orçamento, conforme a{" "}
              <Link href="/privacidade" className="font-semibold underline underline-offset-2 hover:text-tinta">
                Política de Privacidade
              </Link>
              .
            </span>
          </label>
          {erros.consentimento && <MensagemErro id="consentimento-erro">{erros.consentimento}</MensagemErro>}
        </div>
      </fieldset>

      <div id="orcamento-ajuda" className="mt-8 flex flex-col gap-5 border-t border-tinta/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm leading-relaxed text-suave">
          {modo === "whatsapp"
            ? "Ao continuar, abriremos o WhatsApp com suas informações já preenchidas. É só tocar em enviar."
            : "Depois do envio, entraremos em contato pelo WhatsApp informado para entender seu negócio e apresentar a proposta."}
        </p>
        <button
          type="submit"
          disabled={desativado || enviando}
          className="inline-flex min-h-14 shrink-0 items-center justify-center gap-2.5 rounded-full bg-tinta px-7 whitespace-nowrap text-lg font-semibold text-white transition-all duration-300 hover:bg-grafite disabled:cursor-not-allowed disabled:opacity-60 motion-safe:enabled:hover:-translate-y-0.5"
        >
          {enviando ? (
            <>
              <span aria-hidden="true" className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Enviando...
            </>
          ) : modo === "whatsapp" ? (
            <>
              <Icone nome="whatsapp" tamanho={20} className="text-destaque" />
              Continuar no WhatsApp
            </>
          ) : (
            <>
              Solicitar orçamento
              <Icone nome="seta" tamanho={18} />
            </>
          )}
        </button>
      </div>

      <div aria-live="polite" className="empty:hidden">
        {estado.status === "erro" && !enviando && (
          <p role="alert" className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
            {estado.mensagem}
          </p>
        )}
        {Object.keys(erros).length > 0 && (
          <p className="mt-6 text-sm font-medium text-red-700">Confira os campos destacados antes de continuar.</p>
        )}
        {abriuWhatsapp && Object.keys(erros).length === 0 && (
          <p className="mt-6 rounded-2xl border border-tinta/10 bg-papel p-4 text-sm text-tinta">
            Abrimos o WhatsApp em uma nova aba com sua mensagem pronta. Se ela não abriu, verifique se o navegador bloqueou a
            janela e tente novamente.
          </p>
        )}
      </div>
    </form>
  );
}

function Campo({
  id,
  rotulo,
  opcional = false,
  erro,
  className = "",
  children,
}: {
  id: string;
  rotulo: string;
  opcional?: boolean;
  erro?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-semibold text-tinta">
        {rotulo}
        {opcional ? <span className="font-normal text-suave">Opcional</span> : <span className="sr-only">(obrigatório)</span>}
      </label>
      {children}
      {erro && <MensagemErro id={`${id}-erro`}>{erro}</MensagemErro>}
    </div>
  );
}

function MensagemErro({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-red-700">
      <Icone nome="x" tamanho={15} strokeWidth={2.5} />
      {children}
    </p>
  );
}
