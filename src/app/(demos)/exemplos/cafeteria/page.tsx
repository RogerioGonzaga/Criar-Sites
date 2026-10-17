import type { Metadata } from "next";
import { DemoCafeteria } from "@/components/demos/paginas/Cafeteria";

export const metadata: Metadata = {
  title: "Demonstração: site para cafeteria e restaurante",
  description: "Demonstração conceitual de site para cafeteria e restaurante: cardápio, horários e localização.",
  alternates: { canonical: "/exemplos/cafeteria" },
  openGraph: { title: "Demonstração: site para cafeteria e restaurante", description: "Demonstração conceitual de site para cafeteria e restaurante: cardápio, horários e localização.", url: "/exemplos/cafeteria" },
};

export default function Pagina() {
  return <DemoCafeteria />;
}
