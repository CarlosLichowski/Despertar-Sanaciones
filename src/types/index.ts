export interface Course {
  id: string;
  badge: string; // e.g. "FORMACIÓN CUÁNTICA"
  modality: string; // e.g. "Presencial y Online", "Intensivo", "Niveles 1, 2, 3 & Maestría"
  title: string;
  description: string;
  linkText?: string;
  category?: string;
  order?: number;
  duration?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  category: string;
  date: string; // ISO date string or formatted date e.g. "Octubre 2026"
  imageUrl?: string;
  author?: string;
  active: boolean;
  createdAt?: string;
}

export interface Inquiry {
  id?: string;
  fullName: string;
  whatsapp: string;
  email?: string;
  serviceType: string;
  modality: 'Presencial' | 'A Distancia / Virtual';
  message: string;
  createdAt: string;
  status: 'nueva' | 'atendida' | 'archivada';
}

export interface AdminUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
}
