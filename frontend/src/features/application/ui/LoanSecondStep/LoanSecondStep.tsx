import { useCurrentStep } from "@/entities/application/selectors";
import { useApplicationStore } from "@/entities/application/store";
import { FormShell } from "@/shared/ui/FormShell/FormShell"
import { useState } from "react";
import { SecondStepForm } from "./SecondStepForm/SecondStepForm";
import { EmailBanner } from "@/shared/ui/EmailBanner/EmailBanner";
import type { DossierDTO } from "../../api/dto";
import type { ErrorResponseDto } from "@/shared/api/apiClient";

export const LoanSecondStep = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const current = useCurrentStep();
    const completeSecondStep = useApplicationStore((s) => s.completeFlowStep);

    const handleSubmitForm = async (data: DossierDTO) => {
            setIsPending(true);
            setError(null);
            try {
                // TODO: real logic
                completeSecondStep('secondStep');
            } catch (error) {
                const apiError = error as ErrorResponseDto;
                setError(apiError.message);
                // TODO: delete
                completeSecondStep('secondStep');
            } finally {
                setIsPending(false);
            };
        };


    return (
        <FormShell isPending={isPending} error={error}>
            {current === 'secondStep' ? <SecondStepForm onSubmit={handleSubmitForm} /> :
            <EmailBanner
            title='Wait for a decision on the application'
            instruction='The answer will come to your mail within 10 minutes' />
            }
        </FormShell>
    )
}