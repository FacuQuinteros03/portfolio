import 'server-only';
import type { ContactInput } from './contact';

const EMAILJS_URL = 'https://api.emailjs.com/api/v1.0/email/send';

// Se leen al momento de enviar, no al armar el sitio. Valen los nombres nuevos (sin NEXT_PUBLIC_) y los
// que ya están cargados en Vercel. Nada de esto llega al navegador: este archivo solo corre en el servidor.
function readEnv(name: string) {
  return process.env[`EMAILJS_${name}`] || process.env[`NEXT_PUBLIC_EMAILJS_${name}`];
}

export type SendResult = 'sent' | 'not-configured' | 'failed';

export async function sendContactEmail(data: ContactInput): Promise<SendResult> {
  const serviceId = readEnv('SERVICE_ID');
  const templateId = readEnv('TEMPLATE_ID');
  const publicKey = readEnv('PUBLIC_KEY');
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error('[contacto] Faltan variables de EmailJS en el servidor.');
    return 'not-configured';
  }

  const response = await fetch(EMAILJS_URL, {
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

  if (!response.ok) {
    console.error(`[contacto] EmailJS respondió ${response.status}: ${await response.text()}`);
    return 'failed';
  }
  return 'sent';
}
