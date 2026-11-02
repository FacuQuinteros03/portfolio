import type { Metadata, Viewport } from 'next';
import { Hanken_Grotesk } from 'next/font/google';
import { NAME, ROLE } from '@/lib/content';
import './globals.css';

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://facundoquinteros.vercel.app'),
  title: `${NAME} · ${ROLE}`,
  description:
    'Portfolio de Facundo Quinteros: desarrollo web con React y Next.js, inteligencia artificial, datos y automatización. Rosario, Argentina.',
  icons: { icon: '/logoFQ.jpeg' },
  openGraph: {
    title: NAME,
    description: ROLE,
    url: '/',
    locale: 'es_AR',
    type: 'website',
    images: [{ url: '/img/yo.webp', width: 900, height: 1080, alt: NAME }],
  },
};

export const viewport: Viewport = {
  themeColor: '#1b1917',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={hanken.variable}>
      <body>{children}</body>
    </html>
  );
}
