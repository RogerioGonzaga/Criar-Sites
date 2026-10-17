import type { ReactNode } from "react";

/**
 * Molduras de navegador e celular. O conteúdo interno usa unidades `em`
 * relativas à largura da moldura (container queries), então o mesmo
 * mini-site pode ser exibido em qualquer tamanho sem distorção.
 */
export function JanelaNavegador({
  endereco,
  children,
  className = "",
  escuro = false,
}: {
  endereco: string;
  children: ReactNode;
  className?: string;
  escuro?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[14px] border shadow-elevada ${
        escuro ? "border-white/10 bg-[#1c1f1d]" : "border-tinta/10 bg-white"
      } ${className}`}
    >
      <div
        className={`flex items-center gap-3 border-b px-3 py-2 ${
          escuro ? "border-white/10 bg-[#232724]" : "border-tinta/[0.07] bg-[#f3f3ef]"
        }`}
        aria-hidden="true"
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6159]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c941]" />
        </div>
        <div
          className={`mx-auto flex max-w-[60%] flex-1 items-center justify-center gap-1.5 truncate rounded-md px-3 py-1 text-[11px] ${
            escuro ? "bg-white/5 text-white/60" : "bg-white text-tinta/55"
          }`}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <span className="truncate">{endereco}</span>
        </div>
        <span className="w-10" />
      </div>
      <div className="[container-type:inline-size]">
        <div className="leading-[1.35]" style={{ fontSize: "calc(100cqw / 60)" }}>{children}</div>
      </div>
    </div>
  );
}

export function Celular({ children, className = "", fundo = "#fff" }: { children: ReactNode; className?: string; fundo?: string }) {
  return (
    <div className={`[container-type:inline-size] ${className}`}>
      <div className="rounded-[15cqw] bg-[#0f1110] p-[3.2cqw] shadow-elevada ring-1 ring-white/10">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[12cqw] [container-type:inline-size]" style={{ background: fundo }}>
          <div
            aria-hidden="true"
            className="absolute top-[2.6cqw] left-1/2 z-10 h-[6.5cqw] w-[32%] -translate-x-1/2 rounded-full bg-[#0f1110]"
          />
          <div className="leading-[1.35]" style={{ fontSize: "calc(100cqw / 22)" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
