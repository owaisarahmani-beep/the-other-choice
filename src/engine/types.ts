/**
 * THE OTHER CHOICE — Local Scenario Engine Foundation
 * Core TypeScript definitions for multiverse life simulation & onboarding
 */

export type RealityType = 'reality-a' | 'reality-b' | 'divergence-point';

export type EventCategory = 
  | 'origin' 
  | 'career' 
  | 'relationship' 
  | 'discovery' 
  | 'creative' 
  | 'existential' 
  | 'relocation'
  | 'crisis';

export type LifeSituation =
  | 'studying'
  | 'working'
  | 'building_business'
  | 'exploring_opportunities'
  | 'taking_a_break'
  | 'other';

export interface TimelineMetrics {
  fulfillment: number; // 0 - 100
  stability: number;   // 0 - 100
  novelty: number;     // 0 - 100
  connection: number;  // 0 - 100
}

export interface LifeEvent {
  id: string;
  title: string;
  age: number;
  category: EventCategory;
  realityType: RealityType;
  description: string;
  divergenceContext?: string;
  parallelReflection?: string; // What happened in the other reality at this age
  isMajor?: boolean;           // Significant turning point vs ordinary progression
  metrics?: Partial<TimelineMetrics>;
}

export interface DecisionOption {
  id: string;
  title: string;
  tagline: string;
  description: string;
  projectedReality: 'reality-a' | 'reality-b';
  primaryImpact: string;
  divergenceWeight: number; // 0 - 100 magnitude of timeline divergence
}

export interface LifeTimeline {
  id: string;
  realityId: 'reality-a' | 'reality-b';
  name: string;
  theme: string;
  colorAccent: string; // Cool blue (#77D9F7) or Warm amber (#F4B978)
  events: LifeEvent[];
  overallMetrics: TimelineMetrics;
}

export interface OnboardingData {
  displayName: string;
  currentAge: number;
  lifeSituation: LifeSituation;
  customSituation?: string;
  decisionPrompt: string;       // e.g. "What if I moved to another city?"
  alternateDirection: string;   // e.g. "Relocated to Berlin to build spatial audio tools"
}

export interface SimulationResult {
  id: string;
  user: OnboardingData;
  realityA: LifeTimeline;
  realityB: LifeTimeline;
  createdAt: string;
  version: string;
  disclaimer: string;
}

export interface Simulation {
  id: string;
  title: string;
  subtitle: string;
  premise: string;
  anchorAge: number;
  promptQuestion: string;
  decisions: DecisionOption[];
  timelines: {
    realityA: LifeTimeline;
    realityB: LifeTimeline;
  };
  createdAt: string;
  version: string;
}
