import type { Metadata } from "next";
import { DemoServicos } from "@/components/demos/paginas/Servicos";

export const metadata: Metadata = {
  title: "Demonstração: site para prestador de serviços",
  description: "Demonstração conceitual de site para prestador de serviços: serviços, regiões atendidas e contato.",
  alternates: { canonical: "/exemplos/servicos" },
  openGraph: { title: "Demonstração: site para prestador de serviços", description: "Demonstração conceitual de site para prestador de serviços: serviços, regiões atendidas e contato.", url: "/exemplos/servicos" },
};

export default function Pagina() {
  return <DemoServicos />;
}
