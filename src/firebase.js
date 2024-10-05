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
    await setDoc(doc(db, "carritos", uid), { productos }, { merge: true });
    console.log("Carrito guardado:", productos);
  } catch (error) {
    console.error("Error guardando el carrito:", error);
  }
};

export const cargarCarrito = async (uid) => {
  try {
    const docRef = doc(db, "carritos", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Carrito cargado:", docSnap.data().productos);
      return docSnap.data().productos || [];
    } else {
      console.log("No hay carrito encontrado para este usuario.");
      return [];
    }
  } catch (error) {
    console.error("Error cargando el carrito:", error);
    return [];
  }
};