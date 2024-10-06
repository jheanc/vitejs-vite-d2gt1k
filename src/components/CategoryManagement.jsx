// src/components/CategoryManagement.jsx
import React, { useState, useEffect } from 'react';
import { addCategory, getCategories, updateCategory, deleteCategory } from '../firebaseServices';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const fetchedCategories = await getCategories();
    setCategories(fetchedCategories);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    await addCategory(newCategory);
    setNewCategory({ name: '' });
    fetchCategories();
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (editingCategory) {
      await updateCategory(editingCategory.id, editingCategory);
      setEditingCategory(null);
      fetchCategories();
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      await deleteCategory(id);
      fetchCategories();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Categorías</h2>
      <form onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={editingCategory ? editingCategory.name : newCategory.name}
            onChange={(e) => editingCategory 
              ? setEditingCategory({...editingCategory, name: e.target.value})
              : setNewCategory({...newCategory, name: e.target.value})}
            placeholder="Nombre de la Categoría"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingCategory ? 'Actualizar Categoría' : 'Añadir Categoría'}
        </button>
        {editingCategory && (
          <button type="button" className="btn btn-secondary ml-2" onClick={() => setEditingCategory(null)}>
            Cancelar Edición
          </button>
        )}
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <button className="btn btn-sm btn-info mr-2" onClick={() => setEditingCategory(category)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteCategory(category.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManagement;