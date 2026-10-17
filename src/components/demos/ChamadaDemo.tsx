import Link from "next/link";
import { mensagemDemonstracao } from "@/lib/contato";
import { BotaoContratar } from "@/components/ui/BotaoContratar";
import { buscarDemonstracao, demonstracoes, type SlugDemo } from "./catalogo";

/** Chamada no fim de cada demonstração, com o visual da marca principal. */
export function ChamadaDemo({ slug }: { slug: SlugDemo }) {
  const demo = buscarDemonstracao(slug);
  const outras = demonstracoes.filter((d) => d.slug !== slug);
  return (
    <section aria-labelledby="titulo-chamada-demo" className="bg-[#0d100e] font-sans text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold text-[#c8f53c] uppercase">Gostou deste modelo?</p>
            <h2 id="titulo-chamada-demo" className="mt-3 font-titulo text-4xl leading-[1.02] font-extrabold tracking-tight sm:text-5xl">
              Seu negócio pode ter um site com a cara dele.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-white/70">
              Esta foi uma demonstração conceitual para {demo.segmento.toLowerCase()}. O site do seu negócio é criado com as
              suas cores, os seus serviços e as suas informações.
            </p>
            <div className="mt-8">
              <BotaoContratar texto="Quero um site assim" tamanho="lg" mensagem={mensagemDemonstracao(demo.segmentoMensagem)} />
            </div>
          </div>
          <nav aria-label="Outras demonstrações">
            <p className="text-sm text-white/50">Veja outras demonstrações</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {outras.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/exemplos/${d.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 text-sm font-medium text-white/85 transition-colors hover:border-[#c8f53c] hover:text-[#c8f53c]"
                  >
                    {d.segmento}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
