import { useEffect, useState } from 'react';
import styles from '../styles/Hero.module.css';
import Button from './Button';

const phrases = [
  'Desarrollador FullStack',
  'Especialista en Inteligencia Artificial',
  'Analista de Datos',
];

export default function Hero() {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  useEffect(() => {
    if (index >= phrases.length) return;

    const currentWord = phrases[index];

    if (subIndex === currentWord.length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  useEffect(() => {
    setText(phrases[index].substring(0, subIndex));
  }, [subIndex, index]);

  return (
    <section className={styles.hero} id="home">
      <div className={`${styles.content} ${show ? styles.show : ''}`}>
        <h1>Facundo Quinteros</h1>
        <div className={styles.subtext}>
          <p className={styles.typing}>
            {text}
            <span className={styles.cursor}>|</span>
          </p>
        </div>
        <Button href="#projects">Ver proyectos</Button>
      </div>
    </section>
  );
}
