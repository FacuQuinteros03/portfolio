# Portfolio de Facundo Quinteros

Sitio personal publicado en https://facundoquinteros.vercel.app (Vercel, rama `main`).

## Base

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Hanken Grotesk (`next/font`).
Fondo del hero con `@paper-design/shaders-react` (MeshGradient). Formulario de contacto con EmailJS (`@emailjs/browser`) y validación con zod. Íconos de trazo con `lucide-react`.

## Comandos

- `npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck`

## Reglas que no se rompen

- Todo el texto del sitio (experiencia, proyectos, skills, links) está en `lib/content.ts`.
- Todo color sale de un token de `app/globals.css`. Nada de hex sueltos en los componentes.
- El nombre del hero se lee entero desde el principio (letras apagadas); el teclado es decorado (`aria-hidden`).
- Con "reducir movimiento" no hay tramo de scroll: el nombre aparece completo.

## Antes de… → leer…

| Antes de… | Leer |
|---|---|
| Tocar pantallas | `docs/guia-ui-ux.md` |
| Cerrar una tarea | `docs/pendientes.md` (lo que tiene que hacer Facundo) |

## Estado

- Rediseño en la rama `claude/peaceful-pasteur-d42qc8`, sin pasar a `main`. Hero elegido: teclado gamer 3D.
