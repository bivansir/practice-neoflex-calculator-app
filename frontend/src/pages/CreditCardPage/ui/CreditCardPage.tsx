import { CardForm } from "@/pages/CreditCardPage/ui/CardForm/CardForm"
import { CreditCardHero } from "@/pages/CreditCardPage/ui/CreditCardHero/CreditCardHero"
import { HowToBanner } from "@/pages/CreditCardPage/ui/HowToBanner/HowToBanner"
import { InfoSection } from "@/pages/CreditCardPage/ui/InfoSection/InfoSection"

export const CreditCardPage = () => {
    return (
        <main>
            <CreditCardHero />
            <InfoSection />
            <HowToBanner />
            <CardForm />
        </main>
    )
}