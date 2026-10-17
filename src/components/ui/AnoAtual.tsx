import { cacheLife } from "next/cache";

/** Ano atual, recalculado periodicamente (sem tornar a página dinâmica). */
export async function AnoAtual() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
