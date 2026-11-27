import React, { useState, useEffect } from 'react';
import { SimulationResult, LifeEvent, LifeTimeline, BranchDecision } from '../../engine/types';
import { ParallelTimeline } from '../timeline/ParallelTimeline';
import { EventDetailDrawer } from '../timeline/EventDetailDrawer';
import { BranchLineageBar } from '../timeline/BranchLineageBar';
import { SecondChoiceModal } from '../timeline/SecondChoiceModal';
import { ArrowLeft, RefreshCw, GitFork, Sparkles } from 'lucide-react';
import { SITUATION_LABELS } from '../../engine/generator';
import { createBranch, switchActiveBranch } from '../../engine/branchEngine';
import { saveSimulation } from '../../utils/storage';

interface SimulationViewProps {
  simulation: SimulationResult;
  onNewSimulation: () => void;
  onExit: () => void;
  onSimulationUpdate?: (updated: SimulationResult) => void;
}

export const SimulationView: React.FC<SimulationViewProps> = ({
  simulation: initialSimulation,
  onNewSimulation,
  onExit,
  onSimulationUpdate,
}) => {
  const [currentSim, setCurrentSim] = useState<SimulationResult>(initialSimulation);
  const [selectedEvent, setSelectedEvent] = useState<LifeEvent | null>(null);
  const [secondChoiceEvent, setSecondChoiceEvent] = useState<LifeEvent | null>(null);

  // Sync state if initialSimulation prop changes from outside
  useEffect(() => {
    setCurrentSim(initialSimulation);
  }, [initialSimulation]);

  const { user, realityA } = currentSim;

  // Resolve currently active branch
  const activeBranchId = currentSim.activeBranchId || 'root-b';
  const activeBranch =
    currentSim.branches[activeBranchId] ||
    currentSim.branches['root-b'] ||
    Object.values(currentSim.branches)[0];

  // Construct active timeline B for the parallel view
  const activeTimelineB: LifeTimeline = {
    id: activeBranch.id,
    realityId: 'reality-b',
    name: activeBranch.name,
    theme: activeBranch.theme,
    colorAccent: activeBranch.colorAccent,
    events: activeBranch.events,
    overallMetrics: currentSim.realityB.overallMetrics,
  };

  const handleSelectBranch = (branchId: string) => {
    const updated = switchActiveBranch(currentSim, branchId);
    setCurrentSim(updated);
    saveSimulation(updated);
    onSimulationUpdate?.(updated);
  };

  const handleConfirmBranch = (decision: BranchDecision) => {
    if (!secondChoiceEvent) return;
    const { simulation: updated } = createBranch({
      simulation: currentSim,
      parentBranchId: activeBranch.id,
      parentEventId: secondChoiceEvent.id,
      decision,
    });
    setCurrentSim(updated);
    saveSimulation(updated);
    onSimulationUpdate?.(updated);
    setSecondChoiceEvent(null);
  };

  const handleOpenSecondChoice = (event: LifeEvent) => {
    setSecondChoiceEvent(event);
  };

  return (
    <div className="min-h-screen bg-[#080910] text-[#F5F3FF] selection:bg-[#A78BFA]/30 selection:text-[#F5F3FF] pb-24">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 bg-[#080910]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Back Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="p-1.5 rounded-lg text-[#9292A5] hover:text-[#F5F3FF] hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-white/20 cursor-pointer"
              aria-label="Return to landing overview"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              {/* Minimal geometric logo */}
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#77D9F7]/50" />
                <div className="absolute inset-0.5 rounded-full border border-[#F4B978]/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#F5F3FF]" />
              </div>
              <span className="font-heading font-bold text-sm tracking-wider text-[#F5F3FF]">
                THE OTHER CHOICE
              </span>
            </div>
          </div>

          {/* Central Active Explorer Coordinate */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#9292A5]">
            <span className="text-[#F5F3FF] font-medium">{user.displayName.toUpperCase()}</span>
            <span className="text-[#606075]">•</span>
            <span>ANCHOR AGE {user.currentAge}</span>
          </div>

          {/* Direct Action Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onNewSimulation}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-[#F5F3FF] bg-[#11121C] hover:bg-[#161724] border border-white/10 hover:border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>New Decision</span>
            </button>

            <button
              onClick={onExit}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-[#9292A5] hover:text-[#F5F3FF] bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Overview
            </button>
          </div>
        </div>
      </header>

      {/* Main Simulation Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Compact Asymmetric Editorial Header (No empty bloated hero) */}
        <div className="mb-10 pb-8 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Persona and Divergence Crossroads */}
            <div className="lg:col-span-6 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#606075]">
                Parallel Life Simulation // Anchor Point: Age {user.currentAge}
              </div>
              <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#F5F3FF]">
                The Two Lives of {user.displayName}
              </h1>
              <p className="text-sm text-[#9292A5] leading-relaxed max-w-xl">
                Anchored at age {user.currentAge} as someone {SITUATION_LABELS[user.lifeSituation].toLowerCase()}.
                Every milestone below demonstrates how a single decision irrevocably alters human relationships, creative work, and the fabric of daily reality.
              </p>
            </div>

            {/* Right: The Crossroads Summary Panel */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              {/* Reality A Summary */}
              <div className="p-4 rounded-xl bg-[#0c0d16] border border-[#77D9F7]/25 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#77D9F7] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#77D9F7]" />
                  <span>Reality A // Continuity</span>
                </div>
                <div className="text-[#9292A5] text-[11px] leading-relaxed">
                  Continued without divergence. Deepening existing institutional relationships and cultivating structural mastery.
                </div>
              </div>

              {/* Reality B / Active Branch Summary */}
              <div className="p-4 rounded-xl bg-[#0c0d16] border border-[#F4B978]/25 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#F4B978] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4B978]" />
                  <span>
                    {activeBranch.shortLabel} // {activeBranch.chosenDecision?.title || 'Alternate Horizon'}
                  </span>
                </div>
                <div className="text-[#F5F3FF] text-[11px] leading-relaxed line-clamp-3">
                  {activeBranch.chosenDecision ? activeBranch.theme : `"${user.alternateDirection}"`}
                </div>
              </div>
            </div>
          </div>

          {/* The Exact Turning Point Question & Second Choice Divergence */}
          <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#9292A5]">
            <div className="flex items-center gap-2">
              <GitFork className="w-4 h-4 text-[#A78BFA] shrink-0" />
              <span>
                Origin Crossroads: <strong className="text-[#F5F3FF] font-medium font-mono">"{user.decisionPrompt}"</strong>
              </span>
            </div>

            {activeBranch.chosenDecision && (
              <div className="flex items-center gap-1.5 text-[#F4B978] font-mono text-[11px] bg-[#F4B978]/10 px-2.5 py-1 rounded-md border border-[#F4B978]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#F4B978]" />
                <span>Active Branch Choice: <strong>"{activeBranch.chosenDecision.title}"</strong> (Age {activeBranch.branchCreationAge})</span>
              </div>
            )}
          </div>
        </div>

        {/* Multiverse Branch Lineage & Navigation Bar */}
        <BranchLineageBar
          simulation={currentSim}
          onSelectBranch={handleSelectBranch}
        />

        {/* The Parallel Timeline Ledger (The Core Hero Feature) */}
        <div className="mb-16">
          <ParallelTimeline
            realityA={realityA}
            realityB={activeTimelineB}
            onSelectEvent={(evt) => setSelectedEvent(evt)}
            selectedEventId={selectedEvent?.id}
            onOpenSecondChoice={handleOpenSecondChoice}
            activeBranchLabel={activeBranch.name}
            activeBranchAccentColor={activeBranch.colorAccent}
          />
        </div>

        {/* Quiet Editorial Footer */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#606075]">
          <div>
            Creative simulation by THE OTHER CHOICE. Not a predictive algorithm.
          </div>
          <button
            onClick={onNewSimulation}
            className="hover:text-[#F5F3FF] transition-colors underline cursor-pointer"
          >
            Formulate another crossroads decision
          </button>
        </div>
      </main>

      {/* Selected Event Detail Drawer */}
      <EventDetailDrawer
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onOpenSecondChoice={handleOpenSecondChoice}
      />

      {/* Second Choice Modal Dialog */}
      <SecondChoiceModal
        isOpen={!!secondChoiceEvent}
        event={secondChoiceEvent}
        onClose={() => setSecondChoiceEvent(null)}
        onConfirmBranch={handleConfirmBranch}
      />
    </div>
  );
};
