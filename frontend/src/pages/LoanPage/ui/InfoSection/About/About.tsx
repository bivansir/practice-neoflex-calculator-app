import './about.css';
import type { InfoElement } from "@/shared/Types"

type AboutItem = InfoElement & {
        icon_path: string;
    }

const firstRow: AboutItem[] = [
    {id: 1, title:'Up to 50 000 ₽',
        description: 'Cash and transfers without commission and percentage',
        icon_path: '/src/assets/icons/money.svg'
    },
    {id: 2, title:'Up to 160 days',
        description: 'Without percent on the loan',
        icon_path: '/src/assets/icons/calendar.svg'
    },
    {id: 3, title:'Free delivery',
        description: 'We will deliver your card by courier at a convenient place and time for you',
        icon_path: '/src/assets/icons/clock.svg'
    },
];

const secondRow: AboutItem[] = [
    {id: 1, title:'Up to 12 months',
        description: 'No percent. For equipment, clothes and other purchases in installments',
        icon_path: '/src/assets/icons/bag.svg'
    },
    {id: 2, title:'Convenient deposit and withdrawal',
        description: 'At any ATM. Top up your credit card for free with cash or transfer from other cards',
        icon_path: '/src/assets/icons/credit-card.svg'
    },
];

export const About = () => {
    return (
        <div className='about'>
            <div className='about__row'>
                {firstRow.map(item => (
                    <div key={item.id} className='about__item surface--card'>
                        <img src={item.icon_path} alt={item.title} className='about__icon' />
                        <h2 className='about__title text text--spaced text text--comfortable'>{item.title}</h2>
                        <p className='text text--spaced text'>{item.description}</p>
                    </div>
                ))}
            </div>
            <div className='about__row'>
                {secondRow.map(item => (
                    <div key={item.id} className='about__item surface--card'>
                        <img src={item.icon_path} alt={item.title} className='about__icon' />
                        <h2 className='about__title text text--spaced text text--comfortable'>{item.title}</h2>
                        <p className='text text--spaced text'>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}