'use client';

import { useEffect, useRef, useState } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';

// Luces del fondo del hero. Muy oscuras a propósito: el texto blanco tiene que leerse encima.
const COLORS = ['#0c0b0f', '#2a1060', '#0c0b0f', '#0a3350', '#3d0d3a', '#0c0b0f', '#1c3a0a'];

export default function HeroBackground({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Fuera de pantalla el shader se frena, así no gasta batería.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <MeshGradient
        className="absolute inset-0 size-full"
        colors={COLORS}
        distortion={0.9}
        swirl={0.45}
        grainMixer={0.12}
        grainOverlay={0.12}
        speed={reduced || !visible ? 0 : 0.22}
        maxPixelCount={1600 * 1000}
      />
      {/* Se funde con la página abajo y oscurece apenas el centro, donde va el nombre. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_30%,color-mix(in_srgb,var(--surface)_55%,transparent),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-surface" />
    </div>
  );
}
