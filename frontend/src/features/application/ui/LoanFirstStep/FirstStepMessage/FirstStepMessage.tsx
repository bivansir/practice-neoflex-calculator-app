import { EmailBanner } from "@/shared/ui/EmailBanner/EmailBanner"
import './first-step-message.css'


export const FirstStepMessage = () => {
    return (
        <div className='first-step-message'>
            <EmailBanner
            title='The preliminary decision has been sent to your email.'
            instruction="In the letter you can get acquainted with the
            preliminary decision on the credit card." />
        </div>
    )
}