import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Draft, StepDataMap, FlowStep } from './types';

interface ApplicationState {
    applicationId: string | null;
    step: FlowStep;
    draft: Draft | null;
}

interface ApplicationActions {
    completeFirstStep: () => void;
    completeSelectStatement: () => void;
    enterFlow: (applicationId: string) => void;
    completeFlowStep: (step: FormStep) => void;

  saveDraft: <K extends FormStep>(step: K, data: StepDataMap[K]) => void;
  reset: () => void;
}

type ApplicationStore = ApplicationState & ApplicationActions;

const initialState: ApplicationState = {
    applicationId: null,
    completedSteps: [],
    draft: null,
};

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set) => ({
      ...initialState,

      startApplication: (id) =>
        set({
          applicationId: id,
          completedSteps: ['first'],
          draft: null,
        }),

      saveDraft: (step, data) =>
        set({ draft: { step, data } as Draft }),

      completeStep: (step) =>
        set((state) => ({
          completedSteps: state.completedSteps.includes(step)
            ? state.completedSteps
            : [...state.completedSteps, step],
          draft: null,
        })),

      reset: () => set(initialState),
    }),
    {
      name: 'loan-application',
      partialize: (state) => ({
        applicationId: state.applicationId,
        completedSteps: state.completedSteps,
        draft: state.draft,
      }),
      version: 1,
    },
  ),
);