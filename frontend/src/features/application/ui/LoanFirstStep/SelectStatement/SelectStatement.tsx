import { Button } from "@/shared/ui/Button/Button"
import './select-statement.css'
import type { LoanOfferDTO } from "@/features/application/api/dto"
import offerImg from '@/assets/images/offer.png'
import validIcon from '@/assets/icons/valid.svg'
import errorIcon from '@/assets/icons/error.svg'

type SelectStatementProps = {
    offers: LoanOfferDTO[]
    onSelect: (data: LoanOfferDTO) => Promise<void>
}


export const SelectStatement = ( {onSelect, offers}: SelectStatementProps) => {
    return (
        <div className="select-statement">
            {offers.map((item) => (
                <div key={item.statementID} className="statement surface--card">
                    <div className='statement__content'>
                        <img className="statement__image" src={offerImg} />

                        <dl className="statement__list">
                            <div className="statement__element">
                                <dt>Requested amount: </dt> 
                                <dd>{item.requestedAmount.toLocaleString('ru-RU')} ₽</dd>
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
                                    <img src={item.isInsuranceEnabled ? validIcon : errorIcon} />
                                </dd>
                            </div>
                            <div className="statement__element">
                                <dt>Salary client </dt> 
                                <dd>
                                    <img src={item.isSalaryClient ? validIcon : errorIcon} />
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