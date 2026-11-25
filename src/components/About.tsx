import React from 'react';
import { Compass, ShieldCheck, Sparkles, Orbit } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#080910] border-t border-[#A78BFA]/10 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-[#F4B978]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-[#77D9F7]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Philosophical Narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11121C] border border-[#A78BFA]/25 mb-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#A78BFA]">
                The Core Philosophy
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F3FF] mb-6 leading-tight">
              Your life is{' '}
              <span className="bg-gradient-to-r from-[#A78BFA] to-[#77D9F7] bg-clip-text text-transparent">
                one timeline.
              </span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#9292A5] leading-relaxed">
              <p>
                In this universe, you made a single unbroken sequence of choices. You took one career path, chose specific companions, inhabited certain cities, and watched countless other possible identities drift away into memory.
              </p>
              <p>
                <strong className="text-[#F5F3FF] font-medium">THE OTHER SIDE</strong> is a cinematic simulation platform that breathes life into the roads you never walked. It gives form to the persistent question that haunts every reflective mind: <em className="text-[#A78BFA] not-italic">"What if I had made the other choice?"</em>
              </p>
              <p>
                This is not a fortune-telling engine or an artificial intelligence claiming to predict your future. It is a creative, structured multiverse canvas engineered to let you safely wander through parallel lives, examine the trade-offs of destiny, and return to your own timeline with renewed clarity.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#77D9F7]/10 border border-[#77D9F7]/30 text-[#77D9F7]">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-[#F5F3FF]">
                    Creative Simulation
                  </h4>
                  <p className="text-xs text-[#9292A5] mt-0.5">
                    Fictional branches built on rich narrative trajectories rather than deterministic forecasts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#F4B978]/10 border border-[#F4B978]/30 text-[#F4B978]">
                  <Orbit className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-[#F5F3FF]">
                    Sovereign Agency
                  </h4>
                  <p className="text-xs text-[#9292A5] mt-0.5">
                    Every timeline divergence is born from deliberate human choice and consequence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Reality Contrast Matrix */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-[#11121C]/90 border border-[#A78BFA]/20 shadow-2xl backdrop-blur-xl">
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#A78BFA]" />
                  <span className="font-heading text-sm font-semibold uppercase tracking-wider text-[#F5F3FF]">
                    Quantum Continuum Matrix
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#A78BFA]/20 text-[#A78BFA] border border-[#A78BFA]/30">
                  STAGE 1 FOUNDATION
                </span>
              </div>

              {/* Reality A preview card */}
              <div className="mt-6 p-4 rounded-xl bg-[#080910]/80 border border-[#77D9F7]/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#77D9F7]/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-medium text-[#77D9F7] uppercase tracking-wider">
                    Reality A • Original Path
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#77D9F7] shadow-[0_0_8px_#77D9F7]" />
                </div>
                <h5 className="font-heading text-base font-semibold text-[#F5F3FF]">
                  The Compounding Continuum
                </h5>
                <p className="text-xs text-[#9292A5] mt-1 leading-relaxed">
                  Rooted in familiar gravity. High stability, deep institutional grounding, and incremental mastery.
                </p>
              </div>

              {/* Singularity Divider */}
              <div className="my-4 flex items-center justify-center relative">
                <div className="w-full border-t border-dashed border-[#A78BFA]/20" />
                <div className="absolute px-3 py-1 rounded-full bg-[#11121C] border border-[#A78BFA]/30 text-[10px] font-mono text-[#A78BFA]">
                  DIVERGENCE THRESHOLD
                </div>
              </div>

              {/* Reality B preview card */}
              <div className="p-4 rounded-xl bg-[#080910]/80 border border-[#F4B978]/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#F4B978]/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-medium text-[#F4B978] uppercase tracking-wider">
                    Reality B • Alternate Branch
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#F4B978] shadow-[0_0_8px_#F4B978]" />
                </div>
                <h5 className="font-heading text-base font-semibold text-[#F5F3FF]">
                  The Uncharted Horizon
                </h5>
                <p className="text-xs text-[#9292A5] mt-1 leading-relaxed">
                  Catalyzed by a bold departure. Radical novelty, autonomous discovery, and unpredicted serendipity.
                </p>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-[#9292A5]">
                <ShieldCheck className="w-4 h-4 text-[#A78BFA]" />
                <span>Zero algorithmic surveillance. Strictly imaginative simulation.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
