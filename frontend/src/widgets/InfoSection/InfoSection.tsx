import { About } from "./About/About";
import { Cashback } from "./Cashback/Cashback";
import { FAQ } from "./FAQ/FAQ";
import { RatesAndConditions } from "./RatesAndConditions/RatesAndConditions";
import { Tabs, type TabItem } from "@/shared/Tabs/Tabs";

const tabItems: TabItem[] = [
    { id: 1, label: "About card", content: <About /> },
    { id: 2, label: "Rates and Conditions", content: <RatesAndConditions /> },
    { id: 3, label: "Cashback", content: <Cashback /> },
    { id: 4, label: "FAQ", content: <FAQ /> }
];

export const InfoSection = () => {
    return(
        <section className='info-section'>
            <Tabs items={tabItems} defaultActiveId={1} />
        </section>
    )
}