import { motion } from 'framer-motion';
import styles from '../styles/About.module.css';
import miFoto from '/fotoAbout.png';
import {
  FaReact,
  FaPython,
  FaBrain,
  FaDatabase,
  FaChartBar,
} from 'react-icons/fa';

export default function About() {
  const skillGroups = [
    {
      name: 'Frontend',
      icon: <FaReact />,
      tools: ['React', 'Next.js', 'UI/UX'],
    },
    {
      name: 'Data Science',
      icon: <FaPython />,
      tools: ['Pandas', 'Scikit-learn', 'NLP'],
    },
    {
      name: 'Data Engineering',
      icon: <FaDatabase />,
      tools: ['SQL', 'ETL', 'Data Warehouse'],
    },
    {
      name: 'Analytics',
      icon: <FaChartBar />,
      tools: ['Power BI', 'Statistics', 'Insights'],
    },
  ];

  // Configuración de animaciones
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section id="about" className={styles.about}>
      <motion.div
        className={styles.container}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {/* LADO IZQUIERDO: PERFIL (Entrada lateral) */}
        <motion.aside
          className={styles.profileSide}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={styles.photoFrame}>
            <img
              src={miFoto}
              alt="Facundo Quinteros"
              className={styles.mainPhoto}
            />
            <div className={styles.photoGlow}></div>
          </div>
          <h1 className={styles.name}>
            Facundo<span>Quinteros</span>
          </h1>
          <p className={styles.tagline}>AI Student & Fullstack Developer</p>
        </motion.aside>

        {/* LADO DERECHO: INFO & SKILLS */}
        <div className={styles.contentSide}>
          <motion.div className={styles.bio} {...fadeInUp}>
            <span className={styles.sectionTitle}>Sobre mí</span>
            <p>
              Soy estudiante avanzado de{' '}
              <strong>Inteligencia Artificial</strong>. Mi enfoque está en el
              punto donde el software moderno y los datos se cruzan. Construyo
              productos que no solo funcionan, sino que extraen valor real
              mediante IA.
            </p>
          </motion.div>

          <div className={styles.skillsSection}>
            <motion.span className={styles.sectionTitle} {...fadeInUp}>
              Tech Stack
            </motion.span>
            <motion.div
              className={styles.skillGrid}
              variants={staggerContainer}
            >
              {skillGroups.map((group, i) => (
                <motion.div
                  key={i}
                  className={styles.skillGroup}
                  variants={fadeInUp}
                >
                  <div className={styles.groupHeader}>
                    {group.icon}
                    <h3>{group.name}</h3>
                  </div>
                  <div className={styles.tagList}>
                    {group.tools.map((tool) => (
                      <motion.span
                        key={tool}
                        className={styles.tag}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: 'rgba(96, 165, 250, 0.2)',
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
