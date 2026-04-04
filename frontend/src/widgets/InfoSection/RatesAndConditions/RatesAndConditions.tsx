import './rates-and-conditions.css'

type RatesAndConditionsItem = {
    id: number,
    title: string,
    description: string | string[]
}

export const RatesAndConditions = () => {
    const RatesAndConditionsItems: RatesAndConditionsItem[] = [
        {
            id: 1,
            title: 'Card currency',
            description: 'Rubles, dollars, euro'
        },
        {
            id: 2,
            title: 'Interest free period',
            description: '0% up to 160 days'
        },
        {
            id: 3,
            title: 'Payment system',
            description: 'Mastercard, Visa'
        },
        {
            id: 4,
            title: 'Maximum credit limit on the card',
            description: '600 000 ₽'
        },
        {
            id: 5,
            title: 'Replenishment and withdrawal',
            description: 'At any ATM. Top up your credit card for free with cash or transfer from other cards'
        },
        {
            id: 6,
            title: 'Max cashback per month',
            description: '15 000 ₽'
        },
        {
            id: 7,
            title: 'Transaction Alert',
            description: [
                '60 ₽ — SMS or push notifications',
                '0 ₽ — card statement, information about transactions in the online bank',
            ]
        },
    ]

    return (
        <div className = 'rates-and-conditions'>
            {RatesAndConditionsItems.map(item => (
                <div key={item.id} className='rates-and-conditions__item'>
                    <p className='text text--spaced'>{item.title}</p>
                    {typeof(item.description) === 'string' ? (
                        <p className='rates-and-conditions__item-description text text--spaced'>{item.description}</p>
                    ) : (
                        <div>
                            {item.description.map((desc, index) => 
                                (<p key={index} className='rates-and-conditions__item-description text text--spaced'>{desc}</p>)
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}