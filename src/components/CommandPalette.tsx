import { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, User, Code, Briefcase, Mail } from 'lucide-react';

interface Command {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    {
      id: 'about',
      label: 'goto about',
      icon: <User size={16} />,
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'skills',
      label: 'view skills',
      icon: <Code size={16} />,
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'projects',
      label: 'search projects',
      icon: <Briefcase size={16} />,
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'contact',
      label: 'goto contact',
      icon: <Mail size={16} />,
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/95 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Terminal Window */}
      <div className="relative w-full max-w-2xl glass rounded-xl shadow-2xl overflow-hidden border border-cyan-accent/30 glow-accent">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-primary/20 bg-neutral-800/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-error" />
            <div className="w-3 h-3 rounded-full bg-warning" />
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="ml-4 text-xs font-code text-neutral-400">
              ~/developer-portfolio
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-cyan-accent transition-colors"
            aria-label="Close command palette"
          >
            <X size={20} />
          </button>
        </div>

        {/* Terminal Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-primary/20">
          <span className="text-cyan-accent font-code text-sm">$</span>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command..."
            className="flex-1 bg-transparent border-none outline-none text-neutral-200 font-code text-sm placeholder:text-neutral-600"
          />
        </div>

        {/* Commands List */}
        <div className="p-2 max-h-[400px] overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-neutral-600 font-code text-sm">
                Command not found: "{search}"
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredCommands.map((cmd, index) => (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                    index === selectedIndex
                      ? 'bg-cyan-accent/10 border border-cyan-accent/30'
                      : 'hover:bg-neutral-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`${
                        index === selectedIndex
                          ? 'text-cyan-accent'
                          : 'text-neutral-600'
                      }`}
                    >
                      {cmd.icon}
                    </span>
                    <span
                      className={`font-code text-sm ${
                        index === selectedIndex
                          ? 'text-cyan-accent'
                          : 'text-neutral-400'
                      }`}
                    >
                      {cmd.label}
                    </span>
                  </div>
                  {index === selectedIndex && (
                    <ChevronRight size={16} className="text-cyan-accent" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Terminal Footer */}
        <div className="px-4 py-2 border-t border-primary/20 bg-neutral-800/50">
          <div className="flex items-center gap-4 text-xs font-code text-neutral-600">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
