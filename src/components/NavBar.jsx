import { useState } from 'react';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);

  return (
    <div className={styles.contenedorHeader}>
      <header className={styles.headerContent}>
        <div className={styles.logo}>
          <a href="#home">FQ</a>
        </div>

        <nav>
          <ul className={styles.navLinks}>
            <li>
              <a href="#about">Sobre mí</a>
            </li>
            <li>
              <a href="#projects">Proyectos</a>
            </li>
            <li>
              <a href="#contact">Contacto</a>
            </li>
          </ul>

          {/* Botón hamburguesa */}
          <div
            className={`${styles.hamburger} ${open ? styles.open : ''}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>

      {/* Overlay del menú móvil */}
      {open && (
        <div className={styles.mobileMenu}>
          <ul>
            <li>
              <a href="#about" onClick={toggleMenu}>
                Sobre mí
              </a>
            </li>
            <li>
              <a href="#projects" onClick={toggleMenu}>
                Proyectos
              </a>
            </li>
            <li>
              <a href="#contact" onClick={toggleMenu}>
                Contacto
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
