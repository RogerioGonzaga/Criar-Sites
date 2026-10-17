import Link from "next/link";
import { destinoContratacao, mensagemDemonstracao } from "@/lib/contato";
import { Icone } from "@/components/ui/Icone";
import { buscarDemonstracao, type SlugDemo } from "./catalogo";

/** Barra fixa que identifica a página como demonstração conceitual. */
export function BarraDemo({ slug }: { slug: SlugDemo }) {
  const demo = buscarDemonstracao(slug);
  const destino = destinoContratacao(mensagemDemonstracao(demo.segmentoMensagem));
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0d100e]/95 font-sans text-white backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-3 sm:px-6">
        <Link
          href="/#exemplos"
          className="inline-flex min-h-10 items-center gap-2 rounded-full px-2 text-sm font-medium text-white/80 hover:text-white"
        >
          <Icone nome="setaVoltar" tamanho={18} />
          <span className="hidden sm:inline">Voltar aos exemplos</span>
          <span className="sm:hidden">Voltar</span>
        </Link>
        <p className="hidden items-center gap-2 text-xs text-white/60 md:flex">
          <span className="rounded-full bg-[#c8f53c] px-2 py-0.5 font-semibold text-[#0d100e]">Demonstração</span>
          Projeto conceitual para {demo.segmento.toLowerCase()}. Nome e informações fictícios.
        </p>
        <a
          href={destino.href}
          {...(destino.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#c8f53c] px-4 text-sm font-semibold text-[#0d100e] transition-transform hover:-translate-y-0.5"
        >
          {destino.externo && <Icone nome="whatsapp" tamanho={16} />}
          Quero um site assim
        </a>
      </div>
      <p className="border-t border-white/10 px-3 py-1.5 text-center text-[11px] text-white/60 md:hidden">
        Demonstração conceitual. Nome e informações fictícios.
      </p>
    </div>
  );
}
