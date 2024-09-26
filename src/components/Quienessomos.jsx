import React, { useEffect, useState } from 'react'
import Card from './Card'

const Quienessomos = ({ isLoggedIn }) => {
  const [productos, setProductos] = useState([])
  
  useEffect(() => {
    obtenerProductos()
  }, [])
  
  const obtenerProductos = async () => {
    const datos = await fetch('https://fakestoreapi.com/products')
    const prod = await datos.json()
    setProductos(prod)
  }

  return (
    <div className="container">
      <h3 className="my-4">Lista de productos</h3>
      <div className="row">
        {productos.map((producto) => (
          <Card 
            key={producto.id}
            url={producto.image} 
            title={producto.title} 
            price={producto.price} 
            description={producto.description}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </div>
  )
}

export default Quienessomos