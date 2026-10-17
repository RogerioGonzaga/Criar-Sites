import { normalizar, responderLocalmente, sugestoesIniciais } from "./respostasLocais";
import type { BaseAssistente, Mensagem } from "./tipos";

/**
 * Comportamento da janela de conversa.
 *
 * Escrito sem React de propósito: o mesmo código roda no site publicado
 * (ativado por <AtivarAssistente />) e na versão estática para abrir no
 * computador, que não tem servidor nem React. A marcação vem pronta do
 * componente <Assistente />; aqui só tratamos eventos e mensagens.
 */

type Segmento = { rotulo: string; demo: string } | null;
type Registro = Mensagem & { links?: { rotulo: string; href: string }[]; convite?: boolean };
type Estado = { mensagens: Registro[]; segmento: Segmento };

const CHAVE_CONVERSA = "assistente-conversa-v1";
const CHAVE_CONVITE = "assistente-convite-v1";
/** Marca enviada pela rota da IA quando a resposta não pôde ser concluída. */
const MARCA_ERRO = "\u0000";
const ESPERA_CONVITE_MS = 25_000;

function ler<T>(chave: string): T | null {
  try {
    const valor = sessionStorage.getItem(chave);
    return valor ? (JSON.parse(valor) as T) : null;
  } catch {
    return null;
  }
}

function gravar(chave: string, valor: unknown) {
  try {
    sessionStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    // Navegação privada ou armazenamento bloqueado: a conversa só não é lembrada.
  }
}

/** Remove a formatação em markdown que a IA eventualmente use. */
function limparTexto(texto: string) {
  return texto
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/^\s*[-*]\s+/gm, "• ");
}

function elemento<K extends keyof HTMLElementTagNameMap>(tag: K, classe: string, texto?: string) {
  const el = document.createElement(tag);
  el.className = classe;
  if (texto !== undefined) el.textContent = texto;
  return el;
}

export function montarAssistente(raiz: HTMLElement) {
  if (raiz.dataset.ativo === "true") return;
  raiz.dataset.ativo = "true";

  const base = JSON.parse(raiz.dataset.base || "{}") as BaseAssistente;
  const $ = <T extends Element>(seletor: string) => raiz.querySelector<T>(seletor)!;
  const janela = $<HTMLElement>("[data-assistente-janela]");
  const abrir = $<HTMLButtonElement>("[data-assistente-abrir]");
  const convite = $<HTMLElement>("[data-assistente-convite]");
  const lista = $<HTMLElement>("[data-assistente-mensagens]");
  const sugestoes = $<HTMLElement>("[data-assistente-sugestoes]");
  const form = $<HTMLFormElement>("[data-assistente-form]");
  const campo = $<HTMLTextAreaElement>("[data-assistente-campo]");
  const enviar = $<HTMLButtonElement>("[data-assistente-enviar]");
  const whatsappRodape = raiz.querySelector<HTMLAnchorElement>("[data-assistente-whatsapp]");
  const icone = (nome: string) =>
    raiz.querySelector(`[data-icone="${nome}"] > svg`)?.cloneNode(true) ?? document.createDocumentFragment();

  // Sem servidor (arquivo aberto direto no computador) só há respostas programadas.
  let usarIa = Boolean(raiz.dataset.api) && location.protocol !== "file:";
  let iaVerificada = false;
  let ocupado = false;
  const estado: Estado = ler<Estado>(CHAVE_CONVERSA) ?? { mensagens: [], segmento: null };

  const telaPequena = () => window.matchMedia("(max-width: 639px)").matches;
  const semMovimento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function linkWhatsapp() {
    if (!base.whatsapp) return null;
    const mensagem = estado.segmento
      ? `Olá! Conversei com o assistente do site e quero um site profissional para o meu negócio (${estado.segmento.rotulo}). Quero saber como funciona, quais são os valores e o que está incluído no projeto.`
      : base.mensagemWhatsapp;
    return `${base.whatsapp}?text=${encodeURIComponent(mensagem)}`;
  }

  function atualizarWhatsapp() {
    const href = linkWhatsapp();
    if (whatsappRodape && href) whatsappRodape.href = href;
  }

  function rolarParaFim() {
    lista.scrollTo({ top: lista.scrollHeight, behavior: semMovimento() ? "auto" : "smooth" });
  }

  function botaoConvite() {
    const href = linkWhatsapp();
    const a = elemento(
      "a",
      "mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-tinta px-4 text-sm font-semibold text-white transition-colors hover:bg-grafite",
    );
    if (href) {
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.append(icone("whatsapp"), "Falar com a equipe no WhatsApp");
      a.setAttribute("aria-label", "Falar com a equipe no WhatsApp (abre em uma nova aba)");
    } else {
      a.href = base.rotas.orcamento;
      a.append("Pedir meu orçamento", icone("seta"));
      a.addEventListener("click", () => fechar(false));
    }
    return a;
  }

  function desenharMensagem(m: Registro) {
    const visitante = m.papel === "visitante";
    const linha = elemento("div", visitante ? "flex justify-end" : "flex justify-start");
    const balao = elemento(
      "div",
      visitante
        ? "max-w-[85%] rounded-3xl rounded-br-md bg-tinta px-4 py-3 text-[0.9375rem] leading-relaxed whitespace-pre-line text-white"
        : "max-w-[88%] rounded-3xl rounded-bl-md border border-linha bg-white px-4 py-3 text-[0.9375rem] leading-relaxed whitespace-pre-line text-tinta shadow-suave",
    );
    balao.append(elemento("span", "sr-only", visitante ? "Você: " : "Assistente: "));
    const texto = elemento("p", "", m.texto);
    balao.append(texto);
    if (m.links?.length) {
      const caixa = elemento("div", "mt-3 flex flex-wrap gap-2");
      for (const l of m.links) {
        const a = elemento(
          "a",
          "inline-flex min-h-10 items-center gap-1.5 rounded-full border border-tinta/15 bg-nevoa px-3.5 text-sm font-semibold text-tinta transition-colors hover:border-tinta/40",
          l.rotulo,
        );
        a.href = l.href;
        if (l.href.includes("#")) a.addEventListener("click", () => fechar(false));
        caixa.append(a);
      }
      balao.append(caixa);
    }
    // Sem WhatsApp o convite levaria ao mesmo lugar que o atalho de orçamento.
    const repetiria = !base.whatsapp && m.links?.some((l) => l.href === base.rotas.orcamento);
    if (m.convite && !repetiria) balao.append(botaoConvite());
    linha.append(balao);
    lista.append(linha);
    return texto;
  }

  function desenharSugestoes(itens: string[]) {
    sugestoes.replaceChildren();
    for (const s of itens) {
      const b = elemento(
        "button",
        "min-h-10 rounded-full border border-tinta/15 bg-white px-3.5 text-sm font-medium text-tinta transition-colors hover:border-tinta hover:bg-destaque/40",
        s,
      );
      b.type = "button";
      b.addEventListener("click", () => perguntar(s));
      sugestoes.append(b);
    }
  }

  function digitando() {
    const linha = elemento("div", "flex justify-start");
    linha.setAttribute("aria-label", "O assistente está escrevendo");
    linha.setAttribute("role", "status");
    const balao = elemento("div", "flex gap-1.5 rounded-3xl rounded-bl-md border border-linha bg-white px-4 py-4 shadow-suave");
    for (let i = 0; i < 3; i++) {
      const ponto = elemento("span", "h-2 w-2 animate-bounce rounded-full bg-tinta/40");
      ponto.style.animationDelay = `${i * 140}ms`;
      balao.append(ponto);
    }
    linha.append(balao);
    lista.append(linha);
    rolarParaFim();
    return linha;
  }

  function salvar() {
    gravar(CHAVE_CONVERSA, { ...estado, mensagens: estado.mensagens.slice(-40) });
  }

  function boasVindas() {
    const m: Registro = {
      papel: "assistente",
      texto:
        `Oi! Eu sou o assistente virtual da ${base.marca}. Posso te explicar como funciona a criação do seu site, o que está incluído e quais custos existem depois.\n\n` +
        "Para começar, me conta: qual é o seu negócio?",
    };
    estado.mensagens.push(m);
    desenharMensagem(m);
    desenharSugestoes(sugestoesIniciais);
    salvar();
  }

  /** Pede a resposta à IA. Retorna false quando não deu certo e a resposta programada deve ser usada. */
  async function responderComIa(indicador: HTMLElement, registro: Registro): Promise<boolean> {
    let resposta: Response;
    try {
      resposta = await fetch(raiz.dataset.api!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagens: estado.mensagens.map(({ papel, texto }) => ({ papel, texto })) }),
      });
    } catch {
      usarIa = false;
      return false;
    }
    if (resposta.status === 503 || resposta.status === 404) usarIa = false;
    if (!resposta.ok || !resposta.body) return false;

    indicador.remove();
    const paragrafo = desenharMensagem(registro);
    const leitor = resposta.body.getReader();
    const decodificador = new TextDecoder();
    let bruto = "";
    try {
      for (;;) {
        const { value, done } = await leitor.read();
        if (done) break;
        bruto += decodificador.decode(value, { stream: true });
        paragrafo.textContent = limparTexto(bruto.replace(MARCA_ERRO, ""));
        rolarParaFim();
      }
    } catch {
      bruto += MARCA_ERRO;
    }
    const texto = limparTexto(bruto.replace(MARCA_ERRO, "")).trim();
    if (!texto) {
      paragrafo.closest(".flex")?.remove();
      return false;
    }
    registro.texto = bruto.includes(MARCA_ERRO) ? texto + "…" : texto;
    paragrafo.textContent = registro.texto;
    return true;
  }

  async function perguntar(pergunta: string) {
    const texto = pergunta.trim().slice(0, 600);
    if (!texto || ocupado) return;
    ocupado = true;
    enviar.disabled = true;
    sugestoes.replaceChildren();

    const doVisitante: Registro = { papel: "visitante", texto };
    estado.mensagens.push(doVisitante);
    desenharMensagem(doVisitante);
    campo.value = "";
    ajustarAltura();

    const local = responderLocalmente(texto, base, estado.segmento);
    estado.segmento = local.segmento;
    atualizarWhatsapp();
    const indicador = digitando();

    const registro: Registro = { papel: "assistente", texto: "" };
    let respondeuIa = false;
    if (usarIa && !iaVerificada) {
      // Confirma uma vez se a IA está ligada no servidor antes de usá-la.
      iaVerificada = true;
      try {
        const situacao = await fetch(raiz.dataset.api!).then((r) => r.json());
        usarIa = situacao?.ativo === true;
      } catch {
        usarIa = false;
      }
    }
    if (usarIa) respondeuIa = await responderComIa(indicador, registro);

    if (!respondeuIa) {
      // Pequena pausa para a resposta programada não aparecer de forma brusca.
      await new Promise((r) => setTimeout(r, semMovimento() ? 150 : 650));
      indicador.remove();
      registro.texto = local.texto;
      registro.links = local.links;
      registro.convite = local.convite;
      desenharMensagem(registro);
    } else if (local.reconhecida) {
      // A IA escreve o texto; os atalhos seguem o assunto da pergunta.
      registro.links = local.links;
      registro.convite = local.convite;
      const ultimo = lista.lastElementChild!;
      ultimo.remove();
      desenharMensagem(registro);
    }
    estado.mensagens.push(registro);
    salvar();
    desenharSugestoes(local.sugestoes);
    rolarParaFim();
    ocupado = false;
    enviar.disabled = false;
    if (!telaPequena()) campo.focus();
  }

  function ajustarAltura() {
    campo.style.height = "auto";
    campo.style.height = Math.min(campo.scrollHeight, 132) + "px";
  }

  function abrirJanela() {
    janela.hidden = false;
    abrir.hidden = true;
    convite.hidden = true;
    abrir.setAttribute("aria-expanded", "true");
    gravar(CHAVE_CONVITE, true);
    if (telaPequena()) document.documentElement.style.overflow = "hidden";
    if (!estado.mensagens.length) boasVindas();
    rolarParaFim();
    if (telaPequena()) $<HTMLElement>("[data-assistente-titulo]").focus();
    else campo.focus();
  }

  function fechar(devolverFoco = true) {
    janela.hidden = true;
    abrir.hidden = false;
    abrir.setAttribute("aria-expanded", "false");
    document.documentElement.style.overflow = "";
    if (devolverFoco) abrir.focus();
  }

  function recomecar() {
    estado.mensagens = [];
    estado.segmento = null;
    lista.replaceChildren();
    atualizarWhatsapp();
    boasVindas();
    campo.focus();
  }

  // Conversa anterior (o visitante pode ter navegado para outra página).
  for (const m of estado.mensagens) desenharMensagem(m);
  if (estado.mensagens.length) {
    const ultima = estado.mensagens.at(-1)!;
    desenharSugestoes(
      ultima.papel === "assistente" ? responderLocalmente(estado.mensagens.at(-2)?.texto ?? "", base, estado.segmento).sugestoes : sugestoesIniciais,
    );
  }
  atualizarWhatsapp();

  // Os botões de abrir só aparecem quando já funcionam.
  abrir.hidden = false;
  document.querySelectorAll<HTMLElement>("[data-abrir-assistente]").forEach((b) => (b.hidden = false));

  abrir.addEventListener("click", abrirJanela);
  $<HTMLButtonElement>("[data-assistente-fechar]").addEventListener("click", () => fechar());
  $<HTMLButtonElement>("[data-assistente-recomecar]").addEventListener("click", recomecar);
  $<HTMLButtonElement>("[data-assistente-convite-abrir]").addEventListener("click", abrirJanela);
  $<HTMLButtonElement>("[data-assistente-convite-fechar]").addEventListener("click", () => {
    convite.hidden = true;
    gravar(CHAVE_CONVITE, true);
  });
  raiz.querySelector("[data-assistente-orcamento]")?.addEventListener("click", () => fechar(false));
  janela.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fechar();
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    perguntar(campo.value);
  });
  campo.addEventListener("input", ajustarAltura);
  campo.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      perguntar(campo.value);
    }
  });

  // Convite discreto, uma vez por visita, para quem ainda não abriu a conversa.
  if (!ler<boolean>(CHAVE_CONVITE) && !estado.mensagens.length) {
    window.setTimeout(() => {
      if (janela.hidden && !ler<boolean>(CHAVE_CONVITE)) convite.hidden = false;
    }, ESPERA_CONVITE_MS);
  }

  // Outros botões do site podem abrir a conversa com uma pergunta pronta.
  document.addEventListener("click", (e) => {
    const gatilho = (e.target as Element | null)?.closest<HTMLElement>("[data-abrir-assistente]");
    if (!gatilho) return;
    e.preventDefault();
    if (janela.hidden) abrirJanela();
    const pergunta = gatilho.dataset.abrirAssistente;
    if (pergunta && normalizar(pergunta).trim()) perguntar(pergunta);
  });
}
