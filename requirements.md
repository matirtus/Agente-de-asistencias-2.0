# Requirements Document - BiotecHub Journal Platform (v2.0)

## 1. Project Overview
BiotecHub is a professional-grade scientific journal and research assistant platform. It is designed to modernize how researchers capture findings, simulate biological experiments, and analyze research metrics within an integrated, highly-visual editorial environment.

## 2. Technical Requirements

### 2.1. Framework & Core Stack
- **Standard**: [React.js](https://reactjs.org/) (High-performance UI components).
- **Build System**: [Vite](https://vitejs.dev/) (Rapid development and optimized bundling).
- **State Management**: React `useState` and `useEffect` hooks for local state.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for rapid UI development and custom [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) for premium design tokens.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for micro-interactions and smooth page transitions.
- **Internationalization**: [i18next](https://www.i18next.com/) for full multilingual support.

### 2.2. Design System (UX/UI)
- **Concept**: Scientific Journal / Premium Research Archive.
- **Visual Palette**:
    - **Background**: Bone-White (`#FDFDFB`).
    - **Typography**: Graphite (`#1A1A1A`) for body text.
    - **Accents**: Emerald (`#0D4435`) and Bioluminescent GFP (`#00FF95`).
- **Typography**:
    - **Headings**: Serif (Modern Editorial) for titles and section headers.
    - **Body**: Sans-Serif (High-readability) for research content.
    - **Technical Data**: Monospace for IDs and metrics.
- **Components**: Glassmorphism (translucent cards), high-contrast borders, and professional grid layouts.

## 3. Functional Requirements

### 3.1. Internationalization (i18n)
- **Support**: Complete translation for **English (EN)** and **Spanish (ES)**.
- **Detection**: Automatic language detection based on browser locale.
- **Manual Toggle**: Integrated language switcher in the Header.
- **Localization**: All UI labels, tooltips, and dynamic content must be localized via `en.json` and `es.json`.

### 3.2. Researcher Registration
- **Input fields**: Full Name, Specialty, and Professional Biography.
- **Validation**: Ensure all required data is present before unlocking research sections.
- **Profile Persistence**: Creation of an active researcher session (local/memory).

### 3.3. Digital Research Notebook
- **Capture**: Persistent capture of findings with support for rich-text/Markdown-like input.
- **Organization**: List view for navigating multiple notes.
- **Metadata**: Automatic timestamping, unique entry IDs, and researcher name attribution.
- **Export**: Built-in support for generating research reports (PDF/Excel).

### 3.4. Technical Dashboard & Simulations
- **Petri Dish Simulation**: Visualizing bacterial growth patterns (SVG/Canvas).
- **Growth Charts**: Interactive analytics for tracking research metrics.
- **Live Counters**: Global research stats (samples processed, active papers).

## 4. Non-Functional Requirements
- **Performance**: Initial load time under 1.5 seconds on broadband.
- **Accessibility**: WCAG 2.1 compliance for readability and high-contrast color usage.
- **Scalability**: Modular directory structure (`/components`, `/locales`, `/utils`) to easily add new research tools.
- **Responsive Design**: Fluid layout adapting from 1920p ultra-wide monitors to 13-inch laptops.

## 5. Ongoing & Future Development
- **Spatial Annotations**: Image-based annotations for forensic photography.
- **Cloud Sync**: Migration from local session storage to cloud-based persistence (Firebase/Supabase).
- **Collaborative ELN**: Real-time collaborative editing for multi-researcher teams.
