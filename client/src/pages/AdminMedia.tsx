import { useState } from "react";
import MediaUpload from "@/components/MediaUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, ImageIcon, Video } from "lucide-react";

/**
 * Admin Media Management Page
 * - Upload profile photo
 * - Upload post images
 * - Upload videos
 * - Manage all media files
 * 
 * INTEGRATION WITH S3:
 * The onUpload function should be connected to your S3 storage.
 * For now, it simulates upload and returns a local URL.
 */
export default function AdminMedia() {
  const [profilePhoto, setProfilePhoto] = useState<string>("/images/profile.jpg");

  // Simulate S3 upload - Replace with actual S3 integration
  const handleUpload = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In production, this would upload to S3 and return the URL
        const localUrl = URL.createObjectURL(file);
        resolve(localUrl);
      }, 2000);
    });
  };

  const handleProfileUpload = async (file: File): Promise<string> => {
    const url = await handleUpload(file);
    setProfilePhoto(url);
    
    // TODO: Save to database
    console.log("Profile photo updated:", url);
    
    return url;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Media Management</h2>
        <p className="text-muted-foreground">
          Upload and manage all your media files (photos, videos)
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="w-4 h-4 mr-2" />
            Profile Photo
          </TabsTrigger>
          <TabsTrigger value="images">
            <ImageIcon className="w-4 h-4 mr-2" />
            Post Images
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="w-4 h-4 mr-2" />
            Videos
          </TabsTrigger>
        </TabsList>

        {/* Profile Photo Tab */}
        <TabsContent value="profile" className="space-y-6">
          <MediaUpload
            type="profile"
            onUpload={handleProfileUpload}
            currentUrl={profilePhoto}
            title="Profile Photo"
            description="Upload your biography photo (displayed on About page)"
          />

          <Card>
            <CardHeader>
              <CardTitle>Where is this photo used?</CardTitle>
              <CardDescription>Your profile photo appears in these locations:</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>About page - Biography section (circular frame)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Footer - Author information</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Post author byline</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Post Images Tab */}
        <TabsContent value="images" className="space-y-6">
          <MediaUpload
            type="image"
            onUpload={handleUpload}
            title="Upload Post Image"
            description="Upload cover images for your blog posts"
          />

          <Card>
            <CardHeader>
              <CardTitle>Image Gallery</CardTitle>
              <CardDescription>All uploaded images for posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Placeholder - Replace with actual uploaded images */}
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                  No images yet
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos" className="space-y-6">
          <MediaUpload
            type="video"
            onUpload={handleUpload}
            title="Upload Video"
            description="Upload videos to your archive (hosted locally, no external tracking)"
          />

          <Card>
            <CardHeader>
              <CardTitle>Video Library</CardTitle>
              <CardDescription>All uploaded videos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Placeholder - Replace with actual uploaded videos */}
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                  No videos yet
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent/5 border-accent/20">
            <CardHeader>
              <CardTitle className="text-base">Privacy Note</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                Videos are hosted locally on your server (or S3 bucket) without any external tracking.
                When users click on a video thumbnail, it opens in a popup player anchored to your site.
                No data is sent to YouTube, Vimeo, or any third-party service.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

