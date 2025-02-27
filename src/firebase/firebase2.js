// firebase2.js
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

// A configuração do Firebase, garantindo que tenha o nome correto
const firebaseConfig = {
  apiKey: "AIzaSyAis7UfAcb51_oIkW9Qc9ux3wEAVhPhtKA",
  authDomain: "lettuce-sustain-8397a.firebaseapp.com",
  databaseURL: "https://lettuce-sustain-8397a-default-rtdb.firebaseio.com",
  projectId: "lettuce-sustain-8397a",
  storageBucket: "lettuce-sustain-8397a.firebasestorage.app",
  messagingSenderId: "37187315492",
  appId: "1:37187315492:web:af58c55ba7918ee0d9b5b1",
  measurementId: "G-L8RT9WGDE9"
};

// Inicializando o Firebase
const firebaseApp2 = initializeApp(firebaseConfig, 'secondary');
const db2 = getDatabase(firebaseApp2);

export { db2 };
