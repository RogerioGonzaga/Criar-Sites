import { Container } from "@/components/ui/Container";
import { Icone, type NomeIcone } from "@/components/ui/Icone";
import { Revelar } from "@/components/ui/Revelar";
import { TituloSecao } from "@/components/ui/TituloSecao";

const situacoes: { icone: NomeIcone; texto: string }[] = [
  { icone: "compartilhar", texto: "Seus clientes precisam procurar informações em diferentes redes sociais." },
  { icone: "globo", texto: "Você não tem um endereço digital próprio para divulgar." },
  { icone: "layout", texto: "Seu negócio merece uma apresentação mais organizada." },
  { icone: "escudo", texto: "Você quer transmitir mais confiança a quem ainda não conhece sua empresa." },
];

export function Problema() {
  return (
    <section aria-labelledby="titulo-problema" className="relative bg-nevoa py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <TituloSecao
              id="titulo-problema"
              rotulo="Presença digital"
              titulo="Seu negócio já é profissional. Sua presença digital também deveria ser."
              subtitulo="Você cuida dos seus clientes, dos seus produtos e de cada detalhe do seu negócio. Agora, sua presença na internet também pode transmitir esse cuidado."
            />
          </div>

          <div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {situacoes.map((s, i) => (
                <Revelar key={s.texto} como="li" atraso={i * 90}>
                  <div className="group h-full rounded-3xl border border-tinta/[0.07] bg-white p-6 shadow-suave transition-all duration-300 hover:-translate-y-1 hover:border-tinta/15 sm:p-7">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-nevoa text-tinta transition-colors duration-300 group-hover:bg-destaque">
                      <Icone nome={s.icone} tamanho={22} />
                    </span>
                    <p className="mt-6 text-lg leading-snug font-medium text-tinta">{s.texto}</p>
                  </div>
                </Revelar>
              ))}
            </ul>
            <Revelar className="mt-6">
              <p className="rounded-3xl bg-tinta p-7 font-titulo text-xl leading-snug font-semibold text-white sm:p-8 sm:text-2xl">
                Chegou a hora de apresentar seu negócio de uma forma que{" "}
                <span className="text-destaque">combine com o valor que ele tem.</span>
              </p>
            </Revelar>
          </div>
        </div>
      </Container>
    </section>
  );
}
