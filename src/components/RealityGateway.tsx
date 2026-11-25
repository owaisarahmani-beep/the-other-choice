import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { OnboardingData, LifeSituation } from '../engine/types';
import { loadOnboardingDraft, saveOnboardingDraft, clearOnboardingDraft } from '../utils/storage';

interface RealityGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulationReady: (data: OnboardingData) => void;
}

const PRESET_DECISIONS = [
  'What if I chose a different degree?',
  'What if I moved to another city?',
  'What if I started my own business?',
  'What if I pursued my passion?',
  'What if I made a different career choice?',
];

const SITUATION_OPTIONS: { id: LifeSituation; label: string; description: string }[] = [
  { id: 'studying', label: 'Studying', description: 'Academic pursuits or completing degrees' },
  { id: 'working', label: 'Working', description: 'Employed within an established organization' },
  { id: 'building_business', label: 'Building a business', description: 'Founding or scaling an independent venture' },
  { id: 'exploring_opportunities', label: 'Exploring opportunities', description: 'At a transitional crossroads between paths' },
  { id: 'taking_a_break', label: 'Taking a break', description: 'Intentional sabbatical or personal reset' },
  { id: 'other', label: 'Other', description: 'A unique or combined life situation' },
];

export const RealityGateway: React.FC<RealityGatewayProps> = ({
  isOpen,
  onClose,
  onSimulationReady,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [displayName, setDisplayName] = useState('');
  const [currentAge, setCurrentAge] = useState<string>('24');
  const [lifeSituation, setLifeSituation] = useState<LifeSituation>('working');
  const [customSituation, setCustomSituation] = useState('');
  const [selectedPresetDecision, setSelectedPresetDecision] = useState<string>(PRESET_DECISIONS[1]);
  const [isCustomDecision, setIsCustomDecision] = useState(false);
  const [customDecisionText, setCustomDecisionText] = useState('');
  const [alternateDirection, setAlternateDirection] = useState('');

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Load any draft on mount
  useEffect(() => {
    const draft = loadOnboardingDraft();
    if (draft) {
      if (draft.displayName) setDisplayName(draft.displayName);
      if (draft.currentAge) setCurrentAge(String(draft.currentAge));
      if (draft.lifeSituation) setLifeSituation(draft.lifeSituation);
      if (draft.customSituation) setCustomSituation(draft.customSituation);
      if (draft.decisionPrompt) {
        if (PRESET_DECISIONS.includes(draft.decisionPrompt)) {
          setSelectedPresetDecision(draft.decisionPrompt);
          setIsCustomDecision(false);
        } else {
          setIsCustomDecision(true);
          setCustomDecisionText(draft.decisionPrompt);
        }
      }
      if (draft.alternateDirection) setAlternateDirection(draft.alternateDirection);
    }
  }, []);

  // Save draft on state changes
  useEffect(() => {
    const ageNum = parseInt(currentAge, 10);
    const activeDecision = isCustomDecision ? customDecisionText : selectedPresetDecision;
    saveOnboardingDraft({
      displayName,
      currentAge: isNaN(ageNum) ? 24 : ageNum,
      lifeSituation,
      customSituation,
      decisionPrompt: activeDecision,
      alternateDirection,
    });
  }, [
    displayName,
    currentAge,
    lifeSituation,
    customSituation,
    selectedPresetDecision,
    isCustomDecision,
    customDecisionText,
    alternateDirection,
  ]);

  // Modal accessibility
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const stepErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!displayName.trim()) {
        stepErrors.displayName = 'Please provide a display name or preferred moniker.';
      }
      const ageNum = parseInt(currentAge, 10);
      if (isNaN(ageNum) || ageNum < 14 || ageNum > 100) {
        stepErrors.currentAge = 'Please enter an age between 14 and 100.';
      }
    } else if (currentStep === 2) {
      if (!lifeSituation) {
        stepErrors.lifeSituation = 'Please select your current situation.';
      }
      if (lifeSituation === 'other' && !customSituation.trim()) {
        stepErrors.customSituation = 'Please briefly describe your current situation.';
      }
    } else if (currentStep === 3) {
      if (isCustomDecision && !customDecisionText.trim()) {
        stepErrors.decision = 'Please formulate your alternative turning point question.';
      }
    } else if (currentStep === 4) {
      if (!alternateDirection.trim() || alternateDirection.trim().length < 5) {
        stepErrors.alternateDirection = 'Please describe your alternate path with at least 5 characters.';
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      if (step < 4) {
        setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
      } else {
        handleFinalSubmit();
      }
    }
  };

  const handlePrevStep = () => {
    setErrors({});
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleFinalSubmit = () => {
    const ageNum = parseInt(currentAge, 10);
    const finalDecision = isCustomDecision ? customDecisionText.trim() : selectedPresetDecision;
    const finalData: OnboardingData = {
      displayName: displayName.trim(),
      currentAge: isNaN(ageNum) ? 24 : ageNum,
      lifeSituation,
      customSituation: lifeSituation === 'other' ? customSituation.trim() : undefined,
      decisionPrompt: finalDecision,
      alternateDirection: alternateDirection.trim(),
    };

    clearOnboardingDraft();
    onSimulationReady(finalData);
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#080910]/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gateway-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl my-auto rounded-2xl bg-[#11121C] border border-white/10 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 border-b border-white/5 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#606075] mb-2">
              Crossroads Calibration // Step {step} of 4
            </div>
            <h2 id="gateway-title" className="font-heading text-xl sm:text-2xl font-bold text-[#F5F3FF]">
              {step === 1 && 'Establish Coordinates'}
              {step === 2 && 'Present Reality'}
              {step === 3 && 'The Crossroads'}
              {step === 4 && 'The Alternate Horizon'}
            </h2>
            <p className="text-xs sm:text-sm text-[#9292A5] mt-1">
              {step === 1 && 'Enter your name and current age to calibrate the baseline timeline.'}
              {step === 2 && 'Ground your starting coordinates to shape Reality A.'}
              {step === 3 && 'Choose a defining crossroads you wish to re-examine.'}
              {step === 4 && 'Describe the path you chose on the other side.'}
            </p>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 text-[#9292A5] hover:text-[#F5F3FF] hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-white/20"
            aria-label="Close onboarding modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Minimal Progress Line */}
        <div className="px-6 sm:px-8 py-2.5 bg-[#0c0d16] border-b border-white/5 flex items-center justify-between text-xs font-mono text-[#606075] shrink-0">
          <div className="flex items-center gap-1.5 w-full max-w-xs">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-0.5 flex-1 rounded-full transition-colors ${
                  i <= step ? 'bg-[#F5F3FF]' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-mono">Step {step}/4</span>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* STEP 1: Name and Age */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="displayName" className="block text-xs font-mono uppercase tracking-wider text-[#F5F3FF] mb-2">
                  What should the simulation call you?
                </label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Maya, Julian, or Alex"
                  className="w-full px-4 py-3 rounded-lg bg-[#080910] border border-white/15 text-[#F5F3FF] placeholder-[#606075] focus:outline-none focus:border-white/40 transition-colors text-sm"
                  autoFocus
                />
                {errors.displayName && (
                  <p className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.displayName}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="currentAge" className="block text-xs font-mono uppercase tracking-wider text-[#F5F3FF] mb-2">
                  Your Current Age
                </label>
                <input
                  id="currentAge"
                  type="number"
                  min="14"
                  max="100"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(e.target.value)}
                  placeholder="24"
                  className="w-full px-4 py-3 rounded-lg bg-[#080910] border border-white/15 text-[#F5F3FF] placeholder-[#606075] focus:outline-none focus:border-white/40 transition-colors text-sm max-w-xs"
                />
                <span className="text-[11px] text-[#606075] block mt-1.5 font-mono">
                  Origin anchor point (T=0) for chronological milestones.
                </span>
                {errors.currentAge && (
                  <p className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.currentAge}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Current Life Situation */}
          {step === 2 && (
            <div className="space-y-4">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#F5F3FF] mb-1">
                Where are you currently stationed in life?
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SITUATION_OPTIONS.map((option) => {
                  const isSelected = lifeSituation === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setLifeSituation(option.id)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#151624] border-[#77D9F7]'
                          : 'bg-[#080910] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-heading font-semibold text-sm text-[#F5F3FF]">
                          {option.label}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-[#77D9F7] flex items-center justify-center text-[#080910]">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-[#9292A5] leading-relaxed">
                        {option.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {lifeSituation === 'other' && (
                <div className="mt-4 pt-3 border-t border-white/5">
                  <label htmlFor="customSituation" className="block text-xs font-mono text-[#F5F3FF] mb-2">
                    Describe your present situation:
                  </label>
                  <input
                    id="customSituation"
                    type="text"
                    value={customSituation}
                    onChange={(e) => setCustomSituation(e.target.value)}
                    placeholder="e.g. Navigating sabbatical while preparing an expedition"
                    className="w-full px-4 py-3 rounded-lg bg-[#080910] border border-white/15 text-[#F5F3FF] placeholder-[#606075] focus:outline-none focus:border-white/40 text-sm"
                  />
                  {errors.customSituation && (
                    <p className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.customSituation}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: The Crossroads Decision */}
          {step === 3 && (
            <div className="space-y-4">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#F5F3FF] mb-1">
                Which decision point do you want to explore differently?
              </label>

              <div className="space-y-2">
                {PRESET_DECISIONS.map((preset) => {
                  const isSelected = !isCustomDecision && selectedPresetDecision === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setSelectedPresetDecision(preset);
                        setIsCustomDecision(false);
                      }}
                      className={`w-full p-3.5 rounded-lg text-left border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#151624] border-[#A78BFA]'
                          : 'bg-[#080910] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="font-heading text-sm text-[#F5F3FF]">
                        {preset}
                      </span>
                      {isSelected && (
                        <div className="w-3.5 h-3.5 rounded-full bg-[#A78BFA] flex items-center justify-center text-[#080910] shrink-0 ml-2">
                          <Check className="w-2 h-2 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}

                {/* Custom Option */}
                <button
                  type="button"
                  onClick={() => setIsCustomDecision(true)}
                  className={`w-full p-3.5 rounded-lg text-left border transition-all flex items-center justify-between cursor-pointer ${
                    isCustomDecision
                      ? 'bg-[#151624] border-[#F4B978]'
                      : 'bg-[#080910] border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="font-heading text-sm text-[#F5F3FF]">
                    Write a custom "What if" question...
                  </span>
                  {isCustomDecision && (
                    <div className="w-3.5 h-3.5 rounded-full bg-[#F4B978] flex items-center justify-center text-[#080910] shrink-0 ml-2">
                      <Check className="w-2 h-2 stroke-[3]" />
                    </div>
                  )}
                </button>
              </div>

              {isCustomDecision && (
                <div className="mt-3 pt-3 border-t border-white/5">
                  <label htmlFor="customDecisionText" className="block text-xs font-mono text-[#F5F3FF] mb-2">
                    Your custom turning point question:
                  </label>
                  <input
                    id="customDecisionText"
                    type="text"
                    value={customDecisionText}
                    onChange={(e) => setCustomDecisionText(e.target.value)}
                    placeholder="e.g. What if I joined an independent research vessel?"
                    className="w-full px-4 py-3 rounded-lg bg-[#080910] border border-white/15 text-[#F5F3FF] placeholder-[#606075] focus:outline-none focus:border-[#F4B978] text-sm"
                    autoFocus
                  />
                  {errors.decision && (
                    <p className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.decision}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 4: The Alternate Vision & Review */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="alternateDirection" className="block text-xs font-mono uppercase tracking-wider text-[#F5F3FF] mb-2">
                  Describe what you chose in Reality B:
                </label>
                <textarea
                  id="alternateDirection"
                  rows={3}
                  value={alternateDirection}
                  onChange={(e) => setAlternateDirection(e.target.value)}
                  placeholder="e.g. Moved to Berlin to study sound engineering, worked in an acoustic research lab, and founded an independent studio."
                  className="w-full px-4 py-3 rounded-lg bg-[#080910] border border-white/15 text-[#F5F3FF] placeholder-[#606075] focus:outline-none focus:border-[#F4B978] text-sm leading-relaxed resize-none"
                  autoFocus
                />
                <span className="text-[11px] text-[#606075] block mt-1.5 font-mono">
                  Be descriptive: where did you relocate, what craft did you study, or what leap did you make?
                </span>
                {errors.alternateDirection && (
                  <p className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.alternateDirection}</span>
                  </p>
                )}
              </div>

              {/* Minimal Review Box */}
              <div className="p-4 rounded-xl bg-[#0c0d16] border border-white/10 space-y-2 text-xs font-mono">
                <span className="text-[#606075] uppercase tracking-wider block">
                  Divergence Coordinates
                </span>
                <div className="text-[#F5F3FF]">
                  {displayName || 'You'} at age {currentAge} // Reality B: {isCustomDecision ? customDecisionText : selectedPresetDecision}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 sm:p-8 pt-4 border-t border-white/5 flex items-center justify-between gap-3 bg-[#11121C] shrink-0">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider text-[#9292A5] hover:text-[#F5F3FF] bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider text-[#9292A5] hover:text-[#F5F3FF] bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={handleNextStep}
            className="px-6 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider text-[#080910] bg-[#F5F3FF] hover:bg-white transition-colors flex items-center gap-2 font-bold cursor-pointer"
          >
            {step < 4 ? (
              <>
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            ) : (
              <span>Generate Timelines</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
