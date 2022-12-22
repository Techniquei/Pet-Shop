import './App.css'
import { Outlet } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <div className="d-flex flex-column justify-content-between vh-100 bg-light">

      <div>
        <Header />
        <Outlet />
      </div>

      <div className="flex-shrink-0">
        <Footer />
      </div>

    </div>
  )
}

export default App
