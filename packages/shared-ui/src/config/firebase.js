import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD7_smZYZ9JSDJq0sBtjdRkSiFaEMQRZos",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "coreweb-panel.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "coreweb-panel",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "coreweb-panel.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "136936905582",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:136936905582:web:db0e83b19c468d9bdabf7f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-0Y4JN4MERK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  try {
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    console.log('🔥 Connected to local Firestore emulator.');
  } catch (err) {
    console.warn('⚠️ Firestore emulator connection warning:', err.message);
  }
}

export default app;
