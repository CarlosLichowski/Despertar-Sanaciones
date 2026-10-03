import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import type { NewsItem } from '../types';
import { DEFAULT_NEWS } from '../data/defaultData';

const COLLECTION_NAME = 'news';
const LOCAL_STORAGE_KEY = 'despertar_news_data';

// Helper to get local data
const getLocalNews = (): NewsItem[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_NEWS));
    return DEFAULT_NEWS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return DEFAULT_NEWS;
  }
};

const saveLocalNews = (items: NewsItem[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('news_updated'));
};

/**
 * Subscribe to news in real-time.
 */
export const subscribeNews = (callback: (news: NewsItem[]) => void): (() => void) => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
          callback(DEFAULT_NEWS);
        } else {
          const items: NewsItem[] = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...(docSnap.data() as Omit<NewsItem, 'id'>)
          }));
          callback(items);
        }
      }, (error) => {
        console.warn('Firestore news subscription error:', error);
        callback(getLocalNews());
      });
      return unsubscribe;
    } catch (e) {
      console.warn('Falling back to local news storage:', e);
      callback(getLocalNews());
      return () => {};
    }
  }

  // Fallback to local storage
  callback(getLocalNews());
  const handleUpdate = () => {
    callback(getLocalNews());
  };
  window.addEventListener('news_updated', handleUpdate);
  return () => {
    window.removeEventListener('news_updated', handleUpdate);
  };
};

/**
 * Add or update news publication
 */
export const saveNews = async (item: NewsItem): Promise<void> => {
  if (isFirebaseConfigured && db) {
    const newsRef = doc(db, COLLECTION_NAME, item.id);
    const { id, ...data } = item;
    await setDoc(newsRef, data, { merge: true });
    return;
  }

  const list = getLocalNews();
  const index = list.findIndex(n => n.id === item.id);
  if (index >= 0) {
    list[index] = item;
  } else {
    list.unshift(item);
  }
  saveLocalNews(list);
};

/**
 * Delete news item
 */
export const deleteNews = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    const newsRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(newsRef);
    return;
  }

  const list = getLocalNews().filter(n => n.id !== id);
  saveLocalNews(list);
};

/**
 * Seed initial news into Firestore or LocalStorage
 */
export const seedDefaultNews = async (): Promise<void> => {
  if (isFirebaseConfigured && db) {
    for (const item of DEFAULT_NEWS) {
      const { id, ...data } = item;
      await setDoc(doc(db, COLLECTION_NAME, id), data);
    }
  }
  saveLocalNews(DEFAULT_NEWS);
};
