import {
  Barlow_Condensed,
  Bebas_Neue,
  Bricolage_Grotesque,
  Cormorant_Garamond,
  Fraunces,
  Geist,
  Manrope,
  Syne,
} from "next/font/google";

/* Fontes da marca */
export const fonteTitulo = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--ff-titulo",
  display: "swap",
});
export const fonteTexto = Geist({
  subsets: ["latin"],
  variable: "--ff-texto",
  display: "swap",
});

/* Fontes das demonstrações: carregadas sob demanda, sem pré-carregamento. */
export const fonteBarbearia = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--ff-barbearia",
  display: "swap",
  preload: false,
});
export const fonteCafeteria = Fraunces({
  subsets: ["latin"],
  variable: "--ff-cafeteria",
  display: "swap",
  preload: false,
  style: ["normal", "italic"],
});
export const fonteLoja = Syne({
  subsets: ["latin"],
  variable: "--ff-loja",
  display: "swap",
  preload: false,
});
export const fonteSalao = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--ff-salao",
  display: "swap",
  preload: false,
});
export const fonteOficina = Barlow_Condensed({
  weight: ["500", "700", "800"],
  subsets: ["latin"],
  variable: "--ff-oficina",
  display: "swap",
  preload: false,
});
export const fonteServicos = Manrope({
  subsets: ["latin"],
  variable: "--ff-servicos",
  display: "swap",
  preload: false,
});

export const variaveisFontes = [
  fonteTitulo,
  fonteTexto,
  fonteBarbearia,
  fonteCafeteria,
  fonteLoja,
  fonteSalao,
  fonteOficina,
  fonteServicos,
]
  .map((f) => f.variable)
  .join(" ");
