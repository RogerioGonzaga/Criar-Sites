"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  como?: ElementType;
  atraso?: number;
  className?: string;
};

/** Revela o conteúdo suavemente quando ele entra na tela. */
export function Revelar({ children, como: Tag = "div", atraso = 0, className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.visivel = "true";
      return;
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            el.dataset.visivel = "true";
            observador.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-revelar="" className={className} style={{ "--atraso": `${atraso}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
