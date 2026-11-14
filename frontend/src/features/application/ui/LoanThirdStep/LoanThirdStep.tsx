import { useApplicationStore } from "@/entities/application/store";
import { ThirdStepForm } from "./ThirdStepForm/ThirdStepForm";
import { EmailBanner } from "@/shared/ui/EmailBanner/EmailBanner";
import { useCurrentStep } from "@/entities/application/selectors";

export const LoanThirdStep = () => {

    const current = useCurrentStep();
    const completeThirdStep = useApplicationStore((s) => s.completeFlowStep);

    const handleSubmitForm = () => {
            completeThirdStep('thirdStep');
        };


    return (
        <>
            {current === 'thirdStep' ? <ThirdStepForm onSubmit={handleSubmitForm} /> :
            <EmailBanner
            title='Documents are formed'
            instruction='Documents for signing will be sent to your email' />
            }
        </>
    )
}