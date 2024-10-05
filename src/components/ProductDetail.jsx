import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import LoginPrompt from './LoginPrompt';

const ProductDetail = ({ isLoggedIn, agregarProductoCarrito }) => {
  const [producto, setProducto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchProducto = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProducto(data);
    };

    fetchProducto();
  }, [id]);

  const handleAddToCart = () => {
    if (isLoggedIn) {
      agregarProductoCarrito(producto);
    } else {
      setShowModal(true);
    }
  };

  if (!producto) {
    return <div className="container mt-4">Cargando...</div>;
  }

  const discountedPrice = isLoggedIn ? producto.price * 0.85 : producto.price;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img src={producto.image} alt={producto.title} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{producto.title}</h2>
          <p className="text-muted">{producto.category}</p>
          <p>{producto.description}</p>
          {isLoggedIn ? (
            <div>
              <p className="text-muted"><del>${producto.price.toFixed(2)}</del></p>
              <p className="h3 text-success">
                ${discountedPrice.toFixed(2)} 
                <span className="badge bg-success ms-2">15% off</span>
              </p>
            </div>
          ) : (
            <p className="h3">${producto.price.toFixed(2)}</p>
          )}
          <button 
            onClick={handleAddToCart} 
            className="btn btn-primary btn-lg mt-3"
          >
            <FontAwesomeIcon icon={faShoppingCart} /> Agregar al carrito
          </button>
        </div>
      </div>
      {showModal && <LoginPrompt onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ProductDetail;