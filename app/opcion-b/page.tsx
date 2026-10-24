import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';

// Versión para comparar: el nombre se arma con teclas sueltas en vez del teclado completo.
export const metadata: Metadata = { robots: { index: false } };

export default function Page() {
  return <HomePage variant="teclas" />;
}
