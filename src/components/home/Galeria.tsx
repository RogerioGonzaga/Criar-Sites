import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icone } from "@/components/ui/Icone";
import { Revelar } from "@/components/ui/Revelar";
import { TituloSecao } from "@/components/ui/TituloSecao";
import { Celular, JanelaNavegador } from "@/components/mockups/Molduras";
import { miniSitesPorSlug } from "@/components/mockups/MiniSites";
import { demonstracoes } from "@/components/demos/catalogo";

export function Galeria({ comTitulo = true }: { comTitulo?: boolean }) {
  return (
    <section id="exemplos" aria-labelledby={comTitulo ? "titulo-galeria" : undefined} aria-label={comTitulo ? undefined : "Demonstrações"} className="py-24 sm:py-32">
      <Container>
        {comTitulo && (
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <TituloSecao
              id="titulo-galeria"
              rotulo="Exemplos"
              titulo="Imagine seu negócio com um site assim."
              subtitulo="Cada negócio tem sua identidade. Seu site também deve ter."
            />
            <p className="max-w-sm text-sm leading-relaxed text-suave lg:text-right">
              Estas são demonstrações conceituais, criadas para mostrar como o site pode se adaptar a diferentes negócios.
              Os nomes são fictícios.
            </p>
          </div>
        )}

        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {demonstracoes.map((demo, i) => {
            const Mini = miniSitesPorSlug[demo.slug];
            return (
              <Revelar key={demo.slug} como="li" atraso={(i % 3) * 90}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-tinta/[0.07] bg-white shadow-suave transition-all duration-500 hover:-translate-y-1.5 hover:shadow-elevada">
                  <div
                    className="relative overflow-hidden px-6 pt-7 pb-0"
                    style={{ background: `linear-gradient(160deg, ${demo.cores[1]}22, ${demo.cores[0]}44)` }}
                  >
                    <div className="relative mr-[18%] transition-transform duration-700 group-hover:-translate-y-1.5">
                      <JanelaNavegador endereco={demo.endereco}>
                        <div className="aspect-[16/10] overflow-hidden" style={{ background: demo.cores[0] }}>
                          <Mini formato="desktop" />
                        </div>
                      </JanelaNavegador>
                    </div>
                    <div className="absolute right-5 -bottom-10 w-[26%] transition-transform duration-700 group-hover:-translate-y-3">
                      <Celular fundo={demo.cores[0]}>
                        <Mini formato="celular" />
                      </Celular>
                    </div>
                  </div>

                  <div className="relative flex flex-1 flex-col border-t border-tinta/[0.06] bg-white p-6 sm:p-7">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold tracking-wide text-suave uppercase">{demo.segmento}</span>
                      <span aria-hidden="true" className="flex gap-1">
                        {demo.cores.map((c) => (
                          <span key={c} className="h-3 w-3 rounded-full ring-1 ring-tinta/10" style={{ background: c }} />
                        ))}
                      </span>
                    </div>
                    <h3 className="mt-2 font-titulo text-2xl font-semibold tracking-tight text-tinta">{demo.nomeFicticio}</h3>
                    <p className="mt-1 text-sm font-medium text-tinta/70">{demo.estilo}</p>
                    <p className="mt-3 flex-1 leading-relaxed text-suave">{demo.resumo}</p>
                    <Link
                      href={`/exemplos/${demo.slug}`}
                      className="mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-tinta px-5 font-semibold text-white transition-all duration-300 group-hover:bg-destaque group-hover:text-tinta after:absolute after:inset-0 after:content-['']"
                    >
                      Ver demonstração
                      <span className="sr-only">: {demo.segmento}</span>
                      <Icone nome="setaDiagonal" tamanho={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </article>
              </Revelar>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
