'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionLabel from '../ui/SectionLabel';
import AnimatedHeading from '../ui/AnimatedHeading';
import { staggerContainer, scaleIn } from '../../lib/variants';

const latestPosts = [
  {
    id: '1',
    title: 'Behind the Scenes: Crafting Shadows of Tomorrow',
    coverImage: 'https://placehold.co/800x450/111111/e8c547?text=Behind+The+Scenes',
    excerpt:
      'An in-depth look at the creative process behind our latest short film, from concept to final cut.',
    publishedAt: '2024-03-15T10:00:00Z',
    slug: 'behind-scenes-shadows-tomorrow',
  },
  {
    id: '2',
    title: 'The Art of Short Film Storytelling',
    coverImage: 'https://placehold.co/800x450/111111/e8c547?text=Short+Film+Storytelling',
    excerpt:
      'Exploring the unique challenges and opportunities of telling compelling stories in under 15 minutes.',
    publishedAt: '2024-03-08T14:30:00Z',
    slug: 'art-short-film-storytelling',
  },
];

export default function LatestBlog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionLabel>LATEST FROM THE BLOG</SectionLabel>
        <AnimatedHeading className="text-5xl md:text-6xl mb-12" as="h2">
          BEHIND THE SCENES
        </AnimatedHeading>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {latestPosts.map((post) => (
            <motion.article key={post.id} className="group" variants={scaleIn}>
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-video bg-[var(--surface)] overflow-hidden mb-4">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p
                  className="text-xs uppercase tracking-widest text-[var(--muted)] mb-2"
                  style={{ fontFamily: 'var(--font-space-mono), monospace' }}
                >
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <h3
                  className="text-2xl text-[var(--text)] mb-3 group-hover:text-[var(--accent)] transition-colors"
                  style={{ fontFamily: 'var(--font-bebas-neue), cursive' }}
                >
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">{post.excerpt}</p>
                <span
                  className="text-xs uppercase tracking-widest text-[var(--accent)]"
                  style={{ fontFamily: 'var(--font-space-mono), monospace' }}
                >
                  Read More →
                </span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}