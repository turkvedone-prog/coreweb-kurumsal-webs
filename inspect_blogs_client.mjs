import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD7_smZYZ9JSDJq0sBtjdRkSiFaEMQRZos",
  authDomain: "coreweb-panel.firebaseapp.com",
  projectId: "coreweb-panel",
  storageBucket: "coreweb-panel.firebasestorage.app",
  messagingSenderId: "136936905582",
  appId: "1:136936905582:web:db0e83b19c468d9bdabf7f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function run() {
  try {
    console.log('1. Signing in...');
    await signInWithEmailAndPassword(auth, 'superadmin_seeder@coreweb.com', 'SuperAdminPassword2026!');
    console.log('Successfully signed in!\n');

    console.log('=== Updating blog post pBvq91Jpa2Wby1RyNi4R status to published ===');
    const docRef = doc(db, 'tenants', 'burobig', 'blogs', 'pBvq91Jpa2Wby1RyNi4R');
    await updateDoc(docRef, { status: 'published' });
    console.log('Successfully updated status to "published"!\n');

    console.log('=== Fetching tenants/burobig/blogs ===');
    const snap = await getDocs(collection(db, 'tenants', 'burobig', 'blogs'));
    console.log(`Found ${snap.size} documents:`);
    snap.forEach(doc => {
      console.log(`- ID: ${doc.id} | Status: ${doc.data().status}`);
    });

  } catch (err) {
    console.error('Run failed:', err);
  } finally {
    process.exit(0);
  }
}

run();
