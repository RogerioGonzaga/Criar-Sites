import { siteConfig } from "@/config/site";

/** Retorna apenas os dígitos de um número de telefone. */
function somenteDigitos(valor: string) {
  return valor.replace(/\D/g, "");
}

/** Número de WhatsApp válido (com código do país e DDD) ou null. */
export function numeroWhatsapp(): string | null {
  const digitos = somenteDigitos(siteConfig.contato.whatsapp);
  return /^\d{10,15}$/.test(digitos) ? digitos : null;
}

export const whatsappConfigurado = numeroWhatsapp() !== null;

/** Monta o link do WhatsApp com mensagem pré-preenchida, ou null se não houver número. */
export function linkWhatsapp(mensagem: string = siteConfig.contato.mensagemWhatsapp): string | null {
  const numero = numeroWhatsapp();
  if (!numero) return null;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

/** Mensagem personalizada para quem estava vendo uma demonstração. */
export function mensagemDemonstracao(segmento: string) {
  return `Olá! Vi a demonstração de site para ${segmento} e gostaria de um site assim para o meu negócio. Quero saber como funciona, quais são os valores e o que está incluído no projeto.`;
}

/**
 * Destino das chamadas para ação: WhatsApp quando configurado,
 * caso contrário o formulário de orçamento da página inicial.
 */
export function destinoContratacao(mensagem?: string) {
  const whatsapp = linkWhatsapp(mensagem);
  if (whatsapp) return { href: whatsapp, externo: true as const };
  return { href: "/#orcamento", externo: false as const };
}

export function telefoneFormatado(): string | null {
  const n = numeroWhatsapp();
  if (!n) return null;
  if (n.startsWith("55") && (n.length === 12 || n.length === 13)) {
    const ddd = n.slice(2, 4);
    const resto = n.slice(4);
    const meio = resto.length === 9 ? `${resto.slice(0, 5)}-${resto.slice(5)}` : `${resto.slice(0, 4)}-${resto.slice(4)}`;
    return `(${ddd}) ${meio}`;
  }
  return `+${n}`;
}

export const redesConfiguradas = Object.entries(siteConfig.contato.redes)
  .filter(([, url]) => Boolean(url))
  .map(([rede, url]) => ({ rede, url: url as string }));

const nomesRedes: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
};
export function nomeRede(rede: string) {
  return nomesRedes[rede] ?? rede;
}

/** Itens de configuração pendentes, exibidos somente em desenvolvimento. */
export function pendenciasConfiguracao(): string[] {
  const p: string[] = [];
  if (!whatsappConfigurado) p.push("Número do WhatsApp (contato.whatsapp)");
  if (!siteConfig.contato.email) p.push("E-mail de contato (contato.email)");
  if (siteConfig.oferta.preco === null) p.push("Preço do plano (oferta.preco)");
  if (siteConfig.oferta.prazoEstimado === null) p.push("Prazo estimado (oferta.prazoEstimado)");
  if (siteConfig.oferta.dominio.incluidoNoPreco === null) p.push("Condições do domínio (oferta.dominio)");
  if (siteConfig.oferta.hospedagem.incluida === null) p.push("Condições de hospedagem (oferta.hospedagem)");
  if (!process.env.FORM_WEBHOOK_URL && !process.env.RESEND_API_KEY)
    p.push("Envio do formulário (FORM_WEBHOOK_URL ou RESEND_API_KEY no .env.local)");
  return p;
}
