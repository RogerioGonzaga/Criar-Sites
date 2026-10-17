import Anthropic from "@anthropic-ai/sdk";
import { connection } from "next/server";
import { montarBaseAssistente } from "@/lib/assistente/base";
import { instrucoesAssistente } from "@/lib/assistente/instrucoes";

/**
 * Assistente virtual com IA (Claude, da Anthropic).
 *
 * Só funciona com ANTHROPIC_API_KEY definida no servidor. Sem ela, a rota
 * informa que está desligada e a janela de conversa usa as respostas
 * programadas, então o visitante nunca fica sem resposta. A chave nunca
 * chega ao navegador.
 */

const MODELO = process.env.ASSISTENTE_MODELO || "claude-opus-5-5";
const LIMITE_MENSAGENS = 16;
const LIMITE_VISITANTE = 600;
const LIMITE_ASSISTENTE = 2500;
/** Proteção simples contra abuso: pedidos por IP em uma janela de tempo. */
const PEDIDOS_POR_JANELA = 20;
const JANELA_MS = 10 * 60 * 1000;
/** Marca enviada no fim do texto quando a IA falha no meio da resposta. */
const MARCA_ERRO = "\u0000";

const pedidosPorIp = new Map<string, number[]>();

function excedeuLimite(ip: string) {
  const agora = Date.now();
  const recentes = (pedidosPorIp.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  recentes.push(agora);
  pedidosPorIp.set(ip, recentes);
  if (pedidosPorIp.size > 5000) pedidosPorIp.clear();
  return recentes.length > PEDIDOS_POR_JANELA;
}

type Entrada = { papel: "visitante" | "assistente"; texto: string };

function lerConversa(corpo: unknown): Anthropic.Beta.Messages.BetaMessageParam[] | null {
  const mensagens = (corpo as { mensagens?: unknown })?.mensagens;
  if (!Array.isArray(mensagens) || mensagens.length === 0) return null;
  const recentes = mensagens.slice(-LIMITE_MENSAGENS) as Entrada[];
  // A conversa enviada à IA precisa começar pelo visitante.
  while (recentes.length && recentes[0]?.papel !== "visitante") recentes.shift();

  const conversa: Anthropic.Beta.Messages.BetaMessageParam[] = [];
  for (const m of recentes) {
    if (!m || typeof m.texto !== "string" || (m.papel !== "visitante" && m.papel !== "assistente")) return null;
    const texto = m.texto.trim();
    const limite = m.papel === "visitante" ? LIMITE_VISITANTE : LIMITE_ASSISTENTE;
    if (!texto || texto.length > limite) return null;
    const role = m.papel === "visitante" ? "user" : "assistant";
    const anterior = conversa.at(-1);
    // Junta mensagens seguidas do mesmo lado (a API exige alternância).
    if (anterior && anterior.role === role) anterior.content += "\n\n" + texto;
    else conversa.push({ role, content: texto });
  }
  return conversa.length && conversa.at(-1)!.role === "user" ? conversa : null;
}

function json(dados: object, status: number) {
  return Response.json(dados, { status, headers: { "Cache-Control": "no-store" } });
}

/** Informa à janela de conversa se a IA está ligada. */
export async function GET() {
  // Lido a cada pedido (e não no build), para valer assim que a chave for configurada.
  await connection();
  return json({ ativo: Boolean(process.env.ANTHROPIC_API_KEY) }, 200);
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) return json({ erro: "indisponivel" }, 503);

  // Aceita apenas pedidos feitos a partir do próprio site.
  const origem = request.headers.get("origin");
  if (origem && new URL(origem).host !== request.headers.get("host")) return json({ erro: "origem" }, 403);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (excedeuLimite(ip)) return json({ erro: "limite" }, 429);

  const conversa = lerConversa(await request.json().catch(() => null));
  if (!conversa) return json({ erro: "conversa" }, 400);

  const client = new Anthropic();
  const stream = client.beta.messages.stream({
    model: MODELO,
    max_tokens: 4000,
    system: instrucoesAssistente(montarBaseAssistente()),
    messages: conversa,
    output_config: { effort: "low" },
    cache_control: { type: "ephemeral" },
    // Se o modelo recusar por política, a própria API tenta o modelo reserva.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
  });

  const eventos = stream[Symbol.asyncIterator]();
  const codificador = new TextEncoder();

  // Espera o primeiro trecho de texto antes de responder, para que falhas
  // da API (chave inválida, limite, indisponibilidade) virem um erro HTTP
  // e a janela de conversa use as respostas programadas.
  let primeiro: string | null = null;
  try {
    while (primeiro === null) {
      const { value, done } = await eventos.next();
      if (done) break;
      if (value.type === "content_block_delta" && value.delta.type === "text_delta") primeiro = value.delta.text;
    }
  } catch (erro) {
    console.error("Assistente: falha ao chamar a IA.", erro instanceof Anthropic.APIError ? erro.status : erro);
    return json({ erro: "ia" }, 502);
  }
  if (primeiro === null) return json({ erro: "vazio" }, 502);

  const corpo = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(codificador.encode(primeiro!));
    },
    async pull(controller) {
      try {
        // Avança até o próximo trecho de texto (ou o fim), sempre entregando algo.
        for (;;) {
          const { value, done } = await eventos.next();
          if (done) {
            const final = await stream.finalMessage();
            if (final.stop_reason === "refusal") controller.enqueue(codificador.encode(MARCA_ERRO));
            controller.close();
            return;
          }
          if (value.type === "content_block_delta" && value.delta.type === "text_delta") {
            controller.enqueue(codificador.encode(value.delta.text));
            return;
          }
        }
      } catch (erro) {
        console.error("Assistente: resposta da IA interrompida.", erro instanceof Anthropic.APIError ? erro.status : erro);
        controller.enqueue(codificador.encode(MARCA_ERRO));
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(corpo, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}
