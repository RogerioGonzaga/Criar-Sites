/**
 * Tipos do assistente virtual. Ficam separados para que o widget, que também
 * roda na versão estática do site, não dependa de código do servidor.
 */

export type ItemFaq = { pergunta: string; resposta: string };

/** Tudo o que o assistente sabe sobre a oferta, montado a partir de `siteConfig`. */
export type BaseAssistente = {
  marca: string;
  plano: string;
  descricaoOferta: string;
  /** Preço já formatado (ex.: "R$ 1.490") ou null quando não definido. */
  preco: string | null;
  condicoesPagamento: string;
  prazo: string | null;
  revisoes: string | null;
  detalhes: { rotulo: string; valor: string }[];
  incluidos: string[];
  separados: string[];
  adicionais: string[];
  etapas: { titulo: string; texto: string }[];
  faq: ItemFaq[];
  demos: { slug: string; segmento: string; nome: string; href: string }[];
  /** Link do WhatsApp sem mensagem (https://wa.me/55...) ou null quando não configurado. */
  whatsapp: string | null;
  mensagemWhatsapp: string;
  email: string | null;
  rotas: { orcamento: string; exemplos: string; privacidade: string };
};

export type Mensagem = { papel: "visitante" | "assistente"; texto: string };

/** Resposta montada sem IA, a partir da base de conhecimento. */
export type RespostaLocal = {
  texto: string;
  /** Perguntas sugeridas como próximos passos. */
  sugestoes: string[];
  /** Links de apoio exibidos como botões abaixo da resposta. */
  links: { rotulo: string; href: string }[];
  /** Mostra o convite para falar com a equipe logo abaixo da resposta. */
  convite: boolean;
};
