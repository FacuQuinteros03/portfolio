'use client';

import { CV_URL, NAME, ROLE } from '@/lib/content';
import HeroBackground from './HeroBackground';
import GamerKeyboard from './keyboard/GamerKeyboard';
import { usePointerTilt } from './keyboard/usePointerTilt';
import { useScrollTyping } from './keyboard/useScrollTyping';

const TEXT = NAME.toUpperCase();

export default function Hero() {
  const { trackRef, count, total, pressed, reduced } = useScrollTyping(TEXT);
  usePointerTilt(trackRef, !reduced);
  const done = count === total;

  return (
    <section id="inicio" aria-labelledby="hero-title">
      {/* El tramo alto es lo que se recorre con el scroll mientras el teclado queda fijo. */}
      <div
        ref={trackRef}
        className={reduced ? undefined : 'h-[220svh] md:h-[250svh]'}
        style={reduced ? undefined : ({ '--scroll': 0, '--typed': 0 } as React.CSSProperties)}
      >
        <div className="sticky top-0 isolate min-h-svh overflow-x-clip">
          <HeroBackground reduced={reduced} />
          <div className="mx-auto flex min-h-svh max-w-[1200px] flex-col justify-center gap-[clamp(0.75rem,2.4svh,1.75rem)] px-4 pt-[4.75rem] pb-4 md:px-6">
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

            <GamerKeyboard typed={TEXT.slice(0, count)} pressed={pressed} />

            {!reduced && (
              <p
                aria-hidden="true"
                className="text-center text-sm text-ink-3 tabular-nums transition-opacity duration-200"
                style={{ opacity: done ? 0 : 1 }}
              >
                Bajá para escribir mi nombre · {count}/{total}
              </p>
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
  const hue = Math.round((last / (TEXT.length - 1)) * 300);

  return (
    <p
      aria-hidden="true"
      className="text-center text-[clamp(2.6rem,min(8.5vw,12svh),6rem)] leading-[0.95] font-bold tracking-tight"
    >
      <span>{TEXT.slice(0, Math.max(0, last))}</span>
      {/* La última letra escrita toma el color de su luz, como la tecla que se acaba de apretar. */}
      {count > 0 && (
        <span style={{ color: `hsl(${hue} 95% 72%)`, textShadow: `0 0 0.4em hsl(${hue} 95% 60% / 0.6)` }}>
          {TEXT[last]}
        </span>
      )}
      <span className="relative">
        <span className="absolute top-[0.08em] -left-[0.04em] h-[0.82em] w-[0.07em] bg-accent shadow-[0_0_1rem_var(--accent-glow)]" />
      </span>
      <span className="text-transparent [-webkit-text-stroke:1.5px_var(--line-strong)]">{TEXT.slice(count)}</span>
    </p>
  );
}
