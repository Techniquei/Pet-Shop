import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { ProductsContextProvider } from './context/ProductsContextProvider'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      <ProductsContextProvider>
        <div>
          <Header />
          <Outlet />
        </div>

      </ProductsContextProvider>
      <Footer />
    </div>
  )
}

export default App
