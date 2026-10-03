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
import type { Inquiry } from '../types';

const COLLECTION_NAME = 'inquiries';
const LOCAL_STORAGE_KEY = 'despertar_inquiries_data';

const getLocalInquiries = (): Inquiry[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveLocalInquiries = (items: Inquiry[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('inquiries_updated'));
};

export const subscribeInquiries = (callback: (inquiries: Inquiry[]) => void): (() => void) => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const items: Inquiry[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Inquiry, 'id'>)
        }));
        callback(items);
      }, (error) => {
        console.warn('Firestore inquiries subscription error:', error);
        callback(getLocalInquiries());
      });
      return unsubscribe;
    } catch {
      callback(getLocalInquiries());
      return () => {};
    }
  }

  callback(getLocalInquiries());
  const handleUpdate = () => {
    callback(getLocalInquiries());
  };
  window.addEventListener('inquiries_updated', handleUpdate);
  return () => {
    window.removeEventListener('inquiries_updated', handleUpdate);
  };
};

export const createInquiry = async (inquiry: Omit<Inquiry, 'id'>): Promise<string> => {
  const id = `inq-${Date.now()}`;
  const fullInquiry: Inquiry = { ...inquiry, id };

  if (isFirebaseConfigured && db) {
    await setDoc(doc(db, COLLECTION_NAME, id), fullInquiry);
  } else {
    const list = getLocalInquiries();
    list.unshift(fullInquiry);
    saveLocalInquiries(list);
  }

  return id;
};

export const deleteInquiry = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } else {
    const list = getLocalInquiries().filter(i => i.id !== id);
    saveLocalInquiries(list);
  }
};
