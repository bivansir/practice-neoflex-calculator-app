import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from '@/widgets/Header/Header'
import { Footer } from '@/widgets/Footer/Footer'
import { LoanPage } from '@/pages/LoanPage/ui/LoanPage'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/creditcard" element={<LoanPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
