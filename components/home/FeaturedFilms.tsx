'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '../ui/SectionLabel';
import AnimatedHeading from '../ui/AnimatedHeading';
import FilmCard from '../films/FilmCard';
import { staggerContainer, scaleIn } from '../../lib/variants';

const featuredFilms = [
  {
    id: '1',
    title: 'Shadows of Tomorrow',
    thumbnail: 'https://placehold.co/640x360/111111/e8c547?text=Shadows+of+Tomorrow',
    youtubeUrl: 'https://youtube.com',
    description: 'A dystopian short exploring identity in a digital age.',
    releaseDate: '2024-01-15',
    duration: '12 min',
  },
  {
    id: '2',
    title: 'Echoes',
    thumbnail: 'https://placehold.co/640x360/111111/e8c547?text=Echoes',
    youtubeUrl: 'https://youtube.com',
    description: 'A poetic meditation on memory and loss.',
    releaseDate: '2024-02-20',
    duration: '8 min',
  },
  {
    id: '3',
    title: 'The Last Frame',
    thumbnail: 'https://placehold.co/640x360/111111/e8c547?text=The+Last+Frame',
    youtubeUrl: 'https://youtube.com',
    description: 'A thriller about a filmmaker who discovers a dangerous secret.',
    releaseDate: '2024-03-10',
    duration: '15 min',
  },
];

export default function FeaturedFilms() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionLabel>FEATURED WORK</SectionLabel>
        <AnimatedHeading className="text-5xl md:text-6xl mb-12" as="h2">
          OUR FILMS
        </AnimatedHeading>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {featuredFilms.map((film) => (
            <motion.div key={film.id} variants={scaleIn}>
              <FilmCard film={film} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}