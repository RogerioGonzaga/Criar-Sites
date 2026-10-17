import { Container } from "@/components/ui/Container";
import { BotaoContratar } from "@/components/ui/BotaoContratar";
import { Revelar } from "@/components/ui/Revelar";

export function ChamadaFinal() {
  return (
    <section aria-labelledby="titulo-chamada-final" className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-destaque py-24 sm:py-32">
        <div aria-hidden="true" className="fundo-pontos absolute inset-0 -z-10 opacity-60" />
        <div aria-hidden="true" className="absolute -right-24 -bottom-24 -z-10 h-[26rem] w-[26rem] rounded-full border-[3.5rem] border-tinta/[0.06]" />
        <div aria-hidden="true" className="absolute -top-32 -left-20 -z-10 h-[22rem] w-[22rem] rounded-full border-[2.5rem] border-tinta/[0.05]" />
        <Container>
          <Revelar className="mx-auto max-w-4xl text-center">
            <h2
              id="titulo-chamada-final"
              className="texto-equilibrado font-titulo text-4xl leading-[1] font-extrabold tracking-[-0.035em] text-tinta sm:text-6xl lg:text-7xl"
            >
              Seu próximo cliente pode estar procurando por você.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tinta/80 sm:text-xl">
              Dê ao seu negócio um endereço próprio na internet e apresente sua marca com o profissionalismo que ela merece.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <BotaoContratar texto="Vamos criar meu site" variante="escuro" tamanho="lg" />
              <p className="text-tinta/75">Conte sobre seu negócio e descubra a melhor solução para você.</p>
            </div>
          </Revelar>
        </Container>
      </div>
    </section>
  );
}
