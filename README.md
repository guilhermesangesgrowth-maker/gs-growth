# Portal Growth para Educação — Acervo de Material Rico

Site estático (HTML/CSS/JS puro, sem build) para captura de leads via papers, frameworks
e ferramentas voltados a empreendedores, especialistas e líderes de receita da educação.

## Estrutura

```
index.html          página única (hero, acervo, método, sobre, rodapé, modal de captura)
css/styles.css       estilos (mobile-first)
js/deliverables-data.js   catálogo de entregáveis (editar aqui para adicionar/remover materiais)
js/main.js           lógica de filtro, carrossel e formulário
server.ps1            servidor local só para pré-visualização (não sobe pro GitHub)
```

## Como editar o catálogo

Cada entregável em `js/deliverables-data.js` tem:
- `category` / `categoryLabel`: área (financas, marketing, vendas, ia, produto, tecnologia, operacoes)
- `type` / `typeLabel`: framework, análise ou ferramenta
- `title`, `teaser`, `description`
- `fileUrl`: deixe vazio até o material existir. Quando publicar o PDF/planilha (ex: link do
  Google Drive), cole a URL aqui e o botão de download passa a aparecer depois do cadastro.

## Leads (hoje) e integração futura com Google Sheets

Por enquanto, cada envio do formulário:
1. Salva no `localStorage` do navegador (só para teste, chave `leads`).
2. Loga no console (`[lead capturado]`).
3. Se `CONFIG.SHEETS_WEBHOOK_URL` (em `js/main.js`) estiver preenchido, envia um POST para essa URL.

Quando formos integrar o Google Sheets:
1. Criar uma planilha e um **Google Apps Script** publicado como *Web App* (`doPost` gravando
   a linha na planilha).
2. Colar a URL do Web App em `CONFIG.SHEETS_WEBHOOK_URL`.
Não precisa mudar mais nada no front-end.

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
