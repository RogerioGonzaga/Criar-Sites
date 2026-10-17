import { ArteCafeteria, ArteRestaurante } from "../artes";
import { AcaoDemo } from "../AcaoDemo";
import { BarraDemo } from "../BarraDemo";
import { ChamadaDemo } from "../ChamadaDemo";

const SEG = "cafeteria e restaurante";
const terracota = "#c8643b";
const cafe = "#3b2416";

const cardapio = [
  {
    categoria: "Cafés",
    itens: [
      ["Espresso", "Grãos torrados na semana, extração curta e encorpada."],
      ["Cappuccino da casa", "Espresso, leite vaporizado e um toque de canela."],
      ["Coado no V60", "Preparado na hora, com notas que mudam a cada safra."],
    ],
  },
  {
    categoria: "Para acompanhar",
    itens: [
      ["Pão de queijo", "Receita mineira, assado em pequenas fornadas."],
      ["Bolo do dia", "Sempre caseiro. Pergunte qual saiu do forno hoje."],
      ["Croissant", "Massa folhada amanteigada, simples ou recheado."],
    ],
  },
  {
    categoria: "Almoço",
    itens: [
      ["Prato do dia", "Comida caseira servida de segunda a sexta."],
      ["Salada da estação", "Folhas, grãos e vegetais frescos."],
      ["Sanduíche no pão de fermentação natural", "Recheios que mudam ao longo da semana."],
    ],
  },
];

export function DemoCafeteria() {
  return (
    <div className="bg-[#f6ecdd] font-sans text-[#3b2416]">
      <BarraDemo slug="cafeteria" />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <span className="font-cafeteria text-3xl italic">Café Aurora</span>
        <nav aria-label="Menu da cafeteria" className="hidden gap-8 text-[0.95rem] md:flex">
          <a href="#cardapio" className="hover:underline">Cardápio</a>
          <a href="#sobre" className="hover:underline">Nossa história</a>
          <a href="#visite" className="hover:underline">Visite</a>
        </nav>
        <a href="#cardapio" className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#f6ecdd]" style={{ background: cafe }}>
          Cardápio
        </a>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-4 pb-24 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#3b2416]/15 px-4 py-1.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-[#4f9d5b]" aria-hidden="true" />
            Aberto hoje até as 19h
          </p>
          <h1 className="mt-6 font-cafeteria text-6xl leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.5rem]">
            Café fresco, <em style={{ color: terracota }}>receitas da casa.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed opacity-80">
            Grãos selecionados, doces artesanais e um cantinho tranquilo para começar o dia ou fazer uma pausa.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#cardapio" className="inline-flex min-h-13 items-center justify-center rounded-full px-7 font-semibold text-[#f6ecdd]" style={{ background: cafe }}>
              Ver cardápio
            </a>
            <AcaoDemo
              segmento={SEG}
              acaoReal="abre o WhatsApp da cafeteria para fazer uma encomenda"
              className="inline-flex min-h-13 items-center justify-center rounded-full border border-[#3b2416]/25 px-7 font-semibold hover:bg-white/50"
            >
              Fazer uma encomenda
            </AcaoDemo>
          </div>
        </div>
        <div className="relative">
          <ArteCafeteria className="aspect-square w-full rounded-[3rem] sm:aspect-[4/3.4]" rotulo="Ilustração de xícara de café fumegante sobre a mesa" />
          <div className="absolute -right-2 -bottom-8 w-44 rotate-3 rounded-2xl bg-white p-4 shadow-xl sm:-right-6">
            <p className="font-cafeteria text-lg italic">Bolo do dia</p>
            <p className="text-sm opacity-70">Saindo do forno às 15h</p>
          </div>
        </div>
      </section>

      <section id="cardapio" aria-labelledby="cf-cardapio" className="rounded-t-[3rem] bg-[#fffaf2] py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center">
            <p className="text-sm tracking-[0.3em] uppercase" style={{ color: terracota }}>
              Cardápio
            </p>
            <h2 id="cf-cardapio" className="mt-3 font-cafeteria text-5xl sm:text-6xl">
              Feito com <em>carinho</em>, todos os dias.
            </h2>
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {cardapio.map((grupo) => (
              <div key={grupo.categoria}>
                <h3 className="border-b-2 pb-3 font-cafeteria text-3xl italic" style={{ borderColor: terracota }}>
                  {grupo.categoria}
                </h3>
                <ul className="mt-6 space-y-6">
                  {grupo.itens.map(([nome, desc]) => (
                    <li key={nome}>
                      <p className="text-lg font-semibold">{nome}</p>
                      <p className="mt-1 leading-relaxed opacity-70">{desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-14 text-center text-sm opacity-60">Os valores ficam disponíveis no balcão e no cardápio impresso.</p>
        </div>
      </section>

      <section id="sobre" aria-labelledby="cf-sobre" className="bg-[#fffaf2] pb-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 md:grid-cols-2">
          <ArteRestaurante className="aspect-[4/3] w-full rounded-[2rem]" rotulo="Ilustração de prato de massa com tomates e manjericão" />
          <div>
            <h2 id="cf-sobre" className="font-cafeteria text-5xl leading-tight">
              Um café de bairro, <em style={{ color: terracota }}>com cara de casa.</em>
            </h2>
            <p className="mt-5 text-lg leading-relaxed opacity-80">
              Nascemos da vontade de servir um café bem feito, sem pressa, ao lado de receitas que lembram a cozinha de
              família. No almoço, servimos pratos simples e saborosos.
            </p>
          </div>
        </div>
      </section>

      <section id="visite" aria-labelledby="cf-visite" className="py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] p-8 text-[#f6ecdd] md:col-span-2" style={{ background: cafe }}>
              <h2 id="cf-visite" className="font-cafeteria text-5xl italic">Venha nos visitar</h2>
              <p className="mt-4 text-lg opacity-80">Rua dos Ipês, 58 • Vila Jardim</p>
              <p className="text-sm opacity-60">Endereço ilustrativo desta demonstração.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <AcaoDemo segmento={SEG} acaoReal="abre o mapa com a rota até a cafeteria" className="min-h-12 rounded-full bg-[#f6ecdd] px-6 font-semibold text-[#3b2416]">
                  Como chegar
                </AcaoDemo>
                <AcaoDemo segmento={SEG} acaoReal="abre o WhatsApp da cafeteria" className="min-h-12 rounded-full border border-[#f6ecdd]/30 px-6 font-semibold">
                  Falar no WhatsApp
                </AcaoDemo>
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#3b2416]/15 bg-white/60 p-8">
              <h3 className="font-cafeteria text-2xl italic">Horários</h3>
              <dl className="mt-4 space-y-3">
                {[
                  ["Terça a sexta", "7h às 19h"],
                  ["Sábado e domingo", "8h às 14h"],
                  ["Segunda", "Fechado"],
                ].map(([d, h]) => (
                  <div key={d} className="flex justify-between gap-4 border-b border-[#3b2416]/10 pb-3">
                    <dt className="opacity-75">{d}</dt>
                    <dd className="font-semibold">{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <footer className="pb-10 text-center text-sm opacity-70">
        <p className="font-cafeteria text-2xl italic">Café Aurora</p>
        <p className="mt-1">Demonstração conceitual. Nome, endereço e informações fictícios.</p>
      </footer>

      <ChamadaDemo slug="cafeteria" />
    </div>
  );
}
