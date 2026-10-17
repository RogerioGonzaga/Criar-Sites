import { Container } from "@/components/ui/Container";
import { TituloSecao } from "@/components/ui/TituloSecao";
import { BotaoContratar } from "@/components/ui/BotaoContratar";
import { Icone } from "@/components/ui/Icone";
import { ListaPerguntas } from "./PerguntasFrequentes";

export function Perguntas() {
  return (
    <section id="perguntas" aria-labelledby="titulo-perguntas" className="bg-nevoa py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <TituloSecao
            id="titulo-perguntas"
            rotulo="Perguntas frequentes"
            titulo="Tire suas dúvidas."
            subtitulo="Respostas diretas sobre custos, domínio, hospedagem e como o projeto funciona."
          />
          <div className="mt-8 rounded-3xl bg-tinta p-6 text-white">
            <p className="font-titulo text-lg font-semibold">Ainda tem alguma dúvida?</p>
            <p className="mt-1 text-sm text-white/70">
              Pergunte ao nosso assistente, que responde na hora, ou fale com a gente e explicamos tudo com calma.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                data-abrir-assistente=""
                hidden
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 px-5 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
              >
                <Icone nome="conversa" tamanho={19} />
                Perguntar ao assistente
              </button>
              <BotaoContratar texto="Falar com a equipe" />
            </div>
          </div>
        </div>
        <ListaPerguntas />
      </Container>
    </section>
  );
}
