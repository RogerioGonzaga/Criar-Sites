/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 * ---------------------------------------------------------------------------
 * Todas as informações da marca, contato e oferta comercial ficam aqui.
 * Altere este arquivo para personalizar o site; nenhum outro arquivo precisa
 * ser editado para trocar nome, preço, WhatsApp ou condições comerciais.
 *
 * Regra de ouro: quando um valor comercial não estiver definido, deixe-o como
 * `null` (ou string vazia). O site mostra automaticamente uma alternativa
 * honesta ("Solicite um orçamento", "Informado na proposta") em vez de
 * inventar dados.
 */

export type SimNaoIndefinido = boolean | null;

export const siteConfig = {
  marca: {
    /** Nome provisório. Troque pelo nome definitivo da empresa. */
    nome: "Vitrine",
    /** Usado no logotipo tipográfico: o ponto final recebe a cor de destaque. */
    logotipo: "vitrine",
    slogan: "Sites profissionais para pequenos negócios",
    descricao:
      "Criamos sites profissionais para pequenos negócios, com domínio próprio e pagamento único pelo desenvolvimento contratado.",
    /** URL pública do site, sem barra no final. Pode vir de NEXT_PUBLIC_SITE_URL. */
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },

  /**
   * Cores principais. Elas são aplicadas como variáveis CSS em
   * `src/app/layout.tsx`, então basta alterá-las aqui.
   */
  cores: {
    destaque: "#c8f53c",
    destaqueEscuro: "#9fcc12",
    tinta: "#0d100e",
    papel: "#f6f6f1",
  },

  contato: {
    /**
     * Número do WhatsApp com código do país e DDD, apenas dígitos.
     * Exemplo de formato: 55 + DDD + número → "5511900000000".
     * Deixe vazio enquanto não houver um número real.
     * Também pode ser definido pela variável NEXT_PUBLIC_WHATSAPP.
     */
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
    /** Mensagem padrão enviada ao abrir o WhatsApp. */
    mensagemWhatsapp:
      "Olá! Conheci o site e gostaria de criar um site profissional para o meu negócio. Quero saber como funciona, quais são os valores e o que está incluído no projeto.",
    /** E-mail público de contato. Deixe vazio se não houver. */
    email: process.env.NEXT_PUBLIC_EMAIL || "",
    /** Redes sociais: preencha apenas as que existirem. */
    redes: {
      instagram: "",
      facebook: "",
      linkedin: "",
      tiktok: "",
    },
  },

  oferta: {
    nomePlano: "Site Profissional",
    /** Preço em reais (ex.: 1490). Use null para mostrar "Solicite um orçamento". */
    preco: null as number | null,
    /** Complemento do preço, ex.: "à vista ou em até 3x". */
    condicoesPagamento: "" as string,
    descricao:
      "Um site completo para apresentar seu negócio, com visual próprio, adaptado ao celular e com contato direto pelo WhatsApp.",
    /** Ex.: "Até 5 seções" ou "1 página com 6 seções". null = definido na proposta. */
    paginasOuSecoes: null as string | null,
    designPersonalizado: true,
    adaptadoCelular: true,
    integracaoWhatsapp: true,
    /** Número de rodadas de revisão incluídas. null = definido na proposta. */
    revisoesIncluidas: null as number | null,
    /** Ex.: "até 15 dias úteis após o recebimento dos materiais". */
    prazoEstimado: null as string | null,
    dominio: {
      /** O primeiro ano de domínio está incluído no preço? */
      incluidoNoPreco: null as SimNaoIndefinido,
      /** Quem registra o domínio. Ex.: "Registrado em nome do cliente". */
      responsavelRegistro: null as string | null,
      /** Quem paga a renovação. Ex.: "Renovação anual paga pelo cliente". */
      responsavelRenovacao: null as string | null,
    },
    hospedagem: {
      /** A hospedagem está incluída? */
      incluida: null as SimNaoIndefinido,
      /** Detalhe opcional. Ex.: "Hospedagem inclusa por 12 meses". */
      detalhe: null as string | null,
    },
    /** Ex.: "30 dias de suporte para dúvidas após a entrega". */
    suporte: null as string | null,
    /** Serviços adicionais oferecidos. Lista vazia = não exibir. */
    servicosAdicionais: [] as string[],
  },

  legal: {
    /** Razão social ou nome do responsável. Vazio = não exibir. */
    razaoSocial: "",
    /** CNPJ ou CPF do responsável. Vazio = não exibir. */
    documento: "",
    /** Endereço comercial. Vazio = não exibir. */
    endereco: "",
    /** Link para termos de serviço, se existirem. Vazio = não exibir. */
    termosUrl: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
