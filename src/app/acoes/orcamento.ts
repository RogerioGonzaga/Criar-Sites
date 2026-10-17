"use server";

import { siteConfig } from "@/config/site";
import { lerFormulario, validarOrcamento, type EstadoEnvio } from "@/lib/orcamento";

const ERRO_GENERICO =
  "Não conseguimos enviar seu pedido agora. Tente novamente em alguns instantes ou fale conosco por outro canal.";

/**
 * Envia o pedido de orçamento para o serviço configurado nas variáveis de
 * ambiente do servidor (nunca expostas ao navegador):
 *
 * 1. FORM_WEBHOOK_URL: recebe um POST em JSON (Formspree, Make, Zapier, n8n,
 *    Google Apps Script etc.). Opcional: FORM_WEBHOOK_TOKEN (Bearer).
 * 2. RESEND_API_KEY + ORCAMENTO_EMAIL_PARA + ORCAMENTO_EMAIL_DE: envia um
 *    e-mail pela API da Resend.
 *
 * A confirmação só é exibida quando o serviço responde com sucesso.
 */
export async function enviarOrcamento(_anterior: EstadoEnvio, form: FormData): Promise<EstadoEnvio> {
  // Campo invisível para humanos: se vier preenchido, é um robô.
  if (String(form.get("empresa_site") ?? "") !== "") return { status: "sucesso" };

  const dados = lerFormulario(form);
  const erros = validarOrcamento(dados);
  if (Object.keys(erros).length > 0) return { status: "invalido", erros };

  const pedido = {
    nome: dados.nome,
    negocio: dados.negocio,
    segmento: dados.segmento,
    whatsapp: dados.whatsapp,
    email: dados.email || null,
    descricao: dados.descricao || null,
    consentimento: true,
    origem: siteConfig.marca.url,
    enviadoEm: new Date().toISOString(),
  };

  try {
    const webhook = process.env.FORM_WEBHOOK_URL;
    if (webhook) {
      const resposta = await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(process.env.FORM_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.FORM_WEBHOOK_TOKEN}` } : {}),
        },
        body: JSON.stringify(pedido),
        signal: AbortSignal.timeout(10_000),
        cache: "no-store",
      });
      if (!resposta.ok) {
        console.error("[orcamento] Webhook respondeu com status", resposta.status);
        return { status: "erro", mensagem: ERRO_GENERICO };
      }
      return { status: "sucesso" };
    }

    const chave = process.env.RESEND_API_KEY;
    const para = process.env.ORCAMENTO_EMAIL_PARA;
    const de = process.env.ORCAMENTO_EMAIL_DE;
    if (chave && para && de) {
      const texto = [
        `Nome: ${pedido.nome}`,
        `Negócio: ${pedido.negocio}`,
        `Segmento: ${pedido.segmento}`,
        `WhatsApp: ${pedido.whatsapp}`,
        `E-mail: ${pedido.email ?? "não informado"}`,
        "",
        `Descrição: ${pedido.descricao ?? "não informada"}`,
        "",
        `Enviado em: ${pedido.enviadoEm}`,
      ].join("\n");
      const resposta = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${chave}` },
        body: JSON.stringify({
          from: de,
          to: [para],
          subject: `Novo pedido de orçamento: ${pedido.negocio}`,
          text: texto,
          ...(pedido.email ? { reply_to: pedido.email } : {}),
        }),
        signal: AbortSignal.timeout(10_000),
        cache: "no-store",
      });
      if (!resposta.ok) {
        console.error("[orcamento] Resend respondeu com status", resposta.status);
        return { status: "erro", mensagem: ERRO_GENERICO };
      }
      return { status: "sucesso" };
    }

    return { status: "erro", mensagem: "O envio pelo formulário está temporariamente indisponível." };
  } catch (erro) {
    console.error("[orcamento] Falha ao enviar o pedido", erro);
    return { status: "erro", mensagem: ERRO_GENERICO };
  }
}
