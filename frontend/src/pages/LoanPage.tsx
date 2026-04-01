import { CardForm } from "../widgets/CardForm/CardForm"
import { CreditCardHero } from "../widgets/CreditCardHero/CreditCardHero"
import { HowToBanner } from "../widgets/HowToBanner/HowToBanner"
import { InfoSection } from "../widgets/InfoSection/InfoSection"

export const LoanPage = () => {
    return (
        <main>
            <CreditCardHero />
            <InfoSection />
            <HowToBanner />
            <CardForm />
        </main>
    )
}