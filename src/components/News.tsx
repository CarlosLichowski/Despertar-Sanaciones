import React, { useEffect, useState } from 'react';
import type { NewsItem } from '../types';
import { subscribeNews } from '../services/newsService';
import { Calendar, Tag, ArrowRight, Bell, Sparkles } from 'lucide-react';

interface NewsProps {
  onSelectNews: (newsTitle: string) => void;
}

export const News: React.FC<NewsProps> = ({ onSelectNews }) => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeNews((data) => {
      const activeItems = data.filter(item => item.active !== false);
      setNewsList(activeItems);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleConsultWhatsApp = (itemTitle: string) => {
    const text = encodeURIComponent(`Hola Despertar Sanaciones, vi la novedad "${itemTitle}" en su web y quisiera consultar más información o cupos.`);
    window.open(`https://wa.me/5491123048560?text=${text}`, '_blank');
  };

  return (
    <section id="novedades" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sand-100 border border-[#E8DEC8] text-xs font-semibold text-sand-800 tracking-wider uppercase">
            <Bell className="w-3.5 h-3.5 text-sand-700" />
            <span>• ACTUALIDAD & AVISOS •</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950">
            Novedades y Próximos Encuentros
          </h2>

          <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            Fechas de próximas sintonizaciones, talleres vivenciales, apertura de agendas para limpiezas y 
            comunicados de nuestro espacio.
          </p>
        </div>

        {/* Dynamic News List */}
        {loading ? (
          <div className="py-12 text-center text-stone-500 flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-forest-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Cargando novedades en tiempo real...</span>
          </div>
        ) : newsList.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#EAE6DE] p-8 max-w-md mx-auto">
            <Sparkles className="w-8 h-8 text-sand-500 mx-auto mb-3" />
            <p className="text-stone-600 font-serif text-lg">Pronto compartiremos nuevos avisos y talleres.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl bg-white border border-[#EAE6DE] p-7 shadow-card hover:shadow-floating transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sage-100 text-forest-800 text-[11px] font-semibold tracking-wide uppercase">
                      <Tag className="w-3 h-3" />
                      <span>{item.category || 'General'}</span>
                    </span>

                    <span className="inline-flex items-center space-x-1.5 text-xs text-stone-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl font-bold text-forest-950 group-hover:text-forest-700 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Optional author */}
                  {item.author && (
                    <div className="text-xs text-stone-500 pt-1 font-medium">
                      Por: <span className="text-forest-800">{item.author}</span>
                    </div>
                  )}
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => handleConsultWhatsApp(item.title)}
                    className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-forest-700 hover:text-forest-900 group-hover:underline underline-offset-4"
                  >
                    <span>Consultar o inscribirse</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onSelectNews(item.title)}
                    className="text-xs text-stone-500 hover:text-stone-800 px-3 py-1 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
                  >
                    Consultar en web
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
