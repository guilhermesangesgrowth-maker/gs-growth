# Growth Hub — Portal de Material Rico

Site estático (HTML/CSS/JS puro, sem build) para captura de leads via frameworks,
ferramentas e análises voltados a quem lidera receita em negócios de qualquer porte.

No ar em: **https://guilhermesangesgrowth-maker.github.io/hub/**

## Estrutura

```
index.html                página única (hero, mercado, acervo, método, autor, rodapé, modal de captura)
css/styles.css             estilos (mobile-first)
js/deliverables-data.js    catálogo de entregáveis (editar aqui para adicionar/remover materiais)
js/main.js                 lógica de filtro, carrossel, prévia interativa e formulário
materiais/                 arquivos reais dos materiais (PDFs) já publicados
google-apps-script.gs      script para colar no Google Apps Script (ver seção de Leads abaixo)
server.ps1                 servidor local só para pré-visualização (não sobe pro GitHub)
```

## Como editar o catálogo

Cada entregável em `js/deliverables-data.js` tem:
- `category` / `categoryLabel`: área (financas, marketing, vendas, ia, produto, tecnologia, gestao, operacoes)
- `challenges`: um ou mais desafios que o material resolve (otimizar-marca, gerar-demanda,
  aumentar-conversao, melhorar-processos, aumentar-margem, engajar-time) — usado no segundo filtro
- `type` / `typeLabel`: `type` controla o formato da prévia interativa (framework/ferramenta/analise);
  `typeLabel` é o rótulo específico mostrado no card (Framework, Playbook, Calculadora, etc.)
- `title`, `teaser`, `description`
- `fileUrl`: deixe vazio até o material existir. Quando publicar o PDF/planilha (ex: link do
  Google Drive, ou um arquivo em `materiais/`), cole o caminho aqui e o botão de download passa
  a aparecer depois do cadastro.

## Leads e integração com Google Sheets

Cada envio do formulário:
1. Salva no `localStorage` do navegador (fallback local, sempre ativo).
2. Loga no console (`[lead capturado]`).
3. Se `CONFIG.SHEETS_WEBHOOK_URL` (em `js/main.js`) estiver preenchido, envia um POST para essa URL.

### Passo a passo para conectar ao Google Sheets

1. Crie uma planilha nova em [sheets.new](https://sheets.new). Dê um nome, ex: "Leads — Growth Hub".
2. Menu **Extensões → Apps Script**.
3. Apague o código de exemplo e cole o conteúdo de `google-apps-script.gs` (deste repositório).
4. Salve o projeto (ícone de disquete). Dê um nome, ex: "Growth Hub Leads".
5. Clique em **Implantar → Nova implantação**.
6. No ícone de engrenagem, escolha o tipo **App da Web**.
7. Configure: "Executar como" = **Eu (sua conta)**; "Quem pode acessar" = **Qualquer pessoa**.
8. Clique em **Implantar**. O Google vai pedir autorização (é o seu próprio script pedindo acesso
   à sua própria planilha — clique em "Avançado" → "Acessar projeto (não seguro)" se aparecer o aviso).
9. Copie a **URL do app da Web** (termina em `/exec`).
10. Cole essa URL em `CONFIG.SHEETS_WEBHOOK_URL`, no topo de `js/main.js`.
11. Suba a mudança (`git add`, `git commit`, `git push`) — o GitHub Pages atualiza sozinho.

Depois de conectado, cada lead vira uma linha na aba "Leads" da planilha, com nome, e-mail,
telefone, cargo, segmento, tamanho da empresa, opt-in de marketing, material baixado e data/hora.
Não precisa mudar mais nada no front-end depois disso.

## Publicar no GitHub Pages

Sim, GitHub Pages é uma boa escolha aqui: o site é 100% estático, gratuito, com HTTPS e
domínio próprio opcional. Pontos de atenção:
- Conta gratuita: Pages funciona em repositório **público**. Isso é ok pra esse caso
  (não há segredo nenhum no código, só HTML/CSS/JS público).
- Não há servidor: por isso o formulário depende do Google Apps Script (acima) para gravar
  os leads, já que o GitHub Pages não roda backend.
- Deploy:
  ```bash
  git init
  git add .
  git commit -m "Portal Growth para Educação"
  git branch -M main
  git remote add origin <URL_DO_REPO>
  git push -u origin main
  ```
  Depois, em Settings → Pages, escolher branch `main` / pasta raiz. O site fica em
  `https://<usuario>.github.io/<repo>/`.

## Rodar localmente

Não precisa de Node nem Python. Este projeto já vem com um servidor mínimo em PowerShell:

```bash
powershell -ExecutionPolicy Bypass -File server.ps1
```

Depois acesse `http://localhost:8080`.
