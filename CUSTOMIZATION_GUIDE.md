# Guia de Customização Rápida

Este guia ajudará você a personalizar o portfólio com seus dados reais.

## 📋 Checklist de Customização

### 1. Imagens (Prioridade Alta)

Adicione suas imagens em `client/public/images/`:

```
client/public/images/
├── hero-bg.jpg           # Imagem de fundo do hero (1920x1080px)
├── profile.jpg           # Sua foto de perfil (512x512px, circular)
└── posts/
    ├── constitutional-law.jpg
    ├── foreign-policy.jpg
    └── political-reform.jpg
```

### 2. Conteúdo da Home Page

**Arquivo**: `client/src/pages/Home.tsx`

Localize e substitua:
- Linha 42: `backgroundImage: "url('/images/hero-bg.jpg')"` - Sua imagem de fundo
- Linha 59: Tagline personalizado

### 3. Página About

**Arquivo**: `client/src/pages/About.tsx`

Substitua os dados de exemplo:
- **Biografia** (linhas 76-95): Seu texto pessoal
- **Formação** (linhas 20-31): Seus cursos e instituições
- **Pesquisa** (linhas 33-43): Seus projetos de pesquisa
- **Ativismo** (linhas 45-56): Suas atividades

### 4. Página Contact

**Arquivo**: `client/src/pages/Contact.tsx`

- **Redes sociais** (linhas 72-98): Substitua os URLs
- **Email** (linha 165): Seu email de contato
- **Integração de formulário** (linha 53): Configure Formspree ou EmailJS

### 5. Header (Logo/Monograma)

**Arquivo**: `client/src/components/Header.tsx`

Linha 40: Substitua "V" pela sua inicial ou logo personalizado

### 6. Posts (Sistema Automatizado)

**Arquivo**: `client/src/lib/posts.ts`

**Opção 1 - Notion API** (Recomendado):
1. Descomente linhas 41-73
2. Configure `.env`:
   ```env
   VITE_NOTION_API_KEY=seu_token
   VITE_NOTION_DATABASE_ID=id_do_banco
   ```

**Opção 2 - Posts Manuais**:
- Edite o array `SAMPLE_POSTS` (linhas 81-137)
- Adicione seus próprios posts seguindo o formato

### 7. Cores e Tipografia (Opcional)

**Arquivo**: `client/src/index.css`

Se quiser ajustar as cores:
- Linha 49: `--primary` (azul-escuro)
- Linha 59: `--background` (off-white)
- Linha 69: `--accent` (dourado)

## 🚀 Integração Notion (Passo a Passo)

### 1. Criar Banco de Dados no Notion

1. Abra o Notion e crie uma nova página
2. Adicione um banco de dados (Database - Full page)
3. Configure as seguintes propriedades:

| Nome da Propriedade | Tipo | Descrição |
|---------------------|------|-----------|
| `title` | Title | Título do post |
| `slug` | Text | URL amigável (ex: "meu-post") |
| `date` | Date | Data de publicação |
| `category` | Select | Categoria (Direito, Política, etc.) |
| `excerpt` | Text | Resumo curto |
| `content` | Text | Conteúdo completo |
| `featured` | Checkbox | Marcar para destacar na home |
| `coverImage` | Files & media | Imagem de capa |

### 2. Obter Credenciais

1. Acesse https://www.notion.so/my-integrations
2. Clique em "New integration"
3. Dê um nome (ex: "Portfolio Vijicius")
4. Copie o "Internal Integration Token"
5. No seu banco de dados, clique nos três pontos → "Add connections" → Selecione sua integração

### 3. Obter Database ID

Na URL do seu banco de dados:
```
https://www.notion.so/workspace/DATABASE_ID?v=...
                              ^^^^^^^^^^^
```

### 4. Configurar no Projeto

1. Crie arquivo `.env` na raiz do projeto:
   ```env
   VITE_NOTION_API_KEY=secret_abc123...
   VITE_NOTION_DATABASE_ID=abc123def456...
   ```

2. Instale dependência:
   ```bash
   npm install @notionhq/client
   ```

3. Em `client/src/lib/posts.ts`, descomente as linhas 41-73

4. Reinicie o servidor de desenvolvimento

### 5. Adicionar Posts

Agora basta adicionar linhas no seu banco de dados Notion e elas aparecerão automaticamente no site!

## 📧 Integração Formspree (Email)

### 1. Criar Conta

1. Acesse https://formspree.io
2. Crie uma conta gratuita
3. Clique em "New Form"
4. Copie o endpoint (ex: `https://formspree.io/f/xyzabc123`)

### 2. Configurar no Projeto

Em `client/src/pages/Contact.tsx`, linha 53, descomente e configure:

```typescript
const response = await fetch('https://formspree.io/f/SEU_ENDPOINT', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});

if (response.ok) {
  setSubmitStatus('success');
  setFormData({ name: '', email: '', message: '' });
} else {
  setSubmitStatus('error');
}
```

## 🎨 Customizações Avançadas

### Adicionar Nova Categoria de Posts

1. Adicione a categoria no Notion (ou no array `SAMPLE_POSTS`)
2. O sistema detectará automaticamente e criará o filtro

### Adicionar Novo Item na Timeline (About)

Em `client/src/pages/About.tsx`, adicione um objeto no array correspondente:

```typescript
const education = [
  // ... itens existentes
  {
    year: "2025",
    title: "Novo Curso",
    institution: "Instituição",
    description: "Descrição do curso",
  },
];
```

### Mudar Fontes

Em `client/src/index.css`, linha 1, substitua as fontes do Google Fonts:

```css
@import url('https://fonts.googleapis.com/css2?family=SuaFonte:wght@400;600&display=swap');
```

Depois atualize as variáveis CSS (linhas 84-85).

## ✅ Checklist Final

Antes de publicar, verifique:

- [ ] Todas as imagens foram substituídas
- [ ] Biografia e timeline atualizadas
- [ ] Links de redes sociais corretos
- [ ] Sistema de posts configurado (Notion ou manual)
- [ ] Formulário de contato integrado
- [ ] Testado em mobile, tablet e desktop
- [ ] Todos os `{replace with your content}` removidos

## 🆘 Problemas Comuns

**Posts não aparecem:**
- Verifique se o `.env` está configurado corretamente
- Confirme que a integração Notion tem acesso ao banco de dados
- Verifique o console do navegador para erros

**Imagens não carregam:**
- Certifique-se de que as imagens estão em `client/public/images/`
- Use caminhos absolutos: `/images/nome.jpg`

**Formulário não envia:**
- Verifique se o endpoint do Formspree está correto
- Teste diretamente no site do Formspree primeiro

## 📞 Suporte

Para dúvidas sobre:
- **Notion API**: https://developers.notion.com
- **Formspree**: https://help.formspree.io
- **React/Vite**: Consulte a documentação oficial

---

Boa sorte com seu portfólio! 🚀

