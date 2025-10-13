// Projects.js
import styles from '../styles/Projects.module.css';

const projects = [
  {
    title: 'Food App',
    description:
      'Aplicación con CRUD de comidas, valoración y filtrado. Desarrollada en React + TypeScript.',
    image: '/foodapp.png',
    link: 'https://foodapp-eta-lac.vercel.app/',
  },
  {
    title: 'Personal Trainer',
    description:
      'Plataforma para gestionar entrenamientos y pagos online. Proyecto en Next.js.',
    image: '/personaltrainer.png',
    link: '#',
  },
  {
    title: 'Servicios Varios',
    description:
      'Landing page para grupo de trabajadores de pintura, soldadura y carpintería. Hecho en Next.js.',
    image: '/pintor.png',
    link: 'https://cristian-zaragoza.vercel.app/',
  },
];

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <h2>Proyectos</h2>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <div key={index} className={styles.card}>
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
            >
              Ver más
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
