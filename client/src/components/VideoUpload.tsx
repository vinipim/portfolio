import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Film, X, Play } from "lucide-react";

export default function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    
    // TODO: Implement actual upload to S3 or local storage
    // For now, just simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setUploading(false);
    setSelectedFile(null);
    setPreview(null);
    setTitle("");
    setDescription("");
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Video</CardTitle>
          <CardDescription>
            Upload videos to display in your archive. Videos are hosted locally for maximum privacy.
            Supported formats: MP4, WebM, MOV
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!selectedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed rounded-lg p-12 text-center hover:border-[#C9A961] transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Film className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Drop video here or click to browse</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Maximum file size: 500MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden">
                {preview && (
                  <video
                    src={preview}
                    controls
                    className="w-full max-h-96 object-contain"
                  />
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={clearSelection}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="video-title">Video Title</Label>
                  <Input
                    id="video-title"
                    placeholder="Enter video title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="video-description">Description (optional)</Label>
                  <Input
                    id="video-description"
                    placeholder="Enter video description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleUpload}
                    disabled={uploading || !title}
                    className="bg-[#C9A961] hover:bg-[#B8984F] flex-1"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? "Uploading..." : "Upload Video"}
                  </Button>
                  <Button variant="outline" onClick={clearSelection}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

