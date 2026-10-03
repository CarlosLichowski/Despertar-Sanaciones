import React from 'react';
import { Sparkles, Home, Heart, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="servicios" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sand-100 border border-[#E8DEC8] text-xs font-semibold text-sand-800 tracking-wider uppercase">
            <span>• SERVICIOS Y TERAPIAS HOLÍSTICAS •</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950">
            Nuestros Servicios y Acompañamientos
          </h2>

          <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            Abordajes conscientes diseñados para restaurar tu equilibrio vibratorio, liberar cargas 
            y bloqueos, y despertar tu potencial de bienestar integral.
          </p>
        </div>

        {/* 3 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Apertura de Caminos */}
          <div className="rounded-3xl bg-white border border-[#EAE6DE] p-7 sm:p-8 shadow-card hover:shadow-floating transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-6">
              
              {/* Top Row: Icon & Tag */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sand-100 text-sand-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-sand-100 text-sand-700 text-xs font-semibold tracking-wide uppercase">
                  ENFOQUE PERSONAL
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-forest-950 mb-3 group-hover:text-forest-700 transition-colors">
                  Apertura de Caminos Energéticos & Sanación Cuántica
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Desbloqueo de canales profundos en tu actividad cotidiana y activación de frecuencias 
                  para el bienestar y la fluidez económica y emocional. Bienestar cotidiano.
                </p>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3 pt-2 border-t border-stone-100">
                <li className="flex items-start space-x-2.5 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                  <span>Alineación y balanceo de chakras y campo áurico</span>
                </li>
                <li className="flex items-start space-x-2.5 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                  <span>Resolución de bloqueos emocionales no resueltos</span>
                </li>
                <li className="flex items-start space-x-2.5 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                  <span>Activación consciente de tu potencial bioenergético natural</span>
                </li>
              </ul>

              {/* Medical reassurance note */}
              <div className="p-3 rounded-xl bg-sage-50/70 border border-sage-200/60 text-[11px] text-forest-800 font-medium">
                ✨ Terapia complementaria armónica — <strong>Sin dejar a su Médico</strong>.
              </div>

            </div>

            {/* Bottom Action Button */}
            <div className="pt-6 mt-6 border-t border-stone-100">
              <button
                onClick={() => onSelectService('Apertura de Caminos & Sanación Cuántica')}
                className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-stone-50 hover:bg-forest-50 text-stone-800 hover:text-forest-800 text-sm font-medium border border-stone-200 transition-all duration-200 group-hover:border-forest-200"
              >
                <span>Conversar por este servicio</span>
                <ArrowRight className="w-4 h-4 text-forest-700 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Limpieza de Espacios, Seres y Mascotas */}
          <div className="rounded-3xl bg-white border border-[#EAE6DE] p-7 sm:p-8 shadow-card hover:shadow-floating transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-6">
              
              {/* Top Row: Icon & Tag */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sage-100 text-forest-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Home className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-sage-100 text-forest-800 text-xs font-semibold tracking-wide uppercase">
                  ESPACIOS Y MASCOTAS
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-forest-950 mb-3 group-hover:text-forest-700 transition-colors">
                  Limpieza Energética de Espacios, Seres y Mascotas
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Purificación y elevación vibratoria de ambientes, clínicas, domicilios o comercios, así como 
                  descarga de tensiones presentes y armonización en animales y seres queridos.
                </p>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3 pt-2 border-t border-stone-100">
                <li className="flex items-start space-x-2.5 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                  <span>Modalidad presencial y a distancia con detección de fuentes nocivas</span>
                </li>
                <li className="flex items-start space-x-2.5 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                  <span>Comercios, oficinas y hogares (especialistas menores a 300 m²)</span>
                </li>
                <li className="flex items-start space-x-2.5 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                  <span>Armonización directa en mascotas con técnicas no invasivas y respeto animal</span>
                </li>
              </ul>

              {/* Note */}
              <div className="p-3 rounded-xl bg-sage-50/70 border border-sage-200/60 text-[11px] text-forest-800 font-medium">
                🏡 Presencial y a distancia con seguimiento de purificación.
              </div>

            </div>

            {/* Bottom Action Button */}
            <div className="pt-6 mt-6 border-t border-stone-100">
              <button
                onClick={() => onSelectService('Limpieza Energética de Espacios y Mascotas')}
                className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-stone-50 hover:bg-forest-50 text-stone-800 hover:text-forest-800 text-sm font-medium border border-stone-200 transition-all duration-200 group-hover:border-forest-200"
              >
                <span>Agendar Limpieza en Espacios o Seres</span>
                <ArrowRight className="w-4 h-4 text-forest-700 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 3: Unión de Parejas & Adicciones */}
          <div className="rounded-3xl bg-white border border-[#EAE6DE] p-7 sm:p-8 shadow-card hover:shadow-floating transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-6">
              
              {/* Top Row: Icon & Tag */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sand-100 text-sand-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Heart className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-sand-100 text-sand-700 text-xs font-semibold tracking-wide uppercase">
                  VÍNCULOS Y HOGAR
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-forest-950 mb-3 group-hover:text-forest-700 transition-colors">
                  Unión de Parejas & Acompañamiento en Adicciones
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Terapia de reconexión vincular para destrabar la comunicación afectiva libre de toxicidad 
                  y abordaje coordinado para asistencia vibratoria para dependencias.
                </p>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3 pt-2 border-t border-stone-100">
                <li className="flex items-start space-x-2.5 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                  <span>Reconexión de lazos conscientes y sanación de memorias dolorosas</span>
                </li>
                <li className="flex items-start space-x-2.5 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                  <span>Soporte energético simultáneo para parejas y procesos de apego</span>
                </li>
              </ul>

              {/* Highlight Box for Minors (as in Stitch) */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 leading-relaxed flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold">Atención a menores:</strong> Los acompañamientos en menores se realizan 
                  siempre acompañados presencialmente por sus padres y/o tutores legales.
                </div>
              </div>

            </div>

            {/* Bottom Action Button */}
            <div className="pt-6 mt-6 border-t border-stone-100">
              <button
                onClick={() => onSelectService('Unión de Parejas y Asistencia en Adicciones')}
                className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-stone-50 hover:bg-forest-50 text-stone-800 hover:text-forest-800 text-sm font-medium border border-stone-200 transition-all duration-200 group-hover:border-forest-200"
              >
                <span>Consultar orientación confidencial</span>
                <ArrowRight className="w-4 h-4 text-forest-700 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
