import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#080910] border-t border-[#A78BFA]/15 py-12 sm:py-16 overflow-hidden">
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-1/3 right-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#A78BFA]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#11121C]">
          {/* Brand info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <div className="flex items-center gap-3">
              {/* Minimal orbital logo */}
              <div className="relative w-7 h-7 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#77D9F7]/40 animate-spin-slow" />
                <div className="absolute inset-0.5 rounded-full border border-[#F4B978]/40 animate-spin-reverse" />
                <div className="w-2 h-2 rounded-full bg-[#A78BFA]" />
              </div>
              <span className="font-heading font-bold text-lg tracking-wider text-[#F5F3FF]">
                THE OTHER CHOICE
              </span>
            </div>

            <p className="text-xs font-mono tracking-widest text-[#A78BFA] uppercase mt-1">
              EVERY DECISION CREATES ANOTHER UNIVERSE.
            </p>
          </div>

          {/* Quick Links & Back to Top */}
          <div className="flex items-center gap-6 text-sm text-[#9292A5]">
            <a
              href="#how-it-works"
              className="hover:text-[#F5F3FF] transition-colors focus:outline-none focus:ring-1 focus:ring-[#A78BFA] rounded px-1"
            >
              Experience
            </a>
            <a
              href="#about"
              className="hover:text-[#F5F3FF] transition-colors focus:outline-none focus:ring-1 focus:ring-[#A78BFA] rounded px-1"
            >
              About
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[#11121C] border border-[#A78BFA]/20 text-[#9292A5] hover:text-[#F5F3FF] hover:border-[#A78BFA]/40 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#A78BFA] cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9292A5]">
          <div>
            &copy; 2026 THE OTHER CHOICE. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#77D9F7]" />
            <span>DAY 2 // PARALLEL LIFE TIMELINES ACTIVATED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
