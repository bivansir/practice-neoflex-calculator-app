import { useApplicationStore } from './store';
import type { FlowStep, FormStep, StepDataMap } from './types';

export const useCurrentStep = () => useApplicationStore((s) => s.step);

export const useIsStepAccessible = (step: FlowStep) =>
    useApplicationStore((s) => s.step === step);

export function useDraftFor<K extends FormStep>(step: K): StepDataMap[K] | undefined {
    return useApplicationStore((s) =>
      s.draft?.step === step ? (s.draft.data as StepDataMap[K]) : undefined,
    );
  }
  
export function useApplicationRedirect(): string | undefined {
    return useApplicationStore((s) => {
        const { step, applicationId } = s;

        if (step === 'preliminary') return '/loan';
        if (step === 'done') return applicationId ? `/loan/${applicationId}/success` : '/loan';
        if (!applicationId) return '/loan';

      switch (step) {
          case 'personal':  return `/loan/${applicationId}`;
          case 'document':  return `/loan/${applicationId}/document`;
          case 'sign':      return `/loan/${applicationId}/document/sign`;
      }
    });
}