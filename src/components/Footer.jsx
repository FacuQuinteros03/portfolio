import styles from '../styles/Footer.module.css';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Logo */}
        <div className={styles.logo}>
          <a href="#home">FQ</a>
        </div>

        {/* Links */}
        <ul className={styles.footerLinks}>
          <li>
            <a href="https://www.linkedin.com/in/facundo-quinteros-125051232/">
              Contactame
            </a>
          </li>
        </ul>

        {/* Redes sociales */}
        <div className={styles.socials}>
          <a
            href="https://github.com/FacuQuinteros03"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/facundo-quinteros-125051232/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/facu.qs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className={styles.copy}>
        <p>© {new Date().getFullYear()} Facundo Quinteros.</p>
      </div>
    </footer>
  );
}
