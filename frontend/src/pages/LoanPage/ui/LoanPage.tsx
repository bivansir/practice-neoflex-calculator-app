import { CreditCardHero } from "@/pages/LoanPage/ui/CreditCardHero/CreditCardHero"
import { HowToBanner } from "@/pages/LoanPage/ui/HowToBanner/HowToBanner"
import { InfoSection } from "@/pages/LoanPage/ui/InfoSection/InfoSection"
import { useApplicationStore } from "@/entities/application/store"
import { LoanFirstStep } from "../../../features/application/ui/LoanFirstStep/LoanFirstStep"

export const LoanPage = () => {
    const step = useApplicationStore((s) => s.step);
    return (
        <main>
            <CreditCardHero />
            <InfoSection />
            <HowToBanner />
            <LoanFirstStep />
        </main>
    )
}