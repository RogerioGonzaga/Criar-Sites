import { Icone, type NomeIcone } from "@/components/ui/Icone";
import { ArteServicos } from "../artes";
import { AcaoDemo } from "../AcaoDemo";
import { BarraDemo } from "../BarraDemo";
import { ChamadaDemo } from "../ChamadaDemo";

const SEG = "prestador de serviços";
const azul = "#1f5eff";
const marinho = "#0d1b3e";

const servicos: { icone: NomeIcone; nome: string; desc: string }[] = [
  { icone: "raio", nome: "Instalações elétricas", desc: "Tomadas, interruptores, chuveiros e pontos novos." },
  { icone: "layout", nome: "Quadros de energia", desc: "Montagem, troca de disjuntores e organização." },
  { icone: "brilho", nome: "Iluminação", desc: "Luminárias, spots, fitas de LED e iluminação externa." },
  { icone: "escudo", nome: "Manutenção preventiva", desc: "Revisão da instalação para evitar problemas." },
  { icone: "loja", nome: "Atendimento comercial", desc: "Lojas, escritórios e pequenos comércios." },
  { icone: "busca", nome: "Identificação de falhas", desc: "Localização de curtos e quedas de energia." },
];

const regioes = ["Centro", "Zona Norte", "Zona Sul", "Jardim América", "Vila Nova", "Parque das Flores"];

export function DemoServicos() {
  return (
    <div className="bg-white font-servicos text-[#0d1b3e]">
      <BarraDemo slug="servicos" />

      <header className="border-b border-[#0d1b3e]/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <span className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-xl text-[#ffd23f]" style={{ background: azul }}>
              <Icone nome="raio" tamanho={20} />
            </span>
            Lumen Elétrica
          </span>
          <nav aria-label="Menu do prestador de serviços" className="hidden gap-8 font-semibold md:flex">
            <a href="#servicos" className="hover:text-[#1f5eff]">Serviços</a>
            <a href="#regioes" className="hover:text-[#1f5eff]">Regiões</a>
            <a href="#duvidas" className="hover:text-[#1f5eff]">Dúvidas</a>
          </nav>
          <AcaoDemo
            segmento={SEG}
            acaoReal="abre o WhatsApp do eletricista para solicitar uma visita"
            className="hidden min-h-11 rounded-xl px-5 font-bold text-white sm:inline-flex sm:items-center"
            style={{ background: azul }}
          >
            Solicitar visita
          </AcaoDemo>
        </div>
      </header>

      <section className="bg-[linear-gradient(180deg,#f3f6ff,#fff)]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-block rounded-full bg-[#e8efff] px-4 py-1.5 text-sm font-bold" style={{ color: azul }}>
              Atendimento residencial e comercial
            </span>
            <h1 className="mt-5 text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl">
              Instalações elétricas seguras e bem feitas.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#0d1b3e]/70">
              Do chuveiro que não esquenta ao quadro de energia completo: atendimento com hora marcada, explicação clara e
              orçamento antes de começar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AcaoDemo
                segmento={SEG}
                acaoReal="abre o WhatsApp do eletricista com uma mensagem pronta para pedir orçamento"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl px-7 text-lg font-bold text-white shadow-lg shadow-blue-600/30"
                style={{ background: azul }}
              >
                <Icone nome="whatsapp" tamanho={20} />
                Pedir orçamento
              </AcaoDemo>
              <a href="#servicos" className="inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-[#0d1b3e]/10 px-7 text-lg font-bold hover:border-[#0d1b3e]/30">
                Ver serviços
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-[#0d1b3e]/75">
              {["Hora marcada", "Orçamento antes do serviço", "Local limpo ao final"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Icone nome="check" tamanho={16} style={{ color: azul }} strokeWidth={2.5} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <ArteServicos className="aspect-[4/3] w-full rounded-3xl" rotulo="Ilustração de casa com selo de raio, representando serviços elétricos" />
        </div>
      </section>

      <section id="servicos" aria-labelledby="sv-servicos" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <h2 id="sv-servicos" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Como posso ajudar
        </h2>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map((s) => (
            <li key={s.nome} className="rounded-3xl border border-[#0d1b3e]/10 p-7 transition-all hover:-translate-y-1 hover:border-[#1f5eff]/40 hover:shadow-xl hover:shadow-blue-600/10">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e8efff]" style={{ color: azul }}>
                <Icone nome={s.icone} tamanho={24} />
              </span>
              <h3 className="mt-5 text-xl font-bold">{s.nome}</h3>
              <p className="mt-2 text-[#0d1b3e]/70">{s.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="regioes" aria-labelledby="sv-regioes" className="text-white" style={{ background: marinho }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="sv-regioes" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Regiões atendidas
            </h2>
            <p className="mt-4 text-lg text-white/70">Não encontrou seu bairro? Envie uma mensagem e confirme a disponibilidade.</p>
          </div>
          <ul className="flex flex-wrap gap-3">
            {regioes.map((r) => (
              <li key={r} className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-semibold">
                <Icone nome="pino" tamanho={16} className="text-[#ffd23f]" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="duvidas" aria-labelledby="sv-duvidas" className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <h2 id="sv-duvidas" className="text-center text-4xl font-extrabold tracking-tight">
          Dúvidas comuns
        </h2>
        <div className="mt-10 space-y-3">
          {[
            ["A visita para orçamento é cobrada?", "As condições da visita são informadas no primeiro contato, antes de agendar."],
            ["Vocês atendem aos finais de semana?", "Sim, aos sábados pela manhã, com agendamento prévio."],
            ["Preciso comprar o material?", "Você pode comprar ou pedir que o material seja incluído no orçamento."],
          ].map(([p, r]) => (
            <details key={p} className="group rounded-2xl border border-[#0d1b3e]/10 p-5 open:bg-[#f3f6ff]">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold">
                {p}
                <Icone nome="mais" tamanho={20} className="shrink-0 transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-[#0d1b3e]/75">{r}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#0d1b3e]/10 py-10 text-center text-sm text-[#0d1b3e]/60">
        <p className="text-lg font-extrabold text-[#0d1b3e]">Lumen Elétrica</p>
        <p className="mt-1">Demonstração conceitual. Nome, regiões e informações fictícios.</p>
      </footer>

      <ChamadaDemo slug="servicos" />
    </div>
  );
}
