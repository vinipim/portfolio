import { Menu, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

/**
 * Header inspirado no design do Vaticano
 * - Barra superior branca fixa
 * - Nome "Vijicius" centralizado
 * - Brasão/monograma central
 * - Ícones de busca e menu sanduíche
 * - Responsivo: recolhe-se em telas menores
 */
export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/posts", label: "Posts" },
    { href: "/archive", label: "Archive" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Menu sanduíche - Mobile */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-secondary">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[320px]">
                <nav className="flex flex-col gap-6 mt-8">
                  {navigationLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <a className="text-lg font-medium hover:text-accent transition-smooth">
                        {link.label}
                      </a>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo/Nome - Desktop: à esquerda, Mobile: centralizado */}
          <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
            <Link href="/">
              <a className="flex items-center gap-3 group">
                {/* Brasão/Monograma - {replace with your content} */}
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-xl lg:text-2xl group-hover:bg-accent group-hover:text-accent-foreground transition-smooth">
                  V
                </div>
                <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-tight">
                  Vijicius
                </span>
              </a>
            </Link>
          </div>

          {/* Navegação - Desktop */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className="text-sm font-medium uppercase tracking-wider hover:text-accent transition-smooth">
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Ícone de busca */}
          <div className="flex items-center gap-2">
            {isSearchOpen ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Buscar..."
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
                  <span className="text-sm">✕</span>
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
                <span className="sr-only">Buscar</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

