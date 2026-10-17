import { Container } from "@/components/ui/Container";
import { Botao } from "@/components/ui/Botao";
import { BotaoContratar } from "@/components/ui/BotaoContratar";
import { Icone } from "@/components/ui/Icone";
import { Celular, JanelaNavegador } from "@/components/mockups/Molduras";
import { MiniBarbearia, MiniCafeteria, MiniLoja, MiniRestaurante } from "@/components/mockups/MiniSites";

const destaques = [
  "Design profissional e adaptado ao celular",
  "Domínio próprio",
  "Preço e condições transparentes",
];

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="titulo-hero" className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
      <div aria-hidden="true" className="fundo-pontos absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 -z-10 h-[38rem] w-[38rem] rounded-full bg-destaque/30 blur-[120px]"
      />

      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.08fr] lg:gap-10">
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-tinta/10 bg-white/80 py-1.5 pr-4 pl-1.5 text-sm font-medium text-tinta/80 shadow-suave backdrop-blur">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-tinta text-destaque">
              <Icone nome="loja" tamanho={14} />
            </span>
            Sites para pequenos negócios e autônomos
          </p>

          <h1
            id="titulo-hero"
            className="texto-equilibrado mt-6 font-titulo text-[2.9rem] leading-[0.98] font-extrabold tracking-[-0.035em] text-tinta sm:text-6xl lg:text-[4.6rem]"
          >
            Seu negócio merece um site{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">à altura.</span>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-[0.06em] -z-0 h-[0.32em] -rotate-1 rounded-sm bg-destaque" />
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-suave sm:text-xl">
            Tenha um site profissional com domínio próprio para apresentar seus produtos, valorizar sua marca e facilitar o
            contato com seus clientes.
          </p>

          <div className="mt-7 flex max-w-xl items-start gap-3 rounded-2xl border border-tinta/10 bg-white p-4 shadow-suave">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-destaque text-tinta">
              <Icone nome="etiqueta" tamanho={20} />
            </span>
            <p className="text-[0.98rem] leading-snug text-tinta">
              <strong className="font-semibold">Você paga uma vez pela criação.</strong> Sem mensalidade obrigatória pelo
              desenvolvimento.
            </p>
          </div>

          <p className="mt-5 max-w-xl text-base text-suave">
            Uma solução prática para pequenos negócios que querem dar o próximo passo na internet.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BotaoContratar texto="Quero meu site" tamanho="lg" />
            <Botao href="#exemplos" variante="contorno" tamanho="lg">
              Ver exemplos de sites
            </Botao>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {destaques.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-snug font-medium text-tinta/85">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-tinta text-destaque">
                  <Icone nome="check" tamanho={13} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ComposicaoHero />
      </Container>
    </section>
  );
}

function ComposicaoHero() {
  return (
    <figure className="relative mx-auto w-full max-w-[40rem] lg:max-w-none" aria-label="Exemplos de sites para barbearia, cafeteria, loja de roupas e restaurante, nas versões para computador e celular">
      <div className="relative aspect-[1/1.08] sm:aspect-[1.04/1]">
        {/* painel escuro de fundo */}
        <div aria-hidden="true" className="absolute inset-[10%_3%_6%_10%] rounded-[2.5rem] bg-tinta">
          <div className="fundo-pontos-claro absolute inset-0 rounded-[2.5rem]" />
          <div className="absolute -bottom-10 left-1/3 h-56 w-56 rounded-full bg-destaque/40 blur-[90px]" />
        </div>

        {/* loja (fundo) */}
        <div className="absolute top-[4%] right-0 w-[60%] motion-safe:animate-[flutuar_9s_ease-in-out_infinite]">
          <JanelaNavegador endereco="ateliersal.com.br">
            <MiniLoja formato="desktop" />
          </JanelaNavegador>
        </div>

        {/* barbearia (principal) */}
        <div className="absolute top-[45%] left-[3%] w-[70%]">
          <JanelaNavegador endereco="brasabarbearia.com.br" escuro>
            <MiniBarbearia formato="desktop" />
          </JanelaNavegador>
        </div>

        {/* cafeteria no celular */}
        <div className="absolute right-[4%] bottom-0 w-[25%] motion-safe:animate-flutuar">
          <Celular fundo="#f3e6d3">
            <MiniCafeteria formato="celular" />
          </Celular>
        </div>

        {/* restaurante no celular */}
        <div className="absolute top-0 left-[2%] w-[20%] motion-safe:animate-[flutuar_8s_ease-in-out_infinite_1s]">
          <Celular fundo="#1e3a2d">
            <MiniRestaurante formato="celular" />
          </Celular>
        </div>

        {/* selo de domínio */}
        <div className="absolute bottom-[1%] left-0 flex items-center gap-2.5 rounded-2xl border border-tinta/10 bg-white/95 px-3.5 py-2.5 shadow-elevada backdrop-blur sm:px-4 sm:py-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-destaque text-tinta sm:h-9 sm:w-9">
            <Icone nome="globo" tamanho={18} />
          </span>
          <span className="leading-tight">
            <span className="block text-[0.7rem] text-suave sm:text-xs">Seu endereço próprio</span>
            <span className="block text-sm font-semibold text-tinta sm:text-[0.95rem]">seunegocio.com.br</span>
          </span>
        </div>
      </div>
      <figcaption className="mt-6 text-center text-xs text-suave">
        Demonstrações conceituais criadas para ilustrar o serviço.
      </figcaption>
    </figure>
  );
}
