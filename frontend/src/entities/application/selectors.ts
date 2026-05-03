import { useApplicationStore } from './store';
import type { StepDataMap, StepKey } from './types';

export function useDraftFor<K extends StepKey>(
  step: K,
): StepDataMap[K] | undefined {
  return useApplicationStore((s) =>
    s.draft?.step === step ? (s.draft.data as StepDataMap[K]) : undefined,
  );
}

export function selectCurrentStep(): StepKey | null {
  const completed = useApplicationStore.getState().completedSteps;
  if (completed.length === 0) return 'first';
  if (completed.length >= STEP_ORDER.length) return null;
  return STEP_ORDER[completed.length];
}

export function useCurrentStep(): StepKey | null {
  return useApplicationStore((s) => {
    if (s.completedSteps.length === 0) return 'first';
    if (s.completedSteps.length >= STEP_ORDER.length) return null;
    return STEP_ORDER[s.completedSteps.length];
  });
}

export function useIsStepAccessible(step: StepKey): boolean {
  const current = useCurrentStep();
  return current === step;
}