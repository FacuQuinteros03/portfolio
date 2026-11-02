import styles from './keyboard.module.css';

type Key = { id: string; label: string; w?: number };

const letters = (row: string): Key[] => [...row].map((c) => ({ id: c, label: c }));

// Teclado 60 % en español. Cada fila suma 15 unidades de ancho.
const ROWS: Key[][] = [
  [
    { id: 'Esc', label: 'Esc' },
    ...letters('1234567890'),
    { id: "'", label: "'" },
    { id: '¿', label: '¿' },
    { id: 'Backspace', label: 'Borrar', w: 2 },
  ],
  [
    { id: 'Tab', label: 'Tab', w: 1.5 },
    ...letters('QWERTYUIOP'),
    { id: '´', label: '´' },
    { id: '+', label: '+' },
    { id: 'ç', label: 'Ç', w: 1.5 },
  ],
  [
    { id: 'Caps', label: 'Bloq Mayús', w: 1.75 },
    ...letters('ASDFGHJKLÑ'),
    { id: '{', label: '{' },
    { id: 'Enter', label: 'Intro', w: 2.25 },
  ],
  [
    { id: 'ShiftL', label: 'Mayús', w: 2.25 },
    ...letters('ZXCVBNM'),
    { id: ',', label: ',' },
    { id: '.', label: '.' },
    { id: '-', label: '-' },
    { id: 'ShiftR', label: 'Mayús', w: 2.75 },
  ],
  [
    { id: 'CtrlL', label: 'Ctrl', w: 1.25 },
    { id: 'Win', label: 'Win', w: 1.25 },
    { id: 'Alt', label: 'Alt', w: 1.25 },
    { id: ' ', label: '', w: 6.25 },
    { id: 'AltGr', label: 'AltGr', w: 1.25 },
    { id: 'Fn', label: 'Fn', w: 1.25 },
    { id: 'Menu', label: 'Menú', w: 1.25 },
    { id: 'CtrlR', label: 'Ctrl', w: 1.25 },
  ],
];

type Props = {
  /** Lo que ya se escribió: sus teclas quedan prendidas. */
  typed: string;
  pressed: string | null;
};

export default function GamerKeyboard({ typed, pressed }: Props) {
  const lit = new Set(typed.toUpperCase());

  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.floor} />
      <div className={styles.board}>
        {ROWS.map((row, r) => {
          let x = 0;
          return (
            <div key={r} className={styles.row}>
              {row.map((key) => {
                const w = key.w ?? 1;
                // El color RGB de cada tecla depende de dónde está, así el teclado arma un arcoíris de izquierda a derecha.
                const hue = Math.round(((x + w / 2) / 15) * 300);
                x += w;
                return (
                  <span
                    key={key.id}
                    className={styles.key}
                    style={{ '--w': w, '--hue': hue } as React.CSSProperties}
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
