import { Link } from "wouter";

/**
 * Footer minimalista
 * - Design limpo e espaçado
 * - Links de navegação rápida
 * - Copyright e informações básicas
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: "/about", label: "About" },
    { href: "/posts", label: "Posts" },
    { href: "/archive", label: "Archive" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Coluna 1: Logo e descrição */}
          <div className="space-y-4">
            <Link href="/">
              <a className="inline-flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-lg group-hover:bg-accent group-hover:text-accent-foreground transition-smooth">
                  V
                </div>
                <span className="font-serif text-xl font-semibold">Vijicius</span>
              </a>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Law student & politics enthusiast
            </p>
          </div>

          {/* Coluna 2: Links de navegação */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Navegação</h3>
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

          {/* Coluna 3: Informações adicionais */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contato</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <p>{/* {replace with your content} - Email ou outras informações */}</p>
              <p className="text-xs">
                © {currentYear} Vijicius. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

