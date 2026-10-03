import React, { useState } from 'react';
import { X, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const { login, isFirebaseConnected, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      onLoginSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@despertarsanaciones.com');
    setPassword('admin123');
    clearError();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-floating border border-[#EAE6DE] p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-forest-950">
            Acceso Administrador
          </h3>
          <p className="text-xs text-stone-500">
            Gestiona cursos, publicaciones de novedades y consultas recibidas.
          </p>
        </div>

        {/* Connection status banner */}
        <div className="mb-6 p-3 rounded-2xl bg-[#F6F4EE] border border-[#EAE6DE] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full ${isFirebaseConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="text-stone-700 font-medium">
              {isFirebaseConnected ? 'Conectado a Firebase Auth' : 'Modo Demostración / Local'}
            </span>
          </div>
          {!isFirebaseConnected && (
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-semibold text-forest-700 hover:underline"
            >
              Usar datos demo
            </button>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Correo Electrónico
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError();
                }}
                placeholder="admin@despertarsanaciones.com"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F6F4EE]/60 border border-[#EAE6DE] text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-forest-600 focus:bg-white transition-all"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError();
                }}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F6F4EE]/60 border border-[#EAE6DE] text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-forest-600 focus:bg-white transition-all"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-full bg-forest-700 hover:bg-forest-800 text-white text-sm font-semibold transition-all duration-200 shadow-soft hover:shadow-card disabled:opacity-60"
            >
              {loading ? 'Verificando acceso...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>

        {/* Footer note */}
        <div className="mt-5 pt-4 border-t border-stone-100 text-center">
          <p className="text-[11px] text-stone-500">
            Acceso reservado exclusivamente para terapeutas administradores de Despertar Sanaciones.
          </p>
        </div>

      </div>
    </div>
  );
};
