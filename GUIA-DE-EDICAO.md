# Guia de Edição — Surreal Cardápio Digital

Este guia é pra você, Frederico, editar o cardápio **sem precisar saber programar**.
Todas as edições acontecem no **GitHub**, direto pelo navegador. Após salvar, a Vercel publica a mudança no site em ~20 segundos. Automático.

> 📌 **Link do repositório:** `https://github.com/SEU-USUARIO/surreal-site` (você vai receber esse link quando o repo estiver criado)

---

## 1. Trocar texto ou preço de um prato/bebida

Todos os textos do cardápio estão num único arquivo: **`data.js`**.

### Passo a passo:

1. Acesse o repositório no GitHub.
2. Clique em **`data.js`**.
3. Clique no ícone de **lápis ✏️** no canto superior direito ("Edit this file").
4. Encontre o prato ou drink que quer editar. A estrutura é assim:

   ```js
   {
     id: 'surreal-burger', secao: 'sanduiches', tipo: 'Burger',
     nome: 'Surreal Burger', preco: 55, alerg: ['glúten', 'lactose'],
     desc: 'Blend Angus Cara Preta de 180g, queijo meia cura derretido...',
     poema: ['A carne sonhava ser estrela.', 'O cogumelo chamou o queijo pra derreter.'],
     photo: 'assets/photo-rib-fiction.jpg', tag: 'Clássico',
   },
   ```

5. Edite o que precisar:
   - **`nome`**: nome do prato
   - **`preco`**: número em reais (sem "R$", só o número — `55`)
   - **`desc`**: descrição que aparece nos cards e no pop-up
   - **`poema`**: array de strings (cada linha do poema entre `'aspas simples,'`)
   - **`tag`**: `'Chef'`, `'Assinatura'`, `'Novo'`, `'Veggie'`, `'Vegano'`, `'Teatro'`, `'Sem álcool'`, ou `null` (sem tag)
   - **`alerg`**: lista de alérgenos, ex: `['glúten', 'lactose']`
   - **`photo`**: caminho da foto (ver seção 2)

6. Role até embaixo da página. Em "Commit changes":
   - Escreva uma mensagem curta, tipo "Atualiza preço do Surreal Burger"
   - Selecione "Commit directly to the `main` branch"
   - Clique em **"Commit changes"**

7. Pronto. Em ~20 segundos o site já está atualizado em https://surrealrio.com.

> 💡 **Erro de sintaxe?** Se você esquecer uma vírgula ou aspas, o site pode quebrar. Antes de fazer commit, confira que cada linha termina com vírgula `,` e que strings estão entre aspas `'...'`. Em caso de dúvida, me chama antes de commitar.

---

## 2. Trocar ou adicionar foto de um prato

### Para trocar uma foto existente:

1. Tire a foto nova no celular (ou no computador).
2. **Nome do arquivo**: mantenha o mesmo nome da foto antiga, ex: `photo-surreal-burger.jpg`. Assim você substitui sem precisar editar código.
3. No GitHub, entre na pasta **`assets/`**.
4. Clique na foto antiga (ex: `photo-rib-fiction.jpg`).
5. Clique em **"Delete"** (ícone de lixeira). Confirme.
6. Volte para a pasta `assets/` e clique em **"Add file" → "Upload files"**.
7. Arraste a foto nova (com o mesmo nome) e commit.

### Para adicionar foto a um prato que não tem:

1. Suba a foto nova em `assets/` com um nome claro, ex: `photo-dali-dog.jpg`.
2. Edite `data.js` (ver seção 1).
3. Encontre o prato e troque `photo: null` por `photo: 'assets/photo-dali-dog.jpg'`.
4. Commit.

> 📏 **Tamanho ideal da foto**: 1200×1500 pixels (formato retrato 4:5). Se for maior, não tem problema — o site ajusta sozinho. Peso ideal: até 500 KB. Se a sua foto tem vários MB, use https://tinypng.com pra compactar.

---

## 3. Adicionar um novo prato ou bebida

1. Edite `data.js` (ver seção 1).
2. Copie um bloco existente (do tipo mostrado acima) e cole logo depois dele.
3. Mude o **`id`** (precisa ser único, tipo `'novo-drink-2026'`).
4. Edite nome, preço, descrição, etc.
5. **Não esqueça**: no final do bloco, tem uma vírgula `,` antes do próximo prato.
6. Commit.

---

## 4. Editar frases do portal (tela de abertura)

As frases que rotacionam na capa (tipo "Beba com todos os sentidos.") estão em `data.js`, na seção **`provocacoes`**:

```js
provocacoes: [
  'Beba com todos os sentidos.',
  'Ir além da comida e da bebida.',
  'Um sonho lúcido em Botafogo.',
  // ...adicione/edite aqui
],
```

---

## 5. Editar horário ou endereço

O horário está no `components/Portal.jsx` e o endereço no `components/Footer.jsx`. **Essas edições precisam de recompilação** (JSX → JS).

**Não edite direto — me chama** que eu faço pra você, ou siga:

1. Edite `.jsx` no GitHub.
2. Localmente (ou via GitHub Codespaces), rode `npm run build`.
3. Commit os arquivos `dist/*.js` atualizados.

> 💡 **Na Fase 2** vou conectar um CMS (painel web visual) onde você edita tudo isso sem encostar no código. Mas por enquanto, é assim.

---

## 6. Se algo der errado

- **O site quebrou depois de uma edição**: no GitHub, vá em "Commits" (aba no topo do repositório), encontre o commit anterior ao problema, clique nele e depois em "Revert this commit". Isso volta o site ao estado bom.
- **Não sei o que está errado**: me chama aqui no chat, te ajudo em segundos.

---

## Próxima evolução (Fase 2)

Quando você quiser, eu adiciono o **Decap CMS** — um painel web bonito onde você:
- Edita pratos/bebidas via formulário (sem ver código)
- Arrasta fotos direto na interface
- Vê preview antes de publicar

É grátis, mas precisa de uma configuração de OAuth que leva uns 20 minutos. Me avisa quando quiser ativar.

---

**Dúvidas? Me chama aqui no chat que eu te guio.**
