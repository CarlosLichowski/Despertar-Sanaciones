import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NewsManager } from './NewsManager';
import { CourseManager } from './CourseManager';
import { InquiriesManager } from './InquiriesManager';
import { seedDefaultCourses } from '../../services/coursesService';
import { seedDefaultNews } from '../../services/newsService';
import { 
  X, 
  LogOut, 
  Newspaper, 
  GraduationCap, 
  Mail, 
  Database, 
  ShieldCheck, 
  RefreshCw,
  CheckCircle2
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { user, logout, isFirebaseConnected } = useAuth();
  const [activeTab, setActiveTab] = useState<'news' | 'courses' | 'inquiries' | 'config'>('news');
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);

  if (!isOpen || !user) return null;

  const handleSeedAll = async () => {
    setSeeding(true);
    try {
      await seedDefaultCourses();
      await seedDefaultNews();
      setSeedSuccess(true);
      setTimeout(() => setSeedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[92vh] bg-white rounded-3xl sm:rounded-4xl shadow-floating border border-[#EAE6DE] flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#FAF8F5] border-b border-[#EAE6DE] flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-forest-700 text-white flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif text-xl font-bold text-forest-950">
                  Panel de Administración
                </h2>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center space-x-1 ${
                  isFirebaseConnected 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isFirebaseConnected ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span>{isFirebaseConnected ? 'Firebase Conectado' : 'Modo Demo / Local'}</span>
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Sesión: <span className="font-medium text-stone-700">{user.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={async () => {
                await logout();
                onClose();
              }}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-stone-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-xs font-medium text-stone-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
              title="Cerrar panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-white border-b border-[#EAE6DE] flex space-x-2 sm:space-x-6 overflow-x-auto flex-shrink-0">
          <button
            onClick={() => setActiveTab('news')}
            className={`py-3.5 px-2 text-xs sm:text-sm font-semibold border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
              activeTab === 'news'
                ? 'border-forest-700 text-forest-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Novedades & Blog</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`py-3.5 px-2 text-xs sm:text-sm font-semibold border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
              activeTab === 'courses'
                ? 'border-forest-700 text-forest-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Cursos y Formaciones</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3.5 px-2 text-xs sm:text-sm font-semibold border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'border-forest-700 text-forest-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Consultas Web</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`py-3.5 px-2 text-xs sm:text-sm font-semibold border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
              activeTab === 'config'
                ? 'border-forest-700 text-forest-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Sincronización Firebase</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#FAF8F5]">
          {activeTab === 'news' && <NewsManager />}
          {activeTab === 'courses' && <CourseManager />}
          {activeTab === 'inquiries' && <InquiriesManager />}
          {activeTab === 'config' && (
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Seed Card */}
              <div className="bg-white rounded-3xl border border-[#EAE6DE] p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-sand-100 text-sand-800 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-forest-950">
                      Inicializar Datos de Stitch en Cloud Firestore
                    </h4>
                    <p className="text-xs text-stone-500">
                      Carga con un solo clic los cursos y novedades exactos del diseño visual.
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Si tu base de datos de Firestore está vacía o deseas volver a sincronizar los datos de ejemplo (Chamanismo Cuántico, Sanación Cuántica, Reiki Usui, Karuna, Arco Iris Cristal y las publicaciones), presiona el botón a continuación.
                </p>

                {seedSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>¡Datos cargados exitosamente! La web ya está sincronizada.</span>
                  </div>
                )}

                <button
                  onClick={handleSeedAll}
                  disabled={seeding}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-60"
                >
                  <RefreshCw className={`w-4 h-4 ${seeding ? 'animate-spin' : ''}`} />
                  <span>{seeding ? 'Cargando datos...' : 'Restaurar Datos Iniciales'}</span>
                </button>
              </div>

              {/* Firebase Guide Card */}
              <div className="bg-white rounded-3xl border border-[#EAE6DE] p-6 shadow-sm space-y-4">
                <h4 className="font-serif text-lg font-bold text-forest-950">
                  Configuración del Proyecto Firebase (.env)
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Para conectar esta aplicación con tu proyecto oficial de Firebase y Cloud Firestore en producción:
                </p>
                <ol className="list-decimal list-inside text-xs text-stone-600 space-y-1.5">
                  <li>Crea un proyecto en <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-forest-700 font-semibold underline">Firebase Console</a>.</li>
                  <li>Habilita <strong>Firebase Authentication</strong> (Proveedor de Correo / Contraseña).</li>
                  <li>Habilita <strong>Cloud Firestore</strong> en modo de producción o prueba.</li>
                  <li>Copia tus claves de configuración en el archivo <code>.env</code> del proyecto.</li>
                  <li>Ejecuta <code>firebase deploy</code> para publicar en Firebase Hosting.</li>
                </ol>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
