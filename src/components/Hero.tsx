import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { MultiversePortal } from './MultiversePortal';

interface HeroProps {
  onStartSimulation: () => void;
  onExploreConcept: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartSimulation, onExploreConcept }) => {
  return (
    <section className="relative min-h-[82vh] lg:min-h-[84vh] flex items-center justify-center pt-20 sm:pt-24 lg:pt-20 pb-12 sm:pb-16 lg:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Editorial Statement & Direct Action */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Minimal Monospaced Coordinate */}
            <div className="mb-4 sm:mb-5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#9292A5] flex items-center gap-2">
              <span className="text-[#A78BFA] font-bold">01</span>
              <span className="text-[#606075]">//</span>
              <span>Alternate-Life Simulation Platform</span>
            </div>

            {/* Main Headline - Bold, Architectural, High Contrast */}
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F3FF] leading-[1.05] mb-5 sm:mb-6">
              One life.
              <span className="block text-[#C4C4D6] font-normal mt-1">
                Infinite possibilities.
              </span>
            </h1>

            {/* Supporting Text - Literary & Restrained */}
            <p className="text-base sm:text-lg md:text-xl text-[#9292A5] max-w-xl leading-relaxed mb-7 sm:mb-8 font-normal">
              Every decision creates another universe. Explore the paths you never took, discover the lives you could have lived, and step into the unknown.
            </p>

            {/* Direct High-Contrast Action Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onStartSimulation}
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold text-[#080910] bg-[#F5F3FF] hover:bg-white active:bg-[#E2E2F0] active:scale-[0.99] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-[#080910]"
              >
                Start Simulation
              </button>

              <button
                onClick={onExploreConcept}
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg text-xs font-mono uppercase tracking-wider text-[#9292A5] hover:text-[#F5F3FF] hover:bg-[#161724] hover:border-white/25 active:bg-[#1a1b2c] active:scale-[0.99] border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/30"
              >
                <span>Explore the concept</span>
                <ArrowDownRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quiet Chronological Telemetry */}
            <div className="mt-8 sm:mt-10 pt-5 border-t border-white/5 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[11px] sm:text-xs text-[#606075] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#77D9F7]" />
                <span>Reality A: The Known Path</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4B978]" />
                <span>Reality B: The Alternate Path</span>
              </div>
            </div>
          </div>

          {/* Right Column: Multiverse Portal Visual Artwork */}
          <div className="lg:col-span-5 flex items-center justify-center w-full">
            <MultiversePortal />
          </div>
        </div>
      </div>
    </section>
  );
};
