/**
 * Sistema de posts automatizado
 * 
 * INSTRUÇÕES PARA AUTOMAÇÃO:
 * 
 * 1. OPÇÃO A - Notion API (Recomendado):
 *    - Crie um banco de dados no Notion com as propriedades: title, slug, date, category, excerpt, content, featured, coverImage
 *    - Instale: npm install @notionhq/client
 *    - Adicione sua chave API em .env: VITE_NOTION_API_KEY=seu_token_aqui
 *    - Adicione o ID do banco: VITE_NOTION_DATABASE_ID=id_do_banco
 *    - Descomente a função fetchPostsFromNotion() abaixo
 * 
 * 2. OPÇÃO B - Contentlayer:
 *    - Instale: npm install contentlayer next-contentlayer
 *    - Configure contentlayer.config.ts na raiz do projeto
 *    - Posts em formato MDX em /content/posts/
 *    - Suporta frontmatter e revalidação automática
 * 
 * 3. OPÇÃO C - Sistema de arquivos local:
 *    - Mantenha posts em /public/posts/ como arquivos JSON ou Markdown
 *    - Use a função fetchPostsFromLocal() abaixo
 * 
 * REVALIDAÇÃO INCREMENTAL (ISR):
 * - Para Next.js com App Router, use: export const revalidate = 3600 (1 hora)
 * - Para Pages Router, use: getStaticProps com revalidate: 3600
 * - Isso permite que novos posts apareçam automaticamente sem rebuild completo
 */

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  featured?: boolean;
  coverImage?: string;
  author?: string;
  tags?: string[];
}

export interface PostCategory {
  name: string;
  slug: string;
  count: number;
}

// ============================================
// OPÇÃO A: Notion API (Descomente para usar)
// ============================================

/*
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY,
});

export async function fetchPostsFromNotion(): Promise<Post[]> {
  try {
    const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;
    
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'date',
          direction: 'descending',
        },
      ],
    });

    const posts: Post[] = response.results.map((page: any) => ({
      slug: page.properties.slug.rich_text[0]?.plain_text || '',
      title: page.properties.title.title[0]?.plain_text || '',
      date: page.properties.date.date?.start || '',
      category: page.properties.category.select?.name || 'Uncategorized',
      excerpt: page.properties.excerpt.rich_text[0]?.plain_text || '',
      content: page.properties.content.rich_text[0]?.plain_text || '',
      featured: page.properties.featured?.checkbox || false,
      coverImage: page.properties.coverImage?.files[0]?.file?.url || '',
    }));

    return posts;
  } catch (error) {
    console.error('Erro ao buscar posts do Notion:', error);
    return [];
  }
}
*/

// ============================================
// OPÇÃO C: Sistema local (Dados de exemplo)
// ============================================

/**
 * Posts de exemplo para demonstração
 * SUBSTITUA por dados reais de sua fonte externa
 */
const SAMPLE_POSTS: Post[] = [
  {
    slug: "direito-constitucional-contemporaneo",
    title: "Direito Constitucional Contemporâneo",
    date: "2025-01-15",
    category: "Direito",
    excerpt: "Uma análise sobre os desafios do direito constitucional na era digital e suas implicações para a democracia moderna.",
    content: `{replace with your content}
    
Este é um post de exemplo. Substitua este conteúdo pelo texto real do seu artigo.

## Introdução

O direito constitucional enfrenta novos desafios na era digital...

## Desenvolvimento

Lorem ipsum dolor sit amet, consectetur adipiscing elit...

## Conclusão

Portanto, é fundamental que...`,
    featured: true,
    coverImage: "/images/posts/constitutional-law.jpg", // {replace with your content}
    author: "Vinicius",
    tags: ["direito", "constituição", "democracia"],
  },
  {
    slug: "politica-externa-brasileira",
    title: "Política Externa Brasileira: Perspectivas",
    date: "2025-01-10",
    category: "Política",
    excerpt: "Reflexões sobre o papel do Brasil no cenário internacional e os desafios diplomáticos contemporâneos.",
    content: `{replace with your content}
    
Este é um post de exemplo sobre política externa.

## Contexto Histórico

A política externa brasileira tem raízes profundas...

## Análise Atual

Nos últimos anos, observamos...`,
    featured: true,
    coverImage: "/images/posts/foreign-policy.jpg", // {replace with your content}
    author: "Vinicius",
    tags: ["política", "relações internacionais", "diplomacia"],
  },
  {
    slug: "reforma-politica-necessaria",
    title: "A Necessidade de Reforma Política",
    date: "2025-01-05",
    category: "Política",
    excerpt: "Discussão sobre as principais propostas de reforma política e seus impactos no sistema democrático brasileiro.",
    content: `{replace with your content}`,
    featured: false,
    coverImage: "/images/posts/political-reform.jpg", // {replace with your content}
    author: "Vinicius",
    tags: ["política", "reforma", "democracia"],
  },
  {
    slug: "direitos-humanos-sec-xxi",
    title: "Direitos Humanos no Século XXI",
    date: "2024-12-20",
    category: "Direito",
    excerpt: "Os desafios e avanços na proteção dos direitos humanos em um mundo cada vez mais conectado.",
    content: `{replace with your content}`,
    featured: false,
    author: "Vinicius",
    tags: ["direitos humanos", "direito internacional"],
  },
];

/**
 * Busca todos os posts
 * SUBSTITUA pela implementação da sua fonte de dados (Notion, Contentlayer, etc.)
 */
export async function getAllPosts(): Promise<Post[]> {
  // Para produção, substitua por:
  // return await fetchPostsFromNotion();
  // ou sua implementação preferida
  
  return SAMPLE_POSTS;
}

/**
 * Busca posts em destaque (featured)
 */
export async function getFeaturedPosts(limit: number = 3): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.featured).slice(0, limit);
}

/**
 * Busca um post específico por slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const allPosts = await getAllPosts();
  return allPosts.find(post => post.slug === slug) || null;
}

/**
 * Busca posts por categoria
 */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.category === category);
}

/**
 * Busca posts por ano
 */
export async function getPostsByYear(year: number): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => {
    const postYear = new Date(post.date).getFullYear();
    return postYear === year;
  });
}

/**
 * Retorna todas as categorias com contagem de posts
 */
export async function getAllCategories(): Promise<PostCategory[]> {
  const allPosts = await getAllPosts();
  const categoryMap = new Map<string, number>();

  allPosts.forEach(post => {
    const count = categoryMap.get(post.category) || 0;
    categoryMap.set(post.category, count + 1);
  });

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    count,
  }));
}

/**
 * Retorna todos os anos com posts
 */
export async function getAllYears(): Promise<number[]> {
  const allPosts = await getAllPosts();
  const years = new Set<number>();

  allPosts.forEach(post => {
    const year = new Date(post.date).getFullYear();
    years.add(year);
  });

  return Array.from(years).sort((a, b) => b - a);
}

/**
 * Busca posts (simples busca por título e excerpt)
 */
export async function searchPosts(query: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  const lowerQuery = query.toLowerCase();

  return allPosts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Retorna posts adjacentes (anterior e próximo) para navegação
 */
export async function getAdjacentPosts(currentSlug: string): Promise<{
  previous: Post | null;
  next: Post | null;
}> {
  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex(post => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
  };
}

