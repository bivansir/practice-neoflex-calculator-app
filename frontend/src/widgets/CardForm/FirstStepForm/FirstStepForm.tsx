import { useState } from "react"
import { SliderElement } from "./SliderElement"
import './first-step-form.css'
import { TextInput, EmailInput, DateInput, NumericInput } from "../../../shared/Input/Input";
import { SelectInput } from "../../../shared/Input/SelectInput";
import { Button } from "../../../shared/Button/Button";
import { FormProvider, useForm } from "react-hook-form";

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

export const FirstStepForm = () => {
    const methods = useForm<FormData>()
    const amount = methods.watch("amount");

    const options = [
        { value: 1, label: '6 months' },
        { value: 9, label: '9 months' },
        { value: 12, label: '1 year' },
        { value: 18, label: '1,5 years' },
        { value: 24, label: '2 years' },
        { value: 36, label: '3 years' },
        { value: 48, label: '4 years' },
        { value: 60, label: '5 years' },
        { value: 72, label: '6 years' },
        { value: 84, label: '7 years' },
        { value: 120, label: '10 years' },
        { value: 180, label: '15 years' },
        { value: 240, label: '20 years' },
        { value: 300, label: '25 years' },
        { value: 360, label: '30 years' }
    ];

    return (
        <FormProvider {...methods}>
            <form className='first-step-form'>
                <div className='first-step-form__slider'>
                    <div className='container' >
                        <div className='first-step-form__header'>
                            <h2 className='first-step-form__header-title'>
                                Customize your card
                            </h2>
                            <label className='first-step-form__header-step'>Step 1 of 5</label>
                        </div>
                        <SliderElement
                            name='amount'
                            title="Amount"
                            min={15000}
                            max={600000}/>
                    </div>
                    <div className='horizontal-line'></div>
                    <div className='first-step-form__summary'>
                        <h3>You have chosen the amount</h3>
                        <p className='first-step-form__amount'>{amount}</p>
                    </div>
                </div>
                <div className='first-step-form__input'>
                    <h2>Contact Information</h2>
                    <div className='first-step-form__input-grid'>
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
                            isRequired={true} />
                        <NumericInput
                            name='passportSeries'
                            label='Your Passport Series' 
                            placeholder="0000"
                            isRequired={true}
                            min={4}
                            max={4} />
                        <NumericInput
                            name='passportNumber'
                            label='Your Passport Number' 
                            placeholder="000000"
                            isRequired={true}
                            min={6}
                            max={6} />
                    </div>
                </div>
                <Button name='Continue'/>
            </form>
        </FormProvider>
    )
}