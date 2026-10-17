import { ArteRoupa } from "../artes";
import { AcaoDemo } from "../AcaoDemo";
import { BarraDemo } from "../BarraDemo";
import { ChamadaDemo } from "../ChamadaDemo";

const SEG = "loja de roupas";
const oliva = "#7b7f4e";

const produtos = [
  { nome: "Camisa Linho Areia", peca: "camisa", cor: "#c9b9a0", fundo: "#e7e2d8", tag: "Novo" },
  { nome: "Vestido Brisa", peca: "vestido", cor: "#7b7f4e", fundo: "#dfe0cf", tag: "" },
  { nome: "Jaqueta Sarja Preta", peca: "jaqueta", cor: "#1d1d1b", fundo: "#d9d4ca", tag: "" },
  { nome: "Calça Duna", peca: "calca", cor: "#b06a45", fundo: "#ead9cc", tag: "Últimas peças" },
  { nome: "Camisa Oxford Azul", peca: "camisa", cor: "#55708f", fundo: "#dde3e8", tag: "" },
  { nome: "Vestido Noite", peca: "vestido", cor: "#2f2b3a", fundo: "#e0dde3", tag: "Novo" },
  { nome: "Jaqueta Caramelo", peca: "jaqueta", cor: "#a8743f", fundo: "#ece2d3", tag: "" },
  { nome: "Calça Alfaiataria", peca: "calca", cor: "#3c3c38", fundo: "#e3e1db", tag: "" },
] as const;

export function DemoLoja() {
  return (
    <div className="bg-[#efece6] font-sans text-[#1d1d1b]">
      <BarraDemo slug="loja" />

      <div className="bg-[#1d1d1b] py-2 text-center text-xs tracking-[0.2em] text-white uppercase">
        Atendimento e pedidos pelo WhatsApp
      </div>

      <header className="border-b border-black/10">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 py-5 sm:px-8">
          <nav aria-label="Categorias da loja" className="hidden gap-6 text-xs tracking-[0.18em] uppercase md:flex">
            <a href="#colecao">Feminino</a>
            <a href="#colecao">Masculino</a>
            <a href="#colecao">Coleções</a>
          </nav>
          <span className="col-start-2 font-loja text-3xl font-extrabold tracking-[0.3em] uppercase">Sal</span>
          <a href="#como-comprar" className="justify-self-end text-xs tracking-[0.18em] uppercase underline-offset-4 hover:underline">
            Como comprar
          </a>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative">
          <ArteRoupa peca="vestido" cor={oliva} fundo="#dfe0cf" className="aspect-[4/5] w-full lg:aspect-auto lg:h-full" rotulo="Ilustração de vestido verde-oliva pendurado em um cabide" />
        </div>
        <div className="flex flex-col justify-between gap-10 px-5 py-14 sm:px-12 lg:py-20">
          <p className="text-xs tracking-[0.25em] uppercase">Coleção Outono • Peças em linho e algodão</p>
          <div>
            <h1 className="font-loja text-5xl leading-[0.9] font-extrabold uppercase sm:text-7xl lg:text-6xl xl:text-7xl">
              Nova
              <br />
              coleção
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-black/70">
              Peças leves, cortes atemporais e tecidos naturais para vestir bem todos os dias.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#colecao" className="inline-flex min-h-13 items-center justify-center bg-[#1d1d1b] px-8 text-sm tracking-[0.18em] text-white uppercase">
                Ver peças
              </a>
              <AcaoDemo
                segmento={SEG}
                acaoReal="abre o WhatsApp da loja para tirar dúvidas sobre tamanhos e disponibilidade"
                className="inline-flex min-h-13 items-center justify-center border border-black/30 px-8 text-sm tracking-[0.18em] uppercase hover:bg-black/5"
              >
                Falar com a loja
              </AcaoDemo>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ArteRoupa peca="camisa" cor="#c9b9a0" fundo="#e7e2d8" className="aspect-square w-full" />
            <ArteRoupa peca="calca" cor="#b06a45" fundo="#ead9cc" className="aspect-square w-full" />
          </div>
        </div>
      </section>

      <section id="colecao" aria-labelledby="lj-colecao" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="lj-colecao" className="font-loja text-3xl font-extrabold uppercase sm:text-5xl">
            Destaques
          </h2>
          <p className="text-sm text-black/60">Consulte tamanhos e disponibilidade pelo WhatsApp.</p>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {produtos.map((p) => (
            <li key={p.nome} className="group">
              <div className="relative overflow-hidden">
                <ArteRoupa
                  peca={p.peca}
                  cor={p.cor}
                  fundo={p.fundo}
                  className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-105"
                  rotulo={`Ilustração da peça ${p.nome}`}
                />
                {p.tag && (
                  <span className="absolute top-3 left-3 bg-white px-2 py-1 text-[10px] tracking-[0.15em] uppercase">{p.tag}</span>
                )}
              </div>
              <h3 className="mt-3 text-sm font-medium">{p.nome}</h3>
              <AcaoDemo
                segmento={SEG}
                acaoReal={`abre o WhatsApp da loja com uma mensagem sobre a peça "${p.nome}"`}
                className="mt-2 text-xs tracking-[0.15em] uppercase underline underline-offset-4"
              >
                Quero esta peça
              </AcaoDemo>
            </li>
          ))}
        </ul>
      </section>

      <section id="como-comprar" aria-labelledby="lj-comprar" className="bg-[#1d1d1b] py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 id="lj-comprar" className="font-loja text-3xl font-extrabold uppercase sm:text-5xl">
            Como comprar
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              ["Escolha suas peças", "Navegue pela coleção e anote o que mais gostou."],
              ["Chame no WhatsApp", "Confirmamos tamanho, cor e disponibilidade com você."],
              ["Retire ou receba", "Combine a retirada na loja ou a entrega na sua região."],
            ].map(([t, d], i) => (
              <li key={t} className="border-t border-white/20 pt-6">
                <span className="font-loja text-5xl font-extrabold" style={{ color: "#c9b9a0" }}>
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-white/65">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-black/60">
        <span className="font-loja text-xl font-extrabold tracking-[0.3em] text-black uppercase">Sal</span>
        <p className="mt-1">Demonstração conceitual. Nome, produtos e informações fictícios.</p>
      </footer>

      <ChamadaDemo slug="loja" />
    </div>
  );
}
