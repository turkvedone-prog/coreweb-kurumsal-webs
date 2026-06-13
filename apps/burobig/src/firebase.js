import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD7_smZYZ9JSDJq0sBtjdRkSiFaEMQRZos",
  authDomain: "coreweb-panel.firebaseapp.com",
  projectId: "coreweb-panel",
  storageBucket: "coreweb-panel.firebasestorage.app",
  messagingSenderId: "136936905582",
  appId: "1:136936905582:web:db0e83b19c468d9bdabf7f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
