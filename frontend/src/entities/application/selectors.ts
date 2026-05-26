import { useApplicationStore } from './store';

export const useCurrentStep = () => useApplicationStore((s) => s.step);