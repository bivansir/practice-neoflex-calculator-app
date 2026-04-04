import { Button } from "@/shared/Button/Button";
import './CreditCardHero.css';
import type { InfoElement } from "@/shared/Types"


export const CreditCardHero = () => {
    const subtitleContent: InfoElement[] = [
        {
            id: 1,
            title: "Up to 160 days",
            description: "No percent"
        },
        {
            id: 2,
            title: "Up to 600 000 ₽",
            description: "Credit limit"
        },
        {
            id: 3,
            title: "0 ₽",
            description: "Card service is free"
        }

    ];

    return (
        <section className="credit-card-hero surface--card">
            <div className="credit-card-hero__content">
                <h1 className="credit-card-hero__title text text--spaced">
                    Platinum digital credit card
                </h1>
                    <div className="credit-card-hero__description">
                        <p className="credit-card-hero__paragraph text text--spaced text--tight">
                            Our best credit card. Suitable for everyday spending and shopping.
                        </p>
                        <p className="credit-card-hero__paragraph text text--spaced text--tight">
                            Cash withdrawals and transfers without commission and interest.
                        </p>
                    </div>
                    <div className="credit-card-hero__subtitle-container">
                        {subtitleContent.map(item => (
                            <div key={item.id} className="credit-card-hero__subtitle-item">
                                <h3 className="credit-card-hero__subtitle text text--spaced text--tight">{item.title}</h3>
                                <p className="credit-card-hero__text text text--spaced text--tight">{item.description}</p>
                            </div>
                        ))}
                    </div>
                    <Button name='Apply for Card'></Button>
            </div>
            <div className="credit-card-hero__image-container">
                <img src="/src/assets/images/credit-card.png" alt="credit-card" className="credit-card-hero__image" />
            </div>
        </section>
    )
}