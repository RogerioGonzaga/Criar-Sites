/**
 * Versões em miniatura das demonstrações, usadas no hero e na galeria.
 * Todas as medidas usam `em`, que acompanham a largura da moldura.
 */
import {
  ArteBarbearia,
  ArteCafeteria,
  ArteOficina,
  ArteRestaurante,
  ArteRoupa,
  ArteSalao,
  ArteServicos,
} from "@/components/demos/artes";

export type Formato = "desktop" | "celular";
type P = { formato: Formato };

function BarraCelular({ cor = "#000" }: { cor?: string }) {
  return <div className="h-[1.8em]" style={{ background: cor }} />;
}

function Hamburguer({ cor }: { cor: string }) {
  return (
    <span className="flex flex-col gap-[0.25em]">
      <span className="block h-[0.14em] w-[1.3em] rounded" style={{ background: cor }} />
      <span className="block h-[0.14em] w-[1.3em] rounded" style={{ background: cor }} />
      <span className="block h-[0.14em] w-[0.9em] rounded" style={{ background: cor }} />
    </span>
  );
}

/* ----------------------------------------------------------------- Barbearia */
export function MiniBarbearia({ formato }: P) {
  const latao = "#d39b5e";
  if (formato === "celular") {
    return (
      <div className="bg-[#141210] text-[#f4ede2]">
        <BarraCelular cor="#141210" />
        <div className="flex items-center justify-between px-[1.2em] py-[0.8em]">
          <span className="font-barbearia text-[1.6em] tracking-wider">BRASA</span>
          <Hamburguer cor={latao} />
        </div>
        <ArteBarbearia className="block aspect-[4/3] w-full" />
        <div className="px-[1.2em] pt-[1em] pb-[1.4em]">
          <p className="text-[0.62em] tracking-[0.3em] uppercase" style={{ color: latao }}>
            Barbearia desde o primeiro corte
          </p>
          <p className="mt-[0.3em] font-barbearia text-[2.6em] leading-[0.92]">Corte, barba & atitude.</p>
          <div className="mt-[0.9em] rounded-[0.4em] py-[0.7em] text-center text-[0.85em] font-bold text-[#141210]" style={{ background: latao }}>
            Agendar horário
          </div>
          <div className="mt-[1em] space-y-[0.5em]">
            {["Corte masculino", "Barba completa", "Corte + barba"].map((s) => (
              <div key={s} className="flex justify-between border-b border-white/10 pb-[0.4em] text-[0.8em]">
                <span>{s}</span>
                <span style={{ color: latao }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#141210] text-[#f4ede2]">
      <div className="flex items-center justify-between px-[2.4em] py-[1.2em]">
        <span className="font-barbearia text-[1.9em] tracking-wider">BRASA</span>
        <div className="flex items-center gap-[1.8em] text-[0.8em] text-white/70">
          <span>Serviços</span>
          <span>Galeria</span>
          <span>Horários</span>
          <span className="rounded-[0.3em] px-[1em] py-[0.5em] font-bold text-[#141210]" style={{ background: latao }}>
            Agendar
          </span>
        </div>
      </div>
      <div className="grid grid-cols-[1.05fr_1fr] items-center gap-[2em] px-[2.4em] pb-[2.2em]">
        <div>
          <p className="text-[0.7em] tracking-[0.35em] uppercase" style={{ color: latao }}>
            Barbearia clássica • Centro
          </p>
          <p className="mt-[0.4em] font-barbearia text-[4.6em] leading-[0.88]">
            Corte, barba
            <br />& atitude.
          </p>
          <p className="mt-[0.8em] max-w-[22em] text-[0.85em] text-white/65">
            Ambiente descontraído, profissionais experientes e horário marcado sem complicação.
          </p>
          <div className="mt-[1.2em] flex gap-[0.8em] text-[0.85em] font-bold">
            <span className="rounded-[0.35em] px-[1.3em] py-[0.75em] text-[#141210]" style={{ background: latao }}>
              Agendar pelo WhatsApp
            </span>
            <span className="rounded-[0.35em] border border-white/25 px-[1.3em] py-[0.75em]">Ver serviços</span>
          </div>
        </div>
        <ArteBarbearia className="block aspect-[4/3] w-full rounded-[0.6em]" />
      </div>
      <div className="grid grid-cols-3 border-t border-white/10">
        {[
          ["01", "Corte"],
          ["02", "Barba"],
          ["03", "Combo"],
        ].map(([n, s]) => (
          <div key={n} className="border-r border-white/10 px-[2em] py-[1em] last:border-0">
            <span className="text-[0.7em]" style={{ color: latao }}>
              {n}
            </span>
            <p className="font-barbearia text-[1.5em]">{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Cafeteria */
export function MiniCafeteria({ formato }: P) {
  if (formato === "celular") {
    return (
      <div className="bg-[#f3e6d3] text-[#3b2416]">
        <BarraCelular cor="#f3e6d3" />
        <div className="flex items-center justify-between px-[1.2em] py-[0.7em]">
          <span className="font-cafeteria text-[1.35em] italic">Café Aurora</span>
          <Hamburguer cor="#3b2416" />
        </div>
        <div className="px-[1.2em]">
          <ArteCafeteria className="block aspect-square w-full rounded-[1.2em]" />
          <p className="mt-[0.9em] font-cafeteria text-[2.15em] leading-[1]">
            Café fresco, <em className="text-[#c8643b]">receitas da casa.</em>
          </p>
          <p className="mt-[0.5em] text-[0.78em] opacity-75">Aberto de terça a domingo</p>
          <div className="mt-[0.8em] rounded-full bg-[#3b2416] py-[0.7em] text-center text-[0.82em] font-semibold text-[#f3e6d3]">
            Ver cardápio
          </div>
        </div>
        <div className="mt-[1em] grid grid-cols-2 gap-[0.6em] px-[1.2em] pb-[1.4em]">
          {["Espresso", "Pão de queijo", "Bolo do dia", "Cappuccino"].map((i) => (
            <div key={i} className="rounded-[0.7em] bg-white/70 px-[0.7em] py-[0.6em] text-[0.72em] font-medium">
              {i}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#f3e6d3] text-[#3b2416]">
      <div className="flex items-center justify-between px-[2.4em] py-[1.1em]">
        <span className="font-cafeteria text-[1.6em] italic">Café Aurora</span>
        <div className="flex gap-[1.6em] text-[0.8em]">
          <span>Cardápio</span>
          <span>Sobre</span>
          <span>Como chegar</span>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center gap-[2em] px-[2.4em] pb-[2em]">
        <div>
          <p className="font-cafeteria text-[3.6em] leading-[0.98]">
            Café fresco, <em className="text-[#c8643b]">receitas da casa.</em>
          </p>
          <p className="mt-[0.8em] text-[0.85em] opacity-75">Grãos selecionados, doces artesanais e um cantinho para ficar.</p>
          <div className="mt-[1.2em] flex gap-[0.8em] text-[0.8em] font-semibold">
            <span className="rounded-full bg-[#3b2416] px-[1.4em] py-[0.7em] text-[#f3e6d3]">Ver cardápio</span>
            <span className="rounded-full border border-[#3b2416]/30 px-[1.4em] py-[0.7em]">Como chegar</span>
          </div>
        </div>
        <ArteCafeteria className="block aspect-[4/3] w-full rounded-[1.4em]" />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Restaurante */
export function MiniRestaurante({ formato }: P) {
  if (formato === "celular") {
    return (
      <div className="bg-[#1e3a2d] text-[#f6efe2]">
        <BarraCelular cor="#1e3a2d" />
        <div className="flex items-center justify-between px-[1.2em] py-[0.7em]">
          <span className="font-cafeteria text-[1.3em] font-semibold tracking-tight">Trattoria Vila</span>
          <Hamburguer cor="#f0c25b" />
        </div>
        <ArteRestaurante className="block aspect-square w-full" />
        <div className="px-[1.2em] pt-[1em] pb-[1.4em]">
          <p className="text-[0.6em] tracking-[0.3em] text-[#f0c25b] uppercase">Massas frescas</p>
          <p className="mt-[0.3em] font-cafeteria text-[2em] leading-[1.02]">Cozinha italiana feita com calma.</p>
          <div className="mt-[0.9em] grid grid-cols-2 gap-[0.5em] text-[0.78em] font-semibold">
            <span className="rounded-[0.5em] bg-[#f0c25b] py-[0.65em] text-center text-[#1e3a2d]">Reservar</span>
            <span className="rounded-[0.5em] border border-white/25 py-[0.65em] text-center">Cardápio</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#1e3a2d] text-[#f6efe2]">
      <div className="flex items-center justify-between px-[2.4em] py-[1.1em]">
        <span className="font-cafeteria text-[1.5em] font-semibold">Trattoria Vila</span>
        <span className="rounded-[0.4em] bg-[#f0c25b] px-[1.2em] py-[0.5em] text-[0.8em] font-semibold text-[#1e3a2d]">Reservar</span>
      </div>
      <div className="grid grid-cols-2 items-center gap-[2em] px-[2.4em] pb-[2em]">
        <p className="font-cafeteria text-[3.4em] leading-[1]">Cozinha italiana feita com calma.</p>
        <ArteRestaurante className="block aspect-[4/3] w-full rounded-[0.8em]" />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- Loja */
export function MiniLoja({ formato }: P) {
  const produtos = [
    { peca: "camisa" as const, cor: "#c9b9a0", fundo: "#e7e2d8", nome: "Camisa Linho" },
    { peca: "vestido" as const, cor: "#7b7f4e", fundo: "#dfe0cf", nome: "Vestido Brisa" },
    { peca: "jaqueta" as const, cor: "#1d1d1b", fundo: "#d9d4ca", nome: "Jaqueta Sarja" },
    { peca: "calca" as const, cor: "#b06a45", fundo: "#ead9cc", nome: "Calça Duna" },
  ];
  if (formato === "celular") {
    return (
      <div className="bg-[#efece6] text-[#1d1d1b]">
        <BarraCelular cor="#efece6" />
        <div className="flex items-center justify-between px-[1.2em] py-[0.7em]">
          <Hamburguer cor="#1d1d1b" />
          <span className="font-loja text-[1.25em] font-extrabold tracking-[0.18em] uppercase">Sal</span>
          <span className="text-[0.7em]">Sacola</span>
        </div>
        <div className="relative">
          <ArteRoupa peca="vestido" cor="#7b7f4e" fundo="#dfe0cf" className="block aspect-[4/5] w-full" />
          <div className="absolute inset-x-0 bottom-0 p-[1.2em]">
            <p className="font-loja text-[2.2em] leading-[0.95] font-extrabold uppercase">Nova coleção</p>
            <span className="mt-[0.6em] inline-block bg-[#1d1d1b] px-[1.2em] py-[0.6em] text-[0.72em] text-white uppercase">
              Ver peças
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[0.6em] p-[1.2em]">
          {produtos.slice(0, 2).map((p) => (
            <div key={p.nome}>
              <ArteRoupa peca={p.peca} cor={p.cor} fundo={p.fundo} className="block aspect-[4/5] w-full" />
              <p className="mt-[0.4em] text-[0.7em] font-medium">{p.nome}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#efece6] text-[#1d1d1b]">
      <div className="flex items-center justify-between border-b border-black/10 px-[2.4em] py-[1em] text-[0.75em] tracking-[0.15em] uppercase">
        <div className="flex gap-[1.6em]">
          <span>Feminino</span>
          <span>Masculino</span>
          <span>Coleções</span>
        </div>
        <span className="font-loja text-[1.9em] font-extrabold tracking-[0.25em]">Sal</span>
        <span>Fale conosco</span>
      </div>
      <div className="grid grid-cols-[1.3fr_1fr]">
        <div className="relative">
          <ArteRoupa peca="vestido" cor="#7b7f4e" fundo="#dfe0cf" className="block aspect-[5/4] w-full" />
          <p className="absolute bottom-[0.6em] left-[1.2em] font-loja text-[3.6em] leading-[0.9] font-extrabold uppercase">
            Nova
            <br />
            coleção
          </p>
        </div>
        <div className="grid grid-cols-2 gap-[0.8em] p-[1.4em]">
          {produtos.map((p) => (
            <div key={p.nome}>
              <ArteRoupa peca={p.peca} cor={p.cor} fundo={p.fundo} className="block aspect-[4/5] w-full" />
              <p className="mt-[0.3em] text-[0.7em] font-medium">{p.nome}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- Salão */
export function MiniSalao({ formato }: P) {
  if (formato === "celular") {
    return (
      <div className="bg-[#fbf1ed] text-[#4a1f3d]">
        <BarraCelular cor="#fbf1ed" />
        <div className="py-[0.8em] text-center font-salao text-[1.5em] italic">Studio Flora</div>
        <div className="px-[1.2em]">
          <ArteSalao className="block aspect-[4/5] w-full rounded-t-[10em]" />
          <p className="mt-[0.9em] text-center font-salao text-[2.1em] leading-[1]">
            Beleza com <em>cuidado</em> em cada detalhe.
          </p>
          <div className="mx-auto mt-[0.9em] w-fit rounded-full bg-[#5a2747] px-[1.6em] py-[0.7em] text-[0.78em] text-white">
            Agendar visita
          </div>
        </div>
        <div className="mt-[1em] flex justify-center gap-[0.8em] pb-[1.4em] text-[0.68em] tracking-[0.2em] uppercase opacity-70">
          <span>Cabelo</span>•<span>Unhas</span>•<span>Estética</span>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#fbf1ed] text-[#4a1f3d]">
      <div className="flex items-center justify-between px-[2.4em] py-[1.1em] text-[0.8em]">
        <div className="flex gap-[1.6em]">
          <span>Serviços</span>
          <span>Equipe</span>
        </div>
        <span className="font-salao text-[2.2em] italic">Studio Flora</span>
        <div className="flex gap-[1.6em]">
          <span>Espaço</span>
          <span>Agendar</span>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_0.9fr] items-end gap-[2em] px-[2.4em] pb-[2em]">
        <div className="pb-[1em]">
          <p className="text-[0.7em] tracking-[0.3em] uppercase opacity-70">Cabelo • Unhas • Estética</p>
          <p className="mt-[0.4em] font-salao text-[4em] leading-[0.95]">
            Beleza com <em>cuidado</em> em cada detalhe.
          </p>
          <span className="mt-[1em] inline-block rounded-full bg-[#5a2747] px-[1.6em] py-[0.75em] text-[0.8em] text-white">
            Agendar visita
          </span>
        </div>
        <ArteSalao className="block aspect-[4/5] w-full rounded-t-[12em]" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- Oficina */
export function MiniOficina({ formato }: P) {
  if (formato === "celular") {
    return (
      <div className="bg-[#141414] text-white">
        <BarraCelular cor="#141414" />
        <div className="flex items-center justify-between px-[1.2em] py-[0.7em]">
          <span className="font-oficina text-[1.5em] font-extrabold uppercase">
            Torque<span className="text-[#ffc400]">.</span>
          </span>
          <Hamburguer cor="#ffc400" />
        </div>
        <ArteOficina className="block aspect-[4/3] w-full" />
        <div className="px-[1.2em] pt-[1em] pb-[1.4em]">
          <p className="font-oficina text-[2.4em] leading-[0.95] font-extrabold uppercase">
            Seu carro em <span className="text-[#ffc400]">boas mãos.</span>
          </p>
          <div className="mt-[0.9em] bg-[#ffc400] py-[0.7em] text-center font-oficina text-[0.95em] font-bold text-black uppercase">
            Pedir orçamento
          </div>
          <div className="mt-[0.8em] grid grid-cols-3 gap-[0.4em] text-center text-[0.62em] uppercase">
            {["Revisão", "Freios", "Suspensão"].map((s) => (
              <span key={s} className="border border-white/15 py-[0.5em]">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#141414] text-white">
      <div className="flex items-center justify-between px-[2.4em] py-[1em]">
        <span className="font-oficina text-[1.8em] font-extrabold uppercase">
          Torque<span className="text-[#ffc400]">.</span>
        </span>
        <span className="bg-[#ffc400] px-[1.2em] py-[0.5em] font-oficina text-[0.9em] font-bold text-black uppercase">
          Pedir orçamento
        </span>
      </div>
      <div className="grid grid-cols-2 items-center gap-[2em] px-[2.4em] pb-[2em]">
        <p className="font-oficina text-[4.2em] leading-[0.9] font-extrabold uppercase">
          Seu carro em <span className="text-[#ffc400]">boas mãos.</span>
        </p>
        <ArteOficina className="block aspect-[4/3] w-full" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Serviços */
export function MiniServicos({ formato }: P) {
  if (formato === "celular") {
    return (
      <div className="bg-white text-[#0d1b3e]">
        <BarraCelular cor="#fff" />
        <div className="flex items-center justify-between px-[1.2em] py-[0.7em]">
          <span className="font-servicos text-[1.2em] font-extrabold">
            <span className="text-[#1f5eff]">⚡</span> Lumen
          </span>
          <Hamburguer cor="#0d1b3e" />
        </div>
        <div className="px-[1.2em]">
          <span className="inline-block rounded-full bg-[#e8efff] px-[0.8em] py-[0.3em] text-[0.62em] font-semibold text-[#1f5eff]">
            Atendimento residencial
          </span>
          <p className="mt-[0.5em] font-servicos text-[1.9em] leading-[1.05] font-extrabold tracking-tight">
            Instalações elétricas seguras e bem feitas.
          </p>
          <ArteServicos className="mt-[0.8em] block aspect-[4/3] w-full rounded-[1em]" />
          <div className="mt-[0.8em] rounded-[0.6em] bg-[#1f5eff] py-[0.7em] text-center text-[0.8em] font-bold text-white">
            Solicitar visita
          </div>
        </div>
        <div className="space-y-[0.4em] p-[1.2em] text-[0.72em]">
          {["Quadros de energia", "Tomadas e iluminação", "Manutenção preventiva"].map((s) => (
            <div key={s} className="flex items-center gap-[0.5em]">
              <span className="text-[#1f5eff]">✓</span>
              {s}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white text-[#0d1b3e]">
      <div className="flex items-center justify-between px-[2.4em] py-[1em]">
        <span className="font-servicos text-[1.4em] font-extrabold">
          <span className="text-[#1f5eff]">⚡</span> Lumen Elétrica
        </span>
        <div className="flex items-center gap-[1.6em] text-[0.8em]">
          <span>Serviços</span>
          <span>Regiões</span>
          <span className="rounded-[0.5em] bg-[#1f5eff] px-[1.1em] py-[0.5em] font-bold text-white">Solicitar visita</span>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center gap-[2em] px-[2.4em] pb-[2em]">
        <div>
          <p className="font-servicos text-[3.2em] leading-[1.02] font-extrabold tracking-tight">
            Instalações elétricas seguras e bem feitas.
          </p>
          <div className="mt-[1em] flex flex-wrap gap-[0.5em] text-[0.72em] font-semibold">
            {["Residencial", "Comercial", "Manutenção"].map((s) => (
              <span key={s} className="rounded-full bg-[#e8efff] px-[0.9em] py-[0.35em] text-[#1f5eff]">
                {s}
              </span>
            ))}
          </div>
        </div>
        <ArteServicos className="block aspect-[4/3] w-full rounded-[1em]" />
      </div>
    </div>
  );
}

export const miniSitesPorSlug = {
  barbearia: MiniBarbearia,
  cafeteria: MiniCafeteria,
  loja: MiniLoja,
  salao: MiniSalao,
  oficina: MiniOficina,
  servicos: MiniServicos,
} as const;
