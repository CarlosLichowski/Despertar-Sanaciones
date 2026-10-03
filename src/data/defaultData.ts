import type { Course, NewsItem } from '../types';

export const DEFAULT_COURSES: Course[] = [
  {
    id: 'chamanismo-cuantico',
    badge: 'FORMACIÓN CUÁNTICA',
    modality: 'Presencial y Online',
    title: 'Chamanismo Cuántico',
    description: 'Conexión profunda con sabiduría de pueblos ancestrales de la tierra, lectura de planos sutiles, recuperación del fragmento de alma y transmutación mediante sahumadores.',
    linkText: 'Programa detallado y temario',
    category: 'Chamanismo',
    order: 1
  },
  {
    id: 'sanacion-cuantica',
    badge: 'SANACIÓN VIBRACIONAL',
    modality: 'Intensivo',
    title: 'Sanación Cuántica',
    description: 'Técnicas avanzadas de sanación desde campos mórficos, reprogramación celular energética, integración de frecuencias de luz y equilibrio del cuerpo electromagnético.',
    linkText: 'Requisitos & Certificación',
    category: 'Cuántica',
    order: 2
  },
  {
    id: 'reiki-usui-tradicional',
    badge: 'SISTEMA USUI',
    modality: 'Niveles 1, 2, 3 & Maestría',
    title: 'Reiki Usui Tradicional',
    description: 'Iniciación clásica y sucesivas matrices del Maestro Mikao Usui. Transmisión de símbolos sagrados, sintonización de canales y protocolos de imposición de manos.',
    linkText: 'Todos los niveles',
    category: 'Reiki',
    order: 3
  },
  {
    id: 'reiki-karuna',
    badge: 'EXPANSIÓN REIKI',
    modality: 'Avanzado',
    title: 'Reiki Karuna',
    description: 'Sanación compasiva de alta frecuencia enfocada en la liberación de patrones kármicos profundos, reconexión con mantras y armonización del yo cuántico.',
    linkText: 'Prerrequisito: Nivel 3',
    category: 'Reiki',
    order: 4
  },
  {
    id: 'reiki-arco-iris-cristal',
    badge: 'NUEVAS FRECUENCIAS',
    modality: 'Multidimensional',
    title: 'Reiki Arco Iris Cristal',
    description: 'Frecuencias de cristalización estelar para la disolución de bloqueos sutiles, activación de memorias del alma estelar y reordenamiento profundo a nivel mental.',
    linkText: 'Solicitar información',
    category: 'Reiki',
    order: 5
  }
];

export const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 'iniciacion-reiki-usui-octubre',
    title: 'Iniciación en Reiki Usui Tradicional (Niveles I y II)',
    summary: 'Abrimos cupos para las nuevas fechas de sintonización. Aprende a canalizar la energía vital universal para autotratamiento y sanación a otros.',
    content: 'Un encuentro transformador donde recibirás las sintonizaciones sagradas del linaje Usui, manual completo en PDF y diploma de certificación.',
    category: 'Formaciones',
    date: '15 de Octubre, 2026',
    active: true,
    author: 'Silvia Villanueva',
    createdAt: new Date().toISOString()
  },
  {
    id: 'limpiezas-energeticas-espacios-guia',
    title: 'Apertura de Agenda: Limpiezas de Casas y Comercios',
    summary: 'Coordinamos jornadas presenciales y a distancia para despejar cargas densas en propiedades de hasta 300 m² y devolver la armonía a los ambientes.',
    content: 'Revisión exhaustiva de geopatías, memorias de paredes y bloqueos energéticos en hogares, locales y consultorios. Resultados inmediatos en el ambiente.',
    category: 'Avisos & Turnos',
    date: '28 de Octubre, 2026',
    active: true,
    author: 'Roberto Vizza',
    createdAt: new Date().toISOString()
  },
  {
    id: 'circulo-chamanismo-cuantico',
    title: 'Círculo de Sanación y Sahumado con Chamanismo Cuántico',
    summary: 'Un espacio sagrado para reconectar con los elementos de la naturaleza, desatar nudos energéticos y liberar cargas ancestrales.',
    content: 'Aprenderemos el uso consciente de resinas sagradas, tambor chamánico y lectura de campos sutiles para transmutar densidades.',
    category: 'Talleres Especiales',
    date: '10 de Noviembre, 2026',
    active: true,
    author: 'Silvia y Roberto',
    createdAt: new Date().toISOString()
  }
];
