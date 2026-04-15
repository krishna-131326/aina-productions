'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionLabel from '../components/ui/SectionLabel';
import AnimatedHeading from '../components/ui/AnimatedHeading';
import MemberCard from '../components/team/MemberCard';
import { staggerContainer, scaleIn } from '../lib/variants';

const teamMembers = [
  {
    id: '1',
    name: 'Alex Rivera',
    role: 'Director & Founder',
    avatar: '',
    bio: 'Passionate filmmaker with over 8 years of experience in short film production and community storytelling.',
    instagramUrl: 'https://instagram.com',
    order: 1,
  },
  {
    id: '2',
    name: 'Jordan Chen',
    role: 'Cinematographer',
    avatar: '',
    bio: 'Visual storyteller specializing in atmospheric lighting and dynamic camera work for narrative films.',
    instagramUrl: 'https://instagram.com',
    order: 2,
  },
  {
    id: '3',
    name: 'Sam Taylor',
    role: 'Editor',
    avatar: '',
    bio: 'Post-production wizard who brings raw footage to life through precise editing and sound design.',
    instagramUrl: 'https://instagram.com',
    order: 3,
  },
];

export default function TeamPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div>
      {/* Split hero */}
      <section className="py-24 px-4 pt-36">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div>
            <SectionLabel>THE CREW</SectionLabel>
            <AnimatedHeading as="h1" className="text-6xl md:text-8xl">
              MEET OUR TEAM
            </AnimatedHeading>
          </div>
          <p className="text-lg text-[var(--muted)] leading-relaxed border-l-2 border-[var(--accent)] pl-6">
            Aina Productions is built on collaboration and creativity. Our diverse team brings together
            filmmakers, artists, and storytellers united by a shared passion for cinematic storytelling.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section ref={ref} className="py-20 px-4 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {[...teamMembers]
              .sort((a, b) => a.order - b.order)
              .map((member) => (
                <motion.div key={member.id} variants={scaleIn}>
                  <MemberCard member={member} />
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}