import { SelectStatement } from "@/features/application/SelectStatement/SelectStatement";
import { FirstStepForm } from "./FirstStepForm/FirstStepForm";
import './card-form.css'
import { EmailBanner } from "@/shared/ui/EmailBanner/EmailBanner";

export const LoanFirstStep = () => {

    return (
        <section className='loan-first-step'>
            {step === 'form' && <FirstStepForm />}
            {step === 'select' && <SelectStatement />}
            {step === 'email' && 
            <EmailBanner
            title='The preliminary decision has been sent to your email.'
            instruction="In the letter you can get acquainted with the
            preliminary decision on the credit card." />}
        </section>
    )
}