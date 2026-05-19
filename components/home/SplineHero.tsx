'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '../ui/SectionLabel';
import GoldButton from '../ui/GoldButton';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[var(--bg)]" />
  ),
});

const sceneUrl = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ?? '';
const isSceneConfigured =
  sceneUrl.length > 0 && !sceneUrl.includes('YOUR_SCENE_ID_HERE');

export default function SplineHero() {
  return (
    <section className="relative h-screen w-screen overflow-hidden bg-[var(--bg)]">

      {/* Background: Spline scene or cinematic still */}
      {isSceneConfigured ? (
        <Spline scene={sceneUrl} className="absolute inset-0 h-full w-full" />
      ) : (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/backgrounds/bg-2.jpg)', opacity: 0.3 }}
          />
          <div className="absolute inset-0 bg-black/55" />
        </>
      )}

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.7) 100%)',
        }}
      />

      {/* Bottom bleed into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-48 bg-gradient-to-t from-[var(--bg)] to-transparent" />

      {/* Overlay text */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <SectionLabel>EST. 2025 · SHORT FILMS</SectionLabel>
        </motion.div>

        <motion.h1
          className="text-[clamp(56px,12vw,140px)] uppercase leading-none text-[var(--text)]"
          style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
        >
          Aina Productions
        </motion.h1>

        <motion.p
          className="mt-4 text-lg text-[var(--muted)]"
          style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          We craft stories that move.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <GoldButton href="/films">Watch Our Films</GoldButton>
          <Link
            href="/join"
            className="inline-flex items-center justify-center border border-white/20 px-8 py-3 text-xs uppercase tracking-widest text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            style={{ fontFamily: 'var(--font-space-mono), monospace' }}
          >
            Join the Crew
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/20">
          <div className="mt-2 h-3 w-1 rounded-full bg-white/30" />
        </div>
      </motion.div>
    </section>
  );
}