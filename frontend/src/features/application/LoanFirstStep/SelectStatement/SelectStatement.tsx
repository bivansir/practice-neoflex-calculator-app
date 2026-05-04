import { Button } from "@/shared/ui/Button/Button"
import './select-statement.css'
import type { LoanOfferDTO } from "@/features/application/api/dto"

type SelectStatementProps = {
    offers: LoanOfferDTO[]
    onSelect: (data: LoanOfferDTO) => Promise<void>
}


const statements = [
    {
        id: 1,
        amount: 200000,
        totalAmount: 200000,
        term: 24,
        monthlyPayment: 9697,
        rate: 0.15,
        isInsuranceEnabled: false,
        isSalaryClient: false,
        requestedAmount: 10,
        statementID: 'sas'

    },
    {
        id: 2,
        amount: 200000,
        totalAmount: 200000,
        term: 24,
        monthlyPayment: 9697,
        rate: 0.11,
        isInsuranceEnabled: true,
        isSalaryClient: false,
        requestedAmount: 10,
        statementID: 'sas'
    },
    {
        id: 3,
        amount: 200000,
        totalAmount: 200000,
        term: 24,
        monthlyPayment: 9697,
        rate: 0.15,
        isInsuranceEnabled: false,
        isSalaryClient: true,
        requestedAmount: 10,
        statementID: 'sas'
    },
    {
        id: 4,
        amount: 200000,
        totalAmount: 200000,
        term: 24,
        monthlyPayment: 9697,
        rate: 0.15,
        isInsuranceEnabled: true,
        isSalaryClient: true,
        requestedAmount: 10,
        statementID: 'sas'
    },
]


export const SelectStatement = ( {onSelect, offers}: SelectStatementProps) => {
    return (
        <div className="select-statement">
            {statements.map((item) => (
                <div key={item.id} className="statement surface--card">
                    <div className='statement__content'>
                        <img className="statement__image" src='/src/assets/images/offer.png' />

                        <dl className="statement__list">
                            <div className="statement__element">
                                <dt>Requested amount: </dt> 
                                <dd>{item.amount.toLocaleString('ru-RU')} ₽</dd>
                            </div>

                            <div className="statement__element">
                                <dt>Total amount: </dt> 
                                <dd>{item.totalAmount.toLocaleString('ru-RU')} ₽</dd>
                            </div>

                            <div className="statement__element">
                                <dt>For </dt> 
                                <dd>{item.term} months</dd>
                            </div>

                            <div className="statement__element">
                                <dt>Monthly payment: </dt> 
                                <dd>{item.monthlyPayment.toLocaleString('ru-RU')} ₽</dd>
                            </div>

                            <div className="statement__element">
                                <dt>Your rate: </dt> 
                                <dd>{+item.rate.toFixed(2) * 100} %</dd>
                            </div>

                            <div className="statement__element">
                                <dt>Insurance included </dt> 
                                <dd>
                                    <img src={`/src/assets/icons/${item.isInsuranceEnabled ? 'valid.svg' : 'error.svg'}`} />
                                </dd>
                            </div>
                            <div className="statement__element">
                                <dt>Salary client </dt> 
                                <dd>
                                    <img src={`/src/assets/icons/${item.isSalaryClient ? 'valid.svg' : 'error.svg'}`} />
                                </dd>
                            </div>
                        </dl>

                        <Button name='Select' onClick={() => onSelect(item)}/>
                    </div>
                </div>
            ))}
        </div>
    )
}