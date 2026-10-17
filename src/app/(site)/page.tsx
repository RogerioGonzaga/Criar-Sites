import { Hero } from "@/components/home/Hero";
import { Problema } from "@/components/home/Problema";
import { Beneficios } from "@/components/home/Beneficios";
import { Galeria } from "@/components/home/Galeria";
import { ComoFunciona } from "@/components/home/ComoFunciona";
import { Oferta } from "@/components/home/Oferta";
import { Comparacao } from "@/components/home/Comparacao";
import { Diferenciais } from "@/components/home/Diferenciais";
import { Perguntas } from "@/components/home/Perguntas";
import { Orcamento } from "@/components/home/Orcamento";
import { ChamadaFinal } from "@/components/home/ChamadaFinal";

export default function PaginaInicial() {
  return (
    <>
      <Hero />
      <Problema />
      <Beneficios />
      <Galeria />
      <ComoFunciona />
      <Oferta />
      <Comparacao />
      <Diferenciais />
      <Perguntas />
      <Orcamento />
      <ChamadaFinal />
    </>
  );
}
