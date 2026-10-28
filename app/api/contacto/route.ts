import { contactSchema } from '@/lib/contact';
import { sendContactEmail } from '@/lib/send-email';

// El formulario de contacto manda acá. La respuesta nunca dice qué servicio se usa ni qué variable falta.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Campo trampa: es invisible para las personas, así que si viene lleno lo mandó un bot. Se lo trata como enviado.
  if (typeof body === 'object' && body !== null && 'website' in body && body.website) {
    return Response.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return Response.json({ ok: false }, { status: 400 });

  try {
    const result = await sendContactEmail(parsed.data);
    if (result === 'sent') return Response.json({ ok: true });
  } catch (err) {
    console.error('[contacto] No se pudo llamar a EmailJS.', err);
  }
  return Response.json({ ok: false }, { status: 502 });
}
