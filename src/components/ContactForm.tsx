import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, MapPin, Globe } from 'lucide-react';
import { createInquiry } from '../services/inquiriesService';

interface ContactFormProps {
  initialService?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialService = '' }) => {
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState(initialService || '');
  const [modality, setModality] = useState<'Presencial' | 'A Distancia / Virtual'>('Presencial');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync if initialService changes from props
  React.useEffect(() => {
    if (initialService) {
      setServiceType(initialService);
    }
  }, [initialService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsapp.trim()) {
      alert('Por favor, ingresa al menos tu Nombre y tu Teléfono de WhatsApp.');
      return;
    }

    setSubmitting(true);

    try {
      // 1. Save to Firestore / local inquiries collection
      await createInquiry({
        fullName,
        whatsapp,
        email,
        serviceType: serviceType || 'Consulta General',
        modality,
        message,
        createdAt: new Date().toISOString(),
        status: 'nueva'
      });

      // 2. Determine recipient (Roberto for Limpieza de espacios, Silvia for Reiki/Cursos, or default)
      const isRobertoSpecialty = serviceType.toLowerCase().includes('limpieza') || 
                                 serviceType.toLowerCase().includes('espacios') || 
                                 serviceType.toLowerCase().includes('mascotas');
      const targetPhone = isRobertoSpecialty ? '5491165020421' : '5491123048560';

      const waText = `🌿 *Nueva Consulta desde la Web Despertar Sanaciones*\n\n` +
        `👤 *Nombre:* ${fullName}\n` +
        `📱 *WhatsApp:* ${whatsapp}\n` +
        (email ? `✉️ *Email:* ${email}\n` : '') +
        `✨ *Servicio de interés:* ${serviceType || 'Consulta general'}\n` +
        `📍 *Modalidad:* ${modality}\n` +
        (message ? `📝 *Detalle:* ${message}\n` : '');

      setSubmitted(true);

      // Open WhatsApp after brief delay
      setTimeout(() => {
        window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(waText)}`, '_blank');
      }, 700);

    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Floating White Card */}
        <div className="rounded-3xl sm:rounded-4xl bg-white border border-[#EAE6DE] p-8 sm:p-12 shadow-floating relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sand-100 border border-[#E8DEC8] text-xs font-semibold text-sand-800 tracking-wider uppercase">
              <span>• COMUNICACIÓN DIRECTA •</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
              Envíanos tu consulta
            </h2>

            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Completá tus datos y nos pondremos en contacto contigo a la brevedad para brindarte 
              orientación y asesoramiento personalizado.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-forest-100 text-forest-700 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest-950">
                ¡Muchas gracias por comunicarte!
              </h3>
              <p className="text-stone-600 max-w-md mx-auto text-sm">
                Hemos registrado tu consulta y abierto WhatsApp para que puedas conversar directamente con nosotros.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Nombre y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-2">
                    Nombre y Apellido <span className="text-forest-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Tu nombre completo"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F6F4EE]/60 border border-[#EAE6DE] text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-forest-600 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-2">
                    Teléfono / WhatsApp <span className="text-forest-700">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Ej: 11 2345 6789"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F6F4EE]/60 border border-[#EAE6DE] text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-forest-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Email y Servicio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F6F4EE]/60 border border-[#EAE6DE] text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-forest-600 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-2">
                    Tipo de servicio de interés <span className="text-forest-700">*</span>
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-[#F6F4EE]/60 border border-[#EAE6DE] text-sm text-stone-800 focus:outline-none focus:border-forest-600 focus:bg-white transition-all"
                  >
                    <option value="">Seleccione una opción...</option>
                    <optgroup label="Servicios Holísticos">
                      <option value="Apertura de Caminos & Sanación Cuántica">Apertura de Caminos & Sanación Cuántica</option>
                      <option value="Limpieza Energética de Espacios (Hogares o Comercios <300m²)">Limpieza Energética de Espacios (Hogares o Comercios &lt; 300m²)</option>
                      <option value="Limpieza Energética de Seres y Mascotas">Limpieza Energética de Seres y Mascotas</option>
                      <option value="Unión de Parejas y Sanación Vincular">Unión de Parejas y Sanación Vincular</option>
                      <option value="Acompañamiento en Adicciones (Menores acompañados)">Acompañamiento en Adicciones (Menores acompañados)</option>
                    </optgroup>
                    <optgroup label="Cursos y Formaciones">
                      <option value="Curso: Chamanismo Cuántico">Curso: Chamanismo Cuántico</option>
                      <option value="Curso: Sanación Cuántica">Curso: Sanación Cuántica</option>
                      <option value="Curso: Reiki Usui Tradicional (Todos los niveles)">Curso: Reiki Usui Tradicional (Todos los niveles)</option>
                      <option value="Curso: Reiki Karuna">Curso: Reiki Karuna</option>
                      <option value="Curso: Reiki Arco Iris Cristal">Curso: Reiki Arco Iris Cristal</option>
                    </optgroup>
                    <option value="Otra consulta general">Otra consulta general</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Modalidad de Preferencia */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Modalidad de preferencia
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setModality('Presencial')}
                    className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl border text-sm font-medium transition-all ${
                      modality === 'Presencial'
                        ? 'bg-forest-50 border-forest-600 text-forest-900 shadow-sm'
                        : 'bg-[#F6F4EE]/60 border-[#EAE6DE] text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-forest-700" />
                    <span>Presencial</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setModality('A Distancia / Virtual')}
                    className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl border text-sm font-medium transition-all ${
                      modality === 'A Distancia / Virtual'
                        ? 'bg-forest-50 border-forest-600 text-forest-900 shadow-sm'
                        : 'bg-[#F6F4EE]/60 border-[#EAE6DE] text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <Globe className="w-4 h-4 text-forest-700" />
                    <span>A Distancia (Virtual)</span>
                  </button>
                </div>
              </div>

              {/* Row 4: Mensaje */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Cuéntanos brevemente tu consulta
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntanos brevemente cuál es tu situación o qué servicio deseas acompañar..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#F6F4EE]/60 border border-[#EAE6DE] text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-forest-600 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center space-x-3 bg-forest-700 hover:bg-forest-800 text-white py-4 px-6 rounded-full font-medium text-sm sm:text-base transition-all duration-200 shadow-card hover:shadow-floating hover:-translate-y-0.5 disabled:opacity-70 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20 stroke-white" />
                  <span>
                    {submitting ? 'Registrando consulta...' : 'Enviar Consulta por WhatsApp Directo'}
                  </span>
                </button>

                <p className="text-center text-[11px] text-stone-500 mt-4 leading-normal">
                  Tus datos serán protegidos y tratados bajo estricta confidencialidad terapéutica.
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
