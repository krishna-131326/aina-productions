'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface Film {
  id: string;
  title: string;
  thumbnail: string;
  youtubeUrl: string;
  description: string;
  releaseDate: string;
  duration: string;
}

export default function FilmCard({ film }: { film: Film }) {
  const handleClick = () => window.open(film.youtubeUrl, '_blank');

  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <div className="relative mb-4 overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition-colors duration-300 group-hover:border-[var(--accent)]">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={film.thumbnail}
            alt={film.title}
            fill
            className="object-cover grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-0" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-14 w-14 items-center justify-center bg-[var(--accent)] rounded-full">
              <Play size={20} className="ml-1 fill-black text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Meta */}
      <p
        className="mb-2 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]"
        style={{ fontFamily: 'var(--font-space-mono), monospace' }}
      >
        {new Date(film.releaseDate).getFullYear()} · {film.duration}
      </p>

      {/* Title */}
      <h3
        className="mb-2 text-2xl uppercase text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--accent)]"
        style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
      >
        {film.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-7 text-[var(--muted)]"
        style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}
      >
        {film.description}
      </p>
    </motion.div>
  );
}