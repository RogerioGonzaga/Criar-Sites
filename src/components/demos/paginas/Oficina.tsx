import { Icone, type NomeIcone } from "@/components/ui/Icone";
import { ArteOficina } from "../artes";
import { AcaoDemo } from "../AcaoDemo";
import { BarraDemo } from "../BarraDemo";
import { ChamadaDemo } from "../ChamadaDemo";

const SEG = "oficina mecânica";
const amarelo = "#ffc400";

const servicos: { icone: NomeIcone; nome: string; desc: string }[] = [
  { icone: "chave", nome: "Revisão completa", desc: "Checagem dos itens essenciais conforme o manual do veículo." },
  { icone: "escudo", nome: "Freios", desc: "Pastilhas, discos, fluido e regulagem." },
  { icone: "camadas", nome: "Suspensão", desc: "Amortecedores, molas, buchas e alinhamento." },
  { icone: "raio", nome: "Elétrica", desc: "Bateria, alternador, motor de partida e iluminação." },
  { icone: "relogio", nome: "Troca de óleo", desc: "Óleo e filtros adequados ao seu motor." },
  { icone: "busca", nome: "Diagnóstico", desc: "Leitura de falhas com scanner e avaliação técnica." },
];

export function DemoOficina() {
  return (
    <div className="bg-[#141414] font-sans text-white">
      <BarraDemo slug="oficina" />

      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <span className="font-oficina text-4xl font-extrabold uppercase">
            Torque<span style={{ color: amarelo }}>.</span>
          </span>
          <nav aria-label="Menu da oficina" className="hidden gap-8 font-oficina text-lg font-bold tracking-wide uppercase md:flex">
            <a href="#servicos" className="hover:text-[#ffc400]">Serviços</a>
            <a href="#como-funciona" className="hover:text-[#ffc400]">Como funciona</a>
            <a href="#contato" className="hover:text-[#ffc400]">Contato</a>
          </nav>
          <a href="#contato" className="px-4 py-2.5 font-oficina text-lg font-bold text-black uppercase" style={{ background: amarelo }}>
            Orçamento
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 border border-white/15 px-3 py-1.5 font-oficina text-base font-bold tracking-wider uppercase">
              <span className="h-2 w-2" style={{ background: amarelo }} aria-hidden="true" />
              Mecânica geral • Carros nacionais e importados
            </p>
            <h1 className="mt-6 font-oficina text-7xl leading-[0.88] font-extrabold uppercase sm:text-8xl lg:text-[7.5rem]">
              Seu carro em <span style={{ color: amarelo }}>boas mãos.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/70">
              Diagnóstico honesto, orçamento explicado item por item e serviço feito só depois da sua aprovação.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AcaoDemo
                segmento={SEG}
                acaoReal="abre o WhatsApp da oficina para pedir um orçamento com o modelo do carro"
                className="inline-flex min-h-14 items-center justify-center px-8 font-oficina text-xl font-bold text-black uppercase transition-transform hover:-translate-y-0.5"
                style={{ background: amarelo }}
              >
                Pedir orçamento
              </AcaoDemo>
              <a href="#servicos" className="inline-flex min-h-14 items-center justify-center border border-white/25 px-8 font-oficina text-xl font-bold uppercase hover:border-white">
                Ver serviços
              </a>
            </div>
          </div>
          <ArteOficina className="aspect-[4/3] w-full" rotulo="Ilustração de carro com engrenagem e faixa de sinalização amarela e preta" />
        </div>
      </section>

      <section id="servicos" aria-labelledby="of-servicos" className="bg-[#f2f2f0] py-24 text-[#141414]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 id="of-servicos" className="font-oficina text-6xl font-extrabold uppercase sm:text-7xl">
            Serviços
          </h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicos.map((s) => (
              <li key={s.nome} className="group border-l-4 bg-white p-7 shadow-sm transition-colors hover:bg-[#141414] hover:text-white" style={{ borderColor: amarelo }}>
                <Icone nome={s.icone} tamanho={30} />
                <h3 className="mt-5 font-oficina text-3xl font-bold uppercase">{s.nome}</h3>
                <p className="mt-2 opacity-70">{s.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="como-funciona" aria-labelledby="of-como" className="py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 id="of-como" className="font-oficina text-6xl font-extrabold uppercase sm:text-7xl">
            Sem surpresas no <span style={{ color: amarelo }}>orçamento</span>
          </h2>
          <ol className="mt-12 grid gap-px bg-white/10 md:grid-cols-4">
            {["Você agenda", "Fazemos o diagnóstico", "Você aprova o orçamento", "Entregamos o carro"].map((t, i) => (
              <li key={t} className="bg-[#141414] p-7">
                <span className="font-oficina text-6xl font-extrabold" style={{ color: amarelo }}>
                  {i + 1}
                </span>
                <p className="mt-3 font-oficina text-2xl font-bold uppercase">{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="contato" aria-labelledby="of-contato" className="py-20 text-black" style={{ background: amarelo }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
          <div>
            <h2 id="of-contato" className="font-oficina text-5xl font-extrabold uppercase sm:text-6xl">
              Segunda a sábado, das 8h às 18h
            </h2>
            <p className="mt-2 text-lg font-medium">Avenida Industrial, 1500 • Distrito Norte (endereço ilustrativo)</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <AcaoDemo segmento={SEG} acaoReal="abre o WhatsApp da oficina" className="inline-flex min-h-14 items-center justify-center bg-black px-8 font-oficina text-xl font-bold text-white uppercase">
              Chamar no WhatsApp
            </AcaoDemo>
            <AcaoDemo segmento={SEG} acaoReal="abre o mapa com a rota até a oficina" className="inline-flex min-h-14 items-center justify-center border-2 border-black px-8 font-oficina text-xl font-bold uppercase">
              Como chegar
            </AcaoDemo>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-white/55">
        <span className="font-oficina text-2xl font-extrabold text-white uppercase">Torque.</span>
        <p className="mt-1">Demonstração conceitual. Nome, endereço e informações fictícios.</p>
      </footer>

      <ChamadaDemo slug="oficina" />
    </div>
  );
}
