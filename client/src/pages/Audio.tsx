import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Music, Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioFile {
  id: string;
  title: string;
  description: string;
  duration: string;
  fileUrl?: string;
  uploadDate: string;
  category: string;
  size: string;
}

/**
 * Audio Archive Page
 * - Display audio files and recordings
 * - Filter by category
 * - Play and download functionality
 */
export default function Audio() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const categories = ["all", "Lectures", "Interviews", "Podcasts", "Speeches", "Discussions"];

  useEffect(() => {
    // TODO: Load audio files from database
    // For now, using placeholder data
    const placeholderAudio: AudioFile[] = [
      {
        id: "1",
        title: "Constitutional Law Lecture Series - Part 1",
        description: "Introduction to constitutional principles and judicial review",
        duration: "45:30",
        uploadDate: "2025-01-15",
        category: "Lectures",
        size: "42.3 MB",
      },
      {
        id: "2",
        title: "Political Theory Discussion",
        description: "Exploring contemporary political thought and democratic theory",
        duration: "1:12:45",
        uploadDate: "2025-01-08",
        category: "Discussions",
        size: "68.5 MB",
      },
    ];
    
    setTimeout(() => {
      setAudioFiles(placeholderAudio);
      setLoading(false);
    }, 500);
  }, []);

  const filteredAudio =
    selectedCategory === "all"
      ? audioFiles
      : audioFiles.filter((audio) => audio.category === selectedCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
            <Music className="h-8 w-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
            Audio Archive
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Collection of lectures, interviews, and discussions on law, politics, and society
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

      {/* Audio Files List */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-4xl">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg h-32 animate-pulse"
                />
              ))}
            </div>
          ) : filteredAudio.length === 0 ? (
            <div className="text-center py-16">
              <Music className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No audio files found</h3>
              <p className="text-muted-foreground">
                No audio files in this category yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAudio.map((audio) => (
                <div
                  key={audio.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-smooth group"
                >
                  <div className="flex items-start gap-4">
                    {/* Play Button */}
                    <button className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0 hover:bg-accent/90 transition-smooth group-hover:scale-110">
                      <Play className="h-5 w-5 text-accent-foreground ml-0.5" />
                    </button>

                    {/* Audio Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium px-2 py-1 rounded bg-accent/10 text-accent">
                          {audio.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{audio.duration}</span>
                        <span className="text-xs text-muted-foreground">• {audio.size}</span>
                      </div>

                      <h3 className="text-lg font-serif font-semibold mb-2 group-hover:text-accent transition-smooth">
                        {audio.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {audio.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded on {new Date(audio.uploadDate).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Download Button */}
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex-shrink-0"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
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

