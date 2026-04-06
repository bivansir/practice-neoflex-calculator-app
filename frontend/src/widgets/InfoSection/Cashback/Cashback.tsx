import './cashback.css';
import type { InfoElement } from "@/shared/Types"

const elementList: InfoElement[] = [
    {
        id: 1,
        title:'5%',
        description: 'For food delivery, cafes and restaurants',
    },
    {
        id: 2, 
        title:'5%',
        description: 'In supermarkets with our subscription',
    },
    {
        id: 3, 
        title:'2%',
        description: 'In clothing stores and children\'s goods',
    },
    {
        id: 4, 
        title:'1%',
        description: 'Other purchases and payment of services and fines',
    },
    {
        id: 5, 
        title:'up to 3%',
        description: 'Shopping in online stores',
    },
    {
        id: 6, 
        title:'30%',
        description: 'Purchases from our partners',
    }
];

export const Cashback = () => {
    return (
        <div className='cashback'>
            {elementList.map(item => (
                <div key={item.id} className='cashback__item surface--card'>
                    <p className='cashback__description text text--comfortable'>{item.description}</p>
                    <h2 className='cashback__title text text--comfortable'>{item.title}</h2>
                </div>
            ))}
        </div>
    )
}