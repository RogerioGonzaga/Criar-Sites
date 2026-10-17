# Site para venda de sites a pequenos negócios

Site comercial em português brasileiro para uma empresa que cria sites para pequenos comerciantes, profissionais autônomos e negócios locais. Feito com **Next.js 16 (App Router), TypeScript e Tailwind CSS 4**, sem bibliotecas extras de interface.

> A marca **"Vitrine"** é um nome provisório. Troque em `src/config/site.ts`.

## O que já está pronto

- **Página inicial** com 12 seções: cabeçalho fixo com menu para celular, hero com mockups de sites (computador e celular), problema, benefícios, galeria de exemplos, como funciona, oferta e preço, comparação, diferenciais, perguntas frequentes, formulário de orçamento, chamada final e rodapé.
- **Seis demonstrações navegáveis**, cada uma com design, cores e tipografia próprios, identificadas como demonstrações conceituais com nomes fictícios:
  `/exemplos/barbearia`, `/exemplos/cafeteria`, `/exemplos/loja`, `/exemplos/salao`, `/exemplos/oficina`, `/exemplos/servicos`, além da listagem em `/exemplos`.
- **WhatsApp como canal principal**: todos os botões de contratação abrem o WhatsApp com mensagem pronta. Nas demonstrações, a mensagem cita o segmento visto. Sem número configurado, os botões levam ao formulário (nenhum link inválido é criado).
- **Formulário de orçamento** com validação em português, acessível por teclado, consentimento (LGPD), campo anti-robô e envio pelo servidor. A confirmação só aparece quando o serviço configurado responde com sucesso.
- **Política de Privacidade** (`/privacidade`), página 404 e páginas de erro personalizadas.
- **SEO**: `lang="pt-BR"`, títulos e descrições por página, URL canônica, Open Graph, imagem de compartilhamento gerada (`/opengraph-image`), favicon, ícone Apple, `sitemap.xml` e `robots.txt`.
- **Acessibilidade e desempenho**: HTML semântico, foco visível, link "Pular para o conteúdo", FAQ e menu operáveis por teclado, animações discretas que respeitam a redução de movimento, páginas geradas estaticamente, imagens vetoriais leves feitas dentro do projeto.
- **Aviso de desenvolvimento**: ao rodar `npm run dev`, um aviso no canto da tela lista o que falta configurar. Ele nunca aparece na versão publicada.

## Como instalar e rodar

Requisito: Node.js 20.9 ou superior.

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:3000
npm run build      # gera a versão de produção
npm start          # roda a versão de produção
npm run lint       # verificação de código
```

## Configuração

Quase tudo fica em **um único arquivo: `src/config/site.ts`**. Valores ainda não definidos ficam como `null` ou vazios, e o site mostra uma alternativa honesta ("Solicite um orçamento personalizado", "Informado na proposta") em vez de inventar dados.

Variáveis de ambiente ficam em `.env.local` (copie de `.env.example`). Como as páginas são geradas estaticamente, **rode `npm run build` de novo sempre que mudar a configuração**.

### Nome da marca e cores
`marca.nome`, `marca.logotipo` (texto do logotipo tipográfico), `marca.descricao` e `cores` em `src/config/site.ts`.

### Preço e plano
Em `oferta`: `nomePlano`, `preco` (número em reais, ex.: `1490`), `condicoesPagamento`, `descricao`, `paginasOuSecoes`, `revisoesIncluidas`, `prazoEstimado`, `suporte` e `servicosAdicionais`. Com `preco: null`, o card mostra "Solicite um orçamento personalizado."

### WhatsApp
`contato.whatsapp` com código do país e DDD, só dígitos (formato: `55` + DDD + número), ou a variável `NEXT_PUBLIC_WHATSAPP`. A mensagem padrão fica em `contato.mensagemWhatsapp`.

### Domínio e hospedagem
Em `oferta.dominio`: `incluidoNoPreco` (`true`/`false`), `responsavelRegistro` e `responsavelRenovacao` (textos). Em `oferta.hospedagem`: `incluida` e `detalhe`. Esses valores alimentam o card da oferta, a lista "incluído x cobrado à parte" e o quadro de transparência.

### Dados legais e redes sociais
`legal.razaoSocial`, `legal.documento` (CNPJ/CPF), `legal.endereco`, `legal.termosUrl` e `contato.redes`. Campos vazios simplesmente não aparecem.

### Conectar o formulário a um serviço real
O envio é feito no servidor (`src/app/acoes/orcamento.ts`); as chaves nunca vão para o navegador. Escolha uma opção no `.env.local`:

1. **Webhook** (`FORM_WEBHOOK_URL`): recebe um `POST` em JSON com `nome`, `negocio`, `segmento`, `whatsapp`, `email`, `descricao`, `consentimento`, `origem` e `enviadoEm`. Funciona com Formspree, Make, Zapier, n8n ou Google Apps Script. Opcional: `FORM_WEBHOOK_TOKEN`.
2. **E-mail pela Resend**: `RESEND_API_KEY`, `ORCAMENTO_EMAIL_PARA` e `ORCAMENTO_EMAIL_DE` (remetente de um domínio verificado na Resend; serviço com plano gratuito e planos pagos).

Sem nenhuma das duas, o formulário monta a mensagem e abre o WhatsApp (se o número estiver configurado). Sem WhatsApp nem envio configurado, o formulário fica desativado com um aviso.

### Trocar as ilustrações por fotos
As demonstrações usam ilustrações vetoriais próprias (`src/components/demos/artes.tsx`). Para usar fotos reais, coloque os arquivos em `public/imagens/` e use o componente `next/image`, sempre com imagens que você tenha direito de uso comercial.

## Como publicar

O jeito mais simples é a **Vercel** (criadora do Next.js, tem plano gratuito):

1. Envie o projeto para um repositório no GitHub.
2. Em vercel.com, importe o repositório.
3. Em *Settings > Environment Variables*, cadastre as variáveis do `.env.example`.
4. Faça o deploy e, em *Settings > Domains*, conecte o domínio da empresa.

Também funciona em qualquer servidor com Node.js (`npm run build` e `npm start`) ou em plataformas como Netlify e Render.

## O que ainda depende do responsável pelo negócio

- Nome definitivo da marca (hoje "Vitrine", provisório).
- Número do WhatsApp e, se houver, e-mail e redes sociais.
- Preço, condições de pagamento, prazo, revisões incluídas e suporte.
- Regras de domínio (quem registra e quem renova) e de hospedagem.
- Serviço de envio do formulário (webhook ou Resend).
- Dados legais (razão social, CNPJ e endereço), se quiser exibi-los.
- Termos de serviço, se existirem.
- URL final do site (`NEXT_PUBLIC_SITE_URL`) para o SEO e o sitemap.

## Estrutura

```
src/
  config/site.ts            configuração central (marca, contato, oferta, legal)
  lib/contato.ts            WhatsApp, links de contratação e pendências
  lib/orcamento.ts          regras e validação do formulário
  lib/fontes.ts             fontes da marca e das demonstrações
  app/
    (site)/                 página inicial, /exemplos e /privacidade
    (demos)/exemplos/*      seis demonstrações
    acoes/orcamento.ts      envio do formulário no servidor
    sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg, not-found.tsx
  components/
    home/                   seções da página inicial
    demos/                  páginas, ilustrações e catálogo das demonstrações
    mockups/                molduras de navegador/celular e miniaturas
    layout/                 cabeçalho, rodapé e logotipo
    ui/                     botões, ícones e componentes base
```
