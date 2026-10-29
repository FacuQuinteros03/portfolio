import 'server-only';
import type { ContactInput } from './contact';

const EMAILJS_URL = 'https://api.emailjs.com/api/v1.0/email/send';

// Se leen al momento de enviar, no al armar el sitio. Valen los nombres nuevos (sin NEXT_PUBLIC_) y los
// que ya están cargados en Vercel. Nada de esto llega al navegador: este archivo solo corre en el servidor.
function readEnv(name: string) {
  return process.env[`EMAILJS_${name}`] || process.env[`NEXT_PUBLIC_EMAILJS_${name}`];
}

/**
 * Si falla, un código corto para diagnosticar desde una captura sin mostrarle al visitante qué servicio se usa:
 * C1 faltan variables · C3 no se pudo conectar · E1 envíos desde servidor apagados · E2 falta o está mal la
 * private key · E3 public key · E4 service ID · E5 template ID · E9-<status> otro rechazo.
 */
export type SendResult = { ok: true } | { ok: false; code: string };

function classify(status: number, text: string) {
  if (/non-browser/i.test(text)) return 'E1';
  if (/private key|accessToken|strict mode/i.test(text)) return 'E2';
  if (/public key|user id|user_id/i.test(text)) return 'E3';
  if (/service/i.test(text)) return 'E4';
  if (/template/i.test(text)) return 'E5';
  return `E9-${status}`;
}

export async function sendContactEmail(data: ContactInput): Promise<SendResult> {
  const serviceId = readEnv('SERVICE_ID');
  const templateId = readEnv('TEMPLATE_ID');
  const publicKey = readEnv('PUBLIC_KEY');
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error('[contacto] Faltan variables de EmailJS en el servidor.');
    return { ok: false, code: 'C1' };
  }

  let response: Response;
  try {
    response = await fetch(EMAILJS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        ...(privateKey ? { accessToken: privateKey } : {}),
        template_params: { from_name: data.name, from_email: data.email, message: data.message },
      }),
      cache: 'no-store',
    });
  } catch (err) {
    console.error('[contacto] No se pudo llamar a EmailJS.', err);
    return { ok: false, code: 'C3' };
  }

  if (!response.ok) {
    const text = await response.text();
    console.error(`[contacto] EmailJS respondió ${response.status}: ${text}`);
    return { ok: false, code: classify(response.status, text) };
  }
  return { ok: true };
}
