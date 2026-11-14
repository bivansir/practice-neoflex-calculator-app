import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type FlowStep, STEP_ORDER, type FirstStepForm, type SecondStepForm } from './types';

interface ApplicationState {
    applicationId: string | null;
    step: FlowStep;

    firstStepFormDraft: FirstStepForm | null;
    secondStepFormDraft: SecondStepForm | null;
}

interface ApplicationActions {
    completeFirstStep: (applicationId: string) => void;
    completeFlowStep: (step: FlowStep) => void;

    saveFirstStepFormDraft: (data: FirstStepForm) => void;
    saveSecondStepFormDraft: (data: SecondStepForm) => void;
    reset: () => void;
}

const initialState: ApplicationState = {
    applicationId: null,
    step: 'firstStep',
    firstStepFormDraft: null,
    secondStepFormDraft: null
};

export const useApplicationStore = create<ApplicationState & ApplicationActions>()(
    persist(
        (set) => ({
            ...initialState,

            completeFirstStep: (applicationId) =>
                set(() => {
                    return { applicationId, step: 'secondStep', draft: null };
                }),

            completeFlowStep: (step: FlowStep) => set(() => {
                let nextStep: FlowStep;

                const currentIdx = STEP_ORDER.indexOf(step)
                currentIdx === STEP_ORDER.length - 1
                ? nextStep = STEP_ORDER[0] 
                : nextStep = STEP_ORDER[currentIdx + 1]

                return {step: nextStep, draft: null}
              }),

            saveFirstStepFormDraft: (data) => set({ firstStepFormDraft: data}),
            saveSecondStepFormDraft: (data) => set({ secondStepFormDraft: data}),

            reset: () => set({...initialState}),
        }),
        {
            name: 'loan-application',
            partialize: (s) => ({
                step: s.step,
                firstStepFormDraft: s.firstStepFormDraft,
                secondStepFormDraft: s.secondStepFormDraft,
            }),
            version: 1,
        },
    ),
);