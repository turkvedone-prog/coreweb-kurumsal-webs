import { db } from './firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

const TENANT_ID = 'burobig';
let blogsCache = null;

export async function getPublishedBlogs() {
  if (blogsCache) return blogsCache;
  try {
    const blogsRef = collection(db, 'tenants', TENANT_ID, 'blogs');
    let q;
    try {
      q = query(blogsRef, where('status', '==', 'published'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const blogs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      blogsCache = blogs;
      return blogs;
    } catch {
      // Index yoksa client-side sort yap
      q = query(blogsRef, where('status', '==', 'published'));
      const snapshot = await getDocs(q);
      const blogs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      blogs.sort((a, b) => {
        const tA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : new Date(a.createdAt || 0).getTime();
        const tB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : new Date(b.createdAt || 0).getTime();
        return tB - tA;
      });
      blogsCache = blogs;
      return blogs;
    }
  } catch (err) {
    console.error('Blog fetch error:', err);
    return [];
  }
}
