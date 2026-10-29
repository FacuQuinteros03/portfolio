import { ArrowUpRight } from 'lucide-react';
import { LINKS, NAME, ROLE } from '@/lib/content';

const SOCIAL = [
  { href: LINKS.github, label: 'GitHub' },
  { href: LINKS.linkedin, label: 'LinkedIn' },
  { href: LINKS.instagram, label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-12 md:flex-row md:items-end md:justify-between md:px-6">
        <div>
          <p className="text-lg font-bold">{NAME}</p>
          <p className="text-ink-2">{ROLE}</p>
          <p className="mt-4 text-sm text-ink-3">© {new Date().getFullYear()} {NAME}</p>
        </div>
        <ul className="flex flex-wrap gap-x-6">
          {SOCIAL.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="link-underline">
                {s.label}
                <span className="sr-only"> (se abre en otra pestaña)</span>
                <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </li>
          ))}
          <li>
            <a href="#inicio" className="link-underline">
              Volver arriba
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
