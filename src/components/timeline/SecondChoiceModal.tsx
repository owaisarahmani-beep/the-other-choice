import React, { useState, useEffect } from 'react';
import { X, GitFork, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { LifeEvent, BranchDecision, BranchDecisionPoint } from '../../engine/types';

interface SecondChoiceModalProps {
  isOpen: boolean;
  event: LifeEvent | null;
  onClose: () => void;
  onConfirmBranch: (decision: BranchDecision) => Promise<void> | void;
}

export const SecondChoiceModal: React.FC<SecondChoiceModalProps> = ({
  isOpen,
  event,
  onClose,
  onConfirmBranch,
}) => {
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Reset selected decision when modal opens with a new event
  useEffect(() => {
    if (isOpen && event?.branchDecisionPoint) {
      // Default to first option or null
      setSelectedDecisionId(event.branchDecisionPoint.options[0]?.id || null);
      setIsGenerating(false);
    }
  }, [isOpen, event]);

  // Keyboard accessibility
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isGenerating) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isGenerating, onClose]);

  if (!isOpen || !event || !event.branchDecisionPoint) return null;

  const decisionPoint: BranchDecisionPoint = event.branchDecisionPoint;
  const selectedDecision = decisionPoint.options.find((opt) => opt.id === selectedDecisionId) || null;

  const handleCreateBranch = async () => {
    if (!selectedDecision || isGenerating) return;
    setIsGenerating(true);
    try {
      await onConfirmBranch(selectedDecision);
      onClose();
    } catch (error) {
      console.error('Failed to create branch:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080910]/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="second-choice-modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#11121C] border border-[#F4B978]/30 rounded-2xl shadow-[0_0_50px_rgba(244,185,120,0.1)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Warm Amber Top Accent Line */}
        <div className="h-1 w-full bg-gradient-to-r from-[#F4B978] via-[#EAA75D] to-[#F4B978]" />

        {/* Header */}
        <div className="p-6 sm:p-8 pb-5 border-b border-white/10 flex items-start justify-between gap-4 shrink-0 bg-[#0c0d16]">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-[#F4B978]/15 border border-[#F4B978]/30 text-[#F4B978] font-bold tracking-wider uppercase flex items-center gap-1.5">
                <GitFork className="w-3.5 h-3.5" />
                The Second Choice
              </span>
              <span className="text-[#606075]">•</span>
              <span className="text-[#F5F3FF] font-medium">Milestone: Age {decisionPoint.age}</span>
            </div>

            <h3
              id="second-choice-modal-title"
              className="font-heading text-xl sm:text-2xl font-bold text-[#F5F3FF] tracking-tight"
            >
              Fork Alternate Timeline
            </h3>

            <p className="text-xs font-mono text-[#9292A5] mt-1.5 leading-relaxed">
              Branching from "{event.title}". All prior history before age {decisionPoint.age} will be preserved, and a newly diverged reality will branch forward.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={isGenerating}
            className="p-2 rounded-lg bg-white/5 text-[#9292A5] hover:text-[#F5F3FF] hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-white/20 disabled:opacity-40 cursor-pointer"
            aria-label="Close second choice dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1 overflow-y-auto">
          {/* Situation Context Box */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#0c0d16] border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#F4B978] font-semibold uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>The Crucible at Age {decisionPoint.age}</span>
            </div>
            <p className="text-sm text-[#F5F3FF] leading-relaxed">
              {decisionPoint.situationContext}
            </p>
            <div className="pt-2 text-xs font-mono text-[#A78BFA] font-medium">
              &gt; {decisionPoint.promptQuestion}
            </div>
          </div>

          {/* The 3 Branching Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#9292A5]">
              <span>Select Your Decision Path:</span>
              <span className="text-[#606075]">3 Mutually Exclusive Universes</span>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {decisionPoint.options.map((option, idx) => {
                const isSelected = selectedDecisionId === option.id;
                const optionLetter = String.fromCharCode(65 + idx); // A, B, C

                return (
                  <div
                    key={option.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => !isGenerating && setSelectedDecisionId(option.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (!isGenerating) setSelectedDecisionId(option.id);
                      }
                    }}
                    className={`p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#F4B978] ${
                      isSelected
                        ? 'border-[#F4B978] bg-[#1c1813] ring-1 ring-[#F4B978]/50 shadow-[0_0_25px_rgba(244,185,120,0.12)]'
                        : 'border-white/10 bg-[#0c0d16] hover:border-[#F4B978]/40 hover:bg-[#121320]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-6 h-6 rounded-md font-mono text-xs font-bold flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-[#F4B978] text-[#080910]'
                              : 'bg-white/10 text-[#9292A5]'
                          }`}
                        >
                          {optionLetter}
                        </span>
                        <h4
                          className={`font-heading text-base font-bold transition-colors ${
                            isSelected ? 'text-[#F4B978]' : 'text-[#F5F3FF]'
                          }`}
                        >
                          {option.title}
                        </h4>
                      </div>

                      <span className="text-[11px] font-mono uppercase text-[#606075] px-2 py-0.5 rounded bg-white/5 border border-white/5">
                        {option.category}
                      </span>
                    </div>

                    <p className="text-sm text-[#C5C5D8] leading-relaxed mb-3">
                      {option.description}
                    </p>

                    {/* Consequences & Projected Shifts */}
                    <div className="pt-3 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      <div>
                        <span className="text-[#9292A5] block mb-0.5">Direct Consequence:</span>
                        <span className="text-[#F5F3FF] leading-snug">{option.consequences}</span>
                      </div>
                      <div>
                        <span className="text-[#9292A5] block mb-0.5">Projected Shift:</span>
                        <span className="text-[#A78BFA] leading-snug">{option.projectedShift}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 sm:p-8 pt-4 pb-5 border-t border-white/10 bg-[#0c0d16] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs font-mono text-[#9292A5]">
            {selectedDecision ? (
              <span className="flex items-center gap-1.5 text-[#F5F3FF]">
                <CheckCircle2 className="w-4 h-4 text-[#F4B978]" />
                Selected: <strong className="text-[#F4B978]">{selectedDecision.title}</strong>
              </span>
            ) : (
              <span>Select one of the 3 decisions to branch the timeline.</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              disabled={isGenerating}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-[#9292A5] hover:text-[#F5F3FF] bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-40 cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleCreateBranch}
              disabled={!selectedDecision || isGenerating}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-[#080910] bg-[#F4B978] hover:bg-[#ffc88b] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(244,185,120,0.3)] cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#080910] border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Branch...</span>
                </>
              ) : (
                <>
                  <span>Confirm & Branch Reality</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
