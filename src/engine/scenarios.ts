import { Simulation, LifeEvent, DecisionOption } from './types';

/**
 * Sample Decision Options for the core branching point
 */
export const SAMPLE_DECISIONS: DecisionOption[] = [
  {
    id: 'decision-current-path',
    title: 'Stay on the current path',
    tagline: 'Deepen the known foundation',
    description:
      'Commit to the safety of established continuity. Cultivate mastery within familiar systems, trade volatile horizons for guaranteed compounding influence, and safeguard existing bonds.',
    projectedReality: 'reality-a',
    primaryImpact: 'High predictability, structural stability, gradual institutional influence.',
    divergenceWeight: 25,
  },
  {
    id: 'decision-independence',
    title: 'Choose independence',
    tagline: 'Break free from systemic gravity',
    description:
      'Sever ties with bureaucratic safety nets to build an autonomous creative laboratory. Shoulder full existential risk in exchange for absolute intellectual and creative sovereignty.',
    projectedReality: 'reality-b',
    primaryImpact: 'Hyper-volatility, radical creative freedom, non-linear breakthroughs.',
    divergenceWeight: 80,
  },
  {
    id: 'decision-new-horizon',
    title: 'Begin somewhere new',
    tagline: 'Relocate across coordinates and cultures',
    description:
      'Abandon current geographic and social anchors to restart in an unfamiliar metropolis across the ocean. Reconstruct identity from zero within an unknown cultural landscape.',
    projectedReality: 'reality-b',
    primaryImpact: 'Complete social reset, unexpected alliances, linguistic and cognitive rebirth.',
    divergenceWeight: 95,
  },
];

/**
 * Fictional Sample Life Events across realities
 */
export const SAMPLE_EVENTS: LifeEvent[] = [
  {
    id: 'evt-different-beginning',
    title: 'A Different Beginning',
    age: 24,
    category: 'origin',
    realityType: 'divergence-point',
    description:
      'At 2 AM on a rainy Tuesday, an email notification illuminates your dark studio desk. Two contradictory contracts lie open on your screen: an executive tenure offer versus a cryptic invitation to lead an unproven experimental research enclave in Tokyo.',
    divergenceContext:
      'The exact crossroads where Reality A (the institutional trajectory) and Reality B (the autonomous frontier) split permanently into separate quantum branches.',
    metrics: {
      fulfillment: 50,
      stability: 65,
      novelty: 70,
      connection: 60,
    },
  },
  {
    id: 'evt-first-creation',
    title: 'The First Creation',
    age: 26,
    category: 'creative',
    realityType: 'reality-b',
    description:
      'Working from a converted warehouse loft in Yanaka, you unveil the "Chronos Resonance Engine" — an architectural acoustic installation that captures human memories through ambient atmospheric pressure. The prototype unexpectedly resonates with thousands of visitors.',
    divergenceContext:
      'In Reality A, this creative breakthrough remained a shelved sketch inside a corporate notebook that was never developed.',
    metrics: {
      fulfillment: 88,
      stability: 42,
      novelty: 95,
      connection: 75,
    },
  },
  {
    id: 'evt-unexpected-opportunity',
    title: 'An Unexpected Opportunity',
    age: 29,
    category: 'career',
    realityType: 'reality-a',
    description:
      'Promoted to Director of Strategic Systems at the Global Synthetics Institute. You are granted unprecedented resources, managing a multidisciplinary team of sixty researchers across Zurich and Singapore.',
    divergenceContext:
      'You achieved unparalleled institutional authority and financial security, while occasionally staring at the night sky wondering what was sacrificed.',
    metrics: {
      fulfillment: 72,
      stability: 92,
      novelty: 58,
      connection: 70,
    },
  },
  {
    id: 'evt-new-horizon',
    title: 'A New Horizon',
    age: 33,
    category: 'discovery',
    realityType: 'reality-b',
    description:
      'After years of independent nomadism, your autonomous studio launches an open-source decentralized consciousness archive. You watch live telemetry as nodes activate across six continents from a coastal cliff in Portugal.',
    divergenceContext:
      'A reality defined by boundless geographical freedom and self-determination, woven with rare serendipities that the structured path could never yield.',
    metrics: {
      fulfillment: 94,
      stability: 68,
      novelty: 98,
      connection: 86,
    },
  },
];

/**
 * Archetypal Prototype Simulation for Day 1
 */
export const PROTOTYPE_SIMULATION: Simulation = {
  id: 'sim-the-divergence-crossroads',
  title: 'The Great Divergence',
  subtitle: 'Institutional Security vs. Radical Autonomous Creation',
  premise:
    'At age 24, you stand at the pivotal threshold between a guaranteed path of institutional success and the terrifying leap into self-directed sovereign exploration.',
  anchorAge: 24,
  promptQuestion: 'Which trajectory will define your universe?',
  decisions: SAMPLE_DECISIONS,
  timelines: {
    realityA: {
      id: 'timeline-reality-a',
      realityId: 'reality-a',
      name: 'Reality A: The Architecture of Mastery',
      theme: 'Security, Compounding Structure & Institutional Command',
      colorAccent: '#77D9F7',
      events: [
        SAMPLE_EVENTS[0], // A Different Beginning
        SAMPLE_EVENTS[2], // An Unexpected Opportunity
      ],
      overallMetrics: {
        fulfillment: 74,
        stability: 91,
        novelty: 56,
        connection: 72,
      },
    },
    realityB: {
      id: 'timeline-reality-b',
      realityId: 'reality-b',
      name: 'Reality B: The Uncharted Orbit',
      theme: 'Sovereignty, Radical Novelty & Creative Discovery',
      colorAccent: '#F4B978',
      events: [
        SAMPLE_EVENTS[0], // A Different Beginning
        SAMPLE_EVENTS[1], // The First Creation
        SAMPLE_EVENTS[3], // A New Horizon
      ],
      overallMetrics: {
        fulfillment: 92,
        stability: 58,
        novelty: 96,
        connection: 82,
      },
    },
  },
  createdAt: '2026-11-24',
  version: '1.0.0',
};
