import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const MultiversePortal: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[420px] aspect-square mx-auto flex items-center justify-center select-none">
      {/* Outer Fine Astronomical Coordinate Ring */}
      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[92%] h-[92%] rounded-full border border-dashed border-white/10 pointer-events-none"
      />

      {/* Reality A Orbital Trajectory (Ice Blue) */}
      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? {} : { rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[78%] h-[78%] rounded-full border border-[#77D9F7]/30 flex items-start justify-center"
      >
        <div className="-mt-1 w-2.5 h-2.5 rounded-full bg-[#77D9F7]" />
      </motion.div>

      {/* Reality B Orbital Trajectory (Warm Amber) */}
      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[64%] h-[64%] rounded-full border border-[#F4B978]/30 flex items-end justify-center"
      >
        <div className="-mb-1 w-2.5 h-2.5 rounded-full bg-[#F4B978]" />
      </motion.div>

      {/* The Central Multiverse Core (Dual Hemispheres) */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-white/15 bg-[#080910] flex items-center justify-center overflow-hidden">
        {/* Split Horizon: Reality A (Cool) / Reality B (Warm) */}
        <div className="absolute inset-0 flex">
          <div className="w-1/2 h-full bg-[#0d1624] border-r border-white/10 flex items-center justify-center">
            <span className="text-[10px] font-mono tracking-widest text-[#77D9F7]/60 -rotate-90">
              REALITY A
            </span>
          </div>
          <div className="w-1/2 h-full bg-[#1f170f] flex items-center justify-center">
            <span className="text-[10px] font-mono tracking-widest text-[#F4B978]/60 rotate-90">
              REALITY B
            </span>
          </div>
        </div>

        {/* Central Singularity Point */}
        <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#080910] border border-white/20 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F5F3FF]" />
        </div>
      </div>

      {/* Refined Telemetry Coordinate Label: Reality A */}
      <div className="absolute top-1 sm:top-2 left-1 sm:left-2 z-20 px-2.5 py-1 rounded-md bg-[#080910]/95 backdrop-blur-md border border-[#77D9F7]/30 text-[10px] font-mono font-medium text-[#77D9F7] flex items-center gap-1.5 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#77D9F7]" />
        <span>TIMELINE A // ORIGINAL</span>
      </div>

      {/* Refined Telemetry Coordinate Label: Reality B */}
      <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 z-20 px-2.5 py-1 rounded-md bg-[#080910]/95 backdrop-blur-md border border-[#F4B978]/30 text-[10px] font-mono font-medium text-[#F4B978] flex items-center gap-1.5 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F4B978]" />
        <span>TIMELINE B // ALTERNATE</span>
      </div>
    </div>
  );
};
