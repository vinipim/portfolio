import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import { getAllPosts, type Post } from "../lib/posts";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await getAllPosts();
      // Get featured posts or latest 3
      const featured = posts
        .filter((p: any) => p.featured)
        .slice(0, 3);
      
      if (featured.length < 3) {
        const latest = posts.slice(0, 3);
        setFeaturedPosts(latest);
      } else {
        setFeaturedPosts(featured);
      }
      
      setLoadingPosts(false);
    };

    loadPosts();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative w-full h-[65vh] lg:h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/art/friedrich-wanderer.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        
        {/* Content */}
        <div className="relative z-10 container text-center text-white px-6">
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight"
            style={{ 
              textShadow: '3px 5px 15px rgba(0,0,0,0.9), 0 0 50px rgba(0,0,0,0.7)',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}
          >
            Vinicius M. Blanchard
          </h1>
          <p 
            className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide"
            style={{ 
              textShadow: '2px 4px 12px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}
          >
            Politics enthusiast
          </p>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
              Recent Publications
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Articles, analysis and reflections on politics
            </p>
          </div>

          {loadingPosts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-muted animate-pulse h-96 rounded-lg" />
              ))}
            </div>
          ) : featuredPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
              
              <div className="text-center">
                <Link href="/posts">
                  <Button 
                    size="lg" 
                    className="bg-[#C9A961] hover:bg-[#B8984F] text-white font-medium px-8"
                  >
                    View all posts
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No posts available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

