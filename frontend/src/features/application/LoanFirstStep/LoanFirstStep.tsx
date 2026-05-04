import { SelectStatement } from "@/features/application/LoanFirstStep/SelectStatement/SelectStatement";
import { FirstStepForm } from "./FirstStepForm/FirstStepForm";
import './loan-first-step.css'
import { useState } from "react";
import { dealService } from "@/features/application/api/service";
import { type LoanOfferDTO, type LoanStatementRequestDTO } from "@/features/application/api/dto";
import { Loader } from "@/shared/ui/Loader/Loader";
import type { ErrorResponseDto } from "@/shared/api/apiClient";
import { FirstStepMessage } from "./FirstStepMessage/FirstStepMessage";
import { useApplicationStore } from "@/entities/application/store";

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
            // TODO: delete
            setStep('select');
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
            // TODO: delete
            setStep('email');
        } finally {
            setIsPending(false);
        }
    }

    return (
        <section className='loan-first-step'>
            <div className={isPending ? 'loan-first-step__content--blurred' : 'loan-first-step__content'}>
                {error && <h2>{error}</h2>}
                {step === 'form' && <FirstStepForm onSubmit={handleSubmitForm} />}
                {step === 'select' && <SelectStatement offers={offers} onSelect={handleSelect} />}
                {step === 'email' && <FirstStepMessage />}
            </div>
            {isPending && <Loader />}
        </section>
    )
}