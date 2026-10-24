# Pendientes del dueño

- [x] **Vercel:** `vercel.json` ya fuerza `"framework": "nextjs"`. Solo si el deploy falla igual: en el
      proyecto, Settings → Build and Deployment → Framework Settings, revisar que no haya un
      "Output Directory" pisado con `dist`.
- [ ] **Variables de EmailJS:** renombrarlas en Vercel de `VITE_EMAILJS_*` a
      `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` y `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`.
      Sin eso el formulario muestra "No se pudo enviar" y ofrece el mail directo.
- [ ] **Años:** se puso Marstech abril–agosto 2026 y Neuralsoft desde octubre 2026. Confirmar el año.
- [ ] **CV:** `public/Quinteros_Facundo_CV.pdf` no tiene Marstech ni Neuralsoft. Subir uno nuevo con el mismo nombre.
- [x] **Hero:** quedó el teclado gamer (opción A). La B se borró.
- [ ] Se sacó el chat con Gemini (`api/chat.js`), que estaba apagado. Si se quiere de vuelta, va como
      route handler en `app/api/chat/route.ts`; la variable `GEMINI_API_KEY` en Vercel ya no se usa.
