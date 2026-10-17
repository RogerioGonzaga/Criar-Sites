import { siteConfig } from "@/config/site";
import { etapas } from "@/components/home/ComoFunciona";
import { perguntas } from "@/components/home/perguntas";
import { demonstracoes } from "@/components/demos/catalogo";
import { numeroWhatsapp } from "@/lib/contato";
import { detalhes, formatarPreco, incluidos, oferta, separados } from "@/lib/oferta";
import type { BaseAssistente } from "./tipos";

/**
 * Base de conhecimento do assistente. Vem toda da configuração central e dos
 * textos já publicados no site, então o assistente nunca sabe mais (nem
 * promete mais) do que a própria página.
 */
export function montarBaseAssistente(): BaseAssistente {
  const numero = numeroWhatsapp();
  return {
    marca: siteConfig.marca.nome,
    plano: oferta.nomePlano,
    descricaoOferta: oferta.descricao,
    preco: oferta.preco === null ? null : formatarPreco(oferta.preco),
    condicoesPagamento: oferta.condicoesPagamento,
    prazo: oferta.prazoEstimado,
    revisoes:
      oferta.revisoesIncluidas === null
        ? null
        : `${oferta.revisoesIncluidas} ${oferta.revisoesIncluidas === 1 ? "rodada" : "rodadas"} de ajustes`,
    detalhes,
    incluidos,
    separados,
    adicionais: [...oferta.servicosAdicionais],
    etapas: etapas.map(({ titulo, texto }) => ({ titulo, texto })),
    faq: perguntas,
    demos: demonstracoes.map((d) => ({
      slug: d.slug,
      segmento: d.segmentoMensagem,
      nome: d.nomeFicticio,
      href: `/exemplos/${d.slug}`,
    })),
    whatsapp: numero ? `https://wa.me/${numero}` : null,
    mensagemWhatsapp: siteConfig.contato.mensagemWhatsapp,
    email: siteConfig.contato.email || null,
    rotas: { orcamento: "/#orcamento", exemplos: "/exemplos", privacidade: "/privacidade" },
  };
}
