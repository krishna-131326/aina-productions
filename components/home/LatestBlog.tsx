'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface BlogPost {
  id: string;
  title: string;
  coverImage: string;
  excerpt: string;
  publishedAt: string;
  slug: string;
}

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const latestPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Behind the Scenes: Crafting Shadows of Tomorrow',
    coverImage: '/images/films/film-1.jpg',
    excerpt:
      'Step inside the process behind our latest short, from location scouting and shot design to the final rhythm of the edit.',
    publishedAt: '2024-03-15T10:00:00Z',
    slug: 'behind-scenes-shadows-tomorrow',
  },
  {
    id: '2',
    title: 'The Art of Short Film Storytelling',
    coverImage: '/images/films/film-2.jpg',
    excerpt:
      'What changes when every second matters, and how constraint sharpens emotion on screen.',
    publishedAt: '2024-03-08T14:30:00Z',
    slug: 'art-short-film-storytelling',
  },
  {
    id: '3',
    title: 'Building a Community-First Film Set',
    coverImage: '/images/films/film-3.webp',
    excerpt:
      'The systems, rituals, and small choices that make collaboration feel generous and focused.',
    publishedAt: '2024-02-25T12:00:00Z',
    slug: 'building-community-first-film-set',
  },
  {
    id: '4',
    title: 'Color, Texture, and Mood in Micro-Budget Cinema',
    coverImage: '/images/films/film-1.jpg',
    excerpt:
      'How we use practical light, wardrobe, and production design to create a premium cinematic world.',
    publishedAt: '2024-02-11T09:30:00Z',
    slug: 'color-texture-mood-micro-budget-cinema',
  },
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function BlogCard({
  post,
  index,
  isInView,
  hero = false,
}: {
  post: BlogPost;
  index: number;
  isInView: boolean;
  hero?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 24 }}
      transition={{ duration: hero ? 0.6 : 0.55, ease: easeOutExpo, delay: index * 0.1 }}
      style={{ willChange: 'transform' }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div
          className={`overflow-hidden border border-[var(--border)] bg-[var(--surface)] ${
            hero ? 'mb-6' : 'mb-4'
          }`}
        >
          <div className={`relative overflow-hidden ${hero ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
              sizes={hero ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
            />
            <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />
            {hero ? (
              <div className="absolute inset-0 bg-[var(--accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
            ) : null}
          </div>
        </div>

        <div
          className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]"
          style={{ fontFamily: 'var(--font-space-mono), monospace' }}
        >
          {formatDate(post.publishedAt)}
        </div>

        <h3
          className={`mb-3 uppercase leading-none text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--accent)] ${
            hero ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'
          }`}
          style={{ fontFamily: 'var(--font-bebas-neue), cursive', letterSpacing: '0.05em' }}
        >
          {post.title}
        </h3>

        <p
          className={`leading-7 text-[var(--muted)] ${hero ? 'max-w-3xl text-base md:text-lg' : 'text-sm'}`}
          style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}
        >
          {post.excerpt}
        </p>
      </Link>
    </motion.article>
  );
}

export default function LatestBlog() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const heroPost = latestPosts[0];
  const secondaryPosts = latestPosts.slice(1);

  return (
    <section ref={ref} className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: easeOutExpo }}
          style={{ willChange: 'transform' }}
        >
          <div
            className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]"
            style={{ fontFamily: 'var(--font-space-mono), monospace' }}
          >
            Latest From the Blog
          </div>
        </motion.div>

        <motion.h2
          className="mb-12 text-5xl uppercase text-[var(--text)] md:text-7xl"
          style={{ fontFamily: 'var(--font-bebas-neue), cursive', letterSpacing: '0.05em' }}
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.75, ease: easeOutExpo, delay: 0.1 }}
        >
          Behind the Scenes
        </motion.h2>

        <BlogCard post={heroPost} index={0} isInView={isInView} hero />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {secondaryPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index + 1} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
