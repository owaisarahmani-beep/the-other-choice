import { SimulationResult, OnboardingData } from '../engine/types';

const SIMULATION_STORAGE_KEY = 'the_other_choice_active_simulation_v2';
const ONBOARDING_DRAFT_KEY = 'the_other_choice_onboarding_draft_v2';

/**
 * Saves a simulation result safely to localStorage
 */
export function saveSimulation(simulation: SimulationResult): void {
  try {
    const serialized = JSON.stringify(simulation);
    localStorage.setItem(SIMULATION_STORAGE_KEY, serialized);
  } catch (error) {
    console.warn('Unable to persist simulation to localStorage:', error);
  }
}

/**
 * Loads the active simulation from localStorage, with defensive validation
 */
export function loadSimulation(): SimulationResult | null {
  try {
    const raw = localStorage.getItem(SIMULATION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    
    // Defensive validation of essential shape
    if (
      parsed &&
      parsed.id &&
      parsed.user &&
      parsed.realityA &&
      parsed.realityB &&
      Array.isArray(parsed.realityA.events) &&
      Array.isArray(parsed.realityB.events)
    ) {
      return parsed as SimulationResult;
    }
    return null;
  } catch (error) {
    console.warn('Unable to parse stored simulation:', error);
    return null;
  }
}

/**
 * Removes the active simulation from localStorage
 */
export function clearSimulation(): void {
  try {
    localStorage.removeItem(SIMULATION_STORAGE_KEY);
  } catch (error) {
    console.warn('Unable to remove simulation from localStorage:', error);
  }
}

/**
 * Saves an onboarding draft in progress
 */
export function saveOnboardingDraft(draft: Partial<OnboardingData>): void {
  try {
    localStorage.setItem(ONBOARDING_DRAFT_KEY, JSON.stringify(draft));
  } catch (error) {
    console.warn('Unable to persist onboarding draft:', error);
  }
}

/**
 * Loads any existing onboarding draft
 */
export function loadOnboardingDraft(): Partial<OnboardingData> | null {
  try {
    const raw = localStorage.getItem(ONBOARDING_DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<OnboardingData>;
  } catch (error) {
    console.warn('Unable to parse onboarding draft:', error);
    return null;
  }
}

/**
 * Clears the onboarding draft
 */
export function clearOnboardingDraft(): void {
  try {
    localStorage.removeItem(ONBOARDING_DRAFT_KEY);
  } catch (error) {
    console.warn('Unable to clear onboarding draft:', error);
  }
}
