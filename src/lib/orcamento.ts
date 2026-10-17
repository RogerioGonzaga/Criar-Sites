/** Regras do formulário de orçamento, compartilhadas entre navegador e servidor. */

export const segmentos = [
  "Restaurante",
  "Barbearia",
  "Salão de beleza",
  "Loja",
  "Oficina",
  "Prestação de serviços",
  "Outro",
] as const;

export type DadosOrcamento = {
  nome: string;
  negocio: string;
  segmento: string;
  whatsapp: string;
  email: string;
  descricao: string;
  consentimento: boolean;
};

export type ErrosOrcamento = Partial<Record<keyof DadosOrcamento, string>>;

export const LIMITE_DESCRICAO = 1000;

export function lerFormulario(form: FormData): DadosOrcamento {
  const texto = (campo: string) => String(form.get(campo) ?? "").trim();
  return {
    nome: texto("nome"),
    negocio: texto("negocio"),
    segmento: texto("segmento"),
    whatsapp: texto("whatsapp"),
    email: texto("email"),
    descricao: texto("descricao"),
    consentimento: form.get("consentimento") === "on",
  };
}

export function apenasDigitos(valor: string) {
  return valor.replace(/\D/g, "");
}

/** Aceita números brasileiros com DDD (10 ou 11 dígitos), com ou sem o código 55. */
export function whatsappValido(valor: string) {
  let d = apenasDigitos(valor);
  if ((d.length === 12 || d.length === 13) && d.startsWith("55")) d = d.slice(2);
  return /^[1-9]{2}9?\d{8}$/.test(d);
}

export function validarOrcamento(dados: DadosOrcamento): ErrosOrcamento {
  const erros: ErrosOrcamento = {};
  if (dados.nome.length < 2) erros.nome = "Informe seu nome.";
  else if (dados.nome.length > 80) erros.nome = "O nome pode ter no máximo 80 caracteres.";

  if (dados.negocio.length < 2) erros.negocio = "Informe o nome do seu negócio.";
  else if (dados.negocio.length > 100) erros.negocio = "O nome do negócio pode ter no máximo 100 caracteres.";

  if (!segmentos.includes(dados.segmento as (typeof segmentos)[number])) erros.segmento = "Selecione o segmento do seu negócio.";

  if (!dados.whatsapp) erros.whatsapp = "Informe seu WhatsApp com DDD.";
  else if (!whatsappValido(dados.whatsapp)) erros.whatsapp = "Confira o número. Use o DDD, por exemplo: (11) 91234-5678.";

  if (dados.email && (dados.email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(dados.email)))
    erros.email = "Confira o e-mail informado ou deixe o campo em branco.";

  if (dados.descricao.length > LIMITE_DESCRICAO)
    erros.descricao = `A descrição pode ter no máximo ${LIMITE_DESCRICAO} caracteres.`;

  if (!dados.consentimento) erros.consentimento = "Para continuar, autorize o uso dos dados para responder ao seu pedido.";
  return erros;
}

export function mensagemWhatsappOrcamento(d: DadosOrcamento) {
  const linhas = [
    "Olá! Gostaria de solicitar um orçamento para criar o site do meu negócio.",
    "",
    `Nome: ${d.nome}`,
    `Negócio: ${d.negocio}`,
    `Segmento: ${d.segmento}`,
  ];
  if (d.email) linhas.push(`E-mail: ${d.email}`);
  if (d.descricao) linhas.push("", `Sobre o projeto: ${d.descricao}`);
  return linhas.join("\n");
}

export type EstadoEnvio =
  | { status: "inicial" }
  | { status: "invalido"; erros: ErrosOrcamento }
  | { status: "sucesso" }
  | { status: "erro"; mensagem: string };
