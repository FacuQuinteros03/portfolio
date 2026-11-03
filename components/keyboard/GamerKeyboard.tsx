import { hueAt } from './hue';
import { ROWS } from './layout';
import styles from './keyboard.module.css';

type Props = {
  /** Lo que ya se escribió: sus teclas quedan prendidas. */
  typed: string;
  pressed: string | null;
  /** Nombre completo: arranca la ola de luz que recorre el teclado. */
  done?: boolean;
};

export default function GamerKeyboard({ typed, pressed, done }: Props) {
  const lit = new Set(typed.toUpperCase());

  return (
    <div className={styles.stage} aria-hidden="true" data-done={done || undefined}>
      <div className={styles.floor} />
      <div className={styles.board}>
        {ROWS.map((row, r) => {
          let x = 0;
          return (
            <div key={r} className={styles.row}>
              {row.map((key) => {
                const w = key.w ?? 1;
                // El color de cada tecla depende de dónde está: de celeste a la izquierda a azul eléctrico a la derecha.
                const center = (x + w / 2) / 15;
                const hue = hueAt(center);
                x += w;
                return (
                  <span
                    key={key.id}
                    className={styles.key}
                    style={{ '--w': w, '--hue': hue, '--pos': center.toFixed(3) } as React.CSSProperties}
                    data-lit={lit.has(key.id) || undefined}
                    data-pressed={pressed === key.id || undefined}
                    data-small={key.label.length > 1 || undefined}
                  >
                    <span className={styles.cap}>{key.label}</span>
                  </span>
                );
              })}
            </div>
          );
        })}
        {/* El canto de adelante, con la tira RGB que se va prendiendo a medida que se escribe. */}
        <div className={styles.edge}>
          <span className={styles.strip} />
        </div>
      </div>
    </div>
  );
}
