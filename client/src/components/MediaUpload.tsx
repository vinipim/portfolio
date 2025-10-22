import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon, Video, File, CheckCircle } from "lucide-react";

interface MediaUploadProps {
  type: "image" | "video" | "profile";
  onUpload: (file: File) => Promise<string>; // Returns URL of uploaded file
  currentUrl?: string;
  title: string;
  description: string;
}

/**
 * MediaUpload Component
 * - Drag and drop file upload
 * - Preview before upload
 * - Support for images and videos
 * - Integration with S3 storage
 */
export default function MediaUpload({ type, onUpload, currentUrl, title, description }: MediaUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = type === "video" 
    ? "video/mp4,video/webm,video/ogg" 
    : "image/jpeg,image/png,image/webp,image/avif";

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Validate file type
    const isValidType = type === "video" 
      ? file.type.startsWith("video/")
      : file.type.startsWith("image/");

    if (!isValidType) {
      alert(`Please select a valid ${type} file`);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    setUploadSuccess(false);
    
    try {
      const url = await onUpload(file);
      console.log("File uploaded successfully:", url);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {preview ? (
          <div className="space-y-4">
            {/* Preview */}
            <div className="relative rounded-lg overflow-hidden border border-border">
              {type === "video" ? (
                <video 
                  src={preview} 
                  controls 
                  className="w-full max-h-96 object-contain bg-black"
                />
              ) : (
                <img 
                  src={preview} 
                  alt="Preview" 
                  className={`w-full object-cover ${type === "profile" ? "max-h-64" : "max-h-96"}`}
                />
              )}
              
              {/* Remove button */}
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Success indicator */}
              {uploadSuccess && (
                <div className="absolute top-2 left-2 flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Uploaded!
                </div>
              )}
            </div>

            {/* Change file button */}
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full"
              disabled={uploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Uploading..." : "Change File"}
            </Button>
          </div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
              transition-colors duration-200
              ${isDragging 
                ? "border-accent bg-accent/5" 
                : "border-border hover:border-accent/50 hover:bg-accent/5"
              }
            `}
          >
            <div className="flex flex-col items-center gap-4">
              {type === "video" ? (
                <Video className="w-12 h-12 text-muted-foreground" />
              ) : type === "profile" ? (
                <ImageIcon className="w-12 h-12 text-muted-foreground" />
              ) : (
                <File className="w-12 h-12 text-muted-foreground" />
              )}
              
              <div>
                <p className="text-sm font-medium mb-1">
                  Drop your {type} here or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  {type === "video" 
                    ? "Supports MP4, WebM, OGG" 
                    : "Supports JPG, PNG, WebP, AVIF"
                  }
                </p>
              </div>

              <Button variant="outline" size="sm" type="button">
                <Upload className="w-4 h-4 mr-2" />
                Select File
              </Button>
            </div>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Upload status */}
        {uploading && (
          <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded text-sm text-accent">
            Uploading... Please wait.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

