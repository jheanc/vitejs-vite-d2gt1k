// src/components/ProductManagement.jsx
import React, { useState, useEffect } from 'react';
import { addProduct, getProducts, updateProduct, deleteProduct } from '../firebaseServices';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await addProduct(newProduct);
    setNewProduct({ name: '', price: '', category: '' });
    fetchProducts();
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (editingProduct) {
      await updateProduct(editingProduct.id, editingProduct);
      setEditingProduct(null);
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Productos</h2>
      <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={editingProduct ? editingProduct.name : newProduct.name}
            onChange={(e) => editingProduct 
              ? setEditingProduct({...editingProduct, name: e.target.value})
              : setNewProduct({...newProduct, name: e.target.value})}
            placeholder="Nombre del Producto"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            value={editingProduct ? editingProduct.price : newProduct.price}
            onChange={(e) => editingProduct
              ? setEditingProduct({...editingProduct, price: e.target.value})
              : setNewProduct({...newProduct, price: e.target.value})}
            placeholder="Precio"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={editingProduct ? editingProduct.category : newProduct.category}
            onChange={(e) => editingProduct
              ? setEditingProduct({...editingProduct, category: e.target.value})
              : setNewProduct({...newProduct, category: e.target.value})}
            placeholder="Categoría"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingProduct ? 'Actualizar Producto' : 'Añadir Producto'}
        </button>
        {editingProduct && (
          <button type="button" className="btn btn-secondary ml-2" onClick={() => setEditingProduct(null)}>
            Cancelar Edición
          </button>
        )}
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>
                <button className="btn btn-sm btn-info mr-2" onClick={() => setEditingProduct(product)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;