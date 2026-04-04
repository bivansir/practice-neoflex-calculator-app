import { useState } from "react";
import { InfoSectionMenu } from "./InfoSectionMenu";
import { About } from "./About/About";
import { Cashback } from "./Cashback/Cashback";
import { FAQ } from "./FAQ/FAQ";
import './InfoSection.css';
import { RatesAndConditions } from "./RatesAndConditions/RatesAndConditions";

export const InfoSection = () => {
    const [activeId, setActiveId] = useState(1);
    return(
        <section className='info-section'>
            <InfoSectionMenu activeId={activeId} setActiveId={setActiveId} />
            {activeId === 1 && <About />}
            {activeId === 2 && <RatesAndConditions />}
            {activeId === 3 && <Cashback />}
            {activeId === 4 && <FAQ />}
        </section>
    )
}