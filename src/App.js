import './App.css'
import { Outlet } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <div className="app_wrapper">

      <div className="app_header_and_main">
        <Header />
        <Outlet />
      </div>

      <div className="">
        <Footer />
      </div>

    </div>
  )
}

export default App
