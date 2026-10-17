import { Container } from "@/components/ui/Container";
import { Icone } from "@/components/ui/Icone";
import { TituloSecao } from "@/components/ui/TituloSecao";
import { Revelar } from "@/components/ui/Revelar";
import { linkWhatsapp, whatsappConfigurado } from "@/lib/contato";
import { FormularioOrcamento, type ModoEnvio } from "./FormularioOrcamento";

function modoEnvio(): ModoEnvio {
  const servidor =
    Boolean(process.env.FORM_WEBHOOK_URL) ||
    Boolean(process.env.RESEND_API_KEY && process.env.ORCAMENTO_EMAIL_PARA && process.env.ORCAMENTO_EMAIL_DE);
  if (servidor) return "servidor";
  if (whatsappConfigurado) return "whatsapp";
  return "indisponivel";
}

const passos = [
  "Você preenche as informações básicas do seu negócio.",
  "Conversamos pelo WhatsApp para entender o que você precisa.",
  "Você recebe uma proposta com preço, prazo e tudo o que está incluído.",
];

export function Orcamento() {
  const modo = modoEnvio();
  const whatsapp = linkWhatsapp();
  const aviso =
    process.env.NODE_ENV !== "production" && modo === "indisponivel"
      ? "Aviso de desenvolvimento: configure FORM_WEBHOOK_URL (ou RESEND_API_KEY) no arquivo .env.local, ou defina o número do WhatsApp em src/config/site.ts. Esta mensagem não aparece na versão publicada."
      : undefined;

  return (
    <section id="orcamento" aria-labelledby="titulo-orcamento" className="py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <TituloSecao
            id="titulo-orcamento"
            rotulo="Orçamento"
            titulo="Conte sobre o seu negócio."
            subtitulo="Preencha o formulário e receba uma proposta clara, com tudo o que está incluído."
          />
          <Revelar>
            <ol className="mt-10 space-y-5">
              {passos.map((p, i) => (
                <li key={p} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-tinta text-sm font-bold text-destaque">
                    {i + 1}
                  </span>
                  <span className="pt-1.5 leading-relaxed text-tinta/85">{p}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex items-start gap-3 rounded-2xl border border-tinta/10 bg-white/70 p-5 text-sm leading-relaxed text-suave">
              <Icone nome="escudo" tamanho={22} className="shrink-0 text-tinta" />
              <p>
                Pedimos apenas os dados necessários para responder ao seu pedido. Eles não são compartilhados para outras
                finalidades.
              </p>
            </div>
            {whatsapp && modo === "servidor" && (
              <p className="mt-6 text-sm text-suave">
                Prefere conversar direto?{" "}
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-tinta underline underline-offset-2">
                  Fale pelo WhatsApp
                </a>
                .
              </p>
            )}
          </Revelar>
        </div>
        <Revelar atraso={120}>
          <FormularioOrcamento modo={modo} avisoDesenvolvimento={aviso} />
        </Revelar>
      </Container>
    </section>
  );
}
