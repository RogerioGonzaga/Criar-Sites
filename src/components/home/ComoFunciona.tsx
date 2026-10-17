import { Container } from "@/components/ui/Container";
import { Icone, type NomeIcone } from "@/components/ui/Icone";
import { Revelar } from "@/components/ui/Revelar";
import { TituloSecao } from "@/components/ui/TituloSecao";

const etapas: { icone: NomeIcone; titulo: string; texto: string }[] = [
  {
    icone: "conversa",
    titulo: "Conte sobre seu negócio",
    texto: "Entendemos sua atividade, seus serviços, seu público e o que você deseja apresentar.",
  },
  {
    icone: "paleta",
    titulo: "Criamos seu site",
    texto: "Desenvolvemos uma apresentação visual adequada à identidade do seu negócio e ao pacote contratado.",
  },
  {
    icone: "lapis",
    titulo: "Você revisa",
    texto: "Você confere as informações e solicita os ajustes previstos na proposta.",
  },
  {
    icone: "foguete",
    titulo: "Seu site vai ao ar",
    texto: "Após a aprovação, configuramos a publicação no domínio combinado.",
  },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" aria-labelledby="titulo-como-funciona" className="relative bg-nevoa py-24 sm:py-32">
      <Container>
        <TituloSecao
          id="titulo-como-funciona"
          rotulo="Como funciona"
          titulo="Seu site em quatro etapas simples."
          subtitulo="Você acompanha cada passo e sabe exatamente o que esperar. Sem termos complicados."
          centralizado
        />

        <ol className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div
            aria-hidden="true"
            className="absolute top-8 right-[12%] left-[12%] hidden h-px bg-[repeating-linear-gradient(90deg,rgb(13_16_14/0.25)_0_6px,transparent_6px_12px)] lg:block"
          />
          {etapas.map((etapa, i) => (
            <Revelar key={etapa.titulo} como="li" atraso={i * 110} className="relative">
              <div className="relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full border-4 border-nevoa bg-tinta font-titulo text-xl font-bold text-destaque lg:mx-0">
                {i + 1}
              </div>
              <div className="mt-5 h-[calc(100%-5.25rem)] rounded-3xl border border-tinta/[0.07] bg-white p-7 text-center shadow-suave lg:text-left">
                <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-nevoa text-tinta lg:mx-0">
                  <Icone nome={etapa.icone} tamanho={21} />
                </span>
                <p className="mt-5 text-sm font-semibold text-suave">Etapa {i + 1}</p>
                <h3 className="mt-1 font-titulo text-xl font-semibold tracking-tight text-tinta">{etapa.titulo}</h3>
                <p className="mt-3 leading-relaxed text-suave">{etapa.texto}</p>
              </div>
            </Revelar>
          ))}
        </ol>
      </Container>
    </section>
  );
}
