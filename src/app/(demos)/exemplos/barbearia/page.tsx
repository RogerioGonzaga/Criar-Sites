import type { Metadata } from "next";
import { DemoBarbearia } from "@/components/demos/paginas/Barbearia";

export const metadata: Metadata = {
  title: "Demonstração: site para barbearia",
  description: "Demonstração conceitual de site para barbearia: serviços, equipe, horários e agendamento pelo WhatsApp.",
  alternates: { canonical: "/exemplos/barbearia" },
  openGraph: { title: "Demonstração: site para barbearia", description: "Demonstração conceitual de site para barbearia: serviços, equipe, horários e agendamento pelo WhatsApp.", url: "/exemplos/barbearia" },
};

export default function Pagina() {
  return <DemoBarbearia />;
}
