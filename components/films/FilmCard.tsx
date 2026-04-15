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
  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25 }}
      onClick={() => window.open(film.youtubeUrl, '_blank')}
    >
      <div className="relative aspect-video bg-[var(--surface)] overflow-hidden mb-4 border-2 border-transparent group-hover:border-[var(--accent)] transition-colors duration-300">
        <Image
          src={film.thumbnail}
          alt={film.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-[var(--accent)] rounded-full flex items-center justify-center">
            <Play size={22} className="text-black fill-black ml-1" />
          </div>
        </div>
      </div>

      <h3
        className="text-xl text-[var(--text)] mb-1"
        style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
      >
        {film.title}
      </h3>
      <p
        className="text-xs uppercase tracking-widest text-[var(--muted)] mb-2"
        style={{ fontFamily: 'var(--font-space-mono), monospace' }}
      >
        {new Date(film.releaseDate).getFullYear()} · {film.duration}
      </p>
      <p className="text-sm text-[var(--muted)] leading-relaxed">{film.description}</p>
    </motion.div>
  );
}