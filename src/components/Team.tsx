import React from 'react';
import { MessageCircle, Phone, Mail } from 'lucide-react';

export const Team: React.FC = () => {
  const openSilviaWhatsApp = () => {
    window.open(
      'https://wa.me/5491123048560?text=Hola%20Silvia,%20me%20comunico%20desde%20la%20web%20Despertar%20Sanaciones%20para%20coordinar%20una%20consulta.',
      '_blank'
    );
  };

  const openRobertoWhatsApp = () => {
    window.open(
      'https://wa.me/5491165020421?text=Hola%20Roberto,%20me%20comunico%20desde%20la%20web%20Despertar%20Sanaciones%20para%20coordinar%20una%20limpieza%20o%20terapia.',
      '_blank'
    );
  };

  return (
    <section id="equipo" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sand-100 border border-[#E8DEC8] text-xs font-semibold text-sand-800 tracking-wider uppercase">
            <span>• ACOMPAÑAMIENTO CON TRAYECTORIA •</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950">
            Tu Equipo Terapéutico
          </h2>

          <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            Vocación de servicio, amplia experiencia y calidez humana en cada encuentro.
          </p>
        </div>

        {/* 2 Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          
          {/* Silvia Villanueva */}
          <div className="rounded-3xl bg-white border border-[#EAE6DE] p-8 sm:p-10 shadow-card hover:shadow-floating transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Header with avatar */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-sage-100 border-2 border-sage-200 text-forest-800 flex items-center justify-center font-serif text-2xl font-bold flex-shrink-0 shadow-sm">
                  SV
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-forest-950">
                    Silvia Villanueva
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 font-medium">
                    Terapeuta Holística & Facilitadora de Reiki
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-stone-600 leading-relaxed">
                Guiada por una profunda empatía y compromiso con el despertar mutuo. Acompaña 
                procesos de sanación emocional, vínculos conscientes, apertura cuántica de caminos 
                y formaciones holísticas de Reiki en todos sus sistemas.
              </p>

              {/* Contact info list */}
              <div className="space-y-2.5 pt-4 border-t border-stone-100 text-xs sm:text-sm text-stone-600">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-forest-700 flex-shrink-0" />
                  <a href="tel:1123048560" className="hover:text-forest-800 font-medium transition-colors">
                    11-2304-8560
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-forest-700 flex-shrink-0" />
                  <a href="mailto:silvillanueva14@gmail.com" className="hover:text-forest-800 font-medium transition-colors">
                    silvillanueva14@gmail.com
                  </a>
                </div>
              </div>

            </div>

            {/* Direct WhatsApp Button */}
            <div className="pt-8 mt-6">
              <button
                onClick={openSilviaWhatsApp}
                className="w-full inline-flex items-center justify-center space-x-2.5 bg-forest-700 hover:bg-forest-800 text-white py-3.5 px-6 rounded-full font-medium text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 shadow-soft hover:shadow-card hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-white/20 stroke-white" />
                <span>MENSAJE DIRECTO CON SILVIA</span>
              </button>
            </div>
          </div>

          {/* Roberto Vizza */}
          <div className="rounded-3xl bg-white border border-[#EAE6DE] p-8 sm:p-10 shadow-card hover:shadow-floating transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Header with avatar */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-sand-100 border-2 border-sand-200 text-sand-800 flex items-center justify-center font-serif text-2xl font-bold flex-shrink-0 shadow-sm">
                  RV
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-forest-950">
                    Roberto Vizza
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 font-medium">
                    Sanador Espiritual & Terapeuta Holístico
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-stone-600 leading-relaxed">
                Especialista en desbloqueos de sitios complejos, limpiezas energéticas de espacios 
                comerciales y residenciales (que no superen hasta 300 m²), armonización y alivio 
                personal y cuidado compasivo de animales de compañía.
              </p>

              {/* Contact info list */}
              <div className="space-y-2.5 pt-4 border-t border-stone-100 text-xs sm:text-sm text-stone-600">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-forest-700 flex-shrink-0" />
                  <a href="tel:1165020421" className="hover:text-forest-800 font-medium transition-colors">
                    11-6502-0421
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-forest-700 flex-shrink-0" />
                  <a href="mailto:robertovizza@hotmail.com" className="hover:text-forest-800 font-medium transition-colors">
                    robertovizza@hotmail.com
                  </a>
                </div>
              </div>

            </div>

            {/* Direct WhatsApp Button */}
            <div className="pt-8 mt-6">
              <button
                onClick={openRobertoWhatsApp}
                className="w-full inline-flex items-center justify-center space-x-2.5 bg-forest-700 hover:bg-forest-800 text-white py-3.5 px-6 rounded-full font-medium text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 shadow-soft hover:shadow-card hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-white/20 stroke-white" />
                <span>MENSAJE DIRECTO CON ROBERTO</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
