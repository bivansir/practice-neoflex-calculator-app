import { useState } from 'react'
import './tooltip.css'

type TooltipProps = {
    text: string,
    children: React.ReactNode
    forceShow?: boolean
}

export const Tooltip = ({ text, children, forceShow = false }: TooltipProps) => {
    const [hovered, setHovered] = useState(false);
    const isVisible = hovered || forceShow;
    
    return (
        <div className={`tooltip${isVisible ? ' tooltip--visible' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
            {children}
            <span className='tooltip__text text text--spaced'>{text}</span>
        </div>
    )
}