import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenGateway: () => void;
  hasActiveSimulation?: boolean;
  onResumeSimulation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGateway,
  hasActiveSimulation = false,
  onResumeSimulation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        isScrolled
          ? 'bg-[#080910]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-[0_2px_15px_rgba(0,0,0,0.6)]'
          : 'bg-[#080910]/60 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-8">
          {/* Minimal Orbital Brand Mark */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-white/30 rounded-md p-1 transition-opacity hover:opacity-90 active:scale-[0.99]"
            aria-label="THE OTHER CHOICE Homepage"
          >
            <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
              <div className="absolute inset-0 rounded-full border border-[#77D9F7]/70 animate-spin-slow" />
              <div className="absolute inset-0.5 rounded-full border border-[#F4B978]/70 animate-spin-reverse" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#F5F3FF]" />
            </div>

            <span className="font-heading font-bold text-base sm:text-lg tracking-wider text-[#F5F3FF]">
              THE OTHER CHOICE
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-[#9292A5]"
            aria-label="Main Navigation"
          >
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="py-1 px-2 rounded-md hover:text-[#F5F3FF] active:text-white transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/20"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="py-1 px-2 rounded-md hover:text-[#F5F3FF] active:text-white transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/20"
            >
              About
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3 font-mono text-xs">
            {hasActiveSimulation && onResumeSimulation && (
              <button
                onClick={onResumeSimulation}
                className="px-3.5 py-2 rounded-lg text-[#77D9F7] bg-[#77D9F7]/10 hover:bg-[#77D9F7]/20 active:bg-[#77D9F7]/25 border border-[#77D9F7]/30 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#77D9F7]"
              >
                Resume Simulation
              </button>
            )}

            <button
              onClick={onOpenGateway}
              className="px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-[#080910] bg-[#F5F3FF] hover:bg-white active:bg-[#E5E5F0] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#080910]"
            >
              Enter Reality
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg text-[#9292A5] hover:text-[#F5F3FF] active:scale-95 transition-all focus:outline-none focus:ring-1 focus:ring-white/30"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-xl bg-[#11121C] border border-white/10 shadow-2xl flex flex-col gap-2 font-mono text-xs uppercase tracking-wider animate-in fade-in slide-in-from-top-1 duration-150">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left py-2.5 px-3 rounded-lg text-[#9292A5] hover:text-[#F5F3FF] hover:bg-white/5 active:bg-white/10 transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-2.5 px-3 rounded-lg text-[#9292A5] hover:text-[#F5F3FF] hover:bg-white/5 active:bg-white/10 transition-colors"
            >
              About
            </button>

            {hasActiveSimulation && onResumeSimulation && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onResumeSimulation();
                }}
                className="w-full py-2.5 px-3 rounded-lg text-center text-[#77D9F7] bg-[#77D9F7]/10 active:bg-[#77D9F7]/20 border border-[#77D9F7]/30"
              >
                Resume Simulation
              </button>
            )}

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenGateway();
              }}
              className="w-full mt-1 py-3 px-4 rounded-lg text-center font-bold text-[#080910] bg-[#F5F3FF] hover:bg-white active:bg-[#E5E5F0]"
            >
              Enter Reality
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
