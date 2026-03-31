import { useMemo } from 'react';
import './cashback-section.css';


type elementItem = {
    id: number;
    title: string;
    description: string;
}

export const CashbackSection = () => {
    const elementList = useMemo<elementItem[]>(() => [
        {id: 1, title:'5%',
            description: 'For food delivery, cafes and restaurants',
        },
        {id: 2, title:'5%',
            description: 'In supermarkets with our subscription',
        },
        {id: 3, title:'2%',
            description: 'In clothing stores and children\'s goods',
        },
        {id: 4, title:'1%',
            description: 'Other purchases and payment of services and fines',
        },
        {id: 5, title:'up to 3%',
            description: 'Shopping in online stores',
        },
        {id: 6, title:'30%',
            description: 'Purchases from our partners',
        }
    ], [])


    return (
        <div className='cashback-section'>
            {elementList.map(item => (
                <div key={item.id} className='cashback-section__item'>
                    <p className='cashback-section__description'>{item.description}</p>
                    <h2 className='cashback-section__title'>{item.title}</h2>
                </div>
            ))}
        </div>
    )
}