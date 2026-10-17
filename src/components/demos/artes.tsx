import { useId } from "react";

/**
 * Ilustrações vetoriais próprias usadas nas demonstrações.
 * Ficam dentro do projeto (sem dependência de bancos de imagens) e podem ser
 * substituídas por fotos reais do cliente em `public/imagens/`.
 */

type ArteProps = { className?: string; rotulo?: string };

function propsAcessiveis(rotulo?: string) {
  return rotulo ? { role: "img" as const, "aria-label": rotulo } : { "aria-hidden": true as const };
}

export function ArteBarbearia({ className = "", rotulo }: ArteProps) {
  const u = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} {...propsAcessiveis(rotulo)}>
      <defs>
        <radialGradient id={`${u}bb-luz`} cx="62%" cy="30%" r="80%">
          <stop offset="0" stopColor="#5a3a22" />
          <stop offset="0.45" stopColor="#2a1c13" />
          <stop offset="1" stopColor="#0f0c0a" />
        </radialGradient>
        <linearGradient id={`${u}bb-latao`} x1="0" x2="1">
          <stop offset="0" stopColor="#8a5a2b" />
          <stop offset="0.5" stopColor="#e6b77a" />
          <stop offset="1" stopColor="#9a6531" />
        </linearGradient>
        <pattern id={`${u}bb-listras`} width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
          <rect width="28" height="28" fill="#f4ede2" />
          <rect width="9" height="28" fill="#b3261e" />
          <rect x="14" width="9" height="28" fill="#1d3a6b" />
        </pattern>
        <linearGradient id={`${u}bb-brilho`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.45" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${u}bb-luz)`} />
      {/* parede de tijolos sutil */}
      <g opacity="0.08" stroke="#e6b77a" strokeWidth="1">
        {Array.from({ length: 10 }).map((_, i) => (
          <path key={i} d={`M0 ${30 * i + 15}H400`} />
        ))}
      </g>
      {/* poste de barbeiro */}
      <g transform="translate(276 40)">
        <rect x="-4" y="-8" width="58" height="22" rx="8" fill={`url(#${u}bb-latao)`} />
        <rect x="6" y="14" width="38" height="190" fill={`url(#${u}bb-listras)`} />
        <rect x="6" y="14" width="38" height="190" fill={`url(#${u}bb-brilho)`} />
        <rect x="-4" y="204" width="58" height="22" rx="8" fill={`url(#${u}bb-latao)`} />
        <circle cx="25" cy="-16" r="10" fill={`url(#${u}bb-latao)`} />
      </g>
      {/* navalha e pente */}
      <g transform="translate(58 118) rotate(-18)" fill="none" stroke={`url(#${u}bb-latao)`} strokeWidth="5" strokeLinecap="round">
        <path d="M0 0h120c10 0 18 8 18 18H6Z" fill="#e6b77a" fillOpacity="0.12" />
        <path d="M-6 26c-30 6-58 20-82 42" />
        <circle cx="-2" cy="16" r="4" fill="#e6b77a" />
      </g>
      <g transform="translate(70 196) rotate(-8)">
        <rect width="150" height="22" rx="5" fill="#e6b77a" opacity="0.9" />
        {Array.from({ length: 18 }).map((_, i) => (
          <rect key={i} x={6 + i * 8} y="18" width="3.5" height="22" rx="1.5" fill="#e6b77a" opacity="0.9" />
        ))}
      </g>
      <circle cx="320" cy="60" r="140" fill="#ffb86b" opacity="0.06" />
    </svg>
  );
}

export function ArteCafeteria({ className = "", rotulo }: ArteProps) {
  const u = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} {...propsAcessiveis(rotulo)}>
      <defs>
        <linearGradient id={`${u}cf-fundo`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e8d3" />
          <stop offset="1" stopColor="#ebd3b4" />
        </linearGradient>
        <linearGradient id={`${u}cf-xicara`} x1="0" x2="1">
          <stop offset="0" stopColor="#fffaf2" />
          <stop offset="1" stopColor="#e9dccb" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${u}cf-fundo)`} />
      <circle cx="210" cy="128" r="104" fill="#d9774b" />
      <circle cx="210" cy="128" r="104" fill="none" stroke="#b85a32" strokeWidth="2" strokeDasharray="2 7" />
      {/* mesa */}
      <rect y="232" width="400" height="68" fill="#6b3f26" />
      <rect y="232" width="400" height="6" fill="#86522f" />
      {/* vapor */}
      <g fill="none" stroke="#fffaf2" strokeWidth="5" strokeLinecap="round" opacity="0.9">
        <path d="M182 120c-12-16 12-24 0-42" />
        <path d="M210 112c-12-16 12-24 0-42" />
        <path d="M238 120c-12-16 12-24 0-42" />
      </g>
      {/* pires */}
      <ellipse cx="210" cy="232" rx="98" ry="14" fill="#fffaf2" />
      <ellipse cx="210" cy="229" rx="70" ry="8" fill="#e9dccb" />
      {/* xícara */}
      <path d="M140 140h140v34c0 34-30 56-70 56s-70-22-70-56Z" fill={`url(#${u}cf-xicara)`} />
      <path d="M280 152c22 0 30 10 30 22s-12 24-36 24" fill="none" stroke="#fffaf2" strokeWidth="12" />
      <ellipse cx="210" cy="140" rx="70" ry="11" fill="#3b2416" />
      <ellipse cx="210" cy="138" rx="58" ry="7" fill="#7a4a2c" />
      <path d="M150 178h120" stroke="#d9774b" strokeWidth="6" />
      {/* grãos */}
      {[
        [56, 70, 20],
        [84, 104, -30],
        [340, 84, 40],
        [356, 176, -10],
        [44, 182, 60],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <ellipse rx="13" ry="18" fill="#4a2c1b" />
          <path d="M0-15c-6 10 6 20 0 30" stroke="#2a170d" strokeWidth="2.5" fill="none" />
        </g>
      ))}
    </svg>
  );
}

export function ArteRestaurante({ className = "", rotulo }: ArteProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} {...propsAcessiveis(rotulo)}>
      <rect width="400" height="300" fill="#1e3a2d" />
      <g opacity="0.12" fill="#f3e6cc">
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x={i * 50} width="25" height="300" />
        ))}
      </g>
      <circle cx="200" cy="160" r="118" fill="#f6efe2" />
      <circle cx="200" cy="160" r="96" fill="none" stroke="#e1d4bd" strokeWidth="2" />
      <g fill="none" stroke="#f0c25b" strokeWidth="6" strokeLinecap="round">
        <path d="M200 160m-10 0a10 10 0 1 1 20 0 20 20 0 1 1-40 0 30 30 0 1 1 60 0 40 40 0 1 1-80 0 50 50 0 1 1 100 0" />
      </g>
      <g fill="#c8382c">
        <circle cx="168" cy="128" r="12" />
        <circle cx="236" cy="190" r="10" />
        <circle cx="226" cy="122" r="8" />
      </g>
      <g fill="#3f8a4f">
        <path d="M180 196c10-14 30-14 34 0-12 8-24 8-34 0Z" />
        <path d="M244 146c4-14 22-20 30-10-8 10-20 14-30 10Z" />
      </g>
      <g stroke="#d9c9a8" strokeWidth="6" strokeLinecap="round">
        <path d="M54 60v180" />
        <path d="M44 60v40M64 60v40M44 100h20" />
        <path d="M346 60c18 20 18 60 0 70v110" fill="none" />
      </g>
    </svg>
  );
}

type Peca = "camisa" | "vestido" | "jaqueta" | "calca";

const pecas: Record<Peca, string> = {
  camisa: "M150 70 110 92l14 40 18-8v116h116V124l18 8 14-40-40-22c-6 18-24 28-50 28s-44-10-50-28Z",
  vestido: "M168 70h64l-6 50 50 130H124l50-130-6-50Z",
  jaqueta: "M146 70 104 96l-4 150h56V150l8-20 8 116h56l8-116 8 20v96h56l-4-150-42-26c-8 16-28 26-54 26s-46-10-54-26Z",
  calca: "M140 70h120l14 180h-54l-20-120-20 120h-54l14-180Z",
};

export function ArteRoupa({
  className = "",
  rotulo,
  peca = "camisa",
  cor = "#1d1d1b",
  fundo = "#e7e2d8",
}: ArteProps & { peca?: Peca; cor?: string; fundo?: string }) {
  const u = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} {...propsAcessiveis(rotulo)}>
      <rect width="400" height="300" fill={fundo} />
      <ellipse cx="200" cy="286" rx="120" ry="10" fill="#000" opacity="0.08" />
      {/* cabide */}
      <g fill="none" stroke="#8b8478" strokeWidth="4" strokeLinecap="round">
        <path d="M200 30c0-10 14-10 14 0s-14 10-14 22" />
        <path d="M200 52 128 82h144Z" />
      </g>
      <path d={pecas[peca]} transform="translate(0 6)" fill={cor} />
      <path d={pecas[peca]} transform="translate(0 6)" fill={`url(#${u}roupa-sombra)`} />
      <defs>
        <linearGradient id={`${u}roupa-sombra`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.18" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#000" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ArteSalao({ className = "", rotulo }: ArteProps) {
  const u = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} {...propsAcessiveis(rotulo)}>
      <defs>
        <linearGradient id={`${u}sl-fundo`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7e3dc" />
          <stop offset="1" stopColor="#ecc9bf" />
        </linearGradient>
        <linearGradient id={`${u}sl-espelho`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fdf6f3" />
          <stop offset="1" stopColor="#e7c3b9" />
        </linearGradient>
        <linearGradient id={`${u}sl-ouro`} x1="0" x2="1">
          <stop offset="0" stopColor="#a87b3e" />
          <stop offset="0.5" stopColor="#e8c88d" />
          <stop offset="1" stopColor="#a87b3e" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${u}sl-fundo)`} />
      <path d="M0 300V190c0-60 50-110 110-110s110 50 110 110v110Z" fill="#5a2747" opacity="0.92" />
      <path d="M210 300V120a80 80 0 0 1 160 0v180Z" fill={`url(#${u}sl-espelho)`} stroke={`url(#${u}sl-ouro)`} strokeWidth="6" />
      <path d="M232 160c20-40 70-60 110-20" fill="none" stroke="#fff" strokeWidth="6" opacity="0.6" strokeLinecap="round" />
      <g fill="none" stroke="#5a2747" strokeWidth="3" strokeLinecap="round">
        <path d="M290 300c0-60-10-100-40-140" />
        <path d="M262 190c-30-6-40-30-34-50 26 4 38 26 34 50Z" fill="#c98a8e" />
        <path d="M276 236c24-20 50-18 64-6-20 18-44 18-64 6Z" fill="#c98a8e" />
      </g>
      <g fill="#f7e3dc" opacity="0.9">
        <path d="M110 120c10-30 40-30 50 0-10 6-40 6-50 0Z" />
        <circle cx="70" cy="160" r="6" />
        <circle cx="150" cy="200" r="4" />
      </g>
      <g fill={`url(#${u}sl-ouro)`}>
        <path d="M60 60l4 12 12 4-12 4-4 12-4-12-12-4 12-4Z" />
        <path d="M180 40l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" />
      </g>
    </svg>
  );
}

export function ArteOficina({ className = "", rotulo }: ArteProps) {
  const u = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} {...propsAcessiveis(rotulo)}>
      <defs>
        <pattern id={`${u}of-faixa`} width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="24" height="24" fill="#ffc400" />
          <rect width="12" height="24" fill="#141414" />
        </pattern>
        <linearGradient id={`${u}of-carro`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9e9e9" />
          <stop offset="1" stopColor="#9a9a9a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="#161616" />
      <g opacity="0.15" stroke="#ffc400">
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={i} d={`M${i * 50} 0V300`} />
        ))}
      </g>
      {/* engrenagem */}
      <g transform="translate(300 86)" fill="none" stroke="#ffc400" strokeWidth="10">
        <circle r="34" />
        <circle r="12" />
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={i} d="M0-40v-14" transform={`rotate(${i * 45})`} strokeLinecap="square" />
        ))}
      </g>
      {/* carro */}
      <g transform="translate(40 150)">
        <path
          d="M10 70c0-18 8-26 26-30l40-6 42-30c10-6 22-8 34-8h70c14 0 26 6 34 16l26 26 30 6c14 3 22 12 22 26v14H10Z"
          fill={`url(#${u}of-carro)`}
        />
        <path d="M128 36l30-24c6-4 12-6 20-6h30v30Z" fill="#2d3640" />
        <path d="M218 6h26c8 0 14 4 20 10l20 20h-66Z" fill="#2d3640" />
        <rect x="290" y="56" width="18" height="8" rx="3" fill="#ffc400" />
        <circle cx="86" cy="86" r="26" fill="#111" stroke="#555" strokeWidth="6" />
        <circle cx="86" cy="86" r="9" fill="#bbb" />
        <circle cx="250" cy="86" r="26" fill="#111" stroke="#555" strokeWidth="6" />
        <circle cx="250" cy="86" r="9" fill="#bbb" />
      </g>
      <rect y="262" width="400" height="38" fill={`url(#${u}of-faixa)`} />
    </svg>
  );
}

export function ArteServicos({ className = "", rotulo }: ArteProps) {
  const u = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} {...propsAcessiveis(rotulo)}>
      <defs>
        <linearGradient id={`${u}sv-fundo`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e8efff" />
          <stop offset="1" stopColor="#cfdcff" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${u}sv-fundo)`} />
      <g stroke="#1f5eff" opacity="0.1">
        {Array.from({ length: 16 }).map((_, i) => (
          <path key={i} d={`M${i * 26} 0V300M0 ${i * 26}H400`} />
        ))}
      </g>
      {/* casa */}
      <path d="M90 150 200 64l110 86v116H90Z" fill="#fff" stroke="#0d1b3e" strokeWidth="6" strokeLinejoin="round" />
      <path d="M70 160 200 56l130 104" fill="none" stroke="#0d1b3e" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="120" y="180" width="50" height="50" rx="4" fill="#cfdcff" stroke="#0d1b3e" strokeWidth="5" />
      <path d="M145 180v50M120 205h50" stroke="#0d1b3e" strokeWidth="4" />
      <rect x="226" y="190" width="54" height="76" rx="4" fill="#0d1b3e" />
      <circle cx="268" cy="230" r="4" fill="#ffd23f" />
      {/* selo com raio */}
      <g transform="translate(300 92)">
        <circle r="38" fill="#1f5eff" />
        <path d="M6-24-16 6h14l-4 20L18-6H4Z" fill="#ffd23f" />
      </g>
      <g transform="translate(72 70)" fill="#0d1b3e" opacity="0.85">
        <rect width="64" height="12" rx="6" />
        <rect y="20" width="40" height="12" rx="6" opacity="0.5" />
      </g>
    </svg>
  );
}
