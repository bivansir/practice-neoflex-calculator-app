import { FormHeader } from "@/shared/ui/FormHeader/FormHeader"
import { Button } from "@/shared/ui/Button/Button"
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox"
import { useState } from "react"
import './fourth-step-form.css'

type FourthStepFormProps = {
    onSubmit: () => void
}


export const FourthStepForm = ({ onSubmit }: FourthStepFormProps) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    return (
        <div className='fourth-step-form'>
            <FormHeader
            title='Signing of documents'
            step={4} />
            <p className='fourth-step-form__disclaimer text text--tight'>
                Information on interest rates under bank deposit agreements with individuals.
                Center for Corporate Information Disclosure. Information of a professional
                participant in the securities market. Information about persons under
                whose control or significant influence the Partner Banks are. 
                By leaving an application, you agree to the processing of personal data, 
                obtaining information, obtaining access to a credit history, 
                using an analogue of a handwritten signature, an offer, a policy 
                regarding the processing of personal data, a form of consent to the
                processing of personal data.
            </p>
            <div className='fourth-step-form__document-group'>
                <a href='/your-document-placeholder'>
                    <img src='/src/assets/icons/file.svg'></img>
                </a>
                <h3 className='text text--tight'>Information on your card</h3>
            </div>
            <div className='foruth-step-form__submit-group'>
                <Checkbox
                name='agreement'
                label='I agree'
                onCheck={() => setIsChecked(!isChecked)}/>
                <Button name='Send' onClick = {() => onSubmit()} disabled={!isChecked} />
            </div>
        </div>
    )
}