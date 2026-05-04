import { Route, Routes } from "react-router-dom"

export const ApplicationPage = () => {
    return (
        <Routes>
        <Route
          index
          element={
            <StepGuard step="personal">
                <PersonalInfoForm />
            </StepGuard>
          }
        />
        <Route
          path="document"
          element={
            <StepGuard step="document">
              <DocumentStep />
            </StepGuard>
          }
        />
        <Route
          path="document/sign"
          element={
            <StepGuard step="sign">
              <SignStep />
            </StepGuard>
          }
        />
        <Route path="success" element={<SuccessScreen />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>
    )
}