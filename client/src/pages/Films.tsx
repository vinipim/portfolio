import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Film, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilmReview {
  id: string;
  title: string;
  director: string;
  year: number;
  rating: number;
  review: string;
  posterImage?: string;
  watchedDate: string;
  genre: string;
}

/**
 * Films Page - Film Critic
 * - Display film reviews and critiques
 * - Filter by genre
 * - Rating system
 */
export default function Films() {
  const [films, setFilms] = useState<FilmReview[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const genres = ["all", "Political", "Drama", "Documentary", "Historical", "Thriller"];

  useEffect(() => {
    // TODO: Load films from database
    // For now, using placeholder data
    const placeholderFilms: FilmReview[] = [
      {
        id: "1",
        title: "All the President's Men",
        director: "Alan J. Pakula",
        year: 1976,
        rating: 5,
        review: "A masterclass in political journalism and investigative reporting...",
        watchedDate: "2025-01-05",
        genre: "Political",
      },
      {
        id: "2",
        title: "The Post",
        director: "Steven Spielberg",
        year: 2017,
        rating: 4,
        review: "Compelling portrayal of press freedom and institutional courage...",
        watchedDate: "2024-12-20",
        genre: "Political",
      },
    ];
    
    setTimeout(() => {
      setFilms(placeholderFilms);
      setLoading(false);
    }, 500);
  }, []);

  const filteredFilms =
    selectedGenre === "all"
      ? films
      : films.filter((film) => film.genre === selectedGenre);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
            <Film className="h-8 w-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
            Film Critic
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Critical analysis and reviews of films exploring political, legal, and social themes
          </p>
        </div>
      </section>

      {/* Genre Filter */}
      <section className="py-8 border-b border-border">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                onClick={() => setSelectedGenre(genre)}
                className={
                  selectedGenre === genre
                    ? "bg-accent text-accent-foreground hover:bg-accent/90"
                    : ""
                }
              >
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Films Grid */}
      <section className="py-16 lg:py-24">
        <div className="container">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg h-96 animate-pulse"
                />
              ))}
            </div>
          ) : filteredFilms.length === 0 ? (
            <div className="text-center py-16">
              <Film className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No films found</h3>
              <p className="text-muted-foreground">
                No films in this genre yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFilms.map((film) => (
                <div
                  key={film.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-smooth group"
                >
                  {/* Film Poster */}
                  <div className="h-80 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    {film.posterImage ? (
                      <img
                        src={film.posterImage}
                        alt={film.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Film className="h-16 w-16 text-muted-foreground" />
                    )}
                  </div>

                  {/* Film Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium px-2 py-1 rounded bg-accent/10 text-accent">
                        {film.genre}
                      </span>
                      <span className="text-xs text-muted-foreground">{film.year}</span>
                      <div className="flex items-center gap-1 ml-auto">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < film.rating
                                ? "fill-accent text-accent"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-accent transition-smooth">
                      {film.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Directed by {film.director}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {film.review}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Watched on {new Date(film.watchedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

