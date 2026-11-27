import { 
  OnboardingData, 
  SimulationResult, 
  LifeTimeline, 
  LifeEvent, 
  LifeSituation 
} from './types';
import { createRootBranch } from './branchEngine';

/**
 * Human-readable situation labels
 */
export const SITUATION_LABELS: Record<LifeSituation, string> = {
  studying: 'Completing studies / Academic pursuits',
  working: 'Employed / Corporate & professional path',
  building_business: 'Building an enterprise / Founder',
  exploring_opportunities: 'Exploring opportunities & crossroads',
  taking_a_break: 'Taking a reflective sabbatical / In transition',
  other: 'Personal custom situation',
};

/**
 * Generates an aligned pair of fictional parallel timelines
 * based on user onboarding parameters.
 * 100% local, deterministic yet nuanced, zero external APIs.
 */
export function generateSimulation(data: OnboardingData): SimulationResult {
  const { displayName, currentAge, lifeSituation, decisionPrompt, alternateDirection } = data;
  const name = displayName.trim() || 'Traveler';
  const age = Math.max(14, Math.min(100, Math.round(currentAge)));
  
  // Calculate synchronized age milestone intervals
  const milestoneAges = [
    age,                   // The Crossroads (Now)
    age + 2,               // The Immediate Ripple
    age + 5,               // The Distinctive Shift
    age + 9,               // The Crucible / Major Test
    age + 15,              // The Compounding Synthesis
    age + 22,              // The Long Horizon
  ];

  const realityAEvents: LifeEvent[] = [];
  const realityBEvents: LifeEvent[] = [];

  // Theme detection for narrative flavoring
  const promptLower = (decisionPrompt + ' ' + alternateDirection).toLowerCase();
  const isRelocation = promptLower.includes('city') || promptLower.includes('move') || promptLower.includes('country') || promptLower.includes('abroad');
  const isBusiness = promptLower.includes('business') || promptLower.includes('startup') || promptLower.includes('company') || promptLower.includes('founder');
  const isPassion = promptLower.includes('passion') || promptLower.includes('art') || promptLower.includes('creative') || promptLower.includes('music') || promptLower.includes('write');
  const isDegree = promptLower.includes('degree') || promptLower.includes('study') || promptLower.includes('university') || promptLower.includes('major');

  // Milestone 0: The Crossroads (Current Age)
  realityAEvents.push({
    id: `evt-a-${age}-origin`,
    title: 'The Anchored Continuity',
    age: milestoneAges[0],
    category: 'origin',
    realityType: 'reality-a',
    isMajor: true,
    description: `At age ${age}, ${name} evaluated "${decisionPrompt}", but chose to remain grounded in current coordinates as someone ${SITUATION_LABELS[lifeSituation].toLowerCase()}. You double down on existing commitments and master the nuances of the established path.`,
    parallelReflection: `In Reality B, you made the leap into ${alternateDirection || 'uncharted territory'}, bidding farewell to familiar routines.`,
    metrics: { fulfillment: 68, stability: 88, novelty: 42, connection: 75 },
  });

  realityBEvents.push({
    id: `evt-b-${age}-divergence`,
    title: 'The Great Divergence',
    age: milestoneAges[0],
    category: 'origin',
    realityType: 'reality-b',
    isMajor: true,
    description: `At age ${age}, ${name} crossed the threshold: "${alternateDirection}". You cut lingering safety ties, embraced uncertainty, and began constructing an entirely different life architecture.`,
    parallelReflection: `In Reality A, you chose the known stability of continuing as someone ${SITUATION_LABELS[lifeSituation].toLowerCase()}.`,
    metrics: { fulfillment: 78, stability: 45, novelty: 95, connection: 62 },
  });

  // Milestone 1: Age + 2 (The Immediate Ripple)
  const aEvent1Title = isBusiness ? 'Consolidating Core Competence' : isDegree ? 'Institutional Recognition' : 'The Compounding Foundation';
  const aEvent1Desc = `Two years into the continuous trajectory, ${name} experiences the quiet power of steady compounding. Familiar colleagues trust your judgment, and your daily operating rhythm achieves reliable equilibrium.`;

  const bEvent1Title = isRelocation ? 'The Foreign Streetlamps' : isPassion ? 'The First Raw Portfolio' : 'The Crucible of Starting Over';
  const bEvent1Desc = `Two years after diverging toward "${alternateDirection}", the early honeymoon gives way to genuine grit. ${name} navigates unforeseen logistics, learns hard lessons in self-reliance, and celebrates the first unexpected breakthrough.`;

  realityAEvents.push({
    id: `evt-a-${milestoneAges[1]}-compound`,
    title: aEvent1Title,
    age: milestoneAges[1],
    category: 'career',
    realityType: 'reality-a',
    isMajor: false,
    description: aEvent1Desc,
    parallelReflection: `In Reality B, you are working late into the night in an unfamiliar setting, wrestling with the steep learning curve of autonomy.`,
    metrics: { fulfillment: 72, stability: 89, novelty: 48, connection: 78 },
  });

  realityBEvents.push({
    id: `evt-b-${milestoneAges[1]}-crucible`,
    title: bEvent1Title,
    age: milestoneAges[1],
    category: isRelocation ? 'relocation' : isPassion ? 'creative' : 'career',
    realityType: 'reality-b',
    isMajor: false,
    description: bEvent1Desc,
    parallelReflection: `In Reality A, your days carry predictable order and steady professional validation.`,
    metrics: { fulfillment: 75, stability: 52, novelty: 90, connection: 66 },
  });

  // Milestone 2: Age + 5 (The Distinctive Shift)
  const aEvent2Title = 'Senior Authority & Deep Roots';
  const aEvent2Desc = `At ${milestoneAges[2]}, ${name} is considered an anchor within the established domain. You mentor incoming talent, command stable resources, and enjoy a warm, predictable community network.`;

  const bEvent2Title = isBusiness ? 'The Sovereign Venture Takes Flight' : isRelocation ? 'A New Dialect of Belonging' : 'An Unconventional Masterpiece';
  const bEvent2Desc = `At ${milestoneAges[2]}, the alternate bet proves its viability. Having committed to "${alternateDirection}", ${name} forges alliances with a diverse circle of iconoclasts and unveils a distinctive contribution that surprises skeptics.`;

  realityAEvents.push({
    id: `evt-a-${milestoneAges[2]}-anchor`,
    title: aEvent2Title,
    age: milestoneAges[2],
    category: 'relationship',
    realityType: 'reality-a',
    isMajor: true,
    description: aEvent2Desc,
    parallelReflection: `In Reality B, you are giving a keynote or sharing lessons from the unconventional road, living without institutional safety nets.`,
    metrics: { fulfillment: 76, stability: 92, novelty: 50, connection: 84 },
  });

  realityBEvents.push({
    id: `evt-b-${milestoneAges[2]}-sovereign`,
    title: bEvent2Title,
    age: milestoneAges[2],
    category: 'creative',
    realityType: 'reality-b',
    isMajor: true,
    description: bEvent2Desc,
    parallelReflection: `In Reality A, you are enjoying the deep respect and predictability of a high-tenure institutional veteran.`,
    metrics: { fulfillment: 88, stability: 64, novelty: 86, connection: 74 },
  });

  // Milestone 3: Age + 9 (The Major Test)
  const aEvent3Title = 'The Golden Handcuffs Dilemma';
  const aEvent3Desc = `At age ${milestoneAges[3]}, systemic restructuring prompts an internal reckoning. With high prestige and material security secured, ${name} spends quiet evenings reflecting on whether the safe path left certain creative fires unlit.`;

  const bEvent3Title = 'The Tempest & The Reinvention';
  const bEvent3Desc = `At age ${milestoneAges[3]}, a sudden macroeconomic or personal tremor strikes your independent trajectory. Because ${name} built resilience from the ground up, you pivot with agile grace, uncovering a second-order opportunity that others missed.`;

  realityAEvents.push({
    id: `evt-a-${milestoneAges[3]}-reckoning`,
    title: aEvent3Title,
    age: milestoneAges[3],
    category: 'existential',
    realityType: 'reality-a',
    isMajor: false,
    description: aEvent3Desc,
    parallelReflection: `In Reality B, you are navigating volatile waters, having honed the instinct to survive and adapt without relying on corporate structures.`,
    metrics: { fulfillment: 71, stability: 90, novelty: 46, connection: 80 },
  });

  realityBEvents.push({
    id: `evt-b-${milestoneAges[3]}-reinvention`,
    title: bEvent3Title,
    age: milestoneAges[3],
    category: 'discovery',
    realityType: 'reality-b',
    isMajor: false,
    description: bEvent3Desc,
    parallelReflection: `In Reality A, you are financially insulated from the storm, though occasionally wondering what risk-taking feels like.`,
    metrics: { fulfillment: 83, stability: 60, novelty: 92, connection: 78 },
  });

  // Milestone 4: Age + 15 (The Compounding Synthesis)
  const aEvent4Title = 'The Master Builder\'s Legacy';
  const aEvent4Desc = `At age ${milestoneAges[4]}, ${name} oversees significant collective initiatives. You have shaped policies, supported families, and cultivated lifelong bonds that have weathered decades together in one coherent landscape.`;

  const bEvent4Title = 'The Polymath Synthesis';
  const bEvent4Desc = `At age ${milestoneAges[4]}, the disparate threads of your alternate journey weave into a singular voice. Inspired by "${alternateDirection}", ${name} merges unexpected disciplines, mentoring a new generation eager to carve their own unorthodox paths.`;

  realityAEvents.push({
    id: `evt-a-${milestoneAges[4]}-legacy`,
    title: aEvent4Title,
    age: milestoneAges[4],
    category: 'career',
    realityType: 'reality-a',
    isMajor: true,
    description: aEvent4Desc,
    parallelReflection: `In Reality B, your portfolio spans three different industries and international chapters you never dreamed of at ${age}.`,
    metrics: { fulfillment: 82, stability: 94, novelty: 54, connection: 88 },
  });

  realityBEvents.push({
    id: `evt-b-${milestoneAges[4]}-polymath`,
    title: bEvent4Title,
    age: milestoneAges[4],
    category: 'discovery',
    realityType: 'reality-b',
    isMajor: true,
    description: bEvent4Desc,
    parallelReflection: `In Reality A, your influence is deeply concentrated in one pillar, backed by a lifetime of institutional capital.`,
    metrics: { fulfillment: 91, stability: 72, novelty: 84, connection: 82 },
  });

  // Milestone 5: Age + 22 (The Long Horizon)
  const aEvent5Title = 'The Calm of Unbroken Continuity';
  const aEvent5Desc = `At age ${milestoneAges[5]}, looking back across the decades, ${name} feels the profound peace of a life dedicated to steady cultivation. You left few things to chance, protected the people you love, and became a pillar of reliability.`;

  const bEvent5Title = 'The Panoramic Vista';
  const bEvent5Desc = `At age ${milestoneAges[5]}, seated in a space born of your own choices, ${name} marvels at how a single turning point at age ${age} branched into an entirely distinct cosmos of relationships, memories, and unexpected adventures.`;

  realityAEvents.push({
    id: `evt-a-${milestoneAges[5]}-peace`,
    title: aEvent5Title,
    age: milestoneAges[5],
    category: 'existential',
    realityType: 'reality-a',
    isMajor: true,
    description: aEvent5Desc,
    parallelReflection: `In Reality B, your memory albums contain faces, skylines, and projects that only exist because you took the leap.`,
    metrics: { fulfillment: 85, stability: 95, novelty: 50, connection: 90 },
  });

  realityBEvents.push({
    id: `evt-b-${milestoneAges[5]}-vista`,
    title: bEvent5Title,
    age: milestoneAges[5],
    category: 'existential',
    realityType: 'reality-b',
    isMajor: true,
    description: bEvent5Desc,
    parallelReflection: `In Reality A, your life was simpler, profoundly stable, and free from the turbulence of chronic reinvention.`,
    metrics: { fulfillment: 93, stability: 74, novelty: 88, connection: 85 },
  });

  const timelineA: LifeTimeline = {
    id: `timeline-reality-a-${Date.now()}`,
    realityId: 'reality-a',
    name: 'Reality A: The Known Horizon',
    theme: 'Continuous compounding, institutional mastery & steady social grounding',
    colorAccent: '#77D9F7',
    events: realityAEvents,
    overallMetrics: {
      fulfillment: 77,
      stability: 91,
      novelty: 49,
      connection: 83,
    },
  };

  const timelineB: LifeTimeline = {
    id: `timeline-reality-b-${Date.now()}`,
    realityId: 'reality-b',
    name: 'Reality B: The Uncharted Orbit',
    theme: 'Divergent sovereignty, high novelty & creative self-determination',
    colorAccent: '#F4B978',
    events: realityBEvents,
    overallMetrics: {
      fulfillment: 87,
      stability: 63,
      novelty: 89,
      connection: 78,
    },
  };

  const rootBranch = createRootBranch(timelineB, data);

  return {
    id: `sim-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    user: data,
    realityA: timelineA,
    realityB: timelineB,
    branches: {
      [rootBranch.id]: rootBranch,
    },
    activeBranchId: rootBranch.id,
    createdAt: new Date().toISOString(),
    version: '2.0.0',
    disclaimer: 'This simulation is an imaginative creative thought experiment. It is not an algorithmic prediction of real life.',
  };
}
