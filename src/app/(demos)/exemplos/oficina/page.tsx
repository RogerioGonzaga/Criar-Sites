import type { Metadata } from "next";
import { DemoOficina } from "@/components/demos/paginas/Oficina";

export const metadata: Metadata = {
  title: "Demonstração: site para oficina mecânica",
  description: "Demonstração conceitual de site para oficina mecânica: serviços, etapas do atendimento e orçamento.",
  alternates: { canonical: "/exemplos/oficina" },
  openGraph: { title: "Demonstração: site para oficina mecânica", description: "Demonstração conceitual de site para oficina mecânica: serviços, etapas do atendimento e orçamento.", url: "/exemplos/oficina" },
};

export default function Pagina() {
  return <DemoOficina />;
}
