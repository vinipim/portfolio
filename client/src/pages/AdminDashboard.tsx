import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Film, 
  BookOpen, 
  Music, 
  Settings, 
  Upload, 
  Eye,
  LogOut,
  Plus
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    // Clear admin session
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLocation("/admin");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <span className="text-sm text-muted-foreground">Vinicius M. Blanchard</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Site
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8 px-6 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Sample posts available</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reviews</CardTitle>
                  <Film className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Start adding reviews</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Videos</CardTitle>
                  <Film className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Upload your first video</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Media Files</CardTitle>
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">Art images uploaded</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab("posts")}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab("reviews")}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Review
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab("videos")}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Video
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab("media")}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Media
                </Button>
              </CardContent>
            </Card>

            {/* System Info */}
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
                <CardDescription>Current site configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Site Title:</span>
                  <span className="font-medium">Blanchard, V.</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Admin Email:</span>
                  <span className="font-medium">danielblanchard@keemail.me</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Copyright:</span>
                  <span className="font-medium">© {new Date().getFullYear()} VMB. All rights reserved.</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium text-green-600">● Online</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Posts</h2>
                <p className="text-muted-foreground">Manage your blog posts and articles</p>
              </div>
              <Button className="bg-[#C9A961] hover:bg-[#B8984F]">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Post Management</h3>
                  <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                    Create, edit, and publish posts. All changes are reflected immediately on the site.
                  </p>
                  <Button className="bg-[#C9A961] hover:bg-[#B8984F]">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Reviews</h2>
                <p className="text-muted-foreground">Manage your film, book, and album reviews</p>
              </div>
              <Button className="bg-[#C9A961] hover:bg-[#B8984F]">
                <Plus className="w-4 h-4 mr-2" />
                New Review
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Film className="w-5 h-5" />
                    Films
                  </CardTitle>
                  <CardDescription>Movie reviews and ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-4">0</p>
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Film Review
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Books
                  </CardTitle>
                  <CardDescription>Book reviews and notes</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-4">0</p>
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Book Review
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Music className="w-5 h-5" />
                    Albums
                  </CardTitle>
                  <CardDescription>Music reviews and ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-4">0</p>
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Album Review
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Videos</h2>
                <p className="text-muted-foreground">Upload and manage your video content (hosted locally)</p>
              </div>
              <Button className="bg-[#C9A961] hover:bg-[#B8984F]">
                <Upload className="w-4 h-4 mr-2" />
                Upload Video
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="border-2 border-dashed rounded-lg p-12 text-center">
                  <Film className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No videos uploaded</h3>
                  <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                    Upload videos to display in your archive. Videos are hosted locally for maximum privacy.
                    Supported formats: MP4, WebM, MOV
                  </p>
                  <Button className="bg-[#C9A961] hover:bg-[#B8984F]">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Your First Video
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Media Library</h2>
                <p className="text-muted-foreground">Manage images and files</p>
              </div>
              <Button className="bg-[#C9A961] hover:bg-[#B8984F]">
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Current Media</CardTitle>
                <CardDescription>Classical art images and assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">friedrich-wanderer.jpg</span>
                  </div>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">stuck-die-suende.jpg</span>
                  </div>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">pantheon-rome.jpg</span>
                  </div>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Settings</h2>
              <p className="text-muted-foreground">Configure your site settings</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Site Information</CardTitle>
                <CardDescription>Basic information displayed on your site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Site Title (Browser Tab)</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                    defaultValue="Blanchard, V."
                    disabled
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Change this in the Manus website settings GUI
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Tagline</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                    defaultValue="Politics enthusiast"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Copyright Text</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                    defaultValue={`© ${new Date().getFullYear()} VMB. All rights reserved.`}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Automatically updates with current year
                  </p>
                </div>
                <Button className="bg-[#C9A961] hover:bg-[#B8984F]">Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Admin Account</CardTitle>
                <CardDescription>Manage your admin credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input 
                    type="email" 
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                    defaultValue="danielblanchard@keemail.me"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">New Password</label>
                  <input 
                    type="password" 
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                    placeholder="Leave blank to keep current password"
                  />
                </div>
                <Button className="bg-[#C9A961] hover:bg-[#B8984F]">Update Account</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

