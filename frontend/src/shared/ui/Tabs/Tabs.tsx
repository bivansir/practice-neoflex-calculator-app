import { useState } from "react";
import './tabs.css';


export type TabItem = {
    id: number,
    label: string,
    content: React.ReactNode;
}

type TabsProps = {
    items: TabItem[],
    defaultActiveId?: number;
}

export const Tabs = ( { items, defaultActiveId }: TabsProps ) => {
    const [activeId, setActiveId] = useState<number | undefined>(() => {
        if (defaultActiveId && items.some(item => item.id === defaultActiveId)) {
            return defaultActiveId;
        }
        return items[0]?.id;
    });

    return (
        <div className="tabs">
            <div className="tabs__menu">
                <ul className="tabs__list">
                    {items.map(item => (
                        <li key={item.id} className='tabs__item'>
                            <button className={
                                `tabs__button${activeId === item.id ? ' tabs__button--active' : ''} text text--spaced`
                            }
                            onClick={() => setActiveId(item.id)}>
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="tabs__content">
                {items.find(item => item.id === activeId)?.content}
            </div>
        </div>

    )
}