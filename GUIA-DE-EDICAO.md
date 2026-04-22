# Guia de Edição — Surreal Cardápio Digital

Você tem duas formas de editar o site. Use a que for mais confortável pra cada situação.

| Jeito | Quando usar | Onde |
|---|---|---|
| 🎨 **Painel Decap CMS** *(recomendado)* | Dia a dia — trocar preço, texto, foto de um prato | https://surrealrio.com/admin/ |
| 🔧 **GitHub direto** *(fallback)* | Alterações estruturais ou se o CMS estiver fora | https://github.com/RIOVR/surreal-site |

Os dois caminhos editam o **mesmo arquivo** (`data.json`). O que você salva no CMS vai direto pro GitHub como um commit, e a Vercel redeploy o site em ~30 segundos.

---

## 🎨 Caminho 1 — Painel Decap CMS

### Primeiro acesso

1. Abra **https://surrealrio.com/admin/** (ou `https://surreal-site.vercel.app/admin/` enquanto o domínio não propaga).
2. Clique em **"Login with GitHub"**.
3. Autorize o app "Surreal CMS" a acessar o seu repositório. Isso acontece só uma vez.
4. Você está dentro.

### Editar um prato

1. Na barra lateral, clique em **"Cardápio Surreal"** → **"Dados do cardápio"**.
2. Role até a seção **"Pratos (comidas)"**. Cada prato é um item da lista.
3. Clique no prato que quer editar (ex: "Surreal Burger — R$ 55").
4. Edite o que precisar: nome, preço, descrição, poema, alérgenos, tag, foto.
5. Clique em **"Save"** (canto superior direito).
6. Depois clique em **"Publish"** (e escolha "Publish now").
7. Em ~30 segundos o site está atualizado.

### Trocar foto de um prato

1. Dentro do prato, no campo **"Foto"**, clique na imagem atual (ou em "Choose an image").
2. Clique em **"Upload"** e escolha o arquivo novo do seu computador.
3. Save + Publish.

**Peso ideal da foto:** até 500 KB. Se sua foto tem 5 MB, use https://tinypng.com antes de subir.

### Adicionar um prato novo

1. Na seção "Pratos (comidas)", role até o final e clique em **"+ Add Pratos (comidas)"**.
2. Preencha todos os campos obrigatórios:
   - **ID único**: algo curto sem espaços, tipo `novo-drink-2026`
   - **Seção**: escolha em que parte do menu vai aparecer
   - **Tipo**: descrição curta (ex: "Burger", "Entrada")
   - **Nome, Preço, Descrição, Foto**: óbvios
3. Save + Publish.

### Editar horários, endereço, Instagram

Role até **"Informações do bar"** no início da página — é um bloco só.

### Editar as frases rotativas do portal

Role até **"Frases rotativas do portal"**. Adicione/remova/edite as linhas.

---

## 🔧 Caminho 2 — GitHub direto

Quando usar: quando o CMS estiver fora por algum motivo, ou pra alterações avançadas (mudanças nas seções do menu, reestruturação).

### Editar conteúdo (preço, texto de prato, etc.)

1. Acesse **https://github.com/RIOVR/surreal-site/blob/main/data.json**
2. Clique no **lápis ✏️** pra editar.
3. Edite o JSON com cuidado — toda vírgula e aspas importa.
4. Em "Commit changes", escolha "Commit directly to `main`" → "Commit changes".
5. Em ~30s o site está atualizado.

> ⚠️ **Atenção:** não edite `data.js` — ele é **gerado automaticamente** a partir de `data.json` toda vez que a Vercel faz deploy. Qualquer edição manual em `data.js` é perdida.

### Trocar / subir uma foto

1. Acesse **https://github.com/RIOVR/surreal-site/tree/main/assets**
2. Pra substituir foto existente: clique nela → lixeira → commit.
3. Volte em `assets/` → "Add file" → "Upload files" → arrasta a foto nova.
4. No `data.json`, ajusta o caminho `"photo": "assets/nome-da-foto.jpg"` se mudou o nome.

---

## 📋 Estrutura do data.json (referência)

```json
{
  "info": {
    "name": "Surreal",
    "tagline": "Um portal sensorial",
    "address": "Botafogo · Rio de Janeiro",
    "instagram": "@surrealbar.rj",
    "site": "www.surrealrio.com"
  },
  "provocacoes": ["Beba com todos os sentidos.", ...],
  "menu": [
    {
      "id": "surreal-burger",
      "secao": "sanduiches",
      "tipo": "Burger",
      "nome": "Surreal Burger",
      "preco": 55,
      "alerg": ["glúten", "lactose"],
      "desc": "Blend Angus Cara Preta...",
      "poema": ["A carne sonhava ser estrela.", ...],
      "photo": "assets/photo-rib-fiction.jpg",
      "tag": "Clássico"
    }
  ],
  "bebidas": [ ... ],
  "vinhos": [ ... ],
  "extras": [ ... ],
  "secoes": { "comidas": [...], "drinks": [...] }
}
```

---

## 🆘 Problemas comuns

**O CMS pede login e dá erro "Unauthorized":**
A GitHub OAuth App não está configurada corretamente. Me chama pra verificar as env vars da Vercel.

**Salvei e o site não mudou:**
Espere 1 minuto. A Vercel precisa rebuildar. Você pode conferir o status do deploy em https://vercel.com/surrealrio/surreal-site/deployments

**Editei direto no GitHub e quebrou o site:**
Vá em https://github.com/RIOVR/surreal-site/commits/main → encontre o commit anterior ao problema → clique em **"Revert"**. O site volta ao estado bom em 30s.

**Upload de foto falha no CMS:**
Verifique o tamanho (máx 25 MB — mas ideal é < 1 MB). Comprima em https://tinypng.com.

---

## 🧰 Para programadores (opcional)

Se quiser rodar localmente:

```bash
npm install
npm run build      # gera data.js a partir de data.json + compila JSX
npm run dev        # sobe servidor em http://localhost:8765
```

Arquitetura:
- `data.json` = fonte da verdade do conteúdo (editado via CMS)
- `data.js` = gerado no build, consumido pelo browser (`window.SURREAL`)
- `components/*.jsx` = componentes React (editados a mão)
- `dist/*.js` = JSX compilado (gerado no build)
- `admin/` = painel Decap CMS
- `api/auth.js` + `api/callback.js` = proxy OAuth pro GitHub (funções serverless Vercel)

---

Dúvidas? Me chama aqui no chat.
