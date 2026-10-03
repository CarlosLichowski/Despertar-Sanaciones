import React, { useState } from 'react';
import { MessageCircle, User, Shield, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenLogin: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLogin, onOpenAdmin }) => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const scrollTo = (id: string, name: string) => {
    setActiveSection(name);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openGeneralWhatsApp = () => {
    // WhatsApp default to Silvia or generic contact
    window.open('https://wa.me/5491123048560?text=Hola%20Despertar%20Sanaciones,%20quisiera%20recibir%20informaci%C3%B3n%20sobre%20sus%20servicios%20y%20cursos.', '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE6DE]/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => scrollTo('inicio', 'inicio')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-forest-700 flex items-center justify-center text-sand-100 shadow-soft group-hover:scale-105 transition-transform duration-200">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12" />
                <path d="M12 6C9 9 9 15 12 18" strokeLinecap="round" />
                <path d="M12 6C15 9 15 15 12 18" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3" fill="#D2E2D7" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-forest-900 group-hover:text-forest-700 transition-colors">
                Despertar Sanaciones
              </span>
              <span className="text-[11px] font-medium tracking-widest uppercase text-stone-500 -mt-1">
                Armonía & Consciencia
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => scrollTo('inicio', 'inicio')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === 'inicio'
                  ? 'bg-forest-700 text-white shadow-soft'
                  : 'text-stone-700 hover:text-forest-700 hover:bg-forest-50'
              }`}
            >
              Inicio
            </button>

            <button
              onClick={() => scrollTo('servicios', 'servicios')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === 'servicios'
                  ? 'bg-forest-700 text-white shadow-soft'
                  : 'text-stone-700 hover:text-forest-700 hover:bg-forest-50'
              }`}
            >
              Servicios Holísticos
            </button>

            <button
              onClick={() => scrollTo('cursos', 'cursos')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === 'cursos'
                  ? 'bg-forest-700 text-white shadow-soft'
                  : 'text-stone-700 hover:text-forest-700 hover:bg-forest-50'
              }`}
            >
              Cursos y Formaciones
            </button>

            <button
              onClick={() => scrollTo('novedades', 'novedades')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === 'novedades'
                  ? 'bg-forest-700 text-white shadow-soft'
                  : 'text-stone-700 hover:text-forest-700 hover:bg-forest-50'
              }`}
            >
              Novedades
            </button>

            <button
              onClick={() => scrollTo('contacto', 'contacto')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === 'contacto'
                  ? 'bg-forest-700 text-white shadow-soft'
                  : 'text-stone-700 hover:text-forest-700 hover:bg-forest-50'
              }`}
            >
              Contacto & WhatsApp
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* WhatsApp CTA */}
            <button
              onClick={openGeneralWhatsApp}
              className="inline-flex items-center space-x-2 bg-forest-700 hover:bg-forest-800 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shadow-soft hover:shadow-card hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-white/20 stroke-white" />
              <span>Coordinar por WhatsApp</span>
            </button>

            {/* Admin Login / Panel Button */}
            {user ? (
              <button
                onClick={onOpenAdmin}
                title="Panel de Administración"
                className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-forest-600 bg-forest-100 text-forest-800 hover:bg-forest-200 transition-colors shadow-sm"
              >
                <Shield className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                title="Acceso Administrador"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#D5CFBE] text-stone-600 hover:text-forest-700 hover:border-forest-600 hover:bg-white transition-all shadow-sm"
              >
                <User className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            {user ? (
              <button
                onClick={onOpenAdmin}
                className="p-2 rounded-full bg-forest-100 text-forest-800"
              >
                <Shield className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="p-2 rounded-full border border-stone-300 text-stone-600"
              >
                <User className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-forest-50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#EAE6DE] px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <button
            onClick={() => scrollTo('inicio', 'inicio')}
            className="w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-forest-50"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollTo('servicios', 'servicios')}
            className="w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-forest-50"
          >
            Servicios Holísticos
          </button>
          <button
            onClick={() => scrollTo('cursos', 'cursos')}
            className="w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-forest-50"
          >
            Cursos y Formaciones
          </button>
          <button
            onClick={() => scrollTo('novedades', 'novedades')}
            className="w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-forest-50"
          >
            Novedades
          </button>
          <button
            onClick={() => scrollTo('contacto', 'contacto')}
            className="w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-forest-50"
          >
            Contacto & WhatsApp
          </button>

          <div className="pt-4 border-t border-[#EAE6DE] flex flex-col space-y-2">
            <button
              onClick={openGeneralWhatsApp}
              className="w-full flex items-center justify-center space-x-2 bg-forest-700 text-white py-3 rounded-full font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Coordinar por WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
