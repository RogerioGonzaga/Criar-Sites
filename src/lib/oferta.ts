import { siteConfig } from "@/config/site";

/**
 * Textos da oferta montados a partir de `siteConfig.oferta`.
 * Usados pela seção de planos e pelo assistente virtual, para que os dois
 * digam exatamente a mesma coisa.
 */
export const oferta = siteConfig.oferta;
export const NA_PROPOSTA = "Informado na proposta";

export function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: valor % 1 ? 2 : 0 });
}

function simNao(valor: boolean | null, sim: string, nao: string) {
  if (valor === null) return NA_PROPOSTA;
  return valor ? sim : nao;
}

export const detalhes: { rotulo: string; valor: string }[] = [
  { rotulo: "Páginas ou seções", valor: oferta.paginasOuSecoes ?? "Definidas conforme o seu negócio" },
  { rotulo: "Design", valor: oferta.designPersonalizado ? "Personalizado para a sua marca" : NA_PROPOSTA },
  { rotulo: "Celular e tablet", valor: oferta.adaptadoCelular ? "Adaptado a todos os tamanhos de tela" : NA_PROPOSTA },
  { rotulo: "WhatsApp", valor: oferta.integracaoWhatsapp ? "Botão de contato integrado" : NA_PROPOSTA },
  {
    rotulo: "Revisões incluídas",
    valor:
      oferta.revisoesIncluidas === null
        ? NA_PROPOSTA
        : `${oferta.revisoesIncluidas} ${oferta.revisoesIncluidas === 1 ? "rodada de ajustes" : "rodadas de ajustes"}`,
  },
  { rotulo: "Prazo estimado", valor: oferta.prazoEstimado ?? "Informado após definirmos o escopo" },
  {
    rotulo: "Domínio",
    valor:
      oferta.dominio.responsavelRegistro ??
      simNao(oferta.dominio.incluidoNoPreco, "Primeiro registro incluído no preço", "Registro pago à parte"),
  },
  {
    rotulo: "Hospedagem",
    valor: oferta.hospedagem.detalhe ?? simNao(oferta.hospedagem.incluida, "Incluída", "Contratada à parte"),
  },
  { rotulo: "Suporte após a entrega", valor: oferta.suporte ?? NA_PROPOSTA },
];

export const incluidos = [
  "Criação do site (desenvolvimento pago uma única vez)",
  oferta.designPersonalizado && "Visual personalizado para a identidade do seu negócio",
  oferta.adaptadoCelular && "Versão adaptada para celular, tablet e computador",
  oferta.integracaoWhatsapp && "Botão para contato pelo WhatsApp",
  oferta.revisoesIncluidas !== null && `${oferta.revisoesIncluidas} rodada(s) de revisão`,
  oferta.dominio.incluidoNoPreco === true && "Registro inicial do domínio",
  oferta.hospedagem.incluida === true && (oferta.hospedagem.detalhe ?? "Hospedagem"),
  "Orientação sobre a publicação do site",
].filter(Boolean) as string[];

export const separados = [
  "Renovação periódica do domínio (geralmente anual)",
  oferta.dominio.incluidoNoPreco !== true && "Registro do domínio, se não estiver incluído na proposta",
  oferta.hospedagem.incluida !== true && "Hospedagem, conforme a solução escolhida",
  "Alterações além das revisões previstas na proposta",
  "Manutenção e atualizações contínuas, se você quiser contratar",
].filter(Boolean) as string[];

export const transparencia = [
  { pergunta: "O domínio está incluído no preço inicial?", resposta: simNao(oferta.dominio.incluidoNoPreco, "Sim.", "Não, o registro é pago à parte.") },
  { pergunta: "Quem registra o domínio?", resposta: oferta.dominio.responsavelRegistro ?? "Definido na contratação. O ideal é que fique em nome do cliente." },
  { pergunta: "Quem paga a renovação do domínio?", resposta: oferta.dominio.responsavelRenovacao ?? "Definido na contratação, antes de qualquer pagamento." },
  { pergunta: "A hospedagem está incluída?", resposta: oferta.hospedagem.detalhe ?? simNao(oferta.hospedagem.incluida, "Sim.", "Não, ela é contratada à parte.") },
  { pergunta: "Quais custos podem se repetir?", resposta: "A renovação do domínio e, dependendo da solução, a hospedagem e serviços de manutenção." },
  { pergunta: "Quais alterações estão incluídas?", resposta: oferta.revisoesIncluidas !== null ? `Até ${oferta.revisoesIncluidas} rodada(s) de ajustes durante a criação.` : "A quantidade de revisões é informada na proposta." },
  { pergunta: "Como funciona o suporte após a entrega?", resposta: oferta.suporte ?? "As condições de suporte são descritas na proposta." },
];
