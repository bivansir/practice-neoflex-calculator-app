import { Button } from "../../shared/Button/Button";
import './CreditCardHero.css';


export const CreditCardHero = () => {
    return (
        <div className="credit-card-hero">
            <div className="credit-card-hero__content">
                <h1 className="credit-card-hero__title">
                    Platinum digital credit card
                </h1>
                <div>
                    <p className="credit-card-hero__description">
                        Our best credit card. Suitable for everyday spending and shopping.
                    </p>
                    <p className="credit-card-hero__description">
                        Cash withdrawals and transfers without commission and interest.
                    </p>
                    
                    <div className="credit-card-hero__subtitle-container">
                        <div className="credit-card-hero__subtitle-item">
                            <h3 className="credit-card-hero__subtitle">
                                Up to 160 days
                            </h3>
                            <p className="credit-card-hero__text">
                                No percent
                            </p>
                        </div>
                        <div className='credit-card-hero__subtitle-item'>
                            <h3 className="credit-card-hero__subtitle">
                                Up to 600 000 ₽
                            </h3>
                            <p className="credit-card-hero__text">
                                Credit limit
                            </p>
                        </div>
                        <div className='credit-card-hero__subtitle-item'>
                            <h3 className="credit-card-hero__subtitle">
                                0 ₽
                            </h3>
                            <p className="credit-card-hero__text">
                                Card service is free
                            </p>
                        </div>
                    </div>
                    <Button name='Apply for Card'></Button>
                </div>
            </div>
            <div className="credit-card-hero__image-container">
                <img src="/src/assets/images/credit-card.png" alt="credit-card" className="credit-card-hero__image" />
            </div>
        </div>
    )
}