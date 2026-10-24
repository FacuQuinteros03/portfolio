import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/lib/content';
import SectionHeader from './SectionHeader';

export default function Projects() {
  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-titulo"
      className="mx-auto max-w-[1200px] px-4 py-24 md:px-6 md:py-32"
    >
      <SectionHeader id="proyectos-titulo" eyebrow="Proyectos" title="Cosas que hice">
        Sitios para clientes y trabajos de datos de la tecnicatura.
      </SectionHeader>

      <ul className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <li
            key={project.title}
            className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-2"
          >
            <div className="aspect-[2/1] overflow-hidden border-b border-line bg-surface-3">
              <Image
                src={project.image}
                alt={`Captura de ${project.title}`}
                width={project.width}
                height={project.height}
                sizes="(min-width: 768px) 576px, 100vw"
                className="size-full object-cover object-top"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col p-6">
              <p className="text-sm text-ink-3">{project.tags.join(' · ')}</p>
              <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
              <p className="mt-2 flex-1 text-ink-2">{project.description}</p>
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
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
