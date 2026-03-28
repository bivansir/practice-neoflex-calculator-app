import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from '../widgets/Header/Header'
import { LoanPage } from '../pages/LoanPage'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/loan" element={<LoanPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
