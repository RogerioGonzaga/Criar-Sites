import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { variaveisFontes } from "@/lib/fontes";
import { AvisoDesenvolvimento } from "@/components/layout/AvisoDesenvolvimento";
import "./globals.css";

const titulo = `Sites Profissionais para Pequenos Negócios | ${siteConfig.marca.nome}`;
const descricao =
  "Tenha um site profissional para seu negócio, com domínio próprio e pagamento único pelo desenvolvimento. Conheça nossos exemplos e solicite um orçamento.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.marca.url),
  title: { default: titulo, template: `%s | ${siteConfig.marca.nome}` },
  description: descricao,
  applicationName: siteConfig.marca.nome,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: siteConfig.marca.nome,
    title: titulo,
    description: descricao,
  },
  twitter: { card: "summary_large_image", title: titulo, description: descricao },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: siteConfig.cores.papel,
  width: "device-width",
  initialScale: 1,
};

const variaveisCores = {
  "--cor-destaque": siteConfig.cores.destaque,
  "--cor-destaque-escuro": siteConfig.cores.destaqueEscuro,
  "--cor-tinta": siteConfig.cores.tinta,
  "--cor-papel": siteConfig.cores.papel,
} as React.CSSProperties;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${variaveisFontes} antialiased`} style={variaveisCores} suppressHydrationWarning>
      <head>
        {/* Ativa as animações de entrada apenas quando o JavaScript está disponível */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh font-sans">
        {children}
        <AvisoDesenvolvimento />
      </body>
    </html>
  );
}
