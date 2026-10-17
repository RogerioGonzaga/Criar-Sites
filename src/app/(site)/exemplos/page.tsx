import type { Metadata } from "next";
import { Galeria } from "@/components/home/Galeria";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Exemplos de sites para pequenos negócios",
  description:
    "Veja demonstrações conceituais de sites para barbearia, cafeteria, loja de roupas, salão de beleza, oficina mecânica e prestadores de serviços.",
  alternates: { canonical: "/exemplos" },
};

export default function PaginaExemplos() {
  return (
    <div className="pt-28">
      <Container>
        <h1 className="texto-equilibrado max-w-3xl font-titulo text-5xl leading-[1] font-extrabold tracking-tight sm:text-6xl">
          Imagine seu negócio com um site assim.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-suave">
          Cada negócio tem sua identidade. Seu site também deve ter. Estas são demonstrações conceituais com nomes fictícios,
          criadas para mostrar como o site pode se adaptar a diferentes segmentos.
        </p>
      </Container>
      <div className="-mt-10">
        <Galeria comTitulo={false} />
      </div>
    </div>
  );
}
