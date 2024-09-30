import React, { useEffect, useState } from 'react';
import Card from './Card';

const Quienessomos = ({ isLoggedIn, agregarProductoCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    obtenerProductos();
  }, []);
  
  const obtenerProductos = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('No se pudo obtener los productos');
      }
      const data = await response.json();
      setProductos(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError('Hubo un problema al cargar los productos. Por favor, intente de nuevo más tarde.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mt-5 text-center">Cargando productos...</div>;
  }

  if (error) {
    return <div className="container mt-5 text-center text-danger">{error}</div>;
  }

  return (
    <div className="container">
      <h3 className="my-4">Lista de productos</h3>
      {productos.length === 0 ? (
        <p>No hay productos disponibles en este momento.</p>
      ) : (
        <div className="row">
          {productos.map((producto) => (
            <Card 
              key={producto.id}
              url={producto.image} 
              title={producto.title} 
              price={producto.price} 
              description={producto.description}
              isLoggedIn={isLoggedIn}
              agregarProductoCarrito={() => agregarProductoCarrito(producto)}
              producto={producto}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Quienessomos;