import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import CommandPalette from '@/components/CommandPalette';
import ScrollProgress from '@/components/ScrollProgress';
import ProjectCard from '@/components/ProjectCard';
import { Github, Linkedin, Mail, Twitter, Send, Download, Code2, Palette, Rocket, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import heroImage from '@/assets/hero-bg.jpg';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';

const Index = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const skills = [
    { name: 'React', icon: Code2, color: 'cyan-accent' },
    { name: 'TypeScript', icon: Code2, color: 'cyan-accent' },
    { name: 'Node.js', icon: Database, color: 'success' },
    { name: 'Tailwind CSS', icon: Palette, color: 'purple-accent' },
    { name: 'Next.js', icon: Rocket, color: 'cyan-accent' },
    { name: 'PostgreSQL', icon: Database, color: 'success' },
    { name: 'GraphQL', icon: Code2, color: 'purple-accent' },
    { name: 'Docker', icon: Rocket, color: 'cyan-accent' },
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory management, payment processing, and analytics dashboard.',
      image: project1,
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      impact: '50% increase in conversion rate',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      title: 'AI Analytics Dashboard',
      description: 'Machine learning-powered analytics platform with predictive insights and real-time data visualization.',
      image: project2,
      techStack: ['Next.js', 'Python', 'TensorFlow', 'D3.js'],
      impact: 'Processing 1M+ data points daily',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates, team chat, and advanced workflow automation.',
      image: project3,
      techStack: ['TypeScript', 'React', 'Firebase', 'WebSockets'],
      impact: '10K+ active users',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! I\'ll get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)} />
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
      <ScrollProgress />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/80 to-neutral-900" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <div className="inline-block px-4 py-2 rounded-full border border-success/30 bg-success/10 mb-4">
              <span className="text-success text-sm font-code flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </span>
                Available for new opportunities
              </span>
            </div>

            <h1 className="text-hero text-gradient font-heading">
              Full-Stack Developer
            </h1>

            <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Crafting exceptional digital experiences with modern web technologies. 
              Specialized in building scalable applications that users love.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <Button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-cyan-accent text-neutral-900 hover:bg-cyan-accent/90 px-8 py-6 text-lg font-semibold rounded-lg glow-accent transition-all duration-300 hover:-translate-y-1"
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-cyan-accent text-cyan-accent hover:bg-cyan-accent/10 px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 hover:-translate-y-1"
              >
                Get In Touch
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 pt-8">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-cyan-accent transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-cyan-accent transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-cyan-accent transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="mailto:hello@example.com"
                className="text-neutral-400 hover:text-cyan-accent transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>

            <div className="pt-12">
              <p className="text-xs text-neutral-600 font-code mb-2">Press / for quick navigation</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-h1 text-neutral-200 mb-6 font-heading">
              <span className="text-cyan-accent">&lt;</span>
              About Me
              <span className="text-cyan-accent">/&gt;</span>
            </h2>
            <div className="space-y-4 text-neutral-400 leading-relaxed">
              <p>
                I'm a passionate full-stack developer with a keen eye for creating seamless user experiences 
                and robust backend systems. With over 5 years of experience in web development, I've worked 
                on everything from small startups to enterprise-level applications.
              </p>
              <p>
                My journey in tech started with a curiosity about how things work under the hood. Today, 
                I specialize in React, Node.js, and modern web technologies, always staying up-to-date 
                with the latest industry trends and best practices.
              </p>
              <p>
                When I'm not coding, you'll find me contributing to open-source projects, writing technical 
                articles, or exploring new technologies to add to my toolkit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative">
        <div className="container-custom">
          <h2 className="text-h1 text-neutral-200 mb-12 font-heading text-center">
            <span className="text-cyan-accent">&lt;</span>
            Skills & Technologies
            <span className="text-cyan-accent">/&gt;</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.name}
                  className="glass rounded-xl p-6 hover:border-cyan-accent/30 transition-all duration-300 hover:-translate-y-2 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`text-${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={32} />
                    </div>
                    <span className="text-neutral-200 font-code text-sm">{skill.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative">
        <div className="container-custom">
          <h2 className="text-h1 text-neutral-200 mb-12 font-heading text-center">
            <span className="text-cyan-accent">&lt;</span>
            Featured Projects
            <span className="text-cyan-accent">/&gt;</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-h1 text-neutral-200 mb-6 font-heading text-center">
              <span className="text-cyan-accent">&lt;</span>
              Get In Touch
              <span className="text-cyan-accent">/&gt;</span>
            </h2>
            <p className="text-neutral-400 text-center mb-12">
              Have a project in mind? Let's build something amazing together.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="glass rounded-lg p-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-code text-neutral-400 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    required
                    className="bg-neutral-800 border-neutral-700 focus:border-cyan-accent text-neutral-200"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-code text-neutral-400 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="bg-neutral-800 border-neutral-700 focus:border-cyan-accent text-neutral-200"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-code text-neutral-400 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    className="bg-neutral-800 border-neutral-700 focus:border-cyan-accent text-neutral-200 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-cyan-accent text-neutral-900 hover:bg-cyan-accent/90 py-6 text-lg font-semibold rounded-lg glow-accent transition-all duration-300"
                >
                  <Send size={20} className="mr-2" />
                  Send Message
                </Button>
              </div>
            </form>

            <div className="mt-12 text-center">
              <Button
                variant="outline"
                className="border-2 border-cyan-accent text-cyan-accent hover:bg-cyan-accent/10"
              >
                <Download size={20} className="mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-8">
        <div className="container-custom">
          <div className="text-center text-neutral-600 text-sm font-code">
            <p>© 2024 Developer Portfolio. Built with React + TypeScript + Tailwind CSS</p>
            <p className="mt-2">Press <span className="text-cyan-accent">/</span> to open command palette</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
