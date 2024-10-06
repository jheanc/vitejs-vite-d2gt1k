// src/firebaseServices.js
import { db } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, getDoc, setDoc } from 'firebase/firestore';

// Productos
export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, "productos"), product);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product: ", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "productos"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting products: ", error);
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const productRef = doc(db, "productos", id);
    await updateDoc(productRef, product);
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, "productos", id));
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
};

// Categorías
export const addCategory = async (category) => {
  try {
    const docRef = await addDoc(collection(db, "categorias"), category);
    return docRef.id;
  } catch (error) {
    console.error("Error adding category: ", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "categorias"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting categories: ", error);
    throw error;
  }
};

export const updateCategory = async (id, category) => {
  try {
    const categoryRef = doc(db, "categorias", id);
    await updateDoc(categoryRef, category);
  } catch (error) {
    console.error("Error updating category: ", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    await deleteDoc(doc(db, "categorias", id));
  } catch (error) {
    console.error("Error deleting category: ", error);
    throw error;
  }
};

// Carrito (Pedidos)
export const addToCart = async (userId, product) => {
  try {
    const cartRef = collection(db, "carritos", userId, "items");
    await addDoc(cartRef, product);
  } catch (error) {
    console.error("Error adding to cart: ", error);
    throw error;
  }
};

export const getCartItems = async (userId) => {
  try {
    const cartRef = collection(db, "carritos", userId, "items");
    const querySnapshot = await getDocs(cartRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting cart items: ", error);
    throw error;
  }
};

export const updateCartItem = async (userId, itemId, updates) => {
  try {
    const itemRef = doc(db, "carritos", userId, "items", itemId);
    await updateDoc(itemRef, updates);
  } catch (error) {
    console.error("Error updating cart item: ", error);
    throw error;
  }
};

export const removeFromCart = async (userId, itemId) => {
  try {
    await deleteDoc(doc(db, "carritos", userId, "items", itemId));
  } catch (error) {
    console.error("Error removing from cart: ", error);
    throw error;
  }
};

// Usuarios
export const registerUser = async (user) => {
  try {
    await setDoc(doc(db, "usuarios", user.uid), {
      email: user.email,
      rol: "usuario", // Por defecto, todos los usuarios son "usuario"
      nombre: user.displayName || "",
      // Puedes agregar más campos según sea necesario
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

export const getUserData = async (userId) => {
  try {
    const userDocRef = doc(db, "usuarios", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      throw new Error("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    throw error;
  }
};

export const updateUserRole = async (userId, newRole) => {
  try {
    const userRef = doc(db, "usuarios", userId);
    await updateDoc(userRef, { rol: newRole });
  } catch (error) {
    console.error("Error al actualizar el rol del usuario:", error);
    throw error;
  }
};