import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { getAllPosts, getAllCategories, getAllYears, Post, PostCategory } from "@/lib/posts";
import { Filter } from "lucide-react";

/**
 * Posts Page
 * - Grid responsivo de posts
 * - Filtros por categoria e ano
 * - Carregamento automático da fonte externa
 */
export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [postsData, categoriesData, yearsData] = await Promise.all([
          getAllPosts(),
          getAllCategories(),
          getAllYears(),
        ]);

        setPosts(postsData);
        setFilteredPosts(postsData);
        setCategories(categoriesData);
        setYears(yearsData);
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    let filtered = [...posts];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (selectedYear !== "all") {
      const year = parseInt(selectedYear);
      filtered = filtered.filter(post => {
        const postYear = new Date(post.date).getFullYear();
        return postYear === year;
      });
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, selectedYear, posts]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedYear("all");
  };

  return (
    <Layout>
      <div className="py-12 lg:py-16">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-4xl lg:text-5xl font-serif font-semibold mb-4">
              Todos os Posts
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore articles, analysis and reflections on politics
            </p>
          </div>

          {/* Filtros */}
          <div className="mb-12 bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold">Filtros</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Filtro por categoria */}
              <div>
                <label className="block text-sm font-medium mb-2">Categoria</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All categories</option>
                  {categories.map((category) => (
                    <option key={category.slug} value={category.name}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtro por ano */}
              <div>
                <label className="block text-sm font-medium mb-2">Ano</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">Todos os anos</option>
                  {years.map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botão de reset */}
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="w-full"
                  disabled={selectedCategory === "all" && selectedYear === "all"}
                >
                  Limpar filtros
                </Button>
              </div>
            </div>
          </div>

          {/* Grid de posts */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card border border-border rounded h-96 animate-pulse" />
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                No posts found com os filtros selecionados.
              </p>
              <Button onClick={resetFilters} variant="outline">
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

