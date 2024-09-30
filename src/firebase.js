import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAJHsB23lDM-AiBfbWAwX9CcsUXlyydIco",
  authDomain: "proyectofinaldiplomado-65fe7.firebaseapp.com",
  projectId: "proyectofinaldiplomado-65fe7",
  storageBucket: "proyectofinaldiplomado-65fe7.appspot.com",
  messagingSenderId: "563298714888",
  appId: "1:563298714888:web:d7f378b4c58482d47ad8bd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export const guardarCarrito = async (uid, productos) => {
  try {
    await setDoc(doc(db, "carritos", uid), { productos });
    console.log("Carrito guardado para el usuario:", uid);
  } catch (error) {
    console.error("Error guardando el carrito:", error);
  }
};

export const cargarCarrito = async (uid) => {
  try {
    const docRef = doc(db, "carritos", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Carrito cargado para el usuario:", uid);
      return data.productos || [];
    } else {
      console.log("No hay carrito encontrado para el usuario:", uid);
      return [];
    }
  } catch (error) {
    console.error("Error cargando el carrito:", error);
    return [];
  }
};