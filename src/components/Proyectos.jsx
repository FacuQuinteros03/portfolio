import styles from '../styles/Projects.module.css';
import useReveal from '../hooks/useReveal';
import { FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: 'Estudio Jurídico Menicocci',
    tags: ['Next.js', 'Sanity.io', 'CMS'],
    description:
      'Desarrollo corporativo con Sanity.io. Blog autogestionable, arquitectura de alto rendimiento y validez legal integrada.',
    image: '/menicocci1.png',
    link: 'https://menicocci-asociados.vercel.app/',
  },
  {
    title: 'Data Warehouse & ETL',
    tags: ['SQL Server', 'SSIS', 'Power BI'],
    description:
      'Arquitectura de datos completa: desde la extracción de fuentes dispersas hasta un modelo de datos robusto (DWH) para una empresa de bebidas.',
    image: '/powerbi.png',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7404908739507470336/',
  },
  {
    title: 'Importaciones de Minerales',
    tags: ['Python', 'Pandas', 'Data Viz'],
    description:
      'Análisis exploratorio de datos (EDA) sobre el sector minero argentino. Limpieza, transformación y visualización de tendencias.',
    image: '/grafico.png',
    link: 'https://colab.research.google.com/drive/19qzUmVO0ZHFGy6mC6uTvMp1gHs4I76PC',
  },
  {
    title: 'Vanguard Training',
    tags: ['Next.js', 'Fitness', 'Landing'],
    description:
      'Landing page para personal trainer con sistema de captación de clientes y presentación de planes de entrenamiento.',
    image: '/Vanguard.png',
    link: 'https://vanguardtraining.vercel.app/',
  },
];

export default function Projects() {
  const [sectionRef, sectionVisible] = useReveal();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.projects} ${sectionVisible ? styles.show : ''}`}
      id="projects"
    >
      <div className={styles.header}>
        <span className={styles.subtitle}>Mi Portafolio</span>
        <h2 className={styles.title}>Proyectos Destacados</h2>
      </div>

      <div className={styles.grid}>
        {projects.map((project, index) => {
          const [cardRef, cardVisible] = useReveal();
          return (
            <div
              key={index}
              ref={cardRef}
              onMouseMove={handleMouseMove}
              className={`${styles.card} ${cardVisible ? styles.cardShow : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className={styles.imageContainer}>
                <img src={project.image} alt={project.title} />
                <div className={styles.overlay}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.iconLink}
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>

              <div className={styles.content}>
                <div className={styles.tagWrapper}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.miniTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.mainLink}
                >
                  Explorar Proyecto <span>→</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
