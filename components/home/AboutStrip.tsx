'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import GoldButton from '../ui/GoldButton';

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AboutStrip() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="border-y border-[var(--border)] bg-[var(--bg)] px-4 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          style={{ willChange: 'transform' }}
        >
          <p
            className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]"
            style={{ fontFamily: 'var(--font-space-mono), monospace' }}
          >
            OUR MISSION
          </p>
          <div
            className="leading-[0.9] text-[clamp(48px,8vw,100px)] uppercase text-[var(--text)]"
            style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
          >
            <div>Stories That</div>
            <div className="flex flex-wrap items-baseline gap-x-4">
              <span
                style={{
                  WebkitTextStroke: '2px var(--accent)',
                  color: 'transparent',
                }}
              >
                Move
              </span>
              <span className="text-[var(--text)]">The World</span>
            </div>
          </div>
          <motion.div
            className="mt-8 h-px bg-[var(--accent)]"
            initial={{ scaleX: 0, originX: 0 }}
            animate={isInView ? { scaleX: 1, originX: 0 } : { scaleX: 0, originX: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: easeOutExpo }}
            style={{ willChange: 'transform' }}
          />
        </motion.div>

        <motion.div
          className="max-w-xl lg:justify-self-end"
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
          transition={{ duration: 0.85, delay: 0.2, ease: easeOutExpo }}
          style={{ willChange: 'transform' }}
        >
          <p
            className="text-base leading-8 text-[var(--muted)] md:text-lg"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}
          >
            Aina Productions is a filmmaker-led collective creating short-form cinema with a
            strong sense of atmosphere, intimacy, and cultural memory. We bring together emerging
            directors, writers, cinematographers, and editors to build a community where bold,
            emotionally precise storytelling can grow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span
              className="rounded-full border border-[var(--border)] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[var(--text)]"
              style={{ fontFamily: 'var(--font-space-mono), monospace' }}
            >
              Est. 2024
            </span>
            <span
              className="rounded-full border border-[var(--border)] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[var(--text)]"
              style={{ fontFamily: 'var(--font-space-mono), monospace' }}
            >
              Delhi, India
            </span>
          </div>
          <div className="mt-8">
            <GoldButton href="/team" className="bg-transparent">
              Meet the Crew
            </GoldButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
