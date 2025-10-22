import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Star } from "lucide-react";

/**
 * Admin Review Editor
 * - Create and edit reviews (films, books, albums)
 * - Rating system (1-5 stars)
 * - Tags and notes
 * - API integration ready (TMDb, Last.fm, Google Books)
 */
export default function AdminReviewEditor() {
  const [, setLocation] = useLocation();
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    type: "film" as "film" | "book" | "album",
    title: "",
    creator: "", // Director, Author, or Artist
    year: new Date().getFullYear(),
    rating: 5,
    notes: "",
    tags: "",
    coverUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "rating" || name === "year" ? parseInt(value) : value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      // TODO: Save to database via TRPC
      console.log("Saving review:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert("Review saved successfully!");
      setLocation("/admin/dashboard");
    } catch (error) {
      console.error("Error saving review:", error);
      alert("Failed to save review. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const getTypeLabel = () => {
    switch (formData.type) {
      case "film": return { singular: "Film", creator: "Director" };
      case "book": return { singular: "Book", creator: "Author" };
      case "album": return { singular: "Album", creator: "Artist" };
    }
  };

  const typeLabel = getTypeLabel();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/admin/dashboard")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-semibold">Create New Review</h1>
          </div>
          <Button 
            className="bg-[#C9A961] hover:bg-[#B8984F]" 
            size="sm"
            onClick={handleSave}
            disabled={saving}
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Review"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8 px-6 max-w-4xl">
        <div className="space-y-6">
          {/* Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Review Type</CardTitle>
              <CardDescription>Select what you're reviewing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setFormData(prev => ({ ...prev, type: "film" }))}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.type === "film" 
                      ? "border-accent bg-accent/10" 
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">🎬</div>
                    <div className="font-medium">Film</div>
                  </div>
                </button>

                <button
                  onClick={() => setFormData(prev => ({ ...prev, type: "book" }))}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.type === "book" 
                      ? "border-accent bg-accent/10" 
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">📚</div>
                    <div className="font-medium">Book</div>
                  </div>
                </button>

                <button
                  onClick={() => setFormData(prev => ({ ...prev, type: "album" }))}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.type === "album" 
                      ? "border-accent bg-accent/10" 
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">🎵</div>
                    <div className="font-medium">Album</div>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>{typeLabel.singular} Information</CardTitle>
              <CardDescription>Enter details about the {formData.type}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder={`Enter ${formData.type} title`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="creator" className="block text-sm font-medium mb-2">
                    {typeLabel.creator} *
                  </label>
                  <input
                    type="text"
                    id="creator"
                    name="creator"
                    value={formData.creator}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder={`Enter ${typeLabel.creator.toLowerCase()} name`}
                  />
                </div>

                <div>
                  <label htmlFor="year" className="block text-sm font-medium mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className="w-full px-4 py-2 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="coverUrl" className="block text-sm font-medium mb-2">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  id="coverUrl"
                  name="coverUrl"
                  value={formData.coverUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="https://example.com/cover.jpg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Or use TMDb/Last.fm/Google Books API to fetch automatically
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Rating */}
          <Card>
            <CardHeader>
              <CardTitle>Rating</CardTitle>
              <CardDescription>Rate from 1 to 5 stars</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= formData.rating
                              ? "fill-[#C9A961] text-[#C9A961]"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-accent">
                    {formData.rating}/5
                  </span>
                </div>

                <input
                  type="range"
                  name="rating"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notes and Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Notes & Tags</CardTitle>
              <CardDescription>Your thoughts and categorization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="notes" className="block text-sm font-medium mb-2">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Your thoughts, analysis, or comments..."
                />
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="drama, thriller, classic (comma-separated)"
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setLocation("/admin/dashboard")}
            >
              Cancel
            </Button>
            <Button 
              className="bg-[#C9A961] hover:bg-[#B8984F]"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Review"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

