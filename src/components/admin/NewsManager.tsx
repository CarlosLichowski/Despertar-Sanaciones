import React, { useState, useEffect } from 'react';
import type { NewsItem } from '../../types';
import { subscribeNews, saveNews, deleteNews, seedDefaultNews } from '../../services/newsService';
import { Plus, Edit2, Trash2, Calendar, X, RefreshCw } from 'lucide-react';

export const NewsManager: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeNews((data) => {
      setNews(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem({
      id: `news-${Date.now()}`,
      title: '',
      summary: '',
      content: '',
      category: 'Formaciones',
      date: new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()),
      author: 'Silvia Villanueva',
      active: true,
      createdAt: new Date().toISOString()
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: NewsItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title.trim() || !editingItem.summary.trim()) {
      alert('Por favor completa el título y el resumen de la novedad.');
      return;
    }

    await saveNews(editingItem);
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (id: string) => {
    await deleteNews(id);
    setDeleteConfirmId(null);
  };

  const handleRestoreDefaults = async () => {
    if (window.confirm('¿Deseas restaurar las 3 novedades predeterminadas?')) {
      await seedDefaultNews();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F6F4EE] p-4 sm:p-5 rounded-2xl border border-[#EAE6DE]">
        <div>
          <h3 className="font-serif text-xl font-bold text-forest-950">
            Gestión de Novedades & Blog
          </h3>
          <p className="text-xs text-stone-500">
            Agrega, edita o elimina avisos y noticias visibles en la sección pública en tiempo real.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleRestoreDefaults}
            title="Restaurar ejemplos iniciales"
            className="p-2.5 rounded-xl border border-stone-300 text-stone-600 hover:bg-white hover:text-forest-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center space-x-2 bg-forest-700 hover:bg-forest-800 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Publicación</span>
          </button>
        </div>
      </div>

      {/* News List */}
      {loading ? (
        <div className="py-12 text-center text-stone-500">Cargando publicaciones...</div>
      ) : news.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#EAE6DE] p-8">
          <p className="text-stone-500 text-sm">No hay novedades registradas.</p>
          <button
            onClick={handleOpenCreate}
            className="mt-3 text-xs text-forest-700 font-semibold underline"
          >
            Crear la primera publicación
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#EAE6DE] p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-sage-100 text-forest-800 text-[11px] font-semibold">
                    {item.category}
                  </span>
                  <span className="text-xs text-stone-500 flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </span>
                  {!item.active && (
                    <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-600 text-[10px]">
                      Borrador / Oculta
                    </span>
                  )}
                </div>

                <h4 className="font-serif text-lg font-bold text-forest-950">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-stone-600 line-clamp-2">
                  {item.summary}
                </p>

                {item.author && (
                  <p className="text-[11px] text-stone-400">
                    Autor: <span className="text-stone-600 font-medium">{item.author}</span>
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 flex-shrink-0 self-end sm:self-center">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 hover:text-forest-800 transition-colors"
                  title="Editar publicación"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {deleteConfirmId === item.id ? (
                  <div className="flex items-center space-x-1 bg-red-50 p-1 rounded-lg border border-red-200">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="p-1 text-stone-500 hover:text-stone-800"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-2 rounded-lg border border-stone-200 hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                    title="Eliminar publicación"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-floating border border-[#EAE6DE] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-forest-950 mb-1">
              {news.some(n => n.id === editingItem.id) ? 'Editar Publicación' : 'Nueva Publicación de Novedad'}
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Esta novedad se actualizará de inmediato en la sección pública de la web.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Título de la Publicación *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="Ej: Nueva Jornada de Armonización Energética"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-forest-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Categoría
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-forest-600"
                  >
                    <option value="Formaciones">Formaciones</option>
                    <option value="Avisos & Turnos">Avisos & Turnos</option>
                    <option value="Talleres Especiales">Talleres Especiales</option>
                    <option value="Cursos y Sintonizaciones">Cursos y Sintonizaciones</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Fecha Visible
                  </label>
                  <input
                    type="text"
                    value={editingItem.date}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    placeholder="Ej: 15 de Octubre, 2026"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-forest-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Resumen / Descripción breve *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.summary}
                  onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                  placeholder="Breve explicación de la novedad para la tarjeta..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-forest-600 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Autor
                  </label>
                  <input
                    type="text"
                    value={editingItem.author || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                    placeholder="Silvia Villanueva / Roberto Vizza"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-forest-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Estado de publicación
                  </label>
                  <div className="flex items-center space-x-3 pt-2">
                    <label className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingItem.active}
                        onChange={(e) => setEditingItem({ ...editingItem, active: e.target.checked })}
                        className="rounded text-forest-700 focus:ring-forest-600 w-4 h-4"
                      />
                      <span>Publicación activa y visible en la web</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold shadow-sm"
                >
                  Guardar Publicación
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
