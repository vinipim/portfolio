import { useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon, Film, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface MediaUploadV2Props {
  type: "image" | "video" | "document";
  onUpload: (url: string) => void;
  currentUrl?: string;
  title?: string;
  description?: string;
  maxSize?: number; // in MB
}

export default function MediaUploadV2({
  type,
  onUpload,
  currentUrl,
  title,
  description,
  maxSize = 100,
}: MediaUploadV2Props) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [dragActive, setDragActive] = useState(false);

  const uploadMutation = trpc.upload.uploadFile.useMutation();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        await handleFile(files[0]);
      }
    },
    []
  );

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      await handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Validate file type
    const validTypes = {
      image: ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"],
      video: ["video/mp4", "video/webm", "video/mov", "video/quicktime"],
      document: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    };

    if (!validTypes[type].includes(file.type)) {
      toast.error(`Invalid file type. Please upload a ${type}.`);
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }

    setUploading(true);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(",")[1]; // Remove data:image/jpeg;base64, prefix

        try {
          const result = await uploadMutation.mutateAsync({
            filename: file.name,
            contentType: file.type,
            data: base64Data,
            fileType: type,
          });

          setPreview(result.url);
          onUpload(result.url);
          toast.success("File uploaded successfully!");
        } catch (error: any) {
          console.error("Upload error:", error);
          toast.error(error.message || "Failed to upload file");
        } finally {
          setUploading(false);
        }
      };

      reader.onerror = () => {
        toast.error("Failed to read file");
        setUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("File processing error:", error);
      toast.error("Failed to process file");
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUpload("");
  };

  const getIcon = () => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-12 h-12 text-muted-foreground" />;
      case "video":
        return <Film className="w-12 h-12 text-muted-foreground" />;
      case "document":
        return <FileText className="w-12 h-12 text-muted-foreground" />;
    }
  };

  const getAccept = () => {
    switch (type) {
      case "image":
        return "image/*";
      case "video":
        return "video/*";
      case "document":
        return ".pdf,.doc,.docx";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title || `Upload ${type}`}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {preview ? (
          <div className="relative">
            {type === "image" && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
            {type === "video" && (
              <video
                src={preview}
                controls
                className="w-full h-64 rounded-lg"
              />
            )}
            {type === "document" && (
              <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
                <FileText className="w-16 h-16 text-muted-foreground" />
              </div>
            )}
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleRemove}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id={`file-upload-${type}`}
              className="hidden"
              accept={getAccept()}
              onChange={handleChange}
              disabled={uploading}
            />
            <label
              htmlFor={`file-upload-${type}`}
              className="cursor-pointer flex flex-col items-center gap-4"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                  <p className="text-sm text-muted-foreground">Uploading...</p>
                </>
              ) : (
                <>
                  {getIcon()}
                  <div>
                    <p className="text-sm font-medium">
                      Drop your {type} here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Max size: {maxSize}MB
                    </p>
                  </div>
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </>
              )}
            </label>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

