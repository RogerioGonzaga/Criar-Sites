import type { Metadata } from "next";
import { DemoLoja } from "@/components/demos/paginas/Loja";

export const metadata: Metadata = {
  title: "Demonstração: site para loja de roupas",
  description: "Demonstração conceitual de site para loja de roupas: coleção, destaques e pedidos pelo WhatsApp.",
  alternates: { canonical: "/exemplos/loja" },
  openGraph: { title: "Demonstração: site para loja de roupas", description: "Demonstração conceitual de site para loja de roupas: coleção, destaques e pedidos pelo WhatsApp.", url: "/exemplos/loja" },
};

export default function Pagina() {
  return <DemoLoja />;
}
