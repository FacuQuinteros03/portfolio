// El color de marca va de celeste a azul eléctrico, de izquierda a derecha: partículas y nombre del hero.
// Mismo rango que --accent y --accent-2 en app/globals.css.
const HUE_FROM = 190;
const HUE_TO = 222;

/** Tono para una posición de 0 (izquierda) a 1 (derecha). */
export function hueAt(t: number) {
  return Math.round(HUE_FROM + Math.min(1, Math.max(0, t)) * (HUE_TO - HUE_FROM));
}
