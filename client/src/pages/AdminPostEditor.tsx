import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Eye } from "lucide-react";
import MediaUpload from "@/components/MediaUpload";

/**
 * Admin Post Editor
 * - Create and edit blog posts
 * - Rich text editor
 * - Image upload
 * - SEO metadata
 * - Publish/Draft status
 */
export default function AdminPostEditor() {
  const [, setLocation] = useLocation();
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Politics",
    excerpt: "",
    content: "",
    coverImage: "",
    featured: false,
    tags: "",
    author: "Vinicius",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Auto-generate slug from title
    if (name === "title" && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    // Simulate upload - Replace with actual S3 upload
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, coverImage: url }));
        resolve(url);
      }, 1500);
    });
  };

  const handleSave = async (status: "draft" | "published") => {
    setSaving(true);
    
    try {
      // TODO: Save to database via TRPC
      console.log("Saving post:", { ...formData, status });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(`Post ${status === "published" ? "published" : "saved as draft"} successfully!`);
      setLocation("/admin/dashboard");
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

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
            <h1 className="text-xl font-semibold">Create New Post</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => handleSave("draft")} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button 
              className="bg-[#C9A961] hover:bg-[#B8984F]" 
              size="sm"
              onClick={() => handleSave("published")}
              disabled={saving}
            >
              <Eye className="w-4 h-4 mr-2" />
              {saving ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8 px-6 max-w-5xl">
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Post title, category, and URL slug</CardDescription>
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
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium mb-2">
                  URL Slug *
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="post-url-slug"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL: /posts/{formData.slug || "post-url-slug"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="Politics">Politics</option>
                    <option value="Law">Law</option>
                    <option value="Analysis">Analysis</option>
                    <option value="Opinion">Opinion</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="author" className="block text-sm font-medium mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
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
                  placeholder="politics, democracy, analysis (comma-separated)"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-input"
                />
                <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
                  Featured post (show on homepage)
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Cover Image */}
          <MediaUpload
            type="image"
            onUpload={handleImageUpload}
            currentUrl={formData.coverImage}
            title="Cover Image"
            description="Upload a cover image for this post (recommended: 1200x630px)"
          />

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>Write your post content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
                  Excerpt *
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Brief summary of the post (shown in post cards)"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2">
                  Full Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={20}
                  className="w-full px-4 py-2 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
                  placeholder="Write your post content here... (Markdown supported)"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Supports Markdown formatting
                </p>
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
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => handleSave("draft")} disabled={saving}>
                Save as Draft
              </Button>
              <Button 
                className="bg-[#C9A961] hover:bg-[#B8984F]"
                onClick={() => handleSave("published")}
                disabled={saving}
              >
                {saving ? "Publishing..." : "Publish Post"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

