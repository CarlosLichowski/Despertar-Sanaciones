import React, { useEffect, useState } from 'react';
import type { Course } from '../types';
import { subscribeCourses } from '../services/coursesService';
import { CheckCircle2, ArrowRight, Bookmark, Sparkles } from 'lucide-react';

interface CoursesProps {
  onSelectCourse: (courseTitle: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ onSelectCourse }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeCourses((data) => {
      setCourses(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleConsultGeneral = () => {
    window.open(
      'https://wa.me/5491123048560?text=Hola,%20quisiera%20asesoramiento%20sobre%20las%20formaciones%20y%20cursos%20hol%C3%ADsticos%20de%20Despertar%20Sanaciones.',
      '_blank'
    );
  };

  return (
    <section id="cursos" className="py-20 md:py-28 bg-[#F6F4EE]/60 border-y border-[#EAE6DE]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sand-100 border border-[#E8DEC8] text-xs font-semibold text-sand-800 tracking-wider uppercase">
            <span>• EDUCACIÓN INTEGRAL & TERAPÉUTICA •</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950">
            Cursos y Formaciones Holísticas
          </h2>

          <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            Aprende herramientas ancestrales y cuánticas para tu propia evolución o para acompañar 
            a otros terapéuticamente con certificación de honor y rigor espiritual.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {loading ? (
            <div className="col-span-full py-12 text-center text-stone-500 flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-forest-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Cargando formaciones holísticas...</span>
            </div>
          ) : (
            courses.map((course) => (
              <div
                key={course.id}
                className="rounded-3xl bg-white border border-[#EAE6DE] p-7 shadow-card hover:shadow-floating transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-sand-100 text-sand-800 text-[11px] font-semibold tracking-wide uppercase">
                      {course.badge || 'FORMACIÓN'}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      {course.modality}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="font-serif text-2xl font-bold text-forest-950 group-hover:text-forest-700 transition-colors">
                    {course.title}
                  </h3>

                  {/* Course Description */}
                  <p className="text-sm text-stone-600 leading-relaxed min-h-[4.5rem]">
                    {course.description}
                  </p>
                </div>

                {/* Bottom link & action */}
                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => onSelectCourse(course.title)}
                    className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-forest-700 hover:text-forest-900 group-hover:underline underline-offset-4"
                  >
                    <span>{course.linkText || 'Programa detallado y temario'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="w-8 h-8 rounded-full bg-stone-50 group-hover:bg-sand-100 text-stone-400 group-hover:text-sand-700 flex items-center justify-center transition-colors">
                    <Bookmark className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))
          )}

          {/* 6th Featured Card: Formación Integral */}
          <div className="rounded-3xl bg-forest-700 text-white p-7 sm:p-8 shadow-card flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-5 relative z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-800/80 border border-forest-600/50 text-[11px] font-semibold tracking-wider uppercase text-sand-200">
                <Sparkles className="w-3 h-3 text-sand-300" />
                <span>¿DUDAS SOBRE CUÁL ELEGIR?</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                Tu Formación Integral a tu Medida
              </h3>

              <ul className="space-y-3 pt-2">
                <li className="flex items-start space-x-2.5 text-xs sm:text-sm text-sand-100/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Material teórico en PDF con acceso digital 100%</span>
                </li>
                <li className="flex items-start space-x-2.5 text-xs sm:text-sm text-sand-100/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Sintonización energética individualizada</span>
                </li>
                <li className="flex items-start space-x-2.5 text-xs sm:text-sm text-sand-100/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Comunidad y seguimiento constante</span>
                </li>
                <li className="flex items-start space-x-2.5 text-xs sm:text-sm text-sand-100/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Diplomas y certificación oficial de facilitador</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-forest-600/40 relative z-10">
              <button
                onClick={handleConsultGeneral}
                className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-4 rounded-full bg-white hover:bg-sand-50 text-forest-900 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow group-hover:scale-[1.02]"
              >
                <span>Solicitar Asesoría por WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-forest-800" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
