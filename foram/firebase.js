import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAAKda-H-1Qni40135y6Hf3kzrQzzXXv1A",
  authDomain: "foram-app-e82d4.firebaseapp.com",
  projectId: "foram-app-e82d4",
  storageBucket: "foram-app-e82d4.firebasestorage.app",
  messagingSenderId: "977300803969",
  appId: "1:977300803969:web:9f73c4c53732edff2e9880"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la base de datos Firestore (¡Esto es lo que faltaba!)
export const db = getFirestore(app);