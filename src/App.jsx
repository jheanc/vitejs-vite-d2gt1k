import { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom';
import Inicio from './components/Inicio';
import Quienessomos from './components/Quienessomos';
import Login from './components/Login';
import Registro from './components/Registro';
import Carrito from './components/Carrito';
import PerfilUsuario from './components/PerfilUsuario';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { cargarCarrito, guardarCarrito } from './firebase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [userData, setUserData] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserData({
          email: user.email,
          uid: user.uid
        });
        
        // Cargar el carrito del usuario actual
        const productos = await cargarCarrito(user.uid);
        setProductosCarrito(productos);
      } else {
        setIsLoggedIn(false);
        setUserData(null);
        setProductosCarrito([]);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      // Guardar el carrito antes de cerrar sesión
      if (userData) {
        await guardarCarrito(userData.uid, productosCarrito);
      }
      await signOut(auth);
      setIsLoggedIn(false);
      setUserData(null);
      setProductosCarrito([]);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const agregarProductoCarrito = async (producto) => {
    if (!isLoggedIn || !userData) return;
    
    const nuevosProductos = [...productosCarrito];
    const productoExistente = nuevosProductos.find(p => p.id === producto.id);
    
    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      nuevosProductos.push({ ...producto, cantidad: 1 });
    }
    
    setProductosCarrito(nuevosProductos);
    await guardarCarrito(userData.uid, nuevosProductos);
  };

  const modificarProductoCarrito = async (id, nuevoProducto) => {
    if (!isLoggedIn || !userData) return;
    
    const nuevosProductos = productosCarrito.map(prod => 
      prod.id === id ? nuevoProducto : prod
    );
    
    setProductosCarrito(nuevosProductos);
    await guardarCarrito(userData.uid, nuevosProductos);
  };

  const eliminarProductoCarrito = async (id) => {
    if (!isLoggedIn || !userData) return;
    
    const nuevosProductos = productosCarrito.filter(prod => prod.id !== id);
    
    setProductosCarrito(nuevosProductos);
    await guardarCarrito(userData.uid, nuevosProductos);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">Mi Tienda</Link>
          <div className="navbar-nav">
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/quienessomos" className="nav-link">Productos</Link>
            {!isLoggedIn ? (
              <Link to="/login" className="nav-link">Iniciar Sesión</Link>
            ) : (
              <>
                <Link to="/carrito" className="nav-link">
                  Carrito <FontAwesomeIcon icon={faShoppingCart} />
                  {productosCarrito.length > 0 && <span className="badge bg-danger">{productosCarrito.length}</span>}
                </Link>
                <Link to="/perfil" className="nav-link">
                  <FontAwesomeIcon icon={faUser} />
                </Link>
                <button onClick={handleLogout} className="btn btn-link nav-link">Cerrar Sesión</button>
              </>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/quienessomos" element={<Quienessomos isLoggedIn={isLoggedIn} agregarProductoCarrito={agregarProductoCarrito} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />} />
        <Route path="/registro" element={<Registro setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />} />
        <Route path="/carrito" element={<Carrito productos={productosCarrito} eliminarProductoCarrito={eliminarProductoCarrito} modificarProductoCarrito={modificarProductoCarrito} />} />
        <Route path="/perfil" element={<PerfilUsuario userData={userData} />} />
      </Routes>
    </Router>
  );
}

export default App;