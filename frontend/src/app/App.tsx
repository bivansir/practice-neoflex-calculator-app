import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from '@/widgets/Header/Header'
import { Footer } from '@/widgets/Footer/Footer'
import { CreditCardPage } from '@/pages/CreditCardPage/ui/CreditCardPage'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/creditcard" element={<CreditCardPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
