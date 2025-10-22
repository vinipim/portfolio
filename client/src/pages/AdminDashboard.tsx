import { useState } from "react";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut,
  User,
  BookOpen,
  Film,
  Music,
  Video
} from "lucide-react";
import { Link } from "wouter";

/**
 * Admin Dashboard
 * - Central hub for managing the portfolio
 * - Access to all admin features
 */
function AdminDashboardContent() {
  const { admin, logout } = useAdminAuth();
  const [activeSection, setActiveSection] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "posts", label: "Posts", icon: FileText },
    { id: "books", label: "Books", icon: BookOpen },
    { id: "films", label: "Film Critic", icon: Film },
    { id: "audio", label: "Audio Archive", icon: Music },
    { id: "video", label: "Video Archive", icon: Video },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-xl">
              V
            </div>
            <div>
              <h2 className="font-serif font-semibold">Admin Panel</h2>
              <p className="text-xs text-muted-foreground">Vinicius M. Blanchard</p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
                    activeSection === item.id
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-secondary"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{admin?.name || "Admin"}</p>
              <p className="text-xs text-muted-foreground truncate">{admin?.email}</p>
            </div>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            className="w-full"
            size="sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">
              {menuItems.find(item => item.id === activeSection)?.label}
            </h1>
            <p className="text-muted-foreground">
              Manage your portfolio content and settings
            </p>
          </div>

          {/* Content based on active section */}
          {activeSection === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <FileText className="h-8 w-8 text-accent" />
                  <span className="text-2xl font-bold">0</span>
                </div>
                <h3 className="font-semibold mb-1">Total Posts</h3>
                <p className="text-sm text-muted-foreground">Published articles</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="h-8 w-8 text-accent" />
                  <span className="text-2xl font-bold">0</span>
                </div>
                <h3 className="font-semibold mb-1">Books</h3>
                <p className="text-sm text-muted-foreground">Book reviews</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Film className="h-8 w-8 text-accent" />
                  <span className="text-2xl font-bold">0</span>
                </div>
                <h3 className="font-semibold mb-1">Film Critics</h3>
                <p className="text-sm text-muted-foreground">Movie reviews</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Music className="h-8 w-8 text-accent" />
                  <span className="text-2xl font-bold">0</span>
                </div>
                <h3 className="font-semibold mb-1">Audio Files</h3>
                <p className="text-sm text-muted-foreground">Audio archive</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Video className="h-8 w-8 text-accent" />
                  <span className="text-2xl font-bold">0</span>
                </div>
                <h3 className="font-semibold mb-1">Video Files</h3>
                <p className="text-sm text-muted-foreground">Video archive</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Settings className="h-8 w-8 text-accent" />
                  <span className="text-2xl font-bold">✓</span>
                </div>
                <h3 className="font-semibold mb-1">Settings</h3>
                <p className="text-sm text-muted-foreground">Configure your site</p>
              </div>
            </div>
          )}

          {activeSection === "posts" && (
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Posts Management</h3>
                <p className="text-muted-foreground mb-6">
                  Create, edit, and manage your blog posts
                </p>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Create New Post
                </Button>
              </div>
            </div>
          )}

          {activeSection === "settings" && (
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={admin?.email || ""}
                    disabled
                    className="w-full px-4 py-2 border border-input rounded bg-muted"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Contact support to change your email
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={admin?.name || ""}
                    disabled
                    className="w-full px-4 py-2 border border-input rounded bg-muted"
                  />
                </div>

                <div className="pt-4 border-t border-border">
                  <Button variant="outline">
                    Change Password
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other sections */}
          {!["overview", "posts", "settings"].includes(activeSection) && (
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  {menuItems.find(item => item.id === activeSection)?.icon && (
                    <div className="text-accent">
                      {(() => {
                        const Icon = menuItems.find(item => item.id === activeSection)!.icon;
                        return <Icon className="h-8 w-8" />;
                      })()}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {menuItems.find(item => item.id === activeSection)?.label}
                </h3>
                <p className="text-muted-foreground mb-6">
                  This section is under development
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminProtectedRoute>
      <AdminDashboardContent />
    </AdminProtectedRoute>
  );
}

