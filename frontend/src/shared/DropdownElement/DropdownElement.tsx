import './dropdown-element.css'
import { useState } from 'react'

type DropdownElementProps = {
    title: string,
    description: string
}

export const DropdownElement = ({ title, description }: DropdownElementProps) => {
    const [expanded, setExpanded] = useState<boolean>(false)
    
    return (
        <div className='DropdownElement' onClick={() => setExpanded((!expanded))}>
            <div className='DropdownElement__header'>
                <h4 className='text text--comfortable'>{title}</h4>
                <img 
                    src={`/src/assets/icons/${expanded === true ? 'expand-up.svg' : 'expand-down.svg'}`}
                    alt={expanded ? 'Свернуть' : 'Развернуть'}/>
            </div>
            {expanded === true && <p className='DropdownElement__content text text--comfortable'>{description}</p>}
        </div>
    )
}