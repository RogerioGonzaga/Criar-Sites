import { Container } from "@/components/ui/Container";
import { Icone } from "@/components/ui/Icone";
import { Revelar } from "@/components/ui/Revelar";
import { TituloSecao } from "@/components/ui/TituloSecao";

const linhas = [
  {
    aspecto: "Organização das informações",
    redes: "Espalhadas entre publicações, destaques e mensagens",
    site: "Reunidas em um só lugar, com seções bem definidas",
  },
  {
    aspecto: "Apresentação dos serviços",
    redes: "Depende do formato de cada rede",
    site: "Do jeito que você quiser mostrar, com descrições completas",
  },
  {
    aspecto: "Endereço digital próprio",
    redes: "Perfil dentro de uma plataforma",
    site: "Um domínio com o nome do seu negócio",
  },
  {
    aspecto: "Facilidade para compartilhar",
    redes: "Algumas redes pedem cadastro ou aplicativo para ver tudo",
    site: "Um link simples que abre em qualquer navegador",
  },
  {
    aspecto: "Identidade visual",
    redes: "Limitada ao layout da plataforma",
    site: "Cores, fontes e estilo da sua marca",
  },
  {
    aspecto: "Presença nos sites de busca",
    redes: "Depende das regras de cada plataforma",
    site: "Uma base própria para trabalhar sua presença no Google",
  },
];

export function Comparacao() {
  return (
    <section aria-labelledby="titulo-comparacao" className="py-24 sm:py-32">
      <Container>
        <TituloSecao
          id="titulo-comparacao"
          rotulo="Comparação"
          titulo="Uma solução prática para quem quer começar."
          subtitulo="As redes sociais são ótimas para se relacionar com os clientes. O site complementa esse trabalho: ele não precisa substituir suas redes, e sim reunir tudo em um endereço que é seu."
        />

        <Revelar className="mt-14">
          <div className="overflow-hidden rounded-[2rem] border border-tinta/[0.08] bg-white shadow-suave">
            <div className="hidden grid-cols-[1fr_1.2fr_1.2fr] border-b border-tinta/[0.08] bg-papel md:grid">
              <div className="p-6 text-sm font-semibold text-suave">Aspecto</div>
              <div className="flex items-center gap-2 p-6 font-semibold text-tinta">
                <Icone nome="compartilhar" tamanho={18} className="text-suave" />
                Apenas redes sociais
              </div>
              <div className="flex items-center gap-2 bg-tinta p-6 font-semibold text-white">
                <Icone nome="globo" tamanho={18} className="text-destaque" />
                Redes sociais + site próprio
              </div>
            </div>
            <dl>
              {linhas.map((l) => (
                <div
                  key={l.aspecto}
                  className="grid gap-3 border-b border-tinta/[0.06] p-5 last:border-0 md:grid-cols-[1fr_1.2fr_1.2fr] md:gap-0 md:p-0"
                >
                  <dt className="font-titulo text-lg font-semibold text-tinta md:p-6 md:text-base">{l.aspecto}</dt>
                  <dd className="flex gap-3 text-suave md:p-6">
                    <span className="sr-only">Apenas redes sociais:</span>
                    <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-tinta/25" />
                    {l.redes}
                  </dd>
                  <dd className="flex gap-3 rounded-xl bg-destaque/20 p-3 font-medium text-tinta md:rounded-none md:bg-destaque/[0.14] md:p-6">
                    <span className="sr-only">Redes sociais e site próprio:</span>
                    <Icone nome="check" tamanho={18} className="mt-0.5 shrink-0" strokeWidth={2.5} />
                    {l.site}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Revelar>
      </Container>
    </section>
  );
}
