// About.js
import styles from '../styles/About.module.css';
import miFoto from '../assets/fotoYo.jpeg';
import Button from './Button';
import {
  FaReact,
  FaPython,
  FaBrain,
  FaChartBar,
  FaDatabase,
  FaChartLine,
} from 'react-icons/fa';

const skills = [
  {
    title: 'FrontEnd React',
    description:
      'Proyectos freelance: MakiSanTech, portafolio personal, páginas con Next.js. Enfocado en UI, consumo de APIs, CRUD y diseño responsive.',
    icon: <FaReact size={40} color="#61DBFB" />,
  },
  {
    title: 'Análisis de Datos Python',
    description:
      'Trabajos académicos: análisis de datasets, visualización con Matplotlib y Pandas. Experimentos y proyectos de la facultad.',
    icon: <FaPython size={40} color="#306998" />,
  },
  {
    title: 'Power BI',
    description:
      'Experiencia básica en dashboards y reportes. Integración de datos y visualización para proyectos simples.',
    icon: <FaChartBar size={40} color="#F2C811" />,
  },
  {
    title: 'Inteligencia Artificial',
    description:
      'Proyectos y ejercicios de la Tecnicatura. Modelos básicos de ML, clasificación y predicción.',
    icon: <FaBrain size={40} color="#6A1B9A" />,
  },
  {
    title: 'Bases de Datos Relacionales',
    description:
      'Experiencia con SQL, modelado de datos, normalización y consultas complejas. Práctica en JOINs, subconsultas, agregaciones y optimización de queries.',
    icon: <FaDatabase size={40} color="#f29111" />,
  },
  {
    title: 'R / Probabilidad y Estadística',
    description:
      'Análisis de datos, visualización y modelado estadístico con R. Experiencia en probabilidad, distribuciones, tests estadísticos y regresión.',
    icon: <FaChartLine size={40} color="#276dc3" />,
  },
];

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.aboutContainer}>
        {/* Bloque Sobre mí */}
        <div className={styles.content}>
          <h2>Sobre mí</h2>
          <img src={miFoto} alt="Facundo Quinteros" className={styles.photo} />
          <p>
            Soy estudiante avanzado de la Tecnicatura Universitaria en
            Inteligencia Artificial. Me apasiona crear soluciones innovadoras
            utilizando tecnologías modernas y aprender constantemente sobre
            nuevas herramientas y metodologías en el campo del desarrollo de
            software. Además, disfruto del desarrollo frontend con React y
            Next.js, y siempre busco mejorar mis habilidades en programación y
            proyectos freelance.
          </p>
          <Button
            variant="outlined"
            component="a"
            href="/Quinteros_Facundo_CV.pdf"
            download="CV_Facundo_Quinteros.pdf"
          >
            Descargar CV
          </Button>
        </div>

        {/* Bloque Experiencias */}
        <div className={styles.skills}>
          {skills.map((skill, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{skill.icon}</div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
