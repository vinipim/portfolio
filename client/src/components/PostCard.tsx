import { Link } from "wouter";
import { Post } from "@/lib/posts";
import { Calendar, Tag } from "lucide-react";
import { Button } from "./ui/button";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

/**
 * Componente de cartão de post
 * - Design minimalista com contraste forte
 * - Hover suave
 * - Texto legível
 * - Suporta modo featured (destaque)
 */
export default function PostCard({ post, featured = false }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (featured) {
    return (
      <article className="group relative overflow-hidden bg-card border border-border rounded hover:shadow-lg transition-smooth">
        <Link href={`/posts/${post.slug}`}>
          <a className="block">
            {/* Imagem de capa */}
            {post.coverImage && (
              <div className="aspect-[16/9] overflow-hidden bg-muted">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
              </div>
            )}

            <div className="p-6 lg:p-8">
              {/* Categoria */}
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-4 w-4 text-accent" />
                <span className="text-xs uppercase tracking-wider font-semibold text-accent">
                  {post.category}
                </span>
              </div>

              {/* Título */}
              <h3 className="text-2xl lg:text-3xl font-serif font-semibold mb-3 group-hover:text-accent transition-smooth">
                {post.title}
              </h3>

              {/* Data */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{formattedDate}</time>
              </div>

              {/* Excerpt */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {post.excerpt}
              </p>

              {/* Call to action */}
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                Ler mais →
              </Button>
            </div>
          </a>
        </Link>
      </article>
    );
  }

  return (
    <article className="group bg-card border border-border rounded hover:shadow-lg transition-smooth overflow-hidden">
      <Link href={`/posts/${post.slug}`}>
        <a className="block">
          {/* Imagem de capa */}
          {post.coverImage && (
            <div className="aspect-[16/9] overflow-hidden bg-muted">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
              />
            </div>
          )}

          <div className="p-5 lg:p-6">
            {/* Categoria e data */}
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <Tag className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs uppercase tracking-wider font-semibold text-accent">
                  {post.category}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={post.date}>{formattedDate}</time>
              </div>
            </div>

            {/* Título */}
            <h3 className="text-lg lg:text-xl font-serif font-semibold mb-2 group-hover:text-accent transition-smooth line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </div>
        </a>
      </Link>
    </article>
  );
}

