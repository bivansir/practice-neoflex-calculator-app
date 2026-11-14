import { Button } from "@/shared/ui/Button/Button"
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox"
import { useEffect, useRef, useState } from "react";
import { DenyModal } from "./DenyModal/DenyModal";
import { FormHeader } from "@/shared/ui/FormHeader/FormHeader";

import './third-step-form.css'
import { useApplicationStore } from "@/entities/application/store";


const paymentSchedule = [
    {
    month: 0,
    date: new Date().toLocaleDateString('ru-RU').replace(/\//g, '-'),
    totalPayment: 0,
    interestPayment: 0,
    debtPayment: 0,
    remainingDebt: 200000
    },
    {
    month: 1,
    date: new Date().toLocaleDateString('ru-RU').replace(/\//g, '-'),
    totalPayment: 0,
    interestPayment: 0,
    debtPayment: 0,
    remainingDebt: 200000
},
{
    month: 2,
    date: new Date().toLocaleDateString('ru-RU').replace(/\//g, '-'),
    totalPayment: 0,
    interestPayment: 0,
    debtPayment: 0,
    remainingDebt: 200000
},
{
    month: 3,
    date: new Date().toLocaleDateString('ru-RU').replace(/\//g, '-'),
    totalPayment: 0,
    interestPayment: 0,
    debtPayment: 0,
    remainingDebt: 200000
},
{
    month: 4,
    date: new Date().toLocaleDateString('ru-RU').replace(/\//g, '-'),
    totalPayment: 0,
    interestPayment: 0,
    debtPayment: 0,
    remainingDebt: 200000
},
{
    month: 5,
    date: new Date().toLocaleDateString('ru-RU').replace(/\//g, '-'),
    totalPayment: 0,
    interestPayment: 0,
    debtPayment: 0,
    remainingDebt: 200000
},
{
    month: 6,
    date: new Date().toLocaleDateString('ru-RU').replace(/\//g, '-'),
    totalPayment: 0,
    interestPayment: 0,
    debtPayment: 0,
    remainingDebt: 200000
},
]

type ThirdStepFormProps = {
    onSubmit: () => void;
}

export const ThirdStepForm = ({ onSubmit }:ThirdStepFormProps) => {
    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const [deny, setDeny] = useState<boolean>(false)
    const denyRef = useRef(false);

    const resetForm = useApplicationStore((s) => s.reset)

    const handleDeny = () => {
        denyRef.current = true;
        setDeny(true);
    };

    useEffect(() => {
        const handler = () => {
            if (denyRef.current) resetForm();
        };

        window.addEventListener('beforeunload', handler);
        return () => {
            window.removeEventListener('beforeunload', handler);
        }
    }, []);

    return (
        <div className='third-step-form__wrapper surface--card'>
            <form className='third-step-form'>
                <FormHeader
                title='Payment Schedule'
                step={3} />

                <div className='third-step-form__schedule-wrapper'>
                    <table className='third-step-form__schedule'>
                        <thead>
                            <tr className='third-step-form__schedule-row text--spaced text--comfortable'>
                                <th>NUMBER</th>
                                <th>DATE</th>
                                <th>TOTAL PAYMENT</th>
                                <th>INTEREST PAYMENT</th>
                                <th>DEBT PAYMENT</th>
                                <th>REMAINING DEBT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentSchedule.map(item => (
                                <tr className='third-step-form__schedule-row text--spaced text--comfortable' key={item.month}>
                                    <td>{item.month}</td>
                                    <td>{item.date}</td>
                                    <td>{item.totalPayment}</td>
                                    <td>{item.interestPayment}</td>
                                    <td>{item.debtPayment}</td>
                                    <td>{item.remainingDebt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
             </div>
                
                <div className='third-step-form__footer'>

                    <Button name='Deny' className='button--deny' type='button' onClick={() => setModalOpened(!modalOpened)} />

                    <div className='third-step-form__send-group'>
                        <Checkbox
                        name='agreement'
                        label='I agree with the payment schedule'
                        onCheck={() => setIsChecked(!isChecked)} />
                        <Button name='Send' onClick={() => onSubmit()} disabled={deny || !isChecked}/>
                    </div>
                </div>

                {modalOpened && <DenyModal onClose={() => setModalOpened(false)} onDeny={handleDeny} deny={deny} />}

            </form>
        </div>
    )
}