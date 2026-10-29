# Pendientes del dueño

- [x] **Vercel:** `vercel.json` ya fuerza `"framework": "nextjs"`. Solo si el deploy falla igual: en el
      proyecto, Settings → Build and Deployment → Framework Settings, revisar que no haya un
      "Output Directory" pisado con `dist`.
- [ ] **EmailJS, permitir envíos desde el servidor:** en emailjs.com → Account → Security, activar
      "Allow EmailJS API for non-browser applications". Sin eso EmailJS rechaza el envío (403) y el
      formulario muestra "No se pudo enviar".
- [ ] **(Recomendado) Private key:** en emailjs.com → Account → API keys, copiar la Private Key y cargarla
      en Vercel como `EMAILJS_PRIVATE_KEY` (todos los entornos). Si además se activa "Use Private Key" en
      Security, nadie puede mandar mails con tus datos fuera de tu servidor.
- [ ] **(Opcional) Nombres de variables:** el servidor acepta `EMAILJS_*` y también los
      `NEXT_PUBLIC_EMAILJS_*` que ya están cargados, así que no hace falta tocarlos. Si se renombran a
      `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID` y `EMAILJS_PUBLIC_KEY`, queda más prolijo.
- [x] **Fechas:** Marstech abril–agosto 2026, Neuralsoft desde octubre 2026 (confirmado).
- [x] **CV:** se arma desde `cv/cv.html` con `npm run cv` (ya incluye Neuralsoft y Marstech).
- [x] **Hero:** quedó el teclado gamer (opción A). La B se borró.
- [ ] Se sacó el chat con Gemini (`api/chat.js`), que estaba apagado. Si se quiere de vuelta, va como
      route handler en `app/api/chat/route.ts`; la variable `GEMINI_API_KEY` en Vercel ya no se usa.
