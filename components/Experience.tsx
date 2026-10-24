import { EXPERIENCE } from '@/lib/content';
import SectionHeader from './SectionHeader';

export default function Experience() {
  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-titulo"
      className="mx-auto max-w-[1200px] px-4 py-24 md:px-6 md:py-32"
    >
      <SectionHeader id="experiencia-titulo" eyebrow="Experiencia" title="Dónde trabajé">
        De implementar un ERP a automatizar con IA y armar interfaces en React.
      </SectionHeader>

      <ol className="border-t border-line">
        {EXPERIENCE.map((job) => (
          <li
            key={job.company + job.role}
            className="grid gap-x-10 gap-y-3 border-b border-line py-8 md:grid-cols-[14rem_minmax(0,1fr)] md:py-10"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 md:flex-col">
              <p className="text-xl font-bold">{job.company}</p>
              {job.period && <p className="text-sm text-ink-3">{job.period}</p>}
            </div>

            <div className="min-w-0 max-w-[44rem]">
              <h3 className="text-lg font-semibold text-ink">{job.role}</h3>
              <p className="mt-2 text-ink-2">{job.summary}</p>
              {job.highlights.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-ink-2">
                  {job.highlights.map((h) => (
                    <li key={h} className="relative pl-5">
                      <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-2.5 bg-ink-3" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-4 text-sm text-ink-3">{job.tags.join(' · ')}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
