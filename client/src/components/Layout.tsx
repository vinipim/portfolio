import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout principal do site
 * - Header fixo no topo
 * - Footer no rodapé
 * - Conteúdo principal centralizado
 * - Espaçamento para compensar header fixo
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Espaçamento para compensar header fixo (h-20 lg:h-24) */}
      <main className="flex-1 pt-20 lg:pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}

