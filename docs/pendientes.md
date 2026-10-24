# Pendientes del dueño

- [ ] **Vercel:** en el proyecto, Settings → Build and Deployment → Framework Preset, pasar de "Vite" a
      "Next.js" (y borrar "Output Directory" = `dist` si está puesto).
- [ ] **Variables de EmailJS:** renombrarlas en Vercel de `VITE_EMAILJS_*` a
      `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` y `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`.
      Sin eso el formulario muestra "No se pudo enviar" y ofrece el mail directo.
- [ ] **Fechas de Marstech y de ingreso a Neuralsoft:** completarlas en `lib/content.ts` (campo `period`).
- [ ] **CV:** `public/Quinteros_Facundo_CV.pdf` no tiene Marstech ni Neuralsoft. Subir uno nuevo con el mismo nombre.
- [ ] **Elegir hero:** `/` o `/opcion-b`.
- [ ] Se sacó el chat con Gemini (`api/chat.js`), que estaba apagado. Si se quiere de vuelta, va como
      route handler en `app/api/chat/route.ts`; la variable `GEMINI_API_KEY` en Vercel ya no se usa.
