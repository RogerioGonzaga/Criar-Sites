import { detalhes, formatarPreco, incluidos, oferta, separados, transparencia } from "@/lib/oferta";
import { Container } from "@/components/ui/Container";
import { BotaoContratar } from "@/components/ui/BotaoContratar";
import { Icone } from "@/components/ui/Icone";
import { Revelar } from "@/components/ui/Revelar";
import { TituloSecao } from "@/components/ui/TituloSecao";

export function Oferta() {
  const temPreco = oferta.preco !== null;
  return (
    <section id="planos" aria-labelledby="titulo-oferta" className="relative overflow-hidden bg-tinta py-24 text-white sm:py-32">
      <div aria-hidden="true" className="absolute -top-32 right-0 h-[30rem] w-[30rem] rounded-full bg-destaque/15 blur-[130px]" />
      <Container className="relative">
        <TituloSecao
          id="titulo-oferta"
          escuro
          rotulo="Planos e orçamento"
          titulo="Um site profissional é um investimento, não uma mensalidade eterna."
          subtitulo="Você paga uma vez pelo desenvolvimento do projeto contratado e sabe, desde o início, quais serão os custos para manter seu site no ar."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* Card da oferta */}
          <Revelar>
            <article className="relative h-full overflow-hidden rounded-[2rem] bg-white p-7 text-tinta shadow-elevada sm:p-10">
              <div aria-hidden="true" className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-destaque/40 blur-3xl" />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-titulo text-2xl font-bold tracking-tight sm:text-3xl">{oferta.nomePlano}</h3>
                  <span className="rounded-full bg-destaque px-3 py-1 text-sm font-semibold">Pagamento único pela criação</span>
                </div>
                <p className="mt-3 max-w-lg leading-relaxed text-suave">{oferta.descricao}</p>

                <div className="mt-8 rounded-2xl border border-tinta/10 bg-papel p-6">
                  {temPreco ? (
                    <>
                      <p className="text-sm font-medium text-suave">Investimento no desenvolvimento</p>
                      <p className="mt-1 font-titulo text-5xl font-extrabold tracking-tight">{formatarPreco(oferta.preco as number)}</p>
                      {oferta.condicoesPagamento && <p className="mt-1 text-suave">{oferta.condicoesPagamento}</p>}
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-suave">Investimento no desenvolvimento</p>
                      <p className="mt-1 font-titulo text-3xl font-bold tracking-tight sm:text-4xl">Solicite um orçamento personalizado.</p>
                      <p className="mt-2 text-suave">O valor depende do que o seu negócio precisa. Você recebe tudo por escrito antes de decidir.</p>
                    </>
                  )}
                </div>

                <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {detalhes.map((d) => (
                    <div key={d.rotulo} className="border-t border-tinta/10 pt-4">
                      <dt className="text-sm text-suave">{d.rotulo}</dt>
                      <dd className="mt-1 font-semibold">{d.valor}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-10">
                  <BotaoContratar texto="Quero solicitar meu orçamento" variante="escuro" tamanho="lg" className="w-full sm:w-auto" />
                </div>
              </div>
            </article>
          </Revelar>

          {/* Incluído x separado */}
          <div className="grid gap-6">
            <Revelar atraso={100}>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 sm:p-8">
                <h3 className="flex items-center gap-3 font-titulo text-xl font-semibold">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-destaque text-tinta">
                    <Icone nome="check" tamanho={18} strokeWidth={2.5} />
                  </span>
                  O que está incluído
                </h3>
                <ul className="mt-6 space-y-3">
                  {incluidos.map((item) => (
                    <li key={item} className="flex gap-3 text-white/85">
                      <Icone nome="check" tamanho={18} className="mt-0.5 shrink-0 text-destaque" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Revelar>
            <Revelar atraso={180}>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 sm:p-8">
                <h3 className="flex items-center gap-3 font-titulo text-xl font-semibold">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white">
                    <Icone nome="etiqueta" tamanho={18} />
                  </span>
                  O que é cobrado separadamente
                </h3>
                <ul className="mt-6 space-y-3">
                  {separados.map((item) => (
                    <li key={item} className="flex gap-3 text-white/85">
                      <Icone nome="mais" tamanho={18} className="mt-0.5 shrink-0 text-white/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Revelar>
          </div>
        </div>

        {/* Explicação clara sobre custos */}
        <Revelar className="mt-6">
          <div className="rounded-[2rem] border border-destaque/30 bg-destaque/[0.07] p-7 sm:p-10">
            <p className="font-titulo text-xl leading-snug font-semibold sm:text-2xl">
              O desenvolvimento é pago uma única vez. O domínio precisa ser renovado periodicamente e a hospedagem poderá ter
              um custo separado, dependendo do pacote contratado.
            </p>
            <dl className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
              {transparencia.map((t) => (
                <div key={t.pergunta}>
                  <dt className="font-semibold text-destaque">{t.pergunta}</dt>
                  <dd className="mt-1 leading-relaxed text-white/75">{t.resposta}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-sm text-white/60">
              Domínio é o endereço do seu site (por exemplo, seunegocio.com.br). Hospedagem é o serviço que mantém o site
              disponível na internet.
            </p>
          </div>
        </Revelar>
      </Container>
    </section>
  );
}
