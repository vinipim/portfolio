import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Video as VideoIcon, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoFile {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  uploadDate: string;
  category: string;
  views: number;
}

/**
 * Video Archive Page
 * - Display video files and recordings
 * - Filter by category
 * - Video player functionality
 */
export default function Video() {
  const [videoFiles, setVideoFiles] = useState<VideoFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const categories = ["all", "Lectures", "Debates", "Presentations", "Interviews", "Documentaries"];

  useEffect(() => {
    // TODO: Load video files from database
    // For now, using placeholder data
    const placeholderVideos: VideoFile[] = [
      {
        id: "1",
        title: "Constitutional Rights in the Digital Age",
        description: "Exploring privacy rights and digital surveillance in modern democracies",
        duration: "52:15",
        uploadDate: "2025-01-12",
        category: "Lectures",
        views: 245,
      },
      {
        id: "2",
        title: "Political Discourse and Democratic Institutions",
        description: "Panel discussion on the role of institutions in maintaining democratic norms",
        duration: "1:28:30",
        uploadDate: "2025-01-05",
        category: "Debates",
        views: 189,
      },
    ];
    
    setTimeout(() => {
      setVideoFiles(placeholderVideos);
      setLoading(false);
    }, 500);
  }, []);

  const filteredVideos =
    selectedCategory === "all"
      ? videoFiles
      : videoFiles.filter((video) => video.category === selectedCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
            <VideoIcon className="h-8 w-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
            Video Archive
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Video lectures, debates, and presentations on legal and political topics
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

      {/* Videos Grid */}
      <section className="py-16 lg:py-24">
        <div className="container">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg h-80 animate-pulse"
                />
              ))}
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="text-center py-16">
              <VideoIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No videos found</h3>
              <p className="text-muted-foreground">
                No videos in this category yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-smooth group"
                >
                  {/* Video Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group cursor-pointer">
                    {video.thumbnailUrl ? (
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <VideoIcon className="h-16 w-16 text-muted-foreground" />
                    )}
                    
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-primary/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                        <Play className="h-8 w-8 text-accent-foreground ml-1" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-primary/90 text-primary-foreground text-xs font-medium">
                      {video.duration}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium px-2 py-1 rounded bg-accent/10 text-accent">
                        {video.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {video.views} views
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-semibold mb-2 group-hover:text-accent transition-smooth line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {video.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Uploaded on {new Date(video.uploadDate).toLocaleDateString()}
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

