'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '../../components/ui/SectionLabel';
import AnimatedHeading from '../../components/ui/AnimatedHeading';
import BlogCard from '../../components/blog/BlogCard';
import { staggerContainer, scaleIn } from '../../lib/variants';

const blogPosts = [
  {
    id: '1',
    title: 'Behind the Scenes: Crafting Shadows of Tomorrow',
    coverImage: 'https://placehold.co/800x450/111111/e8c547?text=Behind+The+Scenes',
    excerpt: 'An in-depth look at the creative process behind our latest short film, from concept to final cut.',
    publishedAt: '2024-03-15T10:00:00Z',
    slug: 'behind-scenes-shadows-tomorrow',
    author: { name: 'Alex Rivera' },
  },
  {
    id: '2',
    title: 'The Art of Short Film Storytelling',
    coverImage: 'https://placehold.co/800x450/111111/e8c547?text=Storytelling',
    excerpt: 'Exploring the unique challenges of telling compelling stories in under 15 minutes.',
    publishedAt: '2024-03-08T14:30:00Z',
    slug: 'art-short-film-storytelling',
    author: { name: 'Jordan Chen' },
  },
  {
    id: '3',
    title: 'Community Filmmaking: Building Connections Through Stories',
    coverImage: 'https://placehold.co/800x450/111111/e8c547?text=Community+Filmmaking',
    excerpt: 'How our community-driven approach creates authentic narratives and lasting relationships.',
    publishedAt: '2024-02-28T09:15:00Z',
    slug: 'community-filmmaking-building-connections',
    author: { name: 'Sam Taylor' },
  },
];

export default function BlogPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div>
      <section className="py-24 px-4 pt-36 text-center">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>BEHIND THE SCENES</SectionLabel>
          <AnimatedHeading as="h1" className="text-6xl md:text-7xl mb-6">
            OUR BLOG
          </AnimatedHeading>
          <p className="text-lg text-[var(--muted)]">
            Insights, stories, and reflections from our filmmaking journey.
          </p>
        </div>
      </section>

      <section ref={ref} className="py-12 px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {blogPosts.map((post) => (
              <motion.div key={post.id} variants={scaleIn}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}