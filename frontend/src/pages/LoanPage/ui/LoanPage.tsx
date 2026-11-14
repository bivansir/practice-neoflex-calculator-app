import { CreditCardHero } from "@/pages/LoanPage/ui/CreditCardHero/CreditCardHero"
import { HowToBanner } from "@/pages/LoanPage/ui/HowToBanner/HowToBanner"
import { InfoSection } from "@/pages/LoanPage/ui/InfoSection/InfoSection"
import { LoanFirstStep } from "../../../features/application/ui/LoanFirstStep/LoanFirstStep"

export const LoanPage = () => {
    return (
        <main>
            <CreditCardHero />
            <InfoSection />
            <HowToBanner />
            <LoanFirstStep />
        </main>
    )
}