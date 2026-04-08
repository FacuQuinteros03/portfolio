import styles from '../styles/Footer.module.css';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* BRAND */}
        <div className={styles.brand}>
          <h3>Facundo Quinteros</h3>
          <p>Frontend Developer · React · Next.js</p>
        </div>

        {/* LINKS */}
        <ul className={styles.footerLinks}>
          <li>
            <a href="#projects">Proyectos</a>
          </li>
          <li>
            <a href="#about">Sobre mí</a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/facundo-quinteros-125051232/"
              target="_blank"
              rel="noreferrer"
            >
              Contacto
            </a>
          </li>
        </ul>

        {/* SOCIALS */}
        <div className={styles.socials}>
          <a
            href="https://github.com/FacuQuinteros03"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/facundo-quinteros-125051232/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://www.instagram.com/facu.qs/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <p>¿Tenés un proyecto en mente?</p>
        <a
          href="https://www.linkedin.com/in/facundo-quinteros-125051232/"
          target="_blank"
          rel="noreferrer"
        >
          Hablemos →
        </a>
      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Facundo Quinteros</span>

        <button onClick={scrollToTop} className={styles.scrollTop}>
          ↑
        </button>
      </div>
    </footer>
  );
}
