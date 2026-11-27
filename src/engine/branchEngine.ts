/**
 * THE OTHER CHOICE — Multiverse Branching Engine
 * Pure local TypeScript engine for creating, managing, and navigating
 * multiple branching life continuations from existing timelines.
 */

import { 
  SimulationResult, 
  TimelineBranch, 
  BranchDecision, 
  BranchDecisionPoint, 
  LifeEvent, 
  OnboardingData, 
  LifeTimeline 
} from './types';

/**
 * Creates the initial root branch for Reality B.
 */
export function createRootBranch(realityB: LifeTimeline, user: OnboardingData): TimelineBranch {
  // Ensure pivotal events in Reality B have branch decision points attached
  const enrichedEvents = attachDecisionPointsToEvents(realityB.events, user);

  return {
    id: 'root-b',
    name: 'Reality B // Initial Alternate Path',
    shortLabel: 'Reality B',
    theme: realityB.theme,
    colorAccent: '#F4B978',
    parentBranchId: null,
    parentEventId: null,
    branchCreationAge: user.currentAge,
    decisionPrompt: user.decisionPrompt,
    ancestorBranchIds: [],
    events: enrichedEvents,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Attaches contextual second-choice decision points to pivotal events in a timeline.
 */
export function attachDecisionPointsToEvents(events: LifeEvent[], user: OnboardingData): LifeEvent[] {
  return events.map((event, index) => {
    // We attach decision points to milestone 2 (Age + 5, e.g. age 25 for a 20yo)
    // or milestone 3 (Age + 9) if they don't already have one
    const isPivotalEvent = index === 2 || index === 3;
    if (isPivotalEvent && !event.branchDecisionPoint) {
      const decisionPoint = generateDecisionPointForEvent(event, user);
      return {
        ...event,
        branchDecisionPoint: decisionPoint,
      };
    }
    return event;
  });
}

/**
 * Generates 3 meaningful, contextual choices for an event based on situation & theme.
 */
export function generateDecisionPointForEvent(event: LifeEvent, user: OnboardingData): BranchDecisionPoint {
  const promptLower = (user.decisionPrompt + ' ' + user.alternateDirection + ' ' + event.title + ' ' + event.description).toLowerCase();
  const isBusinessOrStartup = promptLower.includes('startup') || promptLower.includes('business') || promptLower.includes('company') || promptLower.includes('founder') || promptLower.includes('tech');
  const isRelocation = promptLower.includes('city') || promptLower.includes('move') || promptLower.includes('country') || promptLower.includes('abroad') || promptLower.includes('tokyo') || promptLower.includes('berlin');
  const isCreativeOrPassion = promptLower.includes('passion') || promptLower.includes('art') || promptLower.includes('creative') || promptLower.includes('music') || promptLower.includes('studio');

  if (isBusinessOrStartup) {
    return {
      eventId: event.id,
      age: event.age,
      situationContext: `At age ${event.age}, your venture encounters a severe operational and financial crucible: runway has contracted, co-founder alignment is tested, and the current business model requires radical reinvention.`,
      promptQuestion: 'How do you respond to the enterprise crisis?',
      options: [
        {
          id: `opt-${event.id}-rebuild`,
          title: 'Rebuild the startup',
          category: 'career',
          description: 'Refuse liquidation. Cut burn to the bone, renegotiate terms, and lead a focused product turnaround.',
          consequences: 'Severe short-term financial austerity, acute personal stress, but retains full founder equity and opens the door to sustainable resilience.',
          projectedShift: 'Autonomous persistence, high operational grit, non-linear recovery.',
        },
        {
          id: `opt-${event.id}-accept-job`,
          title: 'Accept a software engineering job',
          category: 'career',
          description: 'Wind down the venture responsibly and transition into a senior engineering or leadership role at an established organization.',
          consequences: 'Immediate financial equilibrium, structured work rhythms, and access to planetary-scale systems at the expense of sovereign autonomy.',
          projectedShift: 'Institutional compounding, predictable wealth accumulation, technical scale.',
        },
        {
          id: `opt-${event.id}-move-abroad`,
          title: 'Move abroad and start again',
          category: 'relocation',
          description: 'Take the hard-earned lessons from the venture, pack your essentials, and relocate to an international tech enclave to begin fresh.',
          consequences: 'Navigating unfamiliar immigration and social environments, starting from zero, but igniting serendipitous global partnerships.',
          projectedShift: 'Radical geographical rebirth, global networks, cross-cultural reinvention.',
        },
      ],
    };
  }

  if (isCreativeOrPassion) {
    return {
      eventId: event.id,
      age: event.age,
      situationContext: `At age ${event.age}, commercial reality collides with artistic integrity: a major commercial patron offers lucrative funding, but demands restrictive compromises on your creative direction.`,
      promptQuestion: 'Which path defines your creative destiny?',
      options: [
        {
          id: `opt-${event.id}-independent-studio`,
          title: 'Protect independent sovereignty',
          category: 'creative',
          description: 'Reject the patron offer. Build an open patron-supported studio and shoulder raw commercial uncertainty to protect pure creative voice.',
          consequences: 'Unpredictable cash flow, lean studio operations, but complete artistic sovereignty and deeply loyal direct community.',
          projectedShift: 'Pure creative freedom, grassroots patrons, artisanal mastery.',
        },
        {
          id: `opt-${event.id}-commercial-patron`,
          title: 'Accept commercial patronage',
          category: 'career',
          description: 'Partner with the commercial entity. Leverage substantial production budgets and global distribution while adapting to commercial parameters.',
          consequences: 'Financial comfort, international exhibition scale, but navigating boardrooms and creative compromises.',
          projectedShift: 'Mainstream cultural influence, large-scale budgets, institutional compromise.',
        },
        {
          id: `opt-${event.id}-new-medium`,
          title: 'Pivot into spatial & digital mediums',
          category: 'discovery',
          description: 'Leave traditional gallery channels entirely to pioneer interactive spatial computing, generative installations, and digital acoustics.',
          consequences: 'Steep technical learning curve, skepticism from traditionalists, but unlocking a massive new frontier.',
          projectedShift: 'Technological synthesis, boundary-breaking innovation, multidisciplinary reach.',
        },
      ],
    };
  }

  if (isRelocation) {
    return {
      eventId: event.id,
      age: event.age,
      situationContext: `At age ${event.age}, an existential threshold arrives in your adopted city: a major career anchor concludes, and you must decide whether to permanently anchor roots or redirect your trajectory.`,
      promptQuestion: 'Where does your life belong?',
      options: [
        {
          id: `opt-${event.id}-permanent-roots`,
          title: 'Establish permanent citizenship & roots',
          category: 'relocation',
          description: 'Commit fully to your adoptive country. Buy a home, master the language, and build a lifelong community anchor abroad.',
          consequences: 'Gradual loss of connection with origin homeland, but deep rootedness and cross-cultural synthesis.',
          projectedShift: 'Transnational citizenship, cultural mastery, deep foreign community.',
        },
        {
          id: `opt-${event.id}-return-origin`,
          title: 'Return home with global expertise',
          category: 'origin',
          description: 'Re-enter your native country to establish an international bridge studio, mentoring local talent with foreign perspectives.',
          consequences: 'Reverse culture shock upon return, but reconnecting with family and wielding rare international competitive advantage.',
          projectedShift: 'Repatriation leverage, family reconnection, cultural bridge builder.',
        },
        {
          id: `opt-${event.id}-nomadic-third`,
          title: 'Relocate to a third country',
          category: 'discovery',
          description: 'Embrace permanent wandering. Move to an entirely new continent and continent to construct another unexpected chapter.',
          consequences: 'Perpetual outsider status, lack of deep roots, but unmatched perspective and eternal novelty.',
          projectedShift: 'Global nomadism, endless reinvention, boundaryless horizons.',
        },
      ],
    };
  }

  // General Lifepath Crossroads
  return {
    eventId: event.id,
    age: event.age,
    situationContext: `At age ${event.age}, a major crossroad tests the trajectory of this universe: unforeseen friction prompts a critical reassessment of your priorities, relationships, and long-term commitments.`,
    promptQuestion: 'Which trajectory will redefine this timeline?',
    options: [
      {
        id: `opt-${event.id}-double-down`,
        title: 'Double down on the sovereign path',
        category: 'career',
        description: 'Refuse compromise. Commit deeper resources and energy to the autonomous direction despite current headwinds.',
        consequences: 'Requires intense sacrifice and resilience, but solidifies absolute ownership over your future.',
        projectedShift: 'Uncompromising autonomy, high conviction, resilient mastery.',
      },
      {
        id: `opt-${event.id}-structured-stability`,
        title: 'Integrate into structured stability',
        category: 'career',
        description: 'Pivot toward an established organization or partnership that offers stable infrastructure, mentorship, and collective security.',
        consequences: 'Trading complete autonomy for material peace of mind and institutional leverage.',
        projectedShift: 'Compounding security, institutional resources, balanced living.',
      },
      {
        id: `opt-${event.id}-unconventional-leap`,
        title: 'Make an unconventional radical pivot',
        category: 'discovery',
        description: 'Disregard both existing paths to launch into an entirely unconsidered field, lifestyle, or geographic coordinate.',
        consequences: 'Discarding previous momentum, starting as a beginner again, but discovering unimagined serendipity.',
        projectedShift: 'Radical novelty, beginner mindset, emergent discovery.',
      },
    ],
  };
}

/**
 * Creates a brand new branch from an event in an existing branch.
 */
export function createBranch(params: {
  simulation: SimulationResult;
  parentBranchId: string;
  parentEventId: string;
  decision: BranchDecision;
}): { simulation: SimulationResult; newBranch: TimelineBranch } {
  const { simulation, parentBranchId, parentEventId, decision } = params;

  // Retrieve parent branch
  const parentBranch = simulation.branches[parentBranchId];
  if (!parentBranch) {
    throw new Error(`Parent branch with ID "${parentBranchId}" not found in simulation.`);
  }

  // Find the event from which we are branching
  const branchEventIndex = parentBranch.events.findIndex((e) => e.id === parentEventId);
  if (branchEventIndex === -1) {
    throw new Error(`Event with ID "${parentEventId}" not found in parent branch "${parentBranchId}".`);
  }

  const branchEvent = parentBranch.events[branchEventIndex];
  const branchAge = branchEvent.age;

  // Count existing children of this parent branch to generate a clean short label
  const existingChildren = getBranchChildren(simulation, parentBranchId);
  const childIndex = existingChildren.length + 1;
  const parentLabel = parentBranch.shortLabel || 'B';
  const newShortLabel = parentBranchId === 'root-b' ? `B.${childIndex}` : `${parentLabel}.${childIndex}`;

  // Unique stable branch ID
  const sanitizedTitle = decision.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const newBranchId = `branch-${parentBranchId}-${branchEvent.age}-${sanitizedTitle}-${Date.now().toString(36)}`;

  // Ancestry chain
  const ancestorBranchIds = [...parentBranch.ancestorBranchIds, parentBranchId];

  // 1. Preserve all events before branch age
  const preservedEvents = parentBranch.events
    .slice(0, branchEventIndex + 1)
    .map((evt) => ({ ...evt }));

  // Modify the divergence event in the new branch to celebrate the second choice
  const divergenceEvent = preservedEvents[preservedEvents.length - 1];
  divergenceEvent.divergenceContext = `Second Choice Crossroads: Chosen "${decision.title}". ${decision.description}`;
  divergenceEvent.originBranchId = newBranchId;

  // 2. Generate future continuation events (ages strictly > branchAge)
  const continuationEvents = generateBranchContinuationEvents({
    user: simulation.user,
    parentBranch,
    branchAge,
    decision,
    newBranchId,
  });

  const allBranchEvents = attachDecisionPointsToEvents(
    [...preservedEvents, ...continuationEvents],
    simulation.user
  );

  const newBranch: TimelineBranch = {
    id: newBranchId,
    name: `Branch ${newShortLabel} // ${decision.title}`,
    shortLabel: newShortLabel,
    theme: `${decision.title}: ${decision.projectedShift}`,
    colorAccent: getBranchColorAccent(ancestorBranchIds.length),
    parentBranchId,
    parentEventId,
    branchCreationAge: branchAge,
    decisionPrompt: branchEvent.branchDecisionPoint?.promptQuestion || 'The Second Choice',
    chosenDecision: decision,
    ancestorBranchIds,
    events: allBranchEvents,
    createdAt: new Date().toISOString(),
  };

  // Immutably update simulation
  const updatedSimulation: SimulationResult = {
    ...simulation,
    branches: {
      ...simulation.branches,
      [newBranchId]: newBranch,
    },
    activeBranchId: newBranchId,
  };

  return { simulation: updatedSimulation, newBranch };
}

/**
 * Color variations for successive branch depths, strictly keeping within
 * the restrained warm amber/gold aesthetic.
 */
function getBranchColorAccent(depth: number): string {
  const accents = [
    '#F4B978', // Root alternate amber
    '#EAA75D', // Depth 1: warm golden amber
    '#E29648', // Depth 2: deep bronze amber
    '#D88836', // Depth 3: rich ochre
  ];
  return accents[depth % accents.length];
}

/**
 * Generates coherent fictional continuation events following the branch decision.
 */
function generateBranchContinuationEvents(params: {
  user: OnboardingData;
  parentBranch: TimelineBranch;
  branchAge: number;
  decision: BranchDecision;
  newBranchId: string;
}): LifeEvent[] {
  const { user, branchAge, decision, newBranchId } = params;
  const name = user.displayName.trim() || 'Traveler';

  // Future milestone ages strictly > branchAge
  const baseAges = [
    user.currentAge + 2,
    user.currentAge + 5,
    user.currentAge + 9,
    user.currentAge + 15,
    user.currentAge + 22,
  ];

  const futureAges = baseAges.filter((a) => a > branchAge);
  const continuationEvents: LifeEvent[] = [];

  const decisionLower = (decision.title + ' ' + decision.description).toLowerCase();
  const isRebuilding = decisionLower.includes('rebuild') || decisionLower.includes('sovereign') || decisionLower.includes('independent');
  const isJobOrCorporate = decisionLower.includes('job') || decisionLower.includes('structured') || decisionLower.includes('patron');

  futureAges.forEach((age, index) => {
    let title = '';
    let description = '';
    let category = decision.category;
    let parallelEcho = '';
    const isMajor = index === 0 || index === futureAges.length - 1;

    if (isRebuilding) {
      if (index === 0) {
        title = 'The Lean Turnaround & Re-Architecture';
        description = `At age ${age}, having committed to "${decision.title}", ${name} navigates the grueling crucible of reconstruction. Operating on minimal reserves, you strip away unneeded complexity, forge closer ties with core partners, and achieve the first cash-flow positive quarter.`;
        parallelEcho = `In the parent timeline, your path took a different trajectory without this intense restructuring crucible.`;
        category = 'career';
      } else if (index === 1) {
        title = 'Autonomous Enterprise Matures';
        description = `At age ${age}, the rebuilt venture achieves genuine market sovereignty. Having stared down near-extinction, ${name} has built an unshakeable operational playbook, commanding deep respect from colleagues and investors alike.`;
        parallelEcho = `In the original Reality A, you were navigating institutional hierarchy; here, you answer only to your own standards.`;
        category = 'discovery';
      } else {
        title = 'The Founder-Mentor Synthesis';
        description = `At age ${age}, looking across the decades, ${name} presides over an enduring institution born from the ashes of the age ${branchAge} setback. You now syndicate early investments into bold newcomers facing their own defining turning points.`;
        parallelEcho = `A timeline defined by enduring resilience and absolute sovereignty.`;
        category = 'existential';
      }
    } else if (isJobOrCorporate) {
      if (index === 0) {
        title = 'Integration into High-Scale Architecture';
        description = `At age ${age}, having chosen "${decision.title}", ${name} settles into an established technical organization. The transition from chaotic risk to structural predictability brings restored physical health, deep technical mastery, and access to planetary-scale infrastructure.`;
        parallelEcho = `In the alternate branch, you would still be wrestling with payroll and early venture volatility.`;
        category = 'career';
      } else if (index === 1) {
        title = 'Principal Architect & Global Influence';
        description = `At age ${age}, your rare blend of entrepreneurial hustle and corporate stability accelerates your ascent to Principal Director. You manage multi-million dollar initiatives across international offices with high compounding wealth.`;
        parallelEcho = `A life of deep material stability and compounding influence.`;
        category = 'career';
      } else {
        title = 'The Distinguished Fellow\'s Hearth';
        description = `At age ${age}, ${name} concludes a storied career of high-impact engineering leadership. With ample financial freedom and unbroken family stability, you look back with pride at the decision to prioritize sustainable longevity over perpetual burnout.`;
        parallelEcho = `In Reality B, you traded institutional safety for volatile independence.`;
        category = 'existential';
      }
    } else {
      // Abroad or Radical Pivot
      if (index === 0) {
        title = 'The Foreign Streetlights of Rebirth';
        description = `At age ${age}, having chosen "${decision.title}", ${name} reconstructs life from zero across an ocean. Navigating language nuances, foreign logistics, and unfamiliar professional circles, you discover an unexpected energy in being a complete beginner once again.`;
        parallelEcho = `In the previous timeline, you remained tied to familiar domestic gravity.`;
        category = 'relocation';
      } else if (index === 1) {
        title = 'The Transnational Laboratory';
        description = `At age ${age}, the foreign gamble flourishes into a singular cross-cultural practice. Inspired by "${decision.title}", ${name} establishes a distributed collective bridging multiple continents, publishing groundbreaking work that neither monoculture could have produced alone.`;
        parallelEcho = `Your memory albums contain skylines and friendships that only exist because you packed two bags and left.`;
        category = 'discovery';
      } else {
        title = 'The Global Nomad\'s Panorama';
        description = `At age ${age}, seated in a coastal residence overlooking international waters, ${name} marvels at the cascading universe sparked by the bold decision at age ${branchAge}. A life woven of cultural breadth, fearless adaptability, and unscripted wonder.`;
        parallelEcho = `In Reality A, your entire life played out within one familiar postal code.`;
        category = 'existential';
      }
    }

    continuationEvents.push({
      id: `evt-${newBranchId}-${age}-${category}`,
      title,
      age,
      category,
      realityType: 'reality-b',
      isMajor,
      description,
      originBranchId: newBranchId,
      parallelReflection: parallelEcho,
    });
  });

  return continuationEvents;
}

/**
 * Returns the ancestry chain of a branch (from root-b down to the branch).
 */
export function getBranchHistory(simulation: SimulationResult, branchId: string): TimelineBranch[] {
  const branch = simulation.branches[branchId];
  if (!branch) return [];

  const history: TimelineBranch[] = [];
  for (const ancestorId of branch.ancestorBranchIds) {
    if (simulation.branches[ancestorId]) {
      history.push(simulation.branches[ancestorId]);
    }
  }
  history.push(branch);
  return history;
}

/**
 * Returns all direct children of a given branch.
 */
export function getBranchChildren(simulation: SimulationResult, branchId: string): TimelineBranch[] {
  return Object.values(simulation.branches).filter(
    (b) => b.parentBranchId === branchId
  );
}

/**
 * Returns all sibling branches that share the exact same parent branch.
 */
export function getBranchSiblings(simulation: SimulationResult, branchId: string): TimelineBranch[] {
  const branch = simulation.branches[branchId];
  if (!branch || !branch.parentBranchId) {
    // If root-b, all other root branches or just itself
    return [branch].filter(Boolean);
  }
  return getBranchChildren(simulation, branch.parentBranchId);
}

/**
 * Validates chronological continuity of a branch.
 */
export function validateBranchContinuity(branch: TimelineBranch): boolean {
  if (!branch.events || branch.events.length === 0) return false;
  for (let i = 1; i < branch.events.length; i++) {
    if (branch.events[i].age <= branch.events[i - 1].age) {
      return false; // Chronology violated
    }
  }
  return true;
}

/**
 * Safely switches active branch in the simulation.
 */
export function switchActiveBranch(simulation: SimulationResult, branchId: string): SimulationResult {
  if (!simulation.branches[branchId]) {
    console.warn(`Attempted to switch to non-existent branch ID "${branchId}".`);
    return simulation;
  }
  return {
    ...simulation,
    activeBranchId: branchId,
  };
}
