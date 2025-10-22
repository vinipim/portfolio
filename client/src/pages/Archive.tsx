import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { getAllPosts, Post } from "@/lib/posts";
import { ChevronDown, ChevronRight, Calendar, FolderOpen } from "lucide-react";

/**
 * Archive Page
 * - Agrupa posts por categoria e ano
 * - Listas expansíveis (accordion)
 * - Gerado automaticamente da base de dados
 */
export default function Archive() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadPosts() {
      try {
        const postsData = await getAllPosts();
        setPosts(postsData);
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  // Agrupar posts por categoria
  const postsByCategory = posts.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  // Agrupar posts por ano
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleYear = (year: string) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-12 lg:py-16">
          <div className="container max-w-5xl">
            <div className="animate-pulse space-y-6">
              <div className="h-12 bg-muted rounded w-1/2 mx-auto" />
              <div className="h-64 bg-muted rounded" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 lg:py-16">
        <div className="container max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-serif font-semibold mb-4">
              Arquivo
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Todos os posts organizados por categoria e ano
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Agrupamento por Categoria */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <FolderOpen className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-serif font-semibold">Por Categoria</h2>
              </div>

              <div className="space-y-3">
                {Object.entries(postsByCategory)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([category, categoryPosts]) => {
                    const isExpanded = expandedCategories.has(category);
                    return (
                      <div key={category} className="border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleCategory(category)}
                          className="w-full flex items-center justify-between p-4 bg-card hover:bg-secondary transition-smooth text-left"
                        >
                          <div className="flex items-center gap-3">
                            {isExpanded ? (
                              <ChevronDown className="h-5 w-5 text-accent" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-accent" />
                            )}
                            <span className="font-semibold">{category}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {categoryPosts.length} {categoryPosts.length === 1 ? "post" : "posts"}
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="border-t border-border bg-background">
                            <ul className="divide-y divide-border">
                              {categoryPosts
                                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                .map((post) => (
                                  <li key={post.slug}>
                                    <Link href={`/posts/${post.slug}`}>
                                      <a className="block p-4 hover:bg-secondary transition-smooth group">
                                        <div className="font-medium group-hover:text-accent transition-smooth mb-1">
                                          {post.title}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {new Date(post.date).toLocaleDateString("pt-BR", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })}
                                        </div>
                                      </a>
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </section>

            {/* Agrupamento por Ano */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-serif font-semibold">Por Ano</h2>
              </div>

              <div className="space-y-3">
                {Object.entries(postsByYear)
                  .sort(([a], [b]) => parseInt(b) - parseInt(a))
                  .map(([year, yearPosts]) => {
                    const isExpanded = expandedYears.has(year);
                    return (
                      <div key={year} className="border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleYear(year)}
                          className="w-full flex items-center justify-between p-4 bg-card hover:bg-secondary transition-smooth text-left"
                        >
                          <div className="flex items-center gap-3">
                            {isExpanded ? (
                              <ChevronDown className="h-5 w-5 text-accent" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-accent" />
                            )}
                            <span className="font-semibold">{year}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {yearPosts.length} {yearPosts.length === 1 ? "post" : "posts"}
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="border-t border-border bg-background">
                            <ul className="divide-y divide-border">
                              {yearPosts
                                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                .map((post) => (
                                  <li key={post.slug}>
                                    <Link href={`/posts/${post.slug}`}>
                                      <a className="block p-4 hover:bg-secondary transition-smooth group">
                                        <div className="font-medium group-hover:text-accent transition-smooth mb-1">
                                          {post.title}
                                        </div>
                                        <div className="text-sm text-muted-foreground flex items-center gap-4">
                                          <span>
                                            {new Date(post.date).toLocaleDateString("pt-BR", {
                                              month: "long",
                                              day: "numeric",
                                            })}
                                          </span>
                                          <span className="text-accent">• {post.category}</span>
                                        </div>
                                      </a>
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

