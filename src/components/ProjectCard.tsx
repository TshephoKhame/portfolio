import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  impact?: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  techStack,
  githubUrl,
  liveUrl,
  impact,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [codeRevealProgress, setCodeRevealProgress] = useState(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setCodeRevealProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 50);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCodeRevealProgress(0);
  };

  const codeSnippet = `const project = {
  name: "${title}",
  stack: [${techStack.slice(0, 3).map(t => `"${t}"`).join(', ')}],
  impact: "${impact || 'Cutting-edge solution'}",
  status: "✓ Production Ready"
};`;

  return (
    <article
      className="group relative bg-card rounded-xl overflow-hidden border border-primary/10 transition-all duration-500 hover:border-cyan-accent hover:-translate-y-2 glow-accent-hover"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-accent to-purple-accent transition-all duration-500"
        style={{
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
        }}
      />

      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-neutral-800">
        <img
          src={image}
          alt={`${title} screenshot`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Code block overlay */}
        <div
          className={`absolute inset-0 bg-neutral-900/95 backdrop-blur-sm transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="h-full flex flex-col p-6">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-error" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="ml-2 text-xs font-code text-neutral-600">
                project-config.ts
              </span>
            </div>

            {/* Code with typing effect */}
            <pre className="font-code text-xs text-neutral-400 flex-1">
              <code>
                {codeSnippet.split('').map((char, index) => (
                  <span
                    key={index}
                    className={`${
                      index < (codeSnippet.length * codeRevealProgress) / 100
                        ? 'opacity-100'
                        : 'opacity-0'
                    } transition-opacity duration-50`}
                    style={{
                      color:
                        char === '"'
                          ? 'hsl(var(--color-success))'
                          : char === ':'
                          ? 'hsl(var(--color-primary-accent))'
                          : char === '{'|| char === '}'
                          ? 'hsl(var(--color-secondary-accent))'
                          : undefined,
                    }}
                  >
                    {char}
                  </span>
                ))}
                {codeRevealProgress < 100 && (
                  <span className="inline-block w-2 h-4 bg-cyan-accent animate-pulse ml-0.5" />
                )}
              </code>
            </pre>

            {/* Links appear after code is done */}
            {codeRevealProgress >= 100 && (
              <div className="flex gap-3 mt-4 animate-fade-in-up">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-accent text-cyan-accent hover:bg-cyan-accent/10 transition-colors duration-300"
                  >
                    <Github size={16} />
                    <span className="text-sm font-code">Code</span>
                  </a>
                )}
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-accent text-neutral-900 hover:bg-cyan-accent/90 transition-colors duration-300"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm font-code">Live</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-h3 text-neutral-200 mb-2 font-heading">{title}</h3>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-code rounded-full bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20 hover:bg-cyan-accent/20 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
