import { useState } from 'react';
import { FirstStepForm } from "./FirstStepForm/FirstStepForm";
import './card-form.css'

export const CardForm = () => {
    return (
        <div className='card-form'>
            <div className='card-form__content'>
                <FirstStepForm />
            </div>
        </div>
    )
}