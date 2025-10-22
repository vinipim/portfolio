import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { getFeaturedPosts, Post } from "@/lib/posts";
import { useAuth } from "@/_core/hooks/useAuth";

/**
 * Home Page
 * - Hero section em largura total com imagem de fundo
 * - Tagline "Law student & politics enthusiast"
 * - 3 publicações mais recentes em destaque
 * - Botão "Ver todos os posts"
 */
export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading: authLoading, error, isAuthenticated, logout } = useAuth();

  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedPosts() {
      try {
        const posts = await getFeaturedPosts(3);
        setFeaturedPosts(posts);
      } catch (error) {
        console.error("Erro ao carregar posts em destaque:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedPosts();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background image - {replace with your content} */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70"
          style={{
            backgroundImage: "url('/images/art/friedrich-wanderer.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 container text-center text-primary-foreground px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
            Vinicius M. Blanchard
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-4">
            Law student & politics enthusiast
          </p>
          <p className="text-base md:text-lg max-w-2xl mx-auto opacity-90">
            {/* {replace with your content} - Adicione seu tagline personalizado aqui */}
            Explorando as interseções entre direito, política e sociedade
          </p>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-semibold mb-4">
              Publicações Recentes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Artigos, análises e reflexões sobre direito e política
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border rounded h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredPosts.map((post) => (
                <PostCard key={post.slug} post={post} featured />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link href="/posts">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              >
                Ver todos os posts
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
