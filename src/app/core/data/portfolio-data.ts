/* ============================================================
   Portfolio data — Emilio Ramírez (datos reales de CV)
   ============================================================ */

export const personal = {
  name: 'Emilio Ramírez',
  fullName: 'Emilio Miguel Ramírez Noriega',
  role: 'Full Stack Developer',
  roles: ['Full Stack Developer', 'Angular Specialist', 'Mobile · KMP', 'Clean Architecture'],
  tagline: 'Ing. de Sistemas Computacionales',
  location: 'Trujillo, Perú',
  email: 'emilioramireznoriega.1@gmail.com',
  phone: '+51 941 968 542',
  github: 'https://github.com/Emilio312f',
  linkedin: 'https://www.linkedin.com/in/emilio-ramirez-noriega-76939b333/',
  available: true,
  summary:
    'Construyo aplicaciones web y móviles escalables con Angular, React, TypeScript y Kotlin Multiplatform. Aplico arquitectura limpia, principios SOLID y microservicios para entregar producto sólido, performante y con un punto de vista visual cuidado.'
};

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 20, suffix: '+', label: 'Tecnologías en mi stack' },
  { value: 4, suffix: '', label: 'Hackathons nacionales' },
  { value: 2, suffix: '', label: 'Proyectos en producción' },
  { value: 8, suffix: 'º', label: 'Ciclo · Ing. de Sistemas' }
];

export interface SkillCategory {
  id: string;
  title: string;
  accent: string;
  items: { label: string; level: number }[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    accent: '#E0603A',
    items: [
      { label: 'Angular', level: 95 },
      { label: 'TypeScript', level: 92 },
      { label: 'React', level: 82 },
      { label: 'JavaScript', level: 90 },
      { label: 'Tailwind / SASS', level: 88 },
      { label: 'HTML5 / CSS3', level: 95 }
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    accent: '#C9C2B4',
    items: [
      { label: 'Node.js', level: 82 },
      { label: 'Spring Boot', level: 75 },
      { label: '.NET', level: 70 },
      { label: 'Python', level: 78 },
      { label: 'Golang', level: 64 },
      { label: 'PHP / Laravel', level: 70 }
    ]
  },
  {
    id: 'mobile-db',
    title: 'Móvil & Datos',
    accent: '#A89E8C',
    items: [
      { label: 'Kotlin Multiplatform', level: 80 },
      { label: 'PostgreSQL', level: 85 },
      { label: 'SQL Server', level: 78 },
      { label: 'MongoDB', level: 80 },
      { label: 'Firebase', level: 80 }
    ]
  },
  {
    id: 'arch',
    title: 'Arquitectura & DevOps',
    accent: '#94A98C',
    items: [
      { label: 'Clean Architecture', level: 92 },
      { label: 'Hexagonal · SOLID', level: 88 },
      { label: 'Microservicios', level: 78 },
      { label: 'Docker', level: 78 },
      { label: 'Git · Vercel', level: 90 }
    ]
  }
];

/* Tecnologías para el marquee infinito */
export const techMarquee: string[] = [
  'Angular', 'React', 'TypeScript', 'JavaScript', 'Kotlin Multiplatform', 'Node.js',
  'Spring Boot', '.NET', 'Python', 'Golang', 'Laravel', 'PostgreSQL', 'SQL Server',
  'MongoDB', 'Firebase', 'Docker', 'Vercel', 'Tailwind', 'SASS', 'Figma', 'Git', 'Jira'
];

export interface Project {
  id: string;
  title: string;
  role: string;
  year: string;
  summary: string;
  highlights: string[];
  stack: string[];
  accent: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'helcore',
    title: 'Helcore ERP',
    role: 'Full Stack Developer',
    year: 'Oct 2025',
    summary:
      'Sistema ERP web multi-tenant para gestión empresarial, con arquitectura modular y limpia (UI / Domain / Data).',
    highlights: [
      'Módulos de contactos, flota vehicular, mantenimientos, gestión documental y roles/permisos.',
      'Formularios reactivos, notificaciones y guards de autenticación.',
      'Multi-organización con selector de contexto y filtrado de datos por tenant.',
      'Performance optimizada con lazy loading.'
    ],
    stack: ['Angular', 'TypeScript', 'Clean Architecture', 'Multi-tenant', 'PostgreSQL'],
    accent: '#E0603A',
    featured: true
  },
  {
    id: 'tecsup-ia',
    title: 'Agente IA — Tecsup',
    role: 'Builder · Hackathon',
    year: 'Nov 2025',
    summary:
      'Solución basada en IA y agentes inteligentes desarrollada en el Hackathon Tecsup 2025.',
    highlights: [
      'Prototipo funcional con orquestación de agentes.',
      'Iteración rápida bajo presión de hackathon.',
      'Storytelling de producto y demo en vivo.'
    ],
    stack: ['Python', 'IA', 'Agentes', 'Prototipado'],
    accent: '#C9C2B4',
    featured: false
  },
  {
    id: 'removex',
    title: 'Removex Landing',
    role: 'Desarrollador Web',
    year: 'Nov 2022',
    summary:
      'Landing corporativa responsiva para una empresa de minería y construcción, enfocada en captación de clientes.',
    highlights: [
      'Maquetación responsive con HTML, CSS y JavaScript.',
      'Optimización de UX/UI y formularios de contacto.',
      'Pruebas funcionales, publicación y mantenimiento.'
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'UX/UI'],
    accent: '#A89E8C',
    featured: false
  }
];

/* Capas de arquitectura para el showcase de Helcore */
export const architectureLayers = [
  {
    id: 'presentation',
    label: 'Presentation',
    accent: '#E0603A',
    desc: 'Ventanas, tablas, formularios reactivos y dashboards. Signals para state local reactivo.'
  },
  {
    id: 'domain',
    label: 'Domain',
    accent: '#C9C2B4',
    desc: 'Casos de uso, entidades y reglas de negocio: flota, mantenimientos, usuarios y permisos.'
  },
  {
    id: 'data',
    label: 'Data',
    accent: '#94A98C',
    desc: 'Repositorios, adapters, persistencia multi-tenant y acceso a APIs REST.'
  }
];

export interface TimelineItem {
  year: string;
  title: string;
  org: string;
  description: string;
  accent: string;
  kind: 'work' | 'hackathon' | 'edu';
}

export const timeline: TimelineItem[] = [
  {
    year: 'Nov 2025',
    title: 'Hackathon Tecsup 2025 — IA & Agentes',
    org: 'Tecsup · Trujillo',
    description: 'Soluciones basadas en inteligencia artificial y agentes inteligentes.',
    accent: '#C9C2B4',
    kind: 'hackathon'
  },
  {
    year: 'Oct 2025',
    title: 'Desarrollador de Software — ERP Web',
    org: 'Helcore · Trujillo',
    description: 'ERP multi-tenant con arquitectura modular y limpia. Módulos de flota, mantenimientos y permisos.',
    accent: '#E0603A',
    kind: 'work'
  },
  {
    year: 'Jun 2025',
    title: 'Gran Hackathon — Semana de la Innovación',
    org: 'CONCYTEC · Trujillo',
    description: 'Prototipo técnico con narrativa visual y entregable sólido.',
    accent: '#A89E8C',
    kind: 'hackathon'
  },
  {
    year: '2025',
    title: 'Hackathon UNT — Semana de la Innovación',
    org: 'Cámara de Comercio de La Libertad',
    description: 'Iteración rápida, demo funcional y arquitectura clara.',
    accent: '#94A98C',
    kind: 'hackathon'
  },
  {
    year: '2024',
    title: 'AYNI Hackathon Nacional — APEC Perú',
    org: 'Trujillo',
    description: 'Solución con impacto social y enfoque de producto.',
    accent: '#B9A78C',
    kind: 'hackathon'
  },
  {
    year: 'Nov 2022',
    title: 'Desarrollador Web — Landing Corporativa',
    org: 'Removex A.B. · Lima',
    description: 'Landing responsiva para sector minería y construcción, con foco en captación.',
    accent: '#9A9386',
    kind: 'work'
  }
];
