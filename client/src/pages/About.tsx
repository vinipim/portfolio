import Layout from "@/components/Layout";
import { GraduationCap, Briefcase, Heart } from "lucide-react";

/**
 * About Page
 * - Duas colunas: retrato e biografia/CV
 * - Timeline de formação, pesquisa e ativismo
 * - Design minimalista e profissional
 * 
 * {replace with your content} - Substitua os dados de exemplo pelos seus dados reais
 */
export default function About() {
  const education = [
    {
      year: "2023 - Presente",
      title: "Bacharelado em Direito",
      institution: "Universidade Federal",
      description: "Focado em Direito Constitucional e Ciência Política",
    },
    {
      year: "2021 - 2023",
      title: "Curso Preparatório",
      institution: "Instituto de Estudos Políticos",
      description: "Formação complementar em análise política e relações internacionais",
    },
  ];

  const research = [
    {
      year: "2024",
      title: "Democracia e Instituições",
      description: "Pesquisa sobre o fortalecimento das instituições democráticas no Brasil contemporâneo",
    },
    {
      year: "2023",
      title: "Direitos Fundamentais",
      description: "Estudo comparativo sobre a proteção de direitos fundamentais em diferentes sistemas jurídicos",
    },
  ];

  const activism = [
    {
      year: "2024 - Presente",
      title: "Voluntário em ONG de Direitos Humanos",
      description: "Atuação em projetos de educação jurídica e cidadania",
    },
    {
      year: "2023 - 2024",
      title: "Membro do Grupo de Estudos Políticos",
      description: "Organização de debates e seminários sobre temas políticos contemporâneos",
    },
  ];

  return (
    <Layout>
      <div className="py-12 lg:py-16">
        <div className="container max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-serif font-semibold mb-4">
              Sobre Mim
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estudante de Direito apaixonado por política e transformação social
            </p>
          </div>

          {/* Duas colunas: Foto e Biografia */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            {/* Coluna 1: Foto */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                {/* Retrato em moldura circular - {replace with your content} */}
                <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-accent shadow-lg">
                  <img
                    src="/images/profile.jpg" // {replace with your content}
                    alt="Vijicius"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback para quando não houver imagem
                      (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Crect fill='%23e5e7eb' width='256' height='256'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='96' fill='%236b7280'%3EV%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Coluna 2: Biografia */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-semibold mb-4">Biografia</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    {/* {replace with your content} */}
                    Sou estudante de Direito com profundo interesse em política, instituições democráticas 
                    e transformação social. Minha jornada acadêmica é guiada pela convicção de que o 
                    conhecimento jurídico e político deve servir como ferramenta para a construção de 
                    uma sociedade mais justa e equitativa.
                  </p>
                  <p>
                    Ao longo da minha formação, tenho me dedicado ao estudo das interseções entre direito 
                    constitucional, ciência política e direitos humanos. Acredito que a compreensão profunda 
                    dessas áreas é essencial para qualquer pessoa que deseje contribuir significativamente 
                    para o debate público e para o fortalecimento das instituições democráticas.
                  </p>
                  <p>
                    Este espaço é dedicado a compartilhar reflexões, análises e estudos sobre temas que 
                    considero fundamentais para o desenvolvimento político e social do nosso país. Espero 
                    que os conteúdos aqui publicados possam contribuir para o debate público e inspirar 
                    outros estudantes e entusiastas da política.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline: Formação */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="h-6 w-6 text-accent" />
              <h2 className="text-3xl font-serif font-semibold">Formação</h2>
            </div>
            <div className="space-y-6">
              {education.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-8 pb-6 border-l-2 border-accent last:border-l-0 last:pb-0"
                >
                  <div className="absolute left-0 top-0 w-4 h-4 -ml-[9px] rounded-full bg-accent border-4 border-background" />
                  <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-smooth">
                    <div className="text-sm text-accent font-semibold mb-2">{item.year}</div>
                    <h3 className="text-xl font-serif font-semibold mb-1">{item.title}</h3>
                    <div className="text-muted-foreground mb-2">{item.institution}</div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline: Pesquisa */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="h-6 w-6 text-accent" />
              <h2 className="text-3xl font-serif font-semibold">Pesquisa</h2>
            </div>
            <div className="space-y-6">
              {research.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-8 pb-6 border-l-2 border-accent last:border-l-0 last:pb-0"
                >
                  <div className="absolute left-0 top-0 w-4 h-4 -ml-[9px] rounded-full bg-accent border-4 border-background" />
                  <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-smooth">
                    <div className="text-sm text-accent font-semibold mb-2">{item.year}</div>
                    <h3 className="text-xl font-serif font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline: Ativismo */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Heart className="h-6 w-6 text-accent" />
              <h2 className="text-3xl font-serif font-semibold">Ativismo</h2>
            </div>
            <div className="space-y-6">
              {activism.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-8 pb-6 border-l-2 border-accent last:border-l-0 last:pb-0"
                >
                  <div className="absolute left-0 top-0 w-4 h-4 -ml-[9px] rounded-full bg-accent border-4 border-background" />
                  <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-smooth">
                    <div className="text-sm text-accent font-semibold mb-2">{item.year}</div>
                    <h3 className="text-xl font-serif font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

