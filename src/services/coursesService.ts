import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import type { Course } from '../types';
import { DEFAULT_COURSES } from '../data/defaultData';

const COLLECTION_NAME = 'courses';
const LOCAL_STORAGE_KEY = 'despertar_courses_data';

// Helper to get local data
const getLocalCourses = (): Course[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_COURSES));
    return DEFAULT_COURSES;
  }
  try {
    return JSON.parse(data);
  } catch {
    return DEFAULT_COURSES;
  }
};

const saveLocalCourses = (courses: Course[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(courses));
  window.dispatchEvent(new Event('courses_updated'));
};

/**
 * Subscribe to courses in real-time.
 */
export const subscribeCourses = (callback: (courses: Course[]) => void): (() => void) => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
          callback(DEFAULT_COURSES);
        } else {
          const courses: Course[] = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...(docSnap.data() as Omit<Course, 'id'>)
          }));
          callback(courses);
        }
      }, (error) => {
        console.warn('Firestore courses subscription error:', error);
        callback(getLocalCourses());
      });
      return unsubscribe;
    } catch (e) {
      console.warn('Falling back to local courses:', e);
      callback(getLocalCourses());
      return () => {};
    }
  }

  // Fallback to local storage with real-time window events
  callback(getLocalCourses());
  const handleUpdate = () => {
    callback(getLocalCourses());
  };
  window.addEventListener('courses_updated', handleUpdate);
  return () => {
    window.removeEventListener('courses_updated', handleUpdate);
  };
};

/**
 * Add or update course
 */
export const saveCourse = async (course: Course): Promise<void> => {
  if (isFirebaseConfigured && db) {
    const courseRef = doc(db, COLLECTION_NAME, course.id);
    const { id, ...data } = course;
    await setDoc(courseRef, data, { merge: true });
    return;
  }

  const list = getLocalCourses();
  const index = list.findIndex(c => c.id === course.id);
  if (index >= 0) {
    list[index] = course;
  } else {
    list.push(course);
  }
  saveLocalCourses(list);
};

/**
 * Update course partially
 */
export const updateCourse = async (id: string, updates: Partial<Course>): Promise<void> => {
  if (isFirebaseConfigured && db) {
    const courseRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(courseRef, updates);
    return;
  }

  const list = getLocalCourses();
  const index = list.findIndex(c => c.id === id);
  if (index >= 0) {
    list[index] = { ...list[index], ...updates };
    saveLocalCourses(list);
  }
};

/**
 * Delete course
 */
export const deleteCourse = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    const courseRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(courseRef);
    return;
  }

  const list = getLocalCourses().filter(c => c.id !== id);
  saveLocalCourses(list);
};

/**
 * Seed initial courses into Firestore or LocalStorage
 */
export const seedDefaultCourses = async (): Promise<void> => {
  if (isFirebaseConfigured && db) {
    for (const course of DEFAULT_COURSES) {
      const { id, ...data } = course;
      await setDoc(doc(db, COLLECTION_NAME, id), data);
    }
  }
  saveLocalCourses(DEFAULT_COURSES);
};
