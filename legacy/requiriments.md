# [LEGACY] Requisitos del Agente de Asistencias (v1.0)

> [!CAUTION]
> This document is for historical reference. The current project requirements are located in the root [requirements.md](file:///c:/Proyectos%20BC3%20U5/Agente-de-asistencias-2.0/requirements.md).

## 1. Descripción General del Proyecto
BiotecHub es una plataforma web interactiva diseñada para el estudio y gestión de conocimientos en microbiología y biotecnología. Permite a los investigadores crear perfiles profesionales y llevar un cuaderno de investigación digital para registrar hallazgos empíricos y teóricos, incluyendo evidencia visual.

## 2. Tecnologías Utilizadas
* **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (Vanilla).
* **Tipografía:** [Outfit](https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap).
* **Diseño:** Interfaz moderna (estilo "Glassmorphism"), paleta de colores oscura con acentos verde neón (ej. `#00ffaa`), tipografía de alto contraste y micro-interacciones. No depende de frameworks externos.

## 3. Funcionalidades Principales

### 3.1. Gestión de Perfiles de Investigadores
* **Formulario de Registro de Perfil:** Requiere el ingreso del Nombre Completo, Especialidad y una Breve Biografía/Descripción.
* **Visualización Dinámica:** Al añadir un perfil, se genera una tarjeta que se muestra inmediatamente en la interfaz empleando manipulaciones del DOM de JavaScript.
* **Desbloqueo de Secciones:** La creación de un perfil desbloquea la visibilidad de la sección de investigación ("Cuaderno de Investigación").

### 3.2. Cuaderno de Investigación
* **Creación de Registros de Investigación (Logs):**
  * Título o Token identificador (ej. TKN-842).
  * Editor de texto enriquecido ligero basado en `contenteditable`.
  * Soporte de pegado natural (Paste Event) para imágenes directamente en el área de texto.
  * Opción de subir imágenes tradicionales validando la conversión a formato `Base64` vía `FileReader`.
  * Campo para agregar la información de contacto del investigador para futuras colaboraciones o referencias.
* **Feed de Publicaciones:**
  * Cada publicación genera un registro con marca de tiempo automática (fecha y hora exacta en la que se generó).
  * Los registros pasan por validaciones básicas donde se requiere obligatoriamente tener contenido o poseer una imagen/título.
  * Todas las publicaciones se prependen en el historial visual de la página.

## 4. Diseño y UX/UI (User Experience)
* **Estilo Visual Interactivo:** Utiliza una capa de fondo fotográfica con filtros y animaciones pulsantes leves para mejorar la retención visual experta (Biotech look/feel).
* **Animaciones CSS:** Las publicaciones adoptan ingresos suaves (`slideDown` de CSS) logrando sensación viva al interactuar.
* **Accesibilidad y Manejo de Errores:** Limpieza constante de formularios post envío y alertas (`alert()`) si los datos esenciales no están listos antes de publicar un registro.

## 5. Limitaciones Actuales / Consideraciones Futuras
* **Persistencia de Datos:** En la versión actual las estructuras de datos (perfiles y feed de investigaciones) existen únicamente en la memoria de la sesión (DOM). No persisten tras recargar la página. Para un entorno de producción, sería el próximo paso integrar un Back-End (ej. Node.js/Python) y una base de Datos o al menos `localStorage`.

## 6. Evolución Profesional (v2.0 - Journal Edition)
*   **Estándar Visual:** Journal Editorial / Modern Lab Archive.
*   **Identidad Cromática:** Fondo Blanco Hueso (#FDFDFB), Texto Grafito (#1A1A1A), Acento Verde Esmeralda (#0D4435) and Verde GFP bioluminiscente (#00FF95).
*   **Tipografía Pro:** Mix de Serif (Titulares) y Sans-Serif (Datos técnicos) con Monoespaciado para IDs.
*   **Nuevas Funcionalidades:**
    *   **Dashboard Analytics:** Gráficos de crecimiento bacteriano interactivos.
    *   **Simulaciones 3D:** Visor de placa de Petri interactiva (Three.js).
    *   **Smart ELN:** Editor de texto con soporte a LaTeX and citación automática.
    *   **Exportación Académica:** Generador de PDF con formato de paper científico.
*   **Stack Técnico Actualizado:** Migración a Vite + React + Tailwind CSS para una interfaz de alto rendimiento y diseño de precisión.
