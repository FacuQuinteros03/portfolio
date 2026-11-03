'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown } from 'lucide-react';
import { CV_URL, NAME, ROLE } from '@/lib/content';
import HeroBackground from './HeroBackground';
import { usePointerTilt } from './hero/usePointerTilt';
import { useScrollTyping } from './hero/useScrollTyping';

const TEXT = NAME.toUpperCase();

// Las partículas (three.js) se cargan solo en el navegador y aparte del resto de la página.
const ParticleField = dynamic(() => import('./hero/ParticleField'), { ssr: false });

export default function Hero() {
  const { trackRef, count, total, reduced } = useScrollTyping(TEXT);
  usePointerTilt(trackRef, !reduced);
  const done = count === total;
  const slotRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = () => {
    const track = trackRef.current;
    if (!track) return;
    const end = track.getBoundingClientRect().top + window.scrollY + track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: end, behavior: 'smooth' });
  };

  return (
    <section id="inicio" aria-labelledby="hero-title">
      {/* El tramo alto es lo que se recorre con el scroll mientras el hero queda fijo. */}
      <div
        ref={trackRef}
        className={reduced ? undefined : 'h-[220svh] md:h-[250svh]'}
        style={reduced ? undefined : ({ '--scroll': 0, '--typed': 0 } as React.CSSProperties)}
      >
        <div className="sticky top-0 isolate min-h-svh overflow-x-clip">
          <HeroBackground reduced={reduced} />
          {/* Las partículas se dibujan sobre todo el hero (detrás del texto), así nunca se cortan en un borde. */}
          <div className="pointer-events-none absolute inset-0">
            <ParticleField trackRef={trackRef} slotRef={slotRef} reduced={reduced} />
          </div>
          <div className="relative mx-auto flex min-h-svh max-w-[1200px] flex-col justify-center gap-[clamp(0.75rem,2.4svh,1.75rem)] px-4 pt-[4.75rem] pb-4 md:px-6">
            <h1 id="hero-title" className="sr-only">
              {NAME}, {ROLE}
            </h1>

            <p className="text-center text-sm text-ink-2 md:text-base">
              Rosario, Argentina · Hoy en <span className="font-semibold text-ink">Neuralsoft</span>
            </p>

            <TypedName count={count} />

            <div className="flex flex-col items-center gap-[clamp(0.75rem,2.4svh,1.25rem)] text-center">
              <p className="max-w-[34rem] text-lg text-ink-2 md:text-xl">
                <span className="font-semibold text-ink">{ROLE}.</span> Hago sitios y herramientas que
                juntan software, datos e IA.
              </p>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a href="#experiencia" className="btn btn-primary">
                  Ver experiencia
                </a>
                <a href={CV_URL} download className="btn btn-secondary">
                  Descargar CV
                </a>
              </div>
            </div>

            {/* Hueco donde se centran las partículas; tocarlo cambia el color. */}
            <div
              ref={slotRef}
              aria-hidden="true"
              className="mx-auto h-[clamp(7rem,calc(100svh-38rem),22rem)] w-full max-w-[1100px] md:h-[clamp(9rem,calc(100svh-29rem),28rem)]"
            />

            {/* Flecha que invita a bajar. Al tocarla baja sola hasta el final de la animación; desaparece al terminar. */}
            {!reduced && (
              <div className="flex justify-center transition-opacity duration-200" style={{ opacity: done ? 0 : 1 }}>
                <button
                  type="button"
                  onClick={scrollToEnd}
                  disabled={done}
                  aria-label="Bajar hasta el final de la animación"
                  className="scroll-cue flex size-11 items-center justify-center rounded-full border border-line-strong text-ink-2 transition-colors duration-150 hover:border-accent hover:text-accent disabled:pointer-events-none"
                >
                  <ArrowDown size={20} strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** El nombre en grande: lo escrito en blanco, lo que falta apagado, así se lee entero desde el principio. */
function TypedName({ count }: { count: number }) {
  const last = count - 1;

  return (
    <p
      aria-hidden="true"
      className="text-center text-[clamp(2.6rem,min(8.5vw,12svh),6rem)] leading-[0.95] font-bold tracking-tight"
    >
      <span>{TEXT.slice(0, Math.max(0, last))}</span>
      {/* La última letra escrita toma el color del tema, con un brillo. */}
      {count > 0 && <span className="text-accent [text-shadow:0_0_0.4em_var(--accent-glow)]">{TEXT[last]}</span>}
      <span className="relative">
        <span className="absolute top-[0.08em] -left-[0.04em] h-[0.82em] w-[0.07em] bg-accent shadow-[0_0_1rem_var(--accent-glow)]" />
      </span>
      <span className="text-transparent [-webkit-text-stroke:1.5px_var(--line-strong)]">{TEXT.slice(count)}</span>
    </p>
  );
}
