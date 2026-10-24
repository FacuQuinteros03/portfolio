// Todo el texto del sitio vive acá. Para sumar un trabajo o un proyecto, se agrega un objeto a la lista.

export const NAME = 'Facundo Quinteros';
export const ROLE = 'Desarrollador fullstack · IA y datos';
export const EMAIL = 'facundoquinteros16@hotmail.com';
export const CV_URL = '/Quinteros_Facundo_CV.pdf';

export const LINKS = {
  github: 'https://github.com/FacuQuinteros03',
  linkedin: 'https://www.linkedin.com/in/facundo-quinteros-125051232/',
  instagram: 'https://www.instagram.com/facu.qs/',
};

export type Job = {
  company: string;
  role: string;
  /** Sin fecha conocida se deja vacío y no se muestra. */
  period?: string;
  /** El trabajo actual: se muestra como tarjeta destacada. */
  featured?: boolean;
  summary: string;
  highlights: string[];
  /** Lo que se aprende en el puesto, en fichas. */
  learning?: string[];
  tags: string[];
};

export const EXPERIENCE: Job[] = [
  {
    company: 'Neuralsoft',
    role: 'Implementador ERP · Programa Jóvenes Profesionales',
    period: 'Octubre 2026 – Actualidad',
    featured: true,
    summary:
      'Entré como implementador del ERP por el programa Jóvenes Profesionales: una formación intensiva de punta a punta, desde escribir código hasta entender la infraestructura donde corre. El camino sigue hacia testing y desarrollo.',
    highlights: [
      'Me capacito en FastPRG, la plataforma no-code con la que Neuralsoft construye sus productos, y después en MyLogic, el producto hecho sobre ella.',
    ],
    learning: [
      'Código y lógica de programación',
      'Infraestructura y sistemas',
      'Redes e IPs',
      'Web services',
      'FastPRG (no-code)',
      'Implementación de ERP',
    ],
    tags: ['ERP', 'FastPRG', 'MyLogic'],
  },
  {
    company: 'Marstech',
    role: 'Especialista en IA y automatización',
    period: 'Abril 2026 – Agosto 2026',
    summary:
      'Automaticé procesos del negocio con IA y con la API de Mercado Libre.',
    highlights: [
      'Varios desarrollos sobre la API de Mercado Libre.',
      'Reportes que se arman solos a partir de tareas programadas.',
    ],
    tags: ['API de Mercado Libre', 'Automatización', 'IA', 'Reportes'],
  },
  {
    company: 'Maki San Tech',
    role: 'Desarrollador frontend (React)',
    period: 'Mayo 2025 – Agosto 2025',
    summary:
      'Interfaces y funciones de un sistema de turnos para profesionales de la salud, pensado para crecer.',
    highlights: [],
    tags: ['React', 'Frontend'],
  },
  {
    company: 'FCEIA · UNR',
    role: 'Docente de Inteligencia Artificial (práctica académica)',
    period: 'Septiembre 2025 – Diciembre 2025',
    summary:
      'Enseñé inteligencia artificial a público no técnico: qué es, cómo se usa y cómo cambia el trabajo.',
    highlights: [],
    tags: ['Docencia', 'IA'],
  },
  {
    company: 'Freelance',
    role: 'Desarrollador web',
    period: '2024 – Actualidad',
    summary:
      'Sitios a medida para distintos clientes, desde relevar lo que necesitan hasta publicarlo.',
    highlights: [],
    tags: ['Next.js', 'React', 'CMS'],
  },
];

export type Project = {
  title: string;
  tags: string[];
  description: string;
  image: string;
  width: number;
  height: number;
  link: string;
  linkLabel: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'Estudio Jurídico Menicocci',
    tags: ['Next.js', 'Sanity.io', 'CMS'],
    description:
      'Sitio del estudio con blog que el cliente edita solo desde Sanity. Rápido y con los avisos legales que pide la profesión.',
    image: '/img/menicocci.webp',
    width: 1400,
    height: 686,
    link: 'https://menicocci-asociados.vercel.app/',
    linkLabel: 'Ver sitio',
  },
  {
    title: 'Vanguard Training',
    tags: ['Next.js', 'Landing'],
    description:
      'Landing para un personal trainer: presenta los planes y junta los contactos de gente interesada.',
    image: '/img/vanguard.webp',
    width: 1400,
    height: 621,
    link: 'https://vanguardtraining.vercel.app/',
    linkLabel: 'Ver sitio',
  },
  {
    title: 'Data Warehouse y ETL',
    tags: ['SQL Server', 'SSIS', 'Power BI'],
    description:
      'Para una empresa de bebidas: junté datos de fuentes sueltas en un data warehouse y los llevé a tableros de Power BI.',
    image: '/img/powerbi.webp',
    width: 1400,
    height: 661,
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7404908739507470336/',
    linkLabel: 'Ver en LinkedIn',
  },
  {
    title: 'Importaciones de minerales',
    tags: ['Python', 'Pandas', 'Visualización'],
    description:
      'Análisis exploratorio del sector minero argentino: limpieza, transformación y gráficos de tendencias.',
    image: '/img/minerales.webp',
    width: 1400,
    height: 619,
    link: 'https://colab.research.google.com/drive/19qzUmVO0ZHFGy6mC6uTvMp1gHs4I76PC',
    linkLabel: 'Ver notebook',
  },
];

export const SKILLS: { name: string; tools: string[] }[] = [
  { name: 'Frontend', tools: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
  { name: 'IA y datos', tools: ['Python', 'Pandas', 'Scikit-learn', 'NLP'] },
  { name: 'Ingeniería de datos', tools: ['SQL', 'ETL', 'Data Warehouse'] },
  { name: 'Automatización', tools: ['APIs REST', 'API de Mercado Libre', 'Power BI'] },
];
