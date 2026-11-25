import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const MultiversePortal: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[520px] aspect-square mx-auto flex items-center justify-center select-none overflow-visible">
      {/* Ambient background glows */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#77D9F7]/15 via-transparent to-[#F4B978]/15 blur-3xl pointer-events-none" />

      {/* Outer subtle particle orbit */}
      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[94%] h-[94%] rounded-full border border-dashed border-[#A78BFA]/20 pointer-events-none"
      />

      {/* Reality A Orbital Ring (Cool Blue) */}
      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? {} : { rotate: -360 }}
        transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[82%] h-[82%] rounded-full border border-[#77D9F7]/35 shadow-[0_0_20px_rgba(119,217,247,0.15)] flex items-start justify-center"
      >
        {/* Quantum Node A */}
        <div className="-mt-1.5 w-3 h-3 rounded-full bg-[#77D9F7] shadow-[0_0_12px_#77D9F7] flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-white" />
        </div>
      </motion.div>

      {/* Reality B Orbital Ring (Warm Amber) */}
      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[70%] h-[70%] rounded-full border border-[#F4B978]/35 shadow-[0_0_20px_rgba(244,185,120,0.15)] flex items-end justify-center"
      >
        {/* Quantum Node B */}
        <div className="-mb-1.5 w-3 h-3 rounded-full bg-[#F4B978] shadow-[0_0_12px_#F4B978] flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-white" />
        </div>
      </motion.div>

      {/* Inner Tilted Elliptical Ring (Violet Accent) */}
      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? {} : { rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[58%] h-[58%] rounded-full border border-[#A78BFA]/50 shadow-[0_0_15px_rgba(167,139,250,0.25)]"
        style={{ transformOrigin: 'center center' }}
      />

      {/* The Multiverse Portal Core */}
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(167,139,250,0.35)]">
        {/* Split Reality Backdrop: Left Cool Blue, Right Warm Amber */}
        <div className="absolute inset-0 rounded-full overflow-hidden border border-white/20">
          <div className="w-full h-full flex">
            {/* Reality A: Cool Blue Chamber */}
            <div className="w-1/2 h-full bg-gradient-to-r from-[#0d2238] via-[#0b1c2e] to-[#080910] relative flex items-center justify-center overflow-hidden">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#77D9F7]/30 to-transparent blur-md animate-pulse" />
              <div className="relative text-[10px] font-mono uppercase tracking-widest text-[#77D9F7]/70 rotate-[-90deg] font-semibold">
                Reality A
              </div>
            </div>

            {/* Reality B: Warm Amber Chamber */}
            <div className="w-1/2 h-full bg-gradient-to-l from-[#361f10] via-[#24150b] to-[#080910] relative flex items-center justify-center overflow-hidden">
              <div className="absolute -inset-4 bg-gradient-to-bl from-[#F4B978]/30 to-transparent blur-md animate-pulse" />
              <div className="relative text-[10px] font-mono uppercase tracking-widest text-[#F4B978]/70 rotate-90 font-semibold">
                Reality B
              </div>
            </div>
          </div>
        </div>

        {/* Central Singularity Singularity Void & Horizon */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [0.98, 1.04, 0.98],
                  boxShadow: [
                    '0 0 25px rgba(167,139,250,0.4)',
                    '0 0 45px rgba(167,139,250,0.7)',
                    '0 0 25px rgba(167,139,250,0.4)',
                  ],
                }
          }
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#080910] border border-white/30 flex items-center justify-center"
        >
          {/* Inner Singularity Spark */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#77D9F7] via-[#A78BFA] to-[#F4B978] shadow-[0_0_20px_#A78BFA] flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
          </div>

          {/* Meridian Division Line */}
          <div className="absolute inset-y-0 w-[1px] bg-gradient-to-b from-[#77D9F7] via-[#A78BFA] to-[#F4B978] opacity-70" />
        </motion.div>
      </div>

      {/* Floating Telemetry Badge: Reality A */}
      <motion.div
        animate={shouldReduceMotion ? {} : { y: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 left-4 sm:left-0 z-20 px-3 py-1.5 rounded-full bg-[#11121C]/90 backdrop-blur-md border border-[#77D9F7]/30 shadow-[0_4px_16px_rgba(0,0,0,0.4)] flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-[#77D9F7] shadow-[0_0_6px_#77D9F7]" />
        <span className="text-[11px] font-mono tracking-wider text-[#77D9F7] font-medium">
          REALITY A // MASTERED
        </span>
      </motion.div>

      {/* Floating Telemetry Badge: Reality B */}
      <motion.div
        animate={shouldReduceMotion ? {} : { y: [3, -3, 3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-3 right-4 sm:right-0 z-20 px-3 py-1.5 rounded-full bg-[#11121C]/90 backdrop-blur-md border border-[#F4B978]/30 shadow-[0_4px_16px_rgba(0,0,0,0.4)] flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-[#F4B978] shadow-[0_0_6px_#F4B978]" />
        <span className="text-[11px] font-mono tracking-wider text-[#F4B978] font-medium">
          REALITY B // UNCHARTED
        </span>
      </motion.div>
    </div>
  );
};
