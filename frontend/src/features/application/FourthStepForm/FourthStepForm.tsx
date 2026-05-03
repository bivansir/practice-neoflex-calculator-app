import { Button } from "@/shared/ui/Button/Button"
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox"

export const FourthStepForm = () => {
    return (
        <div>
            <div>
                <h2>Signing of documents</h2>
                <p>Step 4 of 5</p>
            </div>
            <p>
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
            <div>
                <a>
                    <img src='/src/assets/icons/file.svg'></img>
                </a>
                <h3>Information on your card</h3>
            </div>
            <div>
                <Checkbox
                name='agreement'
                label='I agree'/>
                <Button />
            </div>
        </div>
    )
}