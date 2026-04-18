import { About } from "./About/About";
import { Cashback } from "./Cashback/Cashback";
import { FAQ } from "./FAQ/FAQ";
import './InfoSection.css';
import { RatesAndConditions } from "./RatesAndConditions/RatesAndConditions";
import { Tabs } from "@/shared/Tabs/Tabs";

export const InfoSection = () => {
    return(
        <section className='info-section'>
            <Tabs items={[
                { id: 1, label: "About", content: <About /> },
                { id: 2, label: "Rates and Conditions", content: <RatesAndConditions /> },
                { id: 3, label: "Cashback", content: <Cashback /> },
                { id: 4, label: "FAQ", content: <FAQ /> }
            ]} defaultActiveId={1} />
        </section>
    )
}