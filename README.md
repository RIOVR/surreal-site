# Surreal — Cardápio Digital

Site do cardápio digital do **Surreal Bar** (Botafogo, Rio de Janeiro).

🌐 Produção: https://surrealrio.com
📍 Hospedagem: Vercel
💾 Repositório: GitHub

---

## Estrutura

```
.
├── index.html              → página principal
├── data.js                 → CONTEÚDO do cardápio (pratos, bebidas, vinhos, info)
├── assets/                 → imagens, fontes, paleta de cores
│   ├── colors_and_type.css → variáveis de cor e tipografia do Surreal
│   ├── logo-wordmark.png
│   ├── mascot.png
│   ├── photo-*.jpg         → fotos de pratos e ambiente
│   └── fonts/              → fonte Herbus
├── components/             → JSX original dos componentes React (fonte)
├── src/app.jsx             → JSX do app principal (fonte)
├── dist/                   → JS compilado (é o que o navegador carrega)
├── uploads/                → PDFs oficiais dos cardápios 2026
├── package.json            → dependências e scripts
└── vercel.json             → configuração de deploy
```

## Como editar (para não-programadores)

Veja **[GUIA-DE-EDICAO.md](./GUIA-DE-EDICAO.md)** — passo a passo para trocar fotos, textos e preços direto pelo GitHub, sem precisar instalar nada.

## Como rodar localmente (opcional, para desenvolvedores)

```bash
npm install        # instala babel
npm run build      # compila JSX → JS
npm run dev        # sobe um servidor em http://localhost:8765
```

Depois de editar qualquer `.jsx` em `components/` ou `src/app.jsx`, rode `npm run build` de novo.
Edições em `data.js`, `assets/` ou `index.html` NÃO precisam recompilar.

## Deploy

Push na branch `main` → Vercel redeploya automaticamente em ~20s.
