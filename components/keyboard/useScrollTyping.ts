'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

// El nombre termina de escribirse al 80 % del recorrido; el resto queda de pausa antes de soltar la sección.
const TYPING_END = 0.8;
const PRESS_MS = 160;

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );
}

/**
 * Lleva la cuenta de cuántas letras de `text` están escritas según cuánto se bajó dentro del tramo.
 * `pressed` es la tecla que se acaba de apretar (una letra, ' ' o 'Backspace' al volver para arriba).
 */
export function useScrollTyping(text: string) {
  const total = text.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(0);
  const [pressed, setPressed] = useState<string | null>(null);
  const countRef = useRef(0);
  const releaseRef = useRef<number | undefined>(undefined);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 1;
    const next = Math.min(total, Math.floor((progress / TYPING_END) * total + 0.5));
    const prev = countRef.current;
    if (next === prev) return;

    countRef.current = next;
    setScrolled(next);
    setPressed(next > prev ? text[next - 1] : 'Backspace');
    window.clearTimeout(releaseRef.current);
    releaseRef.current = window.setTimeout(() => setPressed(null), PRESS_MS);
  }, [text, total]);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(releaseRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduced, measure]);

  // Con "reducir movimiento" no hay tramo de scroll: el nombre aparece completo.
  const count = reduced ? total : scrolled;
  return { trackRef, count, total, pressed: reduced ? null : pressed, reduced };
}
