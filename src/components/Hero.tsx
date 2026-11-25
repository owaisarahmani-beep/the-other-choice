import React from 'react';
import { Sparkles, ArrowDownRight, Compass } from 'lucide-react';
import { MultiversePortal } from './MultiversePortal';

interface HeroProps {
  onStartSimulation: () => void;
  onExploreConcept: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartSimulation, onExploreConcept }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:py-24 cosmic-radial-bg overflow-hidden">
      {/* Subtle ambient light beams */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#A78BFA]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#77D9F7]/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-[#F4B978]/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & CTA */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Small Introductory Pill Label */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#11121C] border border-[#A78BFA]/30 shadow-[0_0_15px_rgba(167,139,250,0.15)] mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_8px_#A78BFA] animate-ping" />
              <span className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-[0.2em] text-[#A78BFA]">
                A Journey Through Alternate Realities
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F3FF] leading-[1.08] mb-6">
              One life.{' '}
              <span className="block mt-1 bg-gradient-to-r from-[#77D9F7] via-[#A78BFA] to-[#F4B978] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(167,139,250,0.3)]">
                Infinite possibilities.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-[#9292A5] max-w-2xl leading-relaxed mb-8 sm:mb-10 font-normal">
              Every decision creates another universe. Explore the paths you never took, discover the lives you could have lived, and step into the unknown.
            </p>

            {/* Interactive CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onStartSimulation}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold tracking-wide text-[#080910] bg-[#F5F3FF] hover:bg-gradient-to-r hover:from-[#77D9F7] hover:via-[#A78BFA] hover:to-[#F4B978] transition-all duration-300 shadow-[0_0_30px_rgba(167,139,250,0.35)] hover:shadow-[0_0_40px_rgba(167,139,250,0.6)] flex items-center justify-center gap-2.5 font-heading cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A78BFA] focus:ring-offset-2 focus:ring-offset-[#080910]"
              >
                <Sparkles className="w-4 h-4 text-[#080910]" />
                <span>Start Simulation</span>
              </button>

              <button
                onClick={onExploreConcept}
                className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm font-medium text-[#F5F3FF] bg-[#11121C]/80 hover:bg-[#151624] border border-[#A78BFA]/20 hover:border-[#A78BFA]/40 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/50"
              >
                <Compass className="w-4 h-4 text-[#77D9F7]" />
                <span>Explore the concept</span>
                <ArrowDownRight className="w-3.5 h-3.5 text-[#9292A5]" />
              </button>
            </div>

            {/* Micro Telemetry Metrics */}
            <div className="mt-10 sm:mt-12 pt-6 border-t border-[#11121C] flex items-center gap-6 text-xs text-[#9292A5] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#77D9F7]" />
                <span>Reality A: Origin Branch</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F4B978]" />
                <span>Reality B: Divergent Branch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Original Multiverse Portal Visual */}
          <div className="lg:col-span-5 flex items-center justify-center w-full">
            <MultiversePortal />
          </div>
        </div>
      </div>
    </section>
  );
};
