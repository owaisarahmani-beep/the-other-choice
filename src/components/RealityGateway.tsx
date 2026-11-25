import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, AlertCircle, CheckCircle2, ArrowRight, ShieldCheck, Orbit } from 'lucide-react';
import { PROTOTYPE_SIMULATION, SAMPLE_DECISIONS } from '../engine/scenarios';
import { DecisionOption } from '../engine/types';

interface RealityGatewayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RealityGateway: React.FC<RealityGatewayProps> = ({ isOpen, onClose }) => {
  const [selectedDecision, setSelectedDecision] = useState<DecisionOption>(SAMPLE_DECISIONS[1]);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibratedSuccess, setCalibratedSuccess] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Keyboard accessibility: Escape key to close & focus management
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent background scrolling
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Handle clicking on backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleSimulateCalibration = () => {
    setIsCalibrating(true);
    setCalibratedSuccess(false);

    setTimeout(() => {
      setIsCalibrating(false);
      setCalibratedSuccess(true);
    }, 1200);
  };

  const isRealityA = selectedDecision.projectedReality === 'reality-a';
  const targetTimeline = isRealityA 
    ? PROTOTYPE_SIMULATION.timelines.realityA 
    : PROTOTYPE_SIMULATION.timelines.realityB;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#080910]/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gateway-modal-title"
      aria-describedby="gateway-modal-description"
    >
      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl my-auto rounded-3xl bg-[#11121C] border border-[#A78BFA]/30 shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Top ambient illumination line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#77D9F7] via-[#A78BFA] to-[#F4B978] shrink-0" />

        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 border-b border-white/10 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151624] border border-[#A78BFA]/25 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#A78BFA]">
                Reality Gateway // Scenario Engine
              </span>
            </div>
            <h2
              id="gateway-modal-title"
              className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F3FF]"
            >
              Choose Your Divergence Anchor
            </h2>
            <p
              id="gateway-modal-description"
              className="text-sm text-[#9292A5] mt-1.5 max-w-xl"
            >
              Select an archetype decision to preview the quantum divergence between Reality A and Reality B.
            </p>
          </div>

          {/* Accessible Close Button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2.5 rounded-xl bg-[#151624] text-[#9292A5] hover:text-[#F5F3FF] hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Staging Notice Banner */}
          <div className="mx-6 sm:mx-8 mt-5 p-3.5 rounded-xl bg-[#151624]/90 border border-[#A78BFA]/20 flex items-start gap-3 text-xs text-[#9292A5]">
            <AlertCircle className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#F5F3FF]">Day 1 Foundation Notice: </span>
              The full interactive multi-year simulation engine, deep branch trees, and timeline comparison graphs will be introduced in the upcoming development stages. You are testing the live Day 1 Local Scenario Engine.
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
          {/* Decision Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#9292A5] mb-3">
              1. Select a Divergence Path
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SAMPLE_DECISIONS.map((decision) => {
                const isSelected = selectedDecision.id === decision.id;
                const isA = decision.projectedReality === 'reality-a';
                const accent = isA ? '#77D9F7' : '#F4B978';

                return (
                  <button
                    key={decision.id}
                    onClick={() => {
                      setSelectedDecision(decision);
                      setCalibratedSuccess(false);
                    }}
                    className={`p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A78BFA] ${
                      isSelected
                        ? 'bg-[#151624] shadow-[0_0_20px_rgba(167,139,250,0.15)]'
                        : 'bg-[#080910]/70 border-white/5 hover:border-white/20'
                    }`}
                    style={{
                      borderColor: isSelected ? accent : undefined,
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${accent}15`,
                          color: accent,
                          border: `1px solid ${accent}30`,
                        }}
                      >
                        {isA ? 'Reality A' : 'Reality B'}
                      </span>
                      {isSelected && (
                        <div
                          className="w-2 h-2 rounded-full shadow-[0_0_6px]"
                          style={{ backgroundColor: accent, color: accent }}
                        />
                      )}
                    </div>
                    <div className="font-heading font-semibold text-sm text-[#F5F3FF] line-clamp-1">
                      {decision.title}
                    </div>
                    <div className="text-xs text-[#9292A5] mt-1 line-clamp-2">
                      {decision.tagline}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Decision Detail & Scenario Engine Telemetry */}
          <div className="p-5 rounded-2xl bg-[#080910] border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-[#9292A5]">PROJECTED DESTINATION</span>
                <h4 className="font-heading text-base font-bold text-[#F5F3FF] flex items-center gap-2 mt-0.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: isRealityA ? '#77D9F7' : '#F4B978',
                      boxShadow: `0 0 8px ${isRealityA ? '#77D9F7' : '#F4B978'}`,
                    }}
                  />
                  {targetTimeline.name}
                </h4>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-[#9292A5]">Divergence Magnitude:</span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-[#F5F3FF] border border-white/10 font-bold">
                  {selectedDecision.divergenceWeight}%
                </span>
              </div>
            </div>

            <p className="text-sm text-[#9292A5] leading-relaxed">
              {selectedDecision.description}
            </p>

            <div className="p-3 rounded-lg bg-[#11121C] border border-white/5 text-xs text-[#9292A5]">
              <span className="font-semibold text-[#F5F3FF]">Primary Timeline Shift: </span>
              {selectedDecision.primaryImpact}
            </div>

            {/* Projected Timeline Milestones Preview */}
            <div className="pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#9292A5] block mb-2">
                Sample Scenario Events in this Branch
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {targetTimeline.events.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-3 rounded-lg bg-[#151624] border border-white/5 flex items-start gap-2.5"
                  >
                    <Orbit className="w-3.5 h-3.5 text-[#A78BFA] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-[#F5F3FF] flex items-center gap-1.5">
                        <span>{evt.title}</span>
                        <span className="text-[10px] font-mono text-[#9292A5]">(Age {evt.age})</span>
                      </div>
                      <p className="text-[11px] text-[#9292A5] line-clamp-2 mt-0.5">
                        {evt.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Calibration Confirmation */}
          {calibratedSuccess && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3 animate-in fade-in duration-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold">Quantum Coordinates Calibrated:</span> Timeline parameters locked into the local engine. When Day 2 simulation unlocks, your universe will materialize instantly from these coordinates.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Footer */}
      <div className="p-6 sm:p-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#11121C] shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#9292A5]">
            <ShieldCheck className="w-4 h-4 text-[#A78BFA]" />
            <span>Fictional Scenario Engine • Zero Data Transmitted</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#9292A5] hover:text-[#F5F3FF] bg-[#151624] hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
            >
              Close
            </button>

            <button
              onClick={handleSimulateCalibration}
              disabled={isCalibrating}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#080910] bg-gradient-to-r from-[#77D9F7] via-[#A78BFA] to-[#F4B978] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(167,139,250,0.4)] flex items-center justify-center gap-2 font-heading cursor-pointer disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
            >
              {isCalibrating ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Calibrating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Lock Quantum Anchor</span>
                  <ArrowRight className="w-3 h-3" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
