import { Button } from "@/shared/components/Button/Button";
import './CreditCardHero.css';
import { Tooltip } from "@/shared/components/Tooltip/Tooltip";
import { useState } from "react";

const subtitleContent = [
    {
        id: 1,
        title: "Up to 160 days",
        description: "No percent",
        tooltip: "When repaying the full debt up to 160 days."
    },
    {
        id: 2,
        title: "Up to 600 000 ₽",
        description: "Credit limit",
        tooltip: "Over the limit willaccrue percentage"
    },
    {
        id: 3,
        title: "0 ₽",
        description: "Card service is free",
        tooltip: "Promotion valid until December 31, 2022."
    }

];

export const CreditCardHero = () => {
    const [showTooltips, setShowTooltips] = useState(false);

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
                            <Tooltip key={item.id} text={item.tooltip} forceShow={showTooltips}>
                                <div className="credit-card-hero__subtitle-item">
                                    <h3 className="credit-card-hero__subtitle text text--spaced text--tight">{item.title}</h3>
                                    <p className="credit-card-hero__text text text--spaced text--tight">{item.description}</p>
                                </div>
                            </Tooltip>
                        ))}
                    </div>
                    <Button name='Apply for Card'></Button>
            </div>

            <div className="credit-card-hero__image-container">
                <img src="/src/assets/images/credit-card.png"
                 alt="credit-card"
                 className="credit-card-hero__image"
                 onMouseEnter={() => setShowTooltips(true)}
                 onMouseLeave={() => setShowTooltips(false)}/>
            </div>
            
        </section>
    )
}