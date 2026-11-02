import { z } from 'zod';

// Lo comparten el formulario (valida al salir de cada campo) y el servidor (vuelve a validar antes de mandar).
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Escribí tu nombre.').max(120, 'El nombre es demasiado largo.'),
  email: z.email('Revisá el mail: le falta algo (por ejemplo, la @).').max(200),
  message: z
    .string()
    .trim()
    .min(10, 'Contame un poco más (al menos 10 letras).')
    .max(5000, 'El mensaje es demasiado largo (máximo 5000 letras).'),
});

export type ContactInput = z.infer<typeof contactSchema>;
