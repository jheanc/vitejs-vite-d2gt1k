// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJHsB23lDM-AiBfbWAwX9CcsUXlyydIco",
  authDomain: "proyectofinaldiplomado-65fe7.firebaseapp.com",
  projectId: "proyectofinaldiplomado-65fe7",
  storageBucket: "proyectofinaldiplomado-65fe7.appspot.com",
  messagingSenderId: "563298714888",
  appId: "1:563298714888:web:d7f378b4c58482d47ad8bd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
