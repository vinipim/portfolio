import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { getPostBySlug, getAdjacentPosts, Post } from "@/lib/posts";
import { Calendar, Tag, ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Post Detail Page
 * - Renderiza título, data, categoria e conteúdo
 * - Navegação anterior/próximo
 * - SEO metadata (título, descrição, imagem)
 * 
 * Para SEO completo em produção:
 * - Use <Helmet> ou next/head para meta tags
 * - Adicione Open Graph e Twitter Card tags
 * - Configure canonical URLs
 */
export default function PostDetail() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [adjacentPosts, setAdjacentPosts] = useState<{
    previous: Post | null;
    next: Post | null;
  }>({ previous: null, next: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (!slug) return;

      try {
        const [postData, adjacent] = await Promise.all([
          getPostBySlug(slug),
          getAdjacentPosts(slug),
        ]);

        setPost(postData);
        setAdjacentPosts(adjacent);

        // SEO: Atualizar título da página
        if (postData) {
          document.title = `${postData.title} | Vijicius`;
        }
      } catch (error) {
        console.error("Erro ao carregar post:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="py-12 lg:py-16">
          <div className="container max-w-4xl">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-96 bg-muted rounded" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="py-12 lg:py-16">
          <div className="container max-w-4xl text-center">
            <h1 className="text-3xl font-serif font-semibold mb-4">Post não encontrado</h1>
            <p className="text-muted-foreground mb-8">
              O post que você procura não existe ou foi removido.
            </p>
            <Link href="/posts">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para Posts
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Layout>
      <article className="py-12 lg:py-16">
        <div className="container max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link href="/posts">
              <a className="text-sm text-muted-foreground hover:text-accent transition-smooth inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar para Posts
              </a>
            </Link>
          </nav>

          {/* Header */}
          <header className="mb-12">
            {/* Categoria */}
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-4 w-4 text-accent" />
              <span className="text-sm uppercase tracking-wider font-semibold text-accent">
                {post.category}
              </span>
            </div>

            {/* Título */}
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{formattedDate}</time>
              </div>
              {post.author && (
                <div>
                  Por <span className="font-medium text-foreground">{post.author}</span>
                </div>
              )}
            </div>
          </header>

          {/* Imagem de capa */}
          {post.coverImage && (
            <div className="mb-12 rounded-lg overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Conteúdo */}
          <div className="prose prose-lg max-w-none mb-12">
            {/* 
              Para renderizar Markdown em produção, use:
              - react-markdown
              - marked + DOMPurify
              - ou next-mdx-remote
            */}
            <div 
              className="leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Navegação anterior/próximo */}
          <nav className="border-t border-border pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Post anterior */}
              <div>
                {adjacentPosts.previous ? (
                  <Link href={`/posts/${adjacentPosts.previous.slug}`}>
                    <a className="block p-6 bg-card border border-border rounded hover:shadow-lg transition-smooth group">
                      <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Post anterior
                      </div>
                      <h3 className="font-serif font-semibold group-hover:text-accent transition-smooth">
                        {adjacentPosts.previous.title}
                      </h3>
                    </a>
                  </Link>
                ) : (
                  <div className="p-6 bg-muted/50 border border-border rounded opacity-50">
                    <div className="text-sm text-muted-foreground">Nenhum post anterior</div>
                  </div>
                )}
              </div>

              {/* Próximo post */}
              <div>
                {adjacentPosts.next ? (
                  <Link href={`/posts/${adjacentPosts.next.slug}`}>
                    <a className="block p-6 bg-card border border-border rounded hover:shadow-lg transition-smooth group text-right">
                      <div className="text-sm text-muted-foreground mb-2 flex items-center justify-end gap-2">
                        Próximo post
                        <ArrowRight className="h-4 w-4" />
                      </div>
                      <h3 className="font-serif font-semibold group-hover:text-accent transition-smooth">
                        {adjacentPosts.next.title}
                      </h3>
                    </a>
                  </Link>
                ) : (
                  <div className="p-6 bg-muted/50 border border-border rounded opacity-50 text-right">
                    <div className="text-sm text-muted-foreground">Nenhum próximo post</div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </article>
    </Layout>
  );
}

