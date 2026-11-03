// Teclado 60 % en español: lo usan el teclado 3D y el de respaldo en CSS.

export type Key = { id: string; label: string; w?: number };

const letters = (row: string): Key[] => [...row].map((c) => ({ id: c, label: c }));

/** Cada fila suma 15 unidades de ancho (1 unidad = una tecla común). */
export const ROWS: Key[][] = [
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

export const ROW_UNITS = 15;
