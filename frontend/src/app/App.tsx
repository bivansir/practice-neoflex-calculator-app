import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from '@/widgets/Header/Header'
import { Footer } from '@/widgets/Footer/Footer'
import { LoanPage } from '@/pages/LoanPage/ui/LoanPage'
import { ApplicationPage } from '@/pages/ApplicationPage/ui/ApplicationPage'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/loan" element={<LoanPage />} />
        <Route path="/loan/:applicationId/*" element={<ApplicationPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
