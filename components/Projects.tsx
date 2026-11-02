import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/lib/content';
import SectionHeader from './SectionHeader';
import TiltCard from './TiltCard';

export default function Projects() {
  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-titulo"
      className="mx-auto max-w-[1200px] px-4 py-24 md:px-6 md:py-32"
    >
      <SectionHeader id="proyectos-titulo" eyebrow="Proyectos" title="Laborales y personales">
        Modelos de IA, visión por computadora y sitios en producción.
      </SectionHeader>

      <ul className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <TiltCard
            as="li"
            key={project.title}
            className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-2"
          >
            <div
              className={`aspect-[2/1] overflow-hidden border-b border-line ${
                project.fit === 'contain' ? 'bg-paper p-3' : 'bg-surface-3'
              }`}
            >
              <Image
                src={project.image}
                alt={`Imagen de ${project.title}`}
                width={project.width}
                height={project.height}
                sizes="(min-width: 768px) 576px, 100vw"
                className={`size-full ${project.fit === 'contain' ? 'object-contain' : 'object-cover object-top'}`}
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col p-6">
              <p className="text-sm font-medium text-accent-2">{project.context}</p>
              <h3 className="mt-1.5 text-xl font-bold">{project.title}</h3>
              <p className="mt-2 text-ink-2">{project.description}</p>
              {project.result && (
                <p className="mt-3 text-sm font-semibold text-accent">{project.result}</p>
              )}
              <p className="mt-3 flex-1 text-sm text-ink-3">{project.tags.join(' · ')}</p>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline mt-4 self-start font-semibold"
                >
                  {project.linkLabel}
                  <span className="sr-only"> de {project.title} (se abre en otra pestaña)</span>
                  <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
                </a>
              ) : (
                <p className="mt-4 flex min-h-11 items-center text-sm text-ink-3">Código privado · informe a pedido</p>
              )}
            </div>
          </TiltCard>
        ))}
      </ul>
    </section>
  );
}
