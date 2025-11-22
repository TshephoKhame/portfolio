import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface Commit {
  id: string;
  label: string;
  progress: number;
}

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const commits: Commit[] = [
    { id: 'hero', label: 'Hero', progress: 0 },
    { id: 'about', label: 'About', progress: 20 },
    { id: 'skills', label: 'Skills', progress: 40 },
    { id: 'projects', label: 'Projects', progress: 70 },
    { id: 'contact', label: 'Contact', progress: 90 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="glass rounded-full p-3 border border-primary/20">
        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-neutral-800" />
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 bg-cyan-accent transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress}%` }}
          >
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-accent glow-accent" />
          </div>

          {/* Commits */}
          <div className="relative space-y-8 py-2">
            {commits.map((commit) => {
              const isCompleted = scrollProgress >= commit.progress;
              return (
                <div key={commit.id} className="relative group">
                  <button
                    onClick={() => {
                      document.getElementById(commit.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="relative flex items-center justify-center w-8 h-8"
                  >
                    <div
                      className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                        isCompleted
                          ? 'bg-cyan-accent border-cyan-accent scale-110'
                          : 'bg-neutral-800 border-neutral-600'
                      }`}
                    >
                      {isCompleted && (
                        <Check size={8} className="text-neutral-900 absolute inset-0 m-auto" />
                      )}
                    </div>
                  </button>

                  {/* Tooltip */}
                  <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="glass px-3 py-2 rounded-lg whitespace-nowrap border border-cyan-accent/30">
                      <div className="flex items-center gap-2">
                        {isCompleted && (
                          <Check size={12} className="text-success" />
                        )}
                        <span className="text-xs font-code text-neutral-200">
                          {isCompleted ? '✓ Viewed: ' : ''}{commit.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Complete message */}
      {scrollProgress >= 95 && (
        <div className="mt-4 glass rounded-lg p-3 border border-success/30 animate-fade-in-up">
          <p className="text-xs font-code text-success text-center">
            ✓ All commits reviewed!
          </p>
          <p className="text-xs font-code text-neutral-400 text-center mt-1">
            Ready to push?
          </p>
        </div>
      )}
    </div>
  );
};

export default ScrollProgress;
