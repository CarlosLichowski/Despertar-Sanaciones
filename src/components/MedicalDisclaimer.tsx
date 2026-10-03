import React from 'react';
import { ShieldCheck, MessageCircle } from 'lucide-react';

export const MedicalDisclaimer: React.FC = () => {
  const handleOpenChat = () => {
    window.open(
      'https://wa.me/5491123048560?text=Hola,%20quisiera%20hacerles%20una%20consulta%20sobre%20sus%20terapias.',
      '_blank'
    );
  };

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-sage-50 border border-sage-200/80 p-5 sm:p-6 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          
          <div className="flex items-start space-x-4 max-w-4xl">
            <div className="w-12 h-12 rounded-full bg-forest-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-forest-950">
                  Compromiso de Cuidado Consciente & Humanístico
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-800 text-[11px] font-semibold tracking-wide uppercase">
                  Información Importante
                </span>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">
                Nuestras terapias y limpiezas energéticas son abordajes holísticos complementarios que se integran 
                en tu bienestar cotidiano. <strong className="font-semibold text-forest-900">Sin dejar a su médico</strong> ni 
                sustituir diagnósticos o tratamientos médicos convencionales.
              </p>
            </div>
          </div>

          {/* Quick interactive trigger */}
          <button
            onClick={handleOpenChat}
            className="flex-shrink-0 self-end md:self-center inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-white hover:bg-forest-50 border border-[#D5E2D8] text-xs sm:text-sm font-medium text-forest-800 shadow-sm hover:shadow transition-all group"
          >
            <span>¿En qué podemos acompañarte hoy?</span>
            <div className="w-6 h-6 rounded-full bg-forest-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-3.5 h-3.5" />
            </div>
          </button>

        </div>
      </div>
    </section>
  );
};
