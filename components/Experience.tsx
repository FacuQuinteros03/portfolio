import { EXPERIENCE, type Job } from '@/lib/content';
import SectionHeader from './SectionHeader';
import TiltCard from './TiltCard';

export default function Experience() {
  const [featured, ...rest] = EXPERIENCE;

  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-titulo"
      className="mx-auto max-w-[1200px] px-4 py-24 md:px-6 md:py-32"
    >
      <SectionHeader id="experiencia-titulo" eyebrow="Experiencia" title="Dónde trabajé">
        De automatizar con IA a formarme en todo el stack de un ERP.
      </SectionHeader>

      {featured.featured && <FeaturedJob job={featured} />}

      <ol className="mt-6 border-t border-line">
        {(featured.featured ? rest : EXPERIENCE).map((job) => (
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
              <Highlights items={job.highlights} />
              <p className="mt-4 text-sm text-ink-3">{job.tags.join(' · ')}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** El trabajo actual, en grande: lo que más vende va primero. */
function FeaturedJob({ job }: { job: Job }) {
  return (
    <TiltCard
      as="article"
      strength={0.5}
      className="overflow-hidden rounded-3xl border border-violet/40 bg-surface-2 p-6 shadow-[0_0_4rem_color-mix(in_srgb,var(--violet)_18%,transparent)] md:p-10"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="text-3xl font-bold tracking-tight md:text-4xl">{job.company}</p>
        <p className="text-ink-2">{job.period}</p>
      </div>
      <h3 className="mt-2 text-lg font-semibold text-violet md:text-xl">{job.role}</h3>

      <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-12">
        <div className="min-w-0">
          <p className="text-lg text-ink-2">{job.summary}</p>
          <Highlights items={job.highlights} />
        </div>
        {job.learning && (
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">Lo que estoy aprendiendo</p>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {job.learning.map((item) => (
                <li
                  key={item}
                  className="flex min-h-14 items-center rounded-xl border border-line bg-surface-3 px-3 py-2 text-sm leading-snug font-medium text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </TiltCard>
  );
}

function Highlights({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-3 space-y-1.5 text-ink-2">
      {items.map((h) => (
        <li key={h} className="relative pl-5">
          <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-2.5 bg-ink-3" />
          {h}
        </li>
      ))}
    </ul>
  );
}
