import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";

/**
 * Contact Page
 * - Simple form (nome, email, mensagem)
 * - Social media icons (Substack, Twitter, Instagram)
 * 
 * INTEGRAÇÃO COM SERVIÇO DE EMAIL:
 * 
 * OPÇÃO A - Formspree (Recomendado para sites estáticos):
 * 1. Crie uma conta em https://formspree.io
 * 2. Crie um novo formulário e copie o endpoint
 * 3. Substitua {FORMSPREE_ENDPOINT} abaixo pelo seu endpoint
 * 4. Exemplo: action="https://formspree.io/f/xyzabc123"
 * 
 * OPÇÃO B - EmailJS:
 * 1. Crie uma conta em https://www.emailjs.com
 * 2. Configure seu serviço de email e template
 * 3. Instale: npm install @emailjs/browser
 * 4. Use emailjs.send() no handleSubmit
 * 
 * OPÇÃO C - API própria:
 * 1. Crie um endpoint backend (Node.js + Nodemailer, por exemplo)
 * 2. Faça POST para seu endpoint no handleSubmit
 * 
 * {replace with your content} - Substitua os links de redes sociais pelos seus
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // INTEGRAÇÃO: Substitua pela sua implementação
      // Exemplo com Formspree:
      /*
      const response = await fetch('https://formspree.io/f/{FORMSPREE_ENDPOINT}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
      */

      // Simulação para demonstração (remova em produção)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form data:", formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: "Substack",
      url: "https://substack.com/@yourprofile", // {replace with your content}
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourprofile", // {replace with your content}
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://instagram.com/yourprofile", // {replace with your content}
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  return (
    <Layout>
      <div className="py-12 lg:py-16">
        <div className="container max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-serif font-semibold mb-4">
              Contact
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Entre em contato ou conecte-se nas redes sociais
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulário */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Mail className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-serif font-semibold">Envie uma mensagem</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                    placeholder="Seu nome"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                    placeholder="seu@email.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-input rounded bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
                    placeholder="Sua mensagem..."
                  />
                </div>

                {/* Status de envio */}
                {submitStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded text-green-800 text-sm">
                    ✓ Message enviada com sucesso! Responderei em breve.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                    ✗ Erro ao enviar mensagem. Por favor, tente novamente.
                  </div>
                )}

                {/* Botão de envio */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                  size="lg"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send mensagem
                    </>
                  )}
                </Button>
              </form>

              {/* Nota sobre integração */}
              <div className="mt-6 p-4 bg-muted rounded text-sm text-muted-foreground">
                <strong>Nota:</strong> Para ativar o envio de emails, configure um serviço como{" "}
                <a
                  href="https://formspree.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Formspree
                </a>{" "}
                ou{" "}
                <a
                  href="https://www.emailjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  EmailJS
                </a>
                . Veja instruções no código-fonte.
              </div>
            </section>

            {/* Redes sociais */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Send className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-serif font-semibold">Conecte-se</h2>
              </div>

              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Acompanhe meus artigos e reflexões nas redes sociais. Publico regularmente 
                  análises sobre direito, política e temas contemporâneos.
                </p>

                <div className="space-y-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-card border border-border rounded hover:shadow-lg hover:border-accent transition-smooth group"
                    >
                      <div className="text-accent group-hover:scale-110 transition-smooth">
                        {social.icon}
                      </div>
                      <div>
                        <div className="font-semibold group-hover:text-accent transition-smooth">
                          {social.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {social.url.replace("https://", "")}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Informações adicionais */}
                <div className="mt-8 p-6 bg-card border border-border rounded-lg">
                  <h3 className="font-semibold mb-3">Outras formas de contato</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      {/* {replace with your content} */}
                      <strong>Email:</strong> contato@vijicius.com
                    </p>
                    <p>
                      <strong>Tempo de resposta:</strong> Geralmente respondo em até 48 horas
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

