import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.marca.nome}: sites profissionais para pequenos negócios`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ImagemCompartilhamento() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0d100e", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 44, fontWeight: 800 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "#c8f53c", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="40" height="40" viewBox="0 0 64 64">
              <path d="M14 18l18 30 18-30" fill="none" stroke="#0d100e" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {siteConfig.marca.logotipo}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, maxWidth: 980 }}>
            Seu negócio merece um site à altura.
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: "rgba(255,255,255,0.72)", maxWidth: 960 }}>
            Site profissional com domínio próprio e pagamento único pela criação.
          </div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {["Adaptado ao celular", "Domínio próprio", "Condições transparentes"].map((t) => (
            <div key={t} style={{ display: "flex", padding: "12px 22px", borderRadius: 999, background: "#c8f53c", color: "#0d100e", fontSize: 24, fontWeight: 700 }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
