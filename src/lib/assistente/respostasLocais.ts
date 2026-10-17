import type { BaseAssistente, RespostaLocal } from "./tipos";

/**
 * Respostas programadas do assistente.
 *
 * Funcionam sem servidor e sem IA: são usadas quando a chave da IA não está
 * configurada, quando a IA não responde e na versão estática do site.
 * Também servem para escolher as sugestões e os botões exibidos abaixo das
 * respostas da IA. Todo o conteúdo sai da base de conhecimento, nunca de
 * valores fixos aqui.
 */

export function normalizar(texto: string) {
  return (
    " " +
    texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim() +
    " "
  );
}

/** Segmentos reconhecidos na conversa: palavra-chave → [como chamar, demonstração]. */
const segmentos: [string, string, string][] = [
  ["barbearia", "barbearia", "barbearia"],
  ["barbeiro", "barbearia", "barbearia"],
  ["salao", "salão de beleza", "salao"],
  ["cabeleireir", "salão de beleza", "salao"],
  ["manicure", "espaço de manicure", "salao"],
  ["estetica", "clínica de estética", "salao"],
  ["beleza", "negócio de beleza", "salao"],
  ["sobrancelha", "estúdio de sobrancelhas", "salao"],
  ["cafeteria", "cafeteria", "cafeteria"],
  ["cafe", "cafeteria", "cafeteria"],
  ["restaurante", "restaurante", "cafeteria"],
  ["lanchonete", "lanchonete", "cafeteria"],
  ["padaria", "padaria", "cafeteria"],
  ["pizzaria", "pizzaria", "cafeteria"],
  ["hamburgueria", "hamburgueria", "cafeteria"],
  ["confeitaria", "confeitaria", "cafeteria"],
  ["doceria", "doceria", "cafeteria"],
  ["acai", "açaiteria", "cafeteria"],
  ["loja", "loja", "loja"],
  ["roupa", "loja de roupas", "loja"],
  ["moda", "loja de moda", "loja"],
  ["boutique", "boutique", "loja"],
  ["calcado", "loja de calçados", "loja"],
  ["oficina", "oficina mecânica", "oficina"],
  ["mecanic", "oficina mecânica", "oficina"],
  ["auto center", "auto center", "oficina"],
  ["borracharia", "borracharia", "oficina"],
  ["funilaria", "funilaria", "oficina"],
  ["lava jato", "lava-jato", "oficina"],
  ["eletricista", "serviço de elétrica", "servicos"],
  ["encanador", "serviço de encanamento", "servicos"],
  ["pintor", "serviço de pintura", "servicos"],
  ["diarista", "serviço de limpeza", "servicos"],
  ["limpeza", "serviço de limpeza", "servicos"],
  ["marido de aluguel", "serviço de reparos", "servicos"],
  ["reforma", "serviço de reformas", "servicos"],
  ["advogad", "escritório de advocacia", "servicos"],
  ["contador", "escritório de contabilidade", "servicos"],
  ["contabil", "escritório de contabilidade", "servicos"],
  ["dentista", "consultório odontológico", "servicos"],
  ["clinica", "clínica", "servicos"],
  ["consultorio", "consultório", "servicos"],
  ["psicolog", "consultório de psicologia", "servicos"],
  ["nutricion", "consultório de nutrição", "servicos"],
  ["fisioterap", "clínica de fisioterapia", "servicos"],
  ["academia", "academia", "servicos"],
  ["personal", "trabalho de personal trainer", "servicos"],
  ["fotograf", "trabalho de fotografia", "servicos"],
  ["pet shop", "pet shop", "servicos"],
  ["petshop", "pet shop", "servicos"],
  ["veterinari", "clínica veterinária", "servicos"],
  ["prestador", "negócio de serviços", "servicos"],
];

export function detectarSegmento(texto: string): { rotulo: string; demo: string } | null {
  const t = normalizar(texto);
  for (const [chave, rotulo, demo] of segmentos) {
    if (t.includes(" " + chave)) return { rotulo, demo };
  }
  return null;
}

type Intencao =
  | "saudacao"
  | "agradecimento"
  | "contratar"
  | "humano"
  | "preco"
  | "pagamento"
  | "mensalidade"
  | "dominio"
  | "dominioProprio"
  | "hospedagem"
  | "prazo"
  | "incluido"
  | "comoFunciona"
  | "celular"
  | "whatsapp"
  | "alteracoes"
  | "atualizar"
  | "programacao"
  | "exemplos"
  | "google"
  | "resultados"
  | "recursos"
  | "empresa"
  | "materiais";

/** Palavras-chave por intenção, já sem acentos. A ordem desempata a pontuação. */
const palavras: [Intencao, string[]][] = [
  ["dominioProprio", ["ja tenho dominio", "ja tenho um dominio", "meu proprio dominio", "dominio que ja tenho", "ja possuo dominio", "ja possuo um dominio"]],
  ["mensalidade", ["mensalidade", "mensal", "todo mes", "por mes", "recorrente", "pagamento unico", "pago uma vez", "uma unica vez", "assinatura", "taxa fixa"]],
  ["preco", ["preco", "valor", "valores", "quanto custa", "quanto sai", "quanto fica", "quanto e", "custo", "custa", "orcamento", "investimento", "barato", "caro", "tabela", "plano", "planos", "pacote"]],
  ["pagamento", ["pix", "cartao", "parcel", "boleto", "forma de pagamento", "formas de pagamento", "entrada", "a vista", "dividir"]],
  ["dominio", ["dominio", "com br", "ponto com", "endereco do site", "nome do site", "renovar", "renovacao", "registro br", "registrobr"]],
  ["hospedagem", ["hospedagem", "hospedar", "servidor", "fica no ar", "hospedado"]],
  ["prazo", ["prazo", "demora", "quanto tempo", "quando fica pronto", "fica pronto", "dias", "semanas", "rapido", "urgente", "entrega"]],
  ["incluido", ["incluso", "incluido", "inclui", "o que vem", "o que tem", "o que esta", "o que entra", "o que recebo", "o que eu recebo", "entregam", "secoes", "paginas"]],
  ["comoFunciona", ["como funciona", "processo", "etapas", "passo a passo", "como e feito", "como voces fazem", "como comeca", "funciona"]],
  ["celular", ["celular", "mobile", "smartphone", "tablet", "responsivo", "iphone", "android"]],
  ["whatsapp", ["whatsapp", "zap", "wpp", "botao de contato"]],
  ["alteracoes", ["alteracao", "alteracoes", "alterar", "mudar", "mudanca", "revisao", "revisoes", "ajuste", "ajustes", "nao gostar", "nao gostei"]],
  ["atualizar", ["atualizar", "atualizacao", "editar", "trocar foto", "trocar preco", "manutencao", "depois de pronto", "mexer no site"]],
  ["programacao", ["programacao", "programar", "tecnico", "nao entendo", "nao sei mexer", "dificil", "complicado", "leigo"]],
  ["exemplos", ["exemplo", "exemplos", "modelo", "modelos", "portfolio", "demonstracao", "trabalhos", "ja fizeram", "ver como fica", "inspiracao"]],
  ["google", ["google", "aparecer", "busca", "pesquisa", "seo", "primeiro lugar", "ranking"]],
  ["resultados", ["vender mais", "mais clientes", "mais vendas", "garantia", "garante", "retorno", "resultado", "vale a pena", "funciona mesmo", "instagram", "rede social", "redes sociais"]],
  ["recursos", ["loja virtual", "e commerce", "ecommerce", "carrinho", "pagamento online", "agendamento online", "agenda online", "blog", "login", "area de cliente", "cardapio digital", "delivery", "formulario", "mapa", "galeria"]],
  ["empresa", ["quem sao", "quem e voces", "cnpj", "endereco de voces", "onde ficam", "empresa de voces", "confiavel", "seguro", "golpe"]],
  ["materiais", ["fotos", "logo", "logotipo", "textos", "texto", "materiais", "conteudo", "o que preciso enviar", "o que voces precisam"]],
  ["contratar", ["quero contratar", "quero fazer", "quero um site", "quero meu site", "vamos fechar", "fechar", "contratar", "comecar", "bora", "tenho interesse", "interesse"]],
  ["humano", ["falar com alguem", "falar com voces", "atendente", "humano", "pessoa", "contato", "telefone", "ligar", "email", "e mail", "numero"]],
  ["saudacao", ["oi", "ola", "bom dia", "boa tarde", "boa noite", "tudo bem", "e ai", "opa", "hello"]],
  ["agradecimento", ["obrigado", "obrigada", "valeu", "agradeco", "show", "perfeito", "otimo", "beleza", "tchau", "ate mais"]],
];

function classificar(texto: string): Intencao | null {
  const t = normalizar(texto);
  let melhor: Intencao | null = null;
  let pontos = 0;
  for (const [intencao, chaves] of palavras) {
    let p = 0;
    for (const chave of chaves) {
      if (t.includes(" " + chave + " ") || (chave.length > 4 && t.includes(" " + chave))) p += chave.includes(" ") ? 2 : 1;
    }
    if (p > pontos) {
      melhor = intencao;
      pontos = p;
    }
  }
  return melhor;
}

function faq(base: BaseAssistente, trecho: string) {
  const alvo = normalizar(trecho);
  return base.faq.find((f) => normalizar(f.pergunta).includes(alvo))?.resposta ?? "";
}

function lista(itens: string[]) {
  return itens.map((i) => "• " + i).join("\n");
}

const SUGESTOES_INICIAIS = ["Como funciona?", "Quanto custa?", "Vou pagar mensalidade?", "O domínio fica no meu nome?"];

export const sugestoesIniciais = SUGESTOES_INICIAIS;

/** Escolhe as próximas sugestões sem repetir o assunto que acabou de ser respondido. */
function proximas(atual: Intencao | null, segmento: { demo: string } | null): string[] {
  const todas: [Intencao, string][] = [
    ["comoFunciona", "Como funciona?"],
    ["preco", "Quanto custa?"],
    ["incluido", "O que está incluído?"],
    ["mensalidade", "Vou pagar mensalidade?"],
    ["dominio", "O domínio fica no meu nome?"],
    ["prazo", "Quanto tempo leva?"],
    ["exemplos", segmento ? "Ver um exemplo parecido" : "Ver exemplos de sites"],
    ["alteracoes", "Posso pedir alterações?"],
    ["contratar", "Quero meu site"],
  ];
  return todas
    .filter(([i]) => i !== atual)
    .slice(0, 3)
    .map(([, t]) => t)
    .concat(atual === "contratar" ? [] : ["Quero meu site"])
    .filter((t, i, arr) => arr.indexOf(t) === i)
    .slice(0, 4);
}

export function responderLocalmente(
  pergunta: string,
  base: BaseAssistente,
  segmentoConversa: { rotulo: string; demo: string } | null = null,
): RespostaLocal & { segmento: { rotulo: string; demo: string } | null; reconhecida: boolean } {
  const segmentoNovo = detectarSegmento(pergunta);
  const segmento = segmentoNovo ?? segmentoConversa;
  const intencao = classificar(pergunta);
  const demo = segmento ? base.demos.find((d) => d.slug === segmento.demo) : undefined;
  const linkExemplo = demo
    ? { rotulo: `Ver exemplo de ${demo.segmento}`, href: demo.href }
    : { rotulo: "Ver exemplos de sites", href: base.rotas.exemplos };
  const linkOrcamento = { rotulo: "Pedir orçamento", href: base.rotas.orcamento };

  const r = (texto: string, extra: Partial<RespostaLocal> & { reconhecida?: boolean } = {}) => ({
    texto,
    sugestoes: proximas(intencao, segmento),
    links: [] as RespostaLocal["links"],
    convite: false,
    segmento,
    reconhecida: true,
    ...extra,
  });

  // O visitante só contou qual é o negócio dele.
  if (segmentoNovo && (intencao === null || intencao === "saudacao" || intencao === "contratar")) {
    return r(
      `Que bom! Fazemos sites para ${segmentoNovo.rotulo}, sim. O site é pensado para apresentar o que você oferece, ` +
        `mostrar como chegar e levar o cliente direto para o seu contato, com visual próprio e funcionando bem no celular.\n\n` +
        (demo
          ? `Montamos uma demonstração conceitual parecida (o ${demo.nome} é um negócio fictício) para você ter uma ideia de como pode ficar.`
          : "Você pode ver algumas demonstrações conceituais para ter uma ideia de como pode ficar."),
      { links: [linkExemplo], convite: true, sugestoes: ["Quanto custa?", "O que está incluído?", "Quanto tempo leva?"] },
    );
  }

  switch (intencao) {
    case "saudacao":
      return r(
        `Oi! Que bom ter você por aqui. Posso explicar como funciona a criação do site, o que está incluído e quais custos existem depois. ` +
          `Se quiser, me conte qual é o seu negócio que eu já te mostro um exemplo parecido.`,
        { sugestoes: SUGESTOES_INICIAIS },
      );

    case "agradecimento":
      return r(
        "Imagina! Quando quiser dar o próximo passo, é só chamar a nossa equipe. Ela monta a proposta para o seu negócio, com todos os valores e condições por escrito.",
        { convite: true },
      );

    case "preco": {
      const texto = base.preco
        ? `O ${base.plano} sai por ${base.preco}${base.condicoesPagamento ? ` (${base.condicoesPagamento})` : ""}, pago uma única vez pela criação do site.\n\n` +
          "Além disso, o domínio tem renovação periódica e, dependendo da solução, a hospedagem pode ter custo à parte. Tudo aparece na proposta antes de você decidir."
        : "O valor depende do que o seu negócio precisa, como a quantidade de seções, os recursos e o conteúdo. Por isso o preço é passado em um orçamento feito para você.\n\n" +
          "O formato já é definido: você paga uma única vez pela criação do site. O domínio tem renovação periódica e a hospedagem pode ter custo à parte, conforme a solução. Esses custos aparecem na proposta antes de você decidir.";
      return r(texto, { convite: true, links: [linkOrcamento] });
    }

    case "pagamento":
      return r(
        base.condicoesPagamento
          ? `As condições de pagamento são: ${base.condicoesPagamento}. Os detalhes ficam descritos na proposta.`
          : "As formas e condições de pagamento são informadas na proposta, junto com o valor do projeto. Fale com a nossa equipe que ela te explica as opções.",
        { convite: true },
      );

    case "mensalidade":
      return r(faq(base, "mensalidade") + "\n\nOu seja: nada de surpresa. Antes de contratar, você sabe exatamente o que é pago uma vez e o que pode se repetir.", {
        links: [linkOrcamento],
      });

    case "dominioProprio":
      return r(faq(base, "meu próprio domínio") + " " + faq(base, "domínio será meu"));

    case "dominio":
      return r(faq(base, "domínio será meu") + "\n\n" + faq(base, "renovar o domínio"));

    case "hospedagem":
      return r(faq(base, "hospedagem"));

    case "prazo":
      return r(
        base.prazo
          ? `O prazo estimado é ${base.prazo}. Ele começa a contar quando recebemos as informações e os materiais do seu negócio.`
          : faq(base, "quanto tempo") + " Quanto antes você enviar fotos, textos e informações, mais rápido o projeto anda.",
        { convite: true },
      );

    case "incluido":
      return r(
        `No ${base.plano} estão incluídos:\n${lista(base.incluidos)}\n\nFicam à parte:\n${lista(base.separados)}`,
        { links: [linkOrcamento] },
      );

    case "comoFunciona":
      return r(
        "É simples e você acompanha cada passo:\n" +
          base.etapas.map((e, i) => `${i + 1}. ${e.titulo}: ${e.texto}`).join("\n") +
          "\n\nVocê não precisa entender nada de tecnologia. Só nos contar sobre o seu negócio.",
        { links: [linkExemplo] },
      );

    case "celular":
      return r(faq(base, "celular") + " Hoje a maioria das pessoas pesquisa pelo celular, então essa parte recebe atenção especial.");

    case "whatsapp":
      return r(
        faq(base, "botão para o WhatsApp") +
          " Assim o cliente sai do site e cai direto na conversa com você, já com uma mensagem pronta.",
        { links: [linkExemplo] },
      );

    case "alteracoes":
      return r(
        base.revisoes
          ? `Sim. Estão incluídas ${base.revisoes} durante a criação. Ajustes além disso são combinados à parte.`
          : faq(base, "alterações"),
      );

    case "atualizar":
      return r(faq(base, "atualizar o site"));

    case "programacao":
      return r(faq(base, "programação"));

    case "materiais":
      return r(
        "Você só precisa nos contar sobre o seu negócio: o que oferece, horários, endereço, formas de contato e, se tiver, fotos e logotipo. " +
          "Se faltar alguma coisa, a gente te orienta no caminho. " +
          faq(base, "quanto tempo"),
      );

    case "exemplos":
      return r(
        "Preparamos demonstrações conceituais para vários tipos de negócio: barbearia, cafeteria, loja de roupas, salão de beleza, oficina e prestadores de serviço. " +
          "São negócios fictícios, criados só para mostrar o estilo e as possibilidades. Vale dar uma olhada!",
        { links: demo ? [linkExemplo, { rotulo: "Ver todos", href: base.rotas.exemplos }] : [linkExemplo] },
      );

    case "google":
      return r(
        "O site dá ao seu negócio uma base própria para trabalhar a presença nos sites de busca, como o Google. " +
          "Mas vou ser sincero: ninguém pode garantir posição nos resultados de busca, porque isso depende de muitos fatores fora do nosso controle. Desconfie de quem promete primeiro lugar.",
      );

    case "resultados":
      return r(
        "Não dá para prometer aumento de vendas, porque isso depende de muitos fatores do seu negócio. " +
          "O que um site profissional faz é deixar o seu negócio mais fácil de encontrar e de entender, transmitir confiança e levar o cliente direto para o seu contato. " +
          "Ele complementa as redes sociais com um endereço que é seu e reúne todas as informações em um só lugar.",
        { links: [linkExemplo] },
      );

    case "recursos":
      return r(
        "Isso depende do escopo do projeto. Recursos além da apresentação do negócio precisam ser avaliados caso a caso, e a proposta deixa claro o que entra e o que não entra. " +
          "Conte para a nossa equipe o que você precisa que ela te responde com segurança.",
        { convite: true },
      );

    case "empresa":
      return r(
        `Quem cuida do seu projeto é a equipe da ${base.marca}. Para conhecer melhor quem vai fazer o seu site e receber todas as condições por escrito, o melhor caminho é falar direto com a gente.`,
        { convite: true },
      );

    case "contratar":
      return r(
        "Ótimo! O primeiro passo é contar um pouco sobre o seu negócio. Com isso, preparamos a proposta com o que está incluído, o valor e as condições. " +
          (base.whatsapp ? "Você pode chamar a gente no WhatsApp ou pedir um orçamento pelo formulário." : "É só preencher o pedido de orçamento aqui no site."),
        { convite: true, links: [linkOrcamento], sugestoes: ["Como funciona?", "O que está incluído?"] },
      );

    case "humano":
      return r(
        base.whatsapp
          ? "Claro! Toque no botão abaixo e você fala direto com a nossa equipe pelo WhatsApp. A mensagem já vai pronta."
          : "Claro! Deixe seu contato no pedido de orçamento e a nossa equipe fala com você." +
              (base.email ? ` Se preferir, escreva para ${base.email}.` : ""),
        { convite: true, links: base.whatsapp ? [] : [linkOrcamento] },
      );
  }

  return r(
    "Essa eu prefiro não responder sem ter certeza, para não te passar uma informação errada. A nossa equipe consegue te responder direitinho. " +
      "Enquanto isso, posso explicar como funciona, o que está incluído ou os custos envolvidos.",
    { convite: true, sugestoes: SUGESTOES_INICIAIS, reconhecida: false },
  );
}
