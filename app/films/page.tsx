'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import SectionLabel from '../../components/ui/SectionLabel';
import AnimatedHeading from '../../components/ui/AnimatedHeading';
import FilmCard from '../../components/films/FilmCard';
import { staggerContainer, scaleIn } from '../../lib/variants';

const allFilms = [
  {
    id: '1',
    title: 'Shadows of Tomorrow',
    thumbnail: '/images/films/film-1.jpg',
    youtubeUrl: 'https://youtube.com',
    description: 'A dystopian short exploring identity in a digital age.',
    releaseDate: '2024-01-15',
    duration: '12 min',
    tags: ['Short Film', 'Sci-Fi'],
  },
  {
    id: '2',
    title: 'Echoes',
    thumbnail: '/images/films/film-2.jpg',
    youtubeUrl: 'https://youtube.com',
    description: 'A poetic meditation on memory and loss.',
    releaseDate: '2024-02-20',
    duration: '8 min',
    tags: ['Short Film', 'Drama'],
  },
  {
    id: '3',
    title: 'The Last Frame',
    thumbnail: '/images/films/film-3.webp',
    youtubeUrl: 'https://youtube.com',
    description: 'A thriller about a filmmaker who discovers a dangerous secret.',
    releaseDate: '2024-03-10',
    duration: '15 min',
    tags: ['Short Film', 'Thriller'],
  },
];

export default function FilmsPage() {
  const [selectedTag, setSelectedTag] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const tags = ['All', ...Array.from(new Set(allFilms.flatMap((f) => f.tags)))];
  const filtered = selectedTag === 'All' ? allFilms : allFilms.filter((f) => f.tags.includes(selectedTag));

  return (
    <div>
      {/* Page Hero */}
      <section className="relative h-[45vh] bg-[var(--bg)] flex items-end justify-start overflow-hidden px-8 pb-12 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/40 to-[var(--bg)]" />
        <div className="relative z-10">
          <SectionLabel>THE FILMS</SectionLabel>
          <AnimatedHeading as="h1" className="text-6xl md:text-8xl">
            OUR WORK
          </AnimatedHeading>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 px-4 border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-5 py-2 text-xs uppercase tracking-widest transition-colors border ${
                selectedTag === tag
                  ? 'bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]'
                  : 'bg-transparent text-[var(--muted)] border-[var(--border)] hover:text-[var(--text)]'
              }`}
              style={{ fontFamily: 'var(--font-space-mono), monospace' }}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Films Grid */}
      <section ref={ref} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {filtered.map((film) => (
              <motion.div key={film.id} variants={scaleIn}>
                <FilmCard film={film} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
} 