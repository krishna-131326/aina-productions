'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Film {
  id: string;
  title: string;
  thumbnail: string;
  youtubeUrl: string;
  description: string;
  releaseDate: string;
  duration: string;
}

const featuredFilms: Film[] = [
  {
    id: '1',
    title: 'Shadows of Tomorrow',
    thumbnail: '/images/films/film-1.jpg',
    youtubeUrl: 'https://youtube.com',
    description: 'A dystopian short exploring identity, ambition, and memory in a city lit by screens.',
    releaseDate: '2024-01-15',
    duration: '12 min',
  },
  {
    id: '2',
    title: 'Echoes',
    thumbnail: '/images/films/film-2.jpg',
    youtubeUrl: 'https://youtube.com',
    description: 'A restrained, intimate portrait of grief told through fragments of sound and stillness.',
    releaseDate: '2024-02-20',
    duration: '8 min',
  },
  {
    id: '3',
    title: 'The Last Frame',
    thumbnail: '/images/films/film-3.webp',
    youtubeUrl: 'https://youtube.com',
    description: 'A suspense-driven story about a filmmaker who uncovers something dangerous in the cut.',
    releaseDate: '2024-03-10',
    duration: '15 min',
  },
];

function FeaturedFilmTile({ film, index }: { film: Film; index: number }) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [28, -28]);

  return (
    <motion.a
      ref={cardRef}
      href={film.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.55,
        delay: 0.35 + index * 0.11,
        ease: easeOutExpo,
      }}
      style={{ willChange: 'transform' }}
    >
      <div className="relative overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
        <div className="relative aspect-video overflow-hidden">
          <motion.div style={{ y: imageY, willChange: 'transform' }} className="absolute inset-0">
            <Image
              src={film.thumbnail}
              alt={film.title}
              fill
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
            <div className="relative h-full w-full after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[var(--accent)] after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100" />
          </div>
        </div>
        <div className="px-5 py-6">
          <p
            className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]"
            style={{ fontFamily: 'var(--font-space-mono), monospace' }}
          >
            {new Date(film.releaseDate).getFullYear()} / {film.duration}
          </p>
          <h3
            className="text-3xl uppercase text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--accent)]"
            style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
          >
            {film.title}
          </h3>
          <p
            className="mt-3 text-sm leading-7 text-[var(--muted)]"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}
          >
            {film.description}
          </p>
        </div>
      </div>
    </motion.a>
  );
}

export default function FeaturedFilms() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const headingWords = ['Featured', 'Films'];

  return (
    <section ref={ref} className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: easeOutExpo }}
          className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]"
          style={{ fontFamily: 'var(--font-space-mono), monospace', willChange: 'transform' }}
        >
          Featured Work
        </motion.p>

        <h2
          className="mb-12 flex flex-wrap gap-x-4 gap-y-2 text-5xl uppercase text-[var(--text)] md:text-7xl"
          style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
        >
          {headingWords.map((word, index) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{
                duration: 0.7,
                delay: 0.15 + index * 0.09,
                ease: easeOutExpo,
              }}
              style={{ willChange: 'transform' }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
          transition={{ duration: 0.6, delay: 0.35, ease: easeOutExpo }}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
          style={{ willChange: 'transform' }}
        >
          {featuredFilms.map((film, index) => (
            <FeaturedFilmTile key={film.id} film={film} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.55, ease: easeOutExpo }}
          className="mt-12"
          style={{ willChange: 'transform' }}
        >
          <Link
            href="/films"
            className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-[var(--text)]"
            style={{ fontFamily: 'var(--font-space-mono), monospace' }}
          >
            <span>View All Films -&gt;</span>
            <span className="relative block h-px w-24 overflow-hidden bg-[var(--border)]">
              <span className="absolute inset-0 origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
