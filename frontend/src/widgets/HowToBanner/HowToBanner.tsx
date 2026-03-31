import './how-to-banner.css';

type StepElement = {
    step: number;
    description: string;
}

export const HowToBanner = () => {
    const elementList: StepElement[] = [
        {
            step: 1,
            description: 'Fill out an online application - you do not need to visit the bank'
        },
        {
            step: 2,
            description: 'Find out the bank\'s decision immediately after filling out the application'
        },
        {
            step: 3,
            description: 'The bank will deliver the card free of charge, wherever convenient, to your city'
        }
    ];

    return (
        <div className = 'how-to-banner'>
            <h2 className="how-to-banner__title">How to get a card</h2>
            <ol className="how-to-banner__step-list">
            {elementList.map((element) => (
                    <li key={element.step} className="how-to-banner__step-list-item">
                        <div className="how-to-banner__step-number-container">
                            <p className="how-to-banner__step-number">{element.step}</p>
                            <div className="how-to-banner__step-line"></div>
                        </div>
                            <p className="how-to-banner__step-description">{element.description}</p>
                    </li>
            ))}
            </ol>
        </div>
    )
}