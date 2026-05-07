import { Navigate, Route, Routes } from "react-router-dom"
import { StepGuard } from "./StepGuard"
import { LoanSecondStep } from "@/features/application/ui/LoanSecondStep/LoanSecondStep"
import { LoanThirdStep } from "@/features/application/ui/LoanThirdStep/LoanThirdStep"
import { LoanFourthStep } from "@/features/application/ui/LoanFourthStep/LoanFourthStep"

export const ApplicationPage = () => {
    return (
      <main>
          <Routes>
          <Route
            index
            element={
                <StepGuard minStep="secondStep">
                    <LoanSecondStep />
                </StepGuard>
            }
          />
          <Route
            path="document"
            element={
                <StepGuard minStep="thirdStep">
                    <LoanThirdStep />
                </StepGuard>
            }
          />
          <Route
            path="document/sign"
            element={
                <StepGuard minStep="fourthStep">
                    <LoanFourthStep />
                </StepGuard>
            }
          />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
    )
}