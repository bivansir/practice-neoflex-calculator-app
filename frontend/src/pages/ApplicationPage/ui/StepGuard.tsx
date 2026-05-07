import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useCurrentStep } from '@/entities/application/selectors';
import { STEP_ORDER, type FlowStep } from '@/entities/application/types';


interface StepGuardProps {
    minStep: FlowStep;
    children: ReactNode;
}

export function StepGuard({ minStep, children }: StepGuardProps) {
    const current = useCurrentStep();

    const currentIndex = STEP_ORDER.indexOf(current);
    const minIndex = STEP_ORDER.indexOf(minStep);

    if (currentIndex < minIndex) {
        return <Navigate to="/404" replace />;
    }

    return <>{children}</>;
}