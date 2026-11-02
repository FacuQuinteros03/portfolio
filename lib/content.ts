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
  /** Lo que está aprendiendo en el puesto, en fichas. */
  scope?: string[];
  tags: string[];
};

export const EXPERIENCE: Job[] = [
  {
    company: 'Neuralsoft',
    role: 'Implementador ERP · Programa Jóvenes Profesionales',
    period: 'Octubre 2026 – Actualidad',
    featured: true,
    summary:
      'Estoy aprendiendo FastPRG, la plataforma de Neuralsoft que trae todo lo necesario para crear un sistema desde cero: de la primera validación a publicarlo en un dominio. Entré como implementador del ERP y el camino sigue hacia testing y desarrollo.',
    highlights: [
      'Arranqué por la base: crear entidades y atributos, y escribir reglas de negocio y validaciones.',
      'Lo que sigue: consumir web services, publicar en un dominio y conectar dispositivos.',
    ],
    scope: [
      'Entidades y atributos',
      'Reglas de negocio',
      'Validaciones',
      'Consumo de web services',
      'Dominios y publicación',
      'Conexión de dispositivos',
    ],
    tags: ['FastPRG', 'ERP', 'Web services'],
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
  /** Dónde y cómo se hizo: materia, cliente o propio, en equipo o solo. */
  context: string;
  tags: string[];
  description: string;
  /** El resultado medible, si lo hay. */
  result?: string;
  image: string;
  width: number;
  height: number;
  /** Los gráficos van enteros sobre blanco; las capturas de sitios llenan el recuadro. */
  fit?: 'cover' | 'contain';
  /** Sin link si el código es privado. */
  link?: string;
  linkLabel?: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'Asistente virtual con agente ReAct',
    context: 'Procesamiento del Lenguaje Natural · TUIA · individual',
    tags: ['Python', 'RAG', 'LLM local', 'ChromaDB', 'Agentes'],
    description:
      'Asistente para una empresa de electrodomésticos que corre 100 % local, sin APIs externas. Recuperación híbrida (búsqueda semántica en ChromaDB, BM25 y re-ranking con cross-encoder), consultas generadas sobre tablas y sobre un grafo en Cypher, y un agente ReAct que decide qué herramienta usar en cada pregunta.',
    result: 'Clasificador de intención con Qwen2.5-1.5B comparado contra TF-IDF + regresión logística',
    image: '/img/agente-nlp.webp',
    width: 1400,
    height: 700,
  },
  {
    title: 'Predicción de lluvia en Australia',
    context: 'Aprendizaje Automático 1 · TUIA · en equipo',
    tags: ['Python', 'scikit-learn', 'Keras', 'Optuna', 'SHAP', 'Docker'],
    description:
      'Clasificación de si llueve al día siguiente con datos meteorológicos reales. Imputación por ubicación y con KNN, codificación cíclica de fechas, regresión logística, árbol de decisión optimizado y una red neuronal con umbral calibrado, explicada con SHAP y empaquetada en Docker para hacer inferencia.',
    result: 'Red neuronal: accuracy 84 % y F1 0,66 en test',
    image: '/img/lluvia.webp',
    width: 780,
    height: 470,
    fit: 'contain',
    link: 'https://github.com/manuellazarte/australian-rain-prediction',
    linkLabel: 'Ver repositorio',
  },
  {
    title: 'Modelo predictivo de tarifas de Uber',
    context: 'Aprendizaje Automático 1 · TUIA · en equipo',
    tags: ['Python', 'scikit-learn', 'Regresión'],
    description:
      'Predicción de tarifas sobre 200.000 viajes. Limpieza de coordenadas y tarifas imposibles, imputación con KNN, variables de distancia y de tiempo con codificación cíclica, y comparación de regresión lineal, descenso por gradiente (batch, estocástico y mini-batch), Ridge, Lasso y ElasticNet con validación cruzada.',
    result: 'Mejor modelo: Ridge, R² 0,73 en test',
    image: '/img/uber.webp',
    width: 1389,
    height: 590,
    fit: 'contain',
    link: 'https://github.com/RoberLasarte332/AA1-TUIA-2026C1-Quinteros-Lazarte-Lasarte',
    linkLabel: 'Ver repositorio',
  },
  {
    title: 'Sistema de reconocimiento facial',
    context: 'Computer Vision · TUIA · en desarrollo',
    tags: ['Python', 'PyTorch', 'ONNX', 'FastAPI', 'pgvector', 'Docker'],
    description:
      'Registra personas y las reconoce en fotos nuevas. Detección con SCRFD, alineación por landmarks, embeddings y búsqueda por similitud en PostgreSQL con pgvector, detrás de una API asincrónica en FastAPI. Comparé una CNN propia entrenada desde cero (ResNet chica con pérdida ArcFace) contra ArcFace R50 preentrenada y calibré el umbral para rechazar desconocidos.',
    result: 'ArcFace R50: AUC 1,000 y top-1 100 % con 20 personas nunca vistas (CNN propia: AUC 0,906)',
    image: '/img/reconocimiento-facial.webp',
    width: 1400,
    height: 613,
    fit: 'contain',
    link: 'https://github.com/FacuQuinteros03/tuia-face-recognition-app/tree/feature/tp-reconocimiento-facial',
    linkLabel: 'Ver repositorio',
  },
  {
    title: 'Rosario F Kits',
    context: 'Emprendimiento propio',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Vercel'],
    description:
      'Catálogo online de mi tienda de camisetas de fútbol. El stock se lee del lado del servidor, así los datos nunca llegan al navegador, y cada pedido sale armado por WhatsApp con el talle elegido. En desarrollo: un ERP propio con Supabase y panel de administración.',
    image: '/img/rosariofkits.webp',
    width: 1200,
    height: 630,
    link: 'https://rosariofkits.vercel.app',
    linkLabel: 'Ver sitio',
  },
  {
    title: 'Estudio Jurídico Menicocci',
    context: 'Cliente · freelance',
    tags: ['Next.js', 'Sanity.io', 'CMS'],
    description:
      'Sitio institucional con blog que el estudio edita solo desde Sanity. Rápido y con los avisos legales que pide la profesión.',
    image: '/img/menicocci.webp',
    width: 1400,
    height: 686,
    link: 'https://menicocci-asociados.vercel.app/',
    linkLabel: 'Ver sitio',
  },
  {
    title: 'Vanguard Training',
    context: 'Cliente · freelance',
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
    context: 'Bases de Datos 2 · TUIA',
    tags: ['SQL Server', 'SSIS', 'Power BI'],
    description:
      'Para una empresa de bebidas: integré fuentes dispersas en un data warehouse con procesos ETL y lo llevé a tableros de Power BI.',
    image: '/img/powerbi.webp',
    width: 1400,
    height: 661,
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7404908739507470336/',
    linkLabel: 'Ver en LinkedIn',
  },
];

export const SKILLS: { name: string; tools: string[] }[] = [
  { name: 'Frontend', tools: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
  { name: 'IA y datos', tools: ['Python', 'Pandas', 'scikit-learn', 'Keras', 'OpenCV', 'NLP', 'RAG'] },
  { name: 'Datos', tools: ['SQL', 'ETL', 'Data Warehouse', 'Power BI'] },
  { name: 'Sistemas e integraciones', tools: ['APIs REST', 'Web services', 'API de Mercado Libre'] },
];
