import React, { useState } from 'react';
import { LifeTimeline, LifeEvent } from '../../engine/types';
import { ArrowUpRight } from 'lucide-react';

interface ParallelTimelineProps {
  realityA: LifeTimeline;
  realityB: LifeTimeline;
  onSelectEvent: (event: LifeEvent) => void;
  selectedEventId?: string;
}

/**
 * Extracts a clean, natural sentence preview so text cards never
 * truncate abruptly mid-clause or mid-word.
 */
function getNaturalSentencePreview(text: string, maxLen = 150): string {
  if (!text) return '';
  // Match sentence terminal punctuations plus any immediate closing quotes
  const sentences = text.match(/[^.!?]+[.!?]+["']?/g);
  if (!sentences || sentences.length === 0) {
    return text.trim();
  }

  let preview = sentences[0].trim();
  // Include second sentence if the first is brief and combined fits comfortably
  if (preview.length < 75 && sentences.length > 1) {
    const combined = `${preview} ${sentences[1].trim()}`;
    if (combined.length <= maxLen) {
      preview = combined;
    }
  }
  return preview;
}

export const ParallelTimeline: React.FC<ParallelTimelineProps> = ({
  realityA,
  realityB,
  onSelectEvent,
  selectedEventId,
}) => {
  const [activeFilter, setActiveFilter] = useState<'both' | 'reality-a' | 'reality-b'>('both');
  const [hoveredAge, setHoveredAge] = useState<number | null>(null);

  // Synchronized age pairs
  const milestoneRows = realityA.events.map((evtA, index) => {
    const evtB = realityB.events[index] || realityB.events[realityB.events.length - 1];
    return {
      age: evtA.age,
      isMajor: evtA.isMajor || evtB.isMajor,
      eventA: evtA,
      eventB: evtB,
    };
  });

  return (
    <div className="w-full">
      {/* Editorial Timeline Column Headers (Desktop) */}
      <div className="hidden lg:grid grid-cols-12 gap-8 pb-4 mb-2 border-b border-white/10 text-xs font-mono uppercase tracking-wider text-[#9292A5]">
        <div className="col-span-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#77D9F7]" />
            <span className="text-[#77D9F7] font-semibold">Reality A // Baseline Continuum</span>
          </div>
          <span className="text-[11px] text-[#77D9F7]/70 font-mono">Continuity</span>
        </div>

        <div className="col-span-2 text-center text-[#606075] font-mono">
          Chronology
        </div>

        <div className="col-span-5 flex items-center justify-between">
          <span className="text-[11px] text-[#F4B978]/70 font-mono">Alternate</span>
          <div className="flex items-center gap-2">
            <span className="text-[#F4B978] font-semibold">Reality B // Alternate Orbit</span>
            <span className="w-2 h-2 rounded-full bg-[#F4B978]" />
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Perspective Toggle */}
      <div className="lg:hidden mb-6 flex items-center justify-between gap-3 pb-3 border-b border-white/10">
        <span className="text-xs font-mono uppercase tracking-wider text-[#9292A5]">
          Perspective:
        </span>
        <div className="inline-flex rounded-lg bg-[#11121C] border border-white/10 p-0.5 text-xs font-mono">
          <button
            onClick={() => setActiveFilter('both')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              activeFilter === 'both' ? 'bg-[#1c1d2e] text-[#F5F3FF]' : 'text-[#9292A5]'
            }`}
          >
            Parallel
          </button>
          <button
            onClick={() => setActiveFilter('reality-a')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              activeFilter === 'reality-a' ? 'bg-[#77D9F7]/15 text-[#77D9F7]' : 'text-[#9292A5]'
            }`}
          >
            Reality A
          </button>
          <button
            onClick={() => setActiveFilter('reality-b')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              activeFilter === 'reality-b' ? 'bg-[#F4B978]/15 text-[#F4B978]' : 'text-[#9292A5]'
            }`}
          >
            Reality B
          </button>
        </div>
      </div>

      {/* DESKTOP TIMELINE LEDGER */}
      <div className="hidden lg:flex flex-col divide-y divide-white/5">
        {milestoneRows.map(({ age, isMajor, eventA, eventB }) => {
          const isSelectedA = selectedEventId === eventA.id;
          const isSelectedB = selectedEventId === eventB.id;
          const isRowHovered = hoveredAge === age;

          // Natural sentence boundary previews
          const previewA = getNaturalSentencePreview(eventA.description);
          const previewB = getNaturalSentencePreview(eventB.description);

          return (
            <div
              key={age}
              onMouseEnter={() => setHoveredAge(age)}
              onMouseLeave={() => setHoveredAge(null)}
              className={`grid grid-cols-12 gap-8 items-center transition-colors duration-200 ${
                isMajor ? 'py-9' : 'py-7'
              } ${isRowHovered ? 'bg-white/[0.015]' : ''}`}
            >
              {/* Left Column: Reality A Entry */}
              <div className="col-span-5 flex justify-end">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectEvent(eventA)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectEvent(eventA);
                    }
                  }}
                  className={`w-full p-5 rounded-xl text-right transition-all duration-200 cursor-pointer group focus:outline-none focus:ring-1 focus:ring-[#77D9F7] focus:border-[#77D9F7] ${
                    isMajor
                      ? 'border-r-[3px] border-r-[#77D9F7] border-y border-l border-white/10 bg-[#0c101a]'
                      : 'border-r-2 border-r-[#77D9F7]/40 border-y border-l border-white/5 bg-[#0c0d16]'
                  } ${
                    isSelectedA
                      ? 'border-[#77D9F7] bg-[#111726] ring-1 ring-[#77D9F7] shadow-[0_0_20px_rgba(119,217,247,0.15)]'
                      : 'hover:border-[#77D9F7]/50 hover:bg-[#111624]'
                  }`}
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-end gap-2 mb-2 text-xs font-mono">
                    <span className="text-[#77D9F7]/80 uppercase tracking-wider font-medium">
                      {eventA.category}
                    </span>
                  </div>

                  {/* Title (Typography distinction for major turning point) */}
                  <h4
                    className={`font-heading transition-colors mb-2 text-[#F5F3FF] group-hover:text-[#77D9F7] ${
                      isMajor ? 'text-lg font-bold tracking-tight' : 'text-base font-semibold'
                    }`}
                  >
                    {eventA.title}
                  </h4>

                  {/* Description preview (Clean natural sentence boundary) */}
                  <p className="text-[13px] text-[#A5A5B8] leading-[1.65] font-normal">
                    {previewA}
                  </p>

                  {/* Action Link */}
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-end gap-1 text-[11px] font-mono text-[#77D9F7]/70 group-hover:text-[#77D9F7] transition-colors">
                    <span>Read chronicle</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Center Spine: Age Index */}
              <div className="col-span-2 self-stretch flex flex-col items-center justify-center relative">
                <div className="w-[1px] absolute top-0 bottom-0 bg-white/15" />
                <div
                  className={`relative z-10 px-3.5 py-1 rounded-md border font-mono text-xs font-bold transition-all duration-200 ${
                    isMajor
                      ? 'bg-[#151624] border-[#A78BFA]/50 text-[#F5F3FF]'
                      : 'bg-[#080910] border-white/10 text-[#9292A5]'
                  } ${isRowHovered ? 'scale-105 border-[#A78BFA] text-[#F5F3FF]' : ''}`}
                >
                  AGE {age}
                </div>
              </div>

              {/* Right Column: Reality B Entry */}
              <div className="col-span-5 flex justify-start">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectEvent(eventB)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectEvent(eventB);
                    }
                  }}
                  className={`w-full p-5 rounded-xl text-left transition-all duration-200 cursor-pointer group focus:outline-none focus:ring-1 focus:ring-[#F4B978] focus:border-[#F4B978] ${
                    isMajor
                      ? 'border-l-[3px] border-l-[#F4B978] border-y border-r border-white/10 bg-[#16120c]'
                      : 'border-l-2 border-l-[#F4B978]/40 border-y border-r border-white/5 bg-[#0c0d16]'
                  } ${
                    isSelectedB
                      ? 'border-[#F4B978] bg-[#1c1813] ring-1 ring-[#F4B978] shadow-[0_0_20px_rgba(244,185,120,0.15)]'
                      : 'hover:border-[#F4B978]/50 hover:bg-[#191410]'
                  }`}
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-2 mb-2 text-xs font-mono">
                    <span className="text-[#F4B978]/80 uppercase tracking-wider font-medium">
                      {eventB.category}
                    </span>
                  </div>

                  {/* Title (Typography distinction for major turning point) */}
                  <h4
                    className={`font-heading transition-colors mb-2 text-[#F5F3FF] group-hover:text-[#F4B978] ${
                      isMajor ? 'text-lg font-bold tracking-tight' : 'text-base font-semibold'
                    }`}
                  >
                    {eventB.title}
                  </h4>

                  {/* Description preview (Clean natural sentence boundary) */}
                  <p className="text-[13px] text-[#A5A5B8] leading-[1.65] font-normal">
                    {previewB}
                  </p>

                  {/* Action Link */}
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-start gap-1 text-[11px] font-mono text-[#F4B978]/70 group-hover:text-[#F4B978] transition-colors">
                    <span>Read chronicle</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MOBILE / TABLET TIMELINE STACK (< 1024px) */}
      <div className="lg:hidden space-y-6">
        {milestoneRows.map(({ age, isMajor, eventA, eventB }) => {
          const showA = activeFilter === 'both' || activeFilter === 'reality-a';
          const showB = activeFilter === 'both' || activeFilter === 'reality-b';
          const isSelectedA = selectedEventId === eventA.id;
          const isSelectedB = selectedEventId === eventB.id;

          const previewA = getNaturalSentencePreview(eventA.description);
          const previewB = getNaturalSentencePreview(eventB.description);

          return (
            <div
              key={age}
              className={`p-4 rounded-xl bg-[#0c0d16] border space-y-3 ${
                isMajor ? 'border-white/15' : 'border-white/5'
              }`}
            >
              {/* Row Age Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/5 text-xs font-mono">
                <span className={`font-bold ${isMajor ? 'text-[#F5F3FF]' : 'text-[#9292A5]'}`}>
                  CHRONOLOGY // AGE {age}
                </span>
                {isMajor && (
                  <span className="text-[11px] text-[#A78BFA] font-medium">Critical Junction</span>
                )}
              </div>

              {/* Reality A Card */}
              {showA && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectEvent(eventA)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectEvent(eventA);
                    }
                  }}
                  className={`p-3.5 rounded-lg border-l-2 border-l-[#77D9F7] border-y border-r transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#77D9F7] ${
                    isSelectedA
                      ? 'border-[#77D9F7] bg-[#111726]'
                      : 'border-white/5 bg-[#11121C]/70 hover:border-[#77D9F7]/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-[#77D9F7] font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#77D9F7]" />
                      Reality A
                    </span>
                    <span className="text-[#77D9F7]/70 uppercase">{eventA.category}</span>
                  </div>
                  <h5 className={`font-heading text-[#F5F3FF] mb-1.5 ${isMajor ? 'text-base font-bold' : 'text-sm font-semibold'}`}>
                    {eventA.title}
                  </h5>
                  <p className="text-[13px] text-[#A5A5B8] leading-[1.6]">
                    {previewA}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-end text-[11px] font-mono text-[#77D9F7]/70">
                    <span>Read chronicle</span>
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              )}

              {/* Reality B Card */}
              {showB && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectEvent(eventB)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectEvent(eventB);
                    }
                  }}
                  className={`p-3.5 rounded-lg border-l-2 border-l-[#F4B978] border-y border-r transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#F4B978] ${
                    isSelectedB
                      ? 'border-[#F4B978] bg-[#1c1813]'
                      : 'border-white/5 bg-[#11121C]/70 hover:border-[#F4B978]/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-[#F4B978] font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4B978]" />
                      Reality B
                    </span>
                    <span className="text-[#F4B978]/70 uppercase">{eventB.category}</span>
                  </div>
                  <h5 className={`font-heading text-[#F5F3FF] mb-1.5 ${isMajor ? 'text-base font-bold' : 'text-sm font-semibold'}`}>
                    {eventB.title}
                  </h5>
                  <p className="text-[13px] text-[#A5A5B8] leading-[1.6]">
                    {previewB}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-start text-[11px] font-mono text-[#F4B978]/70">
                    <span>Read chronicle</span>
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
