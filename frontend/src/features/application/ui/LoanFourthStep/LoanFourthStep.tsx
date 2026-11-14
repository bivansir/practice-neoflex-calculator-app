import { useCurrentStep } from "@/entities/application/selectors"
import { FourthStepForm } from "./FourthStepForm/FourthStepForm"
import { useApplicationStore } from "@/entities/application/store";
import { EmailBanner } from "@/shared/ui/EmailBanner/EmailBanner";
import { ConfirmationCode } from "./ConfirmationCode/ConfirmationCode";
import './loan-fourth-step.css'
import { FinalMessage } from "./FinalMessage/FinalMessage";

export const LoanFourthStep = () => {
    const current = useCurrentStep();

    const completeFourthStep = useApplicationStore((s) => s.completeFlowStep);
    const completeFifthStep = useApplicationStore((s) => s.completeFlowStep);
    
    const handleSubmitForm = () => {
        completeFourthStep('fourthStep');
    };

    const handleVerify = () => {
        completeFifthStep('fifthStep');
    };
    
    return (
    <>
        {current === 'fourthStep' && <FourthStepForm onSubmit={handleSubmitForm} />}
        {current === 'fifthStep' &&
        (
            <div className="fourth-step__group">
                <EmailBanner
                title='Documents have been successfully signed and sent for approval'
                instruction="Within 10 minutes you will be sent a PIN code to your email for confirmation" />
                <ConfirmationCode onVerify={handleVerify} />
            </div>
        )}
        {current === 'done' &&
        (
            <div className="fourth-step__group">
                <FinalMessage />
            </div>
        )}
    </>
    )
}