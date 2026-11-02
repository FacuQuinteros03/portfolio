# Portfolio de Facundo Quinteros

Sitio personal publicado en https://facundoquinteros.vercel.app (Vercel, rama `main`).

## Base

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Hanken Grotesk (`next/font`).
Fondo del hero con `@paper-design/shaders-react` (MeshGradient). Formulario de contacto: el navegador manda a `app/api/contacto`, que valida con zod y llama a la API de EmailJS desde el servidor (`lib/send-email.ts`). Íconos de trazo con `lucide-react`.

## Comandos

- `npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck`
- `npm run cv`: arma `public/Quinteros_Facundo_CV.pdf` desde `cv/cv.html`. Si cambia la experiencia en
  `lib/content.ts`, se cambia también en el CV.

## Reglas que no se rompen

- Todo el texto del sitio (experiencia, proyectos, skills, links) está en `lib/content.ts`.
- Todo color sale de un token de `app/globals.css`. Nada de hex sueltos en los componentes.
- El nombre del hero se lee entero desde el principio (letras apagadas); el teclado es decorado (`aria-hidden`).
- Con "reducir movimiento" no hay tramo de scroll: el nombre aparece completo.
- Ningún dato de servicios ni variable de entorno llega al navegador: nada de `NEXT_PUBLIC_` para claves o IDs.
  Las respuestas al visitante nunca nombran el servicio ni la variable que falta.

## Antes de… → leer…

| Antes de… | Leer |
|---|---|
| Tocar pantallas | `docs/guia-ui-ux.md` |
| Cerrar una tarea | `docs/pendientes.md` (lo que tiene que hacer Facundo) |

## Estado

- Rediseño en la rama `claude/peaceful-pasteur-d42qc8`, sin pasar a `main`. Hero elegido: teclado gamer 3D.
