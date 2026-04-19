import { useState } from "react"
import './Accordion.css'


export type AccordionItem = {
    id: number,
    title: string,
    description: string
}

type AccordionProps = {
    items: AccordionItem[]
}

export const Accordion = ({ items }: AccordionProps) => {
    const [activeId, setActiveId] = useState<number | null>(null)
    
    return (
        <ul className='accordion'>
            {items.map((item) => (
                <li className='accordion__item' key={item.id}>
                    <details
                     open={activeId === item.id}
                     onClick={(e) => {
                    e.preventDefault();
                    setActiveId(activeId === item.id ? null : item.id);
                    }}>
                        <summary className='accordion__header'>
                            <h4 className='text text--comfortable'>{item.title}</h4>
                            <img src={activeId === item.id ? '/src/assets/icons/expand-up.svg'
                                 : '/src/assets/icons/expand-down.svg'} alt={activeId === item.id ? 'Свернуть' : 'Развернуть'} />
                    </summary>
                    <p className='accordion__content text text--comfortable'>{item.description}</p>
                </details>
                </li>
            ))}
        </ul>
    )
}