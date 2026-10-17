"use client";

import { useEffect } from "react";
import { montarAssistente } from "@/lib/assistente/widget";

/** Liga o comportamento da janela de conversa depois que a página carrega. */
export function AtivarAssistente() {
  useEffect(() => {
    const raiz = document.getElementById("assistente");
    if (raiz) montarAssistente(raiz);
  }, []);
  return null;
}
