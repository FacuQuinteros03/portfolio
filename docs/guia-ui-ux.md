# Guía de UI/UX

Reglas para diseñar o cambiar cualquier pantalla: una página pública, un panel de gestión o una
landing. Se repasan antes de dar un diseño por terminado. Las fuentes están al final.

## 1. Accesibilidad (piso: WCAG 2.2 nivel AA)

Aunque la ley no te obligue, tomala como piso: también mejora la conversión.

- **Contraste:** texto normal 4,5:1; texto grande (24 px, o 19 px en negrita) y controles o íconos
  que hay que distinguir, 3:1. Los que más fallan son los grises del texto secundario y el texto
  sobre el color de acento: medilos.
- **Nada solo por color:** cada estado (elegido, cerrado, error) lleva además forma, texto o
  ícono. Por ejemplo, un día cerrado va tachado, no solo en gris.
- **Tamaño de toque:** el mínimo es 24×24 px (WCAG 2.5.8). En la práctica, **44×44 px** (Apple) o
  48 dp (Material), con 8 px entre objetivos vecinos. Los links de texto sueltos también llevan
  44 px de alto.
- **Teclado:** todo se usa con Tab, Enter y Espacio, en orden lógico, con foco visible y sin
  quedar tapado por encabezados fijos (WCAG 2.4.11).
- **HTML con significado:**
  - `button` para acciones y `a href` para navegar.
  - Un `label` en cada campo.
  - Un `h1` por página y los títulos en orden.
  - `aria-pressed` en opciones tipo botón y `role="alert"` en errores.
  - `alt` en las fotos.
- **Arrastrar nunca es obligatorio** (WCAG 2.5.7): todo lo que se arrastra tiene también una
  forma con toques o flechas.
- **Login accesible** (WCAG 3.3.8): nada de acertijos ni de copiar códigos a mano si se puede
  evitar. Un link mágico por mail cumple.
- **No pedir dos veces lo mismo** (WCAG 3.3.7): lo que el usuario ya cargó se recuerda dentro del
  flujo.
- **Movimiento:** respetá `prefers-reduced-motion` y no uses nada que parpadee.
- **Zoom:** la página funciona al 200 % y a 320 px de ancho, sin scroll horizontal.

## 2. Principios de uso (heurísticas de Nielsen, aplicadas)

1. **Estado visible:** "Buscando…", "Te guardamos el lugar hasta las 11:20", un botón que dice
   "Guardando…".
2. **El lenguaje del usuario:** sin jerga técnica, y con los formatos locales de precio, hora y
   fecha.
3. **Control y salida:** se puede cancelar sin llamar a nadie y volver atrás sin perder lo cargado.
4. **Consistencia:** un solo estilo de botón principal por pantalla, y las mismas palabras para lo
   mismo en todos lados.
5. **Prevenir errores:** mostrá solo las opciones válidas, deshabilitá lo que no se puede elegir y
   validá antes de enviar.
6. **Reconocer antes que recordar:** el resumen de lo elegido queda siempre a la vista.
7. **Atajos:** una opción "Me da igual" para quien no quiere elegir, y el autocompletar del
   navegador.
8. **Diseño mínimo:** cada pantalla tiene una tarea. Sacá lo que no ayuda a cumplirla.
9. **Errores claros:** qué pasó y cómo seguir ("Ese horario se ocupó recién. Elegí otro").
10. **Ayuda a mano:** un contacto directo a la vista.

## 3. Flujos de compra o reserva (lo que más convierte)

- Mostrá la **disponibilidad real** desde el primer paso. Nunca dejes elegir algo ocupado.
- **Pedí pocos datos:** solo lo imprescindible. El resto, opcional.
- **Precio desde el principio**, sin sorpresas al final, y repetido en el resumen.
- **Botón de acción siempre alcanzable:** en el celular, fijo abajo si el formulario es largo.
- **Confirmación inmediata** con lo que hay que saber: cuándo, dónde, con quién y cómo cancelar.
- **Que el usuario se lleve el resultado sin crear una cuenta:** "Agregar a mi calendario" o
  "Mandármelo por WhatsApp/mail". Nunca un "guardá este link" sin darle cómo.
- **En PC:** formulario a la izquierda y resumen fijo a la derecha.

## 4. Formularios

- La etiqueta va **visible, arriba** del campo, nunca como placeholder adentro.
- Una sola columna, y cada campo del ancho que ocupa el dato. En pantallas grandes, ningún campo
  ni ventana se estira a todo el ancho: va con su ancho de lectura.
- `autocomplete` correcto y el teclado adecuado (`type="tel"`, `inputmode="numeric"`).
- Validá al salir del campo, no mientras se escribe, y sacá el error apenas se corrige.
- El mensaje de error va pegado al campo y en texto, no solo en rojo.
- Montos con teclado numérico y sin un `step` que rechace montos comunes.
- Un formulario para agregar no está abierto todo el tiempo si ya hay una lista: se abre con un
  botón.

## 5. Tipografía y lectura

- Texto principal de **16 px** en el celular. En los campos, siempre 16 px, así iOS no hace zoom.
  El texto secundario no baja de 13 px. Interlineado entre 1,4 y 1,6.
- Largo de línea de **45 a 75 caracteres** (lo ideal, ~66). En PC, limitá el ancho de los párrafos.
- Máximo 2 o 3 familias: una para títulos y otra para todo lo demás.
- La jerarquía se marca con tamaño y peso, no con mayúsculas largas ni solo con color.

## 6. Responsive (celular primero)

- Diseñá primero a **390 px** y agrandá. Los cortes van donde se rompe el contenido. Los de
  Tailwind sirven de guía: 640, 768, 1024 y 1280.
- Probá siempre en **320, 390, 768, 1024 y 1440 px**.
- Imágenes con proporción fija (así no hay saltos) y del tamaño en que se muestran.
- En PC no estires todo: el contenido va en una columna de 1200 px como máximo, con márgenes.
- **Reacomodá, no solo apiles:**
  - En el celular, lo grande va a lo ancho y en orden de importancia.
  - Lo chico y parecido (números, fotos, colores) sigue de a 2 o 3 por fila.
  - Si el orden de PC no sirve en el celular, se cambia.
- Los componentes que viven en lugares de distinto ancho pueden usar container queries.
- Ningún recuadro queda suelto en la última fila de una grilla: el que sobra se estira hasta
  completarla, o se elige otra cantidad de columnas.
- Ninguna caja se estira más que su contenido (nada de mucho texto arriba y todo vacío abajo).
- Los textos largos (nombres, mails) se cortan dentro de su caja (`overflow-wrap: anywhere` +
  `min-width: 0`). Los precios no se parten. Nada corre la página de costado.

## 7. Rendimiento (Core Web Vitals, en el 75 % de las visitas)

- **LCP ≤ 2,5 s:** la imagen principal, optimizada, con prioridad y con tamaños por pantalla.
- **INP ≤ 200 ms:** nada pesado al tocar algo.
- **CLS ≤ 0,1:** reservá el lugar de fotos, fuentes y widgets que cargan después.
- Pocas fuentes, y solo los pesos que usás.
- Los fondos con filtros SVG pesados (ruido, desplazamiento) van ya dibujados como imagen, porque
  pueden trabar el dibujo de toda la página.

## 8. Estilo visual (que no parezca hecho con IA)

- Estilos curados a mano, no plantillas genéricas.
- **Tipografías elegidas a mano.** Las que hoy "suenan a IA": Inter, Roboto, Arial, Fraunces,
  Instrument Serif, Bricolage, Space Grotesk y Playfair.
- **Combinaciones de color gastadas:** por ejemplo, crema + terracota.
- **Lo que delata una página hecha con IA:**
  - degradados de relleno
  - tarjetas con borde de color a la izquierda
  - emojis como íconos
  - puntitos de estado de colores
  - frases de relleno ("potenciá tu negocio")
  - flechas "→" sueltas en todos lados
- Íconos de trazo, todos del mismo grosor, con texto al lado cuando la acción no es obvia.
- Fotos reales. Mientras no haya, un recuadro del color del estilo, no ilustraciones de stock.
- Botones bien redondeados, con un alto mínimo de 48 px (44 px los chicos de una lista).
- **Modo oscuro:** gris carbón cálido, nunca negro puro ni azulado. **Todo color sale de un token**
  (superficie, tinta, línea…), nunca blancos ni hex sueltos, salvo lo que es papel o foto.
- Un logo nunca va sobre una caja de color. Si el fondo cambia, se pinta del color del texto.
- Si el usuario elige un color que no se lee, se ajusta lo justo y se le avisa. Nunca se ignora en
  silencio lo que eligió.
- Cuando el usuario elige entre diseños, cada opción se distingue de un vistazo (por forma, no por
  un detalle) y se muestra con sus propios colores.

## 9. Botones y acciones

Sale de Material Design 3 (niveles de énfasis), NN/g y Primer (acciones que no se deshacen) y de
la zona del pulgar.

**Jerarquía (de más a menos fuerte):**

| Nivel | Cómo se ve | Para qué |
|---|---|---|
| Principal | Lleno, color de acento | La acción de la pantalla o de la tarjeta: **una sola por contexto** |
| Secundaria | Con borde | Alternativas importantes |
| Sutil | Borde suave, fondo de superficie | Acciones que se repiten en cada fila de una lista |
| Terciaria | Texto subrayado | Ir a otro lado, "Ver todo", "Cambiar" |
| Peligro | Borde rojo suave, texto rojo | Anular, borrar, quitar |

**Reglas:**

- **Lo más usado va primero** (a la izquierda en una fila, arriba en el celular). **Lo que no se
  deshace va al final, separado** y con confirmación.
- **Confirmación en el lugar, no en un modal genérico:**
  - Dice exactamente qué va a pasar ("¿Anular el turno de Sofía?").
  - Ofrece "Sí, anular" en rojo lleno y "Mejor no".
  - El "Sí" nunca queda donde estuvo el primer toque.
  - Solo se confirma lo que no se deshace.
- **Una alternativa a confirmar: mantener apretado.** Se mantiene 1,5 s, el botón se llena de
  izquierda a derecha y, si se suelta antes, no pasa nada. Al primer toque aparece la pregunta y
  "Mantené apretado para confirmar".
- **Deslizar es un atajo, nunca la única forma:** en el celular se desliza con "Deshacer" unos
  segundos, y los botones siguen estando.
- **Verbos concretos:** "Guardar turno", "Cerrar esos días". Nunca "Aceptar" ni "OK".
- **Mientras trabaja,** el botón lo dice ("Guardando…") y no deja tocar dos veces.
- **Agregar a una lista:** botón "+ Agregar…" arriba, junto al título. Así no hay que bajar todo.
- **Formularios largos:** el botón de guardar queda fijo abajo. Si hay varias tarjetas que se
  guardan por separado, va un botón al pie de cada una.
- **Listas que se editan en el lugar:**
  - Cada fila guarda lo suyo y dice "✓ Guardado" ahí mismo.
  - "Guardar cambios" aparece solo si hay algo sin guardar.
  - Nunca un aviso arriba de todo que no se ve.
- **Listas largas con filtros:**
  - Buscador arriba y cuántos resultados hay (en un `role=status`).
  - Páginas con "Más nuevos / Más viejos".
  - Los filtros quedan en la dirección, así se puede volver o compartir.
- **Buscadores:** no miran tildes ni mayúsculas, buscan cada palabra por separado y buscan
  mientras se escribe. Primero los resultados que empiezan con lo buscado, cada uno con un dato
  para distinguirlo.
- **Filtros y vistas** (Todos / Frecuentes, Día / Semana): fichas con la elegida llena. En el
  celular, en una sola fila que se desliza y arranca mostrando la elegida.
- **Filas que se deslizan de costado:** el borde se esfuma del lado donde hay más, solo si de
  verdad se desliza.
- **Subir archivos:**
  - Zona para arrastrar con el botón adentro y qué se acepta.
  - Con varios, una lista con miniatura, estado y barra de cada uno.
  - Si uno falla, siguen los demás, y al final va un resumen.
- **Cargar cantidades:** − / número / + de 44 px. El total y el botón van fijos abajo, y el botón
  no se activa hasta que se elige algo.
- **Datos para pegar en otra app** (un alias, un monto): el dato y "Copiar" al lado, con
  "Copiado" un momento.
- **Botón deshabilitado que dice qué falta** ("Elegí un horario"): gris parejo, nunca
  transparente.
- **Algo para activar** (los avisos): un cartel claro, con el botón lleno y "Ahora no".
- **Algo que espera respuesta pero no tiene que ocupar la pantalla:** un botón con la cuenta ("2
  sin confirmar") que abre la lista en el lugar.
- **Tarjetas de una lista:** muestran solo la acción que toca ahora (como mucho dos más). El resto
  va en "Más". Las etiquetas son para estados que piden atención, no para datos.
- **Elegir días:** fichas Lun a Dom de 44 px, con radios y casillas de verdad debajo.
- **Ordenar arrastrando:**
  - Se agarra la fila o la foto entera, sin una manija en la esquina.
  - Con el mouse, al arrastrar más de 6 px. Con el dedo, al mantener ~0,4 s.
  - Lo levantado se agranda con sombra y los demás se corren en vivo.
  - Siempre hay flechas además.
- **Guías y tutoriales:**
  - Un globito oscuro con el paso arriba ("Paso 2 de 5"), un texto corto, rayitas de avance y un
    solo botón lleno.
  - En la compu, al lado de lo que señala. En el celular, como hoja abajo.
  - Lo señalado se marca y el resto se oscurece apenas, pero se puede tocar todo.
  - La guía nunca avanza sola, y Escape la cierra.
- **Zona del pulgar:** en el celular, lo principal va ancho y fácil de alcanzar, y lo peligroso,
  lejos de lo que se toca seguido.
- **Proximidad:** cada botón va pegado a lo que afecta.
- **Al apretar:** el botón se achica apenas (`scale: 0.97`, ~160 ms), sin el flash gris del
  celular. El hover, solo con mouse (`@media (hover: hover) and (pointer: fine)`).

## 10. Navegación y orden de las pantallas

- **Volver:** guardar vuelve a la misma pantalla **sin sumar un paso** al historial. El "volver"
  de arriba deja la lista como estaba, a la altura de la fila abierta. **Un solo "volver" por
  pantalla.**
- Lo que se abre a pantalla completa (una foto, una vista previa) se cierra con el atrás del
  celular.
- **Sin guardar:** si un formulario quedó distinto y se sale, se pregunta antes. Un filtro o un
  selector no cuenta.
- **Errores y "no encontrado":** "Algo no anduvo", con "Probar de nuevo" y a dónde ir, dentro de
  la misma app. Nunca la pantalla técnica.
- **Vista previa en vivo:** todo ajuste visual se ve al instante, con "Así va a quedar. Falta
  guardar." hasta que se guarda.
- **Cada pantalla arranca con un resumen corto** (un número grande, el estado). El resto va
  cerrado: el detalle en desplegables y lo que se edita en ventanas.
- **Una pantalla de ajustes** no muestra todos los formularios abiertos: arriba el resumen de cada
  cosa y "Editar" abre su ventana.
- **Lo que espera algo del usuario va primero y abierto.** Lo que ya pasó, cerrado, con el total
  en el título.
- **Lo que el sistema hace solo no ocupa una pantalla.** Se muestra lo que pide algo de la
  persona, cuando lo pide y donde ya está mirando.
- Dos pantallas chicas del mismo tema van en una con pestañas. Si dos partes cambian lo mismo,
  van juntas.
- Toda fila que lleva a otra pantalla tiene la misma marca de "ir". Una lista que crece sin tope va
  paginada (de a 25) y, en la compu, como tabla.
- Lo que se mira todos los días va adelante. El detalle (historiales, plata) va detrás de un toque.
- Una lista de cosas que carga el usuario muestra solo las que hay, cada una con su "Borrar", y
  un "Agregar" abajo. Nunca casilleros vacíos esperando.
- Una opción que hoy no cambia nada lo dice ahí mismo y por qué. Nunca una opción que parece rota.
- Un diseño que necesita un dato que falta cae a otro que anda sin él, y se avisa qué falta.
- Lo que ocupa mucho lugar (un mapa) trae su tamaño para elegir. Un mapa embebido nunca se queda
  con la ruedita ni con el dedo al hacer scroll.
- Ningún texto promete un link o un mail que no se manda.
- Todo aviso que pide hacer algo trae lo necesario para hacerlo (el dato con "Copiar", el
  contacto).

## 11. Animaciones

- **Cada animación tiene un porqué:** mostrar de dónde viene algo, confirmar o avisar. Si no lo
  tiene, no va.
- Lo que se usa cien veces por día no se anima, o casi nada.
- **Solo `transform`, `opacity` y `clip-path`.** Nunca `scale(0)`: se arranca de 0,95 con
  opacidad 0.
- **Curvas y duraciones:**
  - Para entrar y salir, ease-out fuerte (`cubic-bezier(0.23, 1, 0.32, 1)`). Nunca ease-in en la
    interfaz.
  - Menos de 300 ms.
- **Versión quieta con "reducir movimiento":** menos movimiento, no cero; se mantienen los
  fundidos.
- **La información no se esconde detrás del scroll:** nada que aparezca de a poco al bajar para
  poder leerlo. Lo que se mueve es decorado y arranca solo cuando se ve casi entero, sin atarse al
  scroll.
- Probá las animaciones de scroll con la ruedita, en una pantalla baja.

## 12. Antes de dar por terminado un diseño

- [ ] Contrastes medidos (texto 4,5:1, controles 3:1)
- [ ] Todos los objetivos táctiles de 44 px o más
- [ ] Probado en 320, 390, 768, 1024 y 1440 px, y en notebook a 100 % de zoom (1366 × 650)
- [ ] Recorrido completo con teclado
- [ ] Textos claros, sin jerga, con los formatos locales
- [ ] Estados cubiertos: cargando, vacío, error, deshabilitado y elegido
- [ ] Nada depende solo del color
- [ ] Fotos con lugar reservado y texto alternativo
- [ ] Modo oscuro revisado (ningún color suelto)
- [ ] Botones: uno principal por contexto, lo más usado primero, y lo que no se deshace al final y
      con confirmación
- [ ] Probado con datos extremos: nombres larguísimos, listas vacías, números enormes

## 13. Cómo organizar la memoria del proyecto (CLAUDE.md separado)

Si trabajás con Claude Code, no metas todo en un `CLAUDE.md` gigante: se lee entero en cada
sesión, gasta uso y las reglas importantes se pierden entre el detalle.

- **`CLAUDE.md` corto:** solo las reglas que no se rompen, los datos de infraestructura (servicios,
  IDs, comandos) y el estado actual (qué se publicó último y qué sigue).
- **El detalle va en `docs/`, un tema por archivo.** Por ejemplo:

  | Archivo | Qué tiene |
  |---|---|
  | `docs/producto.md` | Qué es, para quién y **lo que no se hace** |
  | `docs/funciones.md` | Qué hay y dónde está en el código |
  | `docs/plan-tecnico.md` | Arquitectura, datos y permisos |
  | `docs/guia-ui-ux.md` | Esta guía + lo que opinó el dueño de cada diseño |
  | `docs/seguridad.md` | Reglas y lista para cada cambio |
  | `docs/rendimiento.md` | Consultas, fotos, librerías |
  | `docs/pruebas.md` | Qué se prueba antes de dar algo por terminado |
  | `docs/publicar.md` | Pasos para publicar y volver atrás |
  | `docs/textos.md` | Tono y reglas de los textos |
  | `docs/pendientes.md` | Lo que tiene que hacer el dueño |
  | `docs/historial.md` | Qué se publicó y cuándo |

- **En `CLAUDE.md`, una tabla "Antes de… → leer…":** "Antes de tocar pantallas, leer
  `docs/guia-ui-ux.md`", "Antes de publicar, leer `docs/publicar.md`". Así cada sesión lee solo lo
  que necesita para esa tarea.
- **Dónde se anota cada cosa, en el mismo cambio:**
  - Función nueva o cambiada → `funciones.md`.
  - Opinión sobre un diseño o patrón nuevo → `guia-ui-ux.md`.
  - Algo descartado o para después → `producto.md`.
  - Lo que tiene que hacer el dueño → `pendientes.md`.
  - Al publicar → `historial.md` y el estado en `CLAUDE.md`.
- **Las opiniones del dueño sobre un diseño se anotan con fecha y sus palabras,** y de cada una sale
  una regla general. Así no se repite el mismo error en otra pantalla.
- Si algo de la documentación deja de ser cierto en el código, se corrige en el mismo cambio.

## Opiniones del dueño sobre este sitio

- **2026-10-24:** "Metele más hype, algo de 3D; los colores, el fondo me parece muy gris."
  → Regla: el fondo es casi negro con un toque violeta y el color lo ponen las luces (shader del
  hero, RGB del teclado, brillos). Nada de grises planos de fondo. El 3D va en lo que se puede
  tocar: el teclado gira con el scroll y sigue al mouse, y las tarjetas se inclinan hacia el
  cursor. Todo se queda quieto con "reducir movimiento" o en pantallas táctiles.
- **2026-10-24:** "Vende mejor la experiencia de Neuralsoft."
  → Regla: el trabajo actual va primero y en grande, con sus módulos en fichas.
- **2026-10-24:** "No me gusta 'punta a punta', suena muy IA. No enfoques tanto en no-code; código y
  programación ya sabía. No sé si queda bien poner que estamos en capacitación."
  → Regla: los textos cuentan lo que se hace, con datos concretos (módulos, tecnologías), en
  primera persona y sin muletillas ("de punta a punta", "potenciar", "no solo… sino…"). Nada que
  reste: ni "capacitación" ni "aprendiendo" cuando se puede decir qué se construye.

## Fuentes

- W3C, [WCAG 2.2](https://www.w3.org/TR/WCAG22/) · TetraLogical, [Qué hay de nuevo en WCAG 2.2](https://tetralogical.com/blog/2023/10/05/whats-new-wcag-2.2/)
- NN/g, [10 heurísticas de usabilidad](https://www.nngroup.com/articles/ten-usability-heuristics/) · [Proximidad](https://www.nngroup.com/articles/gestalt-proximity/)
- Material Design 3, [Estructura y accesibilidad](https://m3.material.io/foundations/designing/structure) · [Botones](https://m3.material.io/components/all-buttons)
- LogRocket, [Tamaños táctiles accesibles](https://blog.logrocket.com/ux-design/all-accessible-touch-target-sizes/)
- Baymard, [Diseño de formularios](https://baymard.com/blog/form-design) · [Validación en línea](https://baymard.com/blog/inline-form-validation) · [Largo de línea](https://baymard.com/blog/line-length-readability)
- Google, [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) · web.dev, [Cómo se definieron los umbrales](https://web.dev/articles/defining-core-web-vitals-thresholds)
- BrowserStack, [Puntos de corte responsive](https://www.browserstack.com/guide/responsive-design-breakpoints)
- Ralabs, [UX para reservas](https://ralabs.org/blog/booking-ux-best-practices/)
- GitHub Primer, [Diálogo de confirmación](https://primer.style/product/components/confirmation-dialog/guidelines) · UX Planet, [Confirmaciones sin irritar](https://uxplanet.org/confirmation-dialogs-how-to-design-dialogues-without-irritation-7b4cf2599956)
- Shopify Polaris, [Barra para guardar](https://polaris-react.shopify.com/components/deprecated/contextual-save-bar)
- Smashing Magazine, [La zona del pulgar](https://www.smashingmagazine.com/2016/09/the-thumb-zone-designing-for-mobile-users/) · [Laws of UX](https://lawsofux.com/) (Fitts, Hick, Jakob)
- Emil Kowalski, [skills de animación](https://github.com/emilkowalski/skills)
