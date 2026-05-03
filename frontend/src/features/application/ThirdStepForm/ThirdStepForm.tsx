import { Button } from "@/shared/ui/Button/Button"
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox"

const paymentSchedule = [
    {
    month: 0,
    date: Date.now(),
    totalPayment: 0,
    interestPayment: 0,
    debtPayment: 0,
    remainingDebt: 200000
    },
    {
    month: 1,
    date: Date.now(),
    totalPayment: 0,
    interestPayment: 0,
    debtPayment: 0,
    remainingDebt: 200000
},
{
    month: 2,
    date: Date.now(),
    totalPayment: 0,
    interestPayment: 0,
    debtPayment: 0,
    remainingDebt: 200000
},
{
    month: 3,
    date: Date.now(),
    totalPayment: 0,
    interestPayment: 0,
    debtPayment: 0,
    remainingDebt: 200000
},
{
    month: 4,
    date: Date.now(),
    totalPayment: 0,
    interestPayment: 0,
    debtPayment: 0,
    remainingDebt: 200000
},
{
    month: 5,
    date: Date.now(),
    totalPayment: 0,
    interestPayment: 0,
    debtPayment: 0,
    remainingDebt: 200000
},
{
    month: 6,
    date: Date.now(),
    totalPayment: 0,
    interestPayment: 0,
    debtPayment: 0,
    remainingDebt: 200000
},
]

export const ThirdStepForm = () => {
    return (
        <form className='third-step-form'>
            <div className='third-step-form__header'>
                <h2>Payment Schedule</h2>
                <p>Step 3 of 5</p>
            </div>

            <table className='third-step-form__schedule'>
                <tr className='third-step-form__schedule-row'>
                    <th>NUMBER</th>
                    <th>DATE</th>
                    <th>TOTAL PAYMENT</th>
                    <th>INTEREST PAYMENT</th>
                    <th>DEBT PAYMENT</th>
                    <th>REMAINING DEBT</th>
                </tr>
                
                {paymentSchedule.map(item => (
                    <tr className='third-step-form__schedule-row' key={item.month}>
                        <td>{item.month}</td>
                        <td>{item.date}</td>
                        <td>{item.totalPayment}</td>
                        <td>{item.interestPayment}</td>
                        <td>{item.debtPayment}</td>
                        <td>{item.remainingDebt}</td>
                    </tr>
                ))}
            </table>
            
            <div className='third-step-form__footer'>

                <Button />

                <div>
                    <Checkbox
                    name='agreement'
                    label='I agree with the payment schedule' />
                    <Button />
                </div>
            </div>

        </form>
    )
}