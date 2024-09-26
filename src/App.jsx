import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom'
import Inicio from './components/Inicio'
import Contacto from './components/Contacto'
import Quienessomos from './components/Quienessomos'
import Login from './components/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">Mi Tienda</Link>
          <div className="navbar-nav">
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/contacto" className="nav-link">Contacto</Link>
            <Link to="/quienessomos" className="nav-link">Productos</Link>
            {!isLoggedIn ? (
              <Link to="/login" className="nav-link">Iniciar Sesión</Link>
            ) : (
              <button onClick={handleLogout} className="btn btn-link nav-link">Cerrar Sesión</button>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/contacto" element={<Contacto/>}/>
        <Route path="/quienessomos" element={<Quienessomos isLoggedIn={isLoggedIn} />}/>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
      </Routes>
    </Router>
  )
}

export default App