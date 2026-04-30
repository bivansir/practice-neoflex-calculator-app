import './how-to-banner.css';
import type { InfoElement } from "@/shared/Types"


const stepList: InfoElement[] = [
    {
        id: 1,
        title: '1',
        description: 'Fill out an online application - you do not need to visit the bank'
    },
    {
        id: 2,
        title: '2',
        description: 'Find out the bank\'s decision immediately after filling out the application'
    },
    {
        id: 3,
        title: '3',
        description: 'The bank will deliver the card free of charge, wherever convenient, to your city'
    }
];

export const HowToBanner = () => {
    return (
        <section className = 'how-to-banner'>
            <h2 className="how-to-banner__title text text--comfortable">How to get a card</h2>
            <ol className="how-to-banner__step-list">
            {stepList.map((item) => (
                    <li key={item.id} className="how-to-banner__step-list-item">
                        <div className="how-to-banner__step-number-wrapper">
                            <p className="how-to-banner__step-number text text--comfortable">{item.title}</p>

                        </div>
                            <p className="how-to-banner__step-description text text--comfortable">{item.description}</p>
                    </li>
            ))}
            </ol>
        </section>
    )
}