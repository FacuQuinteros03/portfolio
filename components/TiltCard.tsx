'use client';

import { useRef } from 'react';

/** Una tarjeta que se inclina hacia el mouse con un brillo que lo sigue. Con el dedo o con "reducir movimiento" queda quieta. */
export default function TiltCard({
  as: Tag = 'div',
  className = '',
  strength = 1,
  children,
}: {
  as?: 'div' | 'li' | 'article';
  className?: string;
  strength?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(0.5 - y) * 7 * strength}deg`);
    el.style.setProperty('--ry', `${(x - 0.5) * 9 * strength}deg`);
    el.style.setProperty('--gx', `${x * 100}%`);
    el.style.setProperty('--gy', `${y * 100}%`);
    el.style.setProperty('--glare', '1');
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--glare', '0');
  };

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`tilt ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </Tag>
  );
}
