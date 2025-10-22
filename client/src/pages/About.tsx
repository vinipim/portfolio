import Layout from "../components/Layout";
import { GraduationCap, Briefcase, Heart } from "lucide-react";

/**
 * About Page
 * - Two columns: portrait and biography/CV
 * - Timeline of education, research and activism
 * - Minimalist and professional design
 * 
 * {replace with your content} - Replace sample data with your real information
 */
export default function About() {
  const education = [
    {
      year: "2023 - Present",
      title: "Bachelor of Law",
      institution: "Federal University",
      description: "Focused on Constitutional Law and Political Science",
    },
    {
      year: "2021 - 2023",
      title: "Preparatory Course",
      institution: "Institute of Political Studies",
      description: "Complementary training in political analysis and international relations",
    },
  ];

  const research = [
    {
      year: "2024",
      title: "Democracy and Institutions",
      description: "Research on strengthening democratic institutions in contemporary Brazil",
    },
    {
      year: "2023",
      title: "Fundamental Rights",
      description: "Comparative study on the protection of fundamental rights in different legal systems",
    },
  ];

  const activism = [
    {
      year: "2024 - Present",
      title: "Human Rights NGO Volunteer",
      description: "Working on legal education and citizenship projects",
    },
    {
      year: "2023 - 2024",
      title: "Political Studies Group Member",
      description: "Organization of debates and seminars on contemporary political issues",
    },
  ];

  return (
    <Layout>
      <div className="py-12 lg:py-16">
        <div className="container max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-semibold mb-4">
              About Me
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Politics enthusiast focused on democratic institutions and social transformation
            </p>
          </div>

          {/* Two columns: Photo and Biography */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            {/* Column 1: Photo */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                {/* Portrait in circular frame - {replace with your content} */}
                <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-accent shadow-lg">
                  <img
                    src="/images/profile.jpg" // {replace with your content}
                    alt="Vinicius"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback when no image is available
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/256x256/1a1a1a/C9A961?text=V";
                    }}
                  />
                </div>
                
                <div className="mt-8 text-center">
                  <h2 className="text-2xl font-semibold mb-2">Vinicius M. Blanchard</h2>
                  <p className="text-muted-foreground">Politics enthusiast</p>
                </div>
              </div>
            </div>

            {/* Column 2: Biography */}
            <div className="lg:col-span-2 space-y-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold mb-4">Biography</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {/* {replace with your content} */}
                  I am a politics enthusiast with a deep interest in democratic institutions 
                  and public policy. My work focuses on understanding the complex relationships 
                  between law, politics, and society in contemporary contexts.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Throughout my academic journey, I have dedicated myself to studying the 
                  intersections between constitutional law, political science, and human rights. 
                  I believe that a deep understanding of these fields is essential for building 
                  a more just and democratic society.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This space is dedicated to sharing reflections, analyses, and studies on 
                  topics that shape our political reality, with the aim of contributing to 
                  informed debate and inspiring other students and politics enthusiasts.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline sections */}
          <div className="space-y-16">
            {/* Education */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="w-8 h-8 text-accent" />
                <h2 className="text-3xl font-semibold">Education</h2>
              </div>
              <div className="space-y-6">
                {education.map((item, index) => (
                  <div 
                    key={index} 
                    className="border-l-2 border-accent pl-6 pb-6 relative hover:border-accent/70 transition-colors"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent" />
                    <div className="text-sm text-accent font-medium mb-1">{item.year}</div>
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <div className="text-muted-foreground mb-2">{item.institution}</div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Research */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="w-8 h-8 text-accent" />
                <h2 className="text-3xl font-semibold">Research</h2>
              </div>
              <div className="space-y-6">
                {research.map((item, index) => (
                  <div 
                    key={index} 
                    className="border-l-2 border-accent pl-6 pb-6 relative hover:border-accent/70 transition-colors"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent" />
                    <div className="text-sm text-accent font-medium mb-1">{item.year}</div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Activism */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Heart className="w-8 h-8 text-accent" />
                <h2 className="text-3xl font-semibold">Activism & Engagement</h2>
              </div>
              <div className="space-y-6">
                {activism.map((item, index) => (
                  <div 
                    key={index} 
                    className="border-l-2 border-accent pl-6 pb-6 relative hover:border-accent/70 transition-colors"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent" />
                    <div className="text-sm text-accent font-medium mb-1">{item.year}</div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

