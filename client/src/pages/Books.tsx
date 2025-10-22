import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
  review: string;
  coverImage?: string;
  readDate: string;
  category: string;
}

/**
 * Books Page
 * - Display book reviews and reading list
 * - Filter by category
 * - Rating system
 */
export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const categories = ["all", "Law", "Politics", "Philosophy", "History", "Fiction"];

  useEffect(() => {
    // TODO: Load books from database
    // For now, using placeholder data
    const placeholderBooks: Book[] = [
      {
        id: "1",
        title: "The Republic",
        author: "Plato",
        rating: 5,
        review: "A foundational text on political philosophy and justice...",
        readDate: "2025-01-10",
        category: "Philosophy",
      },
      {
        id: "2",
        title: "Democracy in America",
        author: "Alexis de Tocqueville",
        rating: 5,
        review: "Essential reading for understanding democratic systems...",
        readDate: "2024-12-15",
        category: "Politics",
      },
    ];
    
    setTimeout(() => {
      setBooks(placeholderBooks);
      setLoading(false);
    }, 500);
  }, []);

  const filteredBooks =
    selectedCategory === "all"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
            Book Reviews
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Critical reviews and reflections on books about law, politics, philosophy, and more
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-accent text-accent-foreground hover:bg-accent/90"
                    : ""
                }
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Books Grid */}
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
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No books found</h3>
              <p className="text-muted-foreground">
                No books in this category yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-smooth group"
                >
                  {/* Book Cover */}
                  <div className="h-64 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BookOpen className="h-16 w-16 text-muted-foreground" />
                    )}
                  </div>

                  {/* Book Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium px-2 py-1 rounded bg-accent/10 text-accent">
                        {book.category}
                      </span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < book.rating
                                ? "fill-accent text-accent"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-accent transition-smooth">
                      {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      by {book.author}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {book.review}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Read on {new Date(book.readDate).toLocaleDateString()}
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

