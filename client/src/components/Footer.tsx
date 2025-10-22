import { Link } from "wouter";

/**
 * Footer - Vinicius M. Blanchard Portfolio
 * - Clean and spacious design
 * - Quick navigation links
 * - Copyright and basic information
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: "/about", label: "Resume" },
    { href: "/posts", label: "Posts" },
    { href: "/books", label: "Books" },
    { href: "/films", label: "Film Critic" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Column 1: Logo and description */}
          <div className="space-y-4">
            <Link href="/">
              <a className="inline-flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-lg group-hover:bg-accent group-hover:text-accent-foreground transition-smooth">
                  V
                </div>
                <span className="font-serif text-xl font-semibold">Vinicius M. Blanchard</span>
              </a>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Law student & politics enthusiast
            </p>
          </div>

          {/* Column 2: Navigation links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Navigation</h3>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a className="text-sm text-muted-foreground hover:text-accent transition-smooth">
                    {link.label}
                  </a>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Additional information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <p className="text-xs">
                © {currentYear} Vinicius M. Blanchard. All rights reserved.
              </p>
              <p className="text-xs opacity-70">
                Privacy-focused • Secure • Independent
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

