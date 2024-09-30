import React, { useEffect } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { guardarCarrito } from '../firebase'; // Asegúrate de importar esta función

const Carrito = ({ productos, eliminarProductoCarrito, modificarProductoCarrito, user }) => {
  
  const handleCantidadChange = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return; // Evitar cantidades menores a 1

    const productoExistente = productos.find((producto) => producto.id === id);
    if (productoExistente) {
      modificarProductoCarrito(id, { ...productoExistente, cantidad: nuevaCantidad });
    }
  };

  const calcularTotalProducto = (precio, cantidad) => {
    return (precio * cantidad).toFixed(2);
  };

  // Guarda el carrito en Firestore cada vez que los productos cambian
  useEffect(() => {
    if (user?.uid) {
      guardarCarrito(user.uid, productos);
    }
  }, [productos, user]);

  return (
    <div className="container">
      <h3 className="my-4">Carrito de Compras</h3>
      {productos.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul className="list-group">
          {productos.map((producto) => (
            <li key={producto.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <img 
                  src={producto.image} 
                  alt={producto.title} 
                  className="img-fluid" 
                  style={{ width: '80px', height: '80px', objectFit: 'contain', marginRight: '10px' }} 
                />
                <div>
                  <h5>{producto.title}</h5>
                  <p>Precio unitario: ${producto.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="d-flex align-items-center" style={{ width: '200px', justifyContent: 'flex-end' }}>
                <input 
                  type="number" 
                  value={producto.cantidad || 1}
                  onChange={(e) => handleCantidadChange(producto.id, parseInt(e.target.value))}
                  className="form-control me-2"
                  min="1"
                  style={{ width: '60px' }}
                />
                <div className="text-right me-3" style={{ minWidth: '120px' }}>
                  <p className="mb-1">Total: ${calcularTotalProducto(producto.price, producto.cantidad || 1)}</p>
                </div>
                <button 
                  onClick={() => eliminarProductoCarrito(producto.id)} 
                  className="btn btn-danger"
                >
                  <FontAwesomeIcon icon={faTrash} /> Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Carrito;
