import type { Metadata } from "next";
import { DemoSalao } from "@/components/demos/paginas/Salao";

export const metadata: Metadata = {
  title: "Demonstração: site para salão de beleza",
  description: "Demonstração conceitual de site para salão de beleza: serviços, espaço, equipe e agendamento.",
  alternates: { canonical: "/exemplos/salao" },
  openGraph: { title: "Demonstração: site para salão de beleza", description: "Demonstração conceitual de site para salão de beleza: serviços, espaço, equipe e agendamento.", url: "/exemplos/salao" },
};

export default function Pagina() {
  return <DemoSalao />;
}
