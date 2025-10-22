import { Menu, Search, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

/**
 * Header - Vinicius M. Blanchard Portfolio
 * - Fixed white top bar
 * - Elegant navigation with dropdown for Library section
 * - Search functionality
 * - Fully responsive
 */
export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const libraryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Resume" },
    { href: "/posts", label: "Posts" },
    { 
      href: "/archive", 
      label: "Library",
      submenu: [
        { href: "/books", label: "Books" },
        { href: "/films", label: "Film Critic" },
        { href: "/audio", label: "Audio Archive" },
        { href: "/video", label: "Video Archive" },
      ]
    },
    { href: "/contact", label: "Contact" },
  ];

  const handleLibraryEnter = () => {
    if (libraryTimeoutRef.current) {
      clearTimeout(libraryTimeoutRef.current);
    }
    setIsLibraryOpen(true);
  };

  const handleLibraryLeave = () => {
    libraryTimeoutRef.current = setTimeout(() => {
      setIsLibraryOpen(false);
    }, 200); // 200ms delay before closing
  };

  useEffect(() => {
    return () => {
      if (libraryTimeoutRef.current) {
        clearTimeout(libraryTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Mobile menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-secondary">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[320px]">
                <nav className="flex flex-col gap-6 mt-8">
                  {navigationLinks.map((link) => (
                    <div key={link.href}>
                      <Link href={link.href}>
                        <a className="text-lg font-medium hover:text-accent transition-smooth">
                          {link.label}
                        </a>
                      </Link>
                      {link.submenu && (
                        <div className="ml-4 mt-3 flex flex-col gap-3">
                          {link.submenu.map((sublink) => (
                            <Link key={sublink.href} href={sublink.href}>
                              <a className="text-base text-muted-foreground hover:text-accent transition-smooth">
                                {sublink.label}
                              </a>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo/Name */}
          <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
            <Link href="/">
              <a className="flex items-center gap-3 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl lg:text-2xl group-hover:bg-accent group-hover:text-accent-foreground transition-smooth">
                  V
                </div>
                <span className="text-lg lg:text-2xl font-semibold tracking-tight hidden sm:block">
                  Vinicius M. Blanchard
                </span>
              </a>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {navigationLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.submenu ? (
                  <div
                    onMouseEnter={handleLibraryEnter}
                    onMouseLeave={handleLibraryLeave}
                    className="relative"
                  >
                    <button className="flex items-center gap-1 text-sm font-medium uppercase tracking-wider hover:text-accent transition-smooth py-2">
                      {link.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${isLibraryOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown menu with improved hover area */}
                    <div 
                      className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                        isLibraryOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                    >
                      <div className="w-56 bg-card border border-border rounded-lg shadow-xl py-2 overflow-hidden">
                        {link.submenu.map((sublink) => (
                          <Link key={sublink.href} href={sublink.href}>
                            <a className="block px-5 py-3 text-sm hover:bg-secondary hover:text-accent transition-all">
                              {sublink.label}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link href={link.href}>
                    <a className="text-sm font-medium uppercase tracking-wider hover:text-accent transition-smooth">
                      {link.label}
                    </a>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Search icon */}
          <div className="flex items-center gap-2">
            {isSearchOpen ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-32 sm:w-48 px-3 py-1.5 text-sm border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  autoFocus
                  onBlur={() => {
                    if (!searchQuery) setIsSearchOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }
                    if (e.key === "Enter" && searchQuery) {
                      // Implement search functionality here
                      console.log("Searching for:", searchQuery);
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="hover:bg-secondary"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="hover:bg-secondary"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

