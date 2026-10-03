import React from 'react';
import { MessageCircle, ArrowDown, Sparkles, HeartHandshake, Award, Sun } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/5491123048560?text=Hola,%20quisiera%20recibir%20informaci%C3%B3n%20sobre%20las%20terapias%20y%20cursos%20de%20Despertar%20Sanaciones.',
      '_blank'
    );
  };

  return (
    <section id="inicio" className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sand-100 border border-[#E8DEC8] text-xs font-medium text-sand-800 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-forest-700"></span>
              <span>Espacio Terapéutico Holístico & Formación Consciente</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-forest-950 leading-[1.12]">
              Despertar Sanaciones:{' '}
              <span className="italic font-normal font-serif text-forest-700">Armonía</span>, Energía y Consciencia Integral
            </h1>

            {/* Description Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-2xl">
              Un espacio sagrado y profesional pensado para acompañarte en tus procesos de 
              transformación personal, equilibrio bioenergético y evolución espiritual con respaldo, 
              contención y respeto profundo.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center space-x-2.5 bg-forest-700 hover:bg-forest-800 text-white px-7 py-3.5 rounded-full font-medium text-sm sm:text-base transition-all duration-200 shadow-card hover:shadow-floating hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-white/20 stroke-white" />
                <span>Contactar por WhatsApp</span>
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center space-x-2 bg-white hover:bg-forest-50 border border-subtle text-stone-700 hover:text-forest-800 px-6 py-3.5 rounded-full font-medium text-sm sm:text-base transition-all duration-200 shadow-soft"
              >
                <span>Explorar Terapias y Cursos</span>
                <ArrowDown className="w-4 h-4 text-forest-700" />
              </button>
            </div>

            {/* Benefit Pills underneath */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#EAE6DE]/80">
              
              <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/70 border border-[#EAE6DE] shadow-sm">
                <div className="w-9 h-9 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0 text-forest-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-stone-700 leading-snug">
                  Atención personalizada y confidencial
                </span>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/70 border border-[#EAE6DE] shadow-sm">
                <div className="w-9 h-9 rounded-full bg-sand-100 flex items-center justify-center flex-shrink-0 text-sand-700">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-stone-700 leading-snug">
                  Acompañamiento por terapeutas calificados
                </span>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/70 border border-[#EAE6DE] shadow-sm">
                <div className="w-9 h-9 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0 text-forest-700">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-stone-700 leading-snug">
                  Formaciones con certificación holística
                </span>
              </div>

            </div>

          </div>

          {/* Right Column: Hero Visual from Stitch */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative backdrop */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-sage-200/40 to-sand-200/30 rounded-[3rem] filter blur-xl opacity-70"></div>
              
              {/* Main image container */}
              <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-white shadow-floating bg-stone-100 aspect-[4/5] sm:aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                  alt="Espacio Holístico de Sanación y Paz"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating pill badge on the image (Stitch style) */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-card">
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-full bg-sand-100 border border-sand-200 flex items-center justify-center flex-shrink-0 text-sand-700">
                      <Sun className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-forest-900 leading-none">
                        Más de 15 años
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 leading-snug">
                        Acompañando trayectorias y facilitando sanación y armonía a familias y personas.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Minimal top right accent dot */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-forest-800 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-700"></span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
