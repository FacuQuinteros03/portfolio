'use client';

import { useSyncExternalStore } from 'react';

/**
 * Temas de color del sitio. El primero (azul) es el de marca y coincide con los valores de :root en
 * app/globals.css. Las partículas del hero van pasando por estos temas y, con ellas, los tokens de color
 * de toda la interfaz (botones, títulos, links, fondo del hero). Todos cumplen contraste AA sobre el fondo.
 */
export type Theme = {
  id: string;
  /** Color principal: botones, títulos chicos, foco, cursor del nombre. */
  accent: string;
  accentHover: string;
  accentGlow: string;
  /** Segundo tono: contexto de cada proyecto, cargo destacado. */
  accent2: string;
  /** Tonos de las partículas, de izquierda a derecha, en grados. */
  particles: [number, number];
  /** Luces del fondo animado del hero: apenas un tinte sobre el negro. */
  background: string[];
};

export const THEMES: Theme[] = [
  {
    id: 'azul',
    accent: '#4fc3ff',
    accentHover: '#7dd3ff',
    accentGlow: '#4fc3ff55',
    accent2: '#6b97ff',
    particles: [190, 222],
    background: ['#0a0b10', '#0a1d36', '#0a0b10', '#06283a', '#0a0b10', '#0f1a3a', '#0a0b10'],
  },
  {
    id: 'carmesi',
    accent: '#ff6f6f',
    accentHover: '#ff9494',
    accentGlow: '#ff6f6f55',
    accent2: '#ff9b5c',
    particles: [352, 22],
    background: ['#0a0b10', '#33101a', '#0a0b10', '#2e1a0c', '#0a0b10', '#2a0e16', '#0a0b10'],
  },
  {
    id: 'violeta',
    accent: '#c08bff',
    accentHover: '#d3adff',
    accentGlow: '#c08bff55',
    accent2: '#f07ad8',
    particles: [268, 318],
    background: ['#0a0b10', '#1f1036', '#0a0b10', '#2c0f2e', '#0a0b10', '#1a1238', '#0a0b10'],
  },
  {
    id: 'esmeralda',
    accent: '#3ddc97',
    accentHover: '#6fe8b3',
    accentGlow: '#3ddc9755',
    accent2: '#39d0c9',
    particles: [152, 182],
    background: ['#0a0b10', '#0a2a20', '#0a0b10', '#08282a', '#0a0b10', '#0c2420', '#0a0b10'],
  },
];

let current = 0;
const listeners = new Set<() => void>();

/** Cambia el tema de toda la página. Los colores pasan con un fundido (ver @property en globals.css). */
export function applyTheme(index: number) {
  current = ((index % THEMES.length) + THEMES.length) % THEMES.length;
  const t = THEMES[current];
  const root = document.documentElement.style;
  root.setProperty('--accent', t.accent);
  root.setProperty('--accent-hover', t.accentHover);
  root.setProperty('--accent-glow', t.accentGlow);
  root.setProperty('--accent-2', t.accent2);
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useThemeIndex() {
  return useSyncExternalStore(subscribe, () => current, () => 0);
}
