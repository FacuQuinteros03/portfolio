import styles from './keyboard.module.css';

type Props = {
  text: string;
  count: number;
  pressed: string | null;
};

/** El nombre armado con teclas sueltas: cada letra cae en su lugar cuando le toca. */
export default function KeycapName({ text, count, pressed }: Props) {
  // Cada palabra con la posición de su primera letra dentro del texto completo.
  const words = text.split(' ').map((word, i, all) => ({
    word,
    start: all.slice(0, i).reduce((sum, w) => sum + w.length + 1, 0),
  }));

  return (
    <div className={styles.caps} aria-hidden="true">
      {words.map(({ word, start }, w) => {
        return (
          <div key={w} className={styles.capWord}>
            {[...word].map((letter, i) => {
              const at = start + i;
              const hue = Math.round((at / (text.length - 1)) * 300);
              return (
                <span
                  key={at}
                  className={styles.slot}
                  data-letter={letter}
                  style={{ '--hue': hue } as React.CSSProperties}
                >
                  <span
                    className={styles.keycap}
                    data-typed={at < count || undefined}
                    data-pressed={(pressed && pressed !== 'Backspace' && at === count - 1) || undefined}
                  >
                    {letter}
                  </span>
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
