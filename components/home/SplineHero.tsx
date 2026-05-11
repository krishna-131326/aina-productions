'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '../ui/SectionLabel';
import GoldButton from '../ui/GoldButton';

// CRITICAL: ssr:false prevents the ReactCurrentDispatcher crash
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[var(--bg)] flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const sceneUrl = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ?? '';
const isSceneConfigured = sceneUrl.length > 0 && !sceneUrl.includes('YOUR_SCENE_ID_HERE');

export default function SplineHero() {
  return (
    <section className="relative w-screen h-screen overflow-hidden bg-[var(--bg)]">

      {isSceneConfigured ? (
        <Spline
          scene={sceneUrl}
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--bg)]" />
      )}

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--bg)] to-transparent z-10 pointer-events-none" />

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionLabel>EST. 2024 · SHORT FILMS</SectionLabel>
        </motion.div>

        <motion.h1
          className="text-[clamp(56px,12vw,140px)] leading-none text-[var(--text)] uppercase"
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
          className="mt-8 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <GoldButton href="/films">Watch Our Films</GoldButton>
          <Link
            href="/join"
            className="inline-flex items-center justify-center px-8 py-3 border border-[var(--accent)] text-[var(--accent)] uppercase text-xs tracking-widest hover:bg-[var(--accent)]/10 transition-colors"
            style={{ fontFamily: 'var(--font-space-mono), monospace' }}
          >
            Join the Crew
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-[var(--muted)]"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 border-2 border-[var(--muted)] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[var(--muted)] rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}