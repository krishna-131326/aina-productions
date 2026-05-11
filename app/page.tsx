import type { Metadata } from 'next';
import Link from 'next/link';
import SplineHero from '../components/home/SplineHero';
import MarqueeReel from '../components/home/MarqueeReel';
import FeaturedFilms from '../components/home/FeaturedFilms';
import StatsBanner from '../components/home/StatsBanner';
import AboutStrip from '../components/home/AboutStrip';
import LatestBlog from '../components/home/LatestBlog';

export const metadata: Metadata = {
  title: 'Aina Productions - Short Films & Community Filmmaking',
  description: 'Crafting stories that move.',
};

export default function HomePage() {
  return (
    <>
      <SplineHero />
      <MarqueeReel />
      <FeaturedFilms />
      <StatsBanner />
      <AboutStrip />
      <LatestBlog />
      <section className="relative overflow-hidden px-4 py-32">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #0a0a0a 0%, #1a1200 50%, #0a0a0a 100%), repeating-linear-gradient(0deg, rgba(232, 197, 71, 0.04) 0px, rgba(232, 197, 71, 0.04) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, rgba(232, 197, 71, 0.04) 0px, rgba(232, 197, 71, 0.04) 1px, transparent 1px, transparent 48px)',
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative mx-auto max-w-7xl text-center">
          <div
            className="pointer-events-none absolute left-0 right-[55%] top-[clamp(72px,12vw,130px)] hidden h-px origin-left lg:block"
            style={{
              backgroundColor: 'rgba(232, 197, 71, 0.3)',
              animation: 'cta-line-left 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
            }}
          />
          <div
            className="pointer-events-none absolute left-[55%] right-0 top-[clamp(72px,12vw,130px)] hidden h-px origin-right lg:block"
            style={{
              backgroundColor: 'rgba(232, 197, 71, 0.3)',
              animation: 'cta-line-right 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
            }}
          />
          <p
            className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]"
            style={{ fontFamily: 'var(--font-space-mono), monospace' }}
          >
            Join The Collective
          </p>
          <h2
            className="mx-auto max-w-5xl text-[clamp(56px,10vw,120px)] uppercase leading-[0.9] text-[var(--text)]"
            style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
          >
            <span>Ready To Create</span>
            <span className="text-[var(--accent)]">?</span>
          </h2>
          <p
            className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--muted)] md:text-lg"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}
          >
            Step into a filmmaking community built for collaboration, experimentation, and stories
            that stay with people long after the credits roll.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/join"
              className="inline-flex items-center justify-center border-2 border-[var(--accent)] px-8 py-3 text-xs uppercase tracking-[0.18em] text-[var(--accent)] transition-all duration-300 ease-out hover:bg-[var(--accent)] hover:text-[var(--bg)]"
              style={{ fontFamily: 'var(--font-space-mono), monospace' }}
            >
              Apply Now
            </Link>
            <Link
              href="/films"
              className="inline-flex items-center justify-center border border-[var(--border)] bg-transparent px-8 py-3 text-xs uppercase tracking-[0.18em] text-[var(--text)] transition-colors duration-300 ease-out hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{ fontFamily: 'var(--font-space-mono), monospace' }}
            >
              Watch Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
