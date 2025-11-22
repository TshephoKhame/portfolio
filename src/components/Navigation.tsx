import { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

interface NavigationProps {
  onCommandPaletteOpen: () => void;
}

const Navigation = ({ onCommandPaletteOpen }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass py-3 shadow-lg border-b border-primary/20'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-heading text-2xl font-bold text-cyan-accent hover:text-purple-accent transition-colors duration-300"
          >
            {'<Dev />'}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {['about', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="relative text-neutral-400 hover:text-cyan-accent transition-colors duration-300 font-medium text-sm uppercase tracking-wide group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-accent transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            
            <button
              onClick={onCommandPaletteOpen}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 text-neutral-400 hover:border-cyan-accent hover:text-cyan-accent transition-all duration-300"
              aria-label="Open command palette"
            >
              <Terminal size={16} />
              <span className="text-xs font-code">/</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-cyan-accent"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 glass rounded-lg p-4 space-y-3">
            {['about', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left text-neutral-400 hover:text-cyan-accent transition-colors duration-300 font-medium uppercase tracking-wide py-2"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => {
                onCommandPaletteOpen();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 rounded-lg border border-primary/20 text-neutral-400 hover:border-cyan-accent hover:text-cyan-accent transition-all duration-300"
            >
              <Terminal size={16} />
              <span className="text-xs font-code">Command Palette</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
