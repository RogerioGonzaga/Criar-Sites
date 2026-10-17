import { ArteSalao } from "../artes";
import { AcaoDemo } from "../AcaoDemo";
import { BarraDemo } from "../BarraDemo";
import { ChamadaDemo } from "../ChamadaDemo";

const SEG = "salão de beleza";
const ameixa = "#5a2747";
const ouro = "#b8894a";

const servicos = [
  { area: "Cabelo", itens: ["Corte e escova", "Coloração e mechas", "Hidratação e reconstrução", "Penteados para eventos"] },
  { area: "Unhas", itens: ["Manicure e pedicure", "Esmaltação em gel", "Spa dos pés", "Alongamento"] },
  { area: "Estética", itens: ["Design de sobrancelhas", "Limpeza de pele", "Maquiagem social", "Depilação"] },
];

export function DemoSalao() {
  return (
    <div className="bg-[#fbf1ed] font-sans text-[#4a1f3d]">
      <BarraDemo slug="salao" />

      <header className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-8 sm:px-8 md:flex-row md:justify-between">
        <nav aria-label="Menu do salão (esquerda)" className="hidden gap-8 text-sm tracking-[0.2em] uppercase md:flex">
          <a href="#servicos">Serviços</a>
          <a href="#espaco">Espaço</a>
        </nav>
        <span className="font-salao text-5xl italic">Studio Flora</span>
        <nav aria-label="Menu do salão (direita)" className="flex gap-6 text-sm tracking-[0.2em] uppercase md:gap-8">
          <a href="#equipe" className="hidden md:inline">Equipe</a>
          <a href="#agendar">Agendar</a>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-end gap-12 px-5 pt-6 pb-24 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="pb-6">
          <p className="text-sm tracking-[0.35em] uppercase opacity-70">Cabelo • Unhas • Estética</p>
          <h1 className="mt-5 font-salao text-6xl leading-[0.95] sm:text-7xl lg:text-[6.5rem]">
            Beleza com <em>cuidado</em> em cada detalhe.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed opacity-80">
            Um espaço acolhedor para você se cuidar com calma, com profissionais atentas ao que você deseja.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AcaoDemo
              segmento={SEG}
              acaoReal="abre o WhatsApp do salão com uma mensagem para agendar um horário"
              className="inline-flex min-h-13 items-center justify-center rounded-full px-8 text-white transition-transform hover:-translate-y-0.5"
              style={{ background: ameixa }}
            >
              Agendar visita
            </AcaoDemo>
            <a href="#servicos" className="inline-flex min-h-13 items-center justify-center rounded-full border border-[#4a1f3d]/25 px-8 hover:bg-white/60">
              Conhecer serviços
            </a>
          </div>
        </div>
        <ArteSalao className="aspect-[4/5] w-full rounded-t-[20rem]" rotulo="Ilustração de espelho em arco com moldura dourada e folhagens" />
      </section>

      <section id="servicos" aria-labelledby="sl-servicos" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center">
            <p className="text-sm tracking-[0.3em] uppercase" style={{ color: ouro }}>
              Nossos serviços
            </p>
            <h2 id="sl-servicos" className="mt-3 font-salao text-5xl sm:text-6xl">
              Tudo para você se sentir <em>bem</em>.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {servicos.map((s) => (
              <div key={s.area} className="rounded-t-[10rem] rounded-b-3xl border border-[#4a1f3d]/10 bg-[#fbf1ed] px-8 pt-16 pb-10 text-center">
                <h3 className="font-salao text-4xl italic">{s.area}</h3>
                <ul className="mt-6 space-y-3">
                  {s.itens.map((i) => (
                    <li key={i} className="border-b border-[#4a1f3d]/10 pb-3 opacity-85">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="espaco" aria-labelledby="sl-espaco" className="py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] rounded-t-full" style={{ background: `linear-gradient(160deg, #ecc9bf, ${ameixa})` }} />
            <div className="mt-12 aspect-[3/4] rounded-t-full" style={{ background: `linear-gradient(200deg, #f7e3dc, ${ouro})` }} />
          </div>
          <div>
            <h2 id="sl-espaco" className="font-salao text-5xl leading-tight">
              Um espaço pensado para o seu <em>momento</em>.
            </h2>
            <p className="mt-5 text-lg leading-relaxed opacity-80">
              Ambiente climatizado, música tranquila e um cafezinho enquanto você é atendida. Aqui, cada visita é um momento
              só seu.
            </p>
          </div>
        </div>
      </section>

      <section id="equipe" aria-labelledby="sl-equipe" className="py-24 text-[#fbf1ed]" style={{ background: ameixa }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 id="sl-equipe" className="text-center font-salao text-5xl sm:text-6xl">
            Nossa <em>equipe</em>
          </h2>
          <ul className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              ["Marina", "Coloração e cortes"],
              ["Bia", "Unhas e spa dos pés"],
              ["Carla", "Estética e maquiagem"],
            ].map(([nome, esp]) => (
              <li key={nome} className="text-center">
                <div className="mx-auto grid aspect-square w-40 place-items-center rounded-full border-2" style={{ borderColor: ouro }}>
                  <span className="font-salao text-7xl italic" aria-hidden="true">
                    {nome[0]}
                  </span>
                </div>
                <h3 className="mt-5 font-salao text-3xl">{nome}</h3>
                <p className="opacity-75">{esp}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="agendar" aria-labelledby="sl-agendar" className="py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 id="sl-agendar" className="font-salao text-5xl sm:text-6xl">
            Reserve seu <em>horário</em>
          </h2>
          <p className="mt-4 text-lg opacity-80">Terça a sábado, das 9h às 19h • Avenida das Acácias, 300</p>
          <p className="text-sm opacity-60">Endereço e horários ilustrativos desta demonstração.</p>
          <AcaoDemo
            segmento={SEG}
            acaoReal="abre o WhatsApp do salão para agendar um horário"
            className="mt-8 inline-flex min-h-13 items-center justify-center rounded-full px-10 text-white"
            style={{ background: ameixa }}
          >
            Agendar pelo WhatsApp
          </AcaoDemo>
        </div>
      </section>

      <footer className="border-t border-[#4a1f3d]/10 py-10 text-center text-sm opacity-70">
        <p className="font-salao text-3xl italic">Studio Flora</p>
        <p className="mt-1">Demonstração conceitual. Nome, endereço e informações fictícios.</p>
      </footer>

      <ChamadaDemo slug="salao" />
    </div>
  );
}
