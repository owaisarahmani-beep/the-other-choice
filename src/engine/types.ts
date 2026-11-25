/**
 * THE OTHER SIDE — Local Scenario Engine Foundation
 * Core TypeScript definitions for multiverse life simulation
 */

export type RealityType = 'reality-a' | 'reality-b' | 'divergence-point';

export type EventCategory = 
  | 'origin' 
  | 'career' 
  | 'relationship' 
  | 'discovery' 
  | 'creative' 
  | 'existential' 
  | 'crisis';

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
  colorAccent: string; // Hex color: cool blue (#77D9F7) or warm amber (#F4B978)
  events: LifeEvent[];
  overallMetrics: TimelineMetrics;
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
