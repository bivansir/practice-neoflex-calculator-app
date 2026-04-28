import { SliderElement } from "@/shared/components/Slider/SliderElement"
import './first-step-form.css'
import { TextInput, EmailInput, DateInput, NumericInput} from "@/shared/components/Input/Input";
import { SelectInput } from "@/shared/components/Input/SelectInput";
import { Button } from "@/shared/components/Button/Button";
import { FormProvider, useForm } from "react-hook-form";
import { BorderStyle, Divider, Orientation } from "@/shared/components/Divider/Divider";
import { validateAge, validateLength } from "@/shared/components/Input/validators";
import { AmountInput } from "@/widgets/CardForm/FirstStepForm/AmountInput/AmountInput";

type FormData = {
    firstName: string;
    lastName: string;
    patronymic?: string
    term: number;
    amount: number;
    email: string;
    birthdate: Date;
    passportSeries: string;
    passportNumber: string;

}

const options = [
        { value: 6, label: '6 months' },
        { value: 12, label: '9 months' },
        { value: 18, label: '1 year' },
        { value: 24, label: '1,5 years' }
    ];

const amountMin = 15000, amountMax = 600000;

export const FirstStepForm = () => {
    const methods = useForm<FormData>({ mode: "onChange"})
    const amount = methods.watch("amount");

    return (
        <FormProvider {...methods}>
            <form className='first-step-form'>
                <div className='first-step-form__block--row'>
                    <div className='first-step-form__slider'>
                        <div className='first-step-form__header'>
                            <h2 className='text text--spaced'>
                                Customize your card
                            </h2>
                            <p className='text text--spaced'>Step 1 of 5</p>
                        </div>
                        <SliderElement
                            name='amount'
                            title="Select amount"
                            min={amountMin}
                            max={amountMax}
                            step={1000}/>
                    </div>
                    <Divider
                     orientation={Orientation.Vertical}
                     borderStyle={BorderStyle.Dashed}>
                    </Divider>
                    <div className='first-step-form__summary'>
                        <h3 className='text text--spaced'>You have chosen the amount</h3>
                        <AmountInput
                            name="amount"
                            label=""
                            min={amountMin}
                            max={amountMax} />
                    </div>
                </div>
                <div className='first-step-form__block--column'>
                    <h3 className='text'>Contact Information</h3>
                    <div className='first-step-form__block-grid'>
                        <TextInput
                            name='lastName'
                            label='Your Last Name' 
                            placeholder="For Example Doe"
                            isRequired={true} />
                        <TextInput
                            name='firstName'
                            label='Your First Name' 
                            placeholder="For Example John"
                            isRequired={true} />
                        <TextInput
                            name='patronymic'
                            label='Your Patronymic' 
                            placeholder="For Example Victorovich"
                            isRequired={false} />
                        <SelectInput
                            name='term'
                            label='Select term'
                            options={options}
                            defaultValue={6} />
                        <EmailInput
                            name='email'
                            label='Your Email' 
                            placeholder="For Example test@gmail.com"
                            isRequired={true} />
                        <DateInput
                            name='birthdate'
                            label='Your date of birth' 
                            placeholder="Select date"
                            isRequired={true} 
                            validate={validateAge}/>
                        <NumericInput
                            name='passportSeries'
                            label='Your Passport Series' 
                            placeholder="0000"
                            isRequired={true}
                            validate={validateLength(4)} />
                        <NumericInput
                            name='passportNumber'
                            label='Your Passport Number' 
                            placeholder="000000"
                            isRequired={true}
                            validate={validateLength(6)} />
                    </div>
                </div>
                <Button className='button--right-aligned'
                 name='Continue'
                 type='submit'/>
            </form>
        </FormProvider>
    )
}