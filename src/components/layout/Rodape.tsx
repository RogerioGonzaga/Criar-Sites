import Link from "next/link";
import { siteConfig } from "@/config/site";
import { linkWhatsapp, nomeRede, redesConfiguradas, telefoneFormatado } from "@/lib/contato";
import { Container } from "@/components/ui/Container";
import { Icone, type NomeIcone } from "@/components/ui/Icone";
import { AnoAtual } from "@/components/ui/AnoAtual";
import { Logo } from "./Logo";
import { linksNavegacao } from "./navegacao";

export function Rodape() {
  const whatsapp = linkWhatsapp();
  const telefone = telefoneFormatado();
  const { email } = siteConfig.contato;
  const { legal } = siteConfig;
  const temContato = Boolean(whatsapp || email || redesConfiguradas.length);

  return (
    <footer className="bg-tinta text-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.8fr_1fr_1.2fr]">
          <div>
            <Logo claro />
            <p className="mt-5 max-w-sm leading-relaxed text-white/65">{siteConfig.marca.descricao}</p>
          </div>

          <nav aria-label="Links do rodapé">
            <h2 className="text-sm font-semibold tracking-wide text-white/50 uppercase">Navegação</h2>
            <ul className="mt-5 space-y-3">
              {linksNavegacao.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 transition-colors hover:text-destaque">
                    {l.rotulo}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#orcamento" className="text-white/80 transition-colors hover:text-destaque">
                  Pedir orçamento
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white/50 uppercase">Contato</h2>
            <ul className="mt-5 space-y-3">
              {whatsapp && (
                <li>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/80 hover:text-destaque">
                    <Icone nome="whatsapp" tamanho={18} />
                    WhatsApp{telefone ? `: ${telefone}` : ""}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="inline-flex items-center gap-2 break-all text-white/80 hover:text-destaque">
                    <Icone nome="email" tamanho={18} />
                    {email}
                  </a>
                </li>
              )}
              {redesConfiguradas.map(({ rede, url }) => (
                <li key={rede}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/80 hover:text-destaque">
                    <Icone nome={rede as NomeIcone} tamanho={18} />
                    {nomeRede(rede)}
                  </a>
                </li>
              ))}
              {!temContato && (
                <li>
                  <Link href="/#orcamento" className="inline-flex items-center gap-2 text-white/80 hover:text-destaque">
                    <Icone nome="documento" tamanho={18} />
                    Formulário de orçamento
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="flex items-center gap-2 font-titulo text-lg font-semibold">
              <Icone nome="globo" tamanho={20} className="text-destaque" />
              Domínio e hospedagem
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              O desenvolvimento do site é pago uma única vez. O domínio precisa ser renovado periodicamente, e a hospedagem
              pode ter custo separado, conforme a proposta contratada. Todas as condições são informadas por escrito antes
              da contratação.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © <AnoAtual /> {legal.razaoSocial || siteConfig.marca.nome}
            {legal.documento && ` · ${legal.documento}`}
            {legal.endereco && ` · ${legal.endereco}`}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacidade" className="hover:text-white">
                Política de Privacidade
              </Link>
            </li>
            {legal.termosUrl && (
              <li>
                <a href={legal.termosUrl} className="hover:text-white">
                  Termos de Serviço
                </a>
              </li>
            )}
            <li>
              <Link href="/exemplos" className="hover:text-white">
                Demonstrações
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
