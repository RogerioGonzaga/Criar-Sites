/** Catálogo das demonstrações conceituais (negócios fictícios). */
export type SlugDemo = "barbearia" | "cafeteria" | "loja" | "salao" | "oficina" | "servicos";

export type Demonstracao = {
  slug: SlugDemo;
  segmento: string;
  /** Usado na mensagem do WhatsApp: "Vi a demonstração de site para ..." */
  segmentoMensagem: string;
  nomeFicticio: string;
  endereco: string;
  resumo: string;
  estilo: string;
  cores: string[];
};

export const demonstracoes: Demonstracao[] = [
  {
    slug: "barbearia",
    segmento: "Barbearia",
    segmentoMensagem: "barbearia",
    nomeFicticio: "Brasa Barbearia",
    endereco: "brasabarbearia.com.br",
    resumo: "Visual escuro e marcante, com serviços, equipe, horários e agendamento pelo WhatsApp.",
    estilo: "Clássico e urbano",
    cores: ["#141210", "#c98a4b", "#f4ede2"],
  },
  {
    slug: "cafeteria",
    segmento: "Cafeteria e restaurante",
    segmentoMensagem: "cafeteria e restaurante",
    nomeFicticio: "Café Aurora",
    endereco: "cafeaurora.com.br",
    resumo: "Cardápio fácil de consultar, horários de funcionamento e localização em destaque.",
    estilo: "Aconchegante e artesanal",
    cores: ["#f3e6d3", "#d9774b", "#3b2416"],
  },
  {
    slug: "loja",
    segmento: "Loja de roupas",
    segmentoMensagem: "loja de roupas",
    nomeFicticio: "Atelier Sal",
    endereco: "ateliersal.com.br",
    resumo: "Vitrine de coleções com estética editorial e pedido direto pelo WhatsApp.",
    estilo: "Editorial e minimalista",
    cores: ["#efece6", "#1d1d1b", "#7b7f4e"],
  },
  {
    slug: "salao",
    segmento: "Salão de beleza",
    segmentoMensagem: "salão de beleza",
    nomeFicticio: "Studio Flora",
    endereco: "studioflora.com.br",
    resumo: "Apresentação elegante de serviços, equipe e agendamento simplificado.",
    estilo: "Elegante e delicado",
    cores: ["#f7e3dc", "#5a2747", "#c9a063"],
  },
  {
    slug: "oficina",
    segmento: "Oficina mecânica",
    segmentoMensagem: "oficina mecânica",
    nomeFicticio: "Torque Auto Center",
    endereco: "torqueautocenter.com.br",
    resumo: "Serviços organizados, pedido de orçamento rápido e informações de atendimento.",
    estilo: "Robusto e direto",
    cores: ["#141414", "#ffc400", "#e9e9e9"],
  },
  {
    slug: "servicos",
    segmento: "Prestador de serviços",
    segmentoMensagem: "prestador de serviços",
    nomeFicticio: "Lumen Elétrica",
    endereco: "lumeneletrica.com.br",
    resumo: "Apresentação clara dos serviços, regiões atendidas e contato imediato.",
    estilo: "Limpo e confiável",
    cores: ["#ffffff", "#1f5eff", "#0d1b3e"],
  },
];

export function buscarDemonstracao(slug: SlugDemo) {
  return demonstracoes.find((d) => d.slug === slug)!;
}
