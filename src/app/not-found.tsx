import type { Metadata } from "next";
import { Cabecalho } from "@/components/layout/Cabecalho";
import { Rodape } from "@/components/layout/Rodape";
import { Botao } from "@/components/ui/Botao";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NaoEncontrada() {
  return (
    <>
      <Cabecalho />
      <main id="conteudo" className="fundo-pontos flex min-h-[80dvh] items-center pt-28 pb-20">
        <Container className="text-center">
          <p className="font-titulo text-[7rem] leading-none font-extrabold tracking-tighter text-tinta sm:text-[10rem]">
            4<span className="text-destaque-escuro">0</span>4
          </p>
          <h1 className="mt-4 font-titulo text-3xl font-bold tracking-tight sm:text-4xl">Página não encontrada</h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-suave">
            O endereço pode ter sido digitado errado ou a página mudou de lugar. Que tal voltar ao início?
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Botao href="/">Voltar ao início</Botao>
            <Botao href="/exemplos" variante="contorno">
              Ver exemplos de sites
            </Botao>
          </div>
        </Container>
      </main>
      <Rodape />
    </>
  );
}
