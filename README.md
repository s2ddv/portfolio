# 🌍 dev.folio — Portfolio

Portfolio pessoal com globo interativo, tema azul escuro e dourado.

## Stack

- **React 18** + **Vite**
- CSS Modules
- Canvas API (globo 100% custom, sem lib externa)

---

## Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em dev
npm run dev
```

Acesse: `http://localhost:5173`

---

## Como customizar

### Seus projetos
Edite o arquivo `src/data/projects.js`:

```js
export const projects = [
  {
    id: 1,
    counter: '01 / 02',
    name: 'Notification Bot',
    desc: 'Descrição do projeto...',
    stack: ['Node.js', 'WhatsApp API', 'Canvas LMS'],
    link: 'https://github.com/SEU_USER/SEU_REPO',
    type: 'Automation',
    stackShort: 'Node.js',
    status: 'Live',
    rotY: 0.4,   // posição do globo (radianos)
    rotX: 0.12,
  },
  // adicione mais projetos aqui...
]
```

### Suas skills
No mesmo arquivo, edite o array `skills`:

```js
export const skills = ['Node.js', 'TypeScript', 'Prisma', ...]
```

### Seus links
- **Email**: em `src/components/Contact.jsx`, troque `you@email.com`
- **GitHub**: em `src/components/Contact.jsx`, troque o href do botão GitHub
- **Links dos projetos**: em `src/data/projects.js`, campo `link`

---

## Deploy no Vercel (recomendado)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Fazer deploy
vercel

# Siga os prompts. Na primeira vez, vai pedir para conectar sua conta.
```

Ou faça pelo site:
1. Acesse [vercel.com](https://vercel.com)
2. Importe o repositório do GitHub
3. Clique em **Deploy** — zero config necessário para Vite

---

## Deploy no GitHub Pages

```bash
# 1. Instale o plugin
npm install --save-dev gh-pages

# 2. Adicione no package.json:
"homepage": "https://SEU_USER.github.io/SEU_REPO",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# 3. No vite.config.js, adicione a base:
export default defineConfig({
  base: '/SEU_REPO/',
  plugins: [react()],
})

# 4. Deploy
npm run deploy
```

---

## Estrutura do projeto

```
portfolio/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css          ← variáveis globais e reset
    ├── data/
    │   └── projects.js    ← ✏️ seus projetos e skills
    └── components/
        ├── Cursor.jsx     ← cursor customizado
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Globe.jsx      ← globo interativo (Canvas API)
        ├── Projects.jsx   ← seção de projetos
        ├── Contact.jsx
        ├── Footer.jsx
        └── useReveal.js   ← hook de scroll animation
```
