import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans, Space_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageTransition from '../components/ui/PageTransition';
import { AnimatePresence } from 'framer-motion';

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas-neue',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aina Productions - Short Films & Community Filmmaking',
  description:
    'Crafting stories that move. Short films, community filmmaking, and cinematic experiences by Aina Productions.',
  openGraph: {
    title: 'Aina Productions',
    description:
      'Crafting stories that move. Short films, community filmmaking, and cinematic experiences.',
    url: 'https://aina-productions.com',
    siteName: 'Aina Productions',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Aina Productions' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aina Productions',
    description:
      'Crafting stories that move. Short films, community filmmaking, and cinematic experiences.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable}`}
    >
      <body style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}>
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <PageTransition>{children}</PageTransition>
          </AnimatePresence>
        </main>
        <Footer />
      </body>
    </html>
  );
}