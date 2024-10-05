import { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Inicio from './components/Inicio';
import Quienessomos from './components/Quienessomos';
import Login from './components/Login';
import Registro from './components/Registro';
import Carrito from './components/Carrito';
import PerfilUsuario from './components/PerfilUsuario';
import ProductDetail from './components/ProductDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { cargarCarrito, guardarCarrito } from './firebase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [userData, setUserData] = useState(null);
  const [cuponAplicado, setCuponAplicado] = useState(null);
  const auth = getAuth();

  const cupones = {
    'DESCUENTO5': 0.05,
    'DESCUENTO10': 0.10,
    'DESCUENTO15': 0.15,
    'DESCUENTO20': 0.20
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserData({
          email: user.email,
          uid: user.uid
        });
        
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

  const handleLogout = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      setUserData(null);
      setProductosCarrito([]);
      setCuponAplicado(null);
    }).catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
  };

  const agregarProductoCarrito = (producto) => {
    if (!isLoggedIn) return;
    setProductosCarrito((prev) => {
      const productoExistente = prev.find((p) => p.id === producto.id);
      let nuevosProductos;
      if (productoExistente) {
        nuevosProductos = prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      } else {
        nuevosProductos = [...prev, { ...producto, cantidad: 1 }];
      }
      guardarCarrito(userData.uid, nuevosProductos);
      return nuevosProductos;
    });
  };

  const modificarProductoCarrito = (id, nuevoProducto) => {
    if (!isLoggedIn) return;
    setProductosCarrito((prev) => {
      const nuevosProductos = prev.map((prod) => (prod.id === id ? nuevoProducto : prod));
      guardarCarrito(userData.uid, nuevosProductos);
      return nuevosProductos;
    });
  };

  const eliminarProductoCarrito = (id) => {
    if (!isLoggedIn) return;
    setProductosCarrito((prev) => {
      const nuevosProductos = prev.filter((prod) => prod.id !== id);
      guardarCarrito(userData.uid, nuevosProductos);
      return nuevosProductos;
    });
  };

  const aplicarCupon = (cupon) => {
    if (cupones.hasOwnProperty(cupon)) {
      setCuponAplicado({
        codigo: cupon,
        descuento: cupones[cupon]
      });
      return true;
    }
    return false;
  };

  const calcularTotalConDescuento = (total) => {
    if (cuponAplicado) {
      return total * (1 - cuponAplicado.descuento);
    }
    return total;
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
        <Route path="/" element={<Inicio isLoggedIn={isLoggedIn} agregarProductoCarrito={agregarProductoCarrito} />} />
        <Route path="/quienessomos" element={<Quienessomos isLoggedIn={isLoggedIn} agregarProductoCarrito={agregarProductoCarrito} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />} />
        <Route path="/registro" element={<Registro setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />} />
        <Route path="/carrito" element={<Carrito 
          productos={productosCarrito} 
          eliminarProductoCarrito={eliminarProductoCarrito} 
          modificarProductoCarrito={modificarProductoCarrito}
          user={userData}
          aplicarCupon={aplicarCupon}
          cuponAplicado={cuponAplicado}
          calcularTotalConDescuento={calcularTotalConDescuento}
        />} />
        <Route path="/perfil" element={<PerfilUsuario userData={userData} />} />
        <Route path="/producto/:id" element={<ProductDetail isLoggedIn={isLoggedIn} agregarProductoCarrito={agregarProductoCarrito} />} />
      </Routes>
    </Router>
  );
}

export default App;