import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import LoginPrompt from './LoginPrompt';

const Card = ({ url, title, price, description, isLoggedIn, agregarProductoCarrito, producto }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    if (isLoggedIn) {
      agregarProductoCarrito(producto);
    } else {
      setShowModal(true);
    }
  };

  const discountedPrice = isLoggedIn ? price * 0.85 : price;

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img 
          src={url} 
          className="card-img-top img-fluid" 
          alt={title} 
          style={{ height: '200px', objectFit: 'contain' }} 
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          {isLoggedIn ? (
            <div>
              <p className="card-text">
                <del>${price.toFixed(2)}</del>
              </p>
              <p className="card-text text-success font-weight-bold">
                ${discountedPrice.toFixed(2)} 
                <span className="badge bg-success">15% off</span>
                <button 
                  onClick={handleAddToCart} 
                  className="btn btn-link" 
                  style={{ padding: 0, marginLeft: '5px' }}
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                </button>
              </p>
            </div>
          ) : (
            <p className="card-text">
              ${price.toFixed(2)} 
              <button 
                onClick={handleAddToCart} 
                className="btn btn-link" 
                style={{ padding: 0, marginLeft: '5px' }}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>
            </p>
          )}
          <p className="card-text flex-grow-1">{description.substring(0, 100)}...</p>
          <a href="#" className="btn btn-primary mt-auto">Ver más</a>
        </div>
      </div>
      {showModal && <LoginPrompt onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Card;
