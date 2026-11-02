import Image from 'next/image';
import { SKILLS } from '@/lib/content';
import SectionHeader from './SectionHeader';

export default function About() {
  return (
    <section
      id="sobre-mi"
      aria-labelledby="sobre-mi-titulo"
      className="mx-auto max-w-[1200px] px-4 py-24 md:px-6 md:py-32"
    >
      <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <div className="mx-auto w-full max-w-[24rem] md:mx-0">
          <Image
            src="/img/yo.webp"
            alt="Foto de Facundo Quinteros"
            width={900}
            height={1080}
            sizes="(min-width: 768px) 384px, 90vw"
            className="aspect-[5/6] w-full rounded-2xl border border-line bg-surface-3 object-cover"
          />
        </div>

        <div className="min-w-0">
          <SectionHeader id="sobre-mi-titulo" eyebrow="Sobre mí" title="Software, datos e IA" />
          <div className="max-w-[40rem] space-y-4 text-lg text-ink-2">
            <p>
              Estudio la <strong className="font-semibold text-ink">Tecnicatura en Inteligencia Artificial</strong>{' '}
              en la FCEIA (UNR) desde 2024. Me interesa el punto donde se cruzan el software y los datos:
              productos que funcionan bien y además aprovechan la IA.
            </p>
            <p>
              Hice el curso fullstack de Egg Cooperation y tengo inglés avanzado. Ahora estoy profundizando en
              aprendizaje automático, procesamiento de lenguaje natural y de imágenes.
            </p>
          </div>

          <h3 className="mt-12 mb-5 text-xl font-bold">Con qué trabajo</h3>
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {SKILLS.map((group) => (
              <div key={group.name} className="border-t border-line pt-4">
                <dt className="font-semibold">{group.name}</dt>
                <dd className="mt-1 text-ink-2">{group.tools.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
