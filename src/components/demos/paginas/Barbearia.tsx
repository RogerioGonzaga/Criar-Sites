import { ArteBarbearia } from "../artes";
import { AcaoDemo } from "../AcaoDemo";
import { BarraDemo } from "../BarraDemo";
import { ChamadaDemo } from "../ChamadaDemo";

const latao = "#d39b5e";
const SEG = "barbearia";

const servicos = [
  { nome: "Corte masculino", detalhe: "Tesoura ou máquina, com acabamento na navalha.", duracao: "40 min" },
  { nome: "Barba completa", detalhe: "Toalha quente, navalha e hidratação.", duracao: "30 min" },
  { nome: "Corte + barba", detalhe: "O combo completo para sair renovado.", duracao: "70 min" },
  { nome: "Pezinho e sobrancelha", detalhe: "Manutenção rápida entre um corte e outro.", duracao: "15 min" },
  { nome: "Corte infantil", detalhe: "Atendimento com paciência para os pequenos.", duracao: "30 min" },
  { nome: "Pigmentação", detalhe: "Realce de barba e cabelo com acabamento natural.", duracao: "30 min" },
];

const horarios = [
  ["Terça a sexta", "9h às 20h"],
  ["Sábado", "8h às 18h"],
  ["Domingo e segunda", "Fechado"],
];

export function DemoBarbearia() {
  return (
    <div className="bg-[#141210] text-[#f4ede2] [font-family:var(--font-sans)]">
      <BarraDemo slug="barbearia" />

      {/* Navegação do site fictício */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <span className="font-barbearia text-4xl tracking-wider">
          BRASA<span style={{ color: latao }}>.</span>
        </span>
        <nav aria-label="Menu da barbearia" className="hidden gap-8 text-sm tracking-[0.2em] text-white/70 uppercase md:flex">
          <a href="#servicos" className="hover:text-white">Serviços</a>
          <a href="#equipe" className="hover:text-white">Equipe</a>
          <a href="#horarios" className="hover:text-white">Horários</a>
        </nav>
        <a href="#horarios" className="rounded-sm border px-4 py-2.5 text-sm font-semibold tracking-wider uppercase md:hidden" style={{ borderColor: latao, color: latao }}>
          Agendar
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pt-6 pb-20 sm:px-8 lg:grid-cols-2 lg:pt-10">
        <div>
          <p className="text-sm tracking-[0.35em] uppercase" style={{ color: latao }}>
            Barbearia clássica • Centro
          </p>
          <h1 className="mt-4 font-barbearia text-[5rem] leading-[0.85] sm:text-[7rem] lg:text-[8.5rem]">
            Corte, barba
            <br />& atitude.
          </h1>
          <p className="mt-6 max-w-md text-lg text-white/70">
            Ambiente descontraído, profissionais experientes e horário marcado sem complicação. Chegue, sente e relaxe.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AcaoDemo
              segmento={SEG}
              acaoReal="abre o WhatsApp da barbearia com uma mensagem pronta para agendar um horário"
              style={{ background: latao }}
              className="min-h-13 rounded-sm px-7 py-4 font-bold tracking-wider text-[#141210] uppercase transition-transform hover:-translate-y-0.5"
            >
              Agendar pelo WhatsApp
            </AcaoDemo>
            <a href="#servicos" className="min-h-13 rounded-sm border border-white/25 px-7 py-4 text-center font-bold tracking-wider uppercase hover:border-white/60">
              Ver serviços
            </a>
          </div>
        </div>
        <div className="relative">
          <ArteBarbearia className="aspect-[4/3] w-full rounded-md" rotulo="Ilustração de poste de barbeiro, navalha e pente sobre fundo escuro" />
          <div className="absolute -bottom-6 left-3 rounded-sm px-5 py-4 text-[#141210] shadow-2xl sm:-left-8" style={{ background: latao }}>
            <p className="font-barbearia text-3xl leading-none">Horário marcado</p>
            <p className="text-sm font-semibold">Sem fila e sem espera</p>
          </div>
        </div>
      </section>

      {/* Faixa */}
      <div className="overflow-hidden border-y border-white/10 py-5" aria-hidden="true">
        <p className="font-barbearia text-3xl whitespace-nowrap text-white/20">
          {"CORTE • BARBA • NAVALHA • TOALHA QUENTE • CORTE INFANTIL • PIGMENTAÇÃO • ".repeat(3)}
        </p>
      </div>

      {/* Serviços */}
      <section id="servicos" aria-labelledby="bb-servicos" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 id="bb-servicos" className="font-barbearia text-6xl sm:text-7xl">Serviços</h2>
          <p className="max-w-sm text-white/60">Valores informados no atendimento. Todos os serviços com hora marcada.</p>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-md bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map((s, i) => (
            <li key={s.nome} className="group bg-[#141210] p-8 transition-colors hover:bg-[#1d1915]">
              <span className="font-barbearia text-2xl" style={{ color: latao }}>
                0{i + 1}
              </span>
              <h3 className="mt-3 font-barbearia text-4xl tracking-wide">{s.nome}</h3>
              <p className="mt-2 text-white/65">{s.detalhe}</p>
              <p className="mt-6 text-xs tracking-[0.25em] text-white/50 uppercase">Duração média: {s.duracao}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Equipe */}
      <section id="equipe" aria-labelledby="bb-equipe" className="bg-[#f4ede2] py-24 text-[#141210]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 id="bb-equipe" className="font-barbearia text-6xl sm:text-7xl">Quem cuida de você</h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              ["Rafa", "Cortes clássicos e degradê"],
              ["Duda", "Barba e acabamento na navalha"],
              ["Léo", "Cortes modernos e pigmentação"],
            ].map(([nome, esp]) => (
              <li key={nome} className="overflow-hidden rounded-md bg-[#141210] text-[#f4ede2]">
                <div className="grid aspect-[4/3] place-items-center bg-[radial-gradient(circle_at_50%_30%,#5a3a22,#141210)]">
                  <span className="font-barbearia text-8xl" style={{ color: latao }} aria-hidden="true">
                    {nome[0]}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-barbearia text-3xl tracking-wide">{nome}</h3>
                  <p className="text-white/65">{esp}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Horários e local */}
      <section id="horarios" aria-labelledby="bb-horarios" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2">
        <div>
          <h2 id="bb-horarios" className="font-barbearia text-6xl sm:text-7xl">Horários</h2>
          <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {horarios.map(([dia, hora]) => (
              <div key={dia} className="flex justify-between py-5 text-lg">
                <dt className="text-white/70">{dia}</dt>
                <dd className="font-semibold">{hora}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-col justify-between rounded-md border border-white/10 p-8" style={{ background: "linear-gradient(140deg,#2a1c13,#141210)" }}>
          <div>
            <p className="text-sm tracking-[0.3em] uppercase" style={{ color: latao }}>
              Como chegar
            </p>
            <p className="mt-3 font-barbearia text-4xl">Rua das Palmeiras, 120 • Centro</p>
            <p className="mt-2 text-white/60">Endereço ilustrativo desta demonstração.</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AcaoDemo
              segmento={SEG}
              acaoReal="abre o WhatsApp da barbearia para agendar um horário"
              style={{ background: latao }}
              className="min-h-12 flex-1 rounded-sm px-6 py-3 font-bold tracking-wider text-[#141210] uppercase"
            >
              Agendar horário
            </AcaoDemo>
            <AcaoDemo
              segmento={SEG}
              acaoReal="abre o mapa com o endereço da barbearia"
              className="min-h-12 flex-1 rounded-sm border border-white/25 px-6 py-3 font-bold tracking-wider uppercase"
            >
              Abrir no mapa
            </AcaoDemo>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/50">
        <span className="font-barbearia text-2xl text-white/80">BRASA.</span>
        <p className="mt-1">Demonstração conceitual. Nome, endereço e informações fictícios.</p>
      </footer>

      <ChamadaDemo slug="barbearia" />
    </div>
  );
}
