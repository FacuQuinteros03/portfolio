'use client';

import { useState } from 'react';
import { contactSchema as schema, type ContactInput } from '@/lib/contact';
import { EMAIL, LINKS } from '@/lib/content';
import SectionHeader from './SectionHeader';
import CopyButton from './CopyButton';

type Field = keyof ContactInput;
type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMPTY = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [sentTo, setSentTo] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const check = (field: Field, value: string) => {
    const result = schema.shape[field].safeParse(value);
    setErrors((prev) => ({ ...prev, [field]: result.success ? undefined : result.error.issues[0].message }));
    return result.success;
  };

  const onChange = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    // El error se va apenas se corrige, pero no aparece mientras se escribe.
    if (errors[field]) check(field, value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of result.error.issues) next[issue.path[0] as Field] ??= issue.message;
      setErrors(next);
      const first = (['name', 'email', 'message'] as Field[]).find((f) => next[f]);
      if (first) document.getElementById(`contacto-${first}`)?.focus();
      return;
    }

    setStatus('sending');
    try {
      // El mail lo manda el servidor: en la página no queda ningún dato del servicio.
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...result.data, website: honeypot }),
      });
      if (!response.ok) throw new Error(`El servidor respondió ${response.status}`);
      setSentTo(result.data.email);
      setForm(EMPTY);
      setStatus('sent');
    } catch (err) {
      console.error('No se pudo enviar el mensaje', err);
      setStatus('error');
    }
  };

  const fieldClass = (field: Field) =>
    `mt-2 block w-full rounded-xl border bg-surface-2 px-4 py-3 text-base text-ink placeholder:text-ink-3 ${
      errors[field] ? 'border-danger' : 'border-line-strong'
    }`;

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="mx-auto max-w-[1200px] px-4 py-24 md:px-6 md:py-32"
    >
      <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16">
        <div className="min-w-0">
          <SectionHeader id="contacto-titulo" eyebrow="Contacto" title="¿Tenés un proyecto?">
            Contame qué necesitás y te respondo por mail.
          </SectionHeader>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-ink-3">Mail</p>
              <div className="mt-1 flex flex-wrap items-center gap-x-3">
                <a href={`mailto:${EMAIL}`} className="link-underline text-lg [overflow-wrap:anywhere]">
                  {EMAIL}
                </a>
                <CopyButton value={EMAIL} label="Copiar mail" />
              </div>
            </div>
            <div>
              <p className="text-sm text-ink-3">LinkedIn</p>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="link-underline mt-1 text-lg">
                Facundo Quinteros
                <span className="sr-only"> (se abre en otra pestaña)</span>
              </a>
            </div>
          </div>
        </div>

        <form noValidate onSubmit={onSubmit} className="min-w-0 max-w-[36rem] space-y-6">
          {/* Campo trampa para bots: no se ve ni se puede enfocar. */}
          <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
            <label htmlFor="contacto-website">No completar</label>
            <input
              id="contacto-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="contacto-name" className="font-semibold">
              Nombre
            </label>
            <input
              id="contacto-name"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={onChange('name')}
              onBlur={(e) => check('name', e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'contacto-name-error' : undefined}
              className={fieldClass('name')}
            />
            {errors.name && (
              <p id="contacto-name-error" role="alert" className="mt-2 text-sm text-danger">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contacto-email" className="font-semibold">
              Mail
            </label>
            <input
              id="contacto-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={form.email}
              onChange={onChange('email')}
              onBlur={(e) => check('email', e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'contacto-email-error' : undefined}
              className={fieldClass('email')}
            />
            {errors.email && (
              <p id="contacto-email-error" role="alert" className="mt-2 text-sm text-danger">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contacto-message" className="font-semibold">
              Mensaje
            </label>
            <textarea
              id="contacto-message"
              name="message"
              rows={5}
              value={form.message}
              onChange={onChange('message')}
              onBlur={(e) => check('message', e.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'contacto-message-error' : undefined}
              className={`${fieldClass('message')} resize-y`}
            />
            {errors.message && (
              <p id="contacto-message-error" role="alert" className="mt-2 text-sm text-danger">
                {errors.message}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
          </button>

          <div role="status" aria-live="polite">
            {status === 'sent' && (
              <p className="text-success">Mensaje enviado. Te respondo a {sentTo}.</p>
            )}
          </div>
          {status === 'error' && (
            <p role="alert" className="text-danger">
              No se pudo enviar el mensaje. Escribime directo a{' '}
              <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
                {EMAIL}
              </a>
              , lo que escribiste sigue acá.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
