import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/config';
import type { AdminUser } from '../types';

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  isFirebaseConnected: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_ADMIN_KEY = 'despertar_admin_demo_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || 'Administrador'
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Demo / Local session check
      const savedSession = localStorage.getItem(DEMO_ADMIN_KEY);
      if (savedSession) {
        try {
          const parsed = JSON.parse(savedSession);
          setUser(parsed);
        } catch {
          localStorage.removeItem(DEMO_ADMIN_KEY);
        }
      }
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    setError(null);
    try {
      if (isFirebaseConfigured && auth) {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        const fbUser = userCredential.user;
        setUser({
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName || 'Administrador'
        });
      } else {
        // Fallback demo credentials if Firebase project not yet connected
        if (pass.length < 6) {
          throw new Error('La contraseña debe tener al menos 6 caracteres.');
        }
        const demoUser: AdminUser = {
          uid: 'demo-admin-uid-12345',
          email: email.trim().toLowerCase(),
          displayName: 'Administrador Demo'
        };
        localStorage.setItem(DEMO_ADMIN_KEY, JSON.stringify(demoUser));
        setUser(demoUser);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      let friendlyMsg = 'Error al iniciar sesión. Verifica tus credenciales.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        friendlyMsg = 'Correo o contraseña incorrectos.';
      } else if (err.code === 'auth/too-many-requests') {
        friendlyMsg = 'Demasiados intentos fallidos. Inténtalo más tarde.';
      } else if (err.message) {
        friendlyMsg = err.message;
      }
      setError(friendlyMsg);
      throw new Error(friendlyMsg);
    }
  };

  const logout = async () => {
    try {
      if (isFirebaseConfigured && auth) {
        await signOut(auth);
      } else {
        localStorage.removeItem(DEMO_ADMIN_KEY);
      }
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isFirebaseConnected: isFirebaseConfigured,
        login,
        logout,
        error,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
