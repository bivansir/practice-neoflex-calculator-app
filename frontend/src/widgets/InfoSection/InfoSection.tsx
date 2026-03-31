import { useState } from "react";
import { InfoSectionMenu } from "./InfoSectionMenu";
import { AboutElement } from "./AboutElement";

import './InfoSection.css';
import { CashbackSection } from "./CashbackSection/CashbackSection";

export const InfoSection = () => {
    const [activeId, setActiveId] = useState('About card');
    return(
        <div className='info-section'>
            <InfoSectionMenu activeId={activeId} setActiveId={setActiveId} />
            <div className='line'></div>
            {activeId === 'About card' && <AboutElement />}
            {activeId === 'Cashback' && <CashbackSection />}
        </div>
    )
}