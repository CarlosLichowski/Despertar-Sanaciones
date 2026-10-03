import React, { useState, useEffect } from 'react';
import type { Inquiry } from '../../types';
import { subscribeInquiries, deleteInquiry } from '../../services/inquiriesService';
import { MessageCircle, Trash2, MapPin, Calendar } from 'lucide-react';

export const InquiriesManager: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeInquiries((data) => {
      setInquiries(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenWhatsApp = (inquiry: Inquiry) => {
    const cleanPhone = inquiry.whatsapp.replace(/\D/g, '');
    const targetPhone = cleanPhone.startsWith('54') ? cleanPhone : `54${cleanPhone}`;
    const text = encodeURIComponent(`Hola ${inquiry.fullName}, me comunico desde Despertar Sanaciones en relación a tu consulta sobre "${inquiry.serviceType}".`);
    window.open(`https://wa.me/${targetPhone}?text=${text}`, '_blank');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Deseas eliminar este registro de consulta?')) {
      await deleteInquiry(id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top action bar */}
      <div className="bg-[#F6F4EE] p-4 sm:p-5 rounded-2xl border border-[#EAE6DE]">
        <h3 className="font-serif text-xl font-bold text-forest-950">
          Consultas y Mensajes Recibidos
        </h3>
        <p className="text-xs text-stone-500">
          Mensajes enviados desde el formulario de contacto para seguimiento personalizado.
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-stone-500">Cargando consultas...</div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#EAE6DE] p-8">
          <p className="text-stone-500 text-sm">No hay consultas registradas aún.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-white rounded-2xl border border-[#EAE6DE] p-5 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div>
                  <h4 className="font-serif text-lg font-bold text-forest-950">
                    {inq.fullName}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mt-0.5">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(inq.createdAt).toLocaleString('es-AR')}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{inq.modality}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenWhatsApp(inq)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Responder por WhatsApp</span>
                  </button>

                  <button
                    onClick={() => inq.id && handleDelete(inq.id)}
                    className="p-1.5 rounded-lg border border-stone-200 hover:bg-red-50 text-stone-400 hover:text-red-600"
                    title="Eliminar consulta"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Service & Details */}
              <div className="text-xs sm:text-sm text-stone-700 space-y-2">
                <div>
                  <strong className="text-forest-900">Servicio solicitado:</strong>{' '}
                  <span className="px-2 py-0.5 rounded-md bg-sand-100 text-sand-800 font-medium">
                    {inq.serviceType}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-stone-600">
                  <div>
                    <strong>WhatsApp:</strong> {inq.whatsapp}
                  </div>
                  {inq.email && (
                    <div>
                      <strong>Email:</strong> {inq.email}
                    </div>
                  )}
                </div>

                {inq.message && (
                  <div className="p-3 rounded-xl bg-stone-50 text-stone-700 text-xs italic border border-stone-100 mt-2">
                    "{inq.message}"
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
