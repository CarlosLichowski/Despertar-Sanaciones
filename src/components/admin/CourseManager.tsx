import React, { useState, useEffect } from 'react';
import type { Course } from '../../types';
import { subscribeCourses, saveCourse, deleteCourse, seedDefaultCourses } from '../../services/coursesService';
import { Plus, Edit2, Trash2, X, RefreshCw } from 'lucide-react';

export const CourseManager: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeCourses((data) => {
      setCourses(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenCreate = () => {
    setEditingCourse({
      id: `course-${Date.now()}`,
      badge: 'FORMACIÓN CUÁNTICA',
      modality: 'Presencial y Online',
      title: '',
      description: '',
      linkText: 'Programa detallado y temario',
      category: 'Holística',
      order: courses.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setEditingCourse({ ...course });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse || !editingCourse.title.trim() || !editingCourse.description.trim()) {
      alert('Por favor completa el título y la descripción del curso.');
      return;
    }

    await saveCourse(editingCourse);
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  const handleDelete = async (id: string) => {
    await deleteCourse(id);
    setDeleteConfirmId(null);
  };

  const handleRestoreDefaults = async () => {
    if (window.confirm('¿Deseas restablecer los cursos predeterminados de la landing page?')) {
      await seedDefaultCourses();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F6F4EE] p-4 sm:p-5 rounded-2xl border border-[#EAE6DE]">
        <div>
          <h3 className="font-serif text-xl font-bold text-forest-950">
            Gestión de Cursos y Capacitaciones
          </h3>
          <p className="text-xs text-stone-500">
            Modifica, actualiza los temarios, badges y modalidades de los cursos visibles en la web.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleRestoreDefaults}
            title="Restablecer cursos de diseño original"
            className="p-2.5 rounded-xl border border-stone-300 text-stone-600 hover:bg-white hover:text-forest-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center space-x-2 bg-forest-700 hover:bg-forest-800 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Curso</span>
          </button>
        </div>
      </div>

      {/* Courses List */}
      {loading ? (
        <div className="py-12 text-center text-stone-500">Cargando formaciones...</div>
      ) : courses.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#EAE6DE] p-8">
          <p className="text-stone-500 text-sm">No hay cursos registrados actualmente.</p>
          <button
            onClick={handleRestoreDefaults}
            className="mt-3 text-xs text-forest-700 font-semibold underline"
          >
            Cargar los cursos de Stitch
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-[#EAE6DE] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-sand-100 text-sand-800 text-[11px] font-semibold uppercase">
                    {course.badge}
                  </span>
                  <span className="text-xs text-stone-500">
                    {course.modality}
                  </span>
                </div>

                <h4 className="font-serif text-xl font-bold text-forest-950">
                  {course.title}
                </h4>

                <p className="text-xs sm:text-sm text-stone-600 line-clamp-3">
                  {course.description}
                </p>

                <div className="text-xs font-semibold text-forest-700">
                  Enlace: {course.linkText || 'Programa detallado'}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-end space-x-2">
                <button
                  onClick={() => handleOpenEdit(course)}
                  className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 hover:text-forest-800 transition-colors"
                  title="Editar curso"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {deleteConfirmId === course.id ? (
                  <div className="flex items-center space-x-1 bg-red-50 p-1 rounded-lg border border-red-200">
                    <button
                      onClick={() => handleDelete(course.id)}
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
                    onClick={() => setDeleteConfirmId(course.id)}
                    className="p-2 rounded-lg border border-stone-200 hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                    title="Eliminar curso"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      {isModalOpen && editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-floating border border-[#EAE6DE] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-forest-950 mb-1">
              {courses.some(c => c.id === editingCourse.id) ? 'Modificar Información del Curso' : 'Nuevo Curso o Formación'}
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Los cambios se sincronizarán directamente en la sección pública de Cursos.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nombre del Curso / Formación *
                </label>
                <input
                  type="text"
                  required
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  placeholder="Ej: Reiki Usui Tradicional"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-forest-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Etiqueta Superior (Badge)
                  </label>
                  <input
                    type="text"
                    value={editingCourse.badge}
                    onChange={(e) => setEditingCourse({ ...editingCourse, badge: e.target.value })}
                    placeholder="Ej: FORMACIÓN CUÁNTICA, SISTEMA USUI"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-forest-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Modalidad y Niveles
                  </label>
                  <input
                    type="text"
                    value={editingCourse.modality}
                    onChange={(e) => setEditingCourse({ ...editingCourse, modality: e.target.value })}
                    placeholder="Ej: Presencial y Online, Niveles 1, 2, 3"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-forest-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Descripción y Temario Sintético *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingCourse.description}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  placeholder="Detalla de qué trata la formación, técnicas enseñadas y enfoque..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-forest-600 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Texto del enlace / botón inferior
                </label>
                <input
                  type="text"
                  value={editingCourse.linkText || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, linkText: e.target.value })}
                  placeholder="Ej: Programa detallado y temario"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-forest-600"
                />
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
                  Guardar Curso
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
