import React from 'react';
import { MessageCircle, Shield, Award } from 'lucide-react';

interface FooterProps {
  onOpenLogin: () => void;
  onOpenAdmin: () => void;
  isLoggedIn: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLogin, onOpenAdmin, isLoggedIn }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/5491123048560?text=Hola,%20quisiera%20coordinar%20un%20turno%20o%20consulta.', '_blank');
  };

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#EAE6DE] pt-16 pb-12 text-stone-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#EAE6DE]/80">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-forest-700 flex items-center justify-center text-sand-100 shadow-sm">
                <span className="font-serif font-bold text-sm">DS</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest-950">
                Despertar Sanaciones
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              Brindamos soporte destinado a la armonización física, reparación espiritual 
              y formación consciente de terapeutas holísticos.
            </p>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sage-100/80 border border-sage-200/80 text-[11px] font-medium text-forest-800">
              <Award className="w-3.5 h-3.5" />
              <span>Espacio terapéutico certificado</span>
            </div>
          </div>

          {/* Column 2: Cursos & Formación */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-forest-950">
              Cursos & Formación
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
              <li>
                <button onClick={() => scrollTo('cursos')} className="hover:text-forest-800 transition-colors">
                  Chamanismo Cuántico
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('cursos')} className="hover:text-forest-800 transition-colors">
                  Sanación Cuántica & Mórfica
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('cursos')} className="hover:text-forest-800 transition-colors">
                  Reiki Usui (Todos los niveles)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('cursos')} className="hover:text-forest-800 transition-colors">
                  Reiki Karuna & Arco Iris Cristal
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('cursos')} className="hover:text-forest-800 transition-colors">
                  Talleres y Certificaciones
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Acompañamiento Terapéutico */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-forest-950">
              Acompañamiento Terapéutico
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
              <li>
                <strong className="text-forest-900 block font-medium">Silvia Villanueva</strong>
                <span className="text-stone-500 text-xs">Vínculos, desarrollo consciente y Reiki</span>
              </li>
              <li className="pt-1">
                <strong className="text-forest-900 block font-medium">Roberto Vizza</strong>
                <span className="text-stone-500 text-xs">Espacios &lt; 300m², animales y sanación</span>
              </li>
              <li className="pt-2 text-[11px] text-amber-900/90 leading-tight">
                * Menores de edad acompañados por padres o tutores legales.
              </li>
            </ul>
          </div>

          {/* Column 4: Contacto & Pagos */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-forest-950">
              Atención & Coordinación
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Consultas, agendas de turnos y coordinaciones presenciales y virtuales vía WhatsApp directo.
            </p>
            <div className="pt-1">
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center space-x-2 bg-forest-700 hover:bg-forest-800 text-white px-4 py-2.5 rounded-full text-xs font-medium transition-all shadow-sm hover:shadow"
              >
                <MessageCircle className="w-4 h-4 fill-white/20 stroke-white" />
                <span>Coordinar WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright and legal disclaimer bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p className="text-center md:text-left leading-relaxed">
            © 2026 Despertar Sanaciones. Todos los derechos reservados. Las terapias complementarias no 
            sustituyen la atención médica convencional. En menores de edad se requiere acompañamiento 
            presencial de padres o tutores.
          </p>

          <div className="flex items-center space-x-4 flex-shrink-0">
            <span className="hover:text-stone-800 cursor-pointer">Privacidad y Ética</span>
            <span>•</span>
            <span className="hover:text-stone-800 cursor-pointer">Consentimiento Informado</span>
            <span>•</span>
            {isLoggedIn ? (
              <button
                onClick={onOpenAdmin}
                className="text-forest-700 font-semibold hover:underline flex items-center space-x-1"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Panel Admin</span>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="text-stone-500 hover:text-forest-800 transition-colors flex items-center space-x-1"
              >
                <span>Acceso Administrador</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
