# Despertar Sanaciones | Landing Page & Panel de Administración

Landing page holística y profesional desarrollada con **React**, **TypeScript**, **Tailwind CSS**, **Firebase Auth** y **Cloud Firestore**, replicando fielmente el diseño visual de Stitch.

---

## 🌟 Características Principales

### 1. Frontend Público (Fiel al diseño de Stitch)
- **Header & Navegación Fija**: Logo y emblema de marca, selector de secciones con scroll suave, botón de acción rápida a WhatsApp y acceso discreto al **Panel de Administración**.
- **Hero Banner**:
  - Encabezado tipográfico con serif y acento cursivo: *"Despertar Sanaciones: Armonía, Energía y Consciencia Integral"*.
  - Llamados a la acción directos (WhatsApp y exploración de terapias).
  - 3 insignias de beneficios (Atención confidencial, Acompañamiento calificado, Formaciones con certificación).
  - Tarjeta visual con estética zen y badge flotante de *"Más de 15 años acompañando trayectorias"*.
- **Banner de Compromiso Ético & Médico**:
  - Reafirmación de abordaje complementario: *"Sin dejar a su médico ni sustituir tratamientos médicos convencionales"*.
  - Disparador interactivo *"¿En qué podemos acompañarte hoy?"*.
- **Servicios Holísticos en Tarjetas Grid**:
  1. *Apertura de Caminos Energéticos & Sanación Cuántica* (Enfoque personal, "Sin dejar a su Médico").
  2. *Limpieza Energética de Espacios, Seres y Mascotas* (Especialistas en propiedades &lt; 300 m²).
  3. *Unión de Parejas & Acompañamiento en Adicciones* (Con aviso destacado de menores acompañados por padres/tutores).
- **Cursos y Formaciones Holísticas (Dinámico)**:
  - Chamanismo Cuántico, Sanación Cuántica, Reiki Usui Tradicional (todos los niveles), Reiki Karuna, Reiki Arco Iris Cristal.
  - Tarjeta destacada verde bosque *"Tu Formación Integral a tu Medida"*.
- **Novedades y Avisos Holísticos (Dinámico en tiempo real)**:
  - Publicaciones con categorías, fechas, resúmenes y contacto directo vía WhatsApp por cada noticia.
- **Tu Equipo Terapéutico**:
  - Tarjeta de **Silvia Villanueva** (11-2304-8560 | silvillanueva14@gmail.com) con botón de mensaje directo a WhatsApp.
  - Tarjeta de **Roberto Vizza** (11-6502-0421 | robertovizza@hotmail.com) con botón de mensaje directo a WhatsApp.
- **Formulario de Contacto ("Envíanos tu consulta")**:
  - Selector de servicios, modalidad (Presencial / A Distancia Virtual), campos validados.
  - Registro directo en Firestore (`inquiries`) y apertura simultánea de WhatsApp con el mensaje pre-cargado.
- **Footer Completo**:
  - 4 columnas con enlaces a cursos, terapeutas, acreditación y aviso médico/legal.

---

### 2. Panel de Administración Seguro (Firebase)
- **Acceso Protegido**: Modal de login seguro por email y contraseña.
- **Modo Demostración / Offline out-of-the-box**: Si aún no configuraste las credenciales de Firebase en `.env`, el panel funciona al 100% de manera interactiva con almacenamiento local reactivo.
  - *Credenciales de prueba:*
    - **Email:** `admin@despertarsanaciones.com`
    - **Contraseña:** `admin123`
- **Gestión de Novedades (CRUD Completo)**:
  - **Crear** nuevas publicaciones (título, categoría, fecha, resumen, autor, estado activo/inactivo).
  - **Editar** publicaciones existentes.
  - **Eliminar** publicaciones con confirmación.
  - Reflejo instantáneo en la sección pública.
- **Gestión de Cursos y Formaciones**:
  - Edición de títulos, temarios, modalidades, badges y enlaces.
  - Creación de nuevas formaciones y restablecimiento en 1 clic.
- **Bandeja de Consultas Recibidas**:
  - Visualización de consultas enviadas desde el formulario web con botón de respuesta directa a WhatsApp.
- **Sincronización & Firestore Seed**:
  - Botón para poblar Cloud Firestore con los datos iniciales exactos de Stitch en un solo clic.

---

## 🚀 Puesta en Marcha Local

```bash
# 1. Instalar dependencias (ya instaladas)
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build
```

---

## 🔒 Configuración de Firebase en Producción

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com).
2. Habilita **Authentication** (Proveedor: Correo electrónico / Contraseña) y crea un usuario administrador.
3. Habilita **Cloud Firestore**.
4. Copia tus credenciales en el archivo `.env`:
```env
VITE_FIREBASE_API_KEY=tu_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### Reglas de Seguridad de Firestore
El archivo [firestore.rules](firestore.rules) ya está configurado con:
- Lectura pública para `courses` y `news`.
- Creación pública con validación de esquema para `inquiries`.
- Acceso de lectura, edición y eliminación estrictamente protegido para administradores autenticados.

---

## 🌐 Despliegue en Firebase Hosting

```bash
# 1. Iniciar sesión en Firebase CLI
firebase login

# 2. Vincular el proyecto
firebase use tu-proyecto-id

# 3. Desplegar hosting y reglas de Firestore
npm run build
firebase deploy
```
