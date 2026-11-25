import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenGateway: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGateway }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080910]/85 backdrop-blur-md border-b border-[#A78BFA]/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/50 rounded-lg p-1"
            aria-label="THE OTHER SIDE Homepage"
          >
            {/* Minimal Orbital Logo */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#77D9F7]/40 animate-spin-slow group-hover:border-[#77D9F7] transition-colors" />
              <div className="absolute inset-0.5 rounded-full border border-[#F4B978]/40 animate-spin-reverse group-hover:border-[#F4B978] transition-colors" />
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#77D9F7] via-[#A78BFA] to-[#F4B978] shadow-[0_0_10px_#A78BFA]" />
            </div>

            <span className="font-heading font-bold text-lg sm:text-xl tracking-wider text-[#F5F3FF] group-hover:text-[#A78BFA] transition-colors">
              THE OTHER SIDE
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm font-medium text-[#9292A5] hover:text-[#F5F3FF] transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#A78BFA] rounded px-2 py-1"
            >
              <Compass className="w-4 h-4 text-[#77D9F7]" />
              Experience
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium text-[#9292A5] hover:text-[#F5F3FF] transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#A78BFA] rounded px-2 py-1"
            >
              About
            </button>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenGateway}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#080910] bg-[#F5F3FF] hover:bg-gradient-to-r hover:from-[#77D9F7] hover:via-[#A78BFA] hover:to-[#F4B978] hover:text-[#080910] transition-all duration-300 shadow-[0_0_20px_rgba(167,139,250,0.3)] hover:shadow-[0_0_25px_rgba(167,139,250,0.6)] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
            >
              <span className="relative z-10 flex items-center gap-2 font-heading">
                <Sparkles className="w-3.5 h-3.5 text-[#080910]" />
                Enter Reality
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#9292A5] hover:text-[#F5F3FF] hover:bg-[#11121C] focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#11121C]/95 backdrop-blur-xl border border-[#A78BFA]/20 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="flex items-center gap-2.5 text-left text-base font-medium text-[#F5F3FF] hover:text-[#77D9F7] py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Compass className="w-4 h-4 text-[#77D9F7]" />
              Experience
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left text-base font-medium text-[#F5F3FF] hover:text-[#A78BFA] py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenGateway();
              }}
              className="w-full mt-2 py-3 px-4 rounded-xl text-center text-sm font-semibold uppercase tracking-wider text-[#080910] bg-gradient-to-r from-[#77D9F7] via-[#A78BFA] to-[#F4B978] shadow-[0_0_15px_rgba(167,139,250,0.4)] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#080910]" />
              Enter Reality
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
