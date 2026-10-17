import { destinoContratacao } from "@/lib/contato";
import { Botao } from "./Botao";
import { Icone } from "./Icone";

type Props = {
  texto: string;
  mensagem?: string;
  variante?: "destaque" | "escuro" | "claro";
  tamanho?: "md" | "lg";
  className?: string;
};

/**
 * Botão de contratação: abre o WhatsApp com mensagem pronta quando o número
 * está configurado; caso contrário, leva ao formulário de orçamento.
 */
export function BotaoContratar({ texto, mensagem, variante = "destaque", tamanho = "md", className }: Props) {
  const destino = destinoContratacao(mensagem);
  return (
    <Botao
      href={destino.href}
      externo={destino.externo}
      variante={variante}
      tamanho={tamanho}
      className={className}
      ariaLabel={destino.externo ? `${texto} (abre o WhatsApp em uma nova aba)` : undefined}
    >
      {destino.externo && <Icone nome="whatsapp" tamanho={20} />}
      {texto}
      {!destino.externo && (
        <Icone nome="seta" tamanho={18} className="transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Botao>
  );
}
