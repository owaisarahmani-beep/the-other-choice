import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { LifeEvent } from '../../engine/types';

interface EventDetailDrawerProps {
  event: LifeEvent | null;
  onClose: () => void;
}

export const EventDetailDrawer: React.FC<EventDetailDrawerProps> = ({ event, onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!event) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [event, onClose]);

  if (!event) return null;

  const isRealityA = event.realityType === 'reality-a';
  const accentColor = isRealityA ? '#77D9F7' : '#F4B978';
  const realityTitle = isRealityA ? 'Reality A // Baseline Continuity' : 'Reality B // Alternate Horizon';

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#080910]/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-event-title"
    >
      <div
        ref={drawerRef}
        className="relative w-full max-w-lg h-full bg-[#11121C] border-l border-white/10 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250"
      >
        {/* Top Minimal Strip */}
        <div
          className="h-1 w-full shrink-0"
          style={{ backgroundColor: accentColor }}
        />

        {/* Drawer Header */}
        <div className="p-6 sm:p-8 pb-4 border-b border-white/5 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono">
              <span
                className="font-bold tracking-wider uppercase"
                style={{ color: accentColor }}
              >
                {realityTitle}
              </span>
              <span className="text-[#606075]">• Age {event.age}</span>
            </div>

            <h3 id="drawer-event-title" className="font-heading text-xl sm:text-2xl font-bold text-[#F5F3FF]">
              {event.title}
            </h3>

            <div className="text-xs font-mono text-[#606075] mt-1 uppercase">
              Field: {event.category}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 text-[#9292A5] hover:text-[#F5F3FF] hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-white/20"
            aria-label="Close event chronicle"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 sm:p-8 space-y-6 flex-1 overflow-y-auto">
          {/* Narrative Chronicle */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#606075]">
              Narrative Chronicle
            </h4>
            <p className="text-sm sm:text-base text-[#F5F3FF] leading-relaxed font-normal">
              {event.description}
            </p>
          </div>

          {/* Alternate Universe Echo */}
          {event.parallelReflection && (
            <div className="p-4 rounded-xl bg-[#0c0d16] border border-white/5 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#A78BFA] block">
                The Parallel Echo // Meanwhile in the other universe:
              </span>
              <p className="text-xs sm:text-sm text-[#9292A5] leading-relaxed italic">
                "{event.parallelReflection}"
              </p>
            </div>
          )}

          {/* Existential Trade-off Reflection */}
          <div className="p-4 rounded-xl border border-white/5 space-y-2 text-xs">
            <span className="font-mono uppercase tracking-wider text-[#606075] block">
              The Trade-off Axis
            </span>
            <p className="text-[#9292A5] leading-relaxed">
              {isRealityA
                ? 'Secured high predictability, compound institutional trust, and structural safety at the cost of wild unscripted serendipity.'
                : 'Secured intellectual sovereignty, uncalculated breakthroughs, and radical novelty at the cost of structural predictability.'}
            </p>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 sm:p-8 pt-4 border-t border-white/5 flex items-center justify-between gap-3 bg-[#0c0d16] shrink-0 text-xs font-mono">
          <span className="text-[#606075]">Creative Alternate-Life Simulation</span>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#F5F3FF] bg-white/10 hover:bg-white/15 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
