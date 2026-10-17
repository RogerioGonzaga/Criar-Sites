import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { linkWhatsapp } from "@/lib/contato";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Saiba como ${siteConfig.marca.nome} trata os dados enviados pelo formulário de orçamento.`,
  alternates: { canonical: "/privacidade" },
};

export default function Privacidade() {
  const { email } = siteConfig.contato;
  const whatsapp = linkWhatsapp("Olá! Tenho uma dúvida sobre os meus dados pessoais.");
  const responsavel = siteConfig.legal.razaoSocial || siteConfig.marca.nome;

  return (
    <article className="pt-32 pb-24">
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold text-suave uppercase">Privacidade</p>
        <h1 className="mt-3 font-titulo text-5xl font-extrabold tracking-tight">Política de Privacidade</h1>
        <div className="mt-10 space-y-8 text-lg leading-relaxed text-tinta/85 [&_h2]:font-titulo [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-tinta [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          <section>
            <h2>Quem somos</h2>
            <p className="mt-3">
              Este site pertence a {responsavel}
              {siteConfig.legal.documento && `, ${siteConfig.legal.documento}`}, que oferece a criação de sites para
              pequenos negócios.
            </p>
          </section>
          <section>
            <h2>Quais dados coletamos</h2>
            <p className="mt-3">Quando você preenche o formulário de orçamento, recebemos apenas:</p>
            <ul>
              <li>seu nome e o nome do seu negócio;</li>
              <li>o segmento de atuação;</li>
              <li>seu número de WhatsApp;</li>
              <li>seu e-mail e a descrição do projeto, se você decidir informar.</li>
            </ul>
          </section>
          <section>
            <h2>Para que usamos</h2>
            <p className="mt-3">
              Os dados são usados exclusivamente para responder ao seu pedido de orçamento e conversar sobre o projeto. Não
              vendemos nem compartilhamos suas informações para fins de publicidade.
            </p>
          </section>
          <section>
            <h2>Base legal e consentimento</h2>
            <p className="mt-3">
              O tratamento acontece com o seu consentimento, informado no formulário, conforme a Lei Geral de Proteção de
              Dados (Lei nº 13.709/2018). Você pode retirar esse consentimento a qualquer momento.
            </p>
          </section>
          <section>
            <h2>Cookies</h2>
            <p className="mt-3">
              Este site não utiliza cookies de publicidade nem ferramentas de rastreamento. Caso isso mude, esta política
              será atualizada e, quando necessário, pediremos sua autorização.
            </p>
          </section>
          <section>
            <h2>Seus direitos</h2>
            <p className="mt-3">
              Você pode pedir a confirmação, o acesso, a correção ou a exclusão dos seus dados. Basta entrar em contato pelos
              canais abaixo.
            </p>
            {(email || whatsapp) && (
              <ul>
                {email && (
                  <li>
                    E-mail:{" "}
                    <a href={`mailto:${email}`} className="font-semibold underline underline-offset-2">
                      {email}
                    </a>
                  </li>
                )}
                {whatsapp && (
                  <li>
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
                      Falar pelo WhatsApp
                    </a>
                  </li>
                )}
              </ul>
            )}
          </section>
        </div>
      </Container>
    </article>
  );
}
