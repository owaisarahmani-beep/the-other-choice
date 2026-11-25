import React from 'react';
import { Compass, Orbit } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: The Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#606075]">
              03 // The Premise
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F3FF] leading-tight">
              Your life is{' '}
              <span className="text-[#9292A5] font-light">
                one timeline.
              </span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#9292A5] leading-relaxed font-normal">
              <p>
                In this universe, you made a single unbroken sequence of choices. You took one career path, chose specific companions, inhabited certain cities, and watched countless other possible identities drift away into memory.
              </p>
              <p>
                <strong className="text-[#F5F3FF] font-medium">THE OTHER CHOICE</strong> is an alternate-life simulation platform that breathes form into the roads you never walked. It gives shape to the persistent question that haunts every reflective mind: <em className="text-[#F5F3FF] not-italic">"What if I had made the other choice?"</em>
              </p>
              <p>
                This is not a fortune-telling engine or an artificial intelligence claiming to predict your destiny. It is a structured multiverse thought experiment engineered to let you wander safely through parallel lives, examine the trade-offs of fate, and return to your own reality with renewed clarity.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
              <div className="p-4 rounded-xl bg-[#0c0d16] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-[#77D9F7] text-xs font-mono font-semibold">
                  <Compass className="w-4 h-4" />
                  <span>Creative Simulation</span>
                </div>
                <p className="text-xs text-[#9292A5] leading-relaxed">
                  Fictional branches built on rich narrative trajectories rather than deterministic forecasts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0c0d16] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-[#F4B978] text-xs font-mono font-semibold">
                  <Orbit className="w-4 h-4" />
                  <span>Sovereign Agency</span>
                </div>
                <p className="text-xs text-[#9292A5] leading-relaxed">
                  Every timeline divergence is born from deliberate human choice, trade-off, and consequence.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Comparative Ledger Structure */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0d16] border border-white/10 space-y-6">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[#F5F3FF]">THE DUAL REALITY MATRIX</span>
                <span className="text-[#606075]">Comparative Logic</span>
              </div>

              {/* Reality A Ledger Entry */}
              <div className="space-y-2 p-4 rounded-xl bg-[#11121C] border-l-2 border-[#77D9F7]">
                <div className="text-xs font-mono text-[#77D9F7] font-semibold">
                  Reality A // The Known Horizon
                </div>
                <h4 className="font-heading text-sm font-bold text-[#F5F3FF]">
                  The Architecture of Continuity
                </h4>
                <p className="text-xs text-[#9292A5] leading-relaxed">
                  Grounding within established systems. Compounding institutional influence, deep social anchors, and the quiet security of predictability.
                </p>
              </div>

              {/* Reality B Ledger Entry */}
              <div className="space-y-2 p-4 rounded-xl bg-[#11121C] border-l-2 border-[#F4B978]">
                <div className="text-xs font-mono text-[#F4B978] font-semibold">
                  Reality B // The Alternate Orbit
                </div>
                <h4 className="font-heading text-sm font-bold text-[#F5F3FF]">
                  The Uncharted Frontier
                </h4>
                <p className="text-xs text-[#9292A5] leading-relaxed">
                  Catalyzed by a bold departure. Autonomous self-determination, radical novelty, and unscripted serendipity born of genuine vulnerability.
                </p>
              </div>

              <div className="pt-2 text-[11px] font-mono text-[#606075] text-center">
                Strictly imaginative simulation • Zero algorithmic surveillance
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
