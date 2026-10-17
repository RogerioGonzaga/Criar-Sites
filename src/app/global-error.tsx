"use client";

export default function ErroGlobal({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f6f6f1", color: "#0d100e" }}>
        <title>Erro inesperado</title>
        <main style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}>
          <div style={{ maxWidth: 480 }}>
            <h1 style={{ fontSize: 32, margin: 0 }}>Algo não saiu como esperado</h1>
            <p style={{ fontSize: 18, color: "#545a53" }}>Ocorreu um erro inesperado. Tente novamente em instantes.</p>
            <button
              type="button"
              onClick={() => retry()}
              style={{ marginTop: 16, minHeight: 48, padding: "0 24px", borderRadius: 999, border: 0, background: "#0d100e", color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer" }}
            >
              Tentar novamente
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
