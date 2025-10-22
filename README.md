# Portfólio Vijicius

Site de portfólio pessoal profissional e minimalista para estudante de Direito interessado em política.

## 🎨 Design

O site foi desenvolvido seguindo princípios minimalistas inspirados no design do Vaticano:

- **Paleta de cores**: Off-white, azul-escuro/preto e dourado
- **Tipografia**: Playfair Display (serif) para títulos, Inter (sans-serif) para texto
- **Layout**: Espaços amplos, navegação clara, design responsivo
- **Header**: Barra superior branca fixa com logo/monograma central e ícones de busca e menu

## 📁 Estrutura do Projeto

```
portfolio-vijicius/
├── client/
│   ├── public/
│   │   └── images/          # Imagens estáticas (hero, posts, profile)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx   # Navegação inspirada no Vaticano
│   │   │   ├── Footer.tsx   # Rodapé minimalista
│   │   │   ├── Layout.tsx   # Layout principal
│   │   │   └── PostCard.tsx # Cartão de post reutilizável
│   │   ├── pages/
│   │   │   ├── Home.tsx         # Hero + posts em destaque
│   │   │   ├── About.tsx        # Biografia + timeline
│   │   │   ├── Posts.tsx        # Grid de posts com filtros
│   │   │   ├── PostDetail.tsx   # Página de post individual
│   │   │   ├── Archive.tsx      # Arquivo por categoria/ano
│   │   │   └── Contact.tsx      # Formulário + redes sociais
│   │   ├── lib/
│   │   │   └── posts.ts     # Sistema de posts automatizado
│   │   ├── App.tsx          # Rotas principais
│   │   └── index.css        # Estilos globais e paleta
│   └── ...
└── README.md
```

## 🚀 Como Usar

### Instalação

```bash
# Instalar dependências
cd client
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

O site estará disponível em `http://localhost:3000`

### Build para Produção

```bash
pnpm build
```

## 📝 Personalização

### 1. Conteúdo Básico

Procure por `{replace with your content}` no código e substitua pelos seus dados:

- **Hero section** (`client/src/pages/Home.tsx`): Imagem de fundo e tagline
- **About page** (`client/src/pages/About.tsx`): Foto de perfil, biografia, formação, pesquisa e ativismo
- **Contact page** (`client/src/pages/Contact.tsx`): Links de redes sociais e email
- **Header** (`client/src/components/Header.tsx`): Logo/monograma

### 2. Imagens

Adicione suas imagens em `client/public/images/`:

```
client/public/images/
├── hero-bg.jpg           # Imagem de fundo do hero (1920x1080px recomendado)
├── profile.jpg           # Foto de perfil (512x512px recomendado)
└── posts/
    ├── post-1.jpg        # Imagens de capa dos posts
    └── ...
```

### 3. Sistema de Posts Automatizado

O site suporta três opções para gerenciar posts automaticamente:

#### Opção A: Notion API (Recomendado)

1. Crie um banco de dados no Notion com as propriedades:
   - `title` (Título)
   - `slug` (Texto)
   - `date` (Data)
   - `category` (Seleção)
   - `excerpt` (Texto)
   - `content` (Texto longo)
   - `featured` (Checkbox)
   - `coverImage` (Arquivo)

2. Instale o cliente Notion:
   ```bash
   npm install @notionhq/client
   ```

3. Adicione suas credenciais em `.env`:
   ```env
   VITE_NOTION_API_KEY=seu_token_aqui
   VITE_NOTION_DATABASE_ID=id_do_banco
   ```

4. Descomente a função `fetchPostsFromNotion()` em `client/src/lib/posts.ts`

#### Opção B: Contentlayer

1. Instale Contentlayer:
   ```bash
   npm install contentlayer next-contentlayer
   ```

2. Configure `contentlayer.config.ts` na raiz do projeto

3. Crie posts em formato MDX em `/content/posts/`

#### Opção C: Sistema Local

Use o array `SAMPLE_POSTS` em `client/src/lib/posts.ts` como base e adicione seus posts manualmente.

### 4. Revalidação Incremental (ISR)

Para publicação automática sem rebuild completo:

**Next.js App Router:**
```typescript
// Em cada página que busca posts
export const revalidate = 3600; // Revalida a cada 1 hora
```

**Next.js Pages Router:**
```typescript
export async function getStaticProps() {
  return {
    props: { /* ... */ },
    revalidate: 3600, // Revalida a cada 1 hora
  };
}
```

### 5. Integração de Formulário de Contato

#### Formspree (Recomendado)

1. Crie uma conta em https://formspree.io
2. Crie um novo formulário e copie o endpoint
3. Em `client/src/pages/Contact.tsx`, substitua:
   ```typescript
   const response = await fetch('https://formspree.io/f/SEU_ENDPOINT', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData),
   });
   ```

#### EmailJS

1. Crie uma conta em https://www.emailjs.com
2. Configure seu serviço de email e template
3. Instale: `npm install @emailjs/browser`
4. Use `emailjs.send()` no `handleSubmit`

## 🎯 Funcionalidades

### Páginas

- **Home**: Hero section + 3 posts em destaque
- **About**: Biografia em duas colunas + timeline (formação, pesquisa, ativismo)
- **Posts**: Grid responsivo com filtros por categoria e ano
- **Post Detail**: Conteúdo completo + navegação anterior/próximo + SEO
- **Archive**: Agrupamento por categoria e ano (listas expansíveis)
- **Contact**: Formulário + links de redes sociais

### Componentes

- **Header**: Navegação fixa responsiva inspirada no Vaticano
- **Footer**: Rodapé minimalista com links rápidos
- **PostCard**: Cartão de post reutilizável com hover suave
- **Layout**: Wrapper centralizado para todas as páginas

### Sistema de Posts

- Carregamento automático de fonte externa (Notion, Contentlayer, etc.)
- Filtros por categoria e ano
- Posts em destaque (featured)
- Busca simples
- Navegação entre posts
- Agrupamento automático no arquivo

## 🎨 Paleta de Cores

```css
/* Off-white */
--background: oklch(0.98 0.01 60);

/* Azul-escuro / Preto */
--primary: oklch(0.20 0.05 240);
--foreground: oklch(0.15 0.05 240);

/* Dourado */
--accent: oklch(0.55 0.18 60);
```

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔍 SEO

Para melhorar o SEO em produção:

1. Instale `react-helmet` ou use `next/head`
2. Adicione meta tags em cada página:
   ```tsx
   <Helmet>
     <title>{post.title} | Vijicius</title>
     <meta name="description" content={post.excerpt} />
     <meta property="og:title" content={post.title} />
     <meta property="og:image" content={post.coverImage} />
   </Helmet>
   ```

## 📦 Exportação Anônima

Para compartilhar o projeto sem dados pessoais:

1. Substitua todos os `{replace with your content}` por placeholders
2. Remova imagens pessoais de `client/public/images/`
3. Use dados de exemplo em `client/src/lib/posts.ts`
4. Remova credenciais do `.env`

## 🛠️ Tecnologias

- **React 19**: Biblioteca UI
- **Wouter**: Roteamento leve
- **Tailwind CSS 4**: Estilização
- **shadcn/ui**: Componentes UI
- **TypeScript**: Tipagem estática
- **Vite**: Build tool

## 📄 Licença

Este projeto é de uso pessoal. Sinta-se livre para usar como base para seu próprio portfólio.

## 🤝 Contribuições

Este é um projeto pessoal, mas sugestões são bem-vindas!

---

Desenvolvido com ❤️ por Vijicius

