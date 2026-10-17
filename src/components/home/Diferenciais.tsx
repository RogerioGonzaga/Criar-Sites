import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Icone, type NomeIcone } from "@/components/ui/Icone";
import { Revelar } from "@/components/ui/Revelar";
import { TituloSecao } from "@/components/ui/TituloSecao";

const itens: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: "pessoas", titulo: "Atendimento direto", texto: "Você conversa com quem cuida do seu projeto, sem intermediários." },
  { icone: "conversa", titulo: "Comunicação simples", texto: "Explicamos cada etapa com palavras do dia a dia." },
  { icone: "loja", titulo: "Projeto adaptado ao negócio", texto: "O site é pensado para a sua atividade e o seu público." },
  { icone: "celular", titulo: "Layout responsivo", texto: "Seu site se ajusta ao celular, ao tablet e ao computador." },
  { icone: "globo", titulo: "Domínio próprio", texto: "Um endereço com o nome do seu negócio para divulgar." },
  { icone: "documento", titulo: "Condições transparentes", texto: "Tudo o que está incluído e o que é cobrado à parte, por escrito." },
  { icone: "etiqueta", titulo: "Pagamento único pela criação", texto: "O desenvolvimento contratado é pago uma única vez." },
  { icone: "foguete", titulo: "Orientação sobre publicação", texto: "Ajudamos você a entender como o site vai ao ar e se mantém no ar." },
];

export function Diferenciais() {
  const adicionais = siteConfig.oferta.servicosAdicionais;
  return (
    <section aria-labelledby="titulo-diferenciais" className="bg-nevoa py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <TituloSecao
              id="titulo-diferenciais"
              rotulo="Diferenciais"
              titulo="Profissionalismo sem complicação."
              subtitulo="Um processo pensado para quem quer um resultado bonito e confiável, sem precisar entender de tecnologia."
            />
          </div>
          <div>
            <ul className="grid gap-px overflow-hidden rounded-[2rem] border border-tinta/[0.08] bg-tinta/[0.08] sm:grid-cols-2">
              {itens.map((item, i) => (
                <Revelar key={item.titulo} como="li" atraso={(i % 2) * 80} className="group bg-white p-7 transition-colors duration-300 hover:bg-papel">
                  <Icone nome={item.icone} tamanho={24} className="text-tinta transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="mt-5 font-titulo text-lg font-semibold tracking-tight text-tinta">{item.titulo}</h3>
                  <p className="mt-1.5 leading-relaxed text-suave">{item.texto}</p>
                </Revelar>
              ))}
            </ul>
            {adicionais.length > 0 && (
              <Revelar className="mt-6 rounded-[2rem] border border-tinta/[0.08] bg-white p-7">
                <h3 className="font-titulo text-lg font-semibold">Serviços adicionais disponíveis</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {adicionais.map((s) => (
                    <li key={s} className="rounded-full bg-nevoa px-4 py-2 text-sm font-medium">
                      {s}
                    </li>
                  ))}
                </ul>
              </Revelar>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
