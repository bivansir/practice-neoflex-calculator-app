import { SelectStatement } from "@/features/application/ui/LoanFirstStep/SelectStatement/SelectStatement";
import { FirstStepForm } from "./FirstStepForm/FirstStepForm";
import { useState } from "react";
import { dealService } from "@/features/application/api/service";
import { type LoanOfferDTO, type LoanStatementRequestDTO } from "@/features/application/api/dto";
import type { ErrorResponseDto } from "@/shared/api/apiClient";
import { FirstStepMessage } from "./FirstStepMessage/FirstStepMessage";
import { useApplicationStore } from "@/entities/application/store";
import { FormShell } from "@/shared/ui/FormShell/FormShell";

type Step = 'form' | 'select' | 'email';

export const LoanFirstStep = () => {
    const [step, setStep] = useState<Step>('form')

    const [offers, setOffers] = useState<LoanOfferDTO[]>([]);

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const completeFirstStep = useApplicationStore((s) => s.completeFirstStep)


    const handleSubmitForm = async (data: LoanStatementRequestDTO) => {
        setIsPending(true);
        setError(null);
        try {
            const receivedOffers = await dealService.statement(data);
            setOffers(receivedOffers);
            setStep('select');
        } catch (error) {
            const apiError = error as ErrorResponseDto;
            setError(apiError.message);
        } finally {
            setIsPending(false);
        };
    };

    const handleSelect = async (data: LoanOfferDTO) => {
        setIsPending(true);
        setError(null);
        try {
            await dealService.select(data);
            setStep('email');
            completeFirstStep(data.statementID);
        } catch (error) {
            const apiError = error as ErrorResponseDto;
            setError(apiError.message);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <FormShell isPending={isPending} error={error}>
            {step === 'form' && <FirstStepForm onSubmit={handleSubmitForm} />}
            {step === 'select' && <SelectStatement offers={offers} onSelect={handleSelect} />}
            {step === 'email' && <FirstStepMessage />}
        </FormShell>
    )
}