import { Container } from "@/components/ui/Container";
import { Icone, type NomeIcone } from "@/components/ui/Icone";
import { Revelar } from "@/components/ui/Revelar";
import { TituloSecao } from "@/components/ui/TituloSecao";

const beneficios: { icone: NomeIcone; titulo: string; texto: string; destaque?: boolean }[] = [
  {
    icone: "layout",
    titulo: "Uma apresentação profissional",
    texto: "Mostre produtos, serviços, informações e diferenciais em uma página organizada e visualmente atraente.",
    destaque: true,
  },
  {
    icone: "globo",
    titulo: "Seu próprio endereço na internet",
    texto: "Tenha um domínio personalizado para divulgar sua empresa em cartões, redes sociais, mensagens e materiais comerciais.",
  },
  {
    icone: "conversa",
    titulo: "Contato mais fácil",
    texto: "Inclua botões para WhatsApp, telefone, endereço e outros canais que você usa no dia a dia.",
  },
  {
    icone: "celular",
    titulo: "Experiência adaptada ao celular",
    texto: "O site funciona bem em smartphones, tablets e computadores, do jeito que seus clientes preferirem acessar.",
  },
  {
    icone: "relogio",
    titulo: "Informações sempre acessíveis",
    texto: "Facilite a consulta de horários, localização, serviços, cardápio ou outras informações importantes.",
  },
  {
    icone: "busca",
    titulo: "Mais presença digital",
    texto: "Crie uma base própria para divulgar seu negócio e trabalhar sua presença nos sites de busca, como o Google.",
  },
];

export function Beneficios() {
  return (
    <section id="beneficios" aria-labelledby="titulo-beneficios" className="relative overflow-hidden bg-tinta py-24 text-white sm:py-32">
      <div aria-hidden="true" className="fundo-pontos-claro absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div aria-hidden="true" className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-destaque/20 blur-[120px]" />
      <Container className="relative">
        <TituloSecao
          id="titulo-beneficios"
          escuro
          rotulo="Benefícios"
          titulo="Mais do que um site. Uma nova forma de apresentar seu negócio."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {beneficios.map((b, i) => (
            <Revelar key={b.titulo} como="li" atraso={(i % 3) * 90}>
              <article
                className={`group relative h-full overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 sm:p-8 ${
                  b.destaque
                    ? "border-destaque bg-destaque text-tinta"
                    : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]"
                }`}
              >
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl ${
                    b.destaque ? "bg-tinta text-destaque" : "bg-white/10 text-destaque"
                  }`}
                >
                  <Icone nome={b.icone} tamanho={22} />
                </span>
                <h3 className="mt-8 font-titulo text-2xl leading-tight font-semibold tracking-tight">{b.titulo}</h3>
                <p className={`mt-3 leading-relaxed ${b.destaque ? "text-tinta/80" : "text-white/65"}`}>{b.texto}</p>
                <span aria-hidden="true" className={`absolute top-7 right-7 text-sm tabular-nums ${b.destaque ? "text-tinta/50" : "text-white/30"}`}>
                  0{i + 1}
                </span>
              </article>
            </Revelar>
          ))}
        </ul>
      </Container>
    </section>
  );
}
