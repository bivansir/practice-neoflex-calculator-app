import { Button } from "@/shared/ui/Button/Button"
import './select-statement.css'


const statements = [
    {
        id: 1,
        amount: 200000,
        totalAmount: 200000,
        term: 24,
        monthlyPayment: 9697,
        rate: 0.15,
        isInsuranceEnabled: false,
        isSalaryClient: false
    },
    {
        id: 2,
        amount: 200000,
        totalAmount: 200000,
        term: 24,
        monthlyPayment: 9697,
        rate: 0.11,
        isInsuranceEnabled: true,
        isSalaryClient: false
    },
    {
        id: 3,
        amount: 200000,
        totalAmount: 200000,
        term: 24,
        monthlyPayment: 9697,
        rate: 0.15,
        isInsuranceEnabled: false,
        isSalaryClient: true
    },
    {
        id: 4,
        amount: 200000,
        totalAmount: 200000,
        term: 24,
        monthlyPayment: 9697,
        rate: 0.15,
        isInsuranceEnabled: true,
        isSalaryClient: true
    },
]


export const SelectStatement = () => {
    return (
        <div className="select-statement">
            {statements.map((item) => (
                <div key={item.id} className="statement">
                    <img className="statement__image" src='/src/assets/images/offer.png' />

                    <dl className="statement__content">
                        <dt>Requested amount: </dt> 
                        <dd>{item.amount.toLocaleString('ru-RU')} ₽</dd>

                        <dt>Total amount: </dt> 
                        <dd>{item.totalAmount.toLocaleString('ru-RU')} ₽</dd>

                        <dt>For </dt> 
                        <dd>{item.term} months</dd>

                        <dt>Monthly payment: </dt> 
                        <dd>{item.monthlyPayment.toLocaleString('ru-RU')} ₽</dd>

                        <dt>Your rate: </dt> 
                        <dd>{+item.rate.toFixed(2) * 100} %</dd>

                        <dt>Insurance included </dt> 
                        <dd>
                            <img src={`/src/assets/icons/
                                ${item.isInsuranceEnabled ? 'valid.svg' : 'error.svg'}`} />
                        </dd>

                        <dt>Salary client </dt> 
                        <dd>
                            <img src={`/src/assets/icons/
                                ${item.isSalaryClient ? 'valid.svg' : 'error.svg'}`} />
                        </dd>
                    </dl>

                    <Button />
                </div>
            ))}
        </div>
    )
}